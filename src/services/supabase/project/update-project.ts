import prisma from '@/libs/prisma';

import { UpdateProjectRequest, UpdateProjectResponse } from '@/types/project';

import { createHistory } from '../history/create-history';
import { getProjectById } from './get-project-by-id';

export const updateProject = async (
  project: UpdateProjectRequest,
): Promise<UpdateProjectResponse> => {
  const { data: pastProject } = await getProjectById(project.projectId);

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

  let content = '';

  if (pastProject.title !== project.title) {
    content += `제목: ${pastProject.title} -> ${project.title}\\n`;
  }

  if (pastProject.janres !== project.janres) {
    content += `장르: ${pastProject.janres} -> ${project.janres}\\n`;
  }

  if (pastProject.author !== project.author) {
    content += `작가: ${pastProject.author} -> ${project.author}\\n`;
  }

  if (pastProject.synopsis !== project.synopsis) {
    content += `시놉시스: ${pastProject.synopsis} -> ${project.synopsis}\\n`;
  }

  await createHistory({
    projectId: updated.id,
    title: `${project.title} 업데이트`,
    content,
  });

  return {
    data: updated,
    success: true,
    status: 200,
    message: '프로젝트가 업데이트 되었습니다.',
  };
};
