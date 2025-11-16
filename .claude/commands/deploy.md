# Deploy to Production

Execute a complete deployment workflow for the Hope Hospital website.

## DEPLOYMENT WORKFLOW

Follow these steps autonomously (no confirmations needed):

1. **Version Bump**: Run `npm run version-bump` to increment version
2. **Git Status**: Check current repository status
3. **Commit Changes**: Create meaningful commit message with all changes
4. **Push to GitHub**: Push to main branch
5. **Deploy to Vercel**: Run `npx vercel --prod --yes`
6. **Verify Deployment**: Check deployment URL and status
7. **Report Success**: Provide deployment URL and version number

## DEPLOYMENT TARGETS
- **Primary**: Vercel (https://hopehospital-eyqq2g39w-chatgptnotes-6366s-projects.vercel.app)
- **Local Test**: http://localhost:3000
- **Repository**: github.com/chatgptnotes/hopehospital.com

## COMMIT MESSAGE FORMAT
```
[Feature/Fix Description] (vX.X.X)

Detailed changes:
- Change 1
- Change 2
- Change 3

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

## QUALITY CHECKS BEFORE DEPLOY
- Verify no console errors
- Check for broken links
- Validate HTML/CSS if possible
- Ensure version number updated
- Confirm git credentials configured

## AFTER DEPLOYMENT
- Share deployment URL with user
- Indicate version number deployed
- Suggest testing at local port if needed
- Note any issues or warnings encountered

**EXECUTE ALL STEPS AUTOMATICALLY. DO NOT WAIT FOR APPROVALS.**
