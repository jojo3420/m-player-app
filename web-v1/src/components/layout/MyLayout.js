import React from 'react'
import { appName } from 'lib/constant'
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
      <RootSection className="root-section">
        <HiddenTitle>
          <strong>
            <strong>{appName.ko}</strong>
          </strong>
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
