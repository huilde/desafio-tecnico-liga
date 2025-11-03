import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

interface Convenio {
  id: number
  nome: string
  codigo?: string
  numeroClientes: number
}

export const useConvenios = () => {
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ["convenios"],
    queryFn: async () => {
      const res = await fetch("/api/convenios")
      if (!res.ok) throw new Error("Erro ao buscar convênios")
      return res.json() as Promise<Convenio[]>
    },
  })

  const addConvenio = useMutation({
    mutationFn: async (novoConvenio: Omit<Convenio, "id" | "numeroClientes">) => {
      const res = await fetch("/api/convenios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoConvenio),
      })
      if (!res.ok) throw new Error("Erro ao criar convênio")
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["convenios"] })
    },
  })

  return { data, isLoading, addConvenio,error:false }
}
