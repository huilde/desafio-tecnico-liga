import React from "react";
import { Modal, Form, Input, notification } from "antd";
import type { CreationModalProps } from "./CreationModal.types";


const CreationModal: React.FC<CreationModalProps> = ({
  open,
  title,
  onCancel,
  onSubmit,
  fields,
  descriptionMessage = "Operação realizada com sucesso!",
  confirmText = "Salvar",
  initialValues,
}) => {
  const [form] = Form.useForm();

  const [api, contextHolder] = notification.useNotification();


  const openNotification = (message: string, description: string) => {
    api.success({
      message: message,
      description: description,
      placement: "topRight",
    });
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
      form.resetFields();
      openNotification("Sucesso", descriptionMessage);
    } catch (error) {
      console.log("Erro ao validar formulário:", error);
    }
  };

  return (
    <Modal
      open={open}
      title={title}
      okText={confirmText}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={handleOk}
    >
      {contextHolder}
      <Form form={form} layout="vertical" initialValues={initialValues}>
        {fields.map(({ name, label, placeholder, required }) => (
          <Form.Item
            key={name}
            name={name}
            label={label}
            rules={
              required
                ? [{ required: true, message: `Por favor, insira o(a) ${label.toLowerCase()}` }]
                : []
            }
          >
            <Input placeholder={placeholder} />
          </Form.Item>
        ))}
      </Form>
    </Modal>
  );
};

export default CreationModal;
