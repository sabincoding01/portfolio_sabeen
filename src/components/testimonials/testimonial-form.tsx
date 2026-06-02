"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

const schema = z.object({
  name: z.string().min(2),
  occupation: z.string().min(2),
  rating: z.number().min(1).max(5),
  message: z.string().min(20),
  photo: z.string().url().optional().or(z.literal("")),
});

type FormData = z.infer<typeof schema>;

export function TestimonialForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { rating: 5 },
  });

  const onSubmit = async (data: FormData) => {
    const res = await fetch("/api/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) {
      toast.error(json.error ?? "Failed to submit");
      return;
    }
    toast.success(json.message ?? "Submitted for review!");
    reset();
  };

  return (
    <Card className="glass">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register("name")} />
            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
          </div>
          <div>
            <Label htmlFor="occupation">Occupation</Label>
            <Input id="occupation" {...register("occupation")} />
          </div>
          <div>
            <Label htmlFor="rating">Rating (1-5)</Label>
            <Input id="rating" type="number" min={1} max={5} {...register("rating")} />
          </div>
          <div>
            <Label htmlFor="photo">Photo URL (optional)</Label>
            <Input id="photo" {...register("photo")} placeholder="https://..." />
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" rows={4} {...register("message")} />
            {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
          </div>
          <Button type="submit" variant="gradient" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Testimonial"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
