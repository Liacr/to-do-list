import React from 'react';
import style from './ClearTasksButton.module.scss';

interface ClearTasksButtonProps {
  limparTarefas: () => void;
}

const ClearTasksButton: React.FC<ClearTasksButtonProps> = ({ limparTarefas }) => {
  return (
    <div className={style.container}>
      <button 
        className={style.clearTasksButton} 
        onClick={limparTarefas}
      >
        <img src="/lixeira.svg" alt="Limpar Tarefas" className={style.clearTasksIcon} />
        <span className={style.clearTasksText}>Limpar Tarefas</span>
      </button>
    </div>
  );
};

export default ClearTasksButton;
