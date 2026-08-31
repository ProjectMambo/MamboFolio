---
tags:
  - web/ArchLinux
  - web/Hyprland
  - web/Wayland
  - web/Zsh
description: A design-driven ecosystem of optimized Unix configurations, unified palettes, and automated dotfile deployment architectures.
title: Project Mambo
order: 10
data:
  period: May 2026 - Present
  wikiUrl: https://projectmambo.org/
  githubUrl: https://github.com/ProjectMambo
---

::page{layout="project" width="normal"}

::meta{show=["period","description","tags","wikiUrl","githubUrl"] style="stack" empty="hide"}

## In The Beginning 

### What Was Missing?
I was once a **Windows** kid, bearing with how slow and heavy Windows is, and how they cram countless useless slop inside your precious machine. I also use **Apple** products; their stuff excels in smoothness and the ecosystem, the designers thought of everything *(including one feature to hate on for each product)*. With Windows, everything was fine, working as usual, but it just lacked that user experience, that sense of **freedom**. What kept me inside this total mess of slop was how gaming was viable only on Windows at that time, and then came Valve to save the day, pushing Linux as a reliable system for gaming *(Love you GabeN)*. 

So naturally, one day, I was done with **Microslop** and decided to switch. Here came the question every Linux user has once asked themselves: *what distro should I use?* Something reliable like **Ubuntu**, or something simple like **Mint**, or did gaming rule my life, making **Fedora** suit me better? After some **'careful'** consideration *(more like watching [Pewdiepie switching to Linux](https://youtu.be/pVI_smLgTY0))*, I chose **Arch**, arguably the holy grail of Linux. It goes from extremely high customizability to breaking your whole machine just by updating. 

At first, I was lazy. Trying to get something running, I used others' configs. It was good, but once again lacked that personal touch. This was the situation until one day I tried to update my system **without backing up first** *(learnt it the hard way)*. As expected, something broke. That moment was when I finally made up my mind to use my own configs, so I ran the uninstall script provided by the author of the configs I used. Those were my machine's **last words**. Stupid me clicked *yes* on all prompts, and guess what? The script literally deleted most of the core packages including **networkmanager**, that's right, the one single package that decides how smoothly you can recover your machine.

It was my first time breaking my machine *(in the foreseeable future, there could be many more times)*, so I panicked and asked the smartest consultant I had, **Gemini**. It was not a great idea; silly me took a detour for a couple of hours, going down the rabbit hole that Gemini dug. Long story short, I ended up using my phone to download the packages and transferred them to my machine using a thumb drive. **Simple solutions take the longest to find.**

### Why Project Mambo?
Despite having my own setup, it's **not enough**. I wanted to step up my game, and that's how **Project Mambo** was born. It's not just a simple repository with all my setups; it's a collection of repositories that has the potential to grow and expand, until one day I believe it'll become something I've never even thought of, something way beyond my expectations. 

I know some of you might ask, *why Mambo? What's Mambo?* It was originally **Mamba**, the snake and also the nickname of the legend Kobe Bryant. But as I was designing the logo, I found it too serious. It didn't really fit the vibe. As a meme enthusiast, the first thing that came to mind was, of course, a meme. If you're a serious memer and are quite fond of Chinese memes, you'll definitely know the **Hachimi Mambo** meme where cats do all sorts of stuff like dancing or singing. That's where all the pieces connected and **Mambo** was finalized. More on this at **[MamboFont](/project/mambofont)**.

Then what's the point of **Project Mambo**? Why do I need this project? Can't I put all of them in one huge repository? Or why not just have some repositories for dedicated stuff and call it a day? This is what I call **the potential of branding**. 

Take Apple as an example. They could have named their phones 'applephone', then their laptops 'bananabooks', then instead of AirPods, it's 'papayapods' and also 'watermelon watch' or 'coconutpad'. They're all based on fruits, so they all fit the theme, right? No, they sound ridiculous. Or they could have given their items generic names like 'phone 17 pro max' or 'earpods' or 'watch 2 ultra' or even 'laptop'. These are easy-to-understand names, but do they sound good? **NO!** Here comes **the potential of branding**. They either slap an 'i' or 'apple' in front, or they come up with some sort of name for a pre-existing technology or product, which makes no sense but people still buy it. Take the iPhone 17 Pro Max, strip the logo and the name, will people still buy it? Probably yes, it's a great phone, but to what extent? What most people are buying is that one little bitten apple. That's called **branding**.

That's what I want to do. It's not just a custom dotfiles setup, it's not just some simple websites; they are all **Mambo** projects. It's a whole ecosystem of tools and setups that all serve their own purposes. I also provided space to grow. In the future, I can migrate **[MamboDot](/project/mambodot)** to Komorebi and make a Windows version, or I can make a media player, or a finance tracker, or useful tools that you don't recognize but play crucial roles in your day-to-day computer experience. Then slap a **Mambo** in front and they all become parts of the system. That's the **philosophy** behind this project.

### All In All
**Project Mambo** is born out of a rough introduction to Arch Linux, transitioning from standard, broken configurations into a fully customized, personal ecosystem. It embraces the philosophy of consistent branding to turn a collection of dotfiles and tools into a cohesive digital identity. 

*(summary written by Gemini)*

---

## Blueprint & Design

### Design Principles 
When it comes to design, I'm not much of a designer myself. In fact, I have nothing to do with designing stuff; the only kind of design I know is about designing a program or a group project that nobody wants to do but we still do it because it's an assignment. That's why it's quite a challenge to come up with a suitable design for this project. It's not just coming up with some random names and asking ChatGPT or Claude to do it; it's a whole theme that I insist on being consistent across the whole system.

That's the main consideration: **consistency**. I want a system where all the colors fit the theme, and all the icons and characters fit the theme. I want every nook and cranny to be **Mambo**, each corner, each stroke, each angle, all being **consistent**. That's the reason I made **[MamboColour](/project/mambocolour)** and **[MamboFont](/project/mambofont)**, to make them the single source of truth for my whole project.

Another thing is **personality**. As *Charles M. Schwab* said, *"Personality is to a man what perfume is to a flower."* The whole point of this project is to show my own personality. **Who am I?** What do I **believe**? What's my **philosophy** for this project? 

If you've been looking around this site, you probably might have noticed the **blockiness** of the corners. That's one of my designs. In the current state of UI design, literally everything is rounded: search boxes, video entries, window tabs, every corner. However, I don't really believe in rounded corners, and there are a few reasons for that. One is that rounded corners are a hassle to keep consistent, like needing different rounding radii on outer and inner corners; this fact alone scares me. But more importantly, I believe you don't need roundness for everything. Sure, it makes things more approachable and gives that sense of safety *(according to Gemini :>)*, but we need something different, something that we are not used to, something that stands out. And that's **90-degree corners**. They are just as good, if not better. Aside from this, aesthetics is also what I'm chasing. I like how everything blends together when they are perfect squarish corners. Maybe not always straight corners, but they are all not rounded; they come together and give a sense of **harmony**. 

*p.s. Ain't this some sort of discrimination against rounded corners? Hmm.*

### The Trade-offs
**Project Mambo** is a whole series of tools and setups revolving around the **Arch Linux** system. But why Arch in the first place? There are a whole lot of distros to choose from, so why did I settle on Arch? It all comes down to three main aspects: **customizability, lightweight nature, and community**. 

Arch provides high potential to customize your own system down to the nitty-gritty. From having no desktop environment at all and only relying on the terminal, to making your own components for your system, it only provides the barebones to make it run, and everything is on you from that point onwards. The upside of having only the bare minimum to keep the system running is the absolute **lightweight** nature of the system. Technically you only need a few packages to make Arch run *(though it might not be that functional, it does work)*, but a normal installation through a Live USB does come with more packages at first, like **networkmanager** *(or else you can't even download stuff easily)* or **nano** *(a simple text editor)*. 

Furthermore, when it comes to choosing a whole new environment to work in, it's important to consider the **community**. Without a good community, it's practically impossible to solve the problems you face, especially for stuff that is notoriously difficult *(like Arch)* or stuff that doesn't have clear documentation *(some say like Git)*. In the case of Arch, it has a great community that is free to ask questions and also great documentation: the [ArchWiki](https://wiki.archlinux.org/title/Main_page).

Everything sounds great, but what about the **quirks**? Does Arch have any quirks that'll make you go kaboom *(rest in peace my granny she got hit by a bazooka~)*? *You might want to sit down for this.* One of the main quirks is your system will most likely **break when you update**; it is the nightmare of Arch users. Why is this the case? It's because Arch does rolling releases. You'll get new updates constantly, and that means bugs that escaped checking or mismatched dependency versions. One way to tackle this weird feature *(more like an issue)* is to simply **not update**. Yup, that's it, you just don't update. The system still works, and it won't keep asking you to update nor suddenly do an automatic update when you boot up *(take that, Windows users)*. Other than always living under this fear of breaking your system, are there any other quirks? To be honest, I don't know. There probably are much more; I just haven't encountered them yet.

---

## Technical Challenges 

### Things Went Wrong
It's Arch, so surely something has gone wrong before. Here's the story: It's about the time when I updated my system but didn't backup. I was still using others' configs, [Illogical Impulse](https://github.com/end-4/dots-hyprland) to be exact. Then one day, I updated, not knowing that Hyprland's new version used **Lua** instead of the old **conf** format *(more on this at [MamboDot](/project/mambodot))*. When I rebooted, lines of warnings emerged at the top banner. At that moment, I thought I might as well use my own config. So, I ran the uninstall script of the configs, and just like the intro said, I said yes to all the prompts *(without looking carefully)*, and it deleted literally most of the important system packages, including those that connect your machine to the Internet. Here went me, trying to fix it with the help of Gemini.

### Sherlock Holmes
Since everything was broken, I booted back into **TTY** and lived in the terminal for several hours *(I tried to revert back to an old snapshot, only to remember I hadn't backed up)*. As it had deleted a heck of a lot of packages, the obvious approach was to install them back. But I had no internet, as well as no tools to let me configure my network settings in the terminal; basically, I was doomed. 

So, the first approach I tried to fix this situation was connecting my machine back to the Internet through tethering with my phone *(what a surprise)*. However, I don't know why, but my laptop just wasn't registering my phone when I plugged it in. Maybe it was the cable's issue, or the port, or maybe even my phone, I wasn't sure. So instead, I tried tethering using my e-book reader. I crawled through countless settings, only for it to end up not working again.

I consulted Gemini, the only being around me that supposedly knew how to fix this. It suggested a Live USB; I just had to flash the Arch ISO image to a thumb drive and repair my system. Here's the catch: I didn't want to flash my own USB drive as I normally used it, and the one I used to install Arch wasn't with me at that time. Here went option two.

### Final Solution
I kept thinking and thinking, until a smart and somewhat obvious idea popped up: I could have just downloaded the files on my phone from the ArchWiki, then transferred them to my machine using the thumb drive. Sometimes, in those "Aha!" moments, you'll just wonder why those thoughts didn't come to you at first. And that's exactly what I did. I downloaded some packages, moved them to my laptop, installed them, and then I was finally back online.

---

## Looking Back

### Start Over
A great question is: what would I have done differently if I started over? Would I choose another distro, or still use someone else's config *(definitely not going back to Microslop, though)*? It might not be as surprising as it seems, but I'd still choose Arch. Once you've experienced this system, there's no going back. On top of that, I'd probably try using my own config right from the start.

### The Next Iteration 
Now what's next? What's something that I'll do now? On my plan, it's going to be designing my own font. I've designed some icons in **[MamboFont](/project/mambofont)**, but I still need that full custom font to make stuff truly consistent. That's it for now.
