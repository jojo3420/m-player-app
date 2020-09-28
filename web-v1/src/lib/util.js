import { round } from 'mathjs'

/**
 *  calculate audio duration for human time format
 * @param seconds
 * @return {{s: number, h: number, m: number}}
 */
export function calcAudioDuration(seconds, format) {
  let h = Math.floor(seconds / 3600)
  let m = Math.floor((seconds % 3600) / 60)
  let s = seconds % 60

  if (format === 'string') {
    return [h, m > 9 ? m : h ? '0' + m : m || '0', s > 9 ? s : '0' + s]
      .filter((a) => a)
      .join(':')
  }

  return { h, m, s: round(s, 1) }
}
