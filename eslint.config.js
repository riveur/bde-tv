import { configApp, RULES_LIST } from '@adonisjs/eslint-config'

export default configApp({
  name: 'Custom config for Inertia',
  files: ['inertia/**/*.ts', 'inertia/**/*.tsx'],
  rules: RULES_LIST,
})
