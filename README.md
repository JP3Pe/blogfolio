# 요약
자신의 서버나 Vercel 같은 클라우드 환경에서 자신만의 블로그 시스템을 구축하고자 할 때 사용 가능한 프로젝트입니다.
# 개발환경 구축

로컬 개발 환경에서 프로젝트를 실행하는 방법은 아래와 같습니다.

1. 프로젝트 git clone
2. 프로젝트 폴더 내부에서 아래의 명령어 실행

```bash
yarn dev
```

[http://localhost:3000](http://localhost:3000) 에서 실행된 프로젝트를 확인할 수 있습니다.

# 글 작성

root/public/blogs 디렉토리 내부에 디렉토리를 생성 후 작성하면 됩니다.

## 주의 사항

1. [root directory]/**blogs** 폴더 내부의 컨텐츠 개시물 디렉토리의 이름은 게시물의 제목과 동일하게 설정할것
2. 컨텐츠 게시물 디렉토리 내부에 있는 대표 이미지의 파일명은 반드시 **representative_image.jpg**와 동일할것

# 배포

## Vercel

**build command**로 아래 명령어 사용

```bash
yarn run vercel-deploy
```
