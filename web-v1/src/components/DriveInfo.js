import React from 'react'

function DriveInfo({ current }) {
  return (
    <>
      <label>저장소 용량: {current}GB</label>
      <meter min={1} max={100} low={10} high={90} optimum={50} value={20} />
    </>
  )
}

export default DriveInfo
