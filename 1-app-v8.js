/* Celia och Selmas Spel.
   Ren HTML/CSS/JS, inga externa tjänster förutom teckensnitt och egna ljudfiler. */

const SITE_NAME = 'Celia och Selmas Spel';
const PROFILES = {
    selma: { name: 'Selma', icon: '🌼', defaults: { cardCount: 2, minRange: 1, maxRange: 6 } },
    celia: { name: 'Celia', icon: '🚀', defaults: { cardCount: 9, minRange: 1, maxRange: 30 } }
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
    skriv:     { name: 'Skriv',     icon: '✏️', sub: 'Skriv orden' },
    plusminus: { name: 'Plus och minus', icon: '➕', sub: 'Räkna med knappar' },
    ganger:    { name: 'Gånger',    icon: '✖️', sub: 'Grupper med saker' },
    dela:      { name: 'Dela',      icon: '➗', sub: 'Dela lika' },
    blandat:   { name: 'Blandat',   icon: '🎲', sub: 'Allt i en lek' },
};

const ANIMALS = [
    ['🐶', 'hunden'], ['🐱', 'katten'], ['🐷', 'grisen'], ['🐮', 'kon'],
    ['🐴', 'hästen'], ['🐵', 'apan'], ['🦁', 'lejonet'], ['🐯', 'tigern'],
    ['🐘', 'elefanten'], ['🦒', 'giraffen'], ['🦓', 'zebran'], ['🐰', 'kaninen'],
    ['🐻', 'björnen'], ['🦊', 'räven'], ['🐸', 'grodan'], ['🦆', 'ankan'],
    ['🐔', 'hönan'], ['🐧', 'pingvinen'], ['🦉', 'ugglan'], ['🦋', 'fjärilen'],
    ['🐟', 'fisken'], ['🐬', 'delfinen'], ['🐢', 'sköldpaddan'], ['🐝', 'biet'],
    ['🐭', 'musen'], ['🐹', 'hamstern'], ['🐺', 'vargen'], ['🐊', 'krokodilen'],
    ['🐙', 'bläckfisken'], ['🐞', 'nyckelpigan'], ['🐌', 'snigeln'], ['🦈', 'hajen'],
    ['🐳', 'valen'], ['🦘', 'kängurun'], ['🐿️', 'ekorren'], ['🦔', 'igelkotten'],
    ['🐑', 'fåret'], ['🐓', 'tuppen'],
];

const FIGURES = [
    ['🔴', 'röda cirkeln'], ['🔵', 'blåa cirkeln'], ['🟢', 'gröna cirkeln'],
    ['🟡', 'gula cirkeln'], ['🟣', 'lila cirkeln'], ['🟠', 'orange cirkeln'],
    ['🟥', 'röda kvadraten'], ['🟦', 'blåa kvadraten'], ['🟩', 'gröna kvadraten'],
    ['🟨', 'gula kvadraten'], ['🟪', 'lila kvadraten'], ['🟧', 'orange kvadraten'],
    ['🔶', 'orange diamanten'], ['🔷', 'blåa diamanten'], ['⭐', 'stjärnan'],
    ['❤️', 'hjärtat'], ['🌙', 'månen'], ['⚫', 'svarta cirkeln'], ['⬛', 'svarta kvadraten'],
    ['💙', 'blå hjärtat'], ['💚', 'gröna hjärtat'], ['💛', 'gula hjärtat'], ['💜', 'lila hjärtat'],
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
        const raw = localStorage.getItem('cs-settings2-' + activeProfile);
        if (raw) return Object.assign({}, DEFAULT_SETTINGS, PROFILES[activeProfile]?.defaults, JSON.parse(raw));
    } catch (e) { /* enhets-lokal lagring kan saknas */ }
    return Object.assign({}, DEFAULT_SETTINGS, PROFILES[activeProfile]?.defaults);
}
function saveSettings() {
    try { localStorage.setItem('cs-settings2-' + activeProfile, JSON.stringify(settings)); } catch (e) {}
}

/* ---------- ljud och tal ---------- */
const voiceAudio = new Audio();
let audioMap = {};
const audioReady = fetch('5-speech-audio.json?v=3').then(r => r.ok ? r.json() : {}).then(data => { audioMap = data; }).catch(() => {});
let speechDone = null;
let speechToken = 0;
let talking = false;
let liveUtterance = null;
let lastCancelAt = 0;
let ttsUnlocked = false;
function unlockTts() {
    if (ttsUnlocked) return; ttsUnlocked = true;
    try { const u = new SpeechSynthesisUtterance(' '); u.volume = 0; u.lang = 'sv-SE'; speechSynthesis.speak(u); } catch (e) {}
}
document.addEventListener('pointerdown', unlockTts, { once: true });
document.addEventListener('touchend', unlockTts, { once: true });
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
    try { if (speechSynthesis.speaking || speechSynthesis.pending) { speechSynthesis.cancel(); lastCancelAt = Date.now(); } } catch (e) {}
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
            const go = () => {
                if (token !== speechToken) return done();
                try {
                    const u = new SpeechSynthesisUtterance(text);
                    u.lang = 'sv-SE'; u.rate = 0.9; u.volume = 1;
                    const voices = speechSynthesis.getVoices().filter(v => /^sv(?:-|_)/i.test(v.lang));
                    const vv = voices.find(v => /enhanced|premium|natural|sofie/i.test(v.name)) || voices[0];
                    if (vv) u.voice = vv;
                    u.onend = u.onerror = done;
                    liveUtterance = u;
                    try { speechSynthesis.resume(); } catch (e) {}
                    speechSynthesis.speak(u);
                } catch(e) { done(); }
            };
            try {
                const wait = 160 - (Date.now() - lastCancelAt);
                if (wait > 0) setTimeout(go, wait); else go();
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

const recentKeys = {};
function rememberKey(cat, key, keep) {
    const r = recentKeys[cat] || (recentKeys[cat] = []);
    r.push(key);
    while (r.length > keep) r.shift();
}
function isRecent(cat, key) { return (recentKeys[cat] || []).includes(key); }

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
        values = sample(activeProfile === 'selma' ? LETTERS.slice(0, 12) : LETTERS, n).map(v => ({ face: v, key: v, prompt: 'Hitta bokstaven', speech: 'Hitta bokstaven ' + v }));
    } else if (cat === 'ord') {
        values = sample(WORDS, n).map(v => ({ face: v, key: v, prompt: 'Hitta ordet', speech: 'Hitta ordet ' + v }));
    } else if (cat === 'figurer') {
        values = sample(activeProfile === 'selma' ? FIGURES.slice(0, 12).concat([FIGURES[14], FIGURES[15], FIGURES[16]]) : FIGURES, n).map(([face, name]) => ({ face, key: face, prompt: 'Hitta figuren', name, speech: 'Hitta ' + name }));
    } else if (cat === 'djur') {
        values = sample(activeProfile === 'selma' ? ANIMALS.slice(0, 16) : ANIMALS, n).map(([face, name]) => ({ face, key: face, prompt: 'Hitta djuret', name, speech: 'Hitta ' + name }));
    }
    return { values };
}

function newRound() {
    leaveScene();
    if (game.cat === 'skriv') { newWriteRound(); return; }
    if (MATH_CATS.includes(game.cat)) { newMathRound(); return; }
    const built = buildRound();
    if (built.error) { renderGame(built.error); return; }
    game.values = built.values;
    const fresh = built.values.filter(v => !isRecent(game.cat, v.key));
    game.target = pick(fresh.length ? fresh : built.values);
    rememberKey(game.cat, game.target.key, 10);
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
    const picked = (game.values || []).find(v => v.key === key);
    const said = 'Du valde ' + String(picked && picked.speech ? picked.speech : '').replace(/^Hitta /, '');
    const asked = String(game.target.speech || '').replace(/^Hitta /, '');
    if (key === game.target.key) {
        game.locked = true; game.stars++; saveProgress();
        btn.classList.add('correct');
        const score = document.querySelector('.stars');
        if (score) score.textContent = '★ ' + game.stars;
        confettiBurst(); setFeedback('Bra jobbat! 🎉', 'good');
        const minPause = new Promise(r => setTimeout(r, 1000));
        await Promise.all([settings.speech ? speak(said + '. Rätt! Bra jobbat!') : playSound('matchSound'), minPause]);
        if (current !== scene || !game.cat) return;
        game.round++; newRound();
    } else {
        btn.classList.add('wrong'); setFeedback('Försök igen!', 'bad');
        speak(said + '. Nej, det är fel. Försök igen. Hitta ' + asked);
        feedbackTimer = setTimeout(() => { if (current === scene) { btn.classList.remove('wrong'); setFeedback('', ''); } }, 900);
    }
}

