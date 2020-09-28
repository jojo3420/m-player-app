import React, { useCallback } from 'react';
import MyLayout from 'components/layout/MyLayout';
import { Button } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';

function PageNotFound({}) {
  const history = useHistory();
  const location = useLocation();
  const gotoHome = useCallback(() => {
    history.push('/');
  }, [history]);

  return (
    <MyLayout>
      <h2>Page Not Found</h2>
      <p>path: {location.pathname}</p>
      <Button onClick={gotoHome}>Home</Button>
    </MyLayout>
  );
}

export default PageNotFound;
