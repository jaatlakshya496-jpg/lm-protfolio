# GitHub Secrets & Content Editing Guide

## 🔐 Admin Password
- **Password**: `lakshya2024` (updated in `src/components/AdminLogin.tsx`)
- This is a **client-side** password stored in `sessionStorage`
- No GitHub secret needed - the password is embedded in the code
- To change it later: edit the `ADMIN_PASSWORD` constant in `AdminLogin.tsx`

## 📡 GitHub Secrets (for deployment)
If you want to store sensitive values for build/deployment:

1. Go to your GitHub repo > **Settings** > **Secrets and variables** > **Actions**
2. Click **New repository secret**
3. Name: `VITE_CONFIG_NATIVE_IGNORE_WARNING` (optional - suppresses Vite warning)
   Value: `true`
4. Or add your own secrets like API keys, etc.

## ✏️ How to Edit Portfolio Content

This is a **static React portfolio**. Content is managed in two ways:

### 1. **Code-based content** (primary method)
Edit these files to change pictures, descriptions, etc.:

| What to edit | File | Where it is |
|-------------|------|-------------|
| **Project cards** (name, URL, description, tags) | `src/config/site.ts` | `site.projects[]` array |
| **Site info** (name, role, tagline, contact, social links) | `src/config/site.ts` | `site` object |
| **SEO/metadata** | `src/config/site.ts` | `SITE_URL`, `ogImage`, etc. |
| **Home page content** | `src/pages/Home.tsx` | JSX structure |
| **About page** | `src/pages/About.tsx` | JSX structure |
| **Contact info** (email, phone, address) | `src/config/site.ts` | `site.contact`, `site.location` |

### 2. **Admin dashboard content** (localStorage)
The admin panel stores these in browser `localStorage`:
- **FAQs** (questions & answers) - via AdminDashboard → "FAQs" tab
- **Messages** (from contact form) - via AdminDashboard → "Messages" tab  
- **Projects** (alternate to config projects) - via AdminDashboard → "Projects" tab

**Note**: Admin data is stored locally in the user's browser. If you clear browsers or use a different device, it resets.

### 3. **Images/Pictures**
- Place images in `public/` folder for direct URL access (`/image-name.jpg`)
- Or import in components: `import img from './assets/image.jpg'`
- Current images referenced in code are in the deployed version

## 🛠️ Example: Editing a Project

To change/project add a new project:

1. Open `src/config/site.ts`
2. Find the `projects` array (around line 72-86)
3. Add or modify an object:

```typescript
{
  name: 'Your Project Name',
  url: 'https://your-project.vercel.app',
  description: 'Your project description here...',
  tags: ['Tag1', 'Tag2', 'Relevant tag'],
}
```

## 🚀 Push to GitHub

```bash
git add .
git commit -m "Update admin password to lakshya2024 + content editing guide"
git push origin main