import type { ColumnsType } from 'antd/es/table'
import { type Agendamento } from '../../hooks/useAgendamentos'
import { Button, Space, Tag } from 'antd'

const statusColors: Record<Agendamento['status'], string> = {
  agendado: 'blue',
  cancelado: 'red',
  atendido: 'green',
}

interface ColumnsProps {
  addAtendimento: { mutate: (data: Agendamento) => void }
  onRemove: (id: number) => void
  showActions?: boolean
  openNotification: (message: string, description: string) => void
}

export const Columns = ({
  addAtendimento,
  onRemove,
  openNotification,
  showActions = true,
}: ColumnsProps): ColumnsType<Agendamento> => {



  const handleAction = (
    record: Agendamento,
    novoStatus: Agendamento['status']
  ) => {
    addAtendimento.mutate({ ...record, status: novoStatus })
    onRemove(record.id)

    const successMessage =
      novoStatus === 'atendido'
        ? 'Atendimento registrado com sucesso!'
        : 'Agendamento cancelado com sucesso!'

    openNotification("Sucesso", successMessage);
  }

  const baseColumns: ColumnsType<Agendamento> = [
    { title: 'Paciente', dataIndex: 'paciente', key: 'paciente' },
    { title: 'Especialidade', dataIndex: 'especialidade', key: 'especialidade' },
    { title: 'Médico', dataIndex: 'medico', key: 'medico' },
    { title: 'Convênio', dataIndex: 'convenio', key: 'convenio' },
    { title: 'Data', dataIndex: 'data', key: 'data' },
    { title: 'Hora', dataIndex: 'hora', key: 'hora' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: Agendamento['status']) => (
        <Tag color={statusColors[status]} className="capitalize">
          {status}
        </Tag>
      ),
    },
  ]

  if (showActions) {
    baseColumns.push({
      title: 'Ações',
      key: 'acoes',
      render: (_, record) =>
        record.status === 'agendado' ? (
          <Space align='center' justify='center'>
            <Button
              size="small"
              type="primary"
              onClick={() => handleAction(record, 'atendido')}
            >
              Atender
            </Button>
            <Button
              size="small"
              danger
              onClick={() => handleAction(record, 'cancelado')}
            >
              Cancelar
            </Button>
          </Space>
        ) : null,
    })
  }

  return baseColumns
}
