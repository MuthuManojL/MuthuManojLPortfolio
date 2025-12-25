# 🚀 Quick Start Guide

Your futuristic portfolio is ready! Here's how to get it running.

## ⚡ 5-Minute Setup

### 1. Start the Development Server
```bash
cd "c:\Users\Muthu Manoj L\Downloads\curry-lab (1)"
npm run dev
```

The server will start on `http://localhost:8080`

### 2. Open in Browser
Visit: **http://localhost:8080**

### 3. Explore the Pages
- **Home** (/) - Welcome page
- **About** (/about) - Your background, skills, education
- **Portfolio** (/portfolio) - Your projects with filters
- **Projects** (/projects) - Detailed project listings
- **TechScreen** (/techscreen) - Interactive experience
- **Contact** (/contact) - Get in touch
- **Resume** (/resume) - Full resume viewer

## 🎨 Interactive Features

### Theme Toggle
- **Click** the sun/moon icon in the header (top right)
- **Drag** left/right to switch themes
- Theme preference is saved automatically

### Cursor Effects
Move your mouse around to see:
- Glowing cursor effect
- Particle trails
- Speed-responsive animations

### 3D Tilt Cards
Hover over project cards to see 3D tilt effect based on mouse position.

### TechScreen
Visit `/techscreen` for an interactive canvas that responds to your cursor/touch.

## 📱 Mobile Support

All features work on mobile:
- Touch-friendly navigation
- Responsive grid layouts
- Mobile-optimized animations
- Touch-based cursor effects

## 🔧 Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run start           # Start production server
npm run typecheck       # Check TypeScript
npm run format.fix      # Format code
npm run test            # Run tests

# Building
npm run build:client    # Build client only
npm run build:server    # Build server only
```

## 📊 Resume Data

Your resume information is automatically integrated from:
```
client/data/resumeData.ts
```

Update this file to change:
- Personal info
- Education
- Experience
- Projects
- Skills
- Certifications

## 🎯 File Structure

```
client/
├── pages/              # Page components
├── components/         # Reusable components
├── bits/              # Animation components
├── theme/             # Design system
├── data/              # Resume data
└── App.tsx            # Main app
```

## 🐛 Troubleshooting

**Server won't start?**
```bash
# Kill any process on port 8080
# Then try: npm run dev
```

**Styles look weird?**
```bash
# Clear browser cache
# Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
```

**TypeScript errors?**
```bash
npm run typecheck  # See all errors
```

## 📖 Learn More

- **MIGRATION.md** - How the portfolio was rebuilt
- **IMPLEMENTATION_SUMMARY.md** - Complete feature list
- **client/bits/README.md** - Component documentation

## 🎓 Code Examples

### Access Theme in Components
```tsx
import { useTheme } from "@/theme/ThemeProvider";

const MyComponent = () => {
  const { tokens, theme, toggleTheme } = useTheme();
  return <div style={{ color: tokens.primary }}>Hello</div>;
};
```

### Create Animated Page
```tsx
import { BitsPageTransition } from "@/bits/BitsPageTransition";

export default function MyPage() {
  return (
    <BitsPageTransition type="fade">
      <h1>My Page</h1>
    </BitsPageTransition>
  );
}
```

## 🔗 Navigation Quick Links

Once the server is running:
- Home: [http://localhost:8080/](http://localhost:8080/)
- About: [http://localhost:8080/about](http://localhost:8080/about)
- Portfolio: [http://localhost:8080/portfolio](http://localhost:8080/portfolio)
- TechScreen: [http://localhost:8080/techscreen](http://localhost:8080/techscreen)
- Contact: [http://localhost:8080/contact](http://localhost:8080/contact)
- Resume: [http://localhost:8080/resume](http://localhost:8080/resume)

## ✨ Features Checklist

- ✅ Animated Sun/Moon theme toggle
- ✅ Interactive cursor layer with particles
- ✅ 3D tilt cards
- ✅ Smooth page transitions
- ✅ Dark mode support
- ✅ Mobile responsive
- ✅ Resume data integration
- ✅ Contact form
- ✅ Interactive TechScreen
- ✅ Portfolio with filters
- ✅ Full TypeScript coverage

## 🎯 What's Next?

1. Test all pages and features
2. Customize resume data in `client/data/resumeData.ts`
3. Build for production: `npm run build`
4. Deploy to Netlify or Vercel

## 📞 Need Help?

Check these files:
- `MIGRATION.md` - Architecture changes
- `IMPLEMENTATION_SUMMARY.md` - Full feature list
- `client/bits/README.md` - Component API
- `client/data/resumeData.ts` - Data structure

---

**Happy coding!** 🚀
