import { Tooltip } from '@mantine/core';
import { RxDragHandleDots2 } from 'react-icons/rx';
import { PanelResizeHandle as OriginalHandle } from 'react-resizable-panels';

import tw from '@/libs/tw';

interface PanelResizeHandleProps {
  classNames?: string;
  onClick: () => void;
  tooltipPosition: 'top' | 'right' | 'bottom' | 'left';
}

const PanelResizeHandle = ({
  classNames,
  onClick,
  tooltipPosition,
}: PanelResizeHandleProps) => {
  return (
    <OriginalHandle className={tw('group relative', classNames)}>
      <div className="absolute -left-0.5 z-10 h-full w-1 duration-100 group-data-[resize-handle-state=drag]:bg-blue-400 group-data-[resize-handle-state=hover]:bg-blue-400 " />

      <Tooltip.Floating position={tooltipPosition} label="더블클릭하여 토글">
        <div
          onDoubleClick={onClick}
          className="absolute -left-1.5 top-1/2 z-10 flex h-4 w-3 items-center justify-center rounded-sm bg-gray-400"
        >
          <RxDragHandleDots2 className="h-2.5 w-2.5 text-black" />
        </div>
      </Tooltip.Floating>
    </OriginalHandle>
  );
};

export default PanelResizeHandle;
