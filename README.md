# Extreme Medical Solution W.L.L

Production-ready marketing site and enquiry form for a medical and laboratory equipment supplier in Qatar.

## Tech stack

- React 18
- Vite 5
- TypeScript
- Tailwind CSS
- Express
- Nodemailer
- Zod

## Local development

Install dependencies:

```bash
npm install
```

Start the frontend and backend together:

```bash
npm run dev
```

Frontend:

- `http://127.0.0.1:8080`

Backend health check:

- `http://127.0.0.1:3001/health`

## Environment variables

Create a local `.env` file based on `.env.example`.

Required values:

- `NODE_ENV`
- `PORT`
- `APP_ORIGIN`
- `CONTACT_TO`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`

Example:

```env
NODE_ENV=production
PORT=3001
APP_ORIGIN=https://extrememedical.qa
CONTACT_TO=rashid.ak@cornercart.co.in
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=rashid.ak@cornercart.co.in
SMTP_PASS=your-password
SMTP_FROM="Extreme Medical Website <rashid.ak@cornercart.co.in>"
```

## Security controls included

- Server-side validation with Zod
- Honeypot spam trap
- Rate limiting on `/api/contact`
- Security headers with Helmet
- Restricted CORS for known origins
- Secrets excluded from git

## Production build

Build the frontend:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

## Docker

Build:

```bash
docker build -t extrememedical-site .
```

Run:

```bash
docker run --env-file .env -p 3001:3001 extrememedical-site
```

## Deployment notes

- This project is **not** suitable for static-only hosting because the enquiry form requires the Node backend.
- Recommended targets: Render, Railway, Fly.io, VPS with Docker, or VPS with Node + Nginx reverse proxy.
- Terminate HTTPS at your hosting platform or reverse proxy.
- Point your domain to the Node server and expose only HTTPS publicly.

## Verification

Run:

```bash
npm run build
npm run lint
npm test
```
