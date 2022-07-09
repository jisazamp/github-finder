import { createContext, useReducer } from 'react';
import alertReducer from './AlertReducer';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const initialState = { alert: {} };

  const [state, dispatch] = useReducer(alertReducer, initialState);

  const setAlert = (alert) => dispatch({ type: 'SET_ALERT', payload: alert });

  const dismissAlert = () => dispatch({ type: 'DISMISS_ALERT' });

  return (
    <AlertContext.Provider
      value={{ alert: state.alert, setAlert, dismissAlert }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
