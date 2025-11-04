import { http, HttpResponse } from 'msw'
import { especialidades, convenios, atendimentos, agendamentos, disponibilidades } from './mockData'
import type { Atendimento, Convenio, Disponibilidade, Especialidade } from './types'


export const handlers = [
  http.get('/api/especialidades', () => {
    return HttpResponse.json(especialidades)
  }),

  http.post("/api/especialidades", async ({ request }) => {
    const body = await request.json();
    const nova = {
      id: especialidades.length + 1,
      quantidadeMedicos: Math.floor(Math.random() * 10) + 1,
      ...body as object,
    };
    especialidades.push(nova as Especialidade);
    return HttpResponse.json(nova, { status: 201 });
  }),

  http.get("/api/convenios", () => {
    return HttpResponse.json(convenios)
  }),


  http.post('/api/convenios', async ({ request }) => {
    const novoConvenio = await request.json()
    const created = {
      id: convenios.length + 1,
      numeroClientes: 0,
      ...novoConvenio as object,
    }
    convenios.push(created as Convenio)
    return HttpResponse.json(created, { status: 201 })
  }),

  http.post('/api/disponibilidades/definir', async ({ request }) => {
    const body = (await request.json()) as Disponibilidade
    disponibilidades.push(body)
    return HttpResponse.json({ message: 'Disponibilidade definida com sucesso' })
  }),

  http.get('/api/disponibilidades', async () => {

    return HttpResponse.json(disponibilidades)
  }),

  http.get('/api/agendamentos', () => {
    return HttpResponse.json(agendamentos)
  }),

  http.post('/api/agendamentos', async ({ request }) => {
    const novoAgendamento = await request.json()
    const id = agendamentos.length + 1
    const novoAgendamentoComId = { id, ...novoAgendamento as object }
    agendamentos.push(novoAgendamentoComId as Atendimento)
    return HttpResponse.json(novoAgendamentoComId, { status: 201 })

  }),

  http.delete('/api/agendamentos/:id', (req) => {
    const { id } = req.params;
    const index = agendamentos.findIndex(a => a.id === Number(id));

    if (index === -1) {
      return new Response(JSON.stringify({ message: 'Agendamento não encontrado' }), { status: 404 });
    }

    const deleted = agendamentos.splice(index, 1)[0];
    return new Response(JSON.stringify(deleted), { status: 200 });
  }),


  http.get('/api/atendimentos', () => {
    return HttpResponse.json(atendimentos)
  }),

  http.post('/api/atendimentos', async ({ request }) => {
    const novoAtendimento = await request.json()
    const id = atendimentos.length + 1
    const atendimentoComId = { id, ...novoAtendimento as object }
    atendimentos.push(atendimentoComId as Atendimento)
    return HttpResponse.json(atendimentoComId, { status: 201 })
  }),
]
