/* Celia och Selmas Spel.
   Ren HTML/CSS/JS, inga externa tjänster förutom teckensnitt och egna ljudfiler. */

const SITE_NAME = 'Celia och Selmas Spel';
const PROFILES = {
    selma: { name: 'Selma', icon: '🌼', defaults: { cardCount: 2, minRange: 1, maxRange: 3 } },
    celia: { name: 'Celia', icon: '🚀', defaults: { cardCount: 6, minRange: 1, maxRange: 20 } }
};
let activeProfile = null;
let progress = {};
let roundTimer = null;
let feedbackTimer = null;
let scene = 0;

const CATEGORIES = {
    siffror:   { name: 'Siffror',   icon: '🔢', sub: 'Räkna och hitta' },
    bokstaver: { name: 'Bokstäver', icon: '🔤', sub: 'A till Ö' },
    ord:       { name: 'Ord',       icon: '💬', sub: 'Vanliga ord' },
    figurer:   { name: 'Figurer',   icon: '🔷', sub: 'Former och färger' },
    djur:      { name: 'Djur',      icon: '🦁', sub: 'Hitta djuret' },
};

const ANIMALS = [
    ['🐶', 'hunden'], ['🐱', 'katten'], ['🐷', 'grisen'], ['🐮', 'kon'],
    ['🐴', 'hästen'], ['🐵', 'apan'], ['🦁', 'lejonet'], ['🐯', 'tigern'],
    ['🐘', 'elefanten'], ['🦒', 'giraffen'], ['🦓', 'zebran'], ['🐰', 'kaninen'],
    ['🐻', 'björnen'], ['🦊', 'räven'], ['🐸', 'grodan'], ['🦆', 'ankan'],
    ['🐔', 'hönan'], ['🐧', 'pingvinen'], ['🦉', 'ugglan'], ['🦋', 'fjärilen'],
    ['🐟', 'fisken'], ['🐬', 'delfinen'], ['🐢', 'sköldpaddan'], ['🐝', 'biet'],
];

const FIGURES = [
    ['🔴', 'röda cirkeln'], ['🔵', 'blåa cirkeln'], ['🟢', 'gröna cirkeln'],
    ['🟡', 'gula cirkeln'], ['🟣', 'lila cirkeln'], ['🟠', 'orange cirkeln'],
    ['🟥', 'röda kvadraten'], ['🟦', 'blåa kvadraten'], ['🟩', 'gröna kvadraten'],
    ['🟨', 'gula kvadraten'], ['🟪', 'lila kvadraten'], ['🟧', 'orange kvadraten'],
    ['🔶', 'orange diamanten'], ['🔷', 'blåa diamanten'], ['⭐', 'stjärnan'],
    ['❤️', 'hjärtat'], ['🌙', 'månen'], ['⚫', 'svarta cirkeln'], ['⬛', 'svarta kvadraten'],
];

const WORDS = [
    'HEJ', 'TACK', 'GLAD', 'GODIS', 'LEKA', 'SKOLA', 'BOK', 'TÅG', 'BIL',
    'BOLL', 'CYKEL', 'GLASS', 'HUND', 'KATT', 'FISK', 'APA', 'HÄST', 'FÅGEL',
    'BLOMMA', 'NALLE', 'VATTEN', 'MJÖLK', 'FRUKT', 'SOL', 'MÅNE', 'STJÄRNA',
    'REGN', 'SNÖ', 'VIND', 'VARMT', 'KALLT', 'BYXOR', 'SKOR', 'HJÄRTA',
    'HAND', 'MUN', 'NÄSA', 'ÖGA', 'ÖRA', 'MAGE', 'HUVUD', 'TAND',
];

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ'.split('');

const DEFAULT_SETTINGS = {
    volume: 0.5,
    music: false,
    speech: true,
    showHint: true,
    cardCount: 9,
    minRange: 1,
    maxRange: 20,
};

let settings = loadSettings();

