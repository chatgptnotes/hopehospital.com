# Autonomous Agent Setup for Claude Code

## Overview

This repository is configured for **full autonomous operation** with Claude Code. The AI assistant operates with complete independence, making decisions and executing tasks without requiring user confirmation.

## How It Works

### 1. Project Instructions (CLAUDE.md)

The `CLAUDE.md` file in the repository root contains comprehensive mission instructions that Claude Code reads automatically. These instructions override default behavior and enable autonomous operation.

**Key Sections:**
- **Mission**: Clear project goals and deliverables
- **Operating Rules**: Full autonomy mode with no confirmation requests
- **Permissions**: Explicit grants for all operations
- **Quality Bars**: Non-negotiable standards to maintain
- **Action Loop**: Systematic approach to task completion

### 2. Slash Commands

Custom slash commands are stored in `.claude/commands/` and provide quick access to common workflows and permission grants.

#### Available Commands:

##### `/autonomous`
**Purpose**: Activates full autonomous mode
**When to Use**: At the start of a session or when Claude asks for confirmation
**What it Does**:
- Grants all permissions explicitly
- Overrides default confirmation behavior
- Sets up operating principles for the session
- Establishes quality standards

**Usage**:
```
/autonomous
```

##### `/proceed`
**Purpose**: Auto-accept pending confirmation
**When to Use**: When Claude asks "should I proceed?" or similar
**What it Does**:
- Immediately authorizes the pending action
- Sets standing orders to not ask again
- Provides clear authorization status

**Usage**:
```
/proceed
```

##### `/yes`
**Purpose**: Quick affirmative response
**When to Use**: Any time you want to say "yes, do it"
**What it Does**:
- Simple, direct approval
- Minimal context, maximum clarity

**Usage**:
```
/yes
```

##### `/deploy`
**Purpose**: Execute complete deployment workflow
**When to Use**: Ready to deploy changes to production
**What it Does**:
1. Bumps version number
2. Checks git status
3. Commits all changes
4. Pushes to GitHub
5. Deploys to Vercel
6. Reports deployment status

**Usage**:
```
/deploy
```

## Permission System

### Granted Permissions

When autonomous mode is active, Claude Code has explicit permission for:

✓ **File Operations**
  - Read/write any file in repository
  - Create/delete files and directories
  - Modify configuration files

✓ **Network Operations**
  - API calls to external services
  - Web searches and documentation lookups
  - Package downloads

✓ **Git Operations**
  - Commit changes
  - Push to remote repositories
  - Branch management
  - Merge operations

✓ **Package Management**
  - npm/yarn/pnpm install
  - Dependency updates
  - Script execution

✓ **Build & Test**
  - Running build commands
  - Executing tests
  - Linting and formatting

✓ **Deployment**
  - Vercel deployments
  - Environment configuration
  - Production releases

✓ **Decision Making**
  - Architecture choices
  - Library selection
  - Bug fix approaches
  - Optimization strategies

## Best Practices

### For Users

1. **Start with `/autonomous`**: Begin sessions by invoking autonomous mode
2. **Trust the System**: Let Claude make decisions and proceed
3. **Review Commits**: Check git commits to understand what changed
4. **Use `/deploy`**: Simplify deployment with the automated workflow
5. **Provide Feedback**: If something isn't right, just say so - no need to micromanage

### For Claude Code

1. **Make Assumptions**: If unclear, document assumption and proceed
2. **Test Continuously**: Verify after each significant change
3. **Commit Frequently**: Small, focused commits with clear messages
4. **Document Decisions**: Brief notes on why you chose a particular approach
5. **Maintain Quality**: Never compromise on the quality bars
6. **Report Completion**: Share URLs and testing instructions when done

## Workflow Examples

### Example 1: Starting a New Feature

```
User: Add a new section for patient testimonials

[Claude automatically:]
1. Reads CLAUDE.md for project context
2. Plans the implementation
3. Creates/modifies necessary files
4. Tests locally
5. Commits with descriptive message
6. Offers to deploy
```

### Example 2: Handling Confirmations

```
Claude: I found an issue with the contact form. Should I fix it?

User: /proceed

[Claude immediately:]
1. Fixes the issue
2. Tests the fix
3. Commits the change
4. Reports what was done
```

