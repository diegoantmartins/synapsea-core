import { FormEvent, useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { NeuralShell } from "@/components/NeuralShell";
import { toast } from "sonner";

type Enterprise = { id: string; name: string; created_at: string };
type WhatsappNumber = {
  id: string;
  enterprise_id: string;
  name: string;
  number: string;
  enterprises?: { name: string } | null;
};
type AdminUser = {
  id: string;
  email: string | null;
  full_name: string | null;
  enterprise_id: string;
  enterprises?: { name: string } | null;
};

function StatusBadge({
  status,
  loading,
}: {
  status: { status: string; connected: boolean; error: string | null } | undefined;
  loading: boolean;
}) {
  if (loading) {
    return <span className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">· carregando…</span>;
  }
  if (!status) return null;

  let color = "bg-slate-500/20 text-slate-400 border-slate-500/40";
  let label = status.status || "desconhecido";

  if (status.error) {
    color = "bg-destructive/20 text-destructive border-destructive/40";
    label = "erro";
  } else if (status.status === "connected") {
    color = "bg-[hsl(142,100%,50%)]/15 text-[hsl(142,100%,70%)] border-[hsl(142,100%,50%)]/40";
    label = "conectado";
  } else if (status.status === "connecting") {
    color = "bg-[hsl(45,100%,50%)]/15 text-[hsl(45,100%,70%)] border-[hsl(45,100%,50%)]/40";
    label = "conectando";
  } else if (status.status === "disconnected") {
    color = "bg-[hsl(0,80%,60%)]/15 text-[hsl(0,80%,75%)] border-[hsl(0,80%,60%)]/40";
    label = "desconectado";
  }

  return (
    <span className={`text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-md border ${color}`}>
      {label}
    </span>
  );
}

export default function SynapseaAdmin() {
  const { token, isAuthed, checking, login, logout } = useAdminAuth();

  if (checking) {
    return (
      <NeuralShell title="SYNAPSEA" titleAccent="ADMIN" subtitle="Verificando sessão…" maxWidth="md">
        <div />
      </NeuralShell>
    );
  }

  if (!isAuthed) return <AdminLogin onLogin={login} />;

  return <AdminDashboard token={token!} onLogout={logout} />;
}

function AdminLogin({ onLogin }: { onLogin: (password: string) => Promise<void> }) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await onLogin(password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha no login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <NeuralShell
      eyebrow="Node de Controle"
      title="SYNAPSEA"
      titleAccent="ADMIN"
      subtitle="Acesso Restrito"
      maxWidth="md"
    >
      <div className="neon-card p-8 mt-8">
        <form onSubmit={submit} className="space-y-5">
          <div>
            <Label htmlFor="password" className="text-[10px] font-bold uppercase tracking-widest text-[hsl(185,100%,50%)]">
              Senha de Administrador
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-black/50 border-border/60 focus:border-[hsl(185,100%,50%)] font-mono text-sm mt-2"
              autoFocus
              required
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <button type="submit" className="btn-neon w-full py-4 rounded-xl" disabled={loading}>
            {loading ? "Autenticando…" : "Entrar"}
          </button>
        </form>
      </div>
    </NeuralShell>
  );
}

function AdminDashboard({ token, onLogout }: { token: string; onLogout: () => void }) {
  return (
    <NeuralShell
      eyebrow="Node de Controle"
      title="SYNAPSEA"
      titleAccent="ADMIN"
      subtitle="Painel de Administração"
      maxWidth="5xl"
      headerRight={<Button variant="outline" size="sm" onClick={onLogout}>Sair</Button>}
    >
      <Tabs defaultValue="enterprises" className="w-full mt-2">
        <TabsList className="bg-black/40 border border-border/60">
          <TabsTrigger value="enterprises">Empresas</TabsTrigger>
          <TabsTrigger value="numbers">Números WhatsApp</TabsTrigger>
          <TabsTrigger value="users">Usuários</TabsTrigger>
        </TabsList>
        <TabsContent value="enterprises"><EnterprisesTab token={token} /></TabsContent>
        <TabsContent value="numbers"><NumbersTab token={token} /></TabsContent>
        <TabsContent value="users"><UsersTab token={token} /></TabsContent>
      </Tabs>
    </NeuralShell>
  );
}

