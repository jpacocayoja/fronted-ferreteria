This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
Open http://localhost:3000 with your browser to see the result.

Create file .env.local and copy all variables from .env.example. Example:

env
URL_CLIENT=http://localhost:3001
URL_CATEGORY=http://localhost:3002
URL_PRODUCT=http://localhost:3003
URL_AUTH=http://localhost:3004
URL_SALE=http://localhost:3005

You can start editing the page by modifying app/page.tsx. The page auto-updates as you edit the file.

Run with Docker
Build the image
bash
docker build -t my-next-app .
Run the container
You can pass environment variables directly:

bash
docker run -p 3000:3000 \
  -e URL_CLIENT=http://clientes:3001 \
  -e URL_CATEGORY=http://categorias:3002 \
  -e URL_PRODUCT=http://productos:3003 \
  -e URL_AUTH=http://auth:3004 \
  -e URL_SALE=http://ventas:3005 \
  my-next-app
Or use an env file:

bash
docker run --env-file .env -p 3000:3000 my-next-app
Make sure the .env file contains the correct URLs for your microservices.

This project uses next/font to automatically optimize and load Geist, a new font family for Vercel.

Learn More
To learn more about Next.js, take a look at the following resources:

Next.js Documentation - learn about Next.js features and API.

Learn Next.js - an interactive Next.js tutorial.

You can check out the Next.js GitHub repository - your feedback and contributions are welcome!

Deploy on Vercel
The easiest way to deploy your Next.js app is to use the Vercel Platform from the creators of Next.js.

Check out our Next.js deployment documentation for more details.
```
