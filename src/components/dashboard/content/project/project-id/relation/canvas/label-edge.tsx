import { Textarea } from '@mantine/core';
import { useCallback } from 'react';
import { FaTrash } from 'react-icons/fa';
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
  useReactFlow,
  useStore,
} from 'reactflow';

import { getEdgeParams } from '@/libs/react-flow/utils';

const LabelEdge = ({ id, source, target, markerEnd, data }: EdgeProps) => {
  const sourceNode = useStore(
    useCallback((store) => store.nodeInternals.get(source), [source]),
  );
  const targetNode = useStore(
    useCallback((store) => store.nodeInternals.get(target), [target]),
  );
  const { setEdges } = useReactFlow();

  if (!sourceNode || !targetNode) {
    return null;
  }

  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(
    sourceNode,
    targetNode,
  );

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX: sx,
    sourceY: sy,
    sourcePosition: sourcePos,
    targetPosition: targetPos,
    targetX: tx,
    targetY: ty,
  });

  const removeEdgeHandler = () => {
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
  };

  const changeLabelHandler = (value: string) => {
    setEdges((edges) =>
      edges.map((edge) => {
        if (edge.id === id) {
          return {
            ...edge,
            data: {
              ...edge.data,
              label: value,
            },
          };
        }

        return edge;
      }),
    );
  };

  return (
    <>
      <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} />
      <EdgeLabelRenderer>
        <Textarea
          autosize
          placeholder="관계를 입력하세요."
          defaultValue={data.label}
          onChange={(event) => changeLabelHandler(event.currentTarget.value)}
          size="xs"
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
          }}
          className="nodrag nopan "
          classNames={{
            wrapper: 'group',
            input: 'flex grow min-w-2',
          }}
          rightSectionPointerEvents="all"
          rightSection={
            <FaTrash
              onClick={removeEdgeHandler}
              className="hidden hover:cursor-pointer hover:text-red-600 group-hover:block"
            />
          }
        />
      </EdgeLabelRenderer>
    </>
  );
};

export default LabelEdge;
