import React, { useEffect, useRef } from 'react'
import useTitle from 'lib/hooks/useTitle'
import AlbumContainer from 'containers/paly/AlbumContainer'

export default function AlbumPage(props) {
  useTitle('Playlist Detail')
  return <AlbumContainer />
}
