import React from 'react';
import AncientScrollContainer from '@/components/landing/AncientScrollContainer';
import { getPayloadInstance } from '@/lib/payload';
import LogbookFeed from '@/components/landing/LogbookFeed';
import { News } from '@/payload-types';

export const revalidate = 3600;

export default async function LogbookPage() {
  const payload = await getPayloadInstance();
  
  // Fetch all news/updates/lore entries sorted by publishedDate descending
  const newsResult = await payload.find({
    collection: 'news',
    sort: '-publishedDate',
    limit: 100,
  });

  const newsItems = newsResult.docs.map((doc: News) => ({
    id: String(doc.id),
    title: doc.title,
    slug: doc.slug,
    category: doc.category as 'Lore' | 'Game Update' | 'Event' | 'Milestone',
    content: doc.content,
    publishedDate: doc.publishedDate,
    image: doc.image,
  }));

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-32 pb-20 text-white">
      <AncientScrollContainer>
        <div className="flex flex-col items-center gap-8 py-20">
          <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-widest text-[#0C4A6E] font-pixel text-center">
            Logbook
          </h1>
          <p className="text-xl text-gray-600 font-serif italic text-center max-w-2xl px-4">
            "Every entry is a fragment of the past. The ink is still wet on the stories of the new world."
          </p>
          <div className="w-24 h-1 bg-[#F97316]" />

          {/* Render the dynamic interactive Client Feed */}
          <div className="w-full mt-12">
            <LogbookFeed news={newsItems} />
          </div>
        </div>
      </AncientScrollContainer>
    </main>
  );
}
