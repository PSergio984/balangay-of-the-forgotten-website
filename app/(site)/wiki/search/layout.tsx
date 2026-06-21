import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Search the Archives | Balangay of the Forgotten',
  description: 'Search historical records, character bios, boss movesets, and sacred relics from the archipelago.',
}

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
