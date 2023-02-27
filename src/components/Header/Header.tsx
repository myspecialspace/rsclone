import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import { mainPageContent } from '../Constants/constant';
import { Select } from 'antd';

interface HeaderProps {
  className: string;
}

export default function Header(props: HeaderProps) {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    localStorage.setItem('leng', value);
    //location.reload()
  };

  return (
    <div className={styles.buttons_container}>
      <div className={styles.len}>
        <Select
          defaultValue={mainPageContent.LEN_BUTTON}
          className={styles.len__select}
          onChange={handleChange}
          bordered={false}
          options={[
            { value: mainPageContent.LEN_BUTTON, label: mainPageContent.LEN_BUTTON },
            { value: mainPageContent.CHANGE_LEN, label: mainPageContent.CHANGE_LEN }
          ]}
        />
      </div>
          <Link to="/login" className={styles.link}>
            <div className={styles.login__button}>{mainPageContent.LOG_IN_BUTTON}</div>
          </Link>
    </div>
  )
}

          /*<form className={styles.len}>
            <select className={styles.len__select} onChange={() => handleChange}>
              <option className={styles.len__options} defaultValue="" hidden disabled>{mainPageContent.LEN_BUTTON}</option>
              <option className={styles.len__options} value={mainPageContent.LEN_BUTTON}>{mainPageContent.LEN_BUTTON}</option>
              <option className={styles.len__options} value={mainPageContent.CHANGE_LEN}>{mainPageContent.CHANGE_LEN}</option>
            </select>
          </form>*/
