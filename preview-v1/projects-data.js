/* Category IDs stay stable even while a category has no published projects. */
window.WEBSOLVE_CATEGORIES = [
  { id: "food", name: "식품", english: "FOOD", description: "식품의 특징과 정보를 설득력 있게 보여주는 작업" },
  { id: "cafe", name: "카페·음료", english: "CAFE & DRINK", description: "맛과 분위기를 함께 전하는 카페·음료 작업" },
  { id: "health", name: "헬스·웰니스", english: "HEALTH & WELLNESS", description: "복잡한 정보를 명확하게 정리하는 헬스·웰니스 작업" },
  { id: "beauty", name: "뷰티", english: "BEAUTY", description: "제품의 사용감과 브랜드 인상을 보여주는 뷰티 작업" },
  { id: "living", name: "리빙", english: "LIVING", description: "생활 속 쓰임과 디테일을 전하는 리빙 작업" },
  { id: "retail", name: "리테일·유통", english: "RETAIL", description: "여러 상품을 보기 좋고 고르기 쉽게 구성한 작업" }
];

/* Add a project here, then place its images under this site's assets or projects folder.
   Only entries with status "published" appear on the site. */
window.WEBSOLVE_PROJECTS = [
  {
    id: "noctave",
    slug: "noctave",
    title: "NOCTAVE",
    brand: "NOCTAVE",
    categoryId: "cafe",
    category: "카페·음료",
    workType: "상세페이지 · 기획 + 디자인",
    projectType: "detail-page",
    isSample: true,
    status: "published",
    order: 1,
    thumbnail: "assets/coffee.jpg",
    thumbnailAlt: "NOCTAVE 커피 패키지와 원두를 배치한 포트폴리오 대표 이미지",
    thumbnailWidth: 1120,
    thumbnailHeight: 1400,
    heroImage: "assets/coffee.jpg",
    heroAlt: "NOCTAVE 가상 커피 브랜드의 패키지 비주얼",
    fullImage: "projects/coffee/noctave-full.png",
    fullImageAlt: "NOCTAVE 커피 상세페이지 전체 디자인",
    fullImageWidth: 1000,
    fullImageHeight: 10985,
    mobileImages: [],
    description: "원두의 특징부터 마시는 순간까지, 하나의 흐름으로 구성한 커피 상세페이지.",
    overview: "스페셜티 커피를 소개하는 가상 브랜드 샘플입니다. 감성적인 첫 장면 뒤에 맛의 특징, 원두 정보, 추출 방법과 구매 전 정보를 순서대로 배치했습니다.",
    concept: "하루의 소음을 낮추는 한 잔",
    designPoints: [
      { title: "읽히는 정보 순서", body: "감각적인 첫인상 다음에 맛과 원두 정보를 제시해 제품을 단계적으로 이해하도록 구성했습니다." },
      { title: "절제된 시각 언어", body: "따뜻한 아이보리와 차콜, 얇은 선과 넓은 여백으로 브랜드의 차분한 분위기를 유지했습니다." },
      { title: "긴 화면의 리듬", body: "서로 다른 크기의 이미지와 정보 블록을 교차 배치해 상세페이지를 끝까지 편하게 살펴볼 수 있게 했습니다." }
    ],
    additionalImages: [],
    tags: ["스페셜티 커피", "상품 정보 설계", "에디토리얼"],
    liveUrl: ""
  },
  {
    id: "afternoon-select",
    slug: "afternoon-select",
    title: "AFTERNOON SELECT",
    brand: "AFTERNOON SELECT",
    categoryId: "retail",
    category: "리테일·유통",
    workType: "상품 리스트 · 웹디자인",
    projectType: "website",
    isSample: true,
    status: "published",
    order: 2,
    thumbnail: "assets/vending.jpg",
    thumbnailAlt: "음료와 스낵을 함께 배치한 AFTERNOON SELECT 포트폴리오 대표 이미지",
    thumbnailWidth: 1400,
    thumbnailHeight: 933,
    heroImage: "assets/vending.jpg",
    heroAlt: "AFTERNOON SELECT 가상 브랜드의 음료와 스낵 비주얼",
    fullImage: "",
    mobileImages: [],
    description: "음료와 스낵을 한 브랜드의 분위기로 묶은 상품 리스트 디자인.",
    overview: "자동판매기에서 선택할 수 있는 음료와 스낵을 위한 가상 브랜드 샘플입니다. 두 상품의 차이는 분명하게 보여주면서도 하나의 브랜드처럼 읽히도록 구성했습니다.",
    concept: "잠깐의 휴식도 취향 있게",
    designPoints: [
      { title: "상품별 인상 구분", body: "음료의 산뜻함과 스낵의 따뜻함을 이미지와 색으로 구분했습니다." },
      { title: "일관된 브랜드 화면", body: "제품이 나란히 놓여도 제목, 정보 구조와 이미지 비율이 균형을 이루도록 설계했습니다." },
      { title: "빠른 선택을 돕는 구성", body: "상품의 종류와 특징을 짧게 읽을 수 있도록 핵심 정보부터 보여줍니다." }
    ],
    additionalImages: [
      { src: "projects/vending/drink.png", alt: "AFTERNOON SELECT 음료 상품 이미지", width: 1122, height: 1402 },
      { src: "projects/vending/snack.png", alt: "AFTERNOON SELECT 스낵 상품 이미지", width: 1122, height: 1402 }
    ],
    tags: ["음료·스낵", "상품 리스트", "반응형 웹"],
    liveUrl: "projects/vending/"
  }
];

window.WEBSOLVE_CONFIG = {
  contactUrl: "",
  contactLabel: "제작 상담 시작하기"
};
