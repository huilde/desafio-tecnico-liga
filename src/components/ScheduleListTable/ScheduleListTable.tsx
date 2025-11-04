import { useState, useEffect } from 'react'
import { Table, Button, Segmented, notification } from 'antd'
import type { Agendamento } from '../../hooks/useAgendamentos'
import { Columns } from './columns'
import type { Atendimento } from '../../mocks/types'
import { useAddAtendimento } from '../../hooks/useAtendimentos'
import ModalCreateAgendamento from '../ModalCreateAgendamento/ModalCreateAgendamento'
import { useConvenios } from '../../hooks/useConvenios'
import { useEspecialidades } from '../../hooks/useEspecialidades'
import { useAddAgendamento, useDeleteAgendamento } from '../../hooks/useAgendamentos'
import { PlusOutlined } from '@ant-design/icons'
interface ScheduleListTableProps {
  data?: { agendamentos: Agendamento[] | undefined; atendimentos: Atendimento[] | undefined }
  isLoading?: boolean
  error?: unknown
}

const medicos = [
  { id: 1, nome: "Dr. João Silva" },
  { id: 2, nome: "Dra. Maria Oliveira" },
  { id: 3, nome: "Dr. Carlos Pereira" },
]




const ScheduleListTable: React.FC<ScheduleListTableProps> = ({ data, isLoading, error }) => {
  const [view, setView] = useState<'agendamentos' | 'atendimentos'>('agendamentos')
  const [localAgendamentos, setLocalAgendamentos] = useState<Agendamento[]>(data?.agendamentos || [])
  const [localAtendimentos, setLocalAtendimentos] = useState<Atendimento[]>(data?.atendimentos || [])
  const [isOpenModal, setIsOpenModal] = useState(false)

  const addAtendimento = useAddAtendimento()
  const addAgendamento = useAddAgendamento()
  const deleteAgendamento = useDeleteAgendamento()


  const { data: convenios } = useConvenios()
  const { data: especialidades } = useEspecialidades()


  const [api, contextHolder] = notification.useNotification();


  const openNotification = (message: string, description: string) => {
    api.success({
      message: message,
      description: description,
      placement: "topRight",
    });
  };


  useEffect(() => {
    setLocalAgendamentos(data?.agendamentos || [])
    setLocalAtendimentos(data?.atendimentos || [])
  }, [data])

  if (isLoading) return <p>Carregando...</p>
  if (error) return <p>Erro ao carregar</p>

  const totalAgendamentos = localAgendamentos.length
  const totalAtendimentos = localAtendimentos.length

  const filteredData = view === 'agendamentos' ? localAgendamentos : localAtendimentos

  const handleSubmit = (data: Omit<Agendamento, "id" | "status">) => {
    addAgendamento.mutate(data)
    setIsOpenModal(false);
  }

  const handleRemoveAgendamento = (id: number) => {
    deleteAgendamento.mutate(id);
  }

  return (
    <div className="m-[16px]">
      {contextHolder}
      <div className="flex justify-between items-center mb-4 m-[16px]">
        <Segmented
          options={[
            { label: `Agendamentos (${totalAgendamentos})`, value: 'agendamentos' },
            { label: `Atendimentos (${totalAtendimentos})`, value: 'atendimentos' },
          ]}
          value={view}
          onChange={(val) => setView(val as 'agendamentos' | 'atendimentos')}
        />

        <Button color="danger" variant="solid" icon={<PlusOutlined />} className="text-xl font-bold" onClick={() => setIsOpenModal(true)} >Novo Agendamento</Button>
      </div>

      <Table
        dataSource={filteredData}
        columns={Columns({
          addAtendimento,
          onRemove: handleRemoveAgendamento,
          openNotification,
          showActions: view === 'agendamentos',
        })}
        rowKey="id"
        pagination={{ pageSize: 8 }}
      />

      <ModalCreateAgendamento convenios={convenios} medicos={medicos} especialidades={especialidades} visible={isOpenModal} onSubmit={handleSubmit} onClose={() => setIsOpenModal(false)} />
    </div>
  )
}

export default ScheduleListTable
