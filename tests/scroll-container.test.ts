import { expect, test } from 'vitest';
import fs from 'fs';

test('AncientScrollContainer uses thematic background and scroll-mask utility', () => {
  const component = fs.readFileSync('components/landing/AncientScrollContainer.tsx', 'utf-8');
  expect(component).toContain('scroll-mask');
  expect(component).toContain('bg-[#F0F9FF]');
});
