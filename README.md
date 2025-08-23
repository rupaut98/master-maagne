# Magne Budo

A Next.js 15 application with TypeScript, Tailwind CSS, and modern development tooling.

## Prerequisites

- **mise**: Tool version manager (handles Node.js and pnpm)
- **direnv**: Environment variable manager
- **Git**: Version control

## Quick Setup

1. **Install mise** (if not already installed):
   ```bash
   curl https://mise.run | sh
   ```

2. **Install direnv** (if not already installed):
   ```bash
   # macOS
   brew install direnv
   
   # Add to shell profile (~/.zshrc or ~/.bashrc)
   eval "$(direnv hook zsh)"  # for zsh
   eval "$(direnv hook bash)" # for bash
   ```

3. **Clone and setup**:
   ```bash
   cd raju-master
   direnv allow  # This will install Node.js 22.16.0 and pnpm via mise
   ```

4. **Install dependencies**:
   ```bash
   pnpm install
   ```

## Development

```bash
# Start development server with Turbopack
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
```

## Environment Setup

- **`.envrc`**: Can be committed (contains direnv configuration)
- **`.env.local`**: Should NOT be committed (contains secrets)
- Create `.env.local` for local environment variables

## Pre-commit Hooks

The project uses `simple-git-hooks` with `lint-staged`:
- Automatically runs ESLint and Prettier on staged files
- Hooks are installed automatically after `pnpm install`

## Project Structure

```
├── src/app/           # Next.js App Router pages
├── public/           # Static assets
├── .envrc           # direnv configuration (committed)
├── mise.toml        # Tool versions
├── eslint.config.mjs # ESLint configuration
└── package.json     # Dependencies and scripts
```

## Features

- ✅ **pnpm**: Faster package management
- ✅ **Turbopack**: Faster builds and dev server
- ✅ **direnv**: Environment management
- ✅ **mise**: Tool version management
- ✅ **Pre-commit hooks**: Automatic linting/formatting
- ✅ **TypeScript**: Type safety
- ✅ **Tailwind CSS v4**: Styling
- ✅ **ESLint**: Code linting

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
