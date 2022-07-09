import { FaTimes } from 'react-icons/fa';

const Alert = ({ alert: { type, msg } }) => {
  return (
    <div className={`alert bg-opacity-0 text-white font-bold shadow-lg mb-4`}>
      <div>
        <FaTimes className='text-4xl text-red-600' />
        <span>{msg}</span>
      </div>
    </div>
  );
};

export default Alert;
