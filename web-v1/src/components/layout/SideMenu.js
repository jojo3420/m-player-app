// import React, { useCallback } from 'react';
// import { Layout, Menu } from 'antd';
// import PropTypes from 'prop-types';
// import { withRouter } from 'react-router-dom';
// import {
//   UserOutlined,
//   LaptopOutlined,
//   NotificationOutlined,
// } from '@ant-design/icons';
// // import styles from './TestLayout.module.css';
// // import cn from 'classnames/bind';
//
// SideMenu.propTypes = {
//   list: PropTypes.array,
// };
//
// SideMenu.defaultProps = {
//   list: [],
// };
//
// const { Sider } = Layout;
// const { SubMenu } = Menu;
// // const cx = cn.bind(styles);
//
// function SideMenu({ list, history }) {
//   const gotoPage = useCallback(
//     ({ item, key, keyPath, domEvent }) => {
//       if (key === 'home') {
//         history.push('/');
//         return;
//       }
//       history.push(key);
//     },
//     [history],
//   );
//
//   return (
//     <Sider width={200} style={{ background: '#fff' }}>
//       <Menu
//         mode="inline"
//         defaultSelectedKeys={['1']}
//         defaultOpenKeys={['sub1']}
//         style={{ height: '100%', borderRight: 0 }}
//         onClick={gotoPage}
//       >
//         <SubMenu key="sub1" icon={<UserOutlined />} title="Write">
//           <Menu.Item key="write">작성하기</Menu.Item>
//           <Menu.Item key="2">option2</Menu.Item>
//           <Menu.Item key="3">option3</Menu.Item>
//           <Menu.Item key="4">option4</Menu.Item>
//         </SubMenu>
//         <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
//           <Menu.Item key="5">option5</Menu.Item>
//           <Menu.Item key="6">option6</Menu.Item>
//           <Menu.Item key="7">option7</Menu.Item>
//           <Menu.Item key="8">option8</Menu.Item>
//         </SubMenu>
//         <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
//           <Menu.Item key="9">option9</Menu.Item>
//           <Menu.Item key="10">option10</Menu.Item>
//           <Menu.Item key="11">option11</Menu.Item>
//           <Menu.Item key="12">option12</Menu.Item>
//         </SubMenu>
//       </Menu>
//     </Sider>
//   );
// }
//
// export default withRouter(SideMenu);
