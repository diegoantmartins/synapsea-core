import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../env.js';
import { supabaseAdmin } from '../supabase.js';

export type AdminPayload = { role: 'admin' };
export type UserPayload = { sub: string };

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      admin?: AdminPayload;
      user?: { id: string; email?: string; enterpriseId?: string | null };
    }
  }
}

export function signAdminToken(): string {
  return jwt.sign({ role: 'admin' } satisfies AdminPayload, env.JWT_SECRET, {
    expiresIn: '8h',
  });
}

function readBearer(req: Request): string | null {
  const header = req.headers.authorization;
  if (!header) return null;
  const [scheme, token] = header.split(' ');
  if (scheme !== 'Bearer' || !token) return null;
  return token;
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const token = readBearer(req);
  if (!token) return res.status(401).json({ error: 'unauthorized' });
  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as AdminPayload;
    if (payload.role !== 'admin') return res.status(403).json({ error: 'forbidden' });
    req.admin = payload;
    next();
  } catch {
    return res.status(401).json({ error: 'invalid token' });
  }
}

export async function requireUser(req: Request, res: Response, next: NextFunction) {
  const token = readBearer(req);
  if (!token) return res.status(401).json({ error: 'unauthorized' });

  const { data, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !data.user) return res.status(401).json({ error: 'invalid token' });

  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('enterprise_id')
    .eq('id', data.user.id)
    .maybeSingle();

  req.user = {
    id: data.user.id,
    email: data.user.email ?? undefined,
    enterpriseId: profile?.enterprise_id ?? null,
  };
  next();
}
