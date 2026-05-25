import { expect, test } from 'vitest';
import * as fs from 'node:fs';

test('AncientScrollContainer uses thematic background and scroll-mask utility', () => {
  const component = fs.readFileSync('components/landing/AncientScrollContainer.tsx', 'utf-8');
  expect(component).toContain('scroll-mask');
  expect(component).toContain('bg-[#F0F9FF]');
});
