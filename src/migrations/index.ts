import * as migration_20260226_183214 from './20260226_183214'

export const migrations = [
  {
    up: migration_20260226_183214.up,
    down: migration_20260226_183214.down,
    name: '20260226_183214',
  },
]
