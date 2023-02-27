import './footer.scss';

interface FooterProps {
  className: string;
}

export default function Footer(props: FooterProps) {
  return (
    <div className={props.className}>
      <div className="wrapper footer__wrapper">
        <div className="footer__item">
          <a href="https://github.com/ElizabethT7" className="github-link"> </a>
          <a href="https://github.com/myspecialspace" className="github-link"> </a>
          <a href="https://github.com/OksanaZhuravel" className="github-link"> </a>
        </div>
        <div className="footer__item">&copy;2023</div>
        <div className="footer__item">
          <a href="https://rs.school/js/" className="RS-link"> </a>
        </div>
      </div>
    </div>
  )
}