/* ===== fas 2: Affären och Dra och räkna (båda profilerna) ===== */
(function () {
    if (typeof NXGAMES === 'undefined' || typeof CATEGORIES === 'undefined') return;

    /* Varor: [emoji, bestämd form, plural, arabisk bestämd, arabisk plural, obestämd singular, är-ett-ord] */
    const SHOP = [
        ['🍎', 'äpplet', 'äpplen', 'التفاحة', 'تفاحات', 'äpple', true],
        ['🍌', 'bananen', 'bananer', 'الموزة', 'موزات', 'banan', false],
        ['🍓', 'jordgubben', 'jordgubbar', 'الفراولة', 'فراولات', 'jordgubbe', false],
        ['🍞', 'brödet', 'bröd', 'الخبز', 'خبز', 'bröd', true],
        ['🥕', 'moroten', 'morötter', 'الجزرة', 'جزرات', 'morot', false],
        ['🍦', 'glassen', 'glassar', 'البوظة', 'بوظات', 'glass', false],
        ['🥛', 'mjölken', 'mjölk', 'الحليب', 'حليب', 'mjölkpaket', true],
        ['🍪', 'kakan', 'kakor', 'الكليجة', 'كعكات', 'kaka', false],
        ['🍇', 'druvorna', 'druvor', 'العنب', 'عنب', 'druva', false],
        ['🍊', 'apelsinen', 'apelsiner', 'البرتقالة', 'برتقالات', 'apelsin', false],
        ['🧀', 'osten', 'ostar', 'الجبن', 'جبن', 'ost', false],
        ['🥚', 'ägget', 'ägg', 'البيضة', 'بيضات', 'ägg', true],
    ];
    const shopByFace = {}; SHOP.forEach(r => { shopByFace[r[0]] = r; });
    const kr = () => (lang === 'ar' ? 'كرون' : 'kr');
    const itemName = (f, plural) => { const r = shopByFace[f]; return lang === 'ar' ? (plural ? r[4] : r[3]) : (plural ? r[2] : r[1]); };
    const itemCounted = (f, n) => { const r = shopByFace[f]; if (lang === 'ar') return numW(n) + ' ' + (n === 1 ? r[3] : r[4]); return n === 1 ? (r[6] ? 'ett ' : 'en ') + r[5] : numW(n) + ' ' + r[2]; };
    const numW = n => (lang === 'ar' ? N(n) : (n <= 12 ? nw(n) : String(n)));

    Object.assign(AR_UI, {
        'Affären': 'المحل', 'Handla efter listan': 'تسوّق من القائمة',
        'Dra och räkna': 'اسحب وعدّ', 'Lägg rätt antal i korgen': 'حط العدد الصحيح بالسلة',
        'Handla:': 'اشتري:', 'Hur mycket kostar allt?': 'شكد يكلف كلشي؟',
        'Du betalar med': 'تدفع', 'kronor. Hur mycket får du tillbaka?': 'كرون. شكد يرجعلك؟',
        'Lägg': 'حط', 'i korgen': 'بالسلة',
        'Lägg till så det blir': 'زيد حتى يصير', 'Ta bort så det blir': 'شيل حتى يصير',
        'För många!': 'هواية!', 'Det räcker!': 'يكفي!',
    });

    Object.assign(CATEGORIES, {
        affar: { name: 'Affären', icon: '🛒', sub: 'Handla efter listan' },
        rakna: { name: 'Dra och räkna', icon: '🧺', sub: 'Lägg rätt antal i korgen' },
    });
    SELMA_CATS.push('affar', 'rakna');

    const st = document.createElement('style');
    st.textContent = '.tile.affar{background:linear-gradient(160deg,#ffd36e,#f08a24)}.tile.rakna{background:linear-gradient(160deg,#8be0c8,#2aa78a)}'
        + '.shop-list{background:#fff;border-radius:18px;padding:12px 14px;margin:10px 0;box-shadow:var(--shadow)}'
        + '.shop-row{display:flex;align-items:center;gap:10px;font-size:20px;font-weight:800;padding:6px 2px;color:#2d2a32}'
        + '.shop-row .s-emo{font-size:30px;line-height:1}'
        + '.shop-row .s-price{margin-inline-start:auto;font-size:17px;color:#6d6880}'
        + '.shop-row.done{opacity:.45;text-decoration:line-through}'
        + '.shop-row .s-check{margin-inline-start:auto;color:#43b581;font-size:22px}'
        + '.shop-shelf{display:grid;grid-template-columns:repeat(auto-fill,minmax(84px,1fr));gap:10px;margin:12px 0}'
        + '.shop-card{position:relative;min-height:88px;border:0;border-radius:16px;background:#fff;box-shadow:var(--shadow);font-size:40px;display:flex;align-items:center;justify-content:center;touch-action:manipulation;-webkit-tap-highlight-color:transparent}'
        + '.shop-card .badge{position:absolute;top:4px;inset-inline-end:6px;background:#f5a623;color:#fff;border-radius:999px;font-size:14px;font-weight:800;padding:1px 8px}'
        + '.shop-card.done{opacity:.4}'
        + '.shop-card.shake{animation:kshake .35s}'
        + '.basket-zone{position:relative;border:3px dashed #c9c2d6;border-radius:18px;background:#fff8e1;box-sizing:border-box}'
        + '.basket-zone .b-label{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:44px;opacity:.25;pointer-events:none}'
        + '.basket-zone.over{border-color:#43b581;background:#e9f9ef}'
        + '.nx-drag{position:absolute;display:flex;align-items:center;justify-content:center;background:#fff;border-radius:14px;box-shadow:0 4px 12px rgba(45,42,50,.25);touch-action:none;cursor:grab;-webkit-user-select:none;user-select:none;z-index:5;box-sizing:border-box}'
        + '.nx-drag.inb{box-shadow:none;background:transparent}'
        + '.nx-drag.shake{animation:kshake .35s}'
        + '.nx-count{text-align:center;font-size:22px;font-weight:800;color:#2d2a32;margin:4px 0}';
    document.head.appendChild(st);

    function combos(faces, n) {
        const out = [];
        (function rec(i, acc) {
            if (acc.length === n) { out.push(acc.join('+')); return; }
            for (let j = i; j < faces.length; j++) { acc.push(faces[j]); rec(j + 1, acc); acc.pop(); }
        })(0, []);
        return out;
    }

    /* ---------- Affären ---------- */
    function gAffarSelma() {
        const L = lvl();
        const nItems = L === 1 ? 2 : 3;
        const faces = SHOP.map(r => r[0]);
        let pool = combos(faces, nItems);
        if (pool.length > 160) pool = sample(pool, 160);
        const drawn = bagTake(pool, 1, game.lastKey, 'affar-s', () => lget('miss', []));
        game.exhausted = drawn.exhausted;
        const key = drawn.keys[0];
        game.review = lget('miss', []).indexOf(key) !== -1;
        game.lastKey = key; game.locked = false;
        const list = key.split('+');
        const need = {};
        list.forEach(f => { need[f] = 1; });
        if (L === 2) need[list[rn(list.length)]] = 2;
        if (L === 3) { need[list[rn(list.length)]] = 2; if (Math.random() < 0.5) need[list[rn(list.length)]] = 2; }
        if (L >= 4) { need[list[0]] = 1 + rn(2); need[list[1]] = 1 + rn(2); need[list[2]] = 1 + rn(3); }
        const nDist = L === 1 ? 2 : 3;
        const distr = sample(faces.filter(f => !need[f]), nDist);
        const body = nxFrame();
        const listText = list.map(f => itemCounted(f, need[f])).join(lang === 'ar' ? ' و ' : ' och ');
        const promptText = T('Handla:') + ' ' + listText;
        body.appendChild(promptBar(T('Handla:'), '', () => speak(promptText)));
        const listEl = el('div', 'shop-list');
        const rows = {};
        list.forEach(f => {
            const r = el('div', 'shop-row');
            r.appendChild(el('span', 's-emo', f));
            r.appendChild(el('span', null, itemCounted(f, need[f])));
            const chk = el('span', 's-check', ''); r.appendChild(chk);
            rows[f] = { row: r, chk };
            listEl.appendChild(r);
        });
        body.appendChild(listEl);
        const shelf = el('div', 'shop-shelf'); body.appendChild(shelf);
        const left = {}; Object.keys(need).forEach(f => { left[f] = need[f]; });
        let done = 0; const total = list.length;
        sample(list.concat(distr), list.length + distr.length).forEach(f => {
            const c = el('button', 'shop-card'); c.appendChild(el('span', 'emoji', f));
            const badge = need[f] > 1 ? el('span', 'badge', '×' + need[f]) : null;
            if (badge) c.appendChild(badge);
            c.setAttribute('aria-label', itemName(f, false));
            c.onclick = () => {
                if (game.locked) return; clearTimeout(roundTimer); stopSpeech();
                if (need[f] && left[f] > 0) {
                    left[f]--;
                    playSound('clickSound');
                    if (left[f] === 0) {
                        c.classList.add('done'); if (badge) badge.remove();
                        rows[f].row.classList.add('done'); rows[f].chk.textContent = '✔';
                        done++;
                    } else if (badge) badge.textContent = '×' + left[f];
                    if (done === total) { missDel(key); levelStep(true); nxRight([itemName(f, false), T('Rätt!')], itemName(f, false) + '. ' + T('Rätt!')); }
                    else speak(itemName(f, false));
                } else {
                    missAdd(key); levelStep(false);
                    c.classList.remove('shake'); void c.offsetWidth; c.classList.add('shake');
                    setFeedback(T('Försök igen!'), 'bad');
                    speak(itemName(f, false));
                }
            };
            shelf.appendChild(c);
        });
        autoSay(() => speak(promptText));
    }

    function gAffarCelia() {
        const L = lvl();
        const faces = SHOP.map(r => r[0]);
        const nItems = L === 1 ? 2 : 3;
        let pool = combos(faces, nItems);
        if (pool.length > 120) pool = sample(pool, 120);
        const changeMode = L >= 3 && game.round % 2 === 0;
        if (changeMode) pool = pool.map(k => 'v:' + k);
        const drawn = bagTake(pool, 1, game.lastKey, 'affar-c', () => lget('miss', []));
        game.exhausted = drawn.exhausted;
        let key = drawn.keys[0];
        game.review = lget('miss', []).indexOf(key) !== -1;
        game.lastKey = key; game.locked = false;
        const list = key.replace(/^v:/, '').split('+');
        const maxP = L === 1 ? 5 : 9;
        const rows = list.map(f => ({ f, price: 1 + rn(maxP), qty: 1 }));
        if (L === 2) rows[rn(rows.length)].qty = 2;
        if (L === 3) { rows[rn(rows.length)].qty = 2; }
        if (L >= 4) { rows[rn(rows.length)].qty = 2; if (Math.random() < 0.5) rows[rn(rows.length)].qty = 3; }
        let total = rows.reduce((s, r) => s + r.price * r.qty, 0);
        const pay = L >= 4 ? 50 : 20;
        if (changeMode) {
            let guard = 60;
            while (total >= pay && guard-- > 0) {
                const r = rows[rn(rows.length)];
                if (r.qty > 1) r.qty--; else if (r.price > 1) r.price--;
                total = rows.reduce((s, x) => s + x.price * x.qty, 0);
            }
        }
        const answer = changeMode ? pay - total : total;
        const body = nxFrame(); body.classList.add('nx-k2');
        const promptText = changeMode
            ? T('Du betalar med') + ' ' + numW(pay) + ' ' + T('kronor. Hur mycket får du tillbaka?')
            : T('Hur mycket kostar allt?');
        body.appendChild(promptBar(promptText, '', () => speak(promptText)));
        const listEl = el('div', 'shop-list');
        rows.forEach(r => {
            const row = el('div', 'shop-row');
            row.appendChild(el('span', 's-emo', r.f));
            row.appendChild(el('span', null, itemCounted(r.f, r.qty)));
            row.appendChild(el('span', 's-price', r.price + ' ' + kr() + (r.qty > 1 ? ' × ' + r.qty : '')));
            listEl.appendChild(row);
        });
        body.appendChild(listEl);
        if (changeMode) {
            const payRow = el('div', 'shop-row');
            payRow.appendChild(el('span', 's-emo', '💶'));
            payRow.appendChild(el('span', null, T('Du betalar med')));
            payRow.appendChild(el('span', 's-price', pay + ' ' + kr()));
            listEl.appendChild(payRow);
        }
        let val = '';
        const disp = el('div', 'nx-timein'); disp.dir = 'ltr';
        const tf = el('button', 'nx-tf on', '–'); tf.style.minWidth = '110px';
        disp.appendChild(tf); body.appendChild(disp);
        const draw = () => { tf.textContent = val ? val + ' ' + kr() : '–'; };
        const pad = el('div', 'nx-pad'); pad.dir = 'ltr';
        const press = d => {
            if (game.locked) return; clearTimeout(roundTimer);
            if (d === 'del') { val = val.slice(0, -1); draw(); return; }
            if (d === 'ok') {
                if (!val) return;
                stopSpeech();
                if (parseInt(val, 10) === answer) { missDel(key); levelStep(true); nxRight([numW(answer), T('Rätt!')], answer + ' kronor. ' + T('Rätt!')); }
                else { missAdd(key); levelStep(false); nxWrong([T('Nej, det är fel.')], T('Nej, det är fel.')); val = ''; draw(); }
                return;
            }
            if (val.length < 3) { val += d; draw(); }
        };
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'del', '0', 'ok'].forEach(k => {
            const b = el('button', 'nx-key' + (k === 'ok' ? ' ok' : ''), k === 'del' ? '⌫' : k === 'ok' ? '✔' : k);
            b.onclick = () => press(k); pad.appendChild(b);
        });
        body.appendChild(pad); draw();
        autoSay(() => speak(promptText));
    }

    function gAffar() { if (activeProfile === 'selma') gAffarSelma(); else gAffarCelia(); }

    /* ---------- Dra och räkna ---------- */
    function gRakna() {
        const L = lvl();
        const celia = activeProfile !== 'selma';
        const faces = SHOP.map(r => r[0]);
        let pool, key, face, face2, target, start;
        if (!celia) {
            target = [2, 3, 4, 5][L - 1] + (Math.random() < 0.5 ? 1 : 0); // L1:2-3 ... L4:5-6
            const twoKinds = L >= 3;
            pool = [];
            faces.forEach(f => { for (let t = Math.max(2, target - 1); t <= target + 1; t++) pool.push(f + ':' + t); });
            const drawn = bagTake(pool, 1, game.lastKey, 'rakna-s', () => lget('miss', []));
            game.exhausted = drawn.exhausted;
            key = drawn.keys[0];
            face = key.split(':')[0]; target = parseInt(key.split(':')[1], 10);
            start = 0;
            face2 = twoKinds ? (faces.filter(f => f !== face))[rn(faces.length - 1)] : null;
        } else {
            const addMode = L < 3 || game.round % 2 === 1;
            pool = [];
            faces.forEach(f => {
                if (addMode) { for (let s = 1; s <= 3; s++) for (let a = 2; a <= 3 + L; a++) pool.push(f + ':' + s + '>' + (s + a)); }
                else { for (let t = 1; t <= 4; t++) for (let r = 2; r <= 3; r++) pool.push(f + ':' + (t + r) + '>' + t); }
            });
            if (pool.length > 300) pool = sample(pool, 300);
            const drawn = bagTake(pool, 1, game.lastKey, 'rakna-c', () => lget('miss', []));
            game.exhausted = drawn.exhausted;
            key = drawn.keys[0];
            const kp = key.split(':');
            face = kp[0];
            const sp = kp[1].split('>');
            start = parseInt(sp[0], 10); target = parseInt(sp[1], 10);
            face2 = null;
        }
        game.review = lget('miss', []).indexOf(key) !== -1;
        game.lastKey = key; game.locked = false;

        const plural = target !== 1;
        const promptText = celia
            ? (start < target ? T('Lägg till så det blir') : T('Ta bort så det blir')) + ' ' + numW(target)
            : T('Lägg') + ' ' + numW(target) + ' ' + itemName(face, plural) + ' ' + T('i korgen');
        const body = nxFrame();
        body.appendChild(promptBar(promptText, '', () => speak(promptText)));

        const W = Math.min(innerWidth - 24, 430);
        const SZ = Math.max(48, Math.min(64, Math.floor((W - 40) / 6)));
        const stage = el('div', 'nx-stage');
        stage.style.width = W + 'px'; stage.style.margin = '8px auto';
        body.appendChild(stage);
        const basketH = SZ + 56;
        const basket = el('div', 'basket-zone');
        basket.style.height = basketH + 'px';
        basket.appendChild(el('div', 'b-label', '🧺'));
        stage.appendChild(basket);
        const countEl = el('div', 'nx-count', ''); stage.appendChild(countEl);
        const shelfTop = basketH + 34;

        const nWrong = face2 ? Math.max(2, Math.floor(target / 2)) : 0;
        const nShelf = Math.max(0, target - start) + 2;
        const items = [];
        for (let i = 0; i < start; i++) items.push({ f: face, inB: true });
        for (let i = 0; i < nShelf; i++) items.push({ f: face, inB: false });
        for (let i = 0; i < nWrong; i++) items.push({ f: face2, inB: false });

        const perRow = Math.max(3, Math.floor(W / (SZ + 10)));
        const shelfItems = items.filter(it => !it.inB);
        shelfItems.forEach((it, i) => {
            it.hx = 8 + (i % perRow) * (SZ + 10);
            it.hy = shelfTop + Math.floor(i / perRow) * (SZ + 10);
        });
        const shelfRows = Math.ceil(shelfItems.length / perRow);
        stage.style.height = (shelfTop + shelfRows * (SZ + 10) + 8) + 'px';

        const basketSpots = () => {
            const inb = items.filter(it => it.inB);
            const cols = Math.max(2, Math.floor((W - 24) / (SZ * 0.8)));
            inb.forEach((it, i) => {
                it.bx = 12 + (i % cols) * (SZ * 0.8);
                it.by = 8 + Math.floor(i / cols) * (SZ * 0.55);
            });
        };
        const inBasket = () => items.filter(it => it.inB && it.f === face).length;
        const drawCount = () => { countEl.textContent = inBasket() + ' / ' + target; };

        const finishIfDone = () => {
            if (inBasket() === target) {
                missDel(key); levelStep(true);
                nxRight([numW(target), T('Rätt!')], numW(target) + '. ' + T('Rätt!'));
                return true;
            }
            return false;
        };

        basketSpots();
        items.forEach(it => {
            const d = el('div', 'nx-drag', it.f);
            d.style.cssText = 'left:0px;top:0px;width:' + SZ + 'px;height:' + SZ + 'px;font-size:' + Math.floor(SZ * 0.62) + 'px;line-height:1';
            const place = (x, y, anim) => {
                d.style.transition = anim ? 'left .3s,top .3s' : 'none';
                d.style.left = x + 'px'; d.style.top = y + 'px';
            };
            if (it.inB) { d.classList.add('inb'); place(it.bx, it.by, false); d.style.zIndex = 2; }
            else place(it.hx, it.hy, false);
            it.el = it.elRef = d;
            it.place = place;
            stage.appendChild(d);
            let stt = null;
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
                const dx = e.clientX - stt.sx, dy = e.clientY - stt.sy;
                if (Math.abs(dx) + Math.abs(dy) > 8) stt.moved = true;
                d.style.left = (stt.ox + dx) + 'px'; d.style.top = (stt.oy + dy) + 'px';
                const br = { x: basket.offsetLeft, y: basket.offsetTop, w: basket.offsetWidth, h: basket.offsetHeight };
                const cx = parseFloat(d.style.left) + SZ / 2, cy = parseFloat(d.style.top) + SZ / 2;
                basket.classList.toggle('over', cx > br.x && cx < br.x + br.w && cy > br.y && cy < br.y + br.h);
            };
            d.onpointerup = d.onpointercancel = () => {
                if (!stt) return;
                const s = stt; stt = null;
                basket.classList.remove('over');
                const br = { x: basket.offsetLeft, y: basket.offsetTop, w: basket.offsetWidth, h: basket.offsetHeight };
                const cx = parseFloat(d.style.left) + SZ / 2, cy = parseFloat(d.style.top) + SZ / 2;
                const overBasket = cx > br.x && cx < br.x + br.w && cy > br.y && cy < br.y + br.h;
                if (s.moved && overBasket && !it.inB) {
                    if (it.f !== face) {
                        missAdd(key); levelStep(false);
                        d.classList.remove('shake'); void d.offsetWidth; d.classList.add('shake');
                        place(it.hx, it.hy, true); d.style.zIndex = 5;
                        speak(itemName(it.f, false));
                        return;
                    }
                    if (inBasket() >= target) {
                        setFeedback(T('För många!'), 'bad');
                        d.classList.remove('shake'); void d.offsetWidth; d.classList.add('shake');
                        place(it.hx, it.hy, true); d.style.zIndex = 5;
                        speak(T('Det räcker!'));
                        return;
                    }
                    it.inB = true; d.classList.add('inb');
                    basketSpots(); place(it.bx, it.by, true); d.style.zIndex = 2;
                    items.filter(x => x !== it && x.inB).forEach(x => x.place(x.bx, x.by, true));
                    playSound('clickSound');
                    drawCount();
                    if (!finishIfDone()) speak(numW(inBasket()));
                    return;
                }
                if (it.inB && (!s.moved || !overBasket)) {
                    it.inB = false; d.classList.remove('inb');
                    playSound('clickSound');
                    place(it.hx, it.hy, true); d.style.zIndex = 5;
                    drawCount();
                    return;
                }
                if (!it.inB) { place(it.hx, it.hy, true); d.style.zIndex = 5; }
                else { place(it.bx, it.by, true); d.style.zIndex = 2; }
            };
        });
        drawCount();
        autoSay(() => speak(promptText));
    }

    NXGAMES.affar = gAffar;
    NXGAMES.rakna = gRakna;

    /* Rendera om så de nya rutorna syns direkt (skriptet laddas efter appens första route). */
    try { route(); } catch (e) {}
})();
