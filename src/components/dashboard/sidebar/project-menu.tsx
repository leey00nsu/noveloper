'use client';

import { Accordion, Stack } from '@mantine/core';
import { useParams } from 'next/navigation';

import AccordianButton from '@/components/ui/button/accordian-button';

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
          href: `/dashboard/project/${projectId}/character`,
        },
        {
          label: '인물 관계도',
          href: `/dashboard/project/${projectId}/relation`,
        },
      ],
    },
    {
      label: '스토리',
      items: [
        { label: '페이지 관리', href: `/dashboard/project/${projectId}/page` },
      ],
    },
    {
      label: '설정',
      items: [
        { label: '작품 정보', href: `/dashboard/project/${projectId}/info` },
      ],
    },
  ];

  return (
    <Accordion multiple defaultValue={[]} className="p-sm">
      <Stack>
        <AccordianButton
          label={project.title}
          href={`/dashboard/project/${projectId}`}
          className="text-sm font-bold text-gray-600"
        />
      </Stack>

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
                <AccordianButton
                  key={item.label}
                  label={item.label}
                  href={item.href}
                />
              ))}
            </Stack>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default ProjectMenu;
