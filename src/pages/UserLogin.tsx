import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "@/hooks/use-user-auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NeuralShell } from "@/components/NeuralShell";

export default function UserLogin() {
  const { session, signIn, loading } = useUserAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && session) navigate("/app", { replace: true });
  }, [loading, session, navigate]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await signIn(email, password);
      navigate("/app", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha no login");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <NeuralShell
      eyebrow="Synapsea Node"
      title="SYNAPSEA"
      titleAccent="ACCESS"
      subtitle="Autenticação de Usuário"
      maxWidth="md"
    >
      <div className="neon-card p-8 mt-8">
        <form onSubmit={submit} className="space-y-5">
          <div>
            <Label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-[hsl(185,100%,50%)]">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-black/50 border-border/60 focus:border-[hsl(185,100%,50%)] font-mono text-sm mt-2"
              required
              autoFocus
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-[10px] font-bold uppercase tracking-widest text-[hsl(185,100%,50%)]">Senha</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-black/50 border-border/60 focus:border-[hsl(185,100%,50%)] font-mono text-sm mt-2"
              required
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <button type="submit" className="btn-neon w-full py-4 rounded-xl" disabled={submitting}>
            {submitting ? "Conectando…" : "Entrar"}
          </button>
        </form>
      </div>
    </NeuralShell>
  );
}
