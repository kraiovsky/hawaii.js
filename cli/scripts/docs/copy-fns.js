const { ls, mkdir, cat, ShellString } = require('shelljs')
const capitalize = require('../../utils/capitalize')

const prependFnDoc = fnName =>
  `---
id: ${fnName}
title: ${capitalize(fnName)}
sidebar_label: ${capitalize(fnName)}
---
`

const copyFns = async () => {
  console.info('🔁 Copying functions documentation...')
  const dirs = ls('functions')
  dirs.forEach(async dir => {
    mkdir('-p', `docs/functions`)
    ShellString(prependFnDoc(dir)).to(`docs/functions/${dir}.md`)
    cat(`functions/${dir}/README.md`).toEnd(`docs/functions/${dir}.md`)
  })
  console.log(`✅ Copied functions: ${dirs}`)
}
copyFns()
