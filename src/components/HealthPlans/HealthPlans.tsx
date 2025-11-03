import { colors } from "../../styles/colors"
import DetailedCard from "../detailedCard/DetailedCard"
import { ReactComponent as ConvenioIcon } from '../../assets/convenio.svg';
import { Button, message } from "antd"
import PageHeader from "../PageHeader/PageHeader"
import { useConvenios } from "../../hooks/useConvenios"
import CreationModal from "../CreationModal/CreationModal"
import { useState } from "react"

const HealthPlans = () => {
  const { data: convenios, isLoading, error, addConvenio } = useConvenios()

  const [open, setOpen] = useState(false);

  const handleCreate = async (values: any) => {
    try {
      await addConvenio.mutateAsync(values);
      message.success("Convênio criado com sucesso!");
      setOpen(false);
    } catch {
      message.error("Erro ao criar convênio!");
    }
  };

  if (isLoading) return <p>Carregando convênios...</p>
  if (error) return <p>Erro ao carregar convênios</p>

  return (
    <div className="gap-[16px] m-[16px]">
      <PageHeader
        title="Convênios Médicos"
        description="Gerencie os convênios aceitos pela clínica"
        action={<Button color="danger" variant="solid" onClick={() => setOpen(true)}>+ Adicionar Convênio</Button>}
      />

      <div className="flex flex-wrap gap-[16px]">
        {convenios?.map((convenio) => (
          <DetailedCard
            key={convenio.id}
            title={convenio.nome}
            value={convenio?.codigo && `Código: ${convenio.codigo}`}
            icon={<ConvenioIcon />}
            iconColor={colors.warning.base}
            bgColor={colors.warning.background}
            description={`${convenio.numeroClientes} pacientes`}
          />
        ))}
      </div>
      <CreationModal
        open={open}
        title="Cadastrar Convênio"
        onCancel={() => setOpen(false)}
        onSubmit={handleCreate}
        fields={[
          { name: "nome", label: "Nome do Convênio", required: true, placeholder: "Ex: Unimed, Amil..." },
          { name: "codigo", label: "Código", placeholder: "Opcional" },
        ]}
      />
    </div>
  )
}

export default HealthPlans
