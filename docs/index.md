---
description: Personal portfolio for Solomon and Project Mambo.
title: Solomon
cover: assets/profile/profile-square.jpg
data:
  navigation:
    - label: KOHKOHNUT
      href: /
    - label: ABOUT
      href: /about/
    - label: CURRENT
      href: /current/
    - label: UNI
      href: /uni/
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

::hero{image="assets/profile/profile-square.jpg" align="split" show-description=false}

---

## About Me

I'm Solomon, a Malaysian Year 2 NUS student studying Artificial Intelligence, Statistics, and Japanese. I like building things, reading widely, jogging, and spending an unreasonable amount of time around code and cue sports.

::button{label="More About Me" href="/about/" variant="secondary"}

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

::button{label="General · me@kohkohnut.org" href="mailto:me@kohkohnut.org" variant="card" external=true}

:::

:::column

::button{label="Uni · solomonkoh@u.nus.edu" href="mailto:solomonkoh@u.nus.edu" variant="card" external=true}

:::

:::column

::button{label="GitHub" href="https://github.com/KohKoh-Nut" variant="card" external=true}

:::

:::column

::button{label="LinkedIn" href="https://www.linkedin.com/in/sheng-jun-koh" variant="card" external=true}

:::

:::column

::button{label="Telegram" href="https://t.me/kohkohnut1202" variant="card" external=true}

:::

:::column

::button{label="Instagram" href="https://www.instagram.com/kohkohnut67" variant="card" external=true}

:::

:::column

::button{label="WhatsApp" href="https://wa.me/60127607128" variant="card" external=true}

:::

:::column

::button{label="Facebook" href="https://www.facebook.com/profile.php?id=61592514714206" variant="card" external=true}

:::

:::column

::button{label="Steam" href="https://steamcommunity.com/id/KohKohNut/" variant="card" external=true}

:::

::::
