import React from 'react';
import style from './Footer.module.scss';

interface FooterProps {
  linkedinSvg: string;
}

const Footer: React.FC<FooterProps> = ({ linkedinSvg }) => {
  return (
    <footer className={style.footer}>
      <h2 className={style.title}>Projeto desenvolvido por:</h2>

      <section className={style.sectionFooter}>
        <article className={style.articleFooter}>
          <a href="https://www.linkedin.com/in/lianna-ribeiro-3366b9137/" className={style.linkedinLink} target='_blank'>
            <img src={linkedinSvg} alt="LinkedIn" className={style.linkedinIcon} />
          </a>

          <a href="https://www.linkedin.com/in/lianna-ribeiro-3366b9137/" className={style.footerTexto} target='_blank'>
            <h3>
              Lianna Ribeiro
            </h3>
          </a>
        </article>

        <article className={style.articleFooter}>
          <a href="https://www.linkedin.com/in/yuri-lima7/" className={style.linkedinLink} target='_blank'>
            <img src={linkedinSvg} alt="LinkedIn" className={style.linkedinIcon} />
          </a>

          <a href="https://www.linkedin.com/in/yuri-lima7/" className={style.footerTexto} target='_blank'>
            <h3 className={style.footerTexto}>
              Yuri Lima
            </h3>
          </a>
        </article>
      </section>
    </footer>
  );
};

export default Footer;
