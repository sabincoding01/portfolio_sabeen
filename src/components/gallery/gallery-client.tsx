"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { GALLERY_CATEGORIES } from "@/lib/constants";
import type { GalleryItem } from "@/types";

export function GalleryClient({ items }: { items: GalleryItem[] }) {
  const [category, setCategory] = useState("all");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const filtered = useMemo(() => {
    if (category === "all") return items;
    return items.filter((i) => i.category === category);
  }, [items, category]);

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setCategory("all")}
          className={`rounded-full px-4 py-2 text-sm ${category === "all" ? "bg-primary text-primary-foreground" : "bg-secondary"}`}
        >
          All
        </button>
        {GALLERY_CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={`rounded-full px-4 py-2 text-sm ${category === c ? "bg-primary text-primary-foreground" : "bg-secondary"}`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {filtered.map((item, i) => (
          <motion.button
            key={item.id}
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            className="break-inside-avoid w-full rounded-xl overflow-hidden relative group cursor-pointer"
            onClick={() => setLightbox(item)}
          >
            <Image
              src={item.imageUrl}
              alt={item.title}
              width={600}
              height={400}
              className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <span className="text-white font-medium">{item.title}</span>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              type="button"
              className="absolute top-4 right-4 text-white"
              onClick={() => setLightbox(null)}
              aria-label="Close"
            >
              <X className="h-8 w-8" />
            </button>
            <div className="relative max-h-[90vh] max-w-5xl w-full aspect-video" onClick={(e) => e.stopPropagation()}>
              <Image src={lightbox.imageUrl} alt={lightbox.title} fill className="object-contain" />
            </div>
            <p className="absolute bottom-8 text-white text-lg">{lightbox.title}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
