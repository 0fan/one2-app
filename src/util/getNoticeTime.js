import moment from 'moment'

export default function getNoticeTime (time) {
  const nowY = Number.parseInt(moment().format('YYYY'))
  const timeY = Number.parseInt(moment(time).format('YYYY'))
  const nowM = Number.parseInt(moment().format('YYYYMM'))
  const timeM = Number.parseInt(moment(time).format('YYYYMM'))
  const nowD = Number.parseInt(moment().format('YYYYMMDD'))
  const timeD = Number.parseInt(moment(time).format('YYYYMMDD'))


  console.log('today' + moment())
  console.log('time' + moment(time))
  if (nowY !== timeY) {
    console.log('sameY')
    return moment(time).format('YYYY年MM月DD日 hh:mm')
  }

  if (nowY === timeY && (nowM !== timeM || nowD !== timeM)) {
    console.log('sameM')
    return moment(time).format('MM月DD日 hh:mm')
  }

  return moment(time).format('hh:mm')
}