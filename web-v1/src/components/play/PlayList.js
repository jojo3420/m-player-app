import React from 'react'
import PropTypes from 'prop-types'
import { Card, Col, Row } from 'antd'
const { Meta } = Card

PlayList.propTypes = {
  playList: PropTypes.array.isRequired,
  gotoDetail: PropTypes.func,
}

function PlayList({ playList, loading, gotoDetail }) {
  if (loading) return <div>loading...</div>

  if (Array.isArray(playList) && playList.length === 0) {
    return <div>데이터가 없습니다.</div>
  }
  console.log({ playList })
  // [ [1, 2, 3], [4, 5, 6], [7, 8, 9] ...]

  return (
    <div className="site-card-wrapper">
      {playList.map((innerList, index) => {
        return <PlayListRow key={index} innerList={innerList} />
      })}
    </div>
  )
}

function PlayListRow({ innerList }) {
  // console.log({ innerList })
  const Items =
    innerList &&
    innerList.map((item) => {
      const { id, title, email, description, avatar } = item
      return (
        <Col key={id}>
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
  return <Row>{Items}</Row>
}

export default PlayList
