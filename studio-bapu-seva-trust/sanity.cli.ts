import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '9bi8pgnn',
    dataset: 'production'
  },
  studioHost: 'bapu-seva-trust',
  typegen: {
    enabled: true,
    path: '../frontend/src/**/*.{ts,tsx,js,jsx}',
    schema: 'schema.json',
    generates: '../frontend/sanity.types.ts',
    overloadClientMethods: true,
  },
})
