'use client';

import { Accordion, Button, Stack, Text } from '@mantine/core';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useGetProjectById } from '@/hooks/project/use-project-service';

const ProjectMenu = () => {
  const { projectId } = useParams();

  const { project } = useGetProjectById(projectId as string);

  if (!project) return null;

  const accordions = [
    {
      label: '인물',
      items: [
        {
          label: '인물 관리',
          url: `/dashboard/project/${projectId}/character`,
        },
        {
          label: '인물 관계도',
          url: `/dashboard/project/${projectId}/relation`,
        },
      ],
    },
    {
      label: '스토리',
      items: [
        { label: '페이지 관리', url: `/dashboard/project/${projectId}/page` },
      ],
    },
    {
      label: '설정',
      items: [
        { label: '작품 정보', url: `/dashboard/project/${projectId}/info` },
      ],
    },
  ];

  return (
    <Accordion multiple defaultValue={[]} className="p-sm">
      <Text className="px-md text-sm font-bold text-gray-600">
        {project.title}
      </Text>
      {accordions.map((accordion) => (
        <Accordion.Item
          key={accordion.label}
          value={accordion.label}
          className="border-none"
        >
          <Accordion.Control className="rounded text-white hover:bg-gray-800">
            {accordion.label}
          </Accordion.Control>
          <Accordion.Panel>
            <Stack>
              {accordion.items.map((item) => (
                <Button
                  component={Link}
                  href={item.url}
                  key={item.label}
                  variant="transparent"
                  justify="flex-start"
                  color="white"
                  className="px-md hover:bg-gray-800 "
                >
                  {item.label}
                </Button>
              ))}
            </Stack>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default ProjectMenu;
