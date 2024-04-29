import { Button } from '@mantine/core';
import { RichTextEditor, useRichTextEditorContext } from '@mantine/tiptap';
import { IoDocumentTextOutline } from 'react-icons/io5';

import { textToFile } from '@/libs/text-to-file';

const ExportTextButton = () => {
  const { editor } = useRichTextEditorContext();

  if (!editor) return null;

  const exportHandler = () => {
    const text = editor.getText();
    textToFile(text);
  };

  return (
    <RichTextEditor.Control>
      <Button
        size="xs"
        component="div"
        variant="default"
        title="export as pdf"
        onClick={exportHandler}
        rightSection={<IoDocumentTextOutline />}
        classNames={{
          root: 'h-[26px] rounded-none border-x-0 font-normal',
        }}
      >
        텍스트로 내보내기
      </Button>
    </RichTextEditor.Control>
  );
};

export default ExportTextButton;
