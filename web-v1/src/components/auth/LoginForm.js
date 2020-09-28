import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from 'components/auth/AuthForm';
import AuthLayout from 'components/layout/AuthLayout';

function LoginForm({ onSubmit }) {
  return (
    <AuthLayout
      breadcrumb={[
        { id: 1, label: 'Home' },
        { id: 2, label: '로그인' },
      ]}
      menuItems={[
        { id: 0, component: <Link to="/">Home</Link> },
        { id: 1, component: <Link to="/signup">회원 가입</Link> },
      ]}
    >
      <AuthForm
        type="login"
        title="로그인"
        buttonLabel="로그인 하기"
        initialValues={{ username: '', password: '' }}
        onSubmit={onSubmit}
      />
    </AuthLayout>
  );
}

export default LoginForm;
