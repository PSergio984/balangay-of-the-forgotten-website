import { expect, test } from 'vitest';
import * as fs from 'node:fs';

test('CRT scanline overlay exists in layout', () => {
  const layout = fs.readFileSync('app/layout.tsx', 'utf-8');
  expect(layout).toContain('crt-overlay');
});
