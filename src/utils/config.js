import produce from 'immer'

const hostname = window && window.location && window.location.hostname

let envName = ''
if (hostname.toLowerCase().includes('prod')) {
  envName = 'PROD'
} else if (hostname.toLowerCase().includes('uat')) {
  envName = 'UAT'
} else if (hostname.toLowerCase().includes('sit')) {
  envName = 'SIT'
} else if (hostname.toLowerCase().includes('dev')) {
  envName = 'DEV'
} else if (hostname === 'localhost') {
  envName = 'LOCAL'
}

const env = {
  name: envName,
  hostname: !!window ? window.location.hostname : '',
}

console.log('window-env', env)

const base = {
  env,
  server: { url: 'http://localhost:3000' },
  oAuth: {},
}

const config = {
  LOC: base,
  DEV: produce(base, (draft) => {
    draft.server.url = 'https://dev.com'
  }),
  SIT: produce(base, (draft) => {
    draft.server.url = 'https://sit.com'
  }),
  UAT: produce(base, (draft) => {
    draft.server.url = 'https://uat.com'
  }),
  PROD: produce(base, (draft) => {
    draft.server.url = 'https://prod.com'
  }),
}

export default config[env.name]
