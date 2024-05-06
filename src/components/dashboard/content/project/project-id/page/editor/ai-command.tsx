import { Select } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { RichTextEditor, useRichTextEditorContext } from '@mantine/tiptap';
import { useState } from 'react';

import FormGenerationButton from '@/components/ui/form/form-generation-button';

import { useGenerateMessage } from '@/hooks/openai/use-ai-service';

import { PROMPTS } from '@/constants/openai/prompt';

const AI_OPTIONS = [
  {
    label: '문장 생성',
    value: 'sentence',
  },
  {
    label: '문단 생성',
    value: 'paragraph',
  },
  {
    label: '요약',
    value: 'summarize',
  },
];

const AICommand = () => {
  const [currentOption, setCurrentOption] = useState('sentence');

  const { editor } = useRichTextEditorContext();
  const { mutate, isPending } = useGenerateMessage({
    onSuccess: (response) => {
      editor?.commands.insertContent(response.data);

      notifications.show({
        title: 'AI 생성 성공',
        message: response.message,
      });
    },
    onError: (response) => {
      notifications.show({
        color: 'red',
        title: 'AI 생성 실패',
        message: response.message,
      });
    },
  });

  if (!editor) return null;

  const handler = () => {
    const { from, to } = editor.state.selection;
    const before = editor.state.doc.textBetween(0, from);
    const selected = editor.state.doc.textBetween(from, to);
    const after = editor.state.doc.textBetween(
      to,
      editor.state.doc.content.size,
    );

    if (currentOption === 'sentence') {
      const content = `${before}[[!here!]]${after}`;
      mutate({ content, prompt: PROMPTS.generateSentence });
    } else if (currentOption === 'paragraph') {
      const content = `${before}[[!here!]]${after}`;
      mutate({ content, prompt: PROMPTS.generateParagraph });
    } else if (currentOption === 'summarize') {
      mutate({ content: selected, prompt: PROMPTS.generateSummary });
    }
  };

  return (
    <>
      <RichTextEditor.Control>
        <Select
          size="xs"
          allowDeselect={false}
          data={AI_OPTIONS}
          value={currentOption}
          onChange={(option) => {
            setCurrentOption(option as string);
          }}
          classNames={{
            root: 'w-[160px] h-[26px]',
            wrapper: 'h-[26px] ',
            input: 'min-h-0 h-[26px] rounded-none border-y border-x-0',
          }}
        />
      </RichTextEditor.Control>

      <RichTextEditor.Control>
        <FormGenerationButton
          isPending={isPending}
          onClick={handler}
          component="div"
        />
      </RichTextEditor.Control>
    </>
  );
};

export default AICommand;
