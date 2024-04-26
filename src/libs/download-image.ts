/**
 * 해당 href 이미지를 다운로드합니다.
 * @param href
 * @param fileName
 */
export const downloadImage = (
  href: string,
  fileName: string = 'export.png',
) => {
  const link = document.createElement('a');
  link.download = fileName;
  link.href = href;
  link.click();
};
