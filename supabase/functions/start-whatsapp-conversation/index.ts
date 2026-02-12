import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

type LeadRecord = {
  id: string;
  name: string;
  phone_country_code: string;
  phone_number: string;
};

type LeadWebhookPayload = {
  type: 'INSERT' | 'UPDATE' | 'DELETE';
  table: string;
  record: LeadRecord;
};

const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
const uazapiUrl = Deno.env.get('UAZAPI_URL') ?? '';
const uazapiKey = Deno.env.get('UAZAPI_KEY') ?? '';
const uazapiInstanceId = Deno.env.get('UAZAPI_INSTANCE_ID') ?? '';
const uazapiInstanceToken = Deno.env.get('UAZAPI_INSTANCE_TOKEN') ?? '';
const uazapiWebhookSecret = Deno.env.get('UAZAPI_WEBHOOK_SECRET') ?? '';
const initialMessageTemplate =
  Deno.env.get('UAZAPI_INITIAL_MESSAGE') ??
  'Olá, {{name}}! Recebemos seu contato na Synapsea. Posso te fazer 2 perguntas rápidas para entender seu cenário?';

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY são obrigatórios.');
}

if (!uazapiUrl || !uazapiKey || !uazapiInstanceId || !uazapiInstanceToken || !uazapiWebhookSecret) {
  throw new Error(
    'UAZAPI_URL, UAZAPI_KEY, UAZAPI_INSTANCE_ID, UAZAPI_INSTANCE_TOKEN e UAZAPI_WEBHOOK_SECRET são obrigatórios.'
  );
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

const normalizePhone = (countryCode: string, phoneNumber: string) =>
  `${countryCode}${phoneNumber}`.replace(/\D/g, '');

const sanitizeName = (name: string) => name.trim().split(' ')[0] ?? 'Cliente';

const buildMessage = (name: string) => initialMessageTemplate.replace(/\{\{name\}\}/g, sanitizeName(name));

const startConversation = async (lead: LeadRecord) => {
  const number = normalizePhone(lead.phone_country_code, lead.phone_number);

  const response = await fetch(`${uazapiUrl}/api/send/text`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token: uazapiKey,
    },
    body: JSON.stringify({
      instanceId: uazapiInstanceId,
      instanceToken: uazapiInstanceToken,
      number,
      text: buildMessage(lead.name),
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erro UAZAPI (${response.status}): ${errorText}`);
  }

  return response.json();
};

Deno.serve(async (request) => {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const receivedSecret = request.headers.get('x-webhook-secret');
  if (receivedSecret !== uazapiWebhookSecret) {
    return new Response('Unauthorized', { status: 401 });
  }

  const payload = (await request.json()) as LeadWebhookPayload;

  if (!payload.record || payload.type !== 'INSERT' || payload.table !== 'leads') {
    return Response.json({ ok: true, ignored: true });
  }

  try {
    const result = await startConversation(payload.record);

    await supabase
      .from('leads')
      .update({
        conversation_status: 'started',
        conversation_started_at: new Date().toISOString(),
        conversation_error: null,
      })
      .eq('id', payload.record.id);

    return Response.json({ ok: true, result });
  } catch (error) {
    await supabase
      .from('leads')
      .update({
        conversation_status: 'error',
        conversation_error: error instanceof Error ? error.message : 'Erro desconhecido',
      })
      .eq('id', payload.record.id);

    return Response.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      },
      { status: 500 }
    );
  }
});
