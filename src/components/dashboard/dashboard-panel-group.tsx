'use client';

import { useViewportSize } from '@mantine/hooks';
import { useState } from 'react';
import { Panel, PanelGroup } from 'react-resizable-panels';

import Sidebar from '@/components/dashboard/sidebar/sidebar';
import PanelResizeHandle from '@/components/ui/panel/panel-resize-handle';

import Loader from '../ui/loader/loader';
import Toolbar from './toolbar/toolbar';

const COLLAPSED_SIZE_PERCENT = 1;
const MAX_SIDEBAR_PERCENT = 25;
const MAX_TOOLBAR_PERCENT = 25;
const MIN_SIDEBAR_SIZE = 260;
const MIN_TOOLBAR_SIZE = 260;

const DashboardPanelGroup = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isToolbarCollapsed, setIsToolbarCollapsed] = useState(false);

  const { width: viewPortWidth } = useViewportSize();

  // Sidebar의 최소 사이즈에 대한 퍼센트를 설정합니다.
  const minSidebarSize = Math.min(
    MAX_SIDEBAR_PERCENT,
    Number(((MIN_SIDEBAR_SIZE / viewPortWidth) * 100).toFixed(2)),
  );

  const minToolbarSize = Math.min(
    MAX_TOOLBAR_PERCENT,
    Number(((MIN_TOOLBAR_SIZE / viewPortWidth) * 100).toFixed(2)),
  );

  if (!viewPortWidth) {
    return <Loader fullScreen />;
  }

  return (
    <PanelGroup
      autoSaveId="persistence"
      direction="horizontal"
      className="h-full"
    >
      <Panel
        id="sidebar"
        order={1}
        collapsible
        collapsedSize={COLLAPSED_SIZE_PERCENT}
        minSize={minSidebarSize}
        maxSize={MAX_SIDEBAR_PERCENT}
        onCollapse={() => {
          setIsSidebarCollapsed(true);
        }}
        onExpand={() => {
          setIsSidebarCollapsed(false);
        }}
        className="hidden lg:block"
      >
        <Sidebar isCollapsed={isSidebarCollapsed} />
      </Panel>
      <PanelResizeHandle classNames="hidden lg:block" />

      <Panel id="main" order={2}>
        {children}
      </Panel>

      <PanelResizeHandle classNames="hidden lg:block" />
      <Panel
        id="toolbar"
        order={3}
        collapsible
        collapsedSize={COLLAPSED_SIZE_PERCENT}
        minSize={minToolbarSize}
        maxSize={MAX_TOOLBAR_PERCENT}
        onCollapse={() => {
          setIsToolbarCollapsed(true);
        }}
        onExpand={() => {
          setIsToolbarCollapsed(false);
        }}
        className="hidden lg:block"
      >
        <Toolbar isCollapsed={isToolbarCollapsed} />
      </Panel>
    </PanelGroup>
  );
};

export default DashboardPanelGroup;
