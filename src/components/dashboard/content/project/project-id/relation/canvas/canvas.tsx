'use client';

import { useCallback } from 'react';
import ReactFlow, {
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  MiniMap,
  Node,
  addEdge,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

import SaveCanvasButton from './save-canvas-button';

interface CanvasProps {
  defaultNodes?: Node[];
  defaultEdges?: Edge[];
}

const Canvas = ({ defaultNodes, defaultEdges }: CanvasProps) => {
  const [nodes, , onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  if (!defaultNodes || !defaultEdges) {
    return null;
  }

  return (
    <div className="h-full w-full">
      <ReactFlow
        onInit={(reactFlowInstance) => {
          reactFlowInstance.addNodes(defaultNodes);
          reactFlowInstance.addEdges(defaultEdges);
        }}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        proOptions={{
          hideAttribution: true,
        }}
      >
        <Controls>
          <SaveCanvasButton />
        </Controls>
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default Canvas;
