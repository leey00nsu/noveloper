'use client';

import { Select } from '@mantine/core';
import { RichTextEditor, useRichTextEditorContext } from '@mantine/tiptap';
import { useEffect, useState } from 'react';

const TextSizeInput = () => {
  const [currentSize, setCurrentSize] = useState('16px');
  const { editor } = useRichTextEditorContext();

  const teszSizes = Array.from({ length: 60 }).map(
    (_, index) => `${index + 1}px`,
  );

  const cursorSize = editor?.getAttributes('textStyle').fontSize;

  useEffect(() => {
    if (!editor) return;

    if (!cursorSize) {
      editor?.commands.setFontSize('16px');
    } else {
      setCurrentSize(cursorSize);
    }
  }, [editor, cursorSize]);

  return (
    <RichTextEditor.Control>
      <Select
        size="xs"
        allowDeselect={false}
        data={teszSizes}
        value={currentSize}
        onChange={(size) => {
          editor?.commands.setFontSize(size as string);
        }}
        classNames={{
          root: 'w-[80px] h-[26px]',
          wrapper: 'h-[26px] ',
          input: 'min-h-0 h-[26px] rounded-none border-y border-x-0',
        }}
      />
    </RichTextEditor.Control>
  );
};

export default TextSizeInput;
