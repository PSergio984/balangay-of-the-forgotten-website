import { expect, test } from 'vitest';
import fs from 'fs';

test('LogbookEntry uses serif font and has entrance animation', () => {
  const component = fs.readFileSync('components/landing/LogbookEntry.tsx', 'utf-8');
  expect(component).toContain('font-serif');
  expect(component).toContain('opacity-0');
  expect(component).toContain('ScrollTrigger');
});
