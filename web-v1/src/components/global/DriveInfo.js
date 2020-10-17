import React from 'react'

function DriveInfo({
  current,
  min = 1,
  max = 100,
  low = 10,
  high = 80,
  optimum = 50,
  value,
}) {
  return (
    <>
      <label>저장소 용량: {current}GB</label>
      <meter
        min={min}
        max={max}
        low={low}
        high={high}
        optimum={optimum}
        value={value}
      />
    </>
  )
}

export default DriveInfo
