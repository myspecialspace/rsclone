import { Card } from 'antd';
import Title from './Title';
import styles from './List.module.scss';
import Task from '../Task/Task';
import InputContainer from '../input/Input-container';

export default function List() {
  return (
    <div>
      <Card className={styles.list}>
        <Title></Title>
        <Task />
        <Task />
        <InputContainer />
      </Card>
    </div>
  )
}