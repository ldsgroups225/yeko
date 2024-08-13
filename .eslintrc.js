module.exports = {
  env: {
    'browser': true,
    'es2021': true,
    'react-native/react-native': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react-native/all',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', 'react-native', '@typescript-eslint', 'import'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react-native/no-inline-styles': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'import/order': [
      'error',
      {
        'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        'alphabetize': { order: 'asc', caseInsensitive: true },
        'pathGroups': [
          { pattern: '@assets/**', group: 'internal', position: 'before' },
          { pattern: '@components/**', group: 'internal', position: 'before' },
          { pattern: '@helpers/**', group: 'internal', position: 'before' },
          { pattern: '@hooks/**', group: 'internal', position: 'before' },
          { pattern: '@modules/**', group: 'internal', position: 'before' },
          { pattern: '@routers/**', group: 'internal', position: 'before' },
          { pattern: '@providers/**', group: 'internal', position: 'before' },
          { pattern: '@screens/**', group: 'internal', position: 'before' },
          { pattern: '@store/**', group: 'internal', position: 'before' },
          { pattern: '@styles/**', group: 'internal', position: 'before' },
          { pattern: '@utils/**', group: 'internal', position: 'before' },
          { pattern: '@src/**', group: 'internal', position: 'before' },
        ],
      },
    ],
  },
  settings: {
    'react': {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {},
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
