import React, { useEffect, useRef } from 'react'
import useTitle from 'lib/hooks/useTitle'
import AlbumContainer from 'containers/paly/AlbumContainer'
import MyLayout from 'components/layout/MyLayout'

export default function AlbumPage() {
  useTitle('Playlist Detail')

  return (
    <MyLayout>
      <AlbumContainer />
    </MyLayout>
  )
}
