# Hono Unkey Ratelimit Starter for Cloudflare Workers
This is a minimal starter template showcasing how to use [Unkey](https://www.unkey.com/) for rate limiting in a web server built with the [Hono framework](https://hono.dev/), deployed to [Cloudflare Workers](https://workers.cloudflare.com/).

## Features
- Rate Limiting: Implements Unkey's rate-limiting capabilities to control requests based on unique identifiers like IP addresses or custom headers.
- Hono Framework: A lightweight, ultrafast web framework for the Edge (Cloudflare Workers, Deno Deploy, etc.).
- Cloudflare Workers: Deploy your application to Cloudflare’s global edge network for fast, scalable performance.

## Setup and Installation
### 1. Clone the repository
```bash
git clone https://github.com/Devansh-Baghel/hono-unkey-ratelimit-starter.git
cd hono-unkey-ratelimit-starter
```

### 2. Configure environment variables
Copy the `.dev.vars.example` file to `.dev.vars` file in the root directory and add your Unkey root key:

```bash
cp .dev.vars.example .dev.vars
```

### 3. Install dependencies and start your server
Install all dependencies from `package.json`:

```bash
npm install
```

Now start your development server:

```bash
npm run dev
```

Server will now be running at `http://localhost:8787`

### 4. Deploy your app to production (optional)
You will need a cloudflare account for this

```bash
npm run deploy
```

## Usage
### Public Route
GET /: A simple welcome message.
### Protected Route (Rate Limited)
GET /secret: This route is rate-limited by Unkey. After exceeding the limit (2 requests in 30 seconds), it returns a 429 Too Many Requests response.

## License
This project is licensed under the MIT License.
