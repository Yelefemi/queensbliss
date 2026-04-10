# Queen Bliss

## Deployment Notes

This app is set up for Vercel with Prisma and a hosted PostgreSQL database.

### Required environment variables

- `DATABASE_URL`
- `JWT_SECRET`
- `NEXT_PUBLIC_BASE_URL`
- `PAYSTACK_SECRET_KEY`
- `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY`
- `PAYSTACK_WEBHOOK_SECRET`
- `RESEND_API_KEY`

Use `.env.example` as the template.

### Before deploying

1. Run `npm install`.
2. Run `npx prisma generate`.
3. Point `DATABASE_URL` to a hosted PostgreSQL database.
4. Run `npx prisma db push` against that database.
5. Add the same environment variables in Vercel Project Settings.
6. Deploy.

### Vercel build command

The project build script is:

```bash
npm run build
```

That runs Prisma client generation and then Next build.
