// Preserve bookmarks from the original single-page handoff.
function openOriginalChapter() {
  const chapter = document.getElementById(window.location.hash.slice(1));
  if (chapter && chapter.matches('.former-chapters a')) {
    const url = new URL(chapter.href);
    url.search = window.location.search;
    window.location.replace(url.href);
  }
}

openOriginalChapter();
window.addEventListener('hashchange', openOriginalChapter);