function loadSettings() {
    try {
        const raw = localStorage.getItem('cs-settings-' + activeProfile);
        if (raw) return Object.assign({}, DEFAULT_SETTINGS, PROFILES[activeProfile]?.defaults, JSON.parse(raw));
    } catch (e) { /* enhets-lokal lagring kan saknas */ }
    return Object.assign({}, DEFAULT_SETTINGS, PROFILES[activeProfile]?.defaults);
}
function saveSettings() {
    try { localStorage.setItem('cs-settings-' + activeProfile, JSON.stringify(settings)); } catch (e) {}
}

/* ---------- ljud och tal ---------- */
const voiceAudio = new Audio();
let audioMap = {};
const audioReady = fetch('5-speech-audio.json?v=3').then(r => r.ok ? r.json() : {}).then(data => { audioMap = data; }).catch(() => {});
let speechDone = null;
let speechToken = 0;
let talking = false;
function applyMusic() {
    const music = document.getElementById('backgroundMusic');
    if (!music) return;
    music.volume = settings.volume * (talking ? 0.12 : 0.45);
    if (settings.music && activeProfile) music.play().catch(() => {}); else music.pause();
}
function stopSpeech() {
    speechToken++;
    voiceAudio.pause();
    voiceAudio.onended = voiceAudio.onerror = null;
    try { speechSynthesis.cancel(); } catch (e) {}
    if (speechDone) { speechDone(); speechDone = null; }
    talking = false;
    ['clickSound', 'matchSound'].forEach(id => { const a = document.getElementById(id); if(a) a.pause(); });
    applyMusic();
}
function leaveScene() {
    scene++;
    clearTimeout(roundTimer); clearTimeout(feedbackTimer);
    stopSpeech();
}
function playSound(id) {
    const audio = document.getElementById(id);
    if (!audio) return Promise.resolve();
    return new Promise(resolve => {
        audio.volume = settings.volume; audio.currentTime = 0;
        audio.onended = audio.onerror = resolve;
        audio.play().catch(resolve);
        setTimeout(resolve, 1800);
    });
}
function speak(text) {
    stopSpeech();
    if (!settings.speech || settings.volume === 0) return Promise.resolve();
    const token = speechToken;
    talking = true; applyMusic();
    return new Promise(resolve => {
        let timer;
        const done = () => {
            clearTimeout(timer);
            if (token === speechToken) { talking = false; speechDone = null; applyMusic(); }
            resolve();
        };
        speechDone = done;
        timer = setTimeout(() => { if (token === speechToken) stopSpeech(); done(); }, 7000);
        const fallback = () => {
            if (token !== speechToken) return done();
            try {
                const u = new SpeechSynthesisUtterance(text);
                u.lang = 'sv-SE'; u.rate = 0.9; u.volume = settings.volume;
                const voices = speechSynthesis.getVoices().filter(v => /^sv(?:-|_)/i.test(v.lang));
                u.voice = voices.find(v => /enhanced|premium|natural|sofie/i.test(v.name)) || voices[0] || null;
                u.onend = u.onerror = done;
                speechSynthesis.speak(u);
            } catch(e) { done(); }
        };
        if (audioMap[text]) {
            voiceAudio.src = audioMap[text]; voiceAudio.volume = settings.volume;
            voiceAudio.onended = done; voiceAudio.onerror = fallback;
            voiceAudio.play().catch(fallback);
        } else fallback();
    });
}
function selectProfile(key) {
    leaveScene(); activeProfile = key;
    settings = loadSettings();
    try { progress = JSON.parse(localStorage.getItem('cs-progress-' + key) || '{}'); } catch(e) { progress = {}; }
    location.hash = '#/'; game.cat = null; renderHome(); applyMusic();
}
function saveProgress() {
    progress[game.cat] = (progress[game.cat] || 0) + 1;
    try { localStorage.setItem('cs-progress-' + activeProfile, JSON.stringify(progress)); } catch(e) {}
}
function renderProfiles() {
    document.title = SITE_NAME;
    app.innerHTML = '';
    const hero = el('div','hero');
    hero.appendChild(el('div','profile-balloon','🎈'));
    hero.appendChild(el('h1',null,'Vem vill leka?'));
    hero.appendChild(el('p',null,SITE_NAME)); app.appendChild(hero);
    const list = el('div','profiles');
    Object.entries(PROFILES).forEach(([key,p]) => {
        const b = el('button','profile-card ' + key);
        b.appendChild(el('span','profile-icon',p.icon));
        b.appendChild(el('span','profile-name',p.name));
        b.appendChild(el('span','profile-sub', key === 'selma' ? 'Titta, lyssna och hitta' : 'Upptäck, räkna och läs'));
        b.onclick = () => selectProfile(key); list.appendChild(b);
    }); app.appendChild(list);
}

