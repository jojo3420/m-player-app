import React from 'react';
import AuthForm from 'components/auth/AuthForm';
import AuthLayout from 'components/layout/AuthLayout';
import { Link } from 'react-router-dom';

function SignUpForm({ onSubmit }) {
  return (
    <AuthLayout
      breadcrumb={[
        { id: 1, label: 'Home' },
        { id: 2, label: '회원 가입' },
      ]}
      menuItems={[
        { id: 0, component: <Link to="/">home</Link> },
        { id: 1, component: <Link to="/login">로그인</Link> },
      ]}
    >
      <AuthForm
        type={'signUp'}
        title="회원 가입"
        buttonLabel="가입 하기"
        onSubmit={onSubmit}
      />
    </AuthLayout>
  );
}

export default SignUpForm;
