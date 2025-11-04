import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { Disponibilidade } from "../mocks/types"

export const useDisponibilidades = () => {
    return useQuery({
        queryKey: ['disponibilidades'],
        queryFn: async () => {
            const res = await fetch('/api/disponibilidades')
            if (!res.ok) throw new Error('Erro ao buscar disponibilidades')
            return res.json() as Promise<Disponibilidade[]>
        },
    })
}


export const useAddDisponibilidade = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (novaDisponibilidade: Disponibilidade) => {
            const res = await fetch('/api/disponibilidades/definir', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(novaDisponibilidade),
            })

            if (!res.ok) {
                throw new Error('Erro ao adicionar disponibilidade')
            }

            return res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['disponibilidades'] })
        },
    })
}