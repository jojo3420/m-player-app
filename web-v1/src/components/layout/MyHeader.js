// import React from 'react';
// import { Layout, Menu } from 'antd';
// import AppLogo from 'components/layout/AppLogo';
//
// const { Header } = Layout;
//
// function MyHeader({ menuList, logged, username, handleClick }) {
//   return (
//     <Header className="header">
//       <AppLogo />
//       <Menu
//         theme="dark"
//         mode="horizontal"
//         defaultSelectedKeys={[]}
//         onClick={handleClick}
//       >
//         {logged ? (
//           <Menu.Item key="logout" style={{ float: 'right' }}>
//             로그아웃
//           </Menu.Item>
//         ) : (
//           <Menu.Item key="signin" style={{ float: 'right' }}>
//             로그인
//           </Menu.Item>
//         )}
//         <Menu.Item key="username" style={{ float: 'right' }}>
//           {username}
//         </Menu.Item>
//         {Array.isArray(menuList) &&
//           menuList.map((menu, index) => (
//             <Menu.Item key={menu.id || index} style={{ float: 'right' }}>
//               {menu.title}
//             </Menu.Item>
//           ))}
//       </Menu>
//     </Header>
//   );
// }
//
// export default MyHeader;
