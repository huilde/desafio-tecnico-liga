
import type { TabsProps } from 'antd';
import { CalendarOutlined, FieldTimeOutlined } from '@ant-design/icons';
import Specialities from '../Specialties/Specialities';
import SpecialityIcon from "../../assets/specialityIcon.svg?react";
import ConvenioIcon from "../../assets/convenio.svg?react"
import HealthPlans from '../HealthPlans/HealthPlans';
import Agendamentos from '../agendamentos/Agendamentos';
import DisponibilidadePage from '../Disponibilidade/Disponibilidade';


export const TAB_ITEMS: TabsProps['items'] = [
  {
    key: '1',
    label: 'Agendamentos',
    children:
      <Agendamentos />,
    icon: <CalendarOutlined />
    ,
  },
  {
    key: '2',
    label: 'Especialidades',
    children: <Specialities />,
    icon: <SpecialityIcon />
  },
  {
    key: '3',
    label: 'Convênios',
    children: <HealthPlans />,
    icon: <ConvenioIcon />
  },
  {
    key: '4',
    label: 'Disponibilidade',
    children: <DisponibilidadePage />,
    icon: <FieldTimeOutlined />
  },
];