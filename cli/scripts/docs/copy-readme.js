const { cat, ShellString } = require('shelljs')

const prependReadme = () =>
  `---
id: readme
title: Readme
sidebar_label: Readme
---
`

const copyReadme = async () => {
  console.info('🔁 Copying README.md...')
  ShellString(prependReadme()).to(`docs/README.md`)
  cat(`README.md`).toEnd(`docs/README.md`)
  console.log(`✅ Copied README.md`)
}
copyReadme()
