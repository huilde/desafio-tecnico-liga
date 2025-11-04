import { colors } from "../../styles/colors"
import DetailedCard from "../detailedCard/DetailedCard"
import { Stethoscope } from "lucide-react";
import { useEspecialidades } from "../../hooks/useEspecialidades"
import { Button, message } from "antd"
import PageHeader from "../PageHeader/PageHeader"
import CreationModal from "../CreationModal/CreationModal"

import { useState } from "react"
import { PlusOutlined } from "@ant-design/icons";

const Especialidades = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { data: especialidades, isLoading, addEspecialidade, error } = useEspecialidades();

  const handleCreate = async (values: any) => {
    try {
      await addEspecialidade.mutateAsync(values);
      message.success("Especialidade criada com sucesso!");
      setIsOpenModal(false);
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
        action={<Button color="danger" icon={<PlusOutlined />} variant="solid" onClick={() => setIsOpenModal(true)}>Adicionar Especialidade</Button>}
      />

      <div className="flex flex-wrap gap-[16px]">
        {especialidades?.map((especialidade) => (
          <DetailedCard
            key={especialidade.id}
            title={especialidade.nome}
            value={`${especialidade.quantidadeMedicos} médicos`}
            icon={<Stethoscope />}
            iconColor={colors.warning.base}
            bgColor={colors.warning.background}
            description={especialidade.descricao}
          />
        ))}
      </div>

      <CreationModal
        open={isOpenModal}
        title="Cadastrar Especialidade"
        onCancel={() => setIsOpenModal(false)}
        descriptionMessage="Especialidade criada com sucesso!"

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

export default Especialidades
