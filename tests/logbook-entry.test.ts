import { expect, test } from 'vitest';
import * as fs from 'node:fs';

test('LogbookEntry uses serif font and has Framer Motion entrance animation', () => {
  const component = fs.readFileSync('components/landing/LogbookEntry.tsx', 'utf-8');
  expect(component).toContain('font-serif');
  expect(component).toContain('framer-motion');
  expect(component).toContain('whileInView');
});
