import antfu from '@antfu/eslint-config'
import oxlint from 'eslint-plugin-oxlint'

export default antfu({
  react: true,
  jsx: true,
  ignores: ['dist'],
}, ...oxlint.configs['flat/recommended'])
