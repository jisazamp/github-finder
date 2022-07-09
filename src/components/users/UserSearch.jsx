import { useState, useContext } from 'react';
import GithubContext from '../../context/github/GithubContext';
import AlertContext from '../../context/alert/AlertContext';

import Alert from '../alert/Alert';

const UserSearch = () => {
  const [text, setText] = useState('');

  const { users, searchUser, clearUsers } = useContext(GithubContext);
  const { alert, setAlert, dismissAlert } = useContext(AlertContext);

  const handleChange = (e) => setText(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text === '') {
      setAlert({ type: 'error', msg: 'Please provide a valid username.' });

      setTimeout(() => {
        dismissAlert();
      }, 5000);
    } else {
      searchUser(text);

      setText('');
      dismissAlert();
    }
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 mb-8 gap-8'>
      <div>
        {Object.keys(alert).length > 0 && <Alert alert={alert} />}

        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            <div className='relative'>
              <input
                type='text'
                className='w-full pr-40 bg-gray-200 input input-lg text-black'
                placeholder='Search'
                value={text}
                onChange={handleChange}
              />

              <button
                type='submit'
                className='absolute top-0 right-0 rounded-l-none w-36 btn btn-lg'
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className='flex justify-center md:justify-start'>
        {users.length > 0 && (
          <button onClick={clearUsers} className='btn btn-ghost btn-lg '>
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default UserSearch;
