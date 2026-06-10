import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "@/hooks/use-user-auth";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { NeuralShell } from "@/components/NeuralShell";
import { toast } from "sonner";

type NumberWithStatus = {
  id: string;
  name: string;
  number: string;
  status: string;
  connected: boolean;
  loggedIn: boolean;
  profileName: string | null;
  profilePicUrl: string | null;
  lastDisconnect: string | null;
  lastDisconnectReason: string | null;
  error: string | null;
};

type ConnectResponse =
  | { connected: true; name: string; number: string }
  | { connected: false; qrcode: string; name: string; number: string };

const COUNTDOWN_SECS = 30;

function StatusPill({ status, error }: { status: string; error: string | null }) {
  let color = "bg-slate-500/20 text-slate-400 border-slate-500/40";
  let label = status || "desconhecido";

  if (error) {
    color = "bg-destructive/20 text-destructive border-destructive/40";
    label = "erro";
  } else if (status === "connected") {
    color = "bg-[hsl(142,100%,50%)]/15 text-[hsl(142,100%,70%)] border-[hsl(142,100%,50%)]/40";
    label = "conectado";
  } else if (status === "connecting") {
    color = "bg-[hsl(45,100%,50%)]/15 text-[hsl(45,100%,70%)] border-[hsl(45,100%,50%)]/40";
    label = "conectando";
  } else if (status === "disconnected") {
    color = "bg-[hsl(0,80%,60%)]/15 text-[hsl(0,80%,75%)] border-[hsl(0,80%,60%)]/40";
    label = "desconectado";
  }

  return (
    <span className={`text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-md border ${color}`}>
      {label}
    </span>
  );
}