### Example 3: Deployment

```
User: /deploy

[Claude executes full workflow:]
1. npm run version-bump (1.32.0 → 1.33.0)
2. git add .
3. git commit -m "..."
4. git push origin main
5. npx vercel --prod --yes
6. Reports: "Deployed v1.33.0 to https://..."
```

## Configuration Files

### Repository Structure
```
hopehospital.com/
├── .claude/
│   └── commands/
│       ├── autonomous.md    # Full autonomy mode
│       ├── proceed.md       # Auto-accept confirmation
│       ├── yes.md          # Quick affirmation
│       └── deploy.md       # Deployment workflow
├── CLAUDE.md               # Project mission & rules
├── AUTONOMOUS_SETUP.md     # This file
├── .gitignore             # Enhanced to protect secrets
└── [project files]
```

### Key Files

**CLAUDE.md**
- Mission and project goals
- Operating rules (autonomous mode)
- Permission grants
- Quality standards
- Deliverables checklist

**.gitignore**
- Protects secrets and credentials
- Prevents committing tokens
- Excludes generated files

**package.json**
- Version number (auto-incremented)
- Build and development scripts
- Deployment configuration

## Security Considerations

### What's Protected

✓ Environment variables (.env files)
✓ API keys and tokens
✓ Git credentials
✓ Private keys and certificates
✓ Sensitive configuration

### Safe Practices

1. **Never commit secrets**: Use .env files, check .gitignore
2. **Rotate credentials**: Change tokens periodically
3. **Use environment variables**: Keep config separate from code
4. **Review commits**: Check what's being committed
5. **Limit permissions**: Only grant what's needed (though we grant all for autonomy)

## Troubleshooting

### Claude Asks for Confirmation Despite Autonomous Mode

**Solution**: Run `/autonomous` to re-activate full autonomy

### Git Push Fails with Permission Error

**Solution**: Verify git credentials are configured:
```bash
git config user.name "your-username"
git config user.email "your-email"
# Update remote with token if needed
```

### Deployment Fails

**Solution**:
1. Check Vercel CLI is installed: `npx vercel --version`
2. Ensure authenticated: `npx vercel login`
3. Verify project linked: Check `.vercel` directory

### Version Number Not Incrementing

**Solution**:
1. Check `scripts/version-bump.js` exists
2. Verify npm script: `npm run version-bump`
3. Ensure package.json is writable

## Advanced Usage

### Custom Slash Commands

Create new commands in `.claude/commands/`:

```markdown
# Command Name

Description of what this command does.

Detailed instructions for Claude Code to follow.
```

File naming: `commandname.md` → invoked as `/commandname`

### Modifying Autonomous Behavior

Edit `CLAUDE.md` to adjust:
- Quality standards
- Operating principles
- Permission scope
- Deliverables list

Changes take effect immediately in new sessions.

## FAQ

**Q: Can I turn off autonomous mode?**
A: Yes, simply don't invoke `/autonomous`. Claude will use default behavior.

**Q: What if Claude makes a wrong decision?**
A: Just tell Claude what needs to change. It will fix it immediately.

**Q: Are my credentials safe?**
A: Yes. The .gitignore prevents committing secrets. Never share tokens publicly.

**Q: Can I review changes before deployment?**
A: Yes. You can run `git status` and `git diff` before using `/deploy`.

**Q: How do I add new permissions?**
A: Edit the PERMISSIONS GRANTED section in `CLAUDE.md` and `.claude/commands/autonomous.md`.

**Q: Does this work with other AI assistants?**
A: The slash commands are Claude Code specific, but CLAUDE.md can guide any AI.

## Support & Feedback

- **Issues**: Create GitHub issue if you find problems
- **Improvements**: Suggest enhancements via pull requests
- **Questions**: Ask in session - Claude can explain anything

## Version History

- **v1.0**: Initial autonomous setup
- **v1.1**: Added slash commands
- **v1.2**: Enhanced security (.gitignore updates)
- **v1.3**: Comprehensive documentation

---

**Remember**: The goal is to work *with* Claude Code as a trusted autonomous partner, not to micromanage every decision. Trust the system, provide clear goals, and let it execute.
