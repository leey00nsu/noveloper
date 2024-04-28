import { Text, View } from '@react-pdf/renderer';
import { Style } from '@react-pdf/types';
import { JSONContent } from '@tiptap/react';

interface Mark {
  [key: string]: any;
  type: string;
  attrs?: Record<string, any>;
}

// 에디터의 JSON을 react-pdf 컴포넌트로 변환합니다.
const useParseJson = () => {
  const getFontFamily = (fontFamily: string) => {
    if (fontFamily.includes('pretendard')) return 'Pretendard';
    if (fontFamily.includes('Noto_Serif_KR')) return 'NotoSerif';
    return 'Pretendard';
  };

  // 텍스트 스타일
  const getStyle = (marks: Mark[]) => {
    const style: Style = {};

    marks?.forEach((mark) => {
      switch (mark.type) {
        case 'textStyle':
          style.fontFamily = mark.attrs?.fontFamily
            ? getFontFamily(mark.attrs?.fontFamily)
            : 'Pretendard';
          style.fontSize = mark.attrs?.fontSize
            ? parseInt(mark.attrs?.fontSize, 10)
            : 16;
          break;
        case 'italic':
          style.fontStyle = 'italic';
          break;
        case 'underline':
          style.textDecoration = 'underline';
          break;
        case 'strike':
          style.textDecoration = 'line-through';
          break;
        case 'bold':
          style.fontWeight = 'bold';
          break;
        case 'subscript':
          style.verticalAlign = 'sub';
          break;
        case 'superscript':
          style.verticalAlign = 'super';
          break;
        default:
          break;
      }
    });

    return style;
  };

  // 공백
  const Space = () => <View style={{ marginVertical: 10 }} />;

  // 텍스트
  const Paragraph = ({ attrs, content }: JSONContent) => {
    return (
      <Text style={{ textAlign: attrs?.textAlign }}>
        {content?.map((item, idx) => {
          return (
            <Text
              key={`${item.type}-${idx}`}
              style={item.marks ? getStyle(item.marks) : undefined}
            >
              {item.text}
            </Text>
          );
        })}
      </Text>
    );
  };

  // li
  const ListItem = ({ content }: JSONContent) => {
    return (
      <Text>
        {content?.map((item, idx) => (
          <Paragraph key={`${item.type}-${idx}`} content={item.content} />
        ))}
      </Text>
    );
  };

  // ol
  const OrderedList = ({ content }: JSONContent) => {
    return (
      <View style={{ marginLeft: 10 }}>
        {content?.map((item, idx) => (
          <ListItem key={`${item.type}-${idx}`} content={item.content} />
        ))}
      </View>
    );
  };

  // ul
  const BulletList = ({ content }: JSONContent) => {
    return (
      <View style={{ marginLeft: 20 }}>
        {content?.map((item, idx) => (
          <ListItem key={`${item.type}-${idx}`} content={item.content} />
        ))}
      </View>
    );
  };

  // hr
  const HorizontalRule = () => (
    <View style={{ borderBottom: 1, marginVertical: 10 }} />
  );

  // 에디터의 JSON을 pdf 컴포넌트로 변환
  const parseJsonToComponent = (json: JSONContent) => {
    const components = json.content?.map((item, index) => {
      switch (item.type) {
        case 'paragraph':
          if (!item.content) return <Space key={`${item.type}-${index}`} />;
          return (
            <Paragraph key={`${item.type}-${index}`} content={item.content} />
          );
        case 'orderedList':
          return (
            <OrderedList key={`${item.type}-${index}`} content={item.content} />
          );
        case 'bulletList':
          return (
            <BulletList key={`${item.type}-${index}`} content={item.content} />
          );
        case 'listItem':
          return (
            <ListItem key={`${item.type}-${index}`} content={item.content} />
          );
        case 'horizontalRule':
          return <HorizontalRule key={`${item.type}-${index}`} />;
        default:
          return null;
      }
    });
    return components;
  };

  return { parseJsonToComponent };
};

export default useParseJson;
