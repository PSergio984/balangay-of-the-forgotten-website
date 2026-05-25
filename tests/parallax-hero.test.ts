import { expect, test } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';

test('ParallaxHero component exists and uses GSAP', () => {
  const componentPath = path.join(process.cwd(), 'components/landing/ParallaxHero.tsx');
  expect(fs.existsSync(componentPath)).toBe(true);
  
  const component = fs.readFileSync(componentPath, 'utf-8');
  expect(component).toContain('useGSAP');
  expect(component).toContain('ScrollTrigger');
  expect(component).toContain('data-layer="background"');
});
