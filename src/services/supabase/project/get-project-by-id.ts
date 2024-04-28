import prisma from '@/libs/prisma';

import { GetProjectRequest, GetProjectResponse } from '@/types/project';

import { getUserData } from '../user/get-user-data';

export const getProjectById = async (
  request: GetProjectRequest,
): Promise<GetProjectResponse> => {
  const { data: user } = await getUserData();

  const project = await prisma.projects.findFirst({
    where: {
      userId: user.id,
      id: request.projectId,
    },
  });

  if (!project) {
    throw new Error('프로젝트 정보가 없습니다. 다시 시도해주세요.');
  }

  return {
    data: project,
    success: true,
    status: 200,
    message: '프로젝트를 성공적으로 불러왔습니다.',
  };
};
