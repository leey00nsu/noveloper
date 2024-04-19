import { Text } from '@mantine/core';
import { RichTextEditor, useRichTextEditorContext } from '@mantine/tiptap';

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
      <Text className="text-xs" onClick={exportHandler}>
        .txt
      </Text>
    </RichTextEditor.Control>
  );
};

export default ExportTextButton;
