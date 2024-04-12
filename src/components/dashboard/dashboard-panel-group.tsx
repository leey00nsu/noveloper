'use client';

import { useViewportSize } from '@mantine/hooks';
import { useRef, useState } from 'react';
import {
  ImperativePanelHandle,
  Panel,
  PanelGroup,
} from 'react-resizable-panels';

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
  const [, setLayout] = useState([25, 50, 25]);
  const sidebarRef = useRef<ImperativePanelHandle>(null);
  const toolbarRef = useRef<ImperativePanelHandle>(null);

  const { width: viewPortWidth } = useViewportSize();

  const toggleSidebar = () => {
    const sideBar = sidebarRef.current;
    if (sideBar?.isCollapsed()) {
      sideBar.expand();
    } else {
      sideBar?.collapse();
    }
  };

  const toggleToolbar = () => {
    const toolbar = toolbarRef.current;
    if (toolbar?.isCollapsed()) {
      toolbar.expand();
    } else {
      toolbar?.collapse();
    }
  };

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
        ref={sidebarRef}
        id="sidebar"
        order={1}
        collapsible
        collapsedSize={COLLAPSED_SIZE_PERCENT}
        minSize={minSidebarSize}
        maxSize={MAX_SIDEBAR_PERCENT}
        className="hidden lg:block"
        onResize={(size) => setLayout((prev) => [size, prev[1], prev[2]])}
      >
        <Sidebar isCollapsed={sidebarRef.current?.isCollapsed()} />
      </Panel>
      <PanelResizeHandle
        tooltipPosition="right"
        onClick={toggleSidebar}
        classNames="hidden lg:block"
      />

      <Panel id="main" order={2}>
        {children}
      </Panel>

      <PanelResizeHandle
        tooltipPosition="left"
        onClick={toggleToolbar}
        classNames="hidden lg:block"
      />
      <Panel
        ref={toolbarRef}
        id="toolbar"
        order={3}
        collapsible
        collapsedSize={COLLAPSED_SIZE_PERCENT}
        minSize={minToolbarSize}
        maxSize={MAX_TOOLBAR_PERCENT}
        className="hidden lg:block"
        onResize={(size) => setLayout((prev) => [prev[0], prev[1], size])}
      >
        <Toolbar isCollapsed={toolbarRef.current?.isCollapsed()} />
      </Panel>
    </PanelGroup>
  );
};

export default DashboardPanelGroup;
