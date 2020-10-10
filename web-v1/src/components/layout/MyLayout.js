import React from 'react'
import { appInfo } from 'lib/constant'
import styled from 'styled-components'
import ErrorBoundary from 'components/global/ErrorBoundary'
import PageHeaderContainer from 'containers/auth/PageHeaderContainer'
import PageFooter from 'components/layout/PageFooter'

const Content = ({ children }) => {
  return <ContentSection>{children}</ContentSection>
}

function MyLayout({ children }) {
  return (
    <ErrorBoundary>
      <RootSection>
        <HiddenTitle>
          <strong>{appInfo.title}</strong>
        </HiddenTitle>
        <PageHeaderContainer />
        <Content children={children} />
        <PageFooter />
      </RootSection>
    </ErrorBoundary>
  )
}

const HiddenTitle = styled.h1`
  font-size: 0;
`

const RootSection = styled.section``
const ContentSection = styled.section``

export default MyLayout
