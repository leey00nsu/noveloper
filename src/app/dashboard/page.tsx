import Sidebar from '@/components/dashboard/sidebar/sidebar';
import { Group } from '@mantine/core';

export default function Page() {
  return (
    <Group className="h-svh">
      <Sidebar />
    </Group>
  );
}
