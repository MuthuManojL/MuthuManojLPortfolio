# React Bits Components Library

A modern, futuristic component library built with React, TypeScript, Framer Motion, and Three.js.

## Components Overview

### BitsSunMoonToggle
Animated theme toggle with smooth SVG morphing and physics-based interactions.

**Features**:
- Click-to-toggle and drag-to-toggle interactions
- Smooth icon morphing (sun ↔ moon)
- Glowing effects based on current theme
- Spring physics animation
- Tooltip on hover

**Usage**:
```tsx
import { BitsSunMoonToggle } from "@/bits/BitsSunMoonToggle";

export default function Header() {
  return <BitsSunMoonToggle className="absolute top-4 right-4" />;
}
```

**Props**:
- `className?: string` - Additional CSS classes

---

### BitsCursorLayer
Interactive cursor effects with particle trails and glow.

**Features**:
- Follows cursor with smooth animation
- Generates trailing particles on movement
- Speed-responsive glow effects
- Parallax depth calculations
- Touch support

**Usage**:
```tsx
import { BitsCursorLayer } from "@/bits/BitsCursorLayer";

export default function Layout() {
  return (
    <>
      <BitsCursorLayer />
      <main>{/* Your content */}</main>
    </>
  );
}
```

**Note**: Should be placed once at the layout level, not per page.

---

### BitsTiltCard
Card component with 3D tilt effect responding to mouse movement.

**Features**:
- 3D perspective tilt on mouse move
- Animated hover state with scale
- Dynamic gradient overlay
- Spring-based animation
- Customizable hover effects

**Usage**:
```tsx
import { BitsTiltCard } from "@/bits/BitsTiltCard";

export default function ProjectCard() {
  return (
    <BitsTiltCard className="w-64 h-80" hoveredEffect={true}>
      <div className="p-6">
        <h3>Project Title</h3>
        <p>Description</p>
      </div>
    </BitsTiltCard>
  );
}
```

**Props**:
- `children: React.ReactNode` - Card content
- `className?: string` - Additional CSS classes
- `onClick?: () => void` - Click handler
- `hoveredEffect?: boolean` - Enable 3D tilt (default: true)

---

### BitsPageTransition
Wrapper component for smooth page transitions between routes.

**Features**:
- Multiple transition types (fade, slide, scale)
- Customizable duration and delay
- EaseInOut timing by default
- Works with React Router

**Usage**:
```tsx
import { BitsPageTransition } from "@/bits/BitsPageTransition";

export default function About() {
  return (
    <BitsPageTransition type="fade" delay={0.1}>
      <div>
        <h1>About Me</h1>
        {/* Content */}
      </div>
    </BitsPageTransition>
  );
}
```

**Props**:
- `children: React.ReactNode` - Page content
- `type?: "fade" | "slide" | "scale"` - Transition animation type (default: "fade")
- `delay?: number` - Animation delay in seconds (default: 0)

---

## Theme Integration

All components automatically respond to the theme context.

```tsx
import { useTheme } from "@/theme/ThemeProvider";

const MyComponent = () => {
  const { tokens, theme, setTheme, toggleTheme } = useTheme();
  
  return (
    <div style={{ color: tokens.text_primary }}>
      Current theme: {theme}
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};
```

## Token System

Access design tokens for consistent styling:

```tsx
const { tokens } = useTheme();

// Available tokens:
tokens.primary              // Primary color
tokens.secondary           // Secondary color
tokens.accent              // Accent color
tokens.background          // Background color
tokens.surface             // Card/surface color
tokens.text_primary        // Primary text
tokens.text_secondary      // Secondary text
tokens.text_tertiary       // Tertiary text
tokens.border              // Border color
tokens.shadow_md           // Medium shadow
tokens.glow_primary        // Primary glow effect
```

## Animation Utilities

Framer Motion is integrated throughout. Common patterns:

### Spring Animation
```tsx
<motion.div
  animate={{ scale: 1 }}
  initial={{ scale: 0 }}
  transition={{ type: "spring", stiffness: 200 }}
/>
```

### Gesture Animations
```tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
/>
```

### Exit Animations
```tsx
<AnimatePresence>
  {isVisible && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  )}
</AnimatePresence>
```

## Best Practices

1. **Theme Consistency**: Always use `useTheme()` hook instead of hardcoding colors
2. **Accessibility**: Ensure all interactive elements have proper ARIA labels
3. **Performance**: Use `whileInView` for animations on scroll
4. **Mobile**: Test all cursor-based animations on touch devices
5. **Animations**: Keep animations under 500ms for smooth UX
6. **Accessibility**: Respect `prefers-reduced-motion` user preference

## Component Size Guidelines

- **Small**: 20-40% width (cards, buttons)
- **Medium**: 40-70% width (panels, cards)
- **Large**: 70-100% width (full sections, modals)
- **Full**: 100% width (hero, full-bleed sections)

## Color Scheme

### Light Mode
- Primary: Indigo (#6366f1)
- Secondary: Violet (#8b5cf6)
- Accent: Cyan (#06b6d4)
- Background: Off-white (#f8f7ff)

### Dark Mode
- Primary: Light Indigo (#818cf8)
- Secondary: Light Violet (#c4b5fd)
- Accent: Light Cyan (#22d3ee)
- Background: Dark Navy (#0a0e27)

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile: iOS 12+, Android 9+

## Performance Tips

1. Use lazy loading for heavy components
2. Memoize expensive calculations
3. Use `useCallback` for event handlers
4. Implement virtualization for long lists
5. Monitor Core Web Vitals

## Troubleshooting

### Animations not working
- Check if `motion` components are imported from `framer-motion`
- Verify AnimatePresence is wrapping routes
- Check console for animation errors

### Theme not persisting
- Verify ThemeProvider is at root level
- Check localStorage permissions
- Ensure `prefers-color-scheme` isn't being overridden

### Cursor layer causing lag
- Check particle count in BitsCursorLayer
- Verify GPU acceleration is enabled
- Test on lower-end devices

## Contributing

When creating new Bits components:
1. Follow naming convention: `Bits[ComponentName]`
2. Use TypeScript with proper types
3. Integrate with theme tokens
4. Include JSDoc comments
5. Add usage examples
6. Test on multiple browsers

## Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Three.js Docs](https://threejs.org/docs/)
- [React Router Docs](https://reactrouter.com/)
- [TailwindCSS Docs](https://tailwindcss.com/docs)

---

**Version**: 1.0.0  
**Last Updated**: December 2025
