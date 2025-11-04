
import type { TabsProps } from 'antd';
import { CalendarOutlined, FieldTimeOutlined } from '@ant-design/icons';
import Especialidades from '../Especialidades/Especialidades';
import { Stethoscope } from "lucide-react";
import { Shield } from "lucide-react";
import Convenios from '../Convenios/Convenios';
import Agendamentos from '../agendamentos/Agendamentos';
import Disponibilidade from '../Disponibilidade/Disponibilidade';


export const TAB_ITEMS: TabsProps['items'] = [
  {
    key: '1',
    label: 'Agendamentos',
    children: <Agendamentos />,
    icon: <CalendarOutlined />
    ,
  },
  {
    key: '2',
    label: 'Especialidades',
    children: <Especialidades />,
    icon: <Stethoscope size={14} />
  },
  {
    key: '3',
    label: 'Convênios',
    children: <Convenios />,
    icon: <Shield size={14} />
  },
  {
    key: '4',
    label: 'Disponibilidade',
    children: <Disponibilidade />,
    icon: <FieldTimeOutlined />,
  },
];