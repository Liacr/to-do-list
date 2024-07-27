import React, { useState, useEffect } from 'react';
import ConceitoTexto from '../components/TextosInfo/ConceitoTexto';
import DescricaoTexto from '../components/TextosInfo/DescricaoTexto';
import Footer from '../components/Footer/Footer';
import TaskList from '../components/Tarefa/TaskList';
import AddTaskButton from '../components/Tarefa/AddTaskButton';
import ClearTasksButton from '../components/Tarefa/ClearTasksButton';
import AddCircleButton from '../components/Tarefa/AddCircleButton';
import style from './App.module.scss';
import MenuOptions from '../components/Tarefa/MenuOptions';

// Atualizar a interface Task para incluir o campo 'vencida'
interface Task {
  id: string;
  tarefa: string;
  data: string;
  hora: string;
  concluida: boolean;
  vencida: boolean; // Adiciona o campo vencida
}

const App: React.FC = () => {
  const [tarefas, setTarefas] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem('tarefas');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }, [tarefas]);

  useEffect(() => {
    const updateTaskStates = () => {
      const now = new Date();
      setTarefas((prevTarefas) =>
        prevTarefas.map((task) => {
          const taskDate = new Date(`${task.data}T${task.hora}`);
          if (!task.concluida && taskDate < now) {
            return { ...task, vencida: true }; // Atualizar o campo vencida
          }
          return { ...task, vencida: false };
        })
      );
    };

    // Atualizar o estado das tarefas a cada 60 segundos
    const intervalId = setInterval(updateTaskStates, 60000);
    updateTaskStates(); // Atualiza imediatamente ao montar

    return () => clearInterval(intervalId); // Limpa o intervalo ao desmontar
  }, []);

  const adicionarTarefa = (tarefa: string, data: string, hora: string) => {
    const novaTarefa: Task = {
      id: new Date().toISOString(),
      tarefa,
      data,
      hora,
      concluida: false,
      vencida: false // Inicialmente não vencida
    };
    setTarefas((prevTarefas) => [...prevTarefas, novaTarefa]);
  };

  const concluirTarefa = (id: string) => {
    setTarefas((prevTarefas) =>
      prevTarefas.map((t) => (t.id === id ? { ...t, concluida: !t.concluida } : t))
    );
  };

  const excluirTarefa = (id: string) => {
    setTarefas((prevTarefas) => prevTarefas.filter((t) => t.id !== id));
  };

  const editarTarefa = (id: string, novaTarefa: string, novaData: string, novaHora: string) => {
    setTarefas((prevTarefas) =>
      prevTarefas.map((t) => (t.id === id ? { ...t, tarefa: novaTarefa, data: novaData, hora: novaHora } : t))
    );
  };

  const renovarTarefa = (id: string, novaData: string, novaHora: string) => {
    setTarefas((prevTarefas) =>
      prevTarefas.map((t) => (t.id === id ? { ...t, concluida: false, vencida: false, data: novaData, hora: novaHora } : t))
    );
  };

  const limparTarefas = () => {
    setTarefas([]); // Limpa o estado de tarefas
    localStorage.removeItem('tarefas'); // Remove as tarefas do localStorage
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  // Defina os caminhos das imagens SVG com base no tema
  const backgroundSvg = theme === 'light' ? '/backrelogio.svg' : '/backrelogio-dark.svg';
  const logoSvg = theme === 'light' ? '/logotodolist.svg' : '/logotodolist-dark.svg';
  const linkedinSvg = theme === 'light' ? '/linkedin.svg' : '/linkedin-dark.svg';

  return (
    <div className={style.background}>
      <div className={style.background__circle}></div>
      <img src={backgroundSvg} alt="Background Relogio" className={style.background__svg} />
      <img src={logoSvg} alt="Logo" className={style.logo} />
      <img src="/tarefas.svg" alt="Tarefas" className={style.tarefas} />

      <div className={style.textos}>
        <ConceitoTexto />
        <div className={style.linhaSeparadora}></div>
        <DescricaoTexto />
      </div>

      {/* <div className={style.taskContainer}> */}
        <TaskList
          tarefas={tarefas}
          concluirTarefa={concluirTarefa}
          excluirTarefa={excluirTarefa}
          editarTarefa={editarTarefa}
          renovarTarefa={renovarTarefa}
        />
      {/* </div> */}
      
      <AddTaskButton adicionarTarefa={adicionarTarefa} />
      <AddCircleButton limparTarefas={limparTarefas} adicionarTarefa={adicionarTarefa} />
      <ClearTasksButton limparTarefas={limparTarefas} />

      <Footer linkedinSvg={linkedinSvg} />

      <div className={style.themeToggleSlider}>
        <input 
          type="checkbox" 
          id="themeToggle" 
          checked={theme === 'dark'} 
          onChange={toggleTheme} 
        />
        <label htmlFor="themeToggle" className={style.slider}></label>
      </div>
    </div>
  );
};

export default App;
