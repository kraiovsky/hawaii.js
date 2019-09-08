const { ls, mkdir, cat, ShellString } = require('shelljs')

const prependLibReadme = libName =>
  `---
id: ${libName}-readme
title: ${libName}
sidebar_label: Readme
---
`

const prependLibChangelog = libName =>
  `---
id: ${libName}-changelog
title: ${libName} changelog
sidebar_label: Changelog
---
`

const copyLibs = async () => {
  console.info('🔁 Copying libraries documentation...')
  const dirs = ls('libs')
  dirs.forEach(dir => {
    mkdir('-p', `docs/libs/${dir}`)
    ShellString(prependLibReadme(dir)).to(`docs/libs/${dir}/README.md`)
    cat(`libs/${dir}/README.md`).toEnd(`docs/libs/${dir}/README.md`)
    ShellString(prependLibChangelog(dir)).to(`docs/libs/${dir}/CHANGELOG.md`)
    cat(`libs/${dir}/CHANGELOG.md`).toEnd(`docs/libs/${dir}/CHANGELOG.md`)
  })
  console.log(`✅ Copied functions: ${dirs}`)
}
copyLibs()
