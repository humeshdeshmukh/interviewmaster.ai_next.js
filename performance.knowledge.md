# Performance Optimization Guidelines

## Build Performance
- Use `swcMinify` in Next.js config for faster minification
- Enable compiler optimizations in production
- Optimize Tailwind content paths to reduce CSS compilation time
- Use path aliases for imports to reduce resolution time

## Runtime Performance
- Lazy load components that are not needed immediately
- Use `React.memo` for components that receive the same props frequently
- Implement proper code splitting using dynamic imports
- Minimize JavaScript bundle size

## Common Issues
- Long compilation times often caused by:
  - Large CSS files from unoptimized Tailwind usage
  - Unnecessary file scanning in content paths
  - Development mode React warnings and checks
  - Unoptimized image processing

## Best Practices
- Keep dependencies up to date
- Use production builds for deployment
- Implement proper caching strategies
- Monitor bundle sizes regularly
