import React from 'react'

/**
 * 사용자가 버튼을 입력했을때 한번 더 확인 후 진행 하도록 도와 준다.
 * @param message
 * @param onPlay
 * @param onCancel
 * @returns {function(...[*]=)}
 */
function useConfirm(message = 'default message', onPlay, onCancel) {
  if (!onPlay || typeof onPlay !== 'function') {
    throw new Error('onPlay callback is not working..')
  }
  if (!onCancel || typeof onCancel !== 'function') {
    throw new Error('onCancel callback is not working..')
  }

  return () => {
    if (window.confirm(message)) {
      onPlay()
    } else {
      onCancel()
    }
  }
}

export default useConfirm
