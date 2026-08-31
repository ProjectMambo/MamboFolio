import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageView } from "@/components/content/PageView";
import {
  getPageByRoute,
  pages,
  routeFromSegments,
  segmentsFromRoute,
} from "@/lib/content";

interface ContentPageProps {
  readonly params: Promise<{ slug: string[] }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return pages
    .filter((page) => page.route !== "/")
    .map((page) => ({ slug: segmentsFromRoute(page.route) }));
}

export async function generateMetadata({ params }: ContentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageByRoute(routeFromSegments(slug));
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
  };
}

export default async function ContentPage({ params }: ContentPageProps) {
  const { slug } = await params;
  const page = getPageByRoute(routeFromSegments(slug));
  if (!page) notFound();
  return <PageView page={page} />;
}
