'use client';

import { Group, Paper, Select, Text } from '@mantine/core';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import CalendarChart from '@/components/ui/chart/calendar-chart';
import ThemeSkeleton from '@/components/ui/mantine-ui/theme-skeleton';

import { useGetHistoriesByYear } from '@/hooks/history/use-history-service';

const YEARS = Array.from({ length: 2099 - 2024 + 1 }, (_, i) =>
  (2024 + i).toString(),
);

const ProjectHistoryChartSkeleton = () => (
  <Paper withBorder className="h-[200px] w-full p-sm">
    <ThemeSkeleton className="h-full w-full" />
  </Paper>
);

const ProjectHistoryChart = () => {
  const { projectId } = useParams();
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString(),
  );

  const { histories, isLoading } = useGetHistoriesByYear({
    projectId: projectId as string,
    year: selectedYear,
  });

  const mergedHistories: {
    [key: string]: number;
  } = {};

  histories?.forEach((history) => {
    const dateString = new Date(history.createdAt)
      .toISOString()
      .substring(0, 10);

    if (mergedHistories[dateString]) {
      mergedHistories[dateString] += 1;
    } else {
      mergedHistories[dateString] = 1;
    }
  });

  const data = Object.entries(mergedHistories).map(([date, value]) => ({
    day: date,
    value,
  }));

  if (isLoading) return <ProjectHistoryChartSkeleton />;

  return (
    <Paper withBorder className="h-[200px] w-full p-sm">
      <Group justify="space-between">
        <Text className="text-sm">
          {selectedYear}년에 {histories?.length}개의 타임라인이 있습니다.
        </Text>

        <Select
          size="sm"
          allowDeselect={false}
          value={selectedYear}
          onChange={(value) => setSelectedYear(value!)}
          data={YEARS}
        />
      </Group>
      <CalendarChart data={data} year={selectedYear} />
    </Paper>
  );
};

export default ProjectHistoryChart;
