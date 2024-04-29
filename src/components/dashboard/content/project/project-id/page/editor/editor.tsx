'use client';

import { RichTextEditor } from '@mantine/tiptap';
import { JsonValue } from '@prisma/client/runtime/library';
import CharacterCount from '@tiptap/extension-character-count';
import FontFamily from '@tiptap/extension-font-family';
import Highlight from '@tiptap/extension-highlight';
import SubScript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { JSONContent, generateHTML, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import { FontSize } from '@/libs/tiptap/fontSize';

import AICommand from './ai-command';
import CharacterCounter from './character-counter';
import './editor.css';
import ExportPdfButton from './export-pdf-button';
import ExportTextButton from './export-text-button';
import FontFamillyInput from './font-familly-input';
import TextSizeInput from './text-size-input';

interface EditorProps {
  onTextChange: (text: string) => void;
  onChange: (content: object) => void;
  content?: JsonValue;
  title?: string;
  author?: string;
  subTitle: string;
}

const LIMIT = 2000;
const extensions = [
  StarterKit.configure({
    heading: false,
    code: false,
    codeBlock: false,
    paragraph: {
      HTMLAttributes: {
        style: 'line-height: normal',
      },
    },
    strike: {
      HTMLAttributes: {
        class: 'strike',
      },
    },
    blockquote: false,
  }),

  Underline,
  Superscript,
  SubScript,
  Highlight,
  TextAlign.configure({ types: ['paragraph'] }),
  TextStyle,
  FontFamily,
  FontSize,
  CharacterCount.configure({
    limit: LIMIT,
  }),
];

const Editor = ({
  onTextChange,
  onChange,
  content,
  title,
  author,
  subTitle,
}: EditorProps) => {
  const editor = useEditor({
    extensions,
    onCreate(props) {
      onChange(props.editor.getJSON());
      onTextChange(props.editor.getText());
    },
    onUpdate(props) {
      onChange(props.editor.getJSON());
      onTextChange(props.editor.getText());
    },
    editorProps: {
      // 복사한 텍스트를 붙여넣을 때 텍스트만 유지
      handlePaste(view, event) {
        const plainText = event.clipboardData?.getData('text/plain');
        view.dispatch(view.state.tr.insertText(plainText as string));

        return true;
      },
    },
    content: content ? generateHTML(content as JSONContent, extensions) : '',
  });

  return (
    <RichTextEditor editor={editor}>
      <RichTextEditor.Toolbar sticky stickyOffset={0}>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
          <RichTextEditor.Strikethrough />
          <RichTextEditor.ClearFormatting />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <TextSizeInput />
          <FontFamillyInput />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Hr />
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
          <RichTextEditor.Subscript />
          <RichTextEditor.Superscript />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.AlignLeft />
          <RichTextEditor.AlignCenter />
          <RichTextEditor.AlignJustify />
          <RichTextEditor.AlignRight />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Undo />
          <RichTextEditor.Redo />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <ExportTextButton />
          <ExportPdfButton title={title} subTitle={subTitle} author={author} />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <AICommand />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <CharacterCounter
            value={editor?.storage.characterCount.characters()}
            maxValue={LIMIT}
          />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor>
  );
};

export default Editor;
