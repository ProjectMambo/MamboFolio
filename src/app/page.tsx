import { MamboPage } from "@mambosite/react";

import { runtime } from "@/mambo/runtime";

export default function HomePage() {
  return <MamboPage page={runtime.store.entryPage} runtime={runtime} />;
}
