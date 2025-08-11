# Theming System Documentation

This document outlines the theming system implemented for the Nature of Code Vue.js application.

## Overview

The application now includes a comprehensive theming system that:

- Automatically detects and responds to OS theme settings (light/dark mode)
- Provides a manual theme toggle button in the navigation bar
- Applies consistent theming across all UI components using Naive UI
- Extends theme colors to P5.js visualizations for cohesive visual experience

## Components

### 1. Theme Composable (`src/composables/useTheme.ts`)

The core theming logic is contained in the `useTheme` composable, which provides:

- **OS Theme Detection**: Automatically detects system preference using `prefers-color-scheme` media query
- **Reactive Theme State**: Provides reactive theme state that updates throughout the application
- **Theme Colors**: Defines comprehensive color palettes for both light and dark themes
- **Manual Toggle**: Allows users to manually switch themes

```typescript
const { isDark, naiveTheme, themeColors, toggleTheme } = useTheme()
```

### 2. P5.js Theme Utilities (`src/utils/p5-theme.ts`)

Helper functions for applying theme colors to P5.js sketches:

- `hexToP5Color()`: Converts hex colors to P5.js RGB values
- `setP5Background()`: Applies background color to canvas
- `setP5Stroke()`: Applies stroke color
- `setP5Fill()`: Applies fill color
- `setupP5Theme()`: Sets up complete theme configuration for sketches

### 3. Application Structure

#### App.vue

- Wraps the entire application with `NConfigProvider` for Naive UI theming
- Applies global background and text colors based on current theme

#### NavBar.vue

- Includes theme toggle button with sun/moon icons
- Dynamically styles navigation elements based on theme

#### P5Chapter.vue

- Passes theme colors to P5.js sketches as parameters
- Applies theme-based styling to canvas and sidebar areas

#### MarkdownRenderer.vue

- Uses theme colors for content background and text
- Removes hardcoded colors in favor of dynamic theming

## Theme Colors

### Light Theme

```typescript
{
  background: '#ffffff',
  surface: '#f9f9f9',
  primary: '#18a058',
  secondary: '#2080f0',
  accent: '#f0a020',
  text: '#333333',
  textSecondary: '#666666',
  border: '#e0e0e0',
  canvas: {
    background: '#ffffff',
    stroke: '#333333',
    fill: '#18a058',
    accent: '#2080f0'
  }
}
```

### Dark Theme

```typescript
{
  background: '#101014',
  surface: '#18181c',
  primary: '#63e2b7',
  secondary: '#70c0e8',
  accent: '#f2c97d',
  text: '#ffffff',
  textSecondary: '#c2c2c2',
  border: '#262626',
  canvas: {
    background: '#101014',
    stroke: '#ffffff',
    fill: '#63e2b7',
    accent: '#70c0e8'
  }
}
```

## Usage in P5.js Sketches

To use theming in P5.js sketches, update your sketch function signature to accept theme colors:

```typescript
// Before
const sketch = (p: p5) => { ... }

// After
const sketch = (p: p5, themeColors: ThemeColors) => {
  p.setup = () => {
    p.createCanvas(800, 600)
    setP5Background(p, themeColors.canvas.background)
  }

  p.draw = () => {
    setP5Stroke(p, themeColors.canvas.stroke)
    setP5Fill(p, themeColors.canvas.fill)
    // ... your drawing code
  }
}
```

## Features

### Automatic OS Detection

The system automatically detects the user's OS theme preference and applies the appropriate theme on application load.

### Manual Theme Toggle

Users can manually toggle between light and dark themes using the sun/moon button in the navigation bar.

### Real-time Updates

Theme changes are applied immediately across all components and P5.js visualizations without requiring a page refresh.

### Consistent Color Palette

All UI elements and visualizations use colors from the same theme palette, ensuring visual consistency.

## Browser Support

The theming system uses the `prefers-color-scheme` CSS media query, which is supported in:

- Chrome 76+
- Firefox 67+
- Safari 12.1+
- Edge 79+

For older browsers, the system falls back to light theme as the default.

## Extending the Theme

To add new theme colors or modify existing ones:

1. Update the `ThemeColors` interface in `src/composables/useTheme.ts`
2. Update both `lightColors` and `darkColors` objects with the new color values
3. Use the new colors in your components via the `themeColors` reactive object

## Testing

The theming system has been tested with:

- ✅ OS theme detection and automatic switching
- ✅ Manual theme toggle functionality
- ✅ P5.js visualization color updates
- ✅ Naive UI component theming
- ✅ Markdown content theming
- ✅ Navigation and layout theming

All TypeScript types are properly defined and linting passes without errors.
