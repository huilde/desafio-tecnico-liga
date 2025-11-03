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
}

export const Columns = ({ addAtendimento, onRemove }: ColumnsProps): ColumnsType<Agendamento> => {
  return [
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
    {
      title: 'Ações',
      key: 'acoes',
      render: (_, record) => (
        <Space>
          {record.status === 'agendado' && (
            <Button
              size="small"
              type="primary"
              onClick={() => {
                addAtendimento.mutate({ ...record, status: 'atendido' })
                onRemove(record.id)
              }}
            >
              Atender
            </Button>
          )}
          {record.status === 'agendado' && (
            <Button
              size="small"
              danger
              onClick={() => {
                addAtendimento.mutate({ ...record, status: 'cancelado' })
                onRemove(record.id)
              }}
            >
              Cancelar
            </Button>
          )}
        </Space>
      ),
    },
  ]
}
