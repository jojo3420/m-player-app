import React, { useCallback, useEffect } from 'react';
import SignUpForm from 'components/auth/SignUpForm';
import { withRouter } from 'react-router-dom';
import { onSignUp, onCheckLogin } from 'modules/auth';
import useActions from 'lib/hooks/useActions';
import { useSelector } from 'react-redux';
import { message } from 'antd';

function SignUpFormContainer({ history }) {
  const { signUp, user, check } = useSelector(({ loading, auth }) => {
    return {
      signUp: auth.signUp,
      user: auth.user,
      check: auth.check,
      loading: loading['auth/SIGN_UP'],
    };
  });

  const [handleSignUp, handleCheckLogin] = useActions(
    [onSignUp, onCheckLogin],
    [],
  );

  const onSignUpSubmit = useCallback(
    async (user) => {
      console.log({ user });
      const { username, password, confirmPassword } = user;
      if (password !== confirmPassword) {
        return message.error('패스워드가 불일치 합니다.');
      }
      await handleSignUp({ username, password });
      await handleCheckLogin();
      message.success('회원가입 성공!');
    },
    [handleSignUp, handleCheckLogin, history],
  );
  useEffect(() => {
    if (signUp && signUp.status >= 400) {
      message.error(signUp.responseMessage || '회원 가입이 실패했습니다.');
    }
  }, [signUp]);

  // login check ok
  useEffect(() => {
    if (check.logged) {
      console.log('login check ok.');
    }
  }, [check]);

  useEffect(() => {
    if (user) {
      history.push(`/@${user.username}`);
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (e) {
        console.log('회원 가입 로컬 스토리지 저장 실패.' + e);
      }
    }
  }, [user]);

  return <SignUpForm onSubmit={onSignUpSubmit} />;
}

export default withRouter(SignUpFormContainer);
