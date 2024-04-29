'use client';

import { Button } from '@mantine/core';
import { RichTextEditor, useRichTextEditorContext } from '@mantine/tiptap';
import { AiOutlineFilePdf } from 'react-icons/ai';

import useExportPdf from '@/hooks/editor/use-export-pdf';
import useParseJson from '@/hooks/editor/use-parse-json';

interface ExportPdfButtonProps {
  title?: string;
  author?: string;
  subTitle?: string;
}

const ExportPdfButton = ({ title, author, subTitle }: ExportPdfButtonProps) => {
  const { editor } = useRichTextEditorContext();
  const { parseJsonToComponent } = useParseJson();
  const { exportPdf, isExporting } = useExportPdf({
    title,
    author,
    subTitle,
  });

  if (!editor) return null;

  const exportHandler = () => {
    const json = editor.getJSON();

    const components = parseJsonToComponent(json);

    exportPdf(components);
  };

  return (
    <RichTextEditor.Control>
      <Button
        loading={isExporting}
        loaderProps={{
          color: 'blue',
        }}
        size="xs"
        component="div"
        variant="default"
        title="export as pdf"
        onClick={exportHandler}
        rightSection={<AiOutlineFilePdf />}
        classNames={{
          root: 'h-[26px] rounded-none border-x-0 font-normal',
        }}
      >
        pdf로 내보내기
      </Button>
    </RichTextEditor.Control>
  );
};

export default ExportPdfButton;
