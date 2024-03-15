import Home from '@/components/dashboard/content/home/home';
import Sidebar from '@/components/dashboard/sidebar/sidebar';
import { Group } from '@mantine/core';

export default function Page() {
  return (
    <Group className="h-svh gap-0">
      <Sidebar />
      <Home />
    </Group>
  );
}
