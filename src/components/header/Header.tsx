import { Divider } from 'antd';
import logo from '../../assets/liga.png'

const Header = () => {
  return (
    <header className="z-50 bg-white shadow-md px-6 py-4 flex items-center justify-between padding-4 m-[20px]">
      <div className="text-2xl font-bold text-blue-600 flex items-center ">
        <div>
          <img src={logo} alt="logotipo liga contra o câncer" />
        </div>
        <Divider type="vertical" className='h-[80px]' />
        <div className="flex flex-col">
          <p className='text-[#0A0A0A] text-[16px] leading-[24px] font-normal' >
            Sistema de agendamento
          </p>
          <span className="text-[#717182] font-sans text-[12px] font-normal leading-[16px]">
            Gestão de Consultas Médicas
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
