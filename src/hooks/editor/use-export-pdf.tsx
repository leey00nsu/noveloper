import { Document, Font, Page, Text, usePDF } from '@react-pdf/renderer';
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

interface PDFDocumentProps {
  title?: string;
  author?: string;
  subTitle?: string;
  children?: (JSX.Element | null)[] | undefined;
}

const PDFDocument = ({
  title,
  author,
  subTitle,
  children,
}: PDFDocumentProps) => {
  return (
    <Document>
      <Page
        size="A4"
        style={{
          padding: 24,
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        <Text
          style={{
            fontFamily: 'Pretendard',
            fontSize: 20,
            marginBottom: 10,
            textAlign: 'center',
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            fontFamily: 'Pretendard',
            fontSize: 16,
            marginBottom: 10,
            textAlign: 'center',
          }}
        >
          {author}
        </Text>
        <Text
          style={{
            fontFamily: 'Pretendard',
            fontSize: 12,
            textAlign: 'center',
          }}
        >
          {subTitle}
        </Text>
      </Page>
      <Page
        size="A4"
        style={{
          padding: 24,
        }}
      >
        {children}
        <Text
          style={{
            fontFamily: 'Pretendard',
            position: 'absolute',
            fontSize: 12,
            bottom: 30,
            left: 0,
            right: 0,
            textAlign: 'center',
            color: 'grey',
          }}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber - 1} / ${totalPages - 1}`
          }
          fixed
        />
      </Page>
    </Document>
  );
};

interface UseExportPdfProps {
  title?: string;
  author?: string;
  subTitle?: string;
}

// pdf 컴포넌트를 pdf로 변환합니다.
const useExportPdf = ({ title, author, subTitle }: UseExportPdfProps) => {
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
    updateInstance(
      <PDFDocument title={title} subTitle={subTitle} author={author}>
        {components}
      </PDFDocument>,
    );
  };

  return {
    exportPdf,
    isExporting,
  };
};

export default useExportPdf;
