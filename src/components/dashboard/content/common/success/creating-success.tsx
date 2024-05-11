import { Stack, Text } from '@mantine/core';
import { BsGear, BsPersonGear, BsVectorPen } from 'react-icons/bs';
import { FaCheck } from 'react-icons/fa';

import { useGetProjectById } from '@/hooks/project/use-project-service';

import LinkButton from '../../../../ui/button/link-button';

interface CreatingSuccessProps {
  title: string;
  projectId: string;
}

const CreatingSuccess = ({ title, projectId }: CreatingSuccessProps) => {
  const { project } = useGetProjectById(projectId as string);

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
    <Stack justify="center" align="center" className="w-full max-w-xl">
      <FaCheck className="h-32 w-32 text-green-500" />
      <Text className="text-xl">{title}</Text>
      <Stack className="w-full gap-sm">
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
  );
};

export default CreatingSuccess;
