(function () {
  "use strict";

  var allProjects = (window.WEBSOLVE_PROJECTS || [])
    .filter(function (project) { return project.status === "published"; })
    .sort(function (a, b) { return a.order - b.order; });

  function escapeHtml(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (character) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character];
    });
  }

  function sampleBadge() {
    return '<span class="sample-badge" aria-label="WEBSOLVE 포트폴리오 샘플">' +
      '<svg viewBox="0 0 24 20" aria-hidden="true"><path d="M2 5.5 6.2 12 12 3.5 17.8 12 22 5.5 19.6 17H4.4L2 5.5Z"/><path d="M4.5 17h15"/></svg>' +
      '<span class="sample-badge__name">WEBSOLVE</span><span class="sample-badge__type">포트폴리오 샘플</span>' +
      '</span>';
  }

  function renderShell() {
    var page = document.body.getAttribute("data-page") || "";
    var header = document.getElementById("site-header");
    var footer = document.getElementById("site-footer");
    if (header) {
      header.innerHTML =
        '<header class="site-header"><div class="wrap site-header__inner">' +
        '<a class="brand" href="index.html" aria-label="WEBSOLVE 홈">WEB<span>SOLVE</span><small>DESIGN STUDIO</small></a>' +
        '<button class="menu-toggle" type="button" aria-controls="primary-nav" aria-expanded="false" aria-label="메뉴 열기"><span></span><span></span></button>' +
        '<nav class="primary-nav" id="primary-nav" aria-label="주 메뉴">' +
        '<a href="portfolio.html"' + (page === "portfolio" || page === "category" || page === "project" ? ' aria-current="page"' : "") + '>포트폴리오</a>' +
        '<a href="service.html"' + (page === "service" ? ' aria-current="page"' : "") + '>서비스</a>' +
        '<a class="nav-contact" href="contact.html"' + (page === "contact" ? ' aria-current="page"' : "") + '>제작 문의 <span aria-hidden="true">↗</span></a>' +
        '</nav></div></header>';
      var toggle = header.querySelector(".menu-toggle");
      var nav = header.querySelector(".primary-nav");
      toggle.addEventListener("click", function () {
        var open = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!open));
        toggle.setAttribute("aria-label", open ? "메뉴 열기" : "메뉴 닫기");
        nav.classList.toggle("is-open", !open);
      });
      nav.addEventListener("click", function (event) {
        if (event.target.closest("a")) {
          toggle.setAttribute("aria-expanded", "false");
          nav.classList.remove("is-open");
        }
      });
      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
          toggle.setAttribute("aria-expanded", "false");
          nav.classList.remove("is-open");
        }
      });
    }
    if (footer) {
      footer.innerHTML =
        '<footer class="site-footer"><div class="wrap site-footer__top">' +
        '<div><a class="brand brand--footer" href="index.html">WEB<span>SOLVE</span></a><p>상품과 브랜드의 이야기를 읽기 쉬운 화면으로 만듭니다.</p></div>' +
        '<div class="site-footer__links"><a href="portfolio.html">포트폴리오</a><a href="service.html">서비스</a><a href="contact.html">제작 문의</a></div>' +
        '</div><div class="wrap site-footer__bottom"><span>© 2026 WEBSOLVE</span><span>포트폴리오 샘플은 실제 고객 납품 사례와 구분해 표시합니다.</span></div></footer>';
    }
  }

  function projectUrl(project) {
    return project.projectType === "website" && project.liveUrl
      ? project.liveUrl
      : "project.html?slug=" + encodeURIComponent(project.slug);
  }

  function projectCard(project, eager) {
    return '<a class="project-card" href="' + escapeHtml(projectUrl(project)) + '" aria-label="' + escapeHtml(project.title) + ' 전체 작업 보기">' +
      '<div class="project-card__media">' +
      '<img src="' + escapeHtml(project.thumbnail) + '" alt="' + escapeHtml(project.thumbnailAlt) + '" width="' + project.thumbnailWidth + '" height="' + project.thumbnailHeight + '"' +
      (eager ? ' fetchpriority="high"' : ' loading="lazy"') + ' decoding="async">' +
      (project.isSample ? sampleBadge() : "") +
      '</div><div class="project-card__meta"><span>' + escapeHtml(project.category) + '</span><span>' + escapeHtml(project.workType) + '</span></div>' +
      '<div class="project-card__title"><h3>' + escapeHtml(project.title) + '</h3><span aria-hidden="true">↗</span></div>' +
      '<p>' + escapeHtml(project.description) + '</p><span class="project-card__action">' +
      (project.projectType === "website" ? "웹 시안 전체 보기" : "상세페이지 전체 보기") + ' <span aria-hidden="true">↗</span></span></a>';
  }

  function renderPortfolio() {
    var grid = document.getElementById("category-grid");
    var count = document.getElementById("category-count");
    if (!grid) return;
    var categories = window.WEBSOLVE_CATEGORIES || [];
    if (count) count.textContent = String(categories.length).padStart(2, "0") + " CATEGORIES";
    grid.innerHTML = categories.map(function (category, index) {
      var projects = allProjects.filter(function (project) { return project.categoryId === category.id; });
      var lead = projects[0];
      return '<a class="category-card' + (lead ? ' category-card--filled' : ' category-card--empty') +
        '" href="category.html?category=' + encodeURIComponent(category.id) + '" aria-label="' + escapeHtml(category.name) + ' 분야 보기">' +
        '<div class="category-card__visual">' +
        (lead ? '<img src="' + escapeHtml(lead.thumbnail) + '" alt="" width="' + lead.thumbnailWidth +
          '" height="' + lead.thumbnailHeight + '" loading="lazy" decoding="async">' : '<span aria-hidden="true">' + String(index + 1).padStart(2, "0") + '</span>') +
        '</div><div class="category-card__body"><span class="category-card__eyebrow">' + escapeHtml(category.english) + '</span>' +
        '<div class="category-card__title"><h3>' + escapeHtml(category.name) + '</h3><span aria-hidden="true">↗</span></div>' +
        '<p>' + escapeHtml(category.description) + '</p><span class="category-card__count">' +
        (projects.length ? String(projects.length).padStart(2, "0") + '개의 작업 보기' : '포트폴리오 준비 중') +
        '</span></div></a>';
    }).join("");
  }

  function renderCategory() {
    var grid = document.getElementById("category-project-grid");
    if (!grid) return;
    var id = new URLSearchParams(window.location.search).get("category");
    var category = (window.WEBSOLVE_CATEGORIES || []).find(function (item) { return item.id === id; });
    if (!category) {
      document.title = "분야를 찾을 수 없습니다 | WEBSOLVE";
      document.querySelector(".category-head").innerHTML = '<a class="back-link" href="portfolio.html">← 분야 선택으로 돌아가기</a><h1>분야를 찾을 수 없습니다.</h1>';
      return;
    }
    var projects = allProjects.filter(function (project) { return project.categoryId === category.id; });
    document.title = category.name + " 포트폴리오 | WEBSOLVE";
    document.querySelector('meta[name="description"]').setAttribute("content", category.name + " 분야의 WEBSOLVE 포트폴리오 미리보기입니다.");
    document.getElementById("category-english").textContent = category.english + " / PORTFOLIO";
    document.getElementById("category-title").textContent = category.name;
    document.getElementById("category-description").textContent = category.description;
    document.getElementById("category-project-count").textContent = String(projects.length).padStart(2, "0") + " PROJECTS";
    grid.innerHTML = projects.length
      ? projects.map(function (project, index) { return projectCard(project, index === 0); }).join("")
      : '<div class="empty-state"><span class="eyebrow">COMING SOON</span><h2>이 분야의 포트폴리오를 준비하고 있습니다.</h2><p>새 작업이 공개되면 이곳에서 미리보기와 전체 디자인을 볼 수 있습니다.</p><a class="text-link" href="portfolio.html">다른 분야 살펴보기 ↗</a></div>';
    var nextStep = document.querySelector(".category-projects + .narrow-cta");
    if (nextStep) nextStep.hidden = projects.length === 0;
  }

  function renderProject() {
    var root = document.getElementById("project-content");
    if (!root) return;
    var slug = new URLSearchParams(window.location.search).get("slug");
    var project = allProjects.find(function (item) { return item.slug === slug; });
    if (!project) {
      document.title = "프로젝트를 찾을 수 없습니다 | WEBSOLVE";
      root.innerHTML = '<section class="not-found wrap"><span class="eyebrow">PROJECT NOT FOUND</span><h1>작업을 찾을 수 없습니다.</h1><p>주소를 확인하거나 분야 목록에서 다시 선택해 주세요.</p><a class="text-link" href="portfolio.html">분야 선택으로 돌아가기 ↗</a></section>';
      return;
    }
    document.title = project.title + " | WEBSOLVE 포트폴리오";
    var description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", project.description);
    var categoryUrl = "category.html?category=" + encodeURIComponent(project.categoryId);
    var fullView = project.projectType === "detail-page" && project.fullImage
      ? '<div class="full-page-view"><img src="' + escapeHtml(project.fullImage) + '" alt="' +
        escapeHtml(project.fullImageAlt) + '" width="' + project.fullImageWidth + '" height="' +
        project.fullImageHeight + '" fetchpriority="high" decoding="async"></div>'
      : '<div class="wrap full-page-fallback"><p>이 작업은 웹사이트 형태로 제작되었습니다.</p><a class="button button--dark" href="' +
        escapeHtml(project.liveUrl || "#") + '">웹 시안 전체 보기 ↗</a></div>';
    root.innerHTML =
      '<div class="wrap project-breadcrumb"><a href="portfolio.html">분야 선택</a><span aria-hidden="true">/</span><a href="' +
      categoryUrl + '">' + escapeHtml(project.category) + '</a><span aria-hidden="true">/</span><span>' +
      escapeHtml(project.title) + '</span></div>' +
      '<article class="full-project"><header class="wrap full-project__head"><div><span class="eyebrow">' +
      escapeHtml(project.workType) + '</span><h1>' + escapeHtml(project.title) + '</h1><p>' +
      escapeHtml(project.description) + '</p></div>' + (project.isSample ? sampleBadge() : "") + '</header>' +
      fullView +
      '<div class="wrap full-project__bottom"><span>' +
      (project.isSample ? 'WEBSOLVE 자체 제작 포트폴리오 샘플' : '공개 승인된 프로젝트') +
      '</span><a class="text-link" href="' + categoryUrl + '">← ' + escapeHtml(project.category) +
      ' 작업 더 보기</a></div>' +
      '</article>';
  }

  function renderContact() {
    var link = document.getElementById("contact-link");
    var note = document.getElementById("contact-note");
    if (!link || !note) return;
    var config = window.WEBSOLVE_CONFIG || {};
    if (config.contactUrl && /^(https?:|mailto:)/i.test(config.contactUrl)) {
      link.href = config.contactUrl;
      link.textContent = config.contactLabel || "제작 상담 시작하기";
      if (/^https?:/i.test(config.contactUrl)) {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }
      note.textContent = "상담 채널에서 프로젝트 내용을 남겨 주세요.";
    } else {
      link.hidden = true;
      note.textContent = "상담 채널 연결 주소를 준비하고 있습니다.";
    }
  }

  renderShell();
  var page = document.body.getAttribute("data-page");
  if (page === "portfolio") renderPortfolio();
  if (page === "category") renderCategory();
  if (page === "project") renderProject();
  if (page === "contact") renderContact();
})();