// ============================================================
// Enterprises
// ============================================================
function EnterprisesTab({ token }: { token: string }) {
  const [items, setItems] = useState<Enterprise[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<Enterprise | null>(null);

  const load = async () => {
    const { data } = await api<{ data: Enterprise[] }>("/api/admin/enterprises", { token });
    setItems(data);
  };

  useEffect(() => { load().catch((e) => toast.error(e.message)); }, []);

  const create = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api("/api/admin/enterprises", { method: "POST", body: JSON.stringify({ name }), token });
      setName("");
      await load();
      toast.success("Empresa criada");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro");
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Remover esta empresa? Números e vínculos de usuários serão afetados.")) return;
    try {
      await api(`/api/admin/enterprises/${id}`, { method: "DELETE", token });
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro");
    }
  };

  return (
    <div className="neon-card p-6 mt-4">
      <h2 className="font-orbitron text-sm font-bold uppercase tracking-[0.25em] text-[hsl(185,100%,50%)] mb-5">Empresas</h2>
      <form onSubmit={create} className="flex gap-2 mb-6">
        <Input placeholder="Nome da empresa" value={name} onChange={(e) => setName(e.target.value)} required />
        <Button type="submit" disabled={loading}>Adicionar</Button>
      </form>
      <ul className="divide-y divide-border">
        {items.map((it) => (
          <li key={it.id} className="py-3 flex items-center justify-between gap-2">
            <span className="truncate">{it.name}</span>
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" onClick={() => setEditing(it)}>Editar</Button>
              <Button variant="ghost" size="sm" onClick={() => remove(it.id)}>Remover</Button>
            </div>
          </li>
        ))}
        {items.length === 0 && <li className="py-3 text-sm text-muted-foreground">Nenhuma empresa cadastrada.</li>}
      </ul>

      <EditEnterpriseDialog
        token={token}
        enterprise={editing}
        onClose={() => setEditing(null)}
        onSaved={load}
      />
    </div>
  );
}

