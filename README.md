# Hope Hospital Website

> Central India's Premier NABH-Accredited Super Specialty Healthcare Center

A modern, responsive website for Hope Hospital, Nagpur - showcasing comprehensive medical services, doctor profiles, and patient care information.

## Features

- **Modern Design**: Full-screen gradient hero section with smooth animations
- **Responsive**: Mobile-first design that works on all devices
- **SEO Optimized**: Complete meta tags, Open Graph, and structured data
- **Accessible**: WCAG 2.1 AA compliant with proper ARIA labels
- **Material Icons**: Professional icons from Google Material Design
- **Form Validation**: Client-side validation for contact forms
- **Performance**: Optimized loading and minimal dependencies

## Tech Stack

- HTML5
- CSS3 (Vanilla, no frameworks)
- JavaScript (ES6+)
- Google Material Icons
- Google Fonts (Inter)

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/hopehospital/website.git
cd hopehospital.com

# Install dependencies
npm install

# Start development server
npm run dev
```

The website will be available at `http://localhost:3000`

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local development server on port 3000 |
| `npm run build` | Build production-ready files to /build directory |
| `npm run lint` | Check HTML and CSS for errors |
| `npm run lint:fix` | Auto-fix formatting issues with Prettier |
| `npm run version-bump` | Increment version number and update footer |
| `npm run deploy` | Build and deploy to Vercel |

## Project Structure

```
hopehospital.com/
├── index.html              # Main HTML file
├── scripts/
│   ├── build.js           # Build script
│   └── version-bump.js    # Version management
├── .env.example           # Environment variables template
├── .gitignore             # Git ignore rules
├── .prettierrc            # Prettier configuration
├── .htmlhintrc            # HTML linting rules
├── package.json           # Dependencies and scripts
├── README.md              # This file
├── CHANGELOG.md           # Version history
└── claude.md              # Development mission file

```

## Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# Required
CONTACT_EMAIL=admin@hopehospital.com
CONTACT_PHONE=09373111709

# Optional
GOOGLE_ANALYTICS_ID=UA-XXXXXXXXX-X
GOOGLE_MAPS_API_KEY=your_api_key_here
```

See `.env.example` for all available options.

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
npm run deploy
```

### Netlify

```bash
# Build
npm run build

# Deploy the /build directory via Netlify CLI or dashboard
```

### Manual Deployment

```bash
# Build production files
npm run build

# Upload contents of /build directory to your web server
```

## Version Management

The website uses semantic versioning displayed in the footer:

```bash
# Increment version (1.0.0 → 1.1.0)
npm run version-bump

# Commit changes
git add .
git commit -m "Bump version to 1.1.0"
git push
```

Version format: `Major.Minor.Patch`
- Initial release: 1.0.0
- Feature updates: 1.1.0, 1.2.0, etc.
- Bug fixes: 1.0.1, 1.0.2, etc.

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Android)

## Performance

- Initial load: < 3 seconds
- First Contentful Paint: < 1.5 seconds
- Time to Interactive: < 3.5 seconds
- Lighthouse Score: 90+

## SEO

- Complete meta tags (title, description, keywords)
- Open Graph tags for social sharing
- Structured data (Schema.org Hospital)
- Semantic HTML5
- Mobile-friendly
- Fast loading times

## Accessibility

- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Color contrast ratios (WCAG AA)
- Screen reader friendly
- Focus indicators

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Maintenance

### Updating Content

- Edit `index.html` directly for content changes
- Run `npm run lint:fix` to ensure proper formatting
- Test locally with `npm run dev`
- Bump version with `npm run version-bump`

### Adding New Sections

1. Add HTML structure in `index.html`
2. Add corresponding CSS in `<style>` section
3. Update navigation links
4. Test responsiveness
5. Commit and deploy

## FAQ

### How do I change the hospital contact information?

Edit the contact section in `index.html` and update the phone numbers and addresses.

### Can I integrate a backend for the contact form?

Yes! The form is ready for backend integration. See `index.html` line 1637 for the form submission handler.

### How do I add more departments?

Copy an existing department card in the HTML, modify the content, and add a corresponding Material Icon.

### How do I change the color scheme?

Update the CSS variables at the top of the `<style>` section:
```css
:root {
    --primary-red: #dc2626;
    --dark-red: #991b1b;
    --light-red: #ef4444;
    --accent-red: #f87171;
}
```

## Support

For technical issues or questions:
- Email: dev@hopehospital.com
- Phone: +91-9373111709

## License

Copyright © 2024 Hope Hospital. All rights reserved.

## Acknowledgments

- Dr. B.K. Murali - Founder & Chief Surgeon
- Google Material Icons
- Google Fonts (Inter)
- All healthcare professionals at Hope Hospital

---

**Version:** 1.0.0
**Last Updated:** November 15, 2024
**Repository:** hopehospital.com
