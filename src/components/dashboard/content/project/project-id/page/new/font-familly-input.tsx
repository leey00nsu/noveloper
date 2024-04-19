'use client';

import { Select } from '@mantine/core';
import { RichTextEditor, useRichTextEditorContext } from '@mantine/tiptap';
import { useEffect, useState } from 'react';

import { namumMyeongjo, pretendard } from '@/app/fonts';

const fontFamillies = [
  {
    label: 'Pretendard',
    value: pretendard.style.fontFamily.replaceAll("'", ''),
  },
  {
    label: '나눔 명조',
    value: namumMyeongjo.style.fontFamily.replaceAll("'", ''),
  },
];

const FontFamillyInput = () => {
  const [currentFont, setCurrentFont] = useState(
    pretendard.style.fontFamily.replaceAll("'", ''),
  );
  const { editor } = useRichTextEditorContext();

  const cursorFont = editor?.getAttributes('textStyle').fontFamily;

  useEffect(() => {
    if (!editor) return;

    if (!cursorFont) {
      editor?.commands.setFontFamily(
        pretendard.style.fontFamily.replaceAll("'", ''),
      );
    } else {
      setCurrentFont(cursorFont);
    }
  }, [editor, cursorFont]);

  return (
    <RichTextEditor.Control>
      <Select
        size="xs"
        allowDeselect={false}
        data={fontFamillies}
        value={currentFont}
        onChange={(font) => {
          editor?.commands.setFontFamily(font as string);
        }}
        classNames={{
          root: 'w-[160px] h-[26px]',
          wrapper: 'h-[26px] ',
          input: 'min-h-0 h-[26px] rounded-none border-y border-x-0',
        }}
      />
    </RichTextEditor.Control>
  );
};

export default FontFamillyInput;
