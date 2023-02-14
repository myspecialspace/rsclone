export default interface TaskInterface {
  id: number;
  attributes: {
    name: string;
    list: {
        data: null;
    };
    members: {
        data: never[];
    };
    comments: {
      data: never[];
    };
  };
}
