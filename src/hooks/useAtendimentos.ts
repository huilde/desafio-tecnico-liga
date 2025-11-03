import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { Atendimento } from '../mocks/handlers'

export const useAtendimentos = () => {
  return useQuery({
    queryKey: ['atendimentos'],
    queryFn: async () => {
      const res = await fetch('/api/atendimentos')
      if (!res.ok) throw new Error('Erro ao buscar atendimentos')
      return res.json() as Promise<Atendimento[]>
    },
  })
}

export const useAddAtendimento = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (novo: Omit<Atendimento, 'id'>) => {
      const res = await fetch('/api/atendimentos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novo),
      })
      if (!res.ok) throw new Error('Erro ao criar atendimento')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['atendimentos'] })
    },
  })
}
