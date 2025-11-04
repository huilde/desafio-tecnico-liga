import { CalendarOutlined, CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined } from "@ant-design/icons"
import InfoCard from "../InfoCard/InfoCard"
import { colors } from "../../styles/colors"
import type { Agendamento } from "../../hooks/useAgendamentos"
import type { Atendimento } from "../../mocks/types"

interface SchedulingMenuProps {
  data?: { "agendamentos": Agendamento[] | undefined, "atendimentos": Atendimento[] | undefined }
}

const SchedulingMenu: React.FC<SchedulingMenuProps> = ({ data }) => {

  const totalAgendamentos = data?.agendamentos?.length ?? 0
  const totalAtendimentos = data?.atendimentos?.length ?? 0
  const totalCancelados = data?.atendimentos?.filter(item => item.status === 'cancelado').length ?? 0
  const totalAtendidos = data?.atendimentos?.filter(item => item.status === 'atendido').length ?? 0


  return (
    <div className="flex flex-wrap gap-[16px] my-[16px]">
      <InfoCard
        title="Total de Agendamentos"
        value={totalAtendimentos + totalAgendamentos}
        icon={<CalendarOutlined />}
        iconColor={colors.primary.base}
        bgColor={colors.primary.background}
      />
      <InfoCard
        title="Aguardando Atendimento"
        value={totalAgendamentos}
        icon={<ClockCircleOutlined />}
        iconColor={colors.warning.base}
        bgColor={colors.warning.background}
      />
      <InfoCard
        title="Atendidos"
        value={totalAtendidos}
        icon={<CheckCircleOutlined />}
        iconColor={colors.success.base}
        bgColor={colors.success.background}
      />
      <InfoCard
        title="Cancelados"
        value={totalCancelados}
        icon={<CloseCircleOutlined />}
        iconColor={colors.danger.base}
        bgColor={colors.danger.background}
      />
    </div>
  )
}

export default SchedulingMenu
