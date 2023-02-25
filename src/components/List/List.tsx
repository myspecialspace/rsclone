import { Card } from 'antd';
import { Title, UpdateData } from './Title';
import styles from './List.module.scss';
import Task from '../Task/Task';
import InputContainer from '../input/Input-container';
import { List as IList } from '../../types/list';
import { Task as ITask } from '../../types/task';
import { SubmitData } from '../input/Input-data';
import { OrderUpdateData } from './types';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { DropType, getDraggableId, getDroppableId } from '../../pages/Board/constants';

interface ListProps {
  list: IList;
  tasks: ITask[];
  onCreateTask: (data: SubmitData) => any;
  onUpdateList: (data: UpdateData) => any;
  onCurrentOrderUpdate: (data: OrderUpdateData) => any;
}

export default function List({ list, tasks, onCreateTask, onUpdateList }: ListProps) {

  const onSubmitUpdate = (data: UpdateData) => {
    if (onUpdateList !== undefined) {
      onUpdateList(data);
    }
  };

  const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? 'lightblue' : '#eff8ff',
    // display: 'flex',
    // padding: 8,
    overflow: 'auto',
  });

  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: `0 ${8 * 2}px`,
    // margin: `0 ${8}px 0 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : '#eff8ff',

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  return (
    <div>
      <Card className={styles.list}>
        <Title title={list.name} list={list} listId={list.id} onSubmitUpdate={onSubmitUpdate} />
        <Droppable droppableId={getDroppableId.list(list.id)} type={DropType.TASK}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {tasks.map((task, index) => {
                return (
                  <Draggable key={task.id} draggableId={getDraggableId.task(task.id)} index={index}>
                    {(provided2, snapshot2) => (
                      <div
                        ref={provided2.innerRef}
                        {...provided2.draggableProps}
                        {...provided2.dragHandleProps}
                        style={getItemStyle(
                          snapshot2.isDragging,
                          provided2.draggableProps.style
                        )}
                      >
                        <Task key={task.id} task={task} listId={list.id} />
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
              <InputContainer
                type='task'
                list={list}
                onCreateTask={onCreateTask}
              />
            </div>
          )}
        </Droppable>
      </Card>
    </div>
  )
}