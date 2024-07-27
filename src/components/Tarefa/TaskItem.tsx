import React from 'react';
import { format, parseISO, isValid } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import style from './TaskItem.module.scss';

interface TaskItemProps {
  task: {
    id: string;
    tarefa: string;
    data: string;
    hora: string;
    concluida: boolean;
    vencida: boolean;
  };
  concluirTarefa: (id: string) => void;
  excluirTarefa: (id: string) => void;
  editarTarefa: (id: string, novaTarefa: string, novaData: string, novaHora: string) => void;
  renovarTarefa: (id: string, novaData: string, novaHora: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  concluirTarefa,
  excluirTarefa,
  editarTarefa,
  renovarTarefa,
}) => {
  const [editMode, setEditMode] = React.useState(false);
  const [novaTarefa, setNovaTarefa] = React.useState(task.tarefa);
  const [novaData, setNovaData] = React.useState(task.data);
  const [novaHora, setNovaHora] = React.useState(task.hora);
  const [error, setError] = React.useState<string | null>(null);

  const formatDate = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      if (!isValid(date)) {
        throw new Error('Data inválida');
      }
      return format(date, "EEEE, dd 'de' MMMM", { locale: ptBR });
    } catch (error) {
      console.error('Erro ao formatar a data:', error);
      return 'Data inválida';
    }
  };

  const formatTime = (timeString: string) => {
    try {
      const [hours, minutes] = timeString.split(':').map(Number);
      if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
        throw new Error('Hora inválida');
      }
      return format(new Date(0, 0, 0, hours, minutes), 'HH:mm');
    } catch (error) {
      console.error('Erro ao formatar a hora:', error);
      return 'Hora inválida';
    }
  };

  const handleRenew = () => {
    if (novaData !== task.data || novaHora !== task.hora) {
      renovarTarefa(task.id, novaData, novaHora);
      setError(null);
      setEditMode(false);
    } else {
      setError('A data ou hora precisa ser alterada');
    }
  };

  const handleSave = () => {
    if (!novaTarefa.trim() || !novaData || !novaHora) {
      setError('Preencha todos os campos corretamente');
      return;
    }
    editarTarefa(task.id, novaTarefa, novaData, novaHora);
    setError(null);
    setEditMode(false);
  };

  const handleCheckboxChange = () => {
    if (!task.concluida && !task.vencida) {
      concluirTarefa(task.id);
    }
  };

  const now = new Date();
  const minDate = now.toISOString().split('T')[0];
  const minTime = now.toTimeString().slice(0, 5);

  return (
    <div className={`${style.taskItem} ${task.vencida ? style.vencida : ''}`}>
      <input
        type="checkbox"
        checked={task.concluida && !task.vencida}
        onChange={handleCheckboxChange}
        className={style.checkbox}
        disabled={task.concluida || task.vencida}
      />
      <div className={style.taskContent}>
        {editMode ? (
          <>
            <div className={style.editSection}>
              {!task.concluida && !task.vencida && (
                <input
                  type="text"
                  value={novaTarefa}
                  onChange={(e) => setNovaTarefa(e.target.value)}
                  className={style.editInput}
                  placeholder="Descrição da tarefa"
                  maxLength={30}
                />
              )}
              {(task.concluida || task.vencida) && (
                <span className={style.taskText}>{task.tarefa}</span>
              )}
            </div>
            <input
              type="date"
              value={novaData}
              onChange={(e) => setNovaData(e.target.value)}
              min={minDate}
              className={style.dateInput}
            />
            <input
              type="time"
              value={novaHora}
              onChange={(e) => setNovaHora(e.target.value)}
              min={minTime}
              className={style.timeInput}
            />
            <div className={style.editButtons}>
              {task.concluida || task.vencida ? (
                <>
                  <button onClick={handleRenew} className={style.renewButton}>
                    Renovar
                  </button>
                  <button onClick={() => setEditMode(false)} className={style.cancelButton}>
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <button onClick={handleSave} className={style.saveButton}>
                    Salvar
                  </button>
                  <button onClick={() => setEditMode(false)} className={style.cancelButton}>
                    Cancelar
                  </button>
                </>
              )}
            </div>
            {error && (
              <div className={style.error}>
                {error.split('\n').map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            <span className={style.date}>
              {task.concluida ? <del>{formatDate(task.data)}</del> : formatDate(task.data)}
            </span>
            <span className={style.time}>
              {task.concluida ? <del>{formatTime(task.hora)}</del> : formatTime(task.hora)}
            </span>
            <span className={`${style.taskText} ${task.concluida ? style.completed : ''}`}>
              {task.concluida ? <del>{task.tarefa}</del> : task.tarefa}
            </span>
            <div className={style.buttons}>
              {task.vencida || task.concluida ? (
                <>
                  <button onClick={() => setEditMode(true)} className={style.renewButton}>
                    Renovar
                  </button>
                  <button onClick={() => excluirTarefa(task.id)} className={style.deleteButton}>
                    Excluir
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => setEditMode(true)} className={style.editButton}>
                    Editar
                  </button>
                  <button onClick={() => excluirTarefa(task.id)} className={style.deleteButton}>
                    Excluir
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
