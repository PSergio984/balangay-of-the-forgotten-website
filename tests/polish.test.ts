import { expect, test } from 'vitest';
import * as fs from 'node:fs';

test('AmbientPlayer exists with unmute toggle', () => {
  const component = fs.readFileSync('components/audio/AmbientPlayer.tsx', 'utf-8');
  expect(component).toContain('UNMUTE');
  expect(component).toContain('<audio');
});
