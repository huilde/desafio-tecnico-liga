import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Modal, Input, Select } from 'antd'

interface Especialidade {
  id: number
  nome: string
}

interface Medico {
  id: number
  nome: string
  especialidadeId: number
}

interface Disponibilidade {
  hora: string
  ocupado: boolean
}

const useEspecialidades = () => {
  return useQuery({
    queryKey: ['especialidades'],
    queryFn: async (): Promise<Especialidade[]> => {
      const res = await fetch('/api/especialidades')
      if (!res.ok) throw new Error('Erro ao buscar especialidades')
      return res.json()
    },
  })
}

const useDisponibilidades = (filtros: {
  especialidadeId?: number
  data?: string
  medicoId?: number
}) => {
  return useQuery({
    queryKey: ['disponibilidades', filtros],
    queryFn: async (): Promise<Disponibilidade[]> => {
      const res = await fetch('/api/disponibilidades', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filtros),
      })
      if (!res.ok) throw new Error('Erro ao buscar disponibilidades')
      return res.json()
    },
    enabled: !!filtros.especialidadeId && !!filtros.data,
  })
}

export default function DisponibilidadePage() {
  const [filtros, setFiltros] = useState({
    especialidadeId: undefined as number | undefined,
    medicoId: undefined as number | undefined,
    data: '',
  })

  const [modalAberto, setModalAberto] = useState(false)
  const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(null)
  const [form, setForm] = useState({
    paciente: '',
    convenio: '',
  })

  const { data: especialidades } = useEspecialidades()
  const { data: horarios, isLoading } = useDisponibilidades(filtros)

  const medicos: Medico[] = [
    { id: 1, nome: 'Dr. João Silva', especialidadeId: 1 },
    { id: 2, nome: 'Dra. Maria Souza', especialidadeId: 2 },
    { id: 3, nome: 'Dr. Carlos Dias', especialidadeId: 1 },
  ]

  const medicosFiltrados = filtros.especialidadeId
    ? medicos.filter((m) => m.especialidadeId === filtros.especialidadeId)
    : []


  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-2xl shadow-md">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        Disponibilidade de Horários
      </h1>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <Select
          placeholder="Selecione a especialidade"
          onChange={(value) =>
            setFiltros((f) => ({
              ...f,
              especialidadeId: value,
              medicoId: undefined,
            }))
          }
          options={especialidades?.map((esp) => ({
            label: esp.nome,
            value: esp.id,
          }))}
        />

        <Select
          placeholder="Selecione o médico"
          onChange={(value) => setFiltros((f) => ({ ...f, medicoId: value }))}
          disabled={!filtros.especialidadeId}
          options={medicosFiltrados.map((m) => ({
            label: m.nome,
            value: m.id,
          }))}
        />

        <input
          type="date"
          className="border p-2 rounded-lg"
          value={filtros.data}
          onChange={(e) => setFiltros((f) => ({ ...f, data: e.target.value }))}
        />
      </div>

      {isLoading ? (
        <p>Carregando horários...</p>
      ) : horarios?.length ? (
        <div className="grid grid-cols-4 gap-4">
          {horarios.map((h, i) => (
            <button
              key={i}
              disabled={h.ocupado}
              onClick={() => {
                setHorarioSelecionado(h.hora)
                setModalAberto(true)
              }}
              className={`p-3 rounded-xl font-medium transition ${h.ocupado
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-green-500 text-white hover:bg-green-600'
                }`}
            >
              {h.hora}
            </button>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Selecione filtros para ver os horários.</p>
      )}

      <Modal
        title="Agendar Consulta"
        open={modalAberto}
        onCancel={() => setModalAberto(false)}
        okText="Confirmar Agendamento"
        confirmLoading={false}
      >
        <div className="flex flex-col gap-3">
          <Input
            placeholder="Nome do paciente"
            value={form.paciente}
            onChange={(e) => setForm((f) => ({ ...f, paciente: e.target.value }))}
          />
          <Input
            placeholder="Convênio"
            value={form.convenio}
            onChange={(e) => setForm((f) => ({ ...f, convenio: e.target.value }))}
          />
          <p>
            <strong>Horário selecionado:</strong> {horarioSelecionado}
          </p>
        </div>
      </Modal>
    </div>
  )
}
