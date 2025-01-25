# @umbriel/components

A comprehensive React component library built with TypeScript, Storybook, and modern web technologies.

## 🚀 Tech Stack

- **Framework:** React (^17.0.0 || ^18.0.0)
- **Language:** TypeScript
- **Styling:**
  - Tailwind CSS
  - Styled Components (^6.0.0)
- **Development Environment:**
  - Vite
  - Rollup
  - Storybook 7
- **Testing:** Storybook Test

## 📦 Installation

```bash
npm install @umbriel/components
# or
yarn add @umbriel/components
```

## 🔧 Dependencies

### Core Dependencies

- React & React DOM (^17.0.0 || ^18.0.0)
- Styled Components (^6.0.0)

### UI Components & Libraries

- Radix UI (@radix-ui/react-dialog)
- Embla Carousel (embla-carousel-react, embla-carousel-autoplay)
- Lucide React Icons
- React Photo Album
- Yet Another React Lightbox

### Development Dependencies

- TypeScript
- ESLint with multiple plugins
- Prettier
- Tailwind CSS
- PostCSS
- Storybook with various addons

## 🏗️ Project Structure

```
src/
├── assets/         # Static assets
├── components/     # React components
├── fonts/         # Font files
├── lib/           # Utility functions and helpers
├── styles/        # Global styles and theme configurations
└── tests/         # Test files
```

## 📚 Available Scripts

- `yarn dev`: Start development server
- `yarn build`: Build the library using Rollup
- `yarn prepare`: Run build before publishing
- `yarn lint`: Run ESLint
- `yarn storybook`: Start Storybook development server
- `yarn build-storybook`: Build Storybook for production
- `yarn format`: Format code using Prettier

## 🎨 Features

- Modern React component library
- TypeScript support
- Storybook integration for component documentation
- Tailwind CSS integration
- Theme customization support
- Responsive design components
- Image gallery and lightbox components
- Carousel components
- Dialog/Modal components

## 🛠️ Development

### Building

The project uses Rollup for building the library with the following configurations:

- TypeScript support
- PostCSS processing
- CommonJS and ES Module output
- DTS generation for TypeScript types
- Terser for code minification

### Styling

The project combines multiple styling approaches:

- Tailwind CSS for utility-first styling
- Styled Components for component-specific styling
- Class Variance Authority for component variants
- Tailwind Merge for class name conflicts resolution

### Component Development

Components are developed with:

- TypeScript for type safety
- Storybook for development and documentation
- React 17/18 compatibility
- Responsive design principles
- Accessibility considerations

## 📝 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## 🤝 Contributing

Contributions are welcome! Please refer to [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute.
