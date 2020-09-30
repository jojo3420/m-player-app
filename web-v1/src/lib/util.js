// import { round } from 'mathjs'
// simplify
/**
 *  calculate audio duration for human time format
 * @param seconds
 * @return {{s: number, h: number, m: number}}
 */
export function calcAudioDuration(seconds, format) {
  let h = Math.floor(seconds / 3600)
  let m = Math.floor((seconds % 3600) / 60)
  let s = Math.ceil(seconds % 60)

  if (format === 'human') {
    return [h, m > 9 ? m : h ? '0' + m : m || '0', s > 9 ? s : '0' + s]
      .filter((a) => a)
      .join(':')
  }

  return { h, m, s }
}

// 마임타입으로 재생 가능한 여부인지 확인
// return:  String => 'probably'
export function canPlayBy(audio, mimeType) {
  return audio.canPlayType(mimeType)
}
