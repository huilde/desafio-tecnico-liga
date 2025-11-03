import React from "react"

interface PageHeaderProps {
  title: string
  description?: string
  action?: React.ReactNode // Ex: <Button>Adicionar</Button>
  className?: string
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  action,
  className = "",
}) => {
  return (
    <div className={`w-full mb-4 flex items-center justify-between p-[16px] ${className}`}>
      <div>
        <h2 className="text-xl font-bold">{title}</h2>
        {description && (
          <p className="text-gray-600">{description}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}

export default PageHeader
