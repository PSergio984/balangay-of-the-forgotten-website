import * as migration_20260526_123438_initial_setup from './20260526_123438_initial_setup';
import * as migration_20260526_123608_lore_collections from './20260526_123608_lore_collections';

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
];
