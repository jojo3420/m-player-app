import React from 'react';
import { Breadcrumb, Layout, Menu } from 'antd';

const { Header, Footer, Content } = Layout;


function AuthLayout({ breadcrumb, menuItems, children }) {
  return (
    <Layout className="layout">
      <Header>
        <div className="logo"/>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[]}>
          {Array.isArray(menuItems) && menuItems.map(item => (
            <Menu.Item key={item.id}>{ item.component }</Menu.Item>
          ))}
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          {/*<Breadcrumb.Item>Home</Breadcrumb.Item>*/}
          {breadcrumb && breadcrumb.map(item => (
            <Breadcrumb.Item key={item.id}>{item.label}</Breadcrumb.Item>
          ))}

        </Breadcrumb>
        {children && children}
      </Content>
      <Footer/>
    </Layout>
  );
}

export default AuthLayout;
