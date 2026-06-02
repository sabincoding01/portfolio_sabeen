import { PageHeader } from "@/components/layout/page-header";
import { TestimonialsGrid } from "@/components/testimonials/testimonials-grid";
import { TestimonialForm } from "@/components/testimonials/testimonial-form";
import { getApprovedTestimonials } from "@/lib/data";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Testimonials",
  description: "Feedback from students, clients, and collaborators.",
  path: "/testimonials",
});

export default async function TestimonialsPage() {
  const testimonials = await getApprovedTestimonials();
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <PageHeader title="Testimonials" description="What students and clients say about working with Sabin." />
      <TestimonialsGrid testimonials={testimonials} />
      <section className="mt-16 max-w-xl mx-auto">
        <h2 className="text-xl font-bold mb-6 text-center">Share Your Feedback</h2>
        <TestimonialForm />
      </section>
    </div>
  );
}
