import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { Check, Loader2, Send, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabaseClient';
import { useDeviceTracking } from '@/hooks/use-device-tracking';

// List of countries with DDI codes
const COUNTRIES = [
  { flag: '🇧🇷', name: 'Brasil', ddi: '+55', code: 'BR', minDigits: 10, maxDigits: 11 },
  { flag: '🇺🇸', name: 'Estados Unidos', ddi: '+1', code: 'US', minDigits: 10, maxDigits: 10 },
  { flag: '🇨🇦', name: 'Canadá', ddi: '+1', code: 'CA', minDigits: 10, maxDigits: 10 },
  { flag: '🇲🇽', name: 'México', ddi: '+52', code: 'MX', minDigits: 10, maxDigits: 10 },
  { flag: '🇦🇷', name: 'Argentina', ddi: '+54', code: 'AR', minDigits: 9, maxDigits: 10 },
  { flag: '🇨🇴', name: 'Colômbia', ddi: '+57', code: 'CO', minDigits: 10, maxDigits: 10 },
  { flag: '🇵🇪', name: 'Peru', ddi: '+51', code: 'PE', minDigits: 9, maxDigits: 9 },
  { flag: '🇨🇭', name: 'Chile', ddi: '+56', code: 'CL', minDigits: 9, maxDigits: 9 },
  { flag: '🇬🇧', name: 'Reino Unido', ddi: '+44', code: 'UK', minDigits: 10, maxDigits: 11 },
  { flag: '🇪🇸', name: 'Espanha', ddi: '+34', code: 'ES', minDigits: 9, maxDigits: 9 },
  { flag: '🇫🇷', name: 'França', ddi: '+33', code: 'FR', minDigits: 9, maxDigits: 9 },
  { flag: '🇩🇪', name: 'Alemanha', ddi: '+49', code: 'DE', minDigits: 10, maxDigits: 11 },
  { flag: '🇮🇹', name: 'Itália', ddi: '+39', code: 'IT', minDigits: 10, maxDigits: 10 },
  { flag: '🇵🇹', name: 'Portugal', ddi: '+351', code: 'PT', minDigits: 9, maxDigits: 9 },
  { flag: '🇦🇺', name: 'Austrália', ddi: '+61', code: 'AU', minDigits: 9, maxDigits: 9 },
  { flag: '🇯🇵', name: 'Japão', ddi: '+81', code: 'JP', minDigits: 10, maxDigits: 11 },
  { flag: '🇳🇿', name: 'Nova Zelândia', ddi: '+64', code: 'NZ', minDigits: 9, maxDigits: 9 },
  { flag: '🇿🇦', name: 'África do Sul', ddi: '+27', code: 'ZA', minDigits: 9, maxDigits: 10 },
  { flag: '🇮🇳', name: 'Índia', ddi: '+91', code: 'IN', minDigits: 10, maxDigits: 10 },
  { flag: '🇨🇳', name: 'China', ddi: '+86', code: 'CN', minDigits: 10, maxDigits: 11 },
];

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  email: z
    .string()
    .trim()
    .email('Email inválido')
    .max(255, 'Email deve ter no máximo 255 caracteres'),
  company: z.preprocess(
    (value) => (typeof value === 'string' && value.trim() === '' ? undefined : value),
    z
      .string()
      .trim()
      .max(100, 'Empresa deve ter no máximo 100 caracteres')
      .optional()
  ),
  country: z.string().trim().min(1, 'Selecione um país'),
  whatsapp: z
    .string()
    .trim()
    .min(1, 'WhatsApp é obrigatório')
    .regex(/^\d+$/, 'Apenas números'),
  problem: z
    .string()
    .trim()
    .min(10, 'Descreva o problema em pelo menos 10 caracteres')
    .max(1000, 'Descrição deve ter no máximo 1000 caracteres'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<typeof COUNTRIES[0]>(COUNTRIES[0]); // Brasil padrão
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const deviceInfo = useDeviceTracking();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      country: COUNTRIES[0].code,
    },
  });

  const whatsappValue = watch('whatsapp');

  const onSubmit = async (data: ContactFormData) => {
    setStatus('submitting');
    setErrorMessage(null);

    try {
      // Combine country DDI with WhatsApp number
      const fullWhatsapp = `${selectedCountry.ddi}${data.whatsapp}`;

      const { error } = await supabase.from('leads').insert([
        {
          name: data.name,
          email: data.email,
          company: data.company ?? null,
          whatsapp: fullWhatsapp,
          problem: data.problem,
          country_code: selectedCountry.code,
          ddi: selectedCountry.ddi,
          // Device tracking data
          device_type: deviceInfo?.deviceType,
          browser: deviceInfo?.browser,
          os: deviceInfo?.os,
          os_version: deviceInfo?.osVersion,
          screen_resolution: deviceInfo?.screenResolution,
          timezone: deviceInfo?.timezone,
          language: deviceInfo?.language,
          referrer: deviceInfo?.referrer,
          source: deviceInfo?.source,
          utm_source: deviceInfo?.utmSource,
          utm_medium: deviceInfo?.utmMedium,
          utm_campaign: deviceInfo?.utmCampaign,
          utm_content: deviceInfo?.utmContent,
          utm_term: deviceInfo?.utmTerm,
          user_agent: deviceInfo?.userAgent,
        },
      ]);

      if (error) {
        throw error;
      }

      setStatus('success');
      reset();
      setSelectedCountry(COUNTRIES[0]);

      // Reset status after 3 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Não foi possível enviar seus dados. Tente novamente.';
      setErrorMessage(message);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-mono text-muted-foreground">
          Nome completo *
        </Label>
        <Input
          id="name"
          autoComplete="name"
          placeholder="Seu nome"
          className={cn(
            'bg-secondary/50 border-border focus:border-synapse-cyan transition-colors',
            errors.name && 'border-synapse-amber'
          )}
          {...register('name')}
        />
        {errors.name && (
          <p className="text-xs text-synapse-amber">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-mono text-muted-foreground">
          E-mail *
        </Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="seu@email.com"
          className={cn(
            'bg-secondary/50 border-border focus:border-synapse-cyan transition-colors',
            errors.email && 'border-synapse-amber'
          )}
          {...register('email')}
        />
        {errors.email && (
          <p className="text-xs text-synapse-amber">{errors.email.message}</p>
        )}
      </div>

      {/* Company */}
      <div className="space-y-2">
        <Label htmlFor="company" className="text-sm font-mono text-muted-foreground">
          Nome da empresa (opcional)
        </Label>
        <Input
          id="company"
          autoComplete="organization"
          placeholder="Nome da sua empresa"
          className={cn(
            'bg-secondary/50 border-border focus:border-synapse-cyan transition-colors',
            errors.company && 'border-synapse-amber'
          )}
          {...register('company')}
        />
        {errors.company && (
          <p className="text-xs text-synapse-amber">{errors.company.message}</p>
        )}
      </div>

      {/* WhatsApp with Country Selector */}
      <div className="space-y-2">
        <Label className="text-sm font-mono text-muted-foreground">
          WhatsApp *
        </Label>
        <div className="flex gap-2">
          {/* Country Selector */}
          <div className="relative w-32 flex-shrink-0">
            <button
              type="button"
              onClick={() => setShowCountryDropdown(!showCountryDropdown)}
              className="w-full px-3 py-2 bg-secondary/50 border border-border rounded-md flex items-center justify-between hover:border-synapse-cyan transition-colors"
            >
              <span className="text-sm font-mono">{selectedCountry.flag} {selectedCountry.ddi}</span>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </button>
            
            {showCountryDropdown && (
              <div className="absolute top-full mt-1 w-48 max-h-64 overflow-y-auto bg-card border border-border rounded-md shadow-lg z-50">
                {COUNTRIES.map((country) => (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => {
                      setSelectedCountry(country);
                      setShowCountryDropdown(false);
                    }}
                    className={cn(
                      'w-full text-left px-3 py-2 text-sm hover:bg-secondary transition-colors',
                      selectedCountry.code === country.code && 'bg-secondary font-semibold'
                    )}
                  >
                    <span className="font-mono">{country.flag} {country.ddi}</span>
                    <span className="text-xs text-muted-foreground ml-2">{country.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Phone Input */}
          <Input
            type="tel"
            inputMode="numeric"
            placeholder="Número do WhatsApp"
            className={cn(
              'bg-secondary/50 border-border focus:border-synapse-cyan transition-colors flex-1',
              errors.whatsapp && 'border-synapse-amber'
            )}
            {...register('whatsapp')}
          />
        </div>
        
        {whatsappValue && selectedCountry && (
          <p className="text-xs text-muted-foreground">
            Formato: {selectedCountry.ddi}{whatsappValue}
          </p>
        )}
        {errors.whatsapp && (
          <p className="text-xs text-synapse-amber">{errors.whatsapp.message}</p>
        )}
      </div>

      {/* Problem / Use Case */}
      <div className="space-y-2">
        <Label htmlFor="problem" className="text-sm font-mono text-muted-foreground">
          Caso de uso / Problema real *
        </Label>
        <Textarea
          id="problem"
          placeholder="Descreva o problema real da sua operação hoje, onde existe gargalo humano ou perda de escala, e o que você espera resolver..."
          rows={5}
          className={cn(
            'bg-secondary/50 border-border focus:border-synapse-cyan transition-colors resize-none',
            errors.problem && 'border-synapse-amber'
          )}
          {...register('problem')}
        />
        {errors.problem && (
          <p className="text-xs text-synapse-amber">{errors.problem.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="synapse"
        size="xl"
        className="w-full"
        disabled={status === 'submitting' || status === 'success'}
      >
        {status === 'submitting' && (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Enviando...
          </>
        )}
        {status === 'success' && (
          <>
            <Check className="w-5 h-5" />
            Conversa agendada
          </>
        )}
        {status === 'idle' && (
          <>
            <Send className="w-5 h-5" />
            Falar com um arquiteto
          </>
        )}
        {status === 'error' && 'Erro ao enviar. Tente novamente.'}
      </Button>

      {status === 'success' && (
        <p className="text-xs text-synapse-cyan text-center">
          ✓ Sua conversa técnica foi agendada. Um arquiteto entrará em contato em breve.
        </p>
      )}

      {status === 'error' && errorMessage && (
        <p className="text-xs text-synapse-amber text-center">{errorMessage}</p>
      )}

      {/* Privacy note */}
      <p className="text-xs text-muted-foreground text-center">
        Seus dados são tratados com confidencialidade. Sem spam.
      </p>
    </form>
  );
};

export default ContactForm;
