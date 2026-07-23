# Johnson's Academy

Professional digital skills training academy and digital services provider based in Nigeria. Built with semantic HTML5, CSS3, and vanilla JavaScript.

**Live Site:** [www.johnsonsacademy.com.ng](https://www.johnsonsacademy.com.ng)

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| HTML5 | Semantic markup, accessibility, SEO |
| CSS3 | Responsive layouts, CSS variables, animations |
| JavaScript (ES6+) | Mobile navigation, FAQ accordion, form validation, scroll effects |
| [Web3Forms](https://web3forms.com) | Contact form submission (no backend required) |
| Google Fonts | Sora (headings) + Manrope (body text) |

---

## Getting Started

This is a static site — no build tools or package managers required.

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/Mohamed-Bangura/johnson-s-academy.git
   ```

2. Navigate into the project:
   ```bash
   cd johnson-s-academy/johnsons-academy
   ```

3. Open `index.html` in your browser, or use a local server:
   ```bash
   # Using VS Code Live Server extension (recommended)
   # Right-click index.html → Open with Live Server

   # Or using Python
   python -m http.server 8000

   # Or using Node.js
   npx serve .
   ```

### Environment Variables

No environment variables needed. The contact form uses [Web3Forms](https://web3forms.com) with a public access key embedded in the HTML.

---

## Project Structure

```
johnsons-academy/
├── index.html              # Home page
├── about.html              # About page
├── services.html           # Services page
├── contact.html            # Contact page
├── sitemap.xml             # XML sitemap for SEO
├── robots.txt              # Search engine crawling rules
│
├── css/
│   └── style.css           # All styles (responsive, animations, design system)
│
├── js/
│   └── script.js           # All interactivity (menu, FAQ, form, scroll effects)
│
├── favicon/
│   └── favicon.png         # Browser tab icon
│
└── images/
    ├── about/              # About page images
    ├── gallery/            # Training session photos
    ├── hero/               # Hero banner image
    ├── icons/              # Service card images
    ├── portfolio/          # Portfolio showcase images
    └── profile/            # Logo / founder profile image
```

---

## Pages

| Page | Description |
|------|-------------|
| **Home** | Hero section, service previews, portfolio, FAQ, and call-to-action |
| **About** | Our story, mission & vision, core values, learning process, founder profile |
| **Services** | Detailed service cards for Graphic Design, Video Editing, Social Media Management, Facebook Ads, Instagram Ads, and Digital Marketing |
| **Contact** | Web3Forms-powered contact form with validation and Google Maps embed |

---

## Features

- Fully responsive (mobile, tablet, desktop)
- Mobile hamburger navigation with smooth transitions
- FAQ accordion with single-open behavior
- Scroll-to-top button
- Intersection Observer fade-in animations
- `prefers-reduced-motion` support
- Contact form with client-side validation and Web3Forms integration
- SEO meta tags, Open Graph, Twitter Card, and JSON-LD structured data on all pages
- Semantic HTML with ARIA labels for accessibility

---

## Deployment

This is a static site that can be deployed to any static hosting platform.

### Vercel

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → Import Project
3. Select the repository
4. Set **Root Directory** to `johnsons-academy`
5. Leave build settings empty (no build step needed)
6. Deploy

### Netlify

1. Push to GitHub
2. Go to [netlify.com](https://netlify.com) → Add new site → Import from Git
3. Select the repository
4. Set **Base directory** to `johnsons-academy`
5. Leave build command empty
6. Deploy

### GitHub Pages

1. Go to repository Settings → Pages
2. Set **Source** to "Deploy from a branch"
3. Select `main` branch and `/ (root)` folder
4. Save — site will be available at `https://Mohamed-Bangura.github.io/johnson-s-academy/johnsons-academy/`

---

## License

This project is proprietary. Built by PP Studio Agency for Johnson's Academy.
