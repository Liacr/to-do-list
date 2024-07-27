import React from 'react';
import style from './Footer.module.scss';

interface FooterProps {
  linkedinSvg: string;
}

const Footer: React.FC<FooterProps> = ({ linkedinSvg }) => {
  return (
    <footer className={style.footer}>
      <a href="https://www.linkedin.com/in/lianna-ribeiro-3366b9137/" className={style.linkedinLink}>
        <img src={linkedinSvg} alt="LinkedIn" className={style.linkedinIcon} />
      </a>
      <p className={style.footerTexto}>Desenvolvido por Lianna Ribeiro</p>
    </footer>
  );
};

export default Footer;
