import { createContext, useReducer } from 'react';
import { createRoutesFromChildren } from 'react-router-dom';
import githubReducer from './GithubReducer';

const GithubContext = createContext();

const GITHUB_URL = import.meta.env.VITE_GITHUB_URL;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  // Get search results
  const searchUser = async (text) => {
    setLoading();

    const params = new URLSearchParams({ q: text });

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`);

    const { items } = await response.json();

    dispatch({
      type: 'GET_USERS',
      payload: items,
    });
  };

  // Get a single user
  const getUser = async (login) => {
    setLoading();

    const response = await fetch(`${GITHUB_URL}/users/${login}`);

    if (response.status === 404) {
      window.location = '/notfound';
      return;
    }

    const data = await response.json();

    dispatch({
      type: 'GET_USER',
      payload: data,
    });
  };

  // Get user repos
  const getUserRepos = async (login) => {
    setLoading();

    const params = new URLSearchParams({
      sort: 'created',
      per_page: 10,
    });

    const response = await fetch(
      `${GITHUB_URL}/users/${login}/repos?${params}`
    );
    const data = await response.json();

    dispatch({ type: 'GET_USER_REPOS', payload: data });
  };

  const setLoading = () => dispatch({ type: 'SET_LOADING' });

  const clearUsers = () => dispatch({ type: 'CLEAR_USERS' });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUser,
        getUser,
        getUserRepos,
        clearUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
