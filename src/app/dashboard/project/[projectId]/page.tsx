import ProjectHome from '@/components/dashboard/content/project/project-home';
import { getProjectById } from '@/services/supabase/get-project-by-id';
import { redirect } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: { projectId: string };
}) {
  const response = await getProjectById(params.projectId);

  if (!response.success || !response.data) {
    redirect('/dashboard');
  }

  return <ProjectHome project={response.data} />;
}
