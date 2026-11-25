/* ===== fas 3: Dela lika (båda profilerna) + Visa varför (Celias räknespel) ===== */
(function () {
    if (typeof NXGAMES === 'undefined' || typeof CATEGORIES === 'undefined') return;

    /* Varor: [emoji, sv plural, sv plural bestämd, ar plural] */
    const DELA_ITEMS = [
        ['🍓', 'jordgubbar', 'jordgubbarna', 'فراولات'],
        ['🍎', 'äpplen', 'äpplena', 'تفاحات'],
        ['🍪', 'kakor', 'kakorna', 'كعكات'],
        ['🍇', 'druvor', 'druvorna', 'عنب'],
        ['⚽', 'bollar', 'bollarna', 'كرات'],
        ['🎈', 'ballonger', 'ballongerna', 'بالونات'],
        ['🐟', 'fiskar', 'fiskarna', 'سمكات'],
        ['🌸', 'blommor', 'blommorna', 'ورود'],
        ['⭐', 'stjärnor', 'stjärnorna', 'نجمات'],
        ['🥕', 'morötter', 'morötterna', 'جزرات'],
    ];
    const FRIENDS = ['🧒', '👧', '👦', '🧒🏽'];

    Object.assign(AR_UI, {
        'Dela åt kompisarna': 'قسّم على الأصدقاء',
        'kompisar': 'أصدقاء',
        'Lika många åt alla!': 'نفس العدد للكل!',
        'Resten blir över.': 'والباقي يبقى.',
        '💡 Visa varför': '💡 شوف شلون',
        'Nu provar du!': 'هسه جرّب!',
        'rest': 'باقي',
    });

    Object.assign(CATEGORIES, {
        delalika: { name: 'Dela lika', icon: '🍽️', sub: 'Dela åt kompisarna' },
    });
    SELMA_CATS.push('delalika'); /* inte SELMA_ONLY: båda profilerna får spelet */

    const st = document.createElement('style');
    st.textContent = '.tile.delalika{background:linear-gradient(160deg,#a8e063,#56ab2f)}'
        + '.dela-tray{border:3px dashed #c9c2d6;border-radius:18px;background:#fff8e1;box-sizing:border-box;position:absolute;left:0;top:0;width:100%}'
        + '.dela-tray.over{border-color:#43b581;background:#e9f9ef}'
        + '.dela-tray .b-label{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:34px;opacity:.22;pointer-events:none}'
        + '.dz{position:absolute;background:#fff;border-radius:16px;box-shadow:var(--shadow);border:3px dashed #c9c2d6;box-sizing:border-box}'
        + '.dz.over{border-color:#43b581;background:#e9f9ef}'
        + '.dz .dz-face{position:absolute;top:2px;left:0;right:0;text-align:center;font-size:32px;line-height:1;pointer-events:none}'
        + '.dz .dz-count{position:absolute;top:4px;inset-inline-start:6px;background:#56ab2f;color:#fff;border-radius:999px;font-size:14px;font-weight:800;padding:1px 8px;pointer-events:none;z-index:6}'
        + '.dz.shake{animation:kshake .35s}'
        + '.dela-eq{text-align:center;font-size:30px;font-weight:800;color:#2d2a32;margin:8px 0;direction:ltr}'
        + '.math-box{position:relative}'
        + '.why-wrap{text-align:center;margin:8px 0}'
        + '.why-btn{display:none;border:0;border-radius:999px;background:#f5a623;color:#fff;font:inherit;font-weight:800;font-size:17px;padding:10px 20px;box-shadow:var(--shadow);animation:whypulse 1.2s ease-in-out infinite}'
        + '.why-btn.show{display:inline-block}'
        + '@keyframes whypulse{0%,100%{transform:scale(1)}50%{transform:scale(1.07)}}'
        + '.why-panel{position:absolute;inset:0;background:#fff;border-radius:18px;z-index:30;padding:14px;overflow:auto;display:flex;flex-direction:column;gap:8px;box-shadow:var(--shadow)}'
        + '.why-title{font-weight:800;font-size:18px;color:#2d2a32;text-align:center}'
        + '.why-stage{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;min-height:120px}'
        + '.why-line{font-size:30px;line-height:1.25;letter-spacing:2px;text-align:center;direction:ltr;min-height:40px;word-break:break-all}'
        + '.why-line .off{opacity:.22;text-decoration:line-through}'
        + '.why-bowl{display:inline-block;border:2px dashed #c9c2d6;border-radius:12px;padding:3px 7px;margin:3px;font-size:24px;min-width:40px;min-height:34px;vertical-align:top}'
        + '.why-bowl.fill{border-color:#56ab2f;background:#e9f9ef}'
        + '.why-count{font-size:40px;font-weight:800;color:#56ab2f;min-height:48px;text-align:center;direction:ltr}'
        + '.why-eq{font-size:32px;font-weight:800;text-align:center;direction:ltr;color:#2d2a32}'
        + '.why-close{align-self:center;border:0;border-radius:999px;background:#43b581;color:#fff;font:inherit;font-weight:800;font-size:17px;padding:12px 26px;box-shadow:var(--shadow)}';
    document.head.appendChild(st);

    const dnum = n => (lang === 'ar' ? N(n) : (n <= 12 ? nw(n) : String(n)));
    const dclip = n => (lang === 'ar' ? N(n) : String(n));

    /* ---------- Dela lika ---------- */
    function gDelaLika() {
        const L = lvl();
        const selma = activeProfile === 'selma';
        /* Konfigurationer per nivå: [k kompisar, per var, rest] */
        let configs;
        if (selma) configs = [[[2, 2, 0], [2, 3, 0]], [[2, 3, 0], [2, 4, 0]], [[3, 2, 0], [3, 3, 0]], [[3, 3, 0], [4, 3, 0]]][L - 1];
        else configs = [[[2, 3, 0], [2, 4, 0]], [[3, 2, 0], [3, 3, 0], [3, 4, 0]], [[4, 2, 0], [4, 3, 0], [3, 4, 0]], [[2, 3, 1], [2, 4, 1], [3, 2, 1], [3, 3, 2], [4, 2, 1], [4, 3, 3]]][L - 1];
        const pool = [];
        DELA_ITEMS.forEach(it => configs.forEach(c => pool.push(it[0] + ':' + c[0] + ':' + c[1] + ':' + c[2])));
        const drawn = bagTake(pool, 1, game.lastKey, 'delalika', () => lget('miss', []));
        game.exhausted = drawn.exhausted;
        const key = drawn.keys[0];
        game.review = lget('miss', []).indexOf(key) !== -1;
        game.lastKey = key; game.locked = false;
        const kp = key.split(':');
        const face = kp[0], k = parseInt(kp[1], 10), per = parseInt(kp[2], 10), rest = parseInt(kp[3], 10);
        const n = k * per + rest;
        const item = DELA_ITEMS.find(x => x[0] === face);
        const itemsName = lang === 'ar' ? item[3] : item[1];

        const promptText = lang === 'ar'
            ? 'قسّم ' + N(n) + ' ' + itemsName + ' بالتساوي على ' + N(k) + ' ' + T('kompisar') + '!' + (rest ? ' ' + T('Resten blir över.') : '')
            : 'Dela ' + dnum(n) + ' ' + itemsName + ' lika mellan ' + dnum(k) + ' ' + T('kompisar') + '!' + (rest ? ' ' + T('Resten blir över.') : '');
        const body = nxFrame();
        body.appendChild(promptBar(promptText, '', () => speak(promptText)));
        if (!selma) {
            const eq = el('div', 'dela-eq', n + ' ÷ ' + k + ' = ?');
            body.appendChild(eq);
        }

        const W = Math.min(innerWidth - 24, 430);
        const SZ = 44;
        const stage = el('div', 'nx-stage');
        stage.style.width = W + 'px'; stage.style.margin = '8px auto';
        body.appendChild(stage);

        /* Korgen (brickan) överst */
        const perRow = Math.max(4, Math.floor((W - 16) / (SZ + 6)));
        const trayRows = Math.ceil(n / perRow);
        const trayH = trayRows * (SZ + 6) + 14;
        const tray = el('div', 'dela-tray');
        tray.style.height = trayH + 'px';
        tray.appendChild(el('div', 'b-label', '🧺'));
        stage.appendChild(tray);

        /* Kompiszonerna under */
        const zoneTop = trayH + 16;
        const zoneW = Math.floor((W - (k - 1) * 8) / k);
        const zoneH = 46 + Math.ceil(Math.max(per + rest, 2) / 2) * (SZ * 0.62) + 12;
        const zones = [];
        for (let z = 0; z < k; z++) {
            const dz = el('div', 'dz');
            dz.style.left = (z * (zoneW + 8)) + 'px';
            dz.style.top = zoneTop + 'px';
            dz.style.width = zoneW + 'px';
            dz.style.height = zoneH + 'px';
            dz.appendChild(el('div', 'dz-face', FRIENDS[z % FRIENDS.length]));
            const cnt = el('div', 'dz-count', '0');
            dz.appendChild(cnt);
            stage.appendChild(dz);
            zones.push({ el: dz, cnt });
        }
        stage.style.height = (zoneTop + zoneH + 8) + 'px';
        const eq2 = (!selma) ? body.querySelector('.dela-eq') : null;

        const items = [];
        for (let i = 0; i < n; i++) items.push({ owner: 'tray' });

        const layout = () => {
            const inTray = items.filter(it => it.owner === 'tray');
            inTray.forEach((it, i) => {
                it.tx = 8 + (i % perRow) * (SZ + 6);
                it.ty = 7 + Math.floor(i / perRow) * (SZ + 6);
            });
            zones.forEach((z, zi) => {
                const own = items.filter(it => it.owner === zi);
                own.forEach((it, i) => {
                    it.tx = zones[zi].el.offsetLeft + 8 + (i % 2) * (SZ * 0.72);
                    it.ty = zoneTop + 42 + Math.floor(i / 2) * (SZ * 0.62);
                });
                z.cnt.textContent = String(own.length);
            });
        };
        const counts = () => zones.map((z, zi) => items.filter(it => it.owner === zi).length);
        const trayCount = () => items.filter(it => it.owner === 'tray').length;

        const solved = () => counts().every(c => c === per) && trayCount() === rest;
        const noMoreMoves = () => trayCount() === 0;

        const finishIfDone = () => {
            if (!solved()) return false;
            missDel(key); levelStep(true);
            if (eq2) eq2.textContent = n + ' ÷ ' + k + ' = ' + per + (rest ? '  (' + rest + ' ' + T('rest') + ')' : '');
            nxRight([dclip(per), T('Rätt!')], dnum(per) + '. ' + T('Rätt!'));
            return true;
        };
        const checkWrong = () => {
            if (solved() || !noMoreMoves()) return;
            /* Brickan är tom men fördelningen är fel */
            missAdd(key); levelStep(false);
            const cs = counts();
            zones.forEach((z, zi) => {
                if (cs[zi] !== per) { z.el.classList.remove('shake'); void z.el.offsetWidth; z.el.classList.add('shake'); }
            });
            const hint = rest ? T('Resten blir över.') : T('Lika många åt alla!');
            setFeedback(T('Försök igen!'), 'bad');
            feedbackFx(false, [T('Nej, det är fel.')], T('Nej, det är fel.')).then(() => { if (!game.locked) speak(hint); });
            const cur = scene;
            clearTimeout(feedbackTimer);
            feedbackTimer = setTimeout(() => { if (cur === scene) setFeedback('', ''); }, 1400);
        };

        layout();
        items.forEach((it, idx) => {
            const d = el('div', 'nx-drag', face);
            d.style.cssText = 'left:0px;top:0px;width:' + SZ + 'px;height:' + SZ + 'px;font-size:' + Math.floor(SZ * 0.62) + 'px;line-height:1';
            const place = (x, y, anim) => {
                d.style.transition = anim ? 'left .25s,top .25s' : 'none';
                d.style.left = x + 'px'; d.style.top = y + 'px';
            };
            place(it.tx, it.ty, false);
            if (it.owner === 'tray') d.style.zIndex = 2;
            stage.appendChild(d);
            it.el = d;
            let stt = null;
            const zoneAt = (cx, cy) => {
                for (let zi = 0; zi < zones.length; zi++) {
                    const r = zones[zi].el.getBoundingClientRect();
                    const sr = stage.getBoundingClientRect();
                    if (cx > r.left - sr.left && cx < r.right - sr.left && cy > r.top - sr.top && cy < r.bottom - sr.top) return zi;
                }
                return -1;
            };
            const overTray = (cx, cy) => {
                const r = tray.getBoundingClientRect(), sr = stage.getBoundingClientRect();
                return cx > r.left - sr.left && cx < r.right - sr.left && cy > r.top - sr.top && cy < r.bottom - sr.top;
            };
            d.onpointerdown = e => {
                e.preventDefault();
                if (game.locked) return;
                clearTimeout(roundTimer);
                try { d.setPointerCapture(e.pointerId); } catch (x) {}
                stt = { sx: e.clientX, sy: e.clientY, ox: parseFloat(d.style.left), oy: parseFloat(d.style.top), moved: false };
                d.style.transition = 'none'; d.style.zIndex = 20;
            };
            d.onpointermove = e => {
                if (!stt) return;
                const sr = stage.getBoundingClientRect();
                const dx = e.clientX - stt.sx, dy = e.clientY - stt.sy;
                if (Math.abs(dx) + Math.abs(dy) > 8) stt.moved = true;
                d.style.left = (stt.ox + dx) + 'px'; d.style.top = (stt.oy + dy) + 'px';
                const cx = e.clientX - sr.left, cy = e.clientY - sr.top;
                const zi = zoneAt(cx, cy);
                zones.forEach((z, i) => z.el.classList.toggle('over', i === zi));
                tray.classList.toggle('over', zi < 0 && overTray(cx, cy));
            };
            d.onpointerup = d.onpointercancel = e => {
                if (!stt) return;
                const s = stt; stt = null;
                zones.forEach(z => z.el.classList.remove('over'));
                tray.classList.remove('over');
                const sr = stage.getBoundingClientRect();
                const cx = e.clientX - sr.left, cy = e.clientY - sr.top;
                const zi = s.moved ? zoneAt(cx, cy) : -1;
                const toTray = s.moved && zi < 0 && overTray(cx, cy);
                const before = it.owner;
                if (zi >= 0 && it.owner !== zi) it.owner = zi;
                else if (toTray && it.owner !== 'tray') it.owner = 'tray';
                layout();
                items.forEach(x => {
                    x.el.classList.toggle('inb', x.owner !== 'tray');
                    x.el.style.zIndex = x.owner === 'tray' ? 2 : 3;
                    x.el.style.transition = 'left .25s,top .25s';
                    x.el.style.left = x.tx + 'px';
                    x.el.style.top = x.ty + 'px';
                });
                if (before !== it.owner) {
                    playSound('clickSound');
                    if (!finishIfDone()) {
                        if (typeof it.owner === 'number') {
                            const c = counts()[it.owner];
                            speak(lang === 'ar' ? N(c) : (c <= 12 ? nw(c) : String(c)));
                        }
                        checkWrong();
                    }
                }
            };
        });
        window.__delaDebug = () => ({ key, k, per, rest, n, counts: counts(), tray: trayCount(), locked: game.locked, stars: game.stars });
        autoSay(() => speak(promptText));
    }

    NXGAMES.delalika = gDelaLika;

    /* ---------- Visa varför: stegvis visuell förklaring i Celias räknespel ---------- */
    const WHY_CATS = typeof MATH_CATS !== 'undefined' ? MATH_CATS : ['plusminus', 'ganger', 'dela', 'blandat'];

    function whyBtn() { return document.querySelector('.why-btn'); }

    function sleep(ms, cur) {
        return new Promise(res => setTimeout(() => res(cur === scene), ms));
    }
    async function sayStep(text, cur) {
        if (cur !== scene) return false;
        if (!settings.speech || settings.volume === 0) return sleep(380, cur);
        await speak(text);
        return cur === scene;
    }

    async function runWhy(btn) {
        const q = math.q;
        if (!q || game.locked) return;
        game.locked = true;
        clearTimeout(roundTimer); clearTimeout(feedbackTimer);
        stopSpeech();
        btn.classList.remove('show');
        const box = document.querySelector('.math-box');
        if (!box) { game.locked = false; return; }
        const cur = scene;
        const panel = el('div', 'why-panel');
        panel.appendChild(el('div', 'why-title', T('💡 Visa varför')));
        const stage = el('div', 'why-stage');
        const line = el('div', 'why-line', '');
        const countEl = el('div', 'why-count', '');
        const eqEl = el('div', 'why-eq', '');
        stage.appendChild(line); stage.appendChild(countEl);
        panel.appendChild(stage);
        panel.appendChild(eqEl);
        const close = el('button', 'why-close', T('Nu provar du!'));
        close.style.display = 'none';
        panel.appendChild(close);
        box.appendChild(panel);

        const done = () => {
            if (cur !== scene) return;
            if (panel.parentNode) panel.parentNode.removeChild(panel);
            if (MATH_CATS.includes(game.cat)) {
                game.locked = false;
                math.typed = '';
                const ans = document.querySelector('.math-ans');
                if (ans) { ans.textContent = '?'; ans.classList.add('empty'); ans.classList.remove('bad'); }
            }
        };
        close.onclick = done;

        const sym = q.sym;
        try {
            if (q.kind === 'plusminus' && q.op === '+') {
                /* Visa a saker, lägg till b en i taget och räkna vidare */
                line.textContent = sym.repeat(q.a);
                if (!await sayStep(dclip(q.a), cur)) throw 0;
                for (let i = 1; i <= q.b; i++) {
                    line.textContent = sym.repeat(q.a) + ' ' + sym.repeat(i);
                    countEl.textContent = String(q.a + i);
                    if (!await sayStep(dclip(q.a + i), cur)) throw 0;
                }
            } else if (q.kind === 'plusminus') {
                /* Visa a saker, stryk b en i taget och räkna bakåt */
                line.textContent = sym.repeat(q.a);
                if (!await sayStep(dclip(q.a), cur)) throw 0;
                for (let i = 1; i <= q.b; i++) {
                    const left = q.a - i;
                    line.innerHTML = '';
                    const gone = el('span', 'off', sym.repeat(i));
                    line.appendChild(gone);
                    line.appendChild(document.createTextNode(sym.repeat(left)));
                    countEl.textContent = String(left);
                    if (!await sayStep(dclip(left), cur)) throw 0;
                }
            } else if (q.kind === 'ganger') {
                /* Fyll a skålar med b i taget, räkna löpande summa */
                const bowls = [];
                for (let i = 0; i < q.a; i++) { const b = el('span', 'why-bowl', ''); line.appendChild(b); bowls.push(b); }
                for (let i = 0; i < q.a; i++) {
                    bowls[i].textContent = sym.repeat(q.b);
                    bowls[i].classList.add('fill');
                    countEl.textContent = String(q.b * (i + 1));
                    if (!await sayStep(dclip(q.b * (i + 1)), cur)) throw 0;
                }
            } else {
                /* Dela: fördela a saker på b tallrikar en i taget, räkna en tallrik */
                const plates = [];
                const countsArr = [];
                for (let i = 0; i < q.b; i++) { const p = el('span', 'why-bowl', ''); line.appendChild(p); plates.push(p); countsArr.push(0); }
                for (let i = 0; i < q.a; i++) {
                    const pi = i % q.b;
                    countsArr[pi]++;
                    plates[pi].textContent = sym.repeat(countsArr[pi]);
                    if (!await sleep(300, cur)) throw 0;
                }
                plates.forEach(p => p.classList.add('fill'));
                for (let i = 1; i <= q.ans; i++) {
                    countEl.textContent = String(i);
                    if (!await sayStep(dclip(i), cur)) throw 0;
                }
            }
            eqEl.textContent = q.a + ' ' + q.op + ' ' + q.b + ' = ' + q.ans;
            countEl.textContent = '';
            if (cur !== scene) return;
            speakSeq(lang === 'ar' ? mathQ(q).concat([N(q.ans)]) : mathQ(q).concat([String(q.ans)]), mathFb(q) + ' ' + q.ans);
            close.style.display = '';
            close.focus();
        } catch (e) {
            /* avbruten (ny scen) */
        }
        if (cur === scene) close.style.display = '';
    }

    /* Knappen dyker upp efter ett fel svar i räknespelen. */
    const _ffb3 = feedbackFx;
    feedbackFx = function (right, parts, fb) {
        if (!right && WHY_CATS.includes(game.cat)) {
            const b = whyBtn();
            if (b) b.classList.add('show');
        }
        return _ffb3(right, parts, fb);
    };

    const _smr3 = startMathRound;
    startMathRound = function (q) {
        _smr3(q);
        const box = document.querySelector('.math-box');
        if (!box || box.querySelector('.why-wrap')) return;
        const wrap = el('div', 'why-wrap');
        const b = el('button', 'why-btn', T('💡 Visa varför'));
        b.setAttribute('aria-label', T('💡 Visa varför'));
        b.onclick = () => runWhy(b);
        wrap.appendChild(b);
        const pad = box.querySelector('.keypad');
        box.insertBefore(wrap, pad || null);
    };

    try { route(); } catch (e) {}
})();
