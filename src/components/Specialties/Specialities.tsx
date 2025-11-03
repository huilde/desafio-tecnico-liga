import { colors } from "../../styles/colors"
import DetailedCard from "../detailedCard/DetailedCard"
import SpecialityIcon from "../../assets/specialityIcon.svg?react"
import { useEspecialidades } from "../../hooks/useEspecialidades"
import { Button, message } from "antd"
import PageHeader from "../PageHeader/PageHeader"
import CreationModal from "../CreationModal/CreationModal"

import { useState } from "react"

const Specialities = () => {
  const [open, setOpen] = useState(false);
  const { data:especialidades, isLoading, addEspecialidade, error } = useEspecialidades();

  const handleCreate = async (values: any) => {
    try {
      await addEspecialidade.mutateAsync(values);
      message.success("Especialidade criada com sucesso!");
      setOpen(false);
    } catch (error) {
      message.error("Erro ao criar especialidade!");
    }
  };
  if (isLoading) return <p>Carregando especialidades...</p>
  if (error) return <p>Erro ao carregar especialidades</p>

  return (
    <div className="gap-[16px] m-[16px]">
    <PageHeader
        title="Especialidades Médicas"
        description="Gerencie as especialidades disponíveis para agendamento"
        action={<Button color="danger" variant="solid" onClick={()=> setOpen(true)}>+ Adicionar Especialidade</Button>}
      />

      <div className="flex flex-wrap gap-[16px]">
        {especialidades?.map((especialidade) => (
          <DetailedCard
            key={especialidade.id}
            title={especialidade.nome}
            value={`${especialidade.quantidadeMedicos} médicos`}
            icon={<SpecialityIcon />}
            iconColor={colors.warning.base}
            bgColor={colors.warning.background}
            description={especialidade.descricao}
          />
        ))}
      </div>

         <CreationModal
        open={open}
        title="Cadastrar Especialidade"
        onCancel={() => setOpen(false)}
        onSubmit={handleCreate}
        fields={[
          {
            name: "nome",
            label: "Nome da Especialidade",
            required: true,
            placeholder: "Ex: Cardiologia, Pediatria...",
          },
          {
            name: "descricao",
            label: "Descrição",
            placeholder: "Opcional",
          },
        ]}
      />
    </div>
  )
}

export default Specialities
