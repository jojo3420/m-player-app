import React from 'react'

function useNotification(title = 'default title', options = {}, callback) {
  if (!('Notification' in window)) {
    alert('이 브라우저는 알림을 지원하지 않습니다.')
    return
  }

  const askNotification = () => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then((permission) => {
        console.log('사용자 응답 결과: ', permission)
        // Notification.permission = permission;
        if (permission === 'granted') {
          notify(title, options, callback)
        }
      })
    } else {
      notify(title, options, callback)
    }
  }
  return askNotification
}

function notify(title, options, callback) {
  const notification = new Notification(title, options)
  if (callback && typeof callback === 'function') {
    callback(notification)
  }
}

export default useNotification
