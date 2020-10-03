import React from 'react'
// import SideMenu from 'components/layout/SideMenu'
// import MyFooter from 'components/layout/MyFooter';
// import MyContent from 'components/layout/MyContent'
// import MyBreadcrumb from 'components/layout/MyBreadcrumb'
// import MyHeaderContainer from 'containers/layout/MyHeaderContainer'
import { appInfo } from 'lib/constant'
import styled from 'styled-components'
import ErrorBoundary from 'components/global/ErrorBoundary'

function MyLayout({ children }) {
  return (
    <ErrorBoundary>
      <main>
        <header>header</header>
        <section>
          <HiddenTitle>
            <strong>{appInfo.title}</strong>
          </HiddenTitle>
          {children}
        </section>
        <footer>footer</footer>
      </main>
    </ErrorBoundary>
  )
}

const HiddenTitle = styled.h1`
  font-size: 0;
`

export default MyLayout
