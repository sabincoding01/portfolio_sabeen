import { CertificatesClient } from "@/components/certificates/certificates-client";
import { PageHeader } from "@/components/layout/page-header";
import { getCertificates } from "@/lib/data";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Certificates",
  description: "Professional certifications and achievements.",
  path: "/certificates",
});

export default async function CertificatesPage() {
  const certificates = await getCertificates();
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <PageHeader title="Certificates" description="Credentials and professional certifications." />
      <CertificatesClient certificates={certificates} />
    </div>
  );
}
