import nextVitals from 'eslint-config-next'

const config = [
  {
    ignores: [
      '.kilo/**',
      '.next/**',
      'out/**',
      'node_modules/**',
      'next-env.d.ts',
    ],
  },
  ...nextVitals,
]

export default config