export default function UserDashboard() {
  const { session, token, user, signOut, loading } = useUserAuth();
  const navigate = useNavigate();

  const [numbers, setNumbers] = useState<NumberWithStatus[]>([]);
  const [loadingStatuses, setLoadingStatuses] = useState(true);
  const [activeQr, setActiveQr] = useState<{ numberId: string; qr: string; name: string; number: string } | null>(null);
  const [generatingFor, setGeneratingFor] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number>(0);

  useEffect(() => {
    if (!loading && !session) navigate("/login", { replace: true });
  }, [loading, session, navigate]);

  const loadStatuses = async () => {
    if (!token) return;
    setLoadingStatuses(true);
    try {
      const { data } = await api<{ data: NumberWithStatus[] }>("/api/me/numbers/statuses", { token });
      setNumbers(data);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao carregar números");
    } finally {
      setLoadingStatuses(false);
    }
  };

  useEffect(() => { loadStatuses(); }, [token]);

  useEffect(() => {
    if (!activeQr) return;
    setCountdown(COUNTDOWN_SECS);
    const interval = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) { clearInterval(interval); setActiveQr(null); loadStatuses(); return 0; }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [activeQr]);

  const generate = async (numberId: string) => {
    if (!token) return;
    setGeneratingFor(numberId);
    setActiveQr(null);
    try {
      const res = await api<ConnectResponse>("/api/me/connect-whatsapp", {
        method: "POST",
        body: JSON.stringify({ number_id: numberId }),
        token,
      });
      if (res.connected === true) {
        toast.success(`${res.name} já está conectado.`);
        await loadStatuses();
      } else {
        setActiveQr({ numberId, qr: res.qrcode, name: res.name, number: res.number });
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro");
    } finally {
      setGeneratingFor(null);
    }
  };

  if (loading) {
    return (
      <NeuralShell title="SYNAPSEA" titleAccent="QR" subtitle="Carregando…" maxWidth="md">
        <div />
      </NeuralShell>
    );
  }

  const circleCircumference = 145;
  const circleOffset = circleCircumference - (countdown / COUNTDOWN_SECS) * circleCircumference;

  return (
    <NeuralShell
      eyebrow="Node de Autenticação"
      title="SYNAPSEA"
      titleAccent="QR"
      subtitle="Conexões WhatsApp"
      maxWidth="2xl"
      headerRight={
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground font-mono hidden sm:inline">{user?.email}</span>
          <Button variant="outline" size="sm" onClick={() => { signOut(); navigate("/login"); }}>Sair</Button>
        </div>
      }
    >
      <div className="mt-4 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest">
            {numbers.length === 0 && !loadingStatuses
              ? "Nenhum número disponível"
              : `${numbers.length} ${numbers.length === 1 ? "número" : "números"}`}
          </p>
          <Button variant="outline" size="sm" onClick={loadStatuses} disabled={loadingStatuses}>
            {loadingStatuses ? "Atualizando…" : "Atualizar"}
          </Button>
        </div>

        {numbers.length === 0 && !loadingStatuses && (
          <div className="neon-card p-8 text-center">
            <p className="text-sm text-muted-foreground">
              Nenhum número disponível para sua empresa.<br />
              Peça ao administrador para cadastrar.
            </p>
          </div>
        )}

        {numbers.map((n) => {
          const isGenerating = generatingFor === n.id;
          const showingQr = activeQr?.numberId === n.id;
          return (
            <div key={n.id} className="neon-card p-6">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex items-start gap-4 min-w-0 flex-1">
                  {n.profilePicUrl ? (
                    <img
                      src={n.profilePicUrl}
                      alt=""
                      className="w-12 h-12 rounded-full border border-border/60 shrink-0"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-black/40 border border-border/60 shrink-0 flex items-center justify-center text-[hsl(185,100%,50%)] font-mono text-lg">
                      {n.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold truncate">{n.name}</span>
                      <StatusPill status={n.status} error={n.error} />
                    </div>
                    <div className="text-xs text-muted-foreground font-mono mt-1">{n.number}</div>
                    {n.profileName && (
                      <div className="text-xs text-[hsl(185,100%,50%)] mt-1 truncate">{n.profileName}</div>
                    )}
                    {n.error && (
                      <div className="text-xs text-destructive mt-1 truncate">{n.error}</div>
                    )}
                    {!n.error && !n.connected && n.lastDisconnectReason && (
                      <div className="text-xs text-muted-foreground mt-1 truncate">
                        Última: {n.lastDisconnectReason}
                      </div>
                    )}
                  </div>
                </div>

                {!showingQr && (
                  <button
                    onClick={() => generate(n.id)}
                    disabled={isGenerating || generatingFor !== null}
                    className="btn-neon px-4 py-2.5 rounded-xl text-xs shrink-0"
                  >
                    {isGenerating ? "Sincronizando…" : n.connected ? "Reconectar" : "Gerar QR"}
                  </button>
                )}
              </div>

              {showingQr && activeQr && (
                <div className="mt-6 text-center space-y-4">
                  <div className="inline-block bg-white p-4 rounded-3xl shadow-inner">
                    <img src={`data:image/png;base64,${activeQr.qr}`} alt="QR code" className="w-56 h-56" />
                  </div>
                  <div className="flex items-center justify-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                    <div className="relative w-10 h-10">
                      <svg className="w-10 h-10 -rotate-90" viewBox="0 0 50 50">
                        <circle
                          cx="25" cy="25" r="23"
                          fill="transparent"
                          strokeWidth={3}
                          stroke="hsl(185,100%,50%)"
                          strokeDasharray={circleCircumference}
                          strokeDashoffset={circleOffset}
                          style={{ transition: "stroke-dashoffset 1s linear", filter: "drop-shadow(0 0 8px hsl(185 100% 50%))" }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-[hsl(185,100%,50%)] font-mono">{countdown}s</span>
                      </div>
                    </div>
                    <p className="text-[9px] text-slate-400 uppercase font-bold tracking-widest text-left leading-tight">
                      Link de segurança ativo
                    </p>
                  </div>
                  <ol className="text-left space-y-2 bg-black/40 p-5 rounded-2xl border border-white/5 text-[11px] text-slate-300">
                    <li>1. Abra o WhatsApp no celular</li>
                    <li>2. Acesse Aparelhos Conectados</li>
                    <li>3. Escaneie para Sincronizar</li>
                  </ol>
                  <Button variant="outline" size="sm" onClick={() => { setActiveQr(null); loadStatuses(); }}>
                    Cancelar
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </NeuralShell>
  );
}
