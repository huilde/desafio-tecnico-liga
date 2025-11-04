import { Card } from "antd"
import React from "react"

interface InfoCardProps {
  title: string
  value: number | string
  icon: React.ReactNode
  iconColor?: string
  bgColor?: string
}

const InfoCard: React.FC<InfoCardProps> = ({ title, value, icon, iconColor, bgColor }) => {
  return (
    <Card className="w-[19vw] min-w-[200px] p-[16px] shadow-md">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <p className="text-[#717182] text-[16px]">{title}</p>
          <h2>{value}</h2>
        </div>

        <div
          className="rounded-[10px] w-[48px] h-[48px] flex justify-center items-center shrink-0"
          style={{ backgroundColor: bgColor }}
        >
          <div style={{ color: iconColor, fontSize: 24 }}>{icon}</div>
        </div>
      </div>
    </Card>
  )
}

export default InfoCard
