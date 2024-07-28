import { useEffect, useRef, useState } from 'react';
import style from './AddCircleButton.module.scss';
import TaskInput from './TaskInput';

interface AddCircleButtonProps {
    limparTarefas: () => void;
    adicionarTarefa: (tarefa: string, data: string, hora: string) => void ;
}

const AddCircleButton: React.FC<AddCircleButtonProps> = ({ limparTarefas, adicionarTarefa }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLUListElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    const handleClose = () => {
        setIsVisible(false);
    };

    function toggleMenu() {
        setMenuOpen(prevState => !prevState);
    }
    
    function handleLinkClick() {
        setMenuOpen(false);
        console.log(menuOpen);
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
          const buttonMenuId = 'menuButton';
          const target = (event.target as HTMLElement);
  
          if (
            menuRef.current &&
            !menuRef.current.contains(event.target as HTMLElement) &&
            !target.closest(`#${buttonMenuId}`)
          ) {
            setMenuOpen(false);
          }
        }
  
        function handleResize() {
          setMenuOpen(false);
        }
  
        if (menuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            window.addEventListener('resize', handleResize);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('resize', handleResize);
        }
  
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('resize', handleResize);
        }
    },  [menuOpen]);

    return (
        <>
            {!menuOpen && 
                (<button className={style.container} onClick={toggleMenu}>
                    <img src="/adicionar.svg" alt="Abrir menu" className={style.addIcon} />
                </button>)
            }

            {menuOpen && 
                (<ul ref={menuRef} className={style.menuList} onClick={handleLinkClick}>
                    <li onClick={() => setIsVisible(!isVisible)} className={style.textStyle}>
                        Adicionar tarefa
                    </li>

                    <li onClick={limparTarefas} className={style.textStyle}>
                        Limpar tarefas
                    </li>
                </ul>)
            }

            {isVisible && 
                (
                    <TaskInput adicionarTarefa={adicionarTarefa} onClose={handleClose} />
                )
            }
        </>
    );
};

export default AddCircleButton;