/* ---------- spel-logik ---------- */
const game = { cat: null, round: 0, stars: 0, target: null, values: [], locked: false };

function sample(arr, count) {
    const copy = arr.slice();
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, count);
}

function buildRound() {
    const cat = game.cat;
    const n = settings.cardCount;
    let values = [];

    if (cat === 'siffror') {
        const min = settings.minRange, max = settings.maxRange;
        if (isNaN(min) || isNaN(max) || min >= max || (max - min + 1) < n) {
            return { error: 'Välj ett större talområde: minst måste vara lägre än högst, och området måste rymma alla kort.' };
        }
        const pool = [];
        for (let i = min; i <= max; i++) pool.push(String(i));
        values = sample(pool, n).map(v => ({ face: v, key: v, prompt: 'Hitta siffran', speech: 'Hitta siffran ' + v }));
    } else if (cat === 'bokstaver') {
        values = sample(LETTERS, n).map(v => ({ face: v, key: v, prompt: 'Hitta bokstaven', speech: 'Hitta bokstaven ' + v }));
    } else if (cat === 'ord') {
        values = sample(WORDS, n).map(v => ({ face: v, key: v, prompt: 'Hitta ordet', speech: 'Hitta ordet ' + v }));
    } else if (cat === 'figurer') {
        values = sample(activeProfile === 'selma' ? FIGURES.slice(0, 6).concat([FIGURES[14], FIGURES[15]]) : FIGURES, n).map(([face, name]) => ({ face, key: face, prompt: 'Hitta figuren', name, speech: 'Hitta ' + name }));
    } else if (cat === 'djur') {
        values = sample(activeProfile === 'selma' ? ANIMALS.slice(0, 6).concat([ANIMALS[11], ANIMALS[12]]) : ANIMALS, n).map(([face, name]) => ({ face, key: face, prompt: 'Hitta djuret', name, speech: 'Hitta ' + name }));
    }
    return { values };
}

function newRound() {
    leaveScene();
    const built = buildRound();
    if (built.error) { renderGame(built.error); return; }
    game.values = built.values;
    game.target = built.values[Math.floor(Math.random() * built.values.length)];
    game.locked = false;
    renderGame();
    const current = scene;
    roundTimer = setTimeout(() => { if(current === scene && !game.locked) speak(game.target.speech); }, 250);
}

function startGame(cat) {
    game.cat = cat;
    game.round = 1;
    game.stars = 0;
    newRound();
}

async function onCardTap(key, btn) {
    if (game.locked) return;
    clearTimeout(roundTimer); clearTimeout(feedbackTimer);
    stopSpeech();
    const current = scene;
    if (key === game.target.key) {
        game.locked = true; game.stars++; saveProgress();
        btn.classList.add('correct');
        const score = document.querySelector('.stars');
        if (score) score.textContent = '★ ' + game.stars;
        confettiBurst(); setFeedback('Bra jobbat! 🎉', 'good');
        const minPause = new Promise(r => setTimeout(r, 1000));
        await Promise.all([settings.speech ? speak('Bra jobbat!') : playSound('matchSound'), minPause]);
        if (current !== scene || !game.cat) return;
        game.round++; newRound();
    } else {
        btn.classList.add('wrong'); setFeedback('Försök igen!', 'bad');
        speak('Försök igen');
        feedbackTimer = setTimeout(() => { if (current === scene) { btn.classList.remove('wrong'); setFeedback('', ''); } }, 900);
    }
}

