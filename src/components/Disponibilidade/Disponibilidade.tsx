import { useState } from 'react'
import { Calendar, Button, Select, Spin, Empty, Card } from 'antd'
import { PlusOutlined, UserOutlined } from '@ant-design/icons'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { groupBy } from 'lodash'

import PageHeader from '../PageHeader/PageHeader'
import { useDisponibilidades } from '../../hooks/useDisponibilidades'
import { useEspecialidades } from '../../hooks/useEspecialidades'
import ModalDisponibilidades from '../ModalDisponibilidades/ModalDisponibilidades'
dayjs.locale('pt-br')



const Disponibilidade = () => {
  const [filtros, setFiltros] = useState({
    especialidade: undefined as string | undefined,
    medicoId: undefined as number | undefined,
  })
  const [dataSelecionada, setDataSelecionada] = useState(dayjs().locale('pt-br'))
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data: especialidades } = useEspecialidades()
  const { data: disponibilidades, isLoading } = useDisponibilidades()
  const disponibilidadesAgrupadas = groupBy(disponibilidades, 'data')


  const medicosDataSelecionados = disponibilidadesAgrupadas?.[dataSelecionada.format('YYYY-MM-DD')] ?? [];
  const medicosMock = medicosDataSelecionados ?? [];

  const medicosFiltrados = medicosMock.filter((m) => {
    if (filtros.especialidade && m.especialidade !== filtros.especialidade) return false;
    if (filtros.medicoId && m.id !== filtros.medicoId) return false;
    return true;
  });

  const dateCellRender = (value: Dayjs) => {
    const isSelected = value.isSame(dataSelecionada, 'day')
    return (
      <div
        className={`w-6 h-6 mx-auto rounded-full flex items-center justify-center text-xs
          ${isSelected ? 'bg-[#f97316] text-white' : ''}
        `}
      >
      </div>
    )
  }


  const calendarHeader = ({ value, onChange }: { value: Dayjs, onChange: (date: Dayjs) => void }) => {
    const month = value.locale("pt-br").format('MMMM YYYY');

    const handlePrev = () => onChange(value.clone().subtract(1, 'month'))
    const handleNext = () => onChange(value.clone().add(1, 'month'))

    return (
      <div className="flex items-center justify-between mb-2 px-2">
        <Button
          size="small"
          shape="circle"
          onClick={handlePrev}
          icon={<span className="text-gray-600">{'<'}</span>}
        />
        <h3 className="text-sm font-semibold text-gray-700 capitalize">
          {month}
        </h3>
        <Button
          size="small"
          shape="circle"
          onClick={handleNext}
          icon={<span className="text-gray-600">{'>'}</span>}
        />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Disponibilidade de Médicos"
        description="Selecione uma data no calendário para ver os horários disponíveis"
        action={
          <Button
            color="danger" variant="solid" icon={<PlusOutlined />}
            onClick={() => setIsModalOpen(true)}
          >
            Adicionar Disponibilidade
          </Button>
        }
      />

      <div className="flex gap-6">
        <Card className="w-[380px] bg-white rounded-xl p-4 shadow-sm mr-[16px] px-[24px] max-h-[400px]" >
          <Calendar
            validRange={[dayjs().startOf('day'), dayjs().startOf('day').add(3, 'month')]}
            fullscreen={false}
            onSelect={(value) => setDataSelecionada(value)}
            dateCellRender={dateCellRender}
            headerRender={calendarHeader}
          />
        </Card>

        <div className="flex-1 flex flex-col gap-[16px]">
          <div className="flex gap-[16px]">
            <Select
              placeholder="Todas as especialidades"
              className="min-w-[220px]"
              onChange={(value) =>
                setFiltros((f) => ({ ...f, especialidade: value }))
              }
              options={especialidades?.map((esp) => ({
                label: esp.nome,
                value: esp.nome,
              }))}
              allowClear
            />
            <Select
              placeholder="Todos os médicos"
              className="min-w-[220px]"
              onChange={(value) => setFiltros((f) => ({ ...f, medicoId: value }))}
              options={medicosFiltrados.map((m) => ({
                label: m.nome,
                value: m.id,
              }))}
              allowClear
            />
          </div>

          <h3 className="text-base font-medium text-gray-700">
            {dataSelecionada.locale('pt-br')
              .format('dddd, DD [de] MMMM [de] YYYY')}
          </h3>

          {isLoading ? (
            <Spin />
          ) : medicosFiltrados.length ? (
            medicosFiltrados.map((medico) => (
              <Card
                key={medico.id}
                className="bg-white rounded-xl shadow-sm p-4 flex flex-col gap-2 m-[4px]"
              >
                <div className="flex justify-between items-baseline">
                  <div className="flex items-baseline gap-[12px]">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex  text-orange-600">
                      <UserOutlined />
                    </div>
                    <div className='flex flex-col items-start'>
                      <p className="font-semibold text-gray-800">{medico.nome}</p>
                      <p className="text-sm text-gray-500">{medico.especialidade}</p>
                    </div>
                  </div>

                </div>

                <div className="mt-[8px] grid grid-cols-6 gap-[8px]">
                  {medico.horarios.map((hora, i) => (
                    <Button
                      disabled={!hora.disponivel}
                      key={i}
                      className="!rounded-lg"
                    >
                      {hora.hora}
                    </Button>
                  ))}
                </div>
              </Card>
            ))
          ) : (
            <Empty description="Nenhum médico encontrado para os filtros selecionados" />
          )}
        </div>
      </div>

      <ModalDisponibilidades
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onSave={() => {
          setIsModalOpen(false)
        }}
        especialidades={especialidades || []}
      />

    </div>
  )
}

export default Disponibilidade;