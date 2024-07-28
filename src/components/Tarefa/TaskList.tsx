import React, { useState, useCallback, useEffect } from 'react';
import TaskItem from './TaskItem';
import SearchBar from './SearchBar';
import style from './TaskList.module.scss';

interface Task {
  id: string;
  tarefa: string;
  data: string;
  hora: string;
  concluida: boolean;
  vencida: boolean;
}

interface TaskListProps {
  tarefas: Task[];
  concluirTarefa: (id: string) => void;
  excluirTarefa: (id: string) => void;
  editarTarefa: (id: string, novaTarefa: string, novaData: string, novaHora: string) => void;
  renovarTarefa: (id: string, novaData: string, novaHora: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tarefas,
  concluirTarefa,
  excluirTarefa,
  editarTarefa,
  renovarTarefa,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState('all');
  const [sortOption, setSortOption] = useState('recent');
  const [sortedTasks, setSortedTasks] = useState<Task[]>([]);

  const handleFilterAndSort = useCallback(
    (filter: string, sort: string) => {
      const filteredTasks = tarefas.filter(task => {
        switch (filter) {
          case 'expired':
            return task.vencida && !task.concluida;
          case 'completed':
            return task.concluida;
          case 'pending':
            return !task.vencida && !task.concluida;
          default:
            return true;
        }
      });

      const sortedTasks = [...filteredTasks].sort((a, b) => {
        const dateA = new Date(`${a.data}T${a.hora}`);
        const dateB = new Date(`${b.data}T${b.hora}`);

        switch (sort) {
          case 'recent':
            return dateB.getTime() - dateA.getTime();
          case 'oldest':
            return dateA.getTime() - dateB.getTime();
          default:
            return 0;
        }
      });

      setSortedTasks(sortedTasks);
    },
    [tarefas]
  );

  const updateTaskStates = useCallback(() => {
    const now = new Date();

    setSortedTasks(prevTasks => {
      return prevTasks.map(task => {
        const taskDateTime = new Date(`${task.data}T${task.hora}`);
        if (taskDateTime < now && !task.concluida) {
          return { ...task, vencida: true };
        } else if (taskDateTime >= now) {
          return { ...task, vencida: false };
        }
        return task;
      });
    });
  }, []);

  useEffect(() => {
    updateTaskStates();
  }, [updateTaskStates]);

  useEffect(() => {
    handleFilterAndSort(filterOption, sortOption);
  }, [filterOption, sortOption, handleFilterAndSort]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateTaskStates();
    }, 60000);
    return () => {
      clearInterval(intervalId);
    };
  }, [updateTaskStates]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilter = (filter: string) => {
    setFilterOption(filter);
  };

  const handleSort = (option: string) => {
    setSortOption(option);
  };

  const filteredAndSortedTasks = sortedTasks.filter(task =>
    task.tarefa.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className={style.taskListContainer}>
      <SearchBar
        searchTerm={searchTerm}
        onSearch={handleSearch}
        filterOption={filterOption}
        onFilter={handleFilter}
        sortOption={sortOption}
        onSort={handleSort}
      />
      <ul className={style.taskListItems}>
        {filteredAndSortedTasks.length === 0 ? (
          <h3 className={style.noTasks}>Nenhuma tarefa encontrada</h3>
        ) : (
          filteredAndSortedTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              concluirTarefa={concluirTarefa}
              excluirTarefa={excluirTarefa}
              editarTarefa={editarTarefa}
              renovarTarefa={renovarTarefa}
            />
          ))
        )}
      </ul>
    </section>
  );
}

export default TaskList;
