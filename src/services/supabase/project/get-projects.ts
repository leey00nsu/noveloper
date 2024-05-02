import prisma from '@/libs/prisma';

import { GetProjectsRequest, GetProjectsResponse } from '@/types/project';

import { getUserData } from '../user/get-user-data';

export const getProjects = async (
  request: GetProjectsRequest,
): Promise<GetProjectsResponse> => {
  const { data: user } = await getUserData();

  const projects = await prisma.projects.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      [request.orderBy]: request.order,
    },
  });

  if (!projects) {
    throw new Error('프로젝트 정보가 없습니다. 다시 시도해주세요.');
  }

  return {
    data: projects,
    success: true,
    status: 200,
    message: '프로젝트 목록을 성공적으로 불러왔습니다.',
  };
};