/* ---------- rendering ---------- */
const app = document.getElementById('app');

function el(tag, cls, text) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
}

let feedbackEl = null;
function setFeedback(msg, tone) {
    if (!feedbackEl) return;
    feedbackEl.textContent = msg;
    feedbackEl.className = 'feedback ' + (tone || '');
}

function renderTopbar(title, showBack) {
    const bar = el('div', 'topbar');
    if (showBack) {
        const back = el('button', 'icon-btn', '←');
        back.setAttribute('aria-label', 'Tillbaka');
        back.onclick = () => { location.hash = '#/'; };
        bar.appendChild(back);
    } else {
        const brand = el('div', 'brand');
        brand.appendChild(el('span', 'logo', '🎈'));
        brand.appendChild(el('span', null, SITE_NAME));
        bar.appendChild(brand);
    }
    if (title) bar.appendChild(el('h2', null, title));
    const gear = el('button', 'icon-btn', '⚙️');
    gear.setAttribute('aria-label', 'Inställningar');
    gear.onclick = renderSettings;
    bar.appendChild(gear);
    return bar;
}

function renderHome() {
    document.title = SITE_NAME;
    app.innerHTML = '';
    app.appendChild(renderTopbar(null, false));
    const switcher = el('button','profile-switch', PROFILES[activeProfile].icon + ' ' + PROFILES[activeProfile].name + ' · Byt spelare');
    switcher.onclick = () => { leaveScene(); activeProfile = null; game.cat = null; applyMusic(); renderProfiles(); };
    app.appendChild(switcher);
    const hero = el('div', 'hero');
    hero.appendChild(el('h1', null, 'Vad vill du leka, ' + PROFILES[activeProfile].name + '?'));
    hero.appendChild(el('p', null, activeProfile === 'selma' ? 'Titta på bilden. Lyssna och hitta samma!' : 'Välj en lek och upptäck något nytt.'));
    app.appendChild(hero);
    const tiles = el('div', 'tiles');
    Object.entries(CATEGORIES).filter(([key]) => activeProfile !== 'selma' || ['djur', 'figurer', 'siffror'].includes(key)).forEach(([key, c]) => {
        const t = el('button', 'tile ' + key);
        t.appendChild(el('span', 'emoji', c.icon));
        t.appendChild(el('span', 'label', c.name));
        t.appendChild(el('span', 'sub', progress[key] ? '★ ' + progress[key] + ' upptäckter' : c.sub));
        t.onclick = () => { location.hash = '#/' + key; };
        tiles.appendChild(t);
    });
    app.appendChild(tiles);
}

function renderGame(errorMsg) {
    const cat = CATEGORIES[game.cat];
    document.title = SITE_NAME + ': ' + cat.name;
    app.innerHTML = '';

    const head = el('div', 'gamehead');
    const back = el('button', 'icon-btn', '←');
    back.setAttribute('aria-label', 'Tillbaka');
    back.onclick = () => { location.hash = '#/'; };
    head.appendChild(back);
    head.appendChild(el('h2', null, cat.icon + ' ' + cat.name));
    head.appendChild(el('div', 'stars', '★ ' + game.stars));
    const gear = el('button', 'icon-btn', '⚙️');
    gear.setAttribute('aria-label', 'Inställningar');
    gear.onclick = renderSettings;
    head.appendChild(gear);
    app.appendChild(head);

    if (errorMsg) {
        const p = el('div', 'prompt');
        p.appendChild(el('div', 'text', errorMsg));
        app.appendChild(p);
        return;
    }

    const t = game.target;
    const prompt = el('div', 'prompt');
    if (t.name && settings.showHint) {
        const face = el('div', 'target', t.face);
        prompt.appendChild(face);
    }
    const txt = el('div', 'text');
    txt.appendChild(el('div', 'lead', t.prompt + ':'));
    txt.appendChild(el('div', t.name ? 'name' : 'name target-value' + (game.cat === 'ord' ? ' word-value' : ''), t.name || t.face));
    prompt.appendChild(txt);
    const again = el('button', 'speak-btn', '🔊');
    again.setAttribute('aria-label', 'Säg igen');
    again.onclick = () => { if(!game.locked) { clearTimeout(roundTimer); speak(t.speech); } };
    prompt.appendChild(again);
    app.appendChild(prompt);

    const grid = el('div', 'grid n' + game.values.length);
    const order = sample(game.values, game.values.length);
    order.forEach((v, i) => {
        const c = el('button', 'card');
        c.style.animationDelay = (i * 30) + 'ms';
        if (v.face.length <= 2 && /^\d+$/.test(v.face)) c.textContent = v.face;
        else if (v.face.length > 2 && !t.name) { c.textContent = v.face; c.style.fontSize = 'clamp(18px, 4.5vw, 30px)'; }
        else { const s = el('span', 'emoji', v.face); c.appendChild(s); }
        c.setAttribute('aria-label', v.name || v.face);
        c.onclick = () => onCardTap(v.key, c);
        grid.appendChild(c);
    });
    app.appendChild(grid);

    feedbackEl = el('div', 'feedback');
    app.appendChild(feedbackEl);
}

