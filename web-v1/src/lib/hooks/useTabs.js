import React, { useState } from 'react'

/**
 * useTabs
 * 현재 선택된 인덱스의 배열의 데이터와 인덱스를 변경할 함수를 리턴으로 제공
 * 만든 이유는?
 *
 * @param initialIndex
 * @param list
 * @returns {{tab: 현재 인덱스의 배열의 아이템, setIndex: 인덱스 변경 함수 }}
 * @constructor
 */
export default function useTabs(initialIndex, list) {
  const [index, setIndex] = useState(initialIndex)

  if (!list || !Array.isArray(list)) {
    // return;
    throw new Error('list 가 비어 있습니다. ' + list.toString())
  }
  return {
    tab: list[index], // 현재 선택된 탭 리턴
    setIndex,
  }
}
