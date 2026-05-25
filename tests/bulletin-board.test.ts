import { expect, test } from 'vitest';
import * as fs from 'node:fs';

test('BulletinBoard exists and uses staggered Framer Motion animations', () => {
  const component = fs.readFileSync('components/landing/BulletinBoard.tsx', 'utf-8');
  expect(component).toContain('framer-motion');
  expect(component).toContain('staggerChildren');
});
