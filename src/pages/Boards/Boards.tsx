import BoardsHeader from '../../components/BoardsHeader/BoardsHeader';

const Boards = () => {
  return (
    <>
      <div className='boards-page'>
        {/* Import боковую панель  */}
        <BoardsHeader />
        <div className='page__body'></div>
      </div>
    </>
  );
};
export default Boards;
