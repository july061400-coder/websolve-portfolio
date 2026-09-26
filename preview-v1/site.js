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
        '<a href="portfolio.html"' + (page === "portfolio" || page === "project" ? ' aria-current="page"' : "") + '>포트폴리오</a>' +
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

  function projectCard(project, eager) {
    return '<a class="project-card" href="project.html?slug=' + encodeURIComponent(project.slug) + '" aria-label="' + escapeHtml(project.title) + ' 프로젝트 보기">' +
      '<div class="project-card__media">' +
      '<img src="' + escapeHtml(project.thumbnail) + '" alt="' + escapeHtml(project.thumbnailAlt) + '" width="' + project.thumbnailWidth + '" height="' + project.thumbnailHeight + '"' +
      (eager ? ' fetchpriority="high"' : ' loading="lazy"') + ' decoding="async">' +
      (project.isSample ? sampleBadge() : "") +
      '</div><div class="project-card__meta"><span>' + escapeHtml(project.category) + '</span><span>' + escapeHtml(project.workType) + '</span></div>' +
      '<div class="project-card__title"><h3>' + escapeHtml(project.title) + '</h3><span aria-hidden="true">↗</span></div>' +
      '<p>' + escapeHtml(project.description) + '</p></a>';
  }

  function categories() {
    var preferred = ["반려동물", "식품·음료", "뷰티", "패션", "리빙", "전자·테크", "서비스", "리테일"];
    var present = Array.from(new Set(allProjects.map(function (project) { return project.category; })));
    return present.sort(function (a, b) {
      var ai = preferred.indexOf(a);
      var bi = preferred.indexOf(b);
      return (ai < 0 ? 99 : ai) - (bi < 0 ? 99 : bi) || a.localeCompare(b, "ko");
    });
  }

  function renderPortfolio(filterId, gridId, countId) {
    var filters = document.getElementById(filterId);
    var grid = document.getElementById(gridId);
    var count = document.getElementById(countId);
    if (!filters || !grid) return;
    var allCategories = ["전체"].concat(categories());
    var requested = new URLSearchParams(window.location.search).get("category") || "전체";
    var current = allCategories.indexOf(requested) >= 0 ? requested : "전체";
    function paint() {
      filters.innerHTML = allCategories.map(function (category) {
        return '<button type="button" class="filter-button' + (category === current ? " is-active" : "") +
          '" data-category="' + escapeHtml(category) + '" aria-pressed="' + String(category === current) + '">' +
          escapeHtml(category) + '</button>';
      }).join("");
      var visible = current === "전체" ? allProjects : allProjects.filter(function (project) { return project.category === current; });
      grid.innerHTML = visible.length
        ? visible.map(function (project, index) { return projectCard(project, current === "전체" && index === 0); }).join("")
        : '<div class="empty-state"><h3>아직 공개된 작업이 없습니다.</h3><p>새 포트폴리오가 준비되면 이곳에 추가됩니다.</p></div>';
      if (count) count.textContent = String(visible.length).padStart(2, "0") + " PROJECTS";
    }
    filters.addEventListener("click", function (event) {
      var button = event.target.closest("button[data-category]");
      if (!button) return;
      current = button.getAttribute("data-category");
      if (window.location.protocol !== "file:") {
        var url = new URL(window.location.href);
        if (current === "전체") url.searchParams.delete("category");
        else url.searchParams.set("category", current);
        window.history.replaceState(null, "", url);
      }
      paint();
    });
    paint();
  }

  function renderHome() {
    renderPortfolio("home-filters", "home-projects", "home-count");
  }

  function renderProject() {
    var root = document.getElementById("project-content");
    if (!root) return;
    var slug = new URLSearchParams(window.location.search).get("slug");
    var project = allProjects.find(function (item) { return item.slug === slug; });
    if (!project) {
      document.title = "프로젝트를 찾을 수 없습니다 | WEBSOLVE";
      root.innerHTML = '<section class="not-found wrap"><span class="eyebrow">PROJECT NOT FOUND</span><h1>작업을 찾을 수 없습니다.</h1><p>주소를 확인하거나 포트폴리오 목록에서 다시 선택해 주세요.</p><a class="text-link" href="portfolio.html">포트폴리오로 돌아가기 ↗</a></section>';
      return;
    }
    document.title = project.title + " | WEBSOLVE 포트폴리오";
    var description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", project.description);
    var points = (project.designPoints || []).map(function (point, index) {
      return '<li><span>' + String(index + 1).padStart(2, "0") + '</span><div><h3>' + escapeHtml(point.title) +
        '</h3><p>' + escapeHtml(point.body) + '</p></div></li>';
    }).join("");
    var visual = "";
    if (project.projectType === "detail-page" && project.fullImage) {
      visual = '<section class="project-section project-section--full"><div class="wrap section-heading"><span class="eyebrow">FULL DESIGN</span><h2>전체 상세페이지</h2><p>실제 디자인의 정보 흐름을 위에서 아래까지 살펴보세요.</p></div>' +
        '<div class="full-design"><img src="' + escapeHtml(project.fullImage) + '" alt="' + escapeHtml(project.fullImageAlt) +
        '" width="' + project.fullImageWidth + '" height="' + project.fullImageHeight + '" loading="lazy" decoding="async"></div></section>';
    }
    if (project.additionalImages && project.additionalImages.length) {
      visual += '<section class="project-section wrap"><div class="section-heading"><span class="eyebrow">SELECTED VISUALS</span><h2>주요 화면과 이미지</h2></div><div class="visual-grid">' +
        project.additionalImages.map(function (item) {
          return '<figure><img src="' + escapeHtml(item.src) + '" alt="' + escapeHtml(item.alt) + '" width="' + item.width + '" height="' + item.height +
            '" loading="lazy" decoding="async"></figure>';
        }).join("") + '</div>' +
        (project.liveUrl ? '<a class="text-link live-link" href="' + escapeHtml(project.liveUrl) + '" target="_blank" rel="noopener">웹 시안 직접 보기 ↗</a>' : "") +
        '</section>';
    }
    var currentIndex = allProjects.indexOf(project);
    var next = allProjects[(currentIndex + 1) % allProjects.length];
    var previous = allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length];
    var navigation = allProjects.length === 2
      ? '<div class="project-neighbors project-neighbors--single"><a href="project.html?slug=' + encodeURIComponent(next.slug) + '"><small>ANOTHER PROJECT</small><strong>' + escapeHtml(next.title) + ' ↗</strong></a></div>'
      : allProjects.length > 2
        ? '<div class="project-neighbors"><a href="project.html?slug=' + encodeURIComponent(previous.slug) + '"><small>PREVIOUS PROJECT</small><strong>' + escapeHtml(previous.title) + '</strong></a>' +
          '<a href="project.html?slug=' + encodeURIComponent(next.slug) + '"><small>NEXT PROJECT</small><strong>' + escapeHtml(next.title) + '</strong></a></div>'
        : "";
    root.innerHTML =
      '<div class="wrap project-breadcrumb"><a href="portfolio.html">포트폴리오</a><span aria-hidden="true">/</span><span>' + escapeHtml(project.title) + '</span></div>' +
      '<article><header class="wrap project-head"><div><span class="eyebrow">' + escapeHtml(project.category) + ' / ' + escapeHtml(project.workType) + '</span>' +
      '<h1>' + escapeHtml(project.title) + '</h1><p>' + escapeHtml(project.description) + '</p></div>' +
      (project.isSample ? sampleBadge() : "") + '</header>' +
      '<div class="wrap project-hero"><img src="' + escapeHtml(project.heroImage) + '" alt="' + escapeHtml(project.heroAlt) +
      '" width="' + project.thumbnailWidth + '" height="' + project.thumbnailHeight + '" fetchpriority="high"></div>' +
      '<section class="project-section wrap overview-grid"><div><span class="eyebrow">PROJECT OVERVIEW</span><h2>' + escapeHtml(project.concept) + '</h2></div>' +
      '<div><p>' + escapeHtml(project.overview) + '</p><dl class="project-facts"><div><dt>분야</dt><dd>' + escapeHtml(project.category) +
      '</dd></div><div><dt>작업</dt><dd>' + escapeHtml(project.workType) + '</dd></div><div><dt>유형</dt><dd>' +
      (project.isSample ? "WEBSOLVE 자체 제작 샘플" : "공개 승인된 고객 프로젝트") + '</dd></div></dl></div></section>' +
      '<section class="project-section project-section--points"><div class="wrap points-grid"><div><span class="eyebrow">DESIGN POINTS</span><h2>무엇을, 어떤 순서로<br>보여줄지 생각했습니다.</h2></div>' +
      '<ol class="point-list">' + points + '</ol></div></section>' +
      visual +
      '<section class="wrap project-bottom">' + navigation +
      '<div class="contact-cta"><span class="eyebrow">WORK WITH WEBSOLVE</span><h2>비슷한 프로젝트를 준비하고 계신가요?</h2><a class="button button--dark" href="contact.html">제작 문의하기 <span aria-hidden="true">↗</span></a></div></section>' +
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
  if (page === "home") renderHome();
  if (page === "portfolio") renderPortfolio("portfolio-filters", "portfolio-projects", "portfolio-count");
  if (page === "project") renderProject();
  if (page === "contact") renderContact();
})();
