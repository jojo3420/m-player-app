import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LoginForm from 'components/auth/LoginForm';
import useActions from 'lib/hooks/useActions';
import { onLogin, onCheckLogin } from 'modules/auth';
import { message } from 'antd';

function LoginFormContainer({ history }) {
  const { user, login } = useSelector(({ auth, loading }) => ({
    user: auth.user,
    login: auth.login,
    loading: loading['auth/LOGIN'],
  }));

  const [handleLogin, handleCheckLogin] = useActions(
    [onLogin, onCheckLogin],
    [],
  );

  const onLoginSubmit = useCallback(
    async (user) => {
      await handleLogin(user);
      await handleCheckLogin();
      message.success('로그인 성공.');
    },
    [handleLogin, handleCheckLogin],
  );
  // login error 처리
  useEffect(() => {
    if (login.status && login.status >= 400) {
      message.error(login.responseMessage || '로그인이 실패 했습니다.');
    }
  }, [login]);

  useEffect(() => {
    if (user) {
      history.push(`/@${user.username}`);
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (e) {
        console.log('user - 로컬스토리지 저장 실패 ' + e);
      }
    }
  }, [history, user]);

  return <LoginForm onSubmit={onLoginSubmit} />;
}

export default withRouter(LoginFormContainer);
