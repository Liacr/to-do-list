import { useState } from "react";
import style from "./MenuOptions.module.scss";
import TaskInput from "./TaskInput";

interface MenuOptionsProps {
    limparTarefas: () => void;
    adicionarTarefa: (tarefa: string, data: string, hora: string) => void;
}

const MenuOptions: React.FC<MenuOptionsProps> = ({ limparTarefas, adicionarTarefa }) => {
    const [isVisible, setIsVisible] = useState(false);

    const handleClose = () => {
        setIsVisible(false);
    };
  
    function addTask() {
        console.log("asas")
        return <TaskInput adicionarTarefa={adicionarTarefa} onClose={handleClose} />
    }

    return (
        <ul className={style.menuList}>
            <li>
                <button onClick={addTask} className={style.textButton}>Adicionar tarefa</button>
            </li>

            <li>
                <button onClick={limparTarefas} className={style.textButton}>Limpar tarefas</button>
            </li>
        </ul>
    );
};

export default MenuOptions;