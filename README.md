# InfoPanel - React Dashboard Application

A modern dashboard application built with React, TypeScript, Redux Toolkit, and TailwindCSS.

## Features

- 🎨 Modern UI with TailwindCSS
- 🔄 State management with Redux Toolkit
- 🚀 Fast development with Vite
- 📱 Responsive design
- 🔍 ESLint + Prettier for code quality
- 🐳 Docker support for production and development
- 🔒 Type-safe with TypeScript
- ✅ Pre-commit hooks with Husky
- 🌍 Environment-based configuration
- 🛡️ Error boundary for graceful error handling

## Tech Stack

- **Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **Code Quality**: ESLint, Prettier, Husky, lint-staged

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 10+
- Docker (optional, for containerized deployment)

### Environment Configuration

The application uses environment variables for configuration. Create environment files based on your needs:

```bash
# Copy the example file
cp .env.example .env.development

# Or for production
cp .env.example .env.production
```

**Available Environment Variables:**

| Variable                | Description                  | Default                                |
| ----------------------- | ---------------------------- | -------------------------------------- |
| `VITE_API_BASE_URL`     | API base URL                 | `https://jsonplaceholder.typicode.com` |
| `VITE_APP_NAME`         | Application name             | `InfoPanel`                            |
| `VITE_ITEMS_PER_PAGE`   | Items per page in data table | `5`                                    |
| `VITE_ENABLE_DEV_TOOLS` | Enable Redux DevTools        | `true`                                 |

**Note:** All environment variables must be prefixed with `VITE_` to be accessible in the application.

### Local Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

### Code Quality

```bash
# Run linter
pnpm lint

# Fix linting issues
pnpm lint:fix

# Check formatting
pnpm format:check

# Format code
pnpm format

# Type check
pnpm exec tsc --noEmit
```

## Docker Deployment

### Production Deployment

**Using Docker CLI:**

```bash
# Build production image
docker buildx build --target production -t infopanel:latest .

# Run production container
docker run -d -p 80:80 --name infopanel infopanel:latest

# View logs
docker logs -f infopanel

# Stop and remove container
docker stop infopanel && docker rm infopanel

```

**Access the application:** `http://localhost`

### Development with Docker

**Using Docker CLI:**

```bash
# Build development image
docker buildx build --target development -t infopanel:dev .

# Run development container with volume mounts
docker run -d \
  -p 3000:3000 \
  -v $(pwd)/src:/app/src \
  -v $(pwd)/public:/app/public \
  --name infopanel-dev \
  infopanel:dev

# View logs
docker logs -f infopanel-dev

# Stop and remove container
docker stop infopanel-dev && docker rm infopanel-dev
```

**Access the development server:** `http://localhost:3000`

## CI/CD

GitHub Actions workflow automatically runs on every push to `feature` branch:

- ✅ ESLint checks
- ✅ Prettier formatting validation
- ✅ TypeScript type checking
- ✅ Production build verification

## License

MIT
