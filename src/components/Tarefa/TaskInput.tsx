import React, { useState } from 'react';
import style from './TaskInput.module.scss';

interface TaskInputProps {
  adicionarTarefa: (tarefa: string, data: string, hora: string) => void;
  onClose: () => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ adicionarTarefa, onClose }) => {
  const [tarefa, setTarefa] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');

  const now = new Date();
  const minDate = now.toISOString().split('T')[0];
  const minTime = now.toTimeString().split(' ')[0].slice(0, 5);

  const handleAdd = () => {
    if (tarefa && data && hora) {
      adicionarTarefa(tarefa, data, hora);
      setTarefa('');
      setData('');
      setHora('');
      onClose();
    }
  };

  const handleClear = () => {
    setTarefa('');
    setData('');
    setHora('');
    onClose();
  };

  return (
    <div className={style.taskInputContainer}>
      <div className={style.dateTimeContainer}>
        <div className={style.dateButton}>
          <input
            type="date"
            value={data}
            min={minDate}
            onChange={(e) => setData(e.target.value)}
            aria-label="Selecionar Data"
          />
        </div>
        <div className={style.timeButton}>
          <input
            type="time"
            value={hora}
            min={minTime}
            onChange={(e) => setHora(e.target.value)}
            aria-label="Selecionar Hora"
          />
        </div>
      </div>
      <input
        type="text"
        className={style.inputText}
        value={tarefa}
        onChange={(e) => setTarefa(e.target.value)}
        placeholder="Nome da tarefa"
        maxLength={30}
      />
      <div className={style.buttonGroup}>
        <button className={style.addButton} onClick={handleAdd}>
          Adicionar
        </button>
        <button className={style.clearButton} onClick={handleClear}>
          <img src="/lixeira.svg" alt="Limpar" />
        </button>
      </div>
    </div>
  );
};

export default TaskInput;
