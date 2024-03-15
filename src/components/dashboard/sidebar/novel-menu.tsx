import { Accordion, Button, Stack } from '@mantine/core';

const NovelMenu = () => {
  const MOCK_ACCORDIANS = [
    { label: '인물', items: ['인물 관리', '인물 관계도'] },
    { label: '회차', items: ['회차 관리', '타임라인'] },
    { label: '설정', items: ['작품 정보', '배경 관리', '고유 명사 설정'] },
  ];

  return (
    <Accordion multiple defaultValue={[]} className="p-sm">
      {MOCK_ACCORDIANS.map((accordion) => (
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
                  key={item}
                  variant="transparent"
                  justify="flex-start"
                  color="white"
                  className="px-md hover:bg-gray-800 "
                >
                  {item}
                </Button>
              ))}
            </Stack>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default NovelMenu;
