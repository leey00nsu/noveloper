'use client';

import { Group, Paper, Select, Text } from '@mantine/core';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import CalendarChart from '@/components/ui/chart/calendar-chart';
import ThemeSkeleton from '@/components/ui/mantine-ui/theme-skeleton';

import { useGetTimelinesByYear } from '@/hooks/timeline/use-timeline-service';

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
  const { projectId } = useParams<{ projectId: string }>();

  const { timelines, isLoading } = useGetTimelinesByYear({
    projectId,
    year: selectedYear,
  });

  const mergedTimelines: {
    [key: string]: number;
  } = {};

  timelines?.forEach((timeline) => {
    const dateString = new Date(timeline.createdAt)
      .toISOString()
      .substring(0, 10);

    if (mergedTimelines[dateString]) {
      mergedTimelines[dateString] += 1;
    } else {
      mergedTimelines[dateString] = 1;
    }
  });

  const data = Object.entries(mergedTimelines).map(([date, value]) => ({
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
          {selectedYear}년에 {timelines?.length}개의 타임라인이 있습니다.
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
