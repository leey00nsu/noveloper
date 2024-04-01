import ThemeScrollArea from '@/components/ui/mantine-ui/theme-scroll-area';
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Group,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { FaSearch } from 'react-icons/fa';
import { FaEllipsis } from 'react-icons/fa6';

const MOCK_PROJECTS = [
  {
    id: '1as51564321dc',
    name: '프로젝트1',
    updatedAt: '1일 전',
  },
  {
    id: '2as51564321dc',
    name: '프로젝트2',
    updatedAt: '2일 전',
  },
  {
    id: '3as51564321dc',
    name: '프로젝트3',
    updatedAt: '3일 전',
  },
  {
    id: '4as51564321dc',
    name: '프로젝트4',
    updatedAt: '4일 전',
  },
  {
    id: '5as51564321dc',
    name: '프로젝트5',
    updatedAt: '5일 전',
  },
  {
    id: '6as51564321dc',
    name: '프로젝트6',
    updatedAt: '6일 전',
  },
  {
    id: '7as51564321dc',
    name: '프로젝트7',
    updatedAt: '7일 전',
  },
  {
    id: '8as51564321dc',
    name: '프로젝트8',
    updatedAt: '8일 전',
  },
  {
    id: '9as51564321dc',
    name: '프로젝트9',
    updatedAt: '9일 전',
  },
];

const Project = () => {
  return (
    <Box className="h-full w-full p-sm">
      <ThemeScrollArea className="h-full" scrollbars="y">
        <Stack className="p-sm">
          <Group>
            <TextInput
              leftSection={<FaSearch />}
              placeholder="프로젝트를 검색해보세요."
              className="grow"
            />
            <Button>새로운 프로젝트 생성</Button>
          </Group>

          <SimpleGrid
            cols={{
              xs: 1,
              lg: 2,
            }}
          >
            {MOCK_PROJECTS.map((project) => (
              <Card withBorder key={project.id}>
                <Group wrap="nowrap" justify="space-between">
                  <Text truncate="end">{project.name}</Text>
                  <ActionIcon color="gray" variant="subtle">
                    <FaEllipsis />
                  </ActionIcon>
                </Group>

                <Text className="text-sm">{project.updatedAt} 수정됨</Text>
              </Card>
            ))}
          </SimpleGrid>
        </Stack>
      </ThemeScrollArea>
    </Box>
  );
};

export default Project;
