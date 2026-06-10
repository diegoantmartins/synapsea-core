import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { COUNTRIES } from '@/lib/countries';
import { useDeviceTracking } from '@/hooks/use-device-tracking';
import { api } from '@/lib/api';

export const contactSchema = z.object({
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

export type ContactFormData = z.infer<typeof contactSchema>;

export const useContactForm = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<typeof COUNTRIES[0]>(COUNTRIES[0]);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const deviceInfo = useDeviceTracking();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      country: COUNTRIES[0].code,
    },
  });

  const { register, handleSubmit, reset, formState: { errors }, watch } = form;
  const whatsappValue = watch('whatsapp');

  const onSubmit = async (data: ContactFormData) => {
    setStatus('submitting');
    setErrorMessage(null);

    try {
      const fullWhatsapp = `${selectedCountry.ddi}${data.whatsapp}`;

      await api('/api/submit-lead', {
        method: 'POST',
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          company: data.company ?? null,
          whatsapp: fullWhatsapp,
          problem: data.problem,
          country_code: selectedCountry.code,
          ddi: selectedCountry.ddi,
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
          ip_hash: deviceInfo?.ipHash,
          city: deviceInfo?.city,
          region: deviceInfo?.region,
          geo_country: deviceInfo?.country,
          geo_country_code: deviceInfo?.countryCode,
          latitude: deviceInfo?.latitude,
          longitude: deviceInfo?.longitude,
          postal_code: deviceInfo?.postal,
          org: deviceInfo?.org,
          connection_type: deviceInfo?.connectionType,
          connection_downlink: deviceInfo?.connectionDownlink,
          device_memory: deviceInfo?.deviceMemory,
          hardware_concurrency: deviceInfo?.hardwareConcurrency,
        }),
      });

      setStatus('success');
      reset();
      setSelectedCountry(COUNTRIES[0]);

      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      const message = error instanceof Error 
          ? error.message 
          : 'Não foi possível enviar seus dados. Tente novamente.';
      setErrorMessage(message);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return {
    form,
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
  };
};
