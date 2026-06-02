"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Testimonial } from "@/types";

export function TestimonialsGrid({ testimonials }: { testimonials: Testimonial[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div>
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {testimonials.map((t) => (
          <TestimonialCard key={t.id} testimonial={t} />
        ))}
      </div>

      <div className="md:hidden relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {testimonials.map((t) => (
              <div key={t.id} className="flex-[0_0_90%] min-w-0">
                <TestimonialCard testimonial={t} />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-2 mt-4">
          <Button variant="outline" size="icon" onClick={scrollPrev}><ChevronLeft /></Button>
          <Button variant="outline" size="icon" onClick={scrollNext}><ChevronRight /></Button>
        </div>
      </div>
    </div>
  );
}

function TestimonialCard({ testimonial: t }: { testimonial: Testimonial }) {
  return (
    <Card className="glass h-full">
      <CardContent className="p-6">
        <div className="flex gap-1 mb-3">
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <p className="text-muted-foreground italic">&ldquo;{t.message}&rdquo;</p>
        <div className="mt-4 flex items-center gap-3">
          <Avatar>
            {t.photo && <AvatarImage src={t.photo} alt={t.name} />}
            <AvatarFallback>{t.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{t.name}</p>
            <p className="text-sm text-muted-foreground">{t.occupation}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
