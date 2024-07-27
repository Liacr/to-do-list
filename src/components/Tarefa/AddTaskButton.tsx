import React, { useState } from 'react';
import style from './AddTaskButton.module.scss';
import TaskInput from './TaskInput';

const AddTaskButton: React.FC<{ adicionarTarefa: (tarefa: string, data: string, hora: string) => void }> = ({ adicionarTarefa }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <div className={style.container}>
      <button 
        className={style.addTaskButton} 
        onClick={() => setIsVisible(!isVisible)}
      >
        <img src="/adicionar.svg" alt="Adicionar Tarefa" className={style.icon} />
        <span className={style.text}>Adicionar Tarefa</span>
      </button>
      {isVisible && (
        <TaskInput adicionarTarefa={adicionarTarefa} onClose={handleClose} />
      )}
    </div>
  );
};

export default AddTaskButton;
