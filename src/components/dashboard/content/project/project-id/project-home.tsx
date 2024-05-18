'use client';

import { Stack, Text, Title } from '@mantine/core';
import { useParams } from 'next/navigation';
import { BsGear, BsPersonGear, BsVectorPen } from 'react-icons/bs';

import LinkButton from '@/components/ui/button/link-button';
import ContentWrapper from '@/components/ui/wrapper/content-wrapper';

import { useGetProjectById } from '@/hooks/project/use-project-service';

import ProjectTimelineChart from './project-timeline-chart';

const ProjectHome = () => {
  const { projectId } = useParams<{ projectId: string }>();

  const { project } = useGetProjectById(projectId);

  const contents = [
    {
      label: '인물 관리',
      icon: <BsPersonGear />,
      href: `/dashboard/project/${project?.id}/character`,
    },
    {
      label: '스토리 관리',
      icon: <BsVectorPen />,
      href: `/dashboard/project/${project?.id}/page`,
    },
    {
      label: '프로젝트 설정',
      icon: <BsGear />,
      href: `/dashboard/project/${project?.id}/info`,
    },
  ];

  return (
    <ContentWrapper>
      <Stack className="w-full max-w-xl">
        <Title order={2} className="mt-sm break-words text-center">
          {project?.title}
        </Title>

        <Text className="break-words text-center text-sm">
          {project?.author}
        </Text>

        <ProjectTimelineChart />

        <Stack className="gap-sm">
          {contents.map((content) => (
            <LinkButton
              key={content.label}
              href={content.href}
              label={content.label}
              icon={content.icon}
            />
          ))}
        </Stack>
      </Stack>
    </ContentWrapper>
  );
};

export default ProjectHome;
