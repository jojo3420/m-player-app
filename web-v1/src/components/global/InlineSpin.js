import React from 'react';
import { Space, Spin } from 'antd';

function InlineSpin({ tip, size }) {
  return (
    <Space>
      <Spin tip={tip || 'loading...'} size={size || 'middle'} />
    </Space>
  );
}

export default InlineSpin;
