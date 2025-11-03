export interface Especialidade {
  id: number
  nome: string
  descricao?: string
  quantidadeMedicos: number
}

export interface Convenio {
  id: number
  nome: string
  codigo?: string
  numeroClientes: number
}

export interface Disponibilidade {
  data: string
  horarios: string[]
}

export interface Agendamento {
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
  paciente: string
  especialidade: string
  medico: string
  convenio: string
  data: string
  hora: string
  status: 'agendado' | 'cancelado' | 'atendido'
}
