'use strict'

const fs = require('fs')
const path = require('path')

const gulp = require('gulp')
const yaml = require('js-yaml')
const file = require('gulp-file')
const jsdoc2md = require('jsdoc-to-markdown')
const { format } = require('../lib/_internal/text')
const pkg = require('../package.json')

const root = path.join(__dirname, '../')
const bin = path.join(root, '/bin')
const lib = path.join(root, '/lib')
const src = path.join(root, '/src')

async function getYaml (path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (error, data) => {
      if (error) reject(error)
      resolve(yaml.safeLoad(data))
    })
  })
}

async function getFile (path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (error, data) => {
      if (error) reject(error)
      resolve(data)
    })
  })
}

function generateSections (yaml) {
  const mapper = value => {
    const [k] = Object.keys(value)
    const v = value[k]

    return [k, v]
  }

  return {
    usage: (() =>
      ({ name: 'Usage', entries: yaml.Usage }))(),

    options: (() => {
      const entries = Object.values(yaml.Options).map(mapper)

      return {
        name: 'Options',
        entries,
        maxLength: entries.reduce((length, entry) => {
          const [option] = entry

          return option.length > length
            ? option.length
            : length
        }, 0)
      }
    })(),

    examples: (() =>
      ({ name: 'Examples', entries: Object.values(yaml.Examples).map(mapper) }))(),

    documentation: (() =>
      ({ name: 'Documentation', entries: yaml.Documentation }))()
  }
}

gulp.task('gen:help.txt', async () => {
  const yaml = await getYaml(`${src}/help.yml`)
  const sections = generateSections(yaml)
  const spaces = 2
  const padding = ' '.repeat(spaces - 1)
  const doublePadding = ' '.repeat(spaces * 2 - 1)
  const optionsPadding = 3

  let template = `
    {{ usage }}
    {{ options }}
    {{ examples }}
    {{ documentation }}
  `.replace(/\n {4}/gm, '\n').slice(0, -spaces)

  template = format(template, {
    usage: (section =>
      `${section.name}\n` + section.entries.map(entry =>
        `${padding} ${entry}`).join('\n')
    )(sections.usage),

    options: (section =>
      `\n${section.name}\n` + section.entries.map(([option, desc]) =>
        `${padding} ${option}`.padEnd(spaces + section.maxLength + optionsPadding, ' ') +
        desc.split('\n').join(`\n ${doublePadding}`)
      ).join('\n')
    )(sections.options),

    examples: (section =>
      `\n${section.name}\n` + section.entries.map(([option, desc]) =>
        `${padding} ${option}\n ${doublePadding}` + desc.split('\n').join(`\n ${doublePadding}`)
      ).join('\n')
    )(sections.examples),

    documentation: (section =>
      `${section.name}\n` + section.entries.map(entry => `${padding} ${entry}`).join('\n')
    )(sections.documentation)
  })

  template = format(template, { homepage: pkg.homepage })

  return file('help.txt', template)
    .pipe(gulp.dest(`${bin}`))
})

gulp.task('gen:readme.md', async () => {
  const readme = await getFile(`${src}/README.md.tpl`)
  const yaml = await getYaml(`${src}/help.yml`)
  const sections = generateSections(yaml)

  const spaces = 2
  const padding = ' '.repeat(spaces - 1)
  const doublePadding = ' '.repeat(spaces * 2 - 1)
  const optionsPadding = 3

  let cli = `
    {{ usage }}
    {{ options }}
    {{ examples }}
  `.replace(/\n {4}/gm, '\n').slice(1, -(spaces + 1))

  cli = format(cli, {
    usage: (section =>
      `- **Run:**\n ${padding}\`\`\`\n` +
      section.entries.map(entry => `${padding} ${entry}`).join('\n') +
      `\n${padding} \`\`\`\n`
    )(sections.usage),

    options: (section =>
      `- **${section.name}:**\n ${padding}\`\`\`\n` +
      section.entries.map(([option, desc]) =>
        `${padding} ${option}`.padEnd(spaces + section.maxLength + optionsPadding, ' ') +
        desc.split('\n').join(`\n ${doublePadding}`)
      ).join('\n') +
      `\n${padding} \`\`\`\n`
    )(sections.options),

    examples: (section =>
      `- **${section.name}:**\n ${padding}\`\`\`\n` +
      section.entries.map(([option, desc]) =>
        `${padding} ${option}\n ${doublePadding}` + desc.split('\n').join(`\n ${doublePadding}`)
      ).join('\n') +
      `\n${padding} \`\`\``
    )(sections.examples)
  })

  const api = await jsdoc2md.render({ files: path.join(`${lib}/index.js`) })

  return file('README.md', format(readme, { cli, api }))
    .pipe(gulp.dest(`${root}`))
})

gulp.task('gen', gulp.parallel('gen:help.txt', 'gen:readme.md'))
