import { expect, test } from 'vitest';
import fs from 'fs';

test('BulletinBoard exists and uses staggered animations', () => {
  const component = fs.readFileSync('components/landing/BulletinBoard.tsx', 'utf-8');
  expect(component).toContain('stagger');
  expect(component).toContain('data-type="note"');
});
