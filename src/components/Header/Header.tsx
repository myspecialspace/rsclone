import { Button } from 'antd';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

interface HeaderProps {
  className: string;
}

export default function Header(props: HeaderProps) {
  return (

    <div className={classNames(props.className, styles.header)}>
      <Link to="/login">
        <Button type="link">Login</Button>
      </Link>

      <Link to="/registration">
        <Button type="link" >Registration</Button>
      </Link>
    </div>
  )
}