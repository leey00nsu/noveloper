import { Button, Stack, Text } from '@mantine/core';
import Link from 'next/link';
import { BsFolderPlus, BsPersonPlus } from 'react-icons/bs';
import { FaBook } from 'react-icons/fa';
import { MdArrowOutward } from 'react-icons/md';

const MOCK_CONTENTS = [
  { label: '인물 추가', icon: <BsPersonPlus /> },
  { label: '회차 추가', icon: <BsFolderPlus /> },
];

const CreatingSuccess = () => {
  return (
    <Stack justify="center" align="center" className="w-full max-w-xl">
      <FaBook className="h-32 w-32" />
      <Text className="text-xl">페이지가 생성되었습니다.</Text>
      <Stack className="w-full gap-sm">
        {MOCK_CONTENTS.map((content) => (
          <Button
            href="/dashboard/guide"
            component={Link}
            key={content.label}
            size="lg"
            variant="light"
            justify="space-between"
            leftSection={content.icon}
            rightSection={<MdArrowOutward />}
          >
            <Text className="text-center">{content.label}</Text>
          </Button>
        ))}
      </Stack>
    </Stack>
  );
};

export default CreatingSuccess;
