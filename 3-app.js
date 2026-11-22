/* Celia och Selmas Spel.
   Ren HTML/CSS/JS, inga externa tjänster förutom teckensnitt och egna ljudfiler. */

const SITE_NAME = 'Celia och Selmas Spel';
const ROUNDS_PER_GAME = 5;

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
        const raw = localStorage.getItem('cs-settings');
        if (raw) return Object.assign({}, DEFAULT_SETTINGS, JSON.parse(raw));
    } catch (e) { /* enhets-lokal lagring kan saknas */ }
    return Object.assign({}, DEFAULT_SETTINGS);
}
function saveSettings() {
    try { localStorage.setItem('cs-settings', JSON.stringify(settings)); } catch (e) {}
}

/* ---------- ljud och tal ---------- */
function playSound(id) {
    const el = document.getElementById(id);
    if (!el) return;
    try { el.volume = settings.volume; el.currentTime = 0; el.play().catch(() => {}); } catch (e) {}
}
function applyMusic() {
    const music = document.getElementById('backgroundMusic');
    if (!music) return;
    music.volume = settings.volume;
    if (settings.music) music.play().catch(() => {}); else music.pause();
}
function speak(text) {
    if (!settings.speech) return;
    try {
        speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'sv-SE';
        u.rate = 0.95;
        u.volume = settings.volume;
        speechSynthesis.speak(u);
    } catch (e) {}
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
        values = sample(FIGURES, n).map(([face, name]) => ({ face, key: face, prompt: 'Hitta figuren', name, speech: 'Hitta ' + name }));
    } else if (cat === 'djur') {
        values = sample(ANIMALS, n).map(([face, name]) => ({ face, key: face, prompt: 'Hitta djuret', name, speech: 'Hitta ' + name }));
    }
    return { values };
}

function newRound() {
    const built = buildRound();
    if (built.error) { renderGame(built.error); return; }
    game.values = built.values;
    game.target = built.values[Math.floor(Math.random() * built.values.length)];
    game.locked = false;
    renderGame();
    setTimeout(() => speak(game.target.speech), 350);
}

function startGame(cat) {
    game.cat = cat;
    game.round = 1;
    game.stars = 0;
    newRound();
}

function onCardTap(key, btn) {
    if (game.locked) return;
    playSound('clickSound');
    if (key === game.target.key) {
        game.locked = true;
        game.stars += 1;
        btn.classList.add('correct');
        playSound('matchSound');
        confettiBurst();
        setFeedback('Bra jobbat! 🎉', 'good');
        speak('Bra jobbat!');
        setTimeout(() => {
            if (game.round >= ROUNDS_PER_GAME) renderCelebration();
            else { game.round += 1; newRound(); }
        }, 1400);
    } else {
        btn.classList.add('wrong');
        setFeedback('Försök igen!', 'bad');
        speak('Försök igen');
        setTimeout(() => { btn.classList.remove('wrong'); setFeedback('', ''); }, 900);
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
    const hero = el('div', 'hero');
    hero.appendChild(el('h1', null, 'Vad vill ni leka idag?'));
    hero.appendChild(el('p', null, 'Fem roliga spel att lära sig med.'));
    app.appendChild(hero);
    const tiles = el('div', 'tiles');
    Object.entries(CATEGORIES).forEach(([key, c]) => {
        const t = el('button', 'tile ' + key);
        t.appendChild(el('span', 'emoji', c.icon));
        t.appendChild(el('span', 'label', c.name));
        t.appendChild(el('span', 'sub', c.sub));
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
    head.appendChild(el('div', 'stars', '★'.repeat(game.stars) + '☆'.repeat(Math.max(0, ROUNDS_PER_GAME - game.stars))));
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
    txt.appendChild(el('div', 'name', t.name || t.face));
    prompt.appendChild(txt);
    const again = el('button', 'speak-btn', '🔊');
    again.setAttribute('aria-label', 'Säg igen');
    again.onclick = () => speak(t.speech);
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

function renderCelebration() {
    const overlay = el('div', 'overlay');
    const sheet = el('div', 'sheet');
    sheet.appendChild(el('div', 'big-stars', '★'.repeat(game.stars) + '☆'.repeat(ROUNDS_PER_GAME - game.stars)));
    sheet.appendChild(el('h3', null, game.stars === ROUNDS_PER_GAME ? 'Full pott!' : 'Snyggt spelat!'));
    sheet.appendChild(el('p', null, 'Ni hittade rätt ' + game.stars + ' av ' + ROUNDS_PER_GAME + ' gånger.'));
    const row = el('div', 'btn-row');
    const again = el('button', 'btn', 'Spela igen');
    again.onclick = () => startGame(game.cat);
    const home = el('button', 'btn secondary', 'Hem');
    home.onclick = () => { location.hash = '#/'; };
    row.appendChild(again);
    row.appendChild(home);
    sheet.appendChild(row);
    overlay.appendChild(sheet);
    app.appendChild(overlay);
    speak(game.stars === ROUNDS_PER_GAME ? 'Full pott! Grattis!' : 'Snyggt spelat!');
    confettiBurst(1.6);
}

function renderSettings() {
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
    sp.onchange = () => { settings.speech = sp.checked; saveSettings(); };
    spRow.appendChild(sp);
    sheet.appendChild(spRow);

    const hintRow = el('div', 'settings-row');
    hintRow.appendChild(el('span', null, '🖼️ Visa ledtråd'));
    const hint = document.createElement('input');
    hint.type = 'checkbox'; hint.checked = settings.showHint;
    hint.onchange = () => { settings.showHint = hint.checked; saveSettings(); };
    hintRow.appendChild(hint);
    sheet.appendChild(hintRow);

    const ccRow = el('div', 'settings-row');
    ccRow.appendChild(el('span', null, '🃏 Antal kort'));
    const cc = document.createElement('select');
    [6, 9, 12].forEach(n => {
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
    try { speechSynthesis.cancel(); } catch (e) {}
    if (CATEGORIES[h]) { startGame(h); }
    else { game.cat = null; renderHome(); }
}
addEventListener('hashchange', route);
route();
