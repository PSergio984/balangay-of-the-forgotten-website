import { expect, test } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';

test('ParallaxHero component exists and uses Framer Motion', () => {
  const componentPath = path.join(process.cwd(), 'components/landing/ParallaxHero.tsx');
  expect(fs.existsSync(componentPath)).toBe(true);
  
  const component = fs.readFileSync(componentPath, 'utf-8');
  expect(component).toContain('framer-motion');
  expect(component).toContain('useScroll');
  expect(component).toContain('useTransform');
});
