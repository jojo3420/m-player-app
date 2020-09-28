import React from 'react';
import MyLayout from 'components/layout/MyLayout';
import InlineSpin from 'components/global/InlineSpin';

function PageSpin({ tip, size }) {
  return (
    <MyLayout>
      <InlineSpin tip={tip} siz={size} />
    </MyLayout>
  );
}

export default PageSpin;
