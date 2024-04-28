import { Document, Font, Page, usePDF } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';

Font.register({
  family: 'NotoSerif',
  fonts: [
    {
      src: '/fonts/NotoSerif-Regular.ttf',
    },
    {
      src: '/fonts/NotoSerif-Bold.ttf',
      fontWeight: 'bold',
    },
  ],
});

Font.register({
  family: 'Pretendard',
  fonts: [
    {
      src: '/fonts/Pretendard-Regular.ttf',
    },
    {
      src: '/fonts/Pretendard-Bold.ttf',
      fontWeight: 'bold',
    },
  ],
});

const PDFDocument = ({ children }: any) => {
  return (
    <Document>
      <Page
        size="A4"
        style={{
          padding: 24,
        }}
      >
        {children}
      </Page>
    </Document>
  );
};

// pdf 컴포넌트를 pdf로 변환합니다.
const useExportPdf = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [instance, updateInstance] = usePDF({ document: <PDFDocument /> });

  useEffect(() => {
    if (!isExporting || instance.loading || !instance.blob) return;

    const url = URL.createObjectURL(instance.blob);
    const link = document.createElement('a');
    link.download = 'export.pdf';
    link.href = url;
    link.click();

    setIsExporting(false);
  }, [instance, isExporting]);

  const exportPdf = (components: (JSX.Element | null)[] | undefined) => {
    setIsExporting(true);
    updateInstance(<PDFDocument>{components}</PDFDocument>);
  };

  return {
    exportPdf,
  };
};

export default useExportPdf;
