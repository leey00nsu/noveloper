/**
 * date 객체를 받아서 ISO language code에 해당하는 날짜 형식으로 변환합니다.
 * @param date
 * @param country
 * @returns
 */
export const parseDate = (date: Date, lang: string = 'ko') => {
  const time = new Intl.DateTimeFormat(lang, {
    dateStyle: 'full',
    timeStyle: 'medium',
  }).format(date);

  return time;
};
