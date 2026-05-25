import { expect, test } from 'vitest';
import fs from 'fs';

test('AmbientPlayer exists with unmute toggle', () => {
  const component = fs.readFileSync('components/audio/AmbientPlayer.tsx', 'utf-8');
  expect(component).toContain('UNMUTE');
  expect(component).toContain('<audio');
});
