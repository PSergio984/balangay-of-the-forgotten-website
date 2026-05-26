import * as migration_20260526_123438_initial_setup from './20260526_123438_initial_setup';
import * as migration_20260526_123608_lore_collections from './20260526_123608_lore_collections';
import * as migration_20260526_134656_revert_to_upload_images from './20260526_134656_revert_to_upload_images';

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
    up: migration_20260526_134656_revert_to_upload_images.up,
    down: migration_20260526_134656_revert_to_upload_images.down,
    name: '20260526_134656_revert_to_upload_images'
  },
];
