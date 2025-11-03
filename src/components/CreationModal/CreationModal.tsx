import React from "react";
import { Modal, Form, Input } from "antd";
import type { CreationModalProps } from "./CreationModal.types";


const CreationModal: React.FC<CreationModalProps> = ({
  open,
  title,
  onCancel,
  onSubmit,
  fields,
  confirmText = "Salvar",
  initialValues,
}) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
      form.resetFields();
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
