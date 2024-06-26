<img  alt="noveloper" src="https://github.com/leey00nsu/noveloper/assets/101182523/fac63e94-e791-4736-9624-47e99e013308">

# Noveloper

AI 기반 소설 창작 플랫폼, [Noveloper](https://noveloper.store)

## Tech

- Next.js 14
- Typescript
- Mantine (+ Tailwind CSS)
- Supabase
- Prisma
- React-Query (Tanstack-Query)
- Tiptap
- Reactflow
- Nivo
- React-pdf
- OpenAI
- React-resizable-panels

## CI/CD

- Github actions
- Oracle cloud
- Docker

## Structure

<img width="5491" alt="noveloper 구조" src="https://github.com/leey00nsu/noveloper/assets/101182523/44a9f683-4fdc-44e0-9675-1c2380d8d689">

## Feature

### 디자인 시스템

- Noveloper는 Mantine 라이브러리와 Tailwind를 연결한 구조를 사용하고 있습니다.
- 재사용되는 Mantine 컴포넌트를 UI로 구분지어 재사용성을 높이기위해 노력했습니다.

### 회원 인증

- Supabase Authentication을 통해 이메일/비밀번호 인증과 OAuth 인증을 지원합니다.
- 이메일 인증시에는 회원가입시 Resend SMTP 서버를 통해 이메일을 보내 인증 과정을 처리합니다.

### 반응형 레이아웃

- react-resizable-panels를 이용하여 반응형 대시보드 레이아웃을 구성하였습니다.
- Noveloper는 데스크탑 환경을 지향하지만 모바일에서도 제한적으로 서비스를 이용할 수 있도록 하였습니다.

### 에디터

- Tiptap을 이용하여 WYSIWYG 에디터를 통해 소설을 작성할 수 있도록 하였습니다.
- 작성한 내용을 react-pdf의 JSON 데이터형태로 파싱하여 결과물을 PDF로 출력할 수 있도록 하였습니다.

### 관계도

- reactflow를 이용하여 관계도 플로우차트를 그리고, 이를 파일로 내보낼 수 있도록 하였습니다.

### ORM

- Next.js <-> prisma <-> postgresql 의 구조로 orm인 prisma를 사용하여 데이터베이스 조작을 추상화하고, zod 스키마와 연결하여 타입 안정성을 보장할 수 있도록 하였습니다.

### 데이터 페칭

- api routes를 통해 REST API를 구성하여 각 service api를 호출하도록 하였습니다.
- react-query(tanstack-query)를 사용하여 api 요청을 데이터에 맞게 캐싱하고 관리하도록 하였습니다.
- 클라이언트 호출과 서비스 로직을 분리하여 후에 다른 백엔드 서버로 변경하더라도 해당 부분만 변경하면 되도록 독립적인 구조를 가질 수 있도록 노력했습니다.

### CI/CD

- github actions를 통해 새로운 커밋이 푸시되면 oracle cloud에서 새로운 도커 이미지를 빌드하고 실행하도록 CI/CD를 구성하였습니다.

### OpenAI

- 현재 gpt-3.5-turbo-0125 를 사용한 AI 응답을 통해 소설을 자동으로 작성하도록 구성하였습니다.


## Demo

### AI 소설 작성 
[PDF 내보내기 결과](https://drive.google.com/file/d/1r8OsqcUn7q7ttdfnf0M9F4P_ws8_ta-5/view?usp=sharing)

https://github.com/leey00nsu/noveloper/assets/101182523/b7a54eff-87c1-4985-80b7-29b070fa64c6

### 관계도 추가
https://github.com/leey00nsu/noveloper/assets/101182523/be59b79d-bab4-4546-9f22-3efce5b2ca83




