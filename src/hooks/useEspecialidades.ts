import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface Especialidade {
  id: number;
  nome: string;
  descricao?: string;
  quantidadeMedicos: number;
}

export const useEspecialidades = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["especialidades"],
    queryFn: async () => {
      const res = await fetch("/api/especialidades");
      if (!res.ok) throw new Error("Erro ao buscar especialidades");
      return res.json() as Promise<Especialidade[]>;
    },
  });

  const addEspecialidade = useMutation({
    mutationFn: async (nova: Omit<Especialidade, "id" | "quantidadeMedicos">) => {
      const res = await fetch("/api/especialidades", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nova),
      });
      if (!res.ok) throw new Error("Erro ao criar especialidade");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["especialidades"] });
    },
  });

  return { data, isLoading, addEspecialidade, error:false };
};
