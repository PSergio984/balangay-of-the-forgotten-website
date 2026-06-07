import { expect, test } from 'vitest';
import * as fs from 'node:fs';

test('Media Configuration', () => {
  const mediaConfig = fs.readFileSync('collections/Media.ts', 'utf-8');
  expect(mediaConfig).toContain("staticDir: 'public/media'");
  expect(mediaConfig).toContain("staticURL: '/media'");
});

test('SSG and ISR', () => {
  const page = fs.readFileSync('app/(site)/wiki/[category]/[slug]/page.tsx', 'utf-8');
  expect(page).toContain('export const revalidate = 3600');
  expect(page).toContain('export async function generateStaticParams()');
});

test('Footer', () => {
  const componentExists = fs.existsSync('components/landing/Footer.tsx');
  expect(componentExists).toBe(true);
  const layout = fs.readFileSync('app/(site)/layout.tsx', 'utf-8');
  expect(layout).toContain('<Footer />');
});

test('Rich Text', () => {
  const page = fs.readFileSync('app/(site)/wiki/[category]/[slug]/page.tsx', 'utf-8');
  expect(page).toContain('RichText');
  expect(page).not.toContain('Detailed lore description from archives');
});

test('SEO and Sitemap', () => {
  const page = fs.readFileSync('app/(site)/wiki/[category]/[slug]/page.tsx', 'utf-8');
  expect(page).toContain('export async function generateMetadata');
  
  const sitemapExists = fs.existsSync('app/sitemap.ts');
  expect(sitemapExists).toBe(true);
  const sitemap = fs.readFileSync('app/sitemap.ts', 'utf-8');
  expect(sitemap).toContain('export default async function sitemap()');
});
