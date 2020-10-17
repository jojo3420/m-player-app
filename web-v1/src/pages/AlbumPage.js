import React, { useEffect, useRef } from 'react'
import useTitle from 'lib/hooks/useTitle'
import AlbumContainer from 'containers/paly/AlbumContainer'
import MyLayout from 'components/layout/MyLayout'

export default function AlbumPage() {
  useTitle('상세 플레이리스트')

  return (
    <MyLayout>
      <AlbumContainer />
    </MyLayout>
  )
}
