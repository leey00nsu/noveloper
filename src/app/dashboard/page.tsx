import DashboardGroup from '@/components/dashboard/dashboard-group';
import { Box } from '@mantine/core';
import { cookies } from 'next/headers';

const DEFAULT_LAYOUT = [20, 80];

// 쿠키에 저장된 레이아웃 비율을 가져옵니다.
const getDefaultLayout = () => {
  const layout = cookies().get('react-resizable-panels:layout');

  if (layout) {
    return JSON.parse(layout.value);
  }
  return DEFAULT_LAYOUT;
};

export default function Page() {
  const defaultLayout = getDefaultLayout();

  return (
    <Box className="h-dvh">
      <DashboardGroup defaultLayout={defaultLayout} />
    </Box>
  );
}
