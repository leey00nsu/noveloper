import mockResponse from '@/actions/mock-response';
import { NextResponse } from 'next/server';

const mockCreateProject = async (success: boolean) => {
  const message = success
    ? '프로젝트가 성공적으로 생성되었습니다.'
    : '프로젝트 생성에 실패했습니다.';

  return mockResponse(
    {
      success,
      message,
    },
    1000,
  );
};

export async function POST() {
  const res = await mockCreateProject(true);

  return NextResponse.json(
    {
      ...res,
    },
    {
      status: res.success ? 201 : 400,
    },
  );
}
