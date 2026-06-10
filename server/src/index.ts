import express from 'express';
import cors from 'cors';
import { env } from './env.js';
import { adminRouter } from './routes/admin.js';
import { meRouter } from './routes/me.js';
import { leadsRouter } from './routes/leads.js';

const app = express();

app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.use('/api/admin', adminRouter);
app.use('/api/me', meRouter);
app.use('/api', leadsRouter);

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  const message = err instanceof Error ? err.message : 'internal error';
  console.error('[server] unhandled error:', err);
  res.status(500).json({ error: message });
});

app.listen(env.PORT, () => {
  console.log(`[server] listening on :${env.PORT}`);
});
