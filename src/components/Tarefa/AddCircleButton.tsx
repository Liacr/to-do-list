import { useEffect, useRef, useState } from 'react';
import style from './AddCircleButton.module.scss';
import MenuOptions from './MenuOptions';

interface AddCircleButtonProps {
    limparTarefas: () => void;
    adicionarTarefa: (tarefa: string, data: string, hora: string) => void ;
}

const AddCircleButton: React.FC<AddCircleButtonProps> = ({ limparTarefas, adicionarTarefa }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLButtonElement | null>(null);

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
            <button ref={menuRef} className={style.container} onClick={toggleMenu}>
                <img src="/adicionar.svg" alt="Abrir menu" className={style.addIcon} />
            </button>

            {menuOpen && <MenuOptions limparTarefas={limparTarefas} adicionarTarefa={adicionarTarefa}/>}
        </>
    );
};

export default AddCircleButton;