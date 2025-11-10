import { pageMetadata } from "@/lib/data/metadata";
import About from '@/components/sections/about';

export const metadata = {
  title: pageMetadata.about.title,
  description: pageMetadata.about.description,
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <About />
    </main>
  );
}