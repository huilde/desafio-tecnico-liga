import type { Agendamento, Atendimento, Convenio, Disponibilidade, Especialidade } from "./types";

export const especialidades: Especialidade[] = [
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
  { id: 16, nome: 'Imunologia', descricao: 'Sistema imunológico', quantidadeMedicos: 3 },
  { id: 17, nome: 'Hematologia', descricao: 'Sangue e coagulação', quantidadeMedicos: 2 },
  { id: 18, nome: 'Pneumologia', descricao: 'Sistema respiratório', quantidadeMedicos: 3 },
  { id: 19, nome: 'Dermatologia Pediátrica', descricao: 'Cuidados com pele de crianças', quantidadeMedicos: 2 },
  { id: 20, nome: 'Cardiologia Infantil', descricao: 'Coração das crianças', quantidadeMedicos: 2 },
];

export const convenios: Convenio[] = [
  { id: 1, nome: "Unimed", codigo: "UNM-001", numeroClientes: 120 },
  { id: 2, nome: "Amil", codigo: "AML-002", numeroClientes: 80 },
  { id: 3, nome: "Bradesco Saúde", codigo: "BDS-003", numeroClientes: 95 },
  { id: 4, nome: "SulAmérica", codigo: "SLA-004", numeroClientes: 110 },
  { id: 5, nome: "NotreDame Intermédica", codigo: "", numeroClientes: 60 },
  { id: 6, nome: "Golden Cross", codigo: "GC-006", numeroClientes: 45 },
  { id: 7, nome: "Porto Seguro Saúde", codigo: "PS-007", numeroClientes: 75 },
  { id: 8, nome: "Hapvida", codigo: "HP-008", numeroClientes: 90 },
  { id: 9, nome: "Prevent Senior", codigo: "PSR-009", numeroClientes: 30 },
  { id: 10, nome: "Cassi", codigo: "C-010", numeroClientes: 55 },
];

export const agendamentos: Agendamento[] = [
  { id: 1, paciente: 'João Silva', especialidade: 'Cardiologia', medico: 'Dr. Carlos Mendes', convenio: 'Unimed', data: '2025-11-02', hora: '09:00', status: 'agendado' },
  { id: 2, paciente: 'Maria Oliveira', especialidade: 'Dermatologia', medico: 'Dra. Ana Paula', convenio: 'Bradesco Saúde', data: '2025-11-03', hora: '10:30', status: 'agendado' },
  { id: 3, paciente: 'Lucas Ferreira', especialidade: 'Pediatria', medico: 'Dra. Juliana Costa', convenio: 'SulAmérica', data: '2025-11-04', hora: '11:00', status: 'agendado' },
  { id: 4, paciente: 'Fernanda Lima', especialidade: 'Neurologia', medico: 'Dr. Carlos Dias', convenio: 'Amil', data: '2025-11-05', hora: '09:30', status: 'agendado' },
  { id: 5, paciente: 'Rafael Souza', especialidade: 'Ortopedia', medico: 'Dr. Lucas Pinto', convenio: 'Unimed', data: '2025-11-06', hora: '13:00', status: 'agendado' },
  { id: 6, paciente: 'Laura Mendes', especialidade: 'Ginecologia', medico: 'Dra. Camila Alves', convenio: 'Bradesco Saúde', data: '2025-11-07', hora: '10:00', status: 'agendado' },
  { id: 7, paciente: 'Marcos Pereira', especialidade: 'Oftalmologia', medico: 'Dr. Rodrigo Lima', convenio: 'SulAmérica', data: '2025-11-08', hora: '14:30', status: 'agendado' },
  { id: 8, paciente: 'Carla Mendes', especialidade: 'Endocrinologia', medico: 'Dra. Ana Paula', convenio: 'Amil', data: '2025-11-09', hora: '15:00', status: 'agendado' },
  { id: 9, paciente: 'Pedro Santos', especialidade: 'Psiquiatria', medico: 'Dr. Felipe Costa', convenio: 'Unimed', data: '2025-11-10', hora: '11:30', status: 'agendado' },
  { id: 10, paciente: 'Juliana Rocha', especialidade: 'Gastroenterologia', medico: 'Dra. Paula Mendes', convenio: 'Bradesco Saúde', data: '2025-11-11', hora: '16:00', status: 'agendado' },
];

export const atendimentos: Atendimento[] = [
  { id: 1, paciente: 'Laura Mendes', especialidade: 'Neurologia', medico: 'Dr. Carlos Dias', convenio: 'Bradesco', data: '2025-11-01', hora: '09:30', status: 'atendido' },
  { id: 2, paciente: 'Marcos Pereira', especialidade: 'Ortopedia', medico: 'Dr. Lucas Pinto', convenio: 'SulAmérica', data: '2025-11-02', hora: '11:00', status: 'cancelado' },
  { id: 3, paciente: 'João Silva', especialidade: 'Cardiologia', medico: 'Dr. Carlos Mendes', convenio: 'Unimed', data: '2025-11-03', hora: '09:00', status: 'atendido' },
  { id: 4, paciente: 'Maria Oliveira', especialidade: 'Dermatologia', medico: 'Dra. Ana Paula', convenio: 'Bradesco Saúde', data: '2025-11-04', hora: '10:30', status: 'atendido' },
  { id: 5, paciente: 'Lucas Ferreira', especialidade: 'Pediatria', medico: 'Dra. Juliana Costa', convenio: 'SulAmérica', data: '2025-11-05', hora: '11:00', status: 'atendido' },
  { id: 6, paciente: 'Fernanda Lima', especialidade: 'Neurologia', medico: 'Dr. Carlos Dias', convenio: 'Amil', data: '2025-11-06', hora: '09:30', status: 'atendido' },
  { id: 7, paciente: 'Rafael Souza', especialidade: 'Ortopedia', medico: 'Dr. Lucas Pinto', convenio: 'Unimed', data: '2025-11-07', hora: '13:00', status: 'cancelado' },
  { id: 8, paciente: 'Laura Mendes', especialidade: 'Ginecologia', medico: 'Dra. Camila Alves', convenio: 'Bradesco Saúde', data: '2025-11-08', hora: '10:00', status: 'atendido' },
  { id: 9, paciente: 'Marcos Pereira', especialidade: 'Oftalmologia', medico: 'Dr. Rodrigo Lima', convenio: 'SulAmérica', data: '2025-11-09', hora: '14:30', status: 'atendido' },
  { id: 10, paciente: 'Carla Mendes', especialidade: 'Endocrinologia', medico: 'Dra. Ana Paula', convenio: 'Amil', data: '2025-11-10', hora: '15:00', status: 'atendido' },
];

export const disponibilidades: Disponibilidade[] = [
  { data: '2025-11-02', horarios: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'] },
  { data: '2025-11-03', horarios: ['08:30', '09:30', '10:30', '13:00', '14:30', '16:00'] },
  { data: '2025-11-04', horarios: ['09:00', '10:00', '11:00', '14:00', '15:30'] },
  { data: '2025-11-05', horarios: ['08:00', '09:30', '10:30', '13:30', '15:00'] },
  { data: '2025-11-06', horarios: ['09:00', '10:00', '11:30', '14:00', '15:00'] },
  { data: '2025-11-07', horarios: ['09:00', '09:30', '10:30', '13:00', '14:30', '16:00'] },
];
