'use client';

import Home from '@/components/dashboard/content/home/home';
import Sidebar from '@/components/dashboard/sidebar/sidebar';
import PanelResizeHandle from '@/components/ui/panel/panel-resize-handle';
import { useViewportSize } from '@mantine/hooks';
import { useState } from 'react';
import { Panel, PanelGroup } from 'react-resizable-panels';

import Loader from '../ui/loader/loader';
import Toolbar from './toolbar/toolbar';

const MIN_SIDEBAR_SIZE = 260;
const MIN_TOOLBAR_SIZE = 260;

const DashboardGroup = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isToolbarCollapsed, setIsToolbarCollapsed] = useState(false);

  const { width: viewPortWidth } = useViewportSize();

  const onLayout = (sizes: number[]) => {
    document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
  };

  // Sidebar의 최소 사이즈에 대한 퍼센트를 설정합니다.
  const minSidebarSize = Math.min(
    Number(((MIN_SIDEBAR_SIZE / viewPortWidth) * 100).toFixed(2)),
  );

  const minToolbarSize = Math.min(
    Number(((MIN_TOOLBAR_SIZE / viewPortWidth) * 100).toFixed(2)),
  );

  const minMainSize = 100 - minSidebarSize - minToolbarSize;

  if (minMainSize < 0) {
    return <Loader fullScreen />;
  }

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
            defaultSize={minSidebarSize}
            maxSize={25}
            onCollapse={() => {
              setIsSidebarCollapsed(true);
            }}
            onExpand={() => {
              setIsSidebarCollapsed(false);
            }}
          >
            <Sidebar isCollapsed={isSidebarCollapsed} />
          </Panel>
          <PanelResizeHandle />
        </>
      )}
      <Panel id="main" order={2} defaultSize={minMainSize}>
        <Home />
      </Panel>
      {viewPortWidth > 1024 && (
        <>
          <PanelResizeHandle />
          <Panel
            id="toolbar"
            order={3}
            collapsible
            collapsedSize={1}
            minSize={minToolbarSize}
            defaultSize={minToolbarSize}
            maxSize={25}
            onCollapse={() => {
              setIsToolbarCollapsed(true);
            }}
            onExpand={() => {
              setIsToolbarCollapsed(false);
            }}
          >
            <Toolbar isCollapsed={isToolbarCollapsed} />
          </Panel>
        </>
      )}
    </PanelGroup>
  );
};

export default DashboardGroup;
