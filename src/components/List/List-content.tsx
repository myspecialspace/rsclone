// import InputContainer from '../input/Input-container';
import List from './List';
import styles from './List-content.module.scss';
// import {v4 as uuid} from 'uuid'; /c41850cd-41eb-4c3f-99e7-b6f464c95633
// import { ListInterface } from '../Interfaces/List-interface';
 // import { Card } from 'antd';

const dataTasks =  {
  "data": [
      {
          "id": 1,
          "attributes": {
              "name": "my example task",
              "list": {
                  "data": null
              },
              "members": {
                  "data": []
              },
              "comments": {
                  "data": []
              }
          }
      },
      {
        "id": 2,
        "attributes": {
            "name": "to do style",
            "list": {
                "data": null
            },
            "members": {
                "data": []
            },
            "comments": {
                "data": []
            }
        }
    },
    {
      "id": 3,
      "attributes": {
          "name": "to do logic",
          "list": {
              "data": null
          },
          "members": {
              "data": []
          },
          "comments": {
              "data": []
          }
      }
  },
  {
    "id": 4,
    "attributes": {
        "name": "create card create card create card create card create card create card create card create card",
        "list": {
            "data": null
        },
        "members": {
            "data": []
        },
        "comments": {
            "data": []
        }
    }
}
  ],
  "meta": {
      "pagination": {
          "page": 1,
          "pageSize": 10000,
          "pageCount": 1,
          "total": 1
      }
  }
}

const allTasks = dataTasks.data;

const dataLists =  {
    "data": [
        {
            "id": 1,
            "attributes": {
                "name": "my example list",
                "createdAt": "2023-02-09T19:05:24.057Z",
                "updatedAt": "2023-02-09T19:05:24.057Z",
                "publishedAt": "2023-02-09T19:05:24.055Z",
                "description": null,
                "order": null,
                "board": {
                    "data": null
                },
                allTasks
            }
        },
        {
            "id": 2,
            "attributes": {
                "name": "In process",
                "createdAt": "2023-02-13T13:16:46.590Z",
                "updatedAt": "2023-02-13T13:16:46.590Z",
                "publishedAt": "2023-02-13T13:16:46.574Z",
                "description": null,
                "order": null,
                "board": {
                    "data": {
                        "id": 2,
                        "attributes": {
                            "name": "test 123",
                            "createdAt": "2023-02-09T18:41:52.609Z",
                            "updatedAt": "2023-02-09T18:41:52.609Z",
                            "publishedAt": "2023-02-09T18:41:52.607Z",
                            "description": null,
                            "isFavorite": null,
                            "isClosed": null,
                            "backgroundColor": null,
                            "isPrivate": null
                        }
                    }
                },
                allTasks
            }
        }
    ],
    "meta": {
        "pagination": {
            "page": 1,
            "pageSize": 10000,
            "pageCount": 1,
            "total": 2
        }
    }
}

const allLists = dataLists.data;

/* interface ListContentProps {
  list: ListInterface;
  // listId: number,
} */


export default function ListContent(/*props: ListContentProps*/) {
  const addMoreTask = (name: string, id: number) => {
    console.log(name, id);
    const newTaskId = 7 //uuid;
    const newTask = {
      id: newTaskId,
      name,
    }
    // const list = allLists.lists/*[index]*/.[id]
    // list.tasks = [...list.tasks, newTask]
  } 

  console.log(addMoreTask('test', 2));

  return (
    <div className={styles.list__container}>
      {allLists.map((el, index) => {
        const list = allLists[index];
        return <List list={list} key={index + 1} />
        }
      )}
      
    </div>
  )
}


// <InputContainer type='list' ></InputContainer>
//listId={props.list.id}


