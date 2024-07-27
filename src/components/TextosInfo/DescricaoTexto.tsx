import React from 'react';
import style from './DescricaoTexto.module.scss';

const DescricaoTexto: React.FC = () => {
  return (
    <div className={style.descricaoTexto}>
      Gerencie suas tarefas diárias <br />
      instantaneamente ou renove-as para o dia <br />
      seguinte com facilidade, sem necessidade <br />
      de cadastro.
    </div>
  );
};

export default DescricaoTexto;