/* ---------- skrivspel (Celia) ---------- */
const WRITE_WORDS = [
    ['🐶','hund'],['🐱','katt'],['🐮','ko'],['🐷','gris'],['🐴','häst'],['🐵','apa'],['🐟','fisk'],['🐘','elefant'],
    ['🦁','lejon'],['🐸','groda'],['🦉','uggla'],['🐢','sköldpadda'],['🐝','bi'],['🦋','fjäril'],
    ['🚗','bil'],['🚂','tåg'],['☀️','sol'],['🌙','måne'],['⭐','stjärna'],['⚽','boll'],['📖','bok'],['🏠','hus'],
    ['🐭','mus'],['🐰','kanin'],['🐻','björn'],['🦊','räv'],['🐧','pingvin'],['🐬','delfin'],['🍓','jordgubbe'],['🥕','morot'],['🍕','pizza'],['🍪','kaka'],['🥚','ägg'],['🎈','ballong'],['👑','krona'],['🔑','nyckel'],['🚌','buss'],['✈️','flygplan'],['🏰','slott'],['🌈','regnbåge'],['☁️','moln'],['🔥','eld'],['🍄','svamp'],['👟','sko'],['🧦','strumpa'],['🥁','trumma'],['🐊','krokodil'],['🐙','bläckfisk'],
    ['🌸','blomma'],['🌳','träd'],['🚲','cykel'],['🍦','glass'],['❤️','hjärta'],['🍎','äpple'],['🍌','banan'],['🎂','tårta'],
];
const WRITE_EASY = new Set(['ko','bi','apa','bil','sol','bok','hus','hund','katt','gris','fisk','boll','tåg','måne','häst','mus','kanin','räv','kaka','ägg','krona','nyckel','buss','moln','eld','sko','pizza','morot','svamp','björn','trumma']);
const write = { item: null, hinted: 0 };
function newWriteRound() {
    const hard = settings.level === 'hard';
    const pool = WRITE_WORDS.filter(([, w]) => hard || WRITE_EASY.has(w));
    const freshPool = pool.filter(([, w]) => !isRecent('skriv', w));
    const [face, answer] = pick(freshPool.length ? freshPool : pool);
    rememberKey('skriv', answer, 14);
    write.item = { mode: 'word', face, answer, lead: 'Skriv vad du ser.' };
    write.hinted = 0;
    game.locked = false;
    renderWrite();
    const wcur = scene;
    roundTimer = setTimeout(() => { if (wcur === scene && !game.locked) speak('Skriv vad du ser'); }, 300);
}
function renderWrite() {
    const cat = CATEGORIES.skriv;
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

    const it = write.item;
    const box = el('div', 'write-box');
    box.appendChild(el('div', 'write-lead', it.lead));
    box.appendChild(el('div', it.mode === 'count' ? 'write-face count' : 'write-face', it.face));
    const hintLine = el('div', 'write-hint', '');
    box.appendChild(hintLine);
    const input = document.createElement('input');
    input.className = 'write-input'; input.type = 'text';
    input.autocomplete = 'off'; input.autocapitalize = 'off'; input.spellcheck = false;
    if (it.mode === 'count') input.inputMode = 'numeric';
    input.setAttribute('aria-label', 'Skriv svaret');
    box.appendChild(input);
    const row = el('div', 'btn-row');
    const hintBtn = el('button', 'btn secondary', '💡 Hjälp');
    const go = el('button', 'btn', 'Klart ✓');
    row.appendChild(hintBtn); row.appendChild(go);
    if (it.mode === 'word') { const ear = el('button', 'btn secondary', '🔊'); ear.setAttribute('aria-label', 'Lyssna'); ear.onclick = () => { speak(it.answer); input.focus(); }; row.insertBefore(ear, go); }
    box.appendChild(row);
    app.appendChild(box);
    feedbackEl = el('div', 'feedback');
    app.appendChild(feedbackEl);

    function showHint() {
        write.hinted = Math.min(write.hinted + 1, it.answer.length);
        hintLine.textContent = it.answer.slice(0, write.hinted).toUpperCase() + ' _'.repeat(it.answer.length - write.hinted);
        if (it.mode === 'count') hintLine.textContent = 'Räkna en och en!';
    }
    hintBtn.onclick = () => { showHint(); input.focus(); };
    async function check() {
        if (game.locked) return;
        const v = input.value.trim().toLowerCase();
        if (!v) return;
        const current = scene;
        if (v === it.answer) {
            game.locked = true; game.stars++; saveProgress();
            input.classList.add('ok'); input.blur();
            hintLine.textContent = it.mode === 'word' ? it.answer.split('').join(' ').toUpperCase() : it.answer;
            hintLine.classList.add('done');
            const sc = document.querySelector('.stars'); if (sc) sc.textContent = '★ ' + game.stars;
            confettiBurst(); setFeedback('Bra jobbat! 🎉', 'good');
            await Promise.all([settings.speech ? speak('Du skrev ' + v + '. Rätt! Bra jobbat!') : playSound('matchSound'), new Promise(r => setTimeout(r, 1000))]);
            if (current !== scene || game.cat !== 'skriv') return;
            game.round++; newWriteRound();
        } else {
            input.classList.add('bad'); setFeedback('Försök igen!', 'bad'); speak('Du skrev ' + v + '. Nej, det är fel. Försök igen. Ordet är ' + it.answer.length + ' bokstäver.');
            setTimeout(() => { input.classList.remove('bad'); setFeedback('', ''); }, 900);
        }
    }
    go.onclick = check;
    input.onkeydown = e => { if (e.key === 'Enter') check(); };
    if (it.mode === 'word') hintLine.textContent = '_ '.repeat(it.answer.length).trim();
    setTimeout(() => input.focus(), 150);
}