function EditEnterpriseDialog({
  token, enterprise, onClose, onSaved,
}: { token: string; enterprise: Enterprise | null; onClose: () => void; onSaved: () => void | Promise<void> }) {
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => { if (enterprise) setName(enterprise.name); }, [enterprise]);

  const save = async (e: FormEvent) => {
    e.preventDefault();
    if (!enterprise) return;
    setSaving(true);
    try {
      await api(`/api/admin/enterprises/${enterprise.id}`, {
        method: "PATCH",
        body: JSON.stringify({ name }),
        token,
      });
      await onSaved();
      toast.success("Empresa atualizada");
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={!!enterprise} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader><DialogTitle>Editar empresa</DialogTitle></DialogHeader>
        <form onSubmit={save} className="space-y-4">
          <div>
            <Label>Nome</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} required autoFocus />
          </div>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={onClose} disabled={saving}>Cancelar</Button>
            <Button type="submit" disabled={saving}>Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ============================================================
// WhatsApp Numbers
// ============================================================
type NumberStatus = {
  id: string;
  status: string;
  connected: boolean;
  loggedIn: boolean;
  profileName: string | null;
  lastDisconnect: string | null;
  lastDisconnectReason: string | null;
  error: string | null;
};

function NumbersTab({ token }: { token: string }) {
  const [items, setItems] = useState<WhatsappNumber[]>([]);
  const [enterprises, setEnterprises] = useState<Enterprise[]>([]);
  const [form, setForm] = useState({ enterprise_id: "", name: "", number: "", uazapi_token: "" });
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<WhatsappNumber | null>(null);
  const [statuses, setStatuses] = useState<Record<string, NumberStatus>>({});
  const [refreshingStatus, setRefreshingStatus] = useState(false);

  const load = async () => {
    const [a, b] = await Promise.all([
      api<{ data: WhatsappNumber[] }>("/api/admin/whatsapp-numbers", { token }),
      api<{ data: Enterprise[] }>("/api/admin/enterprises", { token }),
    ]);
    setItems(a.data);
    setEnterprises(b.data);
  };

  const loadStatuses = async () => {
    setRefreshingStatus(true);
    try {
      const { data } = await api<{ data: NumberStatus[] }>("/api/admin/whatsapp-numbers/statuses", { token });
      setStatuses(Object.fromEntries(data.map((s) => [s.id, s])));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao carregar status");
    } finally {
      setRefreshingStatus(false);
    }
  };

  useEffect(() => {
    load().catch((e) => toast.error(e.message));
  }, []);

  useEffect(() => {
    if (items.length > 0) loadStatuses();
  }, [items.length]);

  const create = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api("/api/admin/whatsapp-numbers", { method: "POST", body: JSON.stringify(form), token });
      setForm({ enterprise_id: "", name: "", number: "", uazapi_token: "" });
      await load();
      toast.success("Número cadastrado");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro");
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Remover este número?")) return;
    try {
      await api(`/api/admin/whatsapp-numbers/${id}`, { method: "DELETE", token });
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro");
    }
  };

  return (
    <div className="neon-card p-6 mt-4">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-orbitron text-sm font-bold uppercase tracking-[0.25em] text-[hsl(185,100%,50%)]">Números WhatsApp</h2>
        {items.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={loadStatuses}
            disabled={refreshingStatus}
          >
            {refreshingStatus ? "Atualizando…" : "Atualizar status"}
          </Button>
        )}
      </div>
      <form onSubmit={create} className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        <div>
          <Label>Empresa</Label>
          <Select value={form.enterprise_id} onValueChange={(v) => setForm({ ...form, enterprise_id: v })}>
            <SelectTrigger><SelectValue placeholder="Selecione a empresa" /></SelectTrigger>
            <SelectContent>
              {enterprises.map((e) => <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Nome</Label>
          <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        </div>
        <div>
          <Label>Número</Label>
          <Input value={form.number} onChange={(e) => setForm({ ...form, number: e.target.value })} placeholder="5546999999999" required />
        </div>
        <div>
          <Label>Token UAZAPI</Label>
          <Input value={form.uazapi_token} onChange={(e) => setForm({ ...form, uazapi_token: e.target.value })} required />
        </div>
        <div className="md:col-span-2">
          <Button type="submit" disabled={loading || !form.enterprise_id}>Adicionar</Button>
        </div>
      </form>
      <ul className="divide-y divide-border">
        {items.map((it) => {
          const s = statuses[it.id];
          return (
            <li key={it.id} className="py-3 flex items-center justify-between gap-2">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium truncate">{it.name} — {it.number}</span>
                  <StatusBadge status={s} loading={refreshingStatus && !s} />
                </div>
                <div className="text-xs text-muted-foreground">
                  {it.enterprises?.name ?? ""}
                  {s?.profileName && <> · <span className="text-[hsl(185,100%,50%)]">{s.profileName}</span></>}
                  {s?.error && <> · <span className="text-destructive">{s.error}</span></>}
                </div>
              </div>
              <div className="flex gap-1 shrink-0">
                <Button variant="ghost" size="sm" onClick={() => setEditing(it)}>Editar</Button>
                <Button variant="ghost" size="sm" onClick={() => remove(it.id)}>Remover</Button>
              </div>
            </li>
          );
        })}
        {items.length === 0 && <li className="py-3 text-sm text-muted-foreground">Nenhum número cadastrado.</li>}
      </ul>

      <EditNumberDialog
        token={token}
        number={editing}
        enterprises={enterprises}
        onClose={() => setEditing(null)}
        onSaved={load}
      />
    </div>
  );
}

function EditNumberDialog({
  token, number, enterprises, onClose, onSaved,
}: {
  token: string;
  number: WhatsappNumber | null;
  enterprises: Enterprise[];
  onClose: () => void;
  onSaved: () => void | Promise<void>;
}) {
  const [form, setForm] = useState({ enterprise_id: "", name: "", number: "", uazapi_token: "" });
  const [rotateToken, setRotateToken] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (number) {
      setForm({ enterprise_id: number.enterprise_id, name: number.name, number: number.number, uazapi_token: "" });
      setRotateToken(false);
    }
  }, [number]);

  const save = async (e: FormEvent) => {
    e.preventDefault();
    if (!number) return;
    setSaving(true);
    try {
      const patch: Record<string, string> = {
        enterprise_id: form.enterprise_id,
        name: form.name,
        number: form.number,
      };
      if (rotateToken && form.uazapi_token) patch.uazapi_token = form.uazapi_token;
      await api(`/api/admin/whatsapp-numbers/${number.id}`, {
        method: "PATCH",
        body: JSON.stringify(patch),
        token,
      });
      await onSaved();
      toast.success("Número atualizado");
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={!!number} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader><DialogTitle>Editar número</DialogTitle></DialogHeader>
        <form onSubmit={save} className="space-y-4">
          <div>
            <Label>Empresa</Label>
            <Select value={form.enterprise_id} onValueChange={(v) => setForm({ ...form, enterprise_id: v })}>
              <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
              <SelectContent>
                {enterprises.map((e) => <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Nome</Label>
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div>
            <Label>Número</Label>
            <Input value={form.number} onChange={(e) => setForm({ ...form, number: e.target.value })} required />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={rotateToken} onChange={(e) => setRotateToken(e.target.checked)} />
              Rotacionar token UAZAPI
            </label>
            {rotateToken && (
              <Input
                className="mt-2"
                value={form.uazapi_token}
                onChange={(e) => setForm({ ...form, uazapi_token: e.target.value })}
                placeholder="Novo token"
                required
              />
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={onClose} disabled={saving}>Cancelar</Button>
            <Button type="submit" disabled={saving}>Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ============================================================
// Users
// ============================================================
function UsersTab({ token }: { token: string }) {
  const [items, setItems] = useState<AdminUser[]>([]);
  const [enterprises, setEnterprises] = useState<Enterprise[]>([]);
  const [form, setForm] = useState({ email: "", password: "", full_name: "", enterprise_id: "" });
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<AdminUser | null>(null);

  const load = async () => {
    const [a, b] = await Promise.all([
      api<{ data: AdminUser[] }>("/api/admin/users", { token }),
      api<{ data: Enterprise[] }>("/api/admin/enterprises", { token }),
    ]);
    setItems(a.data);
    setEnterprises(b.data);
  };

  useEffect(() => { load().catch((e) => toast.error(e.message)); }, []);

  const create = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api("/api/admin/users", { method: "POST", body: JSON.stringify(form), token });
      setForm({ email: "", password: "", full_name: "", enterprise_id: "" });
      await load();
      toast.success("Usuário criado");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro");
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Remover este usuário?")) return;
    try {
      await api(`/api/admin/users/${id}`, { method: "DELETE", token });
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro");
    }
  };

  return (
    <div className="neon-card p-6 mt-4">
      <h2 className="font-orbitron text-sm font-bold uppercase tracking-[0.25em] text-[hsl(185,100%,50%)] mb-5">Usuários</h2>
      <form onSubmit={create} className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        <div>
          <Label>Email</Label>
          <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        </div>
        <div>
          <Label>Senha (mín 8)</Label>
          <Input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} minLength={8} required />
        </div>
        <div>
          <Label>Nome</Label>
          <Input value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
        </div>
        <div>
          <Label>Empresa</Label>
          <Select value={form.enterprise_id} onValueChange={(v) => setForm({ ...form, enterprise_id: v })}>
            <SelectTrigger><SelectValue placeholder="Vincular a empresa" /></SelectTrigger>
            <SelectContent>
              {enterprises.map((e) => <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="md:col-span-2">
          <Button type="submit" disabled={loading || !form.enterprise_id}>Criar usuário</Button>
        </div>
      </form>
      <ul className="divide-y divide-border">
        {items.map((u) => (
          <li key={u.id} className="py-3 flex items-center justify-between gap-2">
            <div className="min-w-0 flex-1">
              <div className="font-medium truncate">{u.email ?? u.id}</div>
              <div className="text-xs text-muted-foreground">{u.full_name ?? "—"} · {u.enterprises?.name ?? "sem empresa"}</div>
            </div>
            <div className="flex gap-1 shrink-0">
              <Button variant="ghost" size="sm" onClick={() => setEditing(u)}>Editar</Button>
              <Button variant="ghost" size="sm" onClick={() => remove(u.id)}>Remover</Button>
            </div>
          </li>
        ))}
        {items.length === 0 && <li className="py-3 text-sm text-muted-foreground">Nenhum usuário cadastrado.</li>}
      </ul>

      <EditUserDialog
        token={token}
        user={editing}
        enterprises={enterprises}
        onClose={() => setEditing(null)}
        onSaved={load}
      />
    </div>
  );
}

function EditUserDialog({
  token, user, enterprises, onClose, onSaved,
}: {
  token: string;
  user: AdminUser | null;
  enterprises: Enterprise[];
  onClose: () => void;
  onSaved: () => void | Promise<void>;
}) {
  const [form, setForm] = useState({ email: "", full_name: "", enterprise_id: "" });
  const [resetPw, setResetPw] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        email: user.email ?? "",
        full_name: user.full_name ?? "",
        enterprise_id: user.enterprise_id,
      });
      setResetPw(false);
      setNewPassword("");
    }
  }, [user]);

  const save = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    try {
      const patch: Record<string, string> = {
        email: form.email,
        full_name: form.full_name,
        enterprise_id: form.enterprise_id,
      };
      if (resetPw && newPassword) patch.password = newPassword;
      await api(`/api/admin/users/${user.id}`, {
        method: "PATCH",
        body: JSON.stringify(patch),
        token,
      });
      await onSaved();
      toast.success("Usuário atualizado");
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={!!user} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader><DialogTitle>Editar usuário</DialogTitle></DialogHeader>
        <form onSubmit={save} className="space-y-4">
          <div>
            <Label>Email</Label>
            <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div>
            <Label>Nome</Label>
            <Input value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
          </div>
          <div>
            <Label>Empresa</Label>
            <Select value={form.enterprise_id} onValueChange={(v) => setForm({ ...form, enterprise_id: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {enterprises.map((e) => <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={resetPw} onChange={(e) => setResetPw(e.target.checked)} />
              Redefinir senha
            </label>
            {resetPw && (
              <Input
                className="mt-2"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Nova senha (mín 8)"
                minLength={8}
                required
              />
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={onClose} disabled={saving}>Cancelar</Button>
            <Button type="submit" disabled={saving}>Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
