import * as migration_20260226_183214 from './20260226_183214';
import * as migration_20260305_095603 from './20260305_095603';

export const migrations = [
  {
    up: migration_20260226_183214.up,
    down: migration_20260226_183214.down,
    name: '20260226_183214',
  },
  {
    up: migration_20260305_095603.up,
    down: migration_20260305_095603.down,
    name: '20260305_095603'
  },
];
