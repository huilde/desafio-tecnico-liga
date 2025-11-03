import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Button, Card } from "antd"
import React from "react"

interface DetailedCardProps {
  title: string
  value?: number | string
  icon: React.ReactNode
  iconColor?: string
  bgColor?: string
  description?: string
}

const DetailedCard: React.FC<DetailedCardProps> = ({
  title,
  value,
  icon,
  iconColor,
  bgColor,
  description,
}) => {
  return (
    <Card className="w-[30vw] min-w-[250px] p-[16px] shadow-sm gap-[8px] flex flex-col">
      <div className="flex justify-between items-center">
        <div className="flex flex-row items-center gap-[12px]">
          <div
            className="rounded-[10px] w-[36px] h-[36px] flex justify-center items-center shrink-0"
            style={{ backgroundColor: bgColor }}
          >
            <div style={{ color: iconColor, fontSize: 16, fill: iconColor }}>{icon}</div>
          </div>

          <div>
            <p>{title}</p>
            {value && <h5 >{value}</h5>}
          </div>
        </div>
        <div className="flex flex-row">
          <Button type="text" icon={<EditOutlined />} size="small" />
          <Button type="text" icon={<DeleteOutlined />} size="small" />

        </div>
      </div>

      {description && (
        <p className="mt-2 text-sm text-gray-600 mt-[30px]">{description}</p>
      )}
    </Card>
  )
}

export default DetailedCard
