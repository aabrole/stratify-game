// ESLint configuration for Next.js (Flat Config)
const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  {
    ignores: ['dist/*', '.next/*', 'node_modules/*'],
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
];
