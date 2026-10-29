/* ASK WHY?! — all site configuration lives here.
 * To publish an answered video, add an entry to ANSWERED_VIDEOS below.
 * Example:
 * {question: "Why do water towers work?", category: "Engineering",
 *  videoUrl: "https://www.youtube.com/watch?v=YOUR_ID", thumbnail: "https://i.ytimg.com/vi/YOUR_ID/hqdefault.jpg", credit: "Alex"}
 */
const ANSWERED_VIDEOS = [];

const form = document.getElementById('question-form');
const question = document.getElementById('question');
const counter = document.getElementById('counter');
const errorBox = document.getElementById('form-error');
const submitButton = form.querySelector('button[type="submit"]');

function updateCount() { counter.textContent = `${question.value.length} / 300`; }
question.addEventListener('input', updateCount);
updateCount();

document.querySelectorAll('[data-question]').forEach(button => {
  button.addEventListener('click', () => {
    question.value = button.dataset.question;
    updateCount();
    document.getElementById('ask').scrollIntoView({behavior: 'smooth', block: 'start'});
    window.setTimeout(() => question.focus({preventScroll: true}), 250);
  });
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  errorBox.hidden = true;
  if (location.protocol === 'file:') {
    errorBox.textContent = 'This preview cannot collect questions. Deploy this site on Netlify to activate the form.';
    errorBox.hidden = false;
    return;
  }
  submitButton.disabled = true;
  submitButton.querySelector('span').textContent = 'SENDING YOUR QUESTION…';
  try {
    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form)).toString()
    });
    if (!response.ok) throw new Error(`Submission failed: ${response.status}`);
    window.location.assign('/thank-you');
  } catch (error) {
    errorBox.textContent = 'We couldn\'t send your question right now. Please try again.';
    errorBox.hidden = false;
    submitButton.disabled = false;
    submitButton.querySelector('span').textContent = 'SUBMIT MY QUESTION';
  }
});

document.getElementById('year').textContent = String(new Date().getFullYear());
const videosContainer = document.getElementById('answered-list');
if (ANSWERED_VIDEOS.length) {
  videosContainer.replaceChildren();
  for (const item of ANSWERED_VIDEOS) {
    if (!item.videoUrl || !item.question || !/^https:\/\/(www\.)?(youtube\.com|youtu\.be)\//.test(item.videoUrl)) continue;
    const card = document.createElement('article'); card.className = 'video-card';
    const link = document.createElement('a'); link.className = 'video-thumb'; link.href = item.videoUrl; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.setAttribute('aria-label', `Watch answer to ${item.question}`);
    if (item.thumbnail && /^https:\/\//.test(item.thumbnail)) { const img = document.createElement('img'); img.src = item.thumbnail; img.alt = ''; img.loading = 'lazy'; link.append(img); }
    const body = document.createElement('div'); body.className = 'video-body';
    const category = document.createElement('small'); category.textContent = item.category || 'THE WHY FILES';
    const heading = document.createElement('h3'); heading.textContent = item.question;
    const credit = document.createElement('p'); credit.textContent = item.credit ? `Asked by ${item.credit}` : 'The mystery, explained.';
    body.append(category, heading, credit); card.append(link, body); videosContainer.append(card);
  }
}
