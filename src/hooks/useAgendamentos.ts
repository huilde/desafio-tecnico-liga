import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

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



export const useAddAgendamento = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (novo: Omit<Agendamento, 'id' | 'status'>) => {
      const res = await fetch('/api/agendamentos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novo),
      })
      if (!res.ok) throw new Error('Erro ao criar agendamento')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agendamentos'] })
    },
  })
}

export const useAgendamentos = ()=> {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['agendamentos'],
    queryFn: async (): Promise<Agendamento[]> => {
      const res = await fetch('/api/agendamentos')
      if (!res.ok) throw new Error('Erro ao buscar agendamentos')
      return res.json()
    },
  })

  const mutation = useMutation({
    mutationFn: async (params: { id: number; status: Agendamento['status'] }) => {
      const res = await fetch(`/api/agendamentos/${params.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: params.status }),
      })

      return res.json().catch(() => params)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agendamentos'] })
    },
  })

  return { ...query, updateStatus: mutation.mutate }
}
