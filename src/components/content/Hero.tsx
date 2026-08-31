import type { JsonObject, PageRecord } from "@/runtime/schema";

interface HeroProps {
  readonly page: PageRecord;
  readonly image?: string;
  readonly align?: string;
  readonly showTitle?: boolean;
  readonly showDescription?: boolean;
  readonly showMeta?: boolean;
}

function stringField(object: JsonObject | undefined, key: string): string | undefined {
  const value = object?.[key];
  return typeof value === "string" ? value : undefined;
}

export function Hero({
  page,
  image = page.cover,
  align = "left",
  showTitle = true,
  showDescription = true,
  showMeta = false,
}: HeroProps) {
  const heroData = page.data.hero;
  const hero = heroData && typeof heroData === "object" && !Array.isArray(heroData)
    ? heroData as JsonObject
    : undefined;

  return (
    <header className={`hero hero--${align}`}>
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="hero__image" src={image} alt="" />
      ) : null}
      <div className="hero__copy">
        {showTitle ? <h1>{page.title}</h1> : null}
        {showDescription && page.description ? <p>{page.description}</p> : null}
        {stringField(hero, "quote") ? (
          <blockquote className="hero__quote">
            <p>“{stringField(hero, "quote")}”</p>
            {stringField(hero, "attribution") ? (
              <cite>— {stringField(hero, "attribution")}</cite>
            ) : null}
          </blockquote>
        ) : null}
        {showMeta && page.tags.length > 0 ? (
          <p className="hero__meta">{page.tags.join(" · ")}</p>
        ) : null}
      </div>
    </header>
  );
}
