import prisma from '@/libs/prisma';

import { DeleteProjectRequest, DeleteProjectResponse } from '@/types/project';

import { getUserData } from '../user/get-user-data';

export const deleteProject = async (
  request: DeleteProjectRequest,
): Promise<DeleteProjectResponse> => {
  const { data: user } = await getUserData();

  const deleted = await prisma.projects.delete({
    where: {
      id: request.projectId,
      userId: user.id,
    },
  });

  if (!deleted) {
    throw new Error('프로젝트 삭제에 실패했습니다. 다시 시도해주세요.');
  }

  return {
    data: deleted,
    success: true,
    status: 200,
    message: '프로젝트가 삭제 되었습니다.',
  };
};
