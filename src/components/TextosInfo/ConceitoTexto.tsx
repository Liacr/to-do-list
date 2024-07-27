import React from 'react';
import style from './ConceitoTexto.module.scss';

const ConceitoTexto: React.FC = () => {
  return (
    <div className={style.conceitoTexto}>
      Organize seus dias com <br />
      facilidade: Tarefas Diárias e <br />
      Contínuas
    </div>
  );
};

export default ConceitoTexto;