function renderSettings() {
    leaveScene();
    game.locked = true;
    const overlay = el('div', 'overlay');
    const sheet = el('div', 'sheet');
    sheet.style.textAlign = 'left';
    sheet.appendChild(el('h3', null, 'Inställningar'));

    const volRow = el('div', 'settings-row');
    volRow.appendChild(el('span', null, '🔊 Volym'));
    const vol = document.createElement('input');
    vol.type = 'range'; vol.min = 0; vol.max = 1; vol.step = 0.1; vol.value = settings.volume;
    vol.oninput = () => { settings.volume = parseFloat(vol.value); saveSettings(); applyMusic(); };
    volRow.appendChild(vol);
    sheet.appendChild(volRow);

    const musRow = el('div', 'settings-row');
    musRow.appendChild(el('span', null, '🎵 Bakgrundsmusik'));
    const mus = document.createElement('input');
    mus.type = 'checkbox'; mus.checked = settings.music;
    mus.onchange = () => { settings.music = mus.checked; saveSettings(); applyMusic(); };
    musRow.appendChild(mus);
    sheet.appendChild(musRow);

    const spRow = el('div', 'settings-row');
    spRow.appendChild(el('span', null, '🗣️ Läs upp'));
    const sp = document.createElement('input');
    sp.type = 'checkbox'; sp.checked = settings.speech;
    sp.onchange = () => { settings.speech = sp.checked; if(!sp.checked) stopSpeech(); saveSettings(); };
    spRow.appendChild(sp);
    sheet.appendChild(spRow);

    const hintRow = el('div', 'settings-row');
    hintRow.appendChild(el('span', null, '🖼️ Visa ledtråd'));
    const hint = document.createElement('input');
    hint.type = 'checkbox'; hint.checked = settings.showHint;
    hint.onchange = () => { settings.showHint = hint.checked; saveSettings(); };
    hintRow.appendChild(hint);
    if (activeProfile !== 'selma') sheet.appendChild(hintRow);

    if (activeProfile === 'celia') {
        const levelRow = el('div','settings-row');
        levelRow.appendChild(el('span',null,'🌱 Nivå'));
        const level = document.createElement('select');
        [['easy','Lugn'],['hard','Klurig']].forEach(([v,label]) => {
            const o = document.createElement('option'); o.value=v; o.textContent=label;
            o.selected = (settings.level || 'easy') === v; level.appendChild(o);
        });
        level.onchange = () => { settings.level=level.value; settings.cardCount=level.value==='hard'?9:6; settings.maxRange=level.value==='hard'?50:20; settings.minRange=1; saveSettings(); };
        levelRow.appendChild(level); sheet.appendChild(levelRow);
    }
    const ccRow = el('div', 'settings-row');
    ccRow.appendChild(el('span', null, '🃏 Antal kort'));
    const cc = document.createElement('select');
    (activeProfile === 'selma' ? [2, 3] : [4, 6, 9]).forEach(n => {
        const o = document.createElement('option');
        o.value = n; o.textContent = n; if (settings.cardCount === n) o.selected = true;
        cc.appendChild(o);
    });
    cc.onchange = () => { settings.cardCount = parseInt(cc.value); saveSettings(); };
    ccRow.appendChild(cc);
    sheet.appendChild(ccRow);

    if (game.cat === 'siffror') {
        const rRow = el('div', 'settings-row');
        rRow.appendChild(el('span', null, '🔢 Talområde'));
        const pair = el('div', 'range-pair');
        const mn = document.createElement('input');
        mn.type = 'number'; mn.value = settings.minRange; mn.min = 0; mn.setAttribute('aria-label', 'Minst');
        const mx = document.createElement('input');
        mx.type = 'number'; mx.value = settings.maxRange; mx.min = 1; mx.setAttribute('aria-label', 'Högst');
        mn.onchange = () => { settings.minRange = parseInt(mn.value); saveSettings(); };
        mx.onchange = () => { settings.maxRange = parseInt(mx.value); saveSettings(); };
        pair.appendChild(mn); pair.appendChild(mx);
        rRow.appendChild(pair);
        sheet.appendChild(rRow);
    }

    const row = el('div', 'btn-row');
    const close = el('button', 'btn', 'Klart');
    close.onclick = () => {
        overlay.remove();
        if (game.cat) newRound();
    };
    row.appendChild(close);
    sheet.appendChild(row);
    overlay.appendChild(sheet);
    overlay.onclick = (e) => { if (e.target === overlay) { overlay.remove(); if (game.cat) newRound(); } };
    app.appendChild(overlay);
}

