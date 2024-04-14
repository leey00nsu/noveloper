export const PLANS = {
  FREE: {
    name: 'Free',
    token: 100,
    maxProject: 1,
    price: 0,
    features: [
      '1개의 프로젝트 생성',
      '100 토큰 제공',
      'Noveloper의 모든 기능 사용',
    ],
  },
  PLUS: {
    name: 'Plus',
    token: 500,
    maxProject: 5,
    price: 9900,
    features: [
      '5개의 프로젝트 생성',
      '500 토큰 제공',
      'Noveloper의 모든 기능 사용',
      'PDF 내보내기 기능',
    ],
  },
  BUSINESS: {
    name: 'Business',
    token: 1000,
    maxProject: 1000,
    price: 19000,
    features: [
      '무제한 프로젝트 생성',
      '1000 토큰 제공',
      'Noveloper의 모든 기능 사용',
      'PDF 내보내기 기능',
      '24시간 고객지원',
    ],
  },
};
