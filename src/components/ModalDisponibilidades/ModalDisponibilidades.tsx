import { useState } from 'react'
import { Modal, Input, Select, DatePicker, TimePicker, Button, Space, Card, message, notification } from 'antd'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { useAddDisponibilidade } from '../../hooks/useDisponibilidades'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

dayjs.locale('pt-br')

interface DataDisponibilidade {
    id: string
    data: dayjs.Dayjs
    inicio: dayjs.Dayjs
    fim: dayjs.Dayjs
}

interface ModalMedicoProps {
    open: boolean
    onCancel: () => void
    onSave: () => void
    especialidades: { id: number; nome: string }[]
    initialData?: {
        nome: string
        especialidadeId: number
        datas: { data: string; inicio: string; fim: string }[]
    }
}

const ModalDisponibilidades = ({
    open,
    onCancel,
    especialidades,
    initialData,
    onSave
}: ModalMedicoProps) => {
    const [nome, setNome] = useState(initialData?.nome ?? '')
    const [especialidade, setEspecialidade] = useState("")
    const [datas, setDatas] = useState<DataDisponibilidade[]>(
        initialData?.datas.map((d, i) => ({
            id: `${i}`,
            data: dayjs(d.data),
            inicio: dayjs(d.inicio, 'HH:mm'),
            fim: dayjs(d.fim, 'HH:mm'),
        })) ?? []
    )

    const [api, contextHolder] = notification.useNotification();


    const openNotification = (message: string, description: string) => {
        api.success({
            message: message,
            description: description,
            placement: "topRight",
        });
    };

    const addDisponibilidade = useAddDisponibilidade()
    const gerarHorarios = (inicio: string, fim: string) => {
        const start = dayjs(inicio, 'HH:mm')
        const end = dayjs(fim, 'HH:mm')

        const horarios = []
        let atual = start

        while (atual.isBefore(end) || atual.isSame(end)) {
            horarios.push({
                hora: atual.format('HH:mm'),
                disponivel: true
            })
            atual = atual.add(30, 'minute')
        }

        return horarios
    }
    const handleAddData = () => {
        setDatas((prev) => [
            ...prev,
            {
                id: String(Date.now()),
                data: dayjs(),
                inicio: dayjs('08:00', 'HH:mm'),
                fim: dayjs('12:00', 'HH:mm'),
            },
        ])
    }

    const handleRemoveData = (id: string) => {
        setDatas((prev) => prev.filter((d) => d.id !== id))
    }

    const handleChangeData = (id: string, field: keyof DataDisponibilidade, value: dayjs.Dayjs) => {
        setDatas((prev) =>
            prev.map((d) => (d.id === id ? { ...d, [field]: value } : d))
        )
    }

    const handleSave = () => {
        if (!isFormValid()) {
            message.error('Preencha todos os campos corretamente antes de salvar.')
            return
        }

        datas.map((d) => {
            const horarios = gerarHorarios(d.inicio.format('HH:mm'), d.fim.format('HH:mm'))
            addDisponibilidade.mutate({
                id: Number(Date.now()),
                nome,
                especialidade: especialidade!,
                data: d.data.format('YYYY-MM-DD'),
                horarios: horarios,
                especialidadeId: 0
            })
        })
        onSave();
        setNome("");
        setEspecialidade("");
        setDatas([]);
        openNotification("Sucesso", "Disponibilidade(s) adicionada(s) com sucesso!");
    }

    const isFormValid = () => {
        if (!nome.trim() || !especialidade) return false
        if (datas.length === 0) return false

        return datas.every((d) => {
            if (!d.data || !d.inicio || !d.fim) return false
            return d.inicio.isBefore(d.fim)
        })
    }

    return (
        <Modal
            title={initialData ? 'Editar Médico' : 'Adicionar Disponibilidades do Médico'}
            open={open}
            onCancel={onCancel}
            footer={null}
            centered
            width="50vw"
        >
            {contextHolder}
            <div className="flex flex-col gap-4">
                <div className="flex gap-[12px]">
                    <div className="flex-1">
                        <p className="text-sm text-gray-600 mb-1">Nome do Médico</p>
                        <Input
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder="Ex: Dr. Carlos Silva"
                        />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm text-gray-600 mb-1">Especialidade</p>
                        <Select
                            value={especialidade}
                            onChange={(v) => setEspecialidade(v)}
                            className="w-full"
                            placeholder="Selecione"
                            options={especialidades.map(({ nome }) => ({
                                label: nome,
                                value: nome,
                            }))}
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between my-[16px]">
                    <p className="text-sm font-medium text-gray-700">
                        Datas de Disponibilidade
                    </p>
                    <Button
                        size="small"
                        icon={<PlusOutlined />}
                        onClick={handleAddData}
                        type="dashed"
                    >
                        Adicionar Data
                    </Button>
                </div>

                <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto">
                    {datas.map((d) => {
                        const invalidTime = d.inicio && d.fim && !d.inicio.isBefore(d.fim)

                        return (
                            <Card
                                key={d.id}
                                size="small"
                                className={`border rounded-lg ${invalidTime ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'
                                    }`}
                            >
                                <Space className="flex flex-wrap items-center justify-between w-full">
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm text-gray-600 w-[60px]">Data</p>
                                        <DatePicker
                                            value={d.data}
                                            onChange={(val) => handleChangeData(d.id, 'data', val!)}
                                            format="DD/MM/YYYY"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm text-gray-600 w-[50px]">Início</p>
                                        <TimePicker
                                            value={d.inicio}
                                            minuteStep={30}
                                            onChange={(val) => handleChangeData(d.id, 'inicio', val!)}
                                            format="HH:mm"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm text-gray-600 w-[30px]">Fim</p>
                                        <TimePicker
                                            value={d.fim}
                                            minuteStep={30}
                                            onChange={(val) => handleChangeData(d.id, 'fim', val!)}
                                            format="HH:mm"
                                        />
                                    </div>
                                    <Button
                                        danger
                                        type="text"
                                        icon={<DeleteOutlined />}
                                        onClick={() => handleRemoveData(d.id)}
                                    />
                                </Space>

                                {invalidTime && (
                                    <p className="text-xs text-red-500 mt-[2px]">
                                        O horário de início deve ser antes do horário de fim.
                                    </p>
                                )}
                            </Card>
                        )
                    })}
                </div>

                <div className="flex justify-end gap-[4px] mt-[16px]">
                    <Button onClick={onCancel}>Cancelar</Button>
                    <Button
                        type="primary"
                        onClick={handleSave}
                        disabled={!isFormValid()}
                    >
                        {initialData ? 'Salvar Alterações' : 'Adicionar Disponibilidades'}
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export default ModalDisponibilidades
