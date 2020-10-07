import React from 'react'
import PropTypes from 'prop-types'
import { Card, Col, Row } from 'antd'
import useTitle from 'lib/hooks/useTitle'
import StyledSpinner from 'components/global/StyledSpinner'
const { Meta } = Card

PlayList.propTypes = {
  playList: PropTypes.array.isRequired,
  gotoDetail: PropTypes.func,
}

function PlayList({ playList, loading, gotoDetail }) {
  useTitle('플레이리스트 목록')

  if (Array.isArray(playList) && playList.length === 0) {
    return <div>데이터가 없습니다.</div>
  }
  return (
    <>
      {loading && <StyledSpinner loading={loading} />}
      <div className="site-card-wrapper">
        {playList.map((innerList, index) => {
          return <PlayListRow key={index} innerList={innerList} />
        })}
      </div>
    </>
  )
}

function PlayListRow({ innerList }) {
  const Items =
    innerList &&
    innerList.map((item) => {
      const { id, title, email, description, avatar } = item

      return (
        <Col key={id} offset={0.5}>
          <Card
            onClick={() => alert(title)}
            span={8}
            hoverable
            style={{ width: 240 }}
            cover={<img alt={title} src={avatar} />}
          >
            <Meta title={title} description={description} />
          </Card>
        </Col>
      )
    })
  return (
    <Row justify="center" gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
      {Items}
    </Row>
  )
}

export default PlayList
