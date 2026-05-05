# Viktor Kryvohuz - Portfolio Website

Personal portfolio website for **Viktor Kryvohuz**, a Unity Developer focused on **mobile gameplay systems, UI implementation, Firebase/AdMob integration, and production-ready Unity workflows**.

This repository contains the source code for a static portfolio website built for **GitHub Pages**. The site is designed to present commercial experience, selected Unity projects, technical case studies, CV access, and direct contact links in a clean, recruiter-friendly format.

## Live Website

[View Portfolio](https://dkameroon.github.io/)

## Overview

The website is built to:

- present Viktor as a Unity Developer candidate;
- showcase mobile Unity projects with dedicated project pages;
- combine visual presentation with technical credibility;
- make it easy for recruiters and studios to review projects, CV, and contact details.

## Main Features

- Hiring-focused landing page
- Featured Unity project section
- Project grid with sorting
- Dedicated case-study pages for each project
- Gameplay screenshots and short video previews
- Lightbox for screenshots and short gameplay videos
- Resume preview and download
- Commercial experience section
- Skills and team-value sections
- Responsive layout for desktop, tablet, and mobile

## Tech Stack

- `HTML5`
- `CSS3`
- `Vanilla JavaScript`
- `Font Awesome`
- `Google Fonts`

No framework, package manager, or build step is required.

## Project Structure

```text
.
|-- assets/
|   |-- apk/
|   |-- avatar/
|   |-- cv/
|   |-- images/
|   |-- short-gameplay-videos/
|   `-- ...
|-- projects/
|   |-- rushline.html
|   |-- simple-runner.html
|   |-- golf.html
|   |-- vertex-puzzle.html
|   `-- car-repair-shop.html
|-- index.html
|-- style.css
|-- script.js
`-- README.md
```

## Included Projects

- **Rushline** - 3D endless runner with Zenject, Firebase auth, leaderboard flow, rewarded ads, and state-machine gameplay
- **SimpleRunner** - mobile endless runner focused on gameplay loop, UI flow, and Android-ready structure
- **Golf** - arcade mini-golf project with swipe input, progression, and level-based gameplay
- **Vertex Puzzle** - logic puzzle game focused on path systems and player interaction
- **Car Repair Shop** - 3D idle-tycoon project with AI, crafting, upgrades, and progression systems

## Running Locally

### Option 1

Open `index.html` directly in a browser.

### Option 2

Run a simple local server:

```powershell
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Deployment

The project is intended for **GitHub Pages** deployment.

Typical flow:

1. Push the repository to GitHub
2. Open repository settings
3. Enable GitHub Pages
4. Select the publishing branch/root
5. Publish the site

## Updating Content

Main content is edited directly in the HTML files:

- `index.html` - homepage content and main sections
- `projects/*.html` - individual project pages
- `style.css` - visual styling and responsive behavior
- `script.js` - UI interactions such as navigation, sorting, CV modal, and media lightbox

Project assets are stored in `assets/`.

## Author

**Viktor Kryvohuz**

- GitHub: [github.com/dkameroon](https://github.com/dkameroon)
- LinkedIn: [linkedin.com/in/viktor-kryvohuz](https://www.linkedin.com/in/viktor-kryvohuz)
- Telegram: [t.me/VITON_28](https://t.me/VITON_28)

## Notes

This repository is a personal portfolio project and project showcase.
