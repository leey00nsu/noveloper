import { ActionIcon, Card, Group, Skeleton, Text } from '@mantine/core';
import { Projects } from '@prisma/client';
import { FaEllipsis } from 'react-icons/fa6';

interface ProjectCardProps {
  project: Projects;
}

const ProjectCardSkeleton = () => {
  return (
    <Card withBorder className="h-32">
      <Group wrap="nowrap" justify="space-between">
        <Skeleton className="h-4" />
        <ActionIcon color="gray" variant="subtle">
          <FaEllipsis />
        </ActionIcon>
      </Group>

      <Skeleton className="h-full" />
    </Card>
  );
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Card withBorder className="h-32">
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
