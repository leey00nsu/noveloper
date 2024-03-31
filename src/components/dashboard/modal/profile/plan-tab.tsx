import { Button, Divider, Flex, List, Stack, Text } from '@mantine/core';
import { Fragment } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const MOCK_PLANS = [
  {
    name: 'Free',
    price: '0',
    features: [
      '1개의 프로젝트 생성',
      '100 토큰 제공',
      'Noveloper의 모든 기능 사용',
    ],
  },
  {
    name: 'Plus',
    price: '9,900',
    features: [
      '5개의 프로젝트 생성',
      '500 토큰 제공',
      'Noveloper의 모든 기능 사용',
      'PDF 내보내기 기능',
    ],
  },
  {
    name: 'Business',
    price: '19,000',
    features: [
      '무제한 프로젝트 생성',
      '1000 토큰 제공',
      'Noveloper의 모든 기능 사용',
      'PDF 내보내기 기능',
      '24시간 고객지원',
    ],
  },
];

const MOCK_CURRENT_PLAN = 'Free';

const PlanTab = () => {
  return (
    <Flex className="flex-col justify-between gap-sm p-sm lg:flex-row">
      {MOCK_PLANS.map((plan, index) => (
        <Fragment key={plan.name}>
          <Stack className="grow">
            <Text className="text-xl font-bold ">{plan.name}</Text>
            <Text className="text-lg text-gray-900">{plan.price}원 / 달</Text>
            {MOCK_CURRENT_PLAN === plan.name && (
              <Button disabled color="blue">
                현재 플랜
              </Button>
            )}
            {MOCK_CURRENT_PLAN !== plan.name && (
              <Button color="teal.7">{plan.name} 업그레이드</Button>
            )}
            <List icon={<FaCheckCircle className="text-green-600" />}>
              {plan.features.map((feature) => (
                <List.Item key={feature}>{feature}</List.Item>
              ))}
            </List>
          </Stack>

          {index !== MOCK_PLANS.length - 1 && (
            <Divider className="my-sm border-gray-300 dark:border-gray-700" />
          )}
        </Fragment>
      ))}
    </Flex>
  );
};

export default PlanTab;
