// The export is the live page with all FAQ answers visible, not separate copy.
if (document.documentElement.classList.contains('export-view')) {
  document.querySelectorAll('.f-faq details').forEach((item) => { item.open = true; });
}
