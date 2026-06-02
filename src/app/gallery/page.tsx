import { GalleryClient } from "@/components/gallery/gallery-client";
import { PageHeader } from "@/components/layout/page-header";
import { getGallery } from "@/lib/data";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Gallery",
  description: "Training sessions, events, and work photos.",
  path: "/gallery",
});

export default async function GalleryPage() {
  const items = await getGallery();
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <PageHeader title="Gallery" description="Moments from training, events, and projects." />
      <GalleryClient items={items} />
    </div>
  );
}
