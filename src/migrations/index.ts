import * as migration_20260226_183214 from './20260226_183214';
import * as migration_20260305_095603 from './20260305_095603';
import * as migration_20260317_183319 from './20260317_183319';
import * as migration_20260319_071627 from './20260319_071627';

export const migrations = [
  {
    up: migration_20260226_183214.up,
    down: migration_20260226_183214.down,
    name: '20260226_183214',
  },
  {
    up: migration_20260305_095603.up,
    down: migration_20260305_095603.down,
    name: '20260305_095603',
  },
  {
    up: migration_20260317_183319.up,
    down: migration_20260317_183319.down,
    name: '20260317_183319',
  },
  {
    up: migration_20260319_071627.up,
    down: migration_20260319_071627.down,
    name: '20260319_071627'
  },
];
