import { EVENTOS, on } from './events.js';
// Cuatro capítulos educativos; el contenido editable está en data/.
import { data } from './data.js';
import { content, language, t } from './i18n.js';
import { escapeHTML } from './ui.js';
import { currentRoute } from './router.js';
export function sourceLinks(ids) {
  return ids.map(id=>data.sources.find(source=>source.id===id)).filter(Boolean).map(source=>`<a href="${escapeHTML(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(source.title[language()])}</a>`).join('');
}
export function pictogram(total, highlighted) {
  return `<div class="pictogram" aria-hidden="true">${Array.from({length:total},(_,i)=>`<svg class="${i<highlighted?'highlight':''}" viewBox="0 0 24 42"><circle cx="12" cy="5" r="4" fill="currentColor"/><path d="M6 12h12v14h-3v14H9V26H6Z" fill="currentColor"/></svg>`).join('')}</div>`;
}
function pendingStats() {
  const provenance=stat=>`<div class="stat-provenance"><p>${escapeHTML(t('sourceLabel'))}: ${stat.url?`<a href="${escapeHTML(stat.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(stat.source||t('pendingSource'))}</a>`:escapeHTML(stat.source||t('pendingSource'))}</p><p>${escapeHTML(t('year'))}: ${escapeHTML(stat.year??t('pendingYear'))}</p><p>${escapeHTML(t('population'))}: ${escapeHTML(stat.population||t('pendingPopulation'))}</p><p>${escapeHTML(t('methodology'))}: ${escapeHTML(stat.methodology||t('pendingMethodology'))}</p></div>`;
  return `<div class="stat-grid"><div class="stat-cell"><p class="small-label">${escapeHTML(t('draftStat'))}</p><div class="stat-number">${escapeHTML(content().statistics[0].display)}</div>${pictogram(10,3)}<p>${escapeHTML(t('draftEstimate'))}</p>${provenance(content().statistics[0])}</div><div class="stat-cell"><p class="small-label">${escapeHTML(t('mexico'))} / ${escapeHTML(t('validationPending'))}</p><div class="stat-number">${escapeHTML(content().statistics[1].display)}</div>${pictogram(4,1)}<p>${escapeHTML(t('draftEstimate'))}</p>${provenance(content().statistics[1])}</div></div><div class="us-comparison"><strong>${escapeHTML(t('usNumber'))}</strong><div><p><b>${escapeHTML(t('usComparison'))}</b></p><p>${escapeHTML(t('usPopulation'))}</p><div class="chapter-sources">${sourceLinks(['niddk-dkd'])}</div>${provenance(content().statistics[2])}</div></div><p class="fine-print" style="margin-top:1rem">${escapeHTML(t('globalNote'))}</p>`;
}
export function renderEducation() {
  const route = currentRoute();
  const sections = content().sections;
  const selected = sections.find(section=>section.id===route.chapter) || sections[0];
  const tabs = document.getElementById('education-tabs');
  const focusedId = document.activeElement?.id;
  tabs.innerHTML = sections.map((section,i)=>`<button id="chapter-${section.id}" role="tab" aria-selected="${section.id===selected.id}" aria-controls="education-panel" tabindex="${section.id===selected.id?0:-1}" data-chapter="${section.id}"><span>${String(i+1).padStart(2,'0')}</span><span>${escapeHTML(section.tab)}</span></button>`).join('');
  const panel = document.getElementById('education-panel');
  panel.setAttribute('aria-labelledby',`chapter-${selected.id}`);
  panel.innerHTML = `<div class="education-regular"><div><div class="chapter-top"><p class="eyebrow">${escapeHTML(selected.eyebrow)}</p><button type="button" class="listen-button" data-listen aria-pressed="false"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9Z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/></svg> <span data-listen-label>${escapeHTML(t('listen'))}</span></button></div><h2>${escapeHTML(selected.title)}</h2><p class="chapter-description">${escapeHTML(selected.description)}</p></div><div class="chapter-points"><h3>${escapeHTML(selected.pointsTitle)}</h3><ol>${selected.points.map(point=>`<li>${escapeHTML(point)}</li>`).join('')}</ol></div></div>${selected.id==='epidemiologia'?pendingStats():''}<p class="chapter-note">${escapeHTML(selected.note)}</p><div class="chapter-sources">${sourceLinks(selected.sources)}</div>`;
  if (focusedId?.startsWith('chapter-')) document.getElementById(focusedId)?.focus({preventScroll:true});
}
export function initEducation() {
  const tabs = document.getElementById('education-tabs');
  tabs.addEventListener('click',event=>{const button=event.target.closest('[data-chapter]');if(button)location.hash=`descubrir/${button.dataset.chapter}`;});
  tabs.addEventListener('keydown',event=>{
    if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
    const buttons=[...tabs.querySelectorAll('button')];const current=buttons.indexOf(document.activeElement);if(current<0)return;
    event.preventDefault();const index=event.key==='Home'?0:event.key==='End'?buttons.length-1:(current+(event.key==='ArrowRight'?1:-1)+buttons.length)%buttons.length;
    location.hash=`descubrir/${buttons[index].dataset.chapter}`;
    buttons[index].focus({preventScroll:true});
  });
  on(EVENTOS.ROUTE,event=>{if(event.detail.route==='descubrir')renderEducation();});
  on(EVENTOS.LANGUAGE,renderEducation);
  renderEducation();
}
export function renderCredits() {
  const c = content();
  const about = `<section class="about-project" aria-labelledby="about-title"><p class="eyebrow">${escapeHTML(c.aboutEyebrow)}</p><h2 id="about-title">${escapeHTML(c.aboutTitle)}</h2><p class="about-intro">${escapeHTML(c.aboutIntro)}</p><div class="about-grid"><div class="about-card"><h3>${escapeHTML(c.aboutGoalTitle)}</h3><p>${escapeHTML(c.aboutGoal)}</p></div><div class="about-card"><h3>${escapeHTML(c.aboutScopeTitle)}</h3><p>${escapeHTML(c.aboutScope)}</p></div></div><h3 class="about-teams-title">${escapeHTML(c.aboutTeamsTitle)}</h3><div class="about-teams">${c.aboutTeams.map(team=>`<div class="about-team"><span class="tag">${escapeHTML(team.country)}</span><strong>${escapeHTML(team.university)}</strong><p>${escapeHTML(team.role)}</p></div>`).join('')}</div></section>`;
  document.getElementById('credits-content').innerHTML = about + `<div class="credits-grid">${content().creditsBlocks.map(block=>`<div class="credit-block"><span>${block.number}</span><h2>${escapeHTML(block.title)}</h2><p>${escapeHTML(block.text)}</p></div>`).join('')}</div><div class="universities"><p class="eyebrow">${escapeHTML(t('slideCreditLabel'))}</p><div class="university-list">${content().universities.map(name=>`<span>${escapeHTML(name)}</span>`).join('')}</div><p class="fine-print">${escapeHTML(content().creditReview)}</p></div>`;
  document.getElementById('source-list').innerHTML = `<p class="source-pending">${escapeHTML(t('sourcePendingDisclaimer'))}</p>${data.sources.map(source=>`<div class="source-item"><div><a href="${escapeHTML(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(source.title[language()])}</a><small>${escapeHTML(t('sourceChecked'))}</small></div><div><p>${escapeHTML(source.scope[language()])}</p><small>${source.reviewDate?escapeHTML(source.reviewDate):escapeHTML(t('sourceNoDate'))}</small></div></div>`).join('')}`;
}
