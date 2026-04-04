import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Check, Loader2, Send, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { COUNTRIES } from '@/lib/countries';
import { useContactForm } from '@/hooks/use-contact-form';

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    errors,
    whatsappValue,
    status,
    errorMessage,
    selectedCountry,
    setSelectedCountry,
    showCountryDropdown,
    setShowCountryDropdown,
    onSubmit,
  } = useContactForm();

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
