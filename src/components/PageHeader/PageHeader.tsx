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
        <p className="text-[#0A0A0A] text-[24px] leading-[24px] font-normal mb-[4px]">{title}</p>
        {description && (
          <p className="text-[#717182] font-sans text-[12px] font-normal leading-[16px]">{description}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}

export default PageHeader
