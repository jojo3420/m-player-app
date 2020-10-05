import React from 'react'
import PropTypes from 'prop-types'
import { Card, Col, Row } from 'antd'
const { Meta } = Card

PlayList.propTypes = {
  playList: PropTypes.array.isRequired,
}

function PlayList({ playList }) {
  if (Array.isArray(playList) && playList.length <= 0) {
    return <div>loading..</div>
  }

  // [ [1, 2, 3], [4, 5, 6], [7, 8, 9] ...]

  return (
    <div className="site-card-wrapper">
      {playList.map((list, index) => {
        return <PlayListRow key={index} list={list} />
      })}
    </div>
  )
}

function PlayListRow({ list }) {
  console.log({ list })
  return list.map((item) => {
    const { id, title, email, description, avatar } = item
    return (
      <Row>
        <Col key={id}>
          <Card
            span={8}
            hoverable
            style={{ width: 240 }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <Meta title={title} description={description} />
          </Card>
        </Col>
      </Row>
    )
  })
}

export default PlayList
