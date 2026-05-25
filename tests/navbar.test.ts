import { expect, test } from 'vitest';
import fs from 'fs';
import path from 'path';

test('Sticky Pixel Navbar exists with correct links', () => {
  const componentPath = path.join(process.cwd(), 'components/landing/PixelNavbar.tsx');
  expect(fs.existsSync(componentPath)).toBe(true);

  const component = fs.readFileSync(componentPath, 'utf-8');
  expect(component).toContain('sticky');
  expect(component.toUpperCase()).toContain('EXPLORE');
  expect(component.toUpperCase()).toContain('LOGBOOK');
  expect(component.toUpperCase()).toContain('WIKI');
});
