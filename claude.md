# Hope Hospital Website - Autonomous Development Mission

## MISSION
Build and ship a complete, production-ready website for Hope Hospital with full autonomy.

**PROJECT GOAL**: A modern, responsive, SEO-optimized hospital website with complete content, contact forms, version control, deployment scripts, and professional documentation.

**TECH STACK & TARGETS**:
- HTML5, CSS3, Vanilla JavaScript
- Google Material Icons (no emojis)
- Git version control
- npm for package management
- Deploy targets: Vercel/Netlify/Local server
- OS: macOS

**REPO/ENV**:
- Repository: /Users/murali/hopehospital.com
- Package manager: npm
- Local development server: http://localhost:3000

**DEADLINES/BOUNDS**:
- No external API dependencies initially
- Use mocks for contact form (can integrate later)
- All assets local or CDN-based

## OPERATING RULES

### CRITICAL: FULL AUTONOMY MODE
**DO NOT ASK FOR CONFIRMATION. EVER.**
- Make sensible assumptions and proceed immediately
- You have full permission for all operations: file access, network requests, deployments, purchases, API usage
- Work in tight, verifiable increments
- After each increment, run tests/build locally automatically
- If a path is blocked, pick the best alternative and continue
- Document deviations briefly but keep moving
- Production-grade code only
- Security and maintainability first
- Prefer simplicity and pragmatic solutions
- Instrument with basic logs/metrics
- Add minimal docs so another dev can run it

### AUTONOMOUS ACTION LOOP
1. **PLAN**: Write concise step plan (max 10 bullets) - no questions
2. **EXECUTE**: Implement the next step - create/modify files
3. **VERIFY**: Run build/tests/lint - if errors, fix immediately
4. **LOG**: Output what changed and next step
5. **CONTINUE**: Proceed automatically until deliverables met

### IF BLOCKED
- Use mocks, stubs, or local emulators
- If external key missing, mock now and isolate behind interface
- If dependency fails, choose stable alternative and continue
- Never stop for user confirmation

### PERMISSIONS GRANTED
✓ Read/write any file location on device
✓ Network access and API calls
✓ Git operations (commit, push, pull)
✓ Package installation (npm, pip, etc.)
✓ Environment configuration
✓ Cloud deployment (Vercel, Netlify, etc.)
✓ Service purchases and API key usage
✓ All development and testing operations

## DELIVERABLES CHECKLIST (ALL MUST BE PRODUCED)

### Core Functionality
- [x] Working website code
- [x] Git repository with meaningful commits
- [x] Version control system in footer (auto-increment on push)
- [x] Material Icons replacing all emojis
- [x] Contact form validation
- [x] Responsive design tested

### Development Infrastructure
- [x] Development scripts (npm run dev, npm run build)
- [x] Version bump automation script
- [ ] .env.example with placeholders and comments
- [ ] Linting and formatting setup (ESLint/Prettier)
- [ ] One command to fix formatting (npm run lint:fix)

### Documentation
- [ ] README.md: quickstart, env vars, commands, deploy steps, FAQ
- [ ] CHANGELOG.md of what was built and what's next
- [ ] Operations note: backups, logs, env rotation

### Quality & Testing
- [ ] Minimal tests covering core logic
- [ ] CI config if applicable
- [ ] Error handling: graceful failures + user-visible messages
- [ ] Zero console errors
- [ ] No broken links or images
- [ ] Validated HTML/CSS

### Optimization
- [x] SEO optimization (meta tags, structured data)
- [ ] Browser compatibility verified
- [ ] Performance optimization (load time <3s)
- [ ] Accessibility compliance (WCAG 2.1 AA)
- [ ] SEO score >90

### Deployment
- [x] Vercel deployment configured
- [ ] Deployment documentation
- [ ] Environment variable management

## QUALITY BARS (NON-NEGOTIABLE)
- Zero TypeScript/ESLint errors
- Zero console errors
- No failing tests
- No unhandled promise rejections
- No secrets in code (use env vars only)
- Validate all inputs
- Rate-limit risky endpoints
- No broken links or images
- Validated HTML/CSS
- Mobile-first responsive design
- Fast load times (<3s)
- Accessible (WCAG 2.1 AA)
- SEO score >90
- Docs match actual working commands
- All external dependencies properly licensed

## VERSION CONTROL
- Initial version: 1.0
- Increment: 1.1, 1.2, 1.3... on each Git push
- Footer displays: Version | Date | Repo name

## PROGRESS LOG
Started: 2024-11-15
Status: In Progress
Current Version: 1.0 (pre-release)

## BLOCKERS & RESOLUTIONS
None yet - proceeding autonomously

## NEXT DEPLOYMENT
Target: Local server → Vercel
URL: https://hopehospital-eyqq2g39w-chatgptnotes-6366s-projects.vercel.app

## FINAL HANDOFF REQUIREMENTS
When mission complete, provide:
- Repository tree structure
- Exact run/deploy commands
- URLs (local: http://localhost:3000 & deployed)
- Admin test credentials (dummy for testing)
- Operations note: backups, logs, env rotation strategy
- List of external dependencies and their purposes
- Known limitations and future enhancement opportunities

## TESTING & VALIDATION
After completing each task:
- Automatically run relevant tests
- Verify builds succeed
- Check for console errors
- Test on local server: http://localhost:3000
- Share local port link for user testing
- Document any issues found and fixes applied

## DESIGN STANDARDS
- **NO EMOJIS**: Always use Google Material Icons instead
- Consistent color scheme and branding
- Professional medical/hospital aesthetic
- Accessibility-first approach
- Mobile-responsive by default
