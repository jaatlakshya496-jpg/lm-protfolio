# Lakshya Malik - Digital Marketer, Graphic Designer & AI Web Developer

## Portfolio Website

A modern, dark-themed portfolio website built with React, Vite, and Tailwind CSS showcasing digital marketing, graphic design, and AI web development services from Kaithal, Haryana.

## Live Demo

- **Website**: https://lakshya-portfolio.vercel.app
- **GitHub**: https://github.com/jaatlakshya496-jpg/lm-protfolio

## Sections

### Home
- Typewriter effect cycling through roles: Digital Marketer, Graphic Designer, AI Web Developer
- Animated background with moving lights and stars
- Skills wheel with animated items
- Mini counters (3 skills, 2 live projects, 100% freelance ready)
- Marquee strip scrolling through services

### About
- Personal story and background
- Skills & services grid (6 main skills with descriptions)
- Tools used (10 different tools)
- Journey timeline (After 12th → Digital marketing → Graphic design & AI web dev)
- FAQ section with 6 commonly asked questions

### Projects
- Project cards with 3D tilt effect on hover
- Live website links (opens in new tab)
- Project breakdown table showing name and technology stack
- Option to start new projects

### Contact
- WhatsApp contact form (main CTA)
- Contact details sidebar with phone, email, location
- Social media links (LinkedIn, GitHub, Instagram)
- Message saved to localStorage for admin review

## Admin Panel

### Features
- **Password-protected login**: `lakshya2024`
- **View all customer messages** from the contact form
- **Delete messages** no longer needed
- **Message count** displayed
- Works on both desktop and mobile

### How to Use
1. Visit the website
2. Look for the small accent circle in the top-right corner (admin toggle)
3. Click it and enter password: `lakshya2024`
4. Admin dashboard appears showing all messages
5. Messages are also saved automatically when visitors submit the contact form

### Message Storage
- All contact form messages are saved to browser's `localStorage`
- Key: `portfolio_messages`
- Accessible via admin panel
- Persists across sessions

## Technical Stack

### Frontend
- **React 19** with React Router (SPA with clean URLs)
- **Vite** build tool
- **Tailwind CSS** v4 for styling
- **motion/react** for animations
- **lucide-react** for icons

### Features
- History API routing (no hashbangs, clean `/about`, `/projects`, `/contact`)
- SEO-optimized with meta tags, Open Graph, Twitter cards
- JSON-LD structured data (Person, WebSite, ProfessionalService, FAQPage)
- Sitemap.xml and robots.txt for search engines
- Responsive design (mobile-first)
- Accessibility (skip links, aria labels, focus-visible)
- Reduced-motion support
- Pointer effects (spotlight + 3D card tilt)

### Performance
- 2078 modules transformed
- Gzipped CSS: ~8.6KB
- Gzipped JS: ~122KB
- Build time: ~2 seconds

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server at http://localhost:3000 |
| `npm run build` | Build for production (output in `dist/`) |
| `npm run preview` | Preview production build locally |

## SEO

### Meta Tags
- Title and description per page
- 28 keywords including: digital marketer Kaithal, freelance, SEO, graphic designer, AI web developer
- Author tag
- Robots: index, follow

### Open Graph
- og:type: website
- og:title, og:description, og:image (1200×630)
- og:url, og:site_name, og:locale
- Twitter cards: summary_large_image

### Structured Data (JSON-LD)
- Person schema with geo-coordinates (Kaithal, Haryana, India)
- WebSite schema
- ProfessionalService schema (6 services with catalog)
- FAQPage schema (10 frequently asked questions)
- ItemList schema (projects)
- AboutPage/ContactPage/CollectionPage schemas

### Files
- `public/sitemap.xml` - 4 URLs with priorities
- `public/robots.txt` - references sitemap
- `public/site.webmanifest` - PWA manifest
- `public/favicon.svg` - L logo icon
- `public/og-image.png` - 1200×630 sharing image

## Contact

- **WhatsApp**: +91 96717 72205
- **Email**: jaatlakshya496@gmail.com
- **Location**: Barta, Kaithal, Haryana, India
- **LinkedIn**: https://www.linkedin.com/in/lakshya-barta-a92b1941a
- **GitHub**: https://github.com/jaatlakshya496-jpg
- **Instagram**: https://www.instagram.com/lakshya____malik

## License

MIT License - free to use and modify for personal projects.