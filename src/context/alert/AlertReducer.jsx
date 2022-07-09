const alertReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ALERT':
      return { ...state, alert: action.payload };

    case 'DISMISS_ALERT':
      return { ...state, alert: {} };

    default:
      return state;
  }
};

export default alertReducer;
