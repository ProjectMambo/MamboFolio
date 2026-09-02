---
description: Personal portfolio for Solomon and Project Mambo.
title: Solomon
cover: /profile/profile-square.jpg
data:
  navigation:
    - label: KOHKOHNUT
      href: /
    - label: HOME
      href: /
    - label: PROJECT
      href: /project/
    - label: BLOG
      href: /blog/
    - label: GALLERY
      href: /gallery/
  hero:
    quote: You can't live without I've
    attribution: 21st cent. Shakespeare
  footer:
    copyright: 2026 Project Mambo. Built with MamboSite and Next.js.
    links:
      - label: About This Site
        href: /project/mambofolio/
      - label: Source Code
        href: https://github.com/ProjectMambo/MamboFolio
---

::page{layout="home" width="wide"}

::hero{image="/profile/profile-square.jpg" align="split" show-description=false}

*F.Y.I. Use the theme control in the navigation bar to switch colour schemes.*

---

::include{source="[[About]]" mode="inline" headings="shift" show-title=false show-source=false}

---

## Project

::children{source="/project/" view="grid" columns=3 sort="order" direction="asc" limit=3 show=["title","description"]}

::button{label="See More" href="/project/" variant="secondary"}

---

## Blog

::children{source="/blog/" view="list" sort="date" direction="desc" limit=3 show=["date","title","description"]}

::button{label="See More" href="/blog/" variant="secondary"}

---

## Gallery

::gallery{source="/gallery/" view="grid" columns=3 fit="cover" captions=true}

::button{label="See More" href="/gallery/" variant="secondary"}

---

## Contact

::::columns{count=3 gap="small" collapse-at="md"}

:::column

::button{label="Email" href="mailto:me@kohkohnut.org" variant="secondary" external=true}

:::

:::column

::button{label="GitHub" href="https://github.com/KohKoh-Nut" variant="secondary" external=true}

:::

:::column

::button{label="LinkedIn" href="https://www.linkedin.com/in/sheng-jun-koh" variant="secondary" external=true}

:::

::::

::::columns{count=3 gap="small" collapse-at="md"}

:::column

::button{label="Instagram" href="https://www.instagram.com/kohkohnut67" variant="secondary" external=true}

:::

:::column

::button{label="Facebook" href="https://www.facebook.com/profile.php?id=61592514714206" variant="secondary" external=true}

:::

:::column

::button{label="Steam" href="https://steamcommunity.com/id/KohKohNut/" variant="secondary" external=true}

:::

::::
