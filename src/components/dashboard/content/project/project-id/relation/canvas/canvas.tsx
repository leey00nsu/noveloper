'use client';

import { ButtonGroup } from '@mantine/core';
import { useCallback, useEffect } from 'react';
import ReactFlow, {
  Background,
  BackgroundVariant,
  Connection,
  ConnectionMode,
  Controls,
  Edge,
  MiniMap,
  Node,
  Panel,
  addEdge,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

import ExportCanvasButton from './export-canvas-button';
import FloatNode from './float-node';
import LabelEdge from './label-edge';
import SaveCanvasButton from './save-canvas-button';

interface CanvasProps {
  defaultNodes?: Node[];
  defaultEdges?: Edge[];
}

// const NODES = [
//   {
//     id: '1',
//     position: { x: 0, y: 0 },
//     data: { label: 'Hello' },
//     type: 'floatNode',
//   },
//   {
//     id: '2',
//     position: { x: 100, y: 100 },
//     data: { label: 'World' },
//     type: 'floatNode',
//   },
// ];

// const EDGES = [
//   {
//     id: '1-2',
//     source: '1',
//     target: '2',
//     sourceHandle: 'c',
//     targetHandle: 'a',
//     data: {
//       label: 'it is a label',
//     },
//     type: 'labelEdge',
//   },
// ];

const nodeTypes = {
  floatNode: FloatNode,
};

const edgeTypes = {
  labelEdge: LabelEdge,
};

const Canvas = ({ defaultNodes, defaultEdges }: CanvasProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: 'labelEdge',
          },
          eds,
        ),
      ),
    [setEdges],
  );

  useEffect(() => {
    if (defaultNodes) {
      setNodes(defaultNodes);
    }
    if (defaultEdges) {
      setEdges(defaultEdges);
    }
  }, [setNodes, setEdges, defaultNodes, defaultEdges]);

  if (!defaultNodes || !defaultEdges) {
    return null;
  }

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        proOptions={{
          hideAttribution: true,
        }}
        defaultEdgeOptions={{
          type: 'labelEdge',
          data: {
            label: '',
          },
        }}
        connectionMode={ConnectionMode.Loose}
      >
        <Panel position="top-right">
          <ButtonGroup>
            <SaveCanvasButton />
            <ExportCanvasButton />
          </ButtonGroup>
        </Panel>
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default Canvas;
