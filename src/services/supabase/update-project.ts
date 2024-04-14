import prisma from '@/libs/prisma';

import { UpdateProjectRequest } from '@/types/project';

import { createHistory } from './create-history';

export const updateProject = async (project: UpdateProjectRequest) => {
  const updated = await prisma.projects.update({
    where: {
      id: project.projectId,
    },
    data: {
      title: project.title,
      janres: project.janres,
      author: project.author,
      synopsis: project.synopsis,
    },
  });

  if (!updated) {
    throw new Error('프로젝트 업데이트에 실패했습니다. 다시 시도해주세요.');
  }

  await createHistory({
    projectId: updated.id,
    title: `${project.title} 업데이트`,
  });

  return {
    data: updated,
    success: true,
    status: 200,
    message: '프로젝트가 업데이트 되었습니다.',
  };
};
