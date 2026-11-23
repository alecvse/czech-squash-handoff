const aiTools = document.querySelector('.ai-tools');
const markdown = document.querySelector('#page-markdown').content.textContent;
const copyButton = aiTools.querySelector('[data-copy-markdown]');
const statusMessage = aiTools.querySelector('[role="status"]');

function copyFromSelection() {
  const previous = document.activeElement;
  const input = document.createElement('textarea');
  input.className = 'visually-hidden';
  input.value = markdown;
  document.body.append(input);
  input.select();
  try {
    return document.execCommand('copy');
  } finally {
    input.remove();
    previous.focus({preventScroll: true});
  }
}

async function copyMarkdown() {
  try {
    await navigator.clipboard.writeText(markdown);
    return true;
  } catch {
    return copyFromSelection();
  }
}

async function useMarkdown(chatUrl) {
  const copying = copyMarkdown();
  const tab = chatUrl && window.open('about:blank', '_blank');
  if (tab) tab.opener = null;
  try {
    if (!await copying) throw new Error('clipboard');
    statusMessage.textContent = 'Markdown stránky je ve schránce.';
    if (chatUrl) {
      if (tab) tab.location.replace(chatUrl);
      else window.location.assign(chatUrl);
    }
  } catch {
    if (tab) tab.close();
    statusMessage.textContent = 'Kopírování se nepodařilo. Otevři Markdown a zkopíruj text ručně.';
  }
}

copyButton.hidden = false;
aiTools.querySelector('.ai-tools__chats').hidden = false;
copyButton.addEventListener('click', () => useMarkdown());
aiTools.querySelectorAll('[data-open-chat]').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    useMarkdown(link.href);
  });
});
aiTools.addEventListener('toggle', () => { if (!aiTools.open) statusMessage.textContent = ''; });
document.addEventListener('click', event => {
  if (!aiTools.contains(event.target)) aiTools.open = false;
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && aiTools.open) {
    aiTools.open = false;
    aiTools.querySelector('summary').focus();
  }
});
