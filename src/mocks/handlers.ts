import { http, HttpResponse } from 'msw'

interface Especialidade {
  id: number
  nome: string
  descricao?: string
  quantidadeMedicos: number
}

interface Convenio {
  id: number
  nome: string
  codigo?: string
  numeroClientes: number
}

interface Disponibilidade {
  data: string
  horarios: string[]
}


interface Agendamento {
  id: number
  paciente: string
  especialidade: string
  medico: string
  convenio: string
  data: string
  hora: string 
  status: 'agendado' | 'cancelado' | 'atendido'
}

export interface Atendimento {
  id: number
  especialidade: string
  medico: string
  convenio: string
  hora: string
  paciente: string
  data: string
  status: 'agendado' | 'cancelado' | 'atendido'

}

const especialidades: Especialidade[] = [
  { id: 1, nome: 'Cardiologia', descricao: 'Cuidados com o coração', quantidadeMedicos: 5 },
  { id: 2, nome: 'Dermatologia', descricao: 'Saúde da pele', quantidadeMedicos: 3 },
  { id: 3, nome: 'Pediatria', descricao: 'Cuidados com crianças', quantidadeMedicos: 4 },
  { id: 4, nome: 'Neurologia', descricao: 'Sistema nervoso e cérebro', quantidadeMedicos: 2 },
  { id: 5, nome: 'Ortopedia', descricao: 'Sistema musculoesquelético', quantidadeMedicos: 6 },
  { id: 6, nome: 'Ginecologia', descricao: 'Saúde da mulher', quantidadeMedicos: 3 },
  { id: 7, nome: 'Oftalmologia', descricao: 'Olhos e visão', quantidadeMedicos: 2 },
  { id: 8, nome: 'Endocrinologia', descricao: 'Hormônios e metabolismo', quantidadeMedicos: 2 },
  { id: 9, nome: 'Psiquiatria', descricao: 'Saúde mental', quantidadeMedicos: 3 },
  { id: 10, nome: 'Gastroenterologia', descricao: 'Sistema digestivo', quantidadeMedicos: 4 },
  { id: 11, nome: 'Reumatologia', descricao: 'Doenças autoimunes e articulações', quantidadeMedicos: 2 },
  { id: 12, nome: 'Urologia', descricao: 'Sistema urinário', quantidadeMedicos: 2 },
  { id: 13, nome: 'Oncologia', descricao: 'Tratamento de câncer', quantidadeMedicos: 3 },
  { id: 14, nome: 'Otorrinolaringologia', descricao: 'Ouvido, nariz e garganta', quantidadeMedicos: 2 },
  { id: 15, nome: 'Nefrologia', descricao: 'Rins e função renal', quantidadeMedicos: 2 },
];

const convenios: Convenio[] = [
  { id: 1, nome: "Unimed", codigo: "UNM-001", numeroClientes: 120 },
  { id: 2, nome: "Amil", codigo: "AML-002", numeroClientes: 80 },
  { id: 3, nome: "Bradesco Saúde", codigo: "BDS-003", numeroClientes: 95 },
  { id: 4, nome: "SulAmérica", codigo: "SLA-004", numeroClientes: 110 },
  { id: 5, nome: "NotreDame Intermédica", codigo: "", numeroClientes: 60 },
];
const disponibilidades: Disponibilidade[] = []
const agendamentos: Agendamento[] = [
  {
    id: 1,
    paciente: 'João Silva',
    especialidade: 'Cardiologia',
    medico: 'Dr. Carlos Mendes',
    convenio: 'Unimed',
    data: '2025-11-02',
    hora: '09:00',
    status: 'agendado',
  },
  {
    id: 2,
    paciente: 'Maria Oliveira',
    especialidade: 'Dermatologia',
    medico: 'Dra. Ana Paula',
    convenio: 'Bradesco Saúde',
    data: '2025-11-03',
    hora: '10:30',
    status: 'agendado',
  },
];

const atendimentos: Atendimento[] = [
  {
    id: 3,
    paciente: 'Laura Mendes',
    especialidade: 'Neurologia',
    medico: 'Dr. Carlos Dias',
    convenio: 'Bradesco',
    data: '2025-11-01',
    hora: '09:30',
    status: 'atendido',
  },
  {
    id: 4,
    paciente: 'Marcos Pereira',
    especialidade: 'Ortopedia',
    medico: 'Dr. Lucas Pinto',
    convenio: 'SulAmérica',
    data: '2025-11-02',
    hora: '11:00',
    status: 'cancelado',
  },
]

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

  http.post('/api/disponibilidades', async ({ request }) => {
    const { data } = (await request.json()) as { data: string }

    const horarios = [
      { hora: '09:00', status: 'livre' },
      { hora: '10:00', status: 'ocupado' },
      { hora: '11:00', status: 'livre' },
    ]

    return HttpResponse.json({ data, horarios })
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
