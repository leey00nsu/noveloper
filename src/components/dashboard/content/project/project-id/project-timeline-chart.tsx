'use client';

import { Group, Paper, Select, Text } from '@mantine/core';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import CalendarChart from '@/components/ui/chart/calendar-chart';
import ThemeSkeleton from '@/components/ui/mantine-ui/theme-skeleton';

import { useGetHistoriesByYear } from '@/hooks/history/use-history-service';

const YEARS = Array.from({ length: 2099 - 2024 + 1 }, (_, i) =>
  (2024 + i).toString(),
);

const ProjectTimelineChartSkeleton = () => (
  <Paper withBorder className="h-[200px] w-full p-sm">
    <ThemeSkeleton className="h-full w-full" />
  </Paper>
);

const ProjectTimelineChart = () => {
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString(),
  );
  const router = useRouter();
  const { projectId } = useParams();

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

  const clickDateHandler = (date: string) => {
    router.push(`/dashboard/project/${projectId}/timeline/${date}`);
  };

  if (isLoading) return <ProjectTimelineChartSkeleton />;

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

      <CalendarChart
        data={data}
        year={selectedYear}
        onClick={clickDateHandler}
      />
    </Paper>
  );
};

export default ProjectTimelineChart;
