/**
 * api에서 받아온 데이터의 createdAt을 Date 객체로 변환합니다.
 * @param data
 * @returns
 */
export const convertDateObject = <T>(data: T): T => {
  const converted = JSON.parse(JSON.stringify(data), (k, v) => {
    if (k === 'createdAt' || k === 'updatedAt') {
      return new Date(v);
    }
    return v;
  });

  return converted;
};
