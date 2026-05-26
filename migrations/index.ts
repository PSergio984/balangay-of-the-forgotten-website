import * as migration_20260526_123438_initial_setup from './20260526_123438_initial_setup';
import * as migration_20260526_123608_lore_collections from './20260526_123608_lore_collections';
import * as migration_20260526_165039_name from './20260526_165039_name';

export const migrations = [
  {
    up: migration_20260526_123438_initial_setup.up,
    down: migration_20260526_123438_initial_setup.down,
    name: '20260526_123438_initial_setup',
  },
  {
    up: migration_20260526_123608_lore_collections.up,
    down: migration_20260526_123608_lore_collections.down,
    name: '20260526_123608_lore_collections',
  },
  {
    up: migration_20260526_165039_name.up,
    down: migration_20260526_165039_name.down,
    name: '20260526_165039_name'
  },
];
