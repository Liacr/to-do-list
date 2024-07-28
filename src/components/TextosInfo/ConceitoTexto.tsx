import React from 'react';
import style from './ConceitoTexto.module.scss';

const ConceitoTexto: React.FC = () => {
  return (
    <h1 className={style.conceitoTexto}>
      Organize seus dias com <br />
      facilidade: Tarefas Diárias e <br />
      Contínuas
    </h1>
  );
};

export default ConceitoTexto;
