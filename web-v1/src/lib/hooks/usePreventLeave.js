import React from 'react'

/**
 * window 의 beforeunload 이벤트를 등록/해제 하는 hook
 * 사용자가 중요한 작업 진행중에 새로고침 하거나 다른 곳으로 이동하는 걸 붙잡아 두려는 안내를 팝업 한다.
 *
 * @returns {{enablePrevent: (function(): void), disablePrevent: (function(): void)}}
 */
function usePreventLeave() {
  const listener = (event) => {
    event.preventDefault()
    event.returnValue = 'something'
  }
  const enablePrevent = () => window.addEventListener('beforeunload', listener)
  const disablePrevent = () =>
    window.removeEventListener('beforeunload', listener)
  return {
    enablePrevent,
    disablePrevent,
  }
}

export default usePreventLeave