/* ---------- mattespel (Celia): räknefrågor med sifferknappar ---------- */
const math = { q: null, typed: '' };
const MATH_CATS = ['plusminus', 'ganger', 'dela', 'blandat'];
const pick = arr => arr[Math.floor(Math.random() * arr.length)];
const rnd = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));
const MATH_SYMS = ['🍎','⭐','🎈','🐟','🌸','🍪'];
function newMathRound() {
    let tries = 0, q;
    do { q = makeMathQ(); tries++; } while (isRecent('math', q.speech) && tries < 25);
    rememberKey('math', q.speech, 10);
    startMathRound(q);
}
function makeMathQ() {
    const hard = settings.level === 'hard';
    const sym = pick(MATH_SYMS);
    let kind = game.cat;
    if (kind === 'blandat') kind = pick(['plusminus', 'ganger', 'dela']);
    let q;
    if (kind === 'plusminus') {
        const max = hard ? 20 : 10;
        let a, b, op;
        if (Math.random() < 0.6) { op = '+'; a = rnd(1, max - 1); b = rnd(1, max - a); }
        else { op = '−'; a = rnd(2, max); b = rnd(1, a - 1); }
        q = { kind, a, b, op, ans: op === '+' ? a + b : a - b, sym, speech: a + (op === '+' ? ' plus ' : ' minus ') + b };
    } else if (kind === 'ganger') {
        // a grupper med b saker
        const a = rnd(2, hard ? 6 : 4), b = hard ? pick([2, 5, 10, 3, 4, 1, 6]) : rnd(1, 5);
        q = { kind, a, b, op: '×', ans: a * b, sym, speech: a + ' gånger ' + b };
    } else {
        // dela lika: total delas på a kompisar
        const a = rnd(2, hard ? 6 : 4), b = rnd(1, hard ? 6 : 5);
        q = { kind, a: a * b, b: a, op: '÷', ans: b, sym, speech: a * b + ' delat med ' + a };
    }
    return q;
}
function startMathRound(q) {
    math.q = q; math.typed = '';
    game.locked = false;
    renderMath();
    const current = scene;
    roundTimer = setTimeout(() => { if (current === scene && !game.locked) speak('Hur mycket är ' + math.q.speech + '?'); }, 300);
}
function renderMath() {
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

    const q = math.q;
    const box = el('div', 'write-box math-box');
    const pics = el('div', 'math-pics');
    if (q.kind === 'plusminus') {
        if (q.a <= 10 && q.b <= 10) {
            pics.appendChild(el('span', 'math-group', q.sym.repeat(q.a)));
            pics.appendChild(el('span', 'math-op', q.op));
            pics.appendChild(el('span', 'math-group' + (q.op === '−' ? ' math-take' : ''), q.sym.repeat(q.b)));
        }
    } else if (q.kind === 'ganger') {
        for (let i = 0; i < q.a; i++) pics.appendChild(el('span', 'math-bowl', q.sym.repeat(q.b)));
    } else {
        pics.appendChild(el('span', 'math-group', q.sym.repeat(q.a)));
        pics.appendChild(el('span', 'math-op', '÷'));
        pics.appendChild(el('span', 'math-kids', '🧒'.repeat(q.b)));
    }
    if (pics.childNodes.length) box.appendChild(pics);
    if (q.kind === 'dela') box.appendChild(el('div', 'write-lead', 'Dela lika på ' + q.b + ' kompisar'));
    if (q.kind === 'ganger') box.appendChild(el('div', 'write-lead', q.a + ' högar med ' + q.b + ' i varje'));
    const eq = el('div', 'math-eq');
    eq.appendChild(el('span', null, q.a + ' ' + q.op + ' ' + q.b + ' ='));
    const ansEl = el('span', 'math-ans', '?');
    eq.appendChild(ansEl);
    const ear = el('button', 'speak-btn', '🔊');
    ear.setAttribute('aria-label', 'Säg igen');
    ear.onclick = () => { if (!game.locked) { clearTimeout(roundTimer); speak('Hur mycket är ' + q.speech + '?'); } };
    eq.appendChild(ear);
    box.appendChild(eq);
    const pad = el('div', 'keypad');
    function refresh() { ansEl.textContent = math.typed || '?'; ansEl.classList.toggle('empty', !math.typed); }
    function press(k) {
        if (game.locked) return;
        if (k === 'del') math.typed = math.typed.slice(0, -1);
        else if (k === 'ok') { check(); return; }
        else if (math.typed.length < 2) { math.typed = (math.typed + k).replace(/^0+(?=\d)/, ''); clearTimeout(roundTimer); speak(k); }
        refresh();
    }
    ['1','2','3','4','5','6','7','8','9','del','0','ok'].forEach(k => {
        const b = el('button', 'key' + (k === 'ok' ? ' key-ok' : k === 'del' ? ' key-del' : ''), k === 'del' ? '⌫' : k === 'ok' ? '✓' : k);
        if (k === 'del') b.setAttribute('aria-label', 'Sudda');
        if (k === 'ok') b.setAttribute('aria-label', 'Klart');
        b.onclick = () => press(k);
        pad.appendChild(b);
    });
    box.appendChild(pad);
    app.appendChild(box);
    feedbackEl = el('div', 'feedback');
    app.appendChild(feedbackEl);
    refresh();
    async function check() {
        if (game.locked || !math.typed) return;
        const current = scene;
        if (parseInt(math.typed, 10) === q.ans) {
            game.locked = true; game.stars++; saveProgress();
            ansEl.classList.add('ok');
            const sc = document.querySelector('.stars'); if (sc) sc.textContent = '★ ' + game.stars;
            confettiBurst(); setFeedback('Bra jobbat! 🎉', 'good');
            await Promise.all([settings.speech ? speak('Du svarade ' + math.typed + '. Rätt! ' + q.speech + ' är ' + q.ans + '. Bra jobbat!') : playSound('matchSound'), new Promise(r => setTimeout(r, 1100))]);
            if (current !== scene || !MATH_CATS.includes(game.cat)) return;
            game.round++; newMathRound();
        } else {
            ansEl.classList.add('bad'); setFeedback('Försök igen!', 'bad'); speak('Du svarade ' + math.typed + '. Nej, det är fel. Försök igen. Hur mycket är ' + q.speech + '?');
            setTimeout(() => { ansEl.classList.remove('bad'); math.typed = ''; refresh(); setFeedback('', ''); }, 900);
        }
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
    Object.entries(CATEGORIES).filter(([key]) => activeProfile === 'celia' || (key !== 'skriv' && !MATH_CATS.includes(key) && (activeProfile !== 'selma' || ['djur', 'figurer', 'siffror', 'bokstaver'].includes(key)))).forEach(([key, c]) => {
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
        level.onchange = () => { settings.level=level.value; settings.cardCount=level.value==='hard'?16:9; settings.maxRange=level.value==='hard'?100:30; settings.minRange=1; saveSettings(); };
        levelRow.appendChild(level); sheet.appendChild(levelRow);
    }
    const ccRow = el('div', 'settings-row');
    ccRow.appendChild(el('span', null, '🃏 Antal kort'));
    const cc = document.createElement('select');
    (activeProfile === 'selma' ? [2, 3] : [6, 9, 12, 16]).forEach(n => {
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
    if ((activeProfile === 'selma' && !['djur','figurer','siffror','bokstaver',''].includes(h)) || ((h === 'skriv' || MATH_CATS.includes(h)) && activeProfile !== 'celia')) { game.cat = null; renderHome(); return; }
    if (CATEGORIES[h]) { startGame(h); }
    else { game.cat = null; renderHome(); }
}
addEventListener('pagehide', leaveScene);
document.addEventListener('visibilitychange', () => { if(document.hidden) leaveScene(); else if(activeProfile && game.cat && !document.querySelector('.overlay')) newRound(); });
addEventListener('hashchange', route);
route();
