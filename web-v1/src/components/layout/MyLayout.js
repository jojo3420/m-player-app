import React from 'react';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import SideMenu from 'components/layout/SideMenu';
// import MyFooter from 'components/layout/MyFooter';
import MyContent from 'components/layout/MyContent';
import MyBreadcrumb from 'components/layout/MyBreadcrumb';
import MyHeaderContainer from 'containers/layout/MyHeaderContainer';

function MyLayout({ children }) {
  return (
    <Layout>
      <MyHeaderContainer />
      <Layout>
        <SideMenu />
        <Layout style={{ padding: '0 24px 24px' }}>
          <MyBreadcrumb
            list={[
              { id: 1, title: 'Home' },
              { id: 2, title: 'List' },
            ]}
          />
          <MyContent children={children} />
          {/*<MyFooter />*/}
        </Layout>
      </Layout>
    </Layout>
  );
}

export default MyLayout;
