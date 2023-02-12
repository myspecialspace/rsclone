import './Boards.scss';
import images from '../../assets/img/icon_user.webp';
import { useState } from 'react';
const Boards = () => {
  const [isActive, setActive] = useState(false);
  const [isHide, setHide] = useState(false);

  const toggleClass = () => {
    setActive(!isActive);
  };
  const toggleHide = () => {
    setHide(!isHide);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    console.log(input);
  };
  return (
    <>
      <div className='boards-page'>
        {/* Import боковую панель  */}
        <div className='boards-page__wrapper'>
          <div className='boards'>
            <div className='boards__content'>
              <div className='boards__header header-boards'>
                <div className='header-boards__button'>
                  <div className='header-boards__name' onClick={toggleClass}>
                    Name boards
                  </div>
                  <input
                    // className='header-boards__input'
                    onChange={(
                      event: React.ChangeEvent<HTMLInputElement>
                    ): void => handleChange(event)}
                    type='text'
                    name='boardsName'
                    id='boardsName'
                    defaultValue='nameBoard'
                    maxLength={125}
                    className={
                      isActive
                        ? 'header-boards__input _active'
                        : 'header-boards__input'
                    }
                  />
                </div>
                <div className='header-boards__user user' onClick={toggleHide}>
                  <img src={images} alt='User' className='user__avatar' />
                  <span className={isHide ? 'user__name hide' : 'user__name'}>
                    user Name
                  </span>
                </div>
              </div>
              <div className='header-boards__body'></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Boards;
