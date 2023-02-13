
import { Card } from 'antd';
import { Typography } from 'antd';
import Title from './Title';
import styles from './List.module.scss';

/*const List: React.FC = () => (
  <Card title="Card title" bordered={false} style={{ width: 300 }}>
    <p>Card content</p>
  </Card>
); 

export default List; */

export default function List() {
  return (
    <div>
      <Card className={styles.list}>
        <Title></Title>
      </Card>
    </div>
  )
}