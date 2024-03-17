'use client';

import Home from '@/components/dashboard/content/home/home';
import Sidebar from '@/components/dashboard/sidebar/sidebar';
import PanelResizeHandle from '@/components/ui/panel/panel-resize-handle';
import tw from '@/libs/tw';
import { useViewportSize } from '@mantine/hooks';
import { useState } from 'react';
import { Panel, PanelGroup } from 'react-resizable-panels';

interface DashboardGroupProps {
  defaultLayout: number[];
}

const MIN_SIDEBAR_SIZE = 260;

const DashboardGroup = ({ defaultLayout }: DashboardGroupProps) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { width: viewPortWidth } = useViewportSize();

  const onLayout = (sizes: number[]) => {
    document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
  };

  // Sidebar의 최소 사이즈에 대한 퍼센트를 설정합니다.
  const minSidebarSize = Math.min(
    defaultLayout[0],
    (MIN_SIDEBAR_SIZE / viewPortWidth) * 100,
  );

  return (
    <PanelGroup
      autoSaveId="persistence"
      direction="horizontal"
      className="h-full"
      onLayout={onLayout}
    >
      {viewPortWidth > 1024 && (
        <>
          <Panel
            id="sidebar"
            order={1}
            collapsible
            collapsedSize={1}
            minSize={minSidebarSize}
            defaultSize={defaultLayout[0]}
            maxSize={30}
            onCollapse={() => {
              setIsSidebarCollapsed(true);
            }}
            onExpand={() => {
              setIsSidebarCollapsed(false);
            }}
            className={tw(
              isSidebarCollapsed && 'transition-all duration-300 ease-in-out',
            )}
          >
            <Sidebar isCollapsed={isSidebarCollapsed} />
          </Panel>
          <PanelResizeHandle />
        </>
      )}
      <Panel id="main" order={2} defaultSize={defaultLayout[1]}>
        <Home />
      </Panel>
    </PanelGroup>
  );
};

export default DashboardGroup;
