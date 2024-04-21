'use client';

import { Text } from '@mantine/core';
import { RichTextEditor, useRichTextEditorContext } from '@mantine/tiptap';

import useExportPdf from '@/hooks/editor/use-export-pdf';
import useParseJson from '@/hooks/editor/use-parse-json';

const ExportPdfButton = () => {
  const { editor } = useRichTextEditorContext();
  const { parseJsonToComponent } = useParseJson();
  const { exportPdf } = useExportPdf();

  if (!editor) return null;

  const exportHandler = () => {
    const json = editor.getJSON();

    const components = parseJsonToComponent(json);

    exportPdf(components);
  };

  return (
    <RichTextEditor.Control>
      <Text className="text-xs" onClick={exportHandler}>
        .pdf
      </Text>
    </RichTextEditor.Control>
  );
};

export default ExportPdfButton;
