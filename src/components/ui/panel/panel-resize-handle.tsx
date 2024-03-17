import { RxDragHandleDots2 } from 'react-icons/rx';
import { PanelResizeHandle as OriginalHandle } from 'react-resizable-panels';

const PanelResizeHandle = () => {
  return (
    <OriginalHandle className="relative">
      <div className="absolute -left-1.5 top-1/2 z-10 flex h-4 w-3 items-center justify-center rounded-sm bg-gray-400">
        <RxDragHandleDots2 className="h-2.5 w-2.5 text-black" />
      </div>
    </OriginalHandle>
  );
};

export default PanelResizeHandle;
