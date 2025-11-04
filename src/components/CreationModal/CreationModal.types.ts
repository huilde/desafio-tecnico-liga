export interface CreationModalField extends React.HTMLAttributes<HTMLElement> {
    name: string;
    label: string;
    placeholder?: string;
    required?: boolean;
}

export interface CreationModalProps {
    open: boolean;
    title: string;
    onCancel: () => void;
    onSubmit: (values: unknown) => void;
    fields: CreationModalField[];
    confirmText?: string;
    descriptionMessage?: string;
    initialValues?: Record<string, unknown>;
}