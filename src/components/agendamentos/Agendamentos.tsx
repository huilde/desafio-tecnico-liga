import { useAgendamentos } from "../../hooks/useAgendamentos";
import { useAtendimentos } from "../../hooks/useAtendimentos";
import ScheduleListTable from "../ScheduleListTable/ScheduleListTable";
import SchedulingMenu from "../schedulingMenu/schedulingMenu";

const Agendamentos = () => {

      const { data:agendamentos, isLoading, error } = useAgendamentos()
      const {data:atendimentos} = useAtendimentos()

      const data = {atendimentos:atendimentos, agendamentos:agendamentos}

    return (
        <div>
            <SchedulingMenu  data={data}/>
            <ScheduleListTable data={data}  isLoading={isLoading} error={error}/>
        </div>
    );
};

export default Agendamentos;