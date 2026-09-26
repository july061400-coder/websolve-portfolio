# WEBSOLVE 포트폴리오 사이트

WEBSOLVE 자체 포트폴리오의 1차 구조와 디자인입니다. 고객별 프로젝트 폴더와 별도로 관리합니다.

## 화면 구조

- `index.html`: WEBSOLVE가 하는 일을 소개하는 메인
- `portfolio.html`: 분야 선택
- `category.html?category=...`: 선택한 분야의 작업 미리보기
- `project.html?slug=...`: 상세페이지 전체 디자인 감상
- `service.html`: 서비스 안내
- `contact.html`: 제작 문의 안내
- `styles.css`: 공통 반응형 디자인
- `site.js`: 공통 메뉴, 분야 목록, 미리보기 및 전체 작업 이동 동작
- `projects-data.js`: 공개할 프로젝트 데이터와 상담 채널 설정
- `assets/`, `projects/`: 공개 가능한 이미지와 개별 시안

## 프로젝트 추가 방법

1. 고객 공개 승인을 받은 작업 또는 자체 제작 샘플만 이미지 파일을 `assets/`나 `projects/`에 넣습니다. 고객 원본 자료는 넣지 않습니다.
2. `projects-data.js`의 `WEBSOLVE_CATEGORIES`에서 기존 분야의 `id`를 확인합니다. 새 분야라면 이 배열에 분야를 추가합니다.
3. `WEBSOLVE_PROJECTS`에 객체를 추가합니다. `slug`는 중복되지 않게, `categoryId`는 위 분야의 `id`와 정확히 일치시키고 `category`는 표시할 분야명으로 지정합니다.
4. `status: "draft"`로 작업하다 검수를 마치고 공개 가능한 경우에만 `status: "published"`로 바꿉니다. 해당 분야의 미리보기와 작업 수는 공개 데이터에서 자동 생성됩니다.
5. 자체 샘플에는 `isSample: true`를 유지해 샘플 배지를 표시합니다. 승인된 실제 고객 작업만 `false`를 사용합니다.
6. 긴 상세페이지는 `projectType: "detail-page"`와 `fullImage`를, 웹 시안은 `projectType: "website"`와 `liveUrl`을 사용합니다. 작품 카드를 누르면 중간 소개 화면 없이 전체 디자인이 열립니다.
7. PC 1440px, 태블릿 768px, 모바일 390px에서 글자·이미지·동선을 확인한 뒤 게시합니다.

## 현재 공개 대상으로 연결된 작업

- 카페·음료 / NOCTAVE: 가상 커피 브랜드의 자체 제작 상세페이지 샘플
- 리테일·유통 / AFTERNOON SELECT: 가상 음료·스낵 브랜드의 자체 제작 상품 리스트/웹디자인 샘플

식품, 헬스·웰니스, 뷰티, 리빙은 분야 목록에 표시하되 실제 작업이 준비되기 전까지 `포트폴리오 준비 중`으로 안내합니다.

과거 ONÉRA 뷰티 샘플은 새 사이트 목록에서 제외했습니다. 실제 고객 프로젝트는 공개 동의 없이 추가하지 않습니다.

## 게시 전 확인할 항목

- `projects-data.js`의 `WEBSOLVE_CONFIG.contactUrl`에 확정된 상담 채널 URL을 넣기
- 새 포트폴리오 자료가 도착하면 이미지·카피를 검수해 프로젝트 데이터에 추가하기
- 공개 배포본에서 외부 링크, 모바일 메뉴, 분야 선택·미리보기 이동, 긴 이미지 로딩을 재검수하기

현재 상담 URL이 비어 있으면 문의 페이지에 안내 문구만 표시하고 외부 상담 버튼은 숨깁니다.
