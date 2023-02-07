import React from 'react';
import { SignUpPageContentRu } from '../Constants/constant';
import { Link } from 'react-router-dom';
import styles from './Form.module.scss';

interface FormProps {
  className: string;
}

export default class FormSignUp extends React.Component {
  constructor(props: FormProps) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: Event) {
    this.setState({value: (event.target as HTMLInputElement).value});
  }

  render() {
    return (
      <div className={styles.login__content}>
        <h3 className={styles.login__title}>{SignUpPageContentRu.SIGN_UP_TITLE}</h3>
        <form className={styles.form}>
          <div className={styles.form__container}>
            <input className={styles.form__input} type="text" placeholder={SignUpPageContentRu.INPUT_EMAIL} name="E-mail" id="email" required />
          </div>
          <div className={styles.form__container}>
            <input className={styles.form__input} type="text" placeholder={SignUpPageContentRu.INPUT_PASSWORD} name="Password" id="password" required />
          </div>
          <input type="submit" value={SignUpPageContentRu.SIGN_UP} id="sign-in" className={styles.login__button} />                
        </form>
        <div className={styles.login__line_container}>
          <span className={styles.login__line}></span>
        </div>
        <div className={styles.question}>
          <span className={styles.question_has}>{SignUpPageContentRu.HAVE_ACCOUNT} </span>
          <Link to="/login" className={styles.register}>{SignUpPageContentRu.LOGIN}</Link>
        </div>
      </div>
    );
  }
}
