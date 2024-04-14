import { Button, Divider, Flex, List, Stack, Text } from '@mantine/core';
import { Fragment } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

import { useGetUser } from '@/hooks/user/use-user-service';

import { PLANS } from '@/constants/plan/plan';

const PlanTab = () => {
  const { user } = useGetUser();

  if (!user) return null;

  const currentPlan = user.plan_id as string;

  return (
    <Flex className="flex-col justify-between gap-sm p-sm lg:flex-row">
      {Object.values(PLANS).map((plan, index) => (
        <Fragment key={plan.name}>
          <Stack className="grow">
            <Text className="text-xl font-bold ">{plan.name}</Text>
            <Text className="text-lg ">{plan.price}원 / 달</Text>
            {currentPlan.toLowerCase() === plan.name.toLowerCase() && (
              <Button disabled color="blue">
                현재 플랜
              </Button>
            )}
            {currentPlan.toLowerCase() !== plan.name.toLowerCase() && (
              <Button color="teal.7">{plan.name} 업그레이드</Button>
            )}
            <List icon={<FaCheckCircle className="text-green-600" />}>
              {plan.features.map((feature) => (
                <List.Item key={feature}>{feature}</List.Item>
              ))}
            </List>
          </Stack>

          {index !== Object.values(PLANS).length - 1 && (
            <Divider className="my-sm border-gray-300 dark:border-gray-700" />
          )}
        </Fragment>
      ))}
    </Flex>
  );
};

export default PlanTab;
