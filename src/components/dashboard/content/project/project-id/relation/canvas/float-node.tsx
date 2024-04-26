import { Box } from '@mantine/core';
import { memo } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';

import tw from '@/libs/tw';

const FloatNode = memo(({ data, selected }: NodeProps) => {
  return (
    <Box
      className={tw(
        selected ? 'border-blue-600' : 'border-gray-600',
        'rounded border bg-white p-4',
      )}
    >
      {data.label}
      <Handle
        type="source"
        position={Position.Top}
        id="a"
        className={tw(selected ? 'visible' : 'invisible')}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="b"
        className={tw(selected ? 'visible' : 'invisible')}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="c"
        className={tw(selected ? 'visible' : 'invisible')}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="d"
        className={tw(selected ? 'visible' : 'invisible')}
      />
    </Box>
  );
});

FloatNode.displayName = 'FloatNode';

export default FloatNode;
