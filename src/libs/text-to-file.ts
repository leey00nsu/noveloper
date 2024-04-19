/**
 * text를 파일로 변환하여 다운로드합니다.
 * @param text
 * @param fileName
 */
export const textToFile = (text: string, fileName: string = 'export.txt') => {
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = fileName;
  link.href = url;
  link.click();
};
