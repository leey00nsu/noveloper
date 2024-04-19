'use client';

import { RichTextEditor } from '@mantine/tiptap';
import { JsonValue } from '@prisma/client/runtime/library';
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

import FontFamillyInput from './font-familly-input';
import TextSizeInput from './text-size-input';

interface EditorProps {
  onChange: (content: object) => void;
  content?: JsonValue;
}

const Editor = ({ onChange, content }: EditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        code: false,
        codeBlock: false,
      }),
      Underline,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TextStyle,
      FontFamily,
      FontSize,
    ],
    onUpdate(props) {
      onChange(props.editor.getJSON());
    },
    content: content
      ? generateHTML(content as JSONContent, [
          StarterKit.configure({
            heading: false,
            code: false,
            codeBlock: false,
          }),
          Underline,
          Superscript,
          SubScript,
          Highlight,
          TextAlign.configure({ types: ['heading', 'paragraph'] }),
          TextStyle,
          FontFamily,
          FontSize,
        ])
      : '',
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
          <RichTextEditor.Blockquote />
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
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor>
  );
};

export default Editor;
