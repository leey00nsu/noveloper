import { isEqual } from 'lodash-es';

import prisma from '@/libs/prisma';

import { UpdateProjectRequest, UpdateProjectResponse } from '@/types/project';

import { createHistory } from '../history/create-history';
import { getUserData } from '../user/get-user-data';
import { getProjectById } from './get-project-by-id';

export const updateProject = async (
  request: UpdateProjectRequest,
): Promise<UpdateProjectResponse> => {
  const { data: user } = await getUserData();

  const { data: pastProject } = await getProjectById({
    projectId: request.projectId,
  });

  const updated = await prisma.projects.update({
    where: {
      id: request.projectId,
      userId: user.id,
    },
    data: {
      title: request.title,
      janres: request.janres,
      author: request.author,
      synopsis: request.synopsis,
    },
  });

  if (!updated) {
    throw new Error('프로젝트 업데이트에 실패했습니다. 다시 시도해주세요.');
  }

  let content = `${updated.title} 프로젝트가 업데이트 되었습니다. \\n`;

  if (pastProject.title !== request.title) {
    content += `제목: ${pastProject.title} -> ${request.title}\\n`;
  }

  if (!isEqual(pastProject.janres, request.janres)) {
    content += `장르: ${pastProject.janres} -> ${request.janres}\\n`;
  }

  if (pastProject.author !== request.author) {
    content += `작가: ${pastProject.author} -> ${request.author}\\n`;
  }

  if (pastProject.synopsis !== request.synopsis) {
    content += `시놉시스: ${pastProject.synopsis} -> ${request.synopsis}\\n`;
  }

  await createHistory({
    projectId: updated.id,
    title: `${request.title} 업데이트`,
    content,
  });

  return {
    data: updated,
    success: true,
    status: 200,
    message: '프로젝트가 업데이트 되었습니다.',
  };
};
