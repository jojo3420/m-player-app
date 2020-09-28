import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

function MyFooter({ title }) {
  return (
    <Footer style={{ textAlign: 'center' }}>
      Ant Design ©2018 Created by Ant UED {title && title}
    </Footer>
  );
}

export default MyFooter;
