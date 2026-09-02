import { MamboPage } from "@mambosite/react";
import {
  metadataForPage,
  pageFromSegments,
  staticPageParams,
} from "@mambosite/next";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { runtime } from "@/mambo/runtime";

interface ContentPageProps {
  readonly params: Promise<{ slug: string[] }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return staticPageParams(runtime);
}

export async function generateMetadata({ params }: ContentPageProps): Promise<Metadata> {
  const { slug } = await params;
  return metadataForPage(pageFromSegments(runtime, slug));
}

export default async function ContentPage({ params }: ContentPageProps) {
  const { slug } = await params;
  const page = pageFromSegments(runtime, slug);
  if (!page) notFound();
  return <MamboPage page={page} runtime={runtime} />;
}
