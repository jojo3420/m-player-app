import React, { useCallback } from 'react';
import MyHeader from 'components/layout/MyHeader';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import useActions from 'lib/hooks/useActions';
import { onLogout } from 'modules/auth';

function MyHeaderContainer({ history }) {
  const { logged, login, signUp } = useSelector(({ auth }) => {
    return {
      logged: auth.check.logged,
      login: auth.login,
      signUp: auth.signUp,
    };
  });
  const handleLogout = useActions(onLogout);

  const username =
    (login.auth && login.auth.username) ||
    (signUp.auth && signUp.auth.username) ||
    '';

  const handleClick = useCallback(
    async ({ key }) => {
      if (key === 'logout') {
        await handleLogout();
        history.push('/');
      } else {
        history.push(key);
      }
    },
    [history, handleLogout],
  );

  return (
    <MyHeader
      logged={logged}
      menuList={[
        { id: 1, title: 'test1' },
        { id: 2, title: 'test2' },
      ]}
      username={username}
      handleClick={handleClick}
    />
  );
}

export default withRouter(MyHeaderContainer);
