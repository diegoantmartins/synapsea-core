import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { Check, Loader2, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabaseClient';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const PHONE_COUNTRIES = [
  { code: '+55', label: 'Brasil', flag: '🇧🇷' },
  { code: '+1', label: 'Estados Unidos', flag: '🇺🇸' },
  { code: '+1', label: 'Canadá', flag: '🇨🇦' },
  { code: '+44', label: 'Reino Unido', flag: '🇬🇧' },
  { code: '+351', label: 'Portugal', flag: '🇵🇹' },
  { code: '+34', label: 'Espanha', flag: '🇪🇸' },
  { code: '+49', label: 'Alemanha', flag: '🇩🇪' },
  { code: '+33', label: 'França', flag: '🇫🇷' },
  { code: '+39', label: 'Itália', flag: '🇮🇹' },
  { code: '+52', label: 'México', flag: '🇲🇽' },
  { code: '+54', label: 'Argentina', flag: '🇦🇷' },
  { code: '+56', label: 'Chile', flag: '🇨🇱' },
  { code: '+57', label: 'Colômbia', flag: '🇨🇴' },
  { code: '+51', label: 'Peru', flag: '🇵🇪' },
  { code: '+598', label: 'Uruguai', flag: '🇺🇾' },
  { code: '+593', label: 'Equador', flag: '🇪🇨' },
  { code: '+595', label: 'Paraguai', flag: '🇵🇾' },
  { code: '+591', label: 'Bolívia', flag: '🇧🇴' },
];

const normalizePhone = (value: string) => value.replace(/\D/g, '');

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
  useCase: z
    .string()
    .trim()
    .min(10, 'Descreva seu caso de uso em pelo menos 10 caracteres')
    .max(1000, 'Descrição deve ter no máximo 1000 caracteres'),
  countryCode: z.string().min(1, 'Selecione o código do país'),
  phoneNumber: z
    .string()
    .trim()
    .min(6, 'Telefone deve ter pelo menos 6 dígitos')
    .max(20, 'Telefone deve ter no máximo 20 dígitos')
    .refine((value) => normalizePhone(value).length >= 6, {
      message: 'Telefone inválido',
    }),
  website: z
    .string()
    .trim()
    .max(200, 'Website deve ter no máximo 200 caracteres')
    .optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      countryCode: '+55',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus('submitting');
    setErrorMessage(null);

    try {
      if (data.website) {
        throw new Error('Não foi possível enviar seus dados. Tente novamente.');
      }
      const normalizedPhone = normalizePhone(data.phoneNumber);
      const { error } = await supabase.from('leads').insert([
        {
          name: data.name,
          email: data.email,
          company: data.company ?? null,
          use_case: data.useCase,
          phone_country_code: data.countryCode,
          phone_number: normalizedPhone,
          phone_e164: `${data.countryCode}${normalizedPhone}`,
        },
      ]);

      if (error) {
        throw error;
      }

      setStatus('success');
      reset();

      // Reset status after 3 seconds
      setTimeout(() => setStatus('idle'), 3000);
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
      <div className="hidden">
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          type="text"
          autoComplete="off"
          tabIndex={-1}
          {...register('website')}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-mono text-muted-foreground">
            // nome *
          </Label>
          <Input
            id="name"
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
            // email *
          </Label>
          <Input
            id="email"
            type="email"
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
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Country Code */}
        <div className="space-y-2">
          <Label htmlFor="countryCode" className="text-sm font-mono text-muted-foreground">
            // whatsapp código do país *
          </Label>
          <Controller
            control={control}
            name="countryCode"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id="countryCode"
                  className={cn(
                    'bg-secondary/50 border-border focus:border-synapse-cyan transition-colors',
                    errors.countryCode && 'border-synapse-amber'
                  )}
                >
                  <SelectValue placeholder="Selecione o país" />
                </SelectTrigger>
                <SelectContent>
                  {PHONE_COUNTRIES.map((country) => (
                    <SelectItem key={`${country.code}-${country.label}`} value={country.code}>
                      {country.flag} {country.label} ({country.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.countryCode && (
            <p className="text-xs text-synapse-amber">{errors.countryCode.message}</p>
          )}
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <Label htmlFor="phoneNumber" className="text-sm font-mono text-muted-foreground">
            // whatsapp número *
          </Label>
          <Input
            id="phoneNumber"
            placeholder="Digite o número (somente dígitos)"
            inputMode="numeric"
            className={cn(
              'bg-secondary/50 border-border focus:border-synapse-cyan transition-colors',
              errors.phoneNumber && 'border-synapse-amber'
            )}
            {...register('phoneNumber')}
          />
          {errors.phoneNumber && (
            <p className="text-xs text-synapse-amber">{errors.phoneNumber.message}</p>
          )}
        </div>
      </div>

      {/* Company */}
      <div className="space-y-2">
        <Label htmlFor="company" className="text-sm font-mono text-muted-foreground">
          // empresa
        </Label>
        <Input
          id="company"
          placeholder="Nome da empresa (opcional)"
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

      {/* Use Case */}
      <div className="space-y-2">
        <Label htmlFor="useCase" className="text-sm font-mono text-muted-foreground">
          // caso de uso *
        </Label>
        <Textarea
          id="useCase"
          placeholder="Descreva seu caso de uso, desafios atuais e o que espera da Synapsea..."
          rows={5}
          className={cn(
            'bg-secondary/50 border-border focus:border-synapse-cyan transition-colors resize-none',
            errors.useCase && 'border-synapse-amber'
          )}
          {...register('useCase')}
        />
        {errors.useCase && (
          <p className="text-xs text-synapse-amber">{errors.useCase.message}</p>
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
            Mensagem enviada
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
