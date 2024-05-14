import { Blockquote } from '@mantine/core';
import type { MDXComponents } from 'mdx/types';
import { FaInfo } from 'react-icons/fa';

import FadeImage from './components/ui/image/fade-image';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    blockquote: (props) => (
      <Blockquote color="blue" icon={<FaInfo />}>
        {props.children}
      </Blockquote>
    ),
    img: (props) => <FadeImage {...props} />,
    ...components,
  };
}
