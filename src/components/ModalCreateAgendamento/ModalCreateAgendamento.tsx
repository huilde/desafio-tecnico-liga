import React from "react"
import { Modal, Form, Input, Select, DatePicker, notification } from "antd"
import type { Agendamento } from "../../hooks/useAgendamentos"
import dayjs from 'dayjs'


const { Option } = Select

interface ModalCreateConsultaProps {
  visible: boolean
  onClose: () => void
  onSubmit: (data: Omit<Agendamento, "id" | "status">) => void
  especialidades?: { id: number; nome: string }[]
  convenios?: { id: number; nome: string }[]
  medicos?: { id: number; nome: string }[]
}

const horariosComuns = [
  "08:00", "08:30",
  "09:00", "09:30",
  "10:00", "10:30",
  "11:00", "11:30",
  "12:00", "12:30",
  "13:00", "13:30",
  "14:00", "14:30",
  "15:00", "15:30",
  "16:00", "16:30",
  "17:00", "17:30",
  "18:00"
]

const ModalCreateAgendamento: React.FC<ModalCreateConsultaProps> = ({
  visible,
  onClose,
  onSubmit,
  especialidades,
  convenios,
  medicos,
}) => {
  const [form] = Form.useForm()

  const [api, contextHolder] = notification.useNotification();


  const openNotification = (message: string, description: string) => {
    api.success({
      message: message,
      description: description,
      placement: "topRight",
    });
  };

  const handleOk = () => {
    form.validateFields()
      .then(values => {
        const dataFormatada = {
          ...values,
          data: values.data.format("YYYY-MM-DD"),
          status: 'agendado'
        }
        onSubmit(dataFormatada)
        form.resetFields()
        openNotification("Sucesso", "Agendamento criado com sucesso!");

      })
      .catch(info => {
        console.log("Erro no formulário:", info)
      })
  }

  return (
    <Modal
      title="Agendar Consulta"
      open={visible}
      onCancel={onClose}
      onOk={handleOk}
      okText="Salvar"
      cancelText="Cancelar"
    >
      {contextHolder}
      <Form form={form} layout="vertical">
        <Form.Item
          label="Nome do Paciente"
          name="paciente"
          rules={[{ required: true, message: "Digite o nome do paciente" }]}
        >
          <Input placeholder="Nome do paciente" />
        </Form.Item>

        <Form.Item
          label="Especialidade"
          name="especialidade"
          rules={[{ required: true, message: "Selecione uma especialidade" }]}
        >
          <Select placeholder="Selecione uma especialidade" >
            {especialidades?.map(especialidade => (
              <Option key={especialidade.id} value={especialidade.nome}>
                {especialidade.nome}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Convênio"
          name="convenio"
          rules={[{ required: true, message: "Selecione um convênio" }]}
        >
          <Select placeholder="Selecione um convênio">
            {convenios?.map(convenio => (
              <Option key={convenio.id} value={convenio.nome}>
                {convenio.nome}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Médico" name="medico"
          rules={[{ required: true, message: "Selecione um Médico" }]}
        >
          <Select placeholder="Selecione um médico" allowClear>
            {medicos?.map(medico => (
              <Option key={medico.id} value={medico.nome}>
                {medico.nome}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Data da Consulta"
          name="data"
          rules={[{ required: true, message: "Selecione uma data" }]}
        >
          <DatePicker minDate={dayjs().startOf('day')} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Horário"
          name="hora"
          rules={[{ required: true, message: "Selecione o horário" }]}
        >
          <Select placeholder="Selecione um horário">
            {horariosComuns.map(horario => (
              <Option key={horario} value={horario}>
                {horario}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ModalCreateAgendamento
