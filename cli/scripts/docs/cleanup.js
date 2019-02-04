const { rm } = require('shelljs')

const cleanup = async () => {
  console.info('🧹 Cleaning up documents folder...')
  rm('-rf', 'docs/functions')
  rm('-rf', 'docs/libs')
  console.info('✅ Cleanup done.')
}
cleanup()
