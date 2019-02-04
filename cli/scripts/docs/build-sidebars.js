const { ls, ShellString } = require('shelljs')
const path = require('path')

const buildSidebarsFns = async () => {
  let listOfDocs = []
  const files = ls('functions')
  files.forEach(file => {
    const docName = path.parse(file).name
    listOfDocs.push(`functions/${docName}`)
  })
  return listOfDocs
}

const buildSidebarsLibs = async () => {
  let listOfDocs = []
  const files = ls('libs')
  files.forEach(file =>
    listOfDocs.push({
      type: 'subcategory',
      label: file,
      ids: [`libs/${file}/${file}-readme`, `libs/${file}/${file}-changelog`],
    })
  )
  return listOfDocs
}

const buildSidebars = async () => {
  console.info('🏗 Building sidebars...')
  const sidebars = {
    docs: {
      Introduction: ['readme', 'changelog'],
      'How to': [
        'how-to/setup',
        'how-to/develop',
        'how-to/test',
        'how-to/deploy',
        'how-to/monitor',
      ],
      Functions: await buildSidebarsFns(),
      Libraries: await buildSidebarsLibs(),
    },
  }
  ShellString(JSON.stringify(sidebars)).to('website/sidebars.json')
  console.info('✅ Sidebars built.')
}
buildSidebars()
