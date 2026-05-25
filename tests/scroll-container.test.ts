import { expect, test } from 'vitest';
import fs from 'fs';

test('AncientScrollContainer uses SVG mask and thematic background', () => {
  const component = fs.readFileSync('components/landing/AncientScrollContainer.tsx', 'utf-8');
  expect(component).toContain('mask-image');
  expect(component).toContain('bg-[#F0F9FF]');
});
