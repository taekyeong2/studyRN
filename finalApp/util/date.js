//날짜를 문자열(포맷)로 반환
export function getFormattedDate(date) {
  return date.toISOString().slice(0, 10);
}

//X일 전의 날짜
export function getDateMinusDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
