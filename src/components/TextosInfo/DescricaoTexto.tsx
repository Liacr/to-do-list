import React from 'react';
import style from './DescricaoTexto.module.scss';

const DescricaoTexto: React.FC = () => {
  return (
    <h2 className={style.descricaoTexto}>
      Gerencie suas tarefas diárias <br />
      instantaneamente ou renove-as para o dia <br />
      seguinte com facilidade, sem necessidade <br />
      de cadastro.
    </h2>
  );
};

export default DescricaoTexto;
