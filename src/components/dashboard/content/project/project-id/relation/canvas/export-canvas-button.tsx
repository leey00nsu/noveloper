'use client';

import { toPng } from 'html-to-image';
import { TbPng } from 'react-icons/tb';
import {
  ControlButton,
  getRectOfNodes,
  getTransformForBounds,
  useReactFlow,
} from 'reactflow';

import { downloadImage } from '@/libs/download-image';

const imageWidth = 1024;
const imageHeight = 768;

const ExportCanvasButton = () => {
  const { getNodes } = useReactFlow();
  const nodesBounds = getRectOfNodes(getNodes());

  const downloadHandler = async () => {
    const transform = getTransformForBounds(
      nodesBounds,
      imageWidth,
      imageHeight,
      0,
      2,
      0.3, // paddind,
    );

    const canvas = document.querySelector(
      '.react-flow__viewport',
    ) as HTMLElement;

    const imageUrl = await toPng(canvas, {
      filter: (node) =>
        !(
          node?.classList?.contains('react-flow__minimap') ||
          node?.classList?.contains('react-flow__controls')
        ),
      backgroundColor: '#fff',
      width: imageWidth,
      height: imageHeight,
      style: {
        transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
      },
    });

    downloadImage(imageUrl);
  };

  return (
    <ControlButton title="save" onClick={downloadHandler}>
      <TbPng className="text-black" />
    </ControlButton>
  );
};

export default ExportCanvasButton;
