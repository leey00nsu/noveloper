import { ActionIcon, Card, Group, Text } from '@mantine/core';
import { Projects } from '@prisma/client';
import Link from 'next/link';
import { FaEllipsis } from 'react-icons/fa6';

import ThemeSkeleton from '@/components/ui/mantine-ui/theme-skeleton';

interface ProjectCardProps {
  project: Projects;
}

const ProjectCardSkeleton = () => {
  return (
    <Card withBorder className="h-32">
      <Group wrap="nowrap" justify="space-between">
        <ThemeSkeleton className="h-4" />
        <ActionIcon color="gray" variant="subtle">
          <FaEllipsis />
        </ActionIcon>
      </Group>

      <ThemeSkeleton className="h-full" />
    </Card>
  );
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Card
      component={Link}
      href={`/dashboard/project/${project.id}`}
      withBorder
      className="h-32"
      classNames={{
        root: 'hover:bg-gray-100 dark:hover:bg-gray-800',
      }}
    >
      <Group wrap="nowrap" justify="space-between">
        <Text truncate="end">{project.title}</Text>
        <ActionIcon color="gray" variant="subtle">
          <FaEllipsis />
        </ActionIcon>
      </Group>

      <Text truncate="end" className="text-sm">
        {project.author}
      </Text>
      <Text truncate="end" className="text-sm">
        {project.synopsis}
      </Text>
      <Text truncate="end" className="text-sm">
        {project.janres.join(', ')}
      </Text>
    </Card>
  );
};

ProjectCard.Skeleton = ProjectCardSkeleton;

export default ProjectCard;