/* ---------- konfetti ---------- */
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
let pieces = [];
function sizeCanvas() { canvas.width = innerWidth; canvas.height = innerHeight; }
addEventListener('resize', sizeCanvas);
sizeCanvas();

function confettiBurst(strength) {
    const n = Math.round(60 * (strength || 1));
    const colors = ['#4f8cff', '#ff6b6b', '#2fbf71', '#9b6bff', '#ff9f43', '#ffd166'];
    for (let i = 0; i < n; i++) {
        pieces.push({
            x: innerWidth / 2 + (Math.random() - 0.5) * 120,
            y: innerHeight / 3,
            vx: (Math.random() - 0.5) * 9,
            vy: -Math.random() * 9 - 3,
            s: Math.random() * 7 + 4,
            c: colors[Math.floor(Math.random() * colors.length)],
            r: Math.random() * Math.PI,
            vr: (Math.random() - 0.5) * 0.3,
            life: 90 + Math.random() * 40,
        });
    }
    if (!confettiBurst.running) { confettiBurst.running = true; tick(); }
}
function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces = pieces.filter(p => p.life > 0 && p.y < innerHeight + 20);
    pieces.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.vy += 0.25; p.r += p.vr; p.life--;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.r);
        ctx.fillStyle = p.c;
        ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 0.6);
        ctx.restore();
    });
    if (pieces.length) requestAnimationFrame(tick);
    else { confettiBurst.running = false; ctx.clearRect(0, 0, canvas.width, canvas.height); }
}

/* ---------- router ---------- */
function route() {
    const h = location.hash.replace(/^#\/?/, '');
    leaveScene();
    if (!activeProfile) { renderProfiles(); return; }
    if (activeProfile === 'selma' && !['djur','figurer','siffror',''].includes(h)) { game.cat = null; renderHome(); return; }
    if (CATEGORIES[h]) { startGame(h); }
    else { game.cat = null; renderHome(); }
}
addEventListener('pagehide', leaveScene);
document.addEventListener('visibilitychange', () => { if(document.hidden) leaveScene(); else if(activeProfile && game.cat && !document.querySelector('.overlay')) newRound(); });
addEventListener('hashchange', route);
route();
