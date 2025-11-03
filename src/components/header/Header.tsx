import { Divider } from 'antd';
import logo from '../../assets/liga.png'

const Header = () => {
  return (
    <header className="z-50 bg-white shadow-md px-6 py-4 flex items-center justify-between padding-4 m-[20px]">
      <div className="text-2xl font-bold text-blue-600 flex items-center ">
        <div>
          <img src={logo} alt="logotipo liga contra o câncer" />
        </div>
        <Divider type="vertical" />
        <div className="flex items-center gap-[16px] flex-col">
          <h1 className='text-[#0A0A0A] text-[16px] leading-[24px] font-normal' >
            Sistema de agendamento
          </h1>
          <span className="text-gray-600 hover:text-blue-600 transition-colors">
            Gestão de Consultas Médicas
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
