/* Celia och Selmas Spel.
   Ren HTML/CSS/JS, inga externa tjänster förutom teckensnitt och egna ljudfiler. */

(function(){ const st = document.createElement('style'); st.textContent = '.tile.mat{background:linear-gradient(160deg,#ff8d8d,#ee5a6f)}.tile.saker{background:linear-gradient(160deg,#5ed0d8,#2aa7c9)}.tile.kroppen{background:linear-gradient(160deg,#ffa8cf,#f06aa8)}.tile.klockan{background:linear-gradient(160deg,#6c8cf0,#3f5bd6)}.tile.klockan2{background:linear-gradient(160deg,#ffc15e,#f08a24)}.tile.text{background:linear-gradient(160deg,#b58cf5,#7e4fd8)}.tile.monster{background:linear-gradient(160deg,#5ed0a0,#25a07a)}.tile.para{background:linear-gradient(160deg,#ff9cc0,#e8587f)}.tile.pussel{background:linear-gradient(160deg,#7fd1ff,#3a9ee0)}.tile.ballong{background:linear-gradient(160deg,#ff8d8d,#ee5a6f)}.nx-exhaust{display:flex;align-items:center;justify-content:center;gap:10px;background:#fff3d0;border:2px dashed #f5a623;border-radius:16px;padding:8px 12px;margin:8px 0;font-weight:700;font-size:15px;color:#2d2a32}.nx-exhaust-btn{padding:6px 14px;font-size:14px;min-height:0}'; document.head.appendChild(st); })();
/* ---------- språk: svenska och irakisk arabiska ---------- */
let lang = 'sv';
try { lang = localStorage.getItem('cs-lang') === 'ar' ? 'ar' : 'sv'; } catch (e) {}
const AR_UI = {
    'Celia och Selmas Spel': 'ألعاب سيليا وسلمى',
    'Vem vill leka?': 'منو يريد يلعب؟',
    'Titta, lyssna och hitta': 'شوف، اسمع ودوّر',
    'Upptäck, räkna och läs': 'اكتشف، عدّ واقرأ',
    'Vad vill du leka, ': 'شتريد تلعب يا ',
    'Titta på bilden. Lyssna och hitta samma!': 'شوف الصورة. اسمع ودوّر على نفسها!',
    'Välj en lek och upptäck något nytt.': 'اختار لعبة واكتشف شي جديد.',
    ' · Byt spelare': ' · غيّر اللاعب',
    'Siffror': 'الأرقام', 'Räkna och hitta': 'عدّ ودوّر',
    'Bokstäver': 'الحروف', 'A till Ö': 'من الألف للياء',
    'Ord': 'كلمات', 'Vanliga ord': 'كلمات شائعة',
    'Figurer': 'الأشكال', 'Former och färger': 'أشكال وألوان',
    'Djur': 'الحيوانات', 'Hitta djuret': 'دوّر على الحيوان',
    'Mat': 'الأكل', 'Hitta maten': 'دوّر على الأكل',
    'Saker': 'أغراض', 'Bilar, bollar och mer': 'سيارات وكرات وأكثر',
    'Kroppen': 'الجسم', 'Peka på': 'أشّر على', 'Hitta på kroppen': 'دوّر على جزء من الجسم',
    'Skriv': 'اكتب', 'Skriv orden': 'اكتب الكلمات',
    'Plus och minus': 'جمع وطرح', 'Räkna med knappar': 'احسب بالأزرار',
    'Gånger': 'الضرب', 'Grupper med saker': 'مجموعات من الأشياء',
    'Dela': 'القسمة', 'Dela lika': 'قسّم بالتساوي',
    'Blandat': 'منوّع', 'Allt i en lek': 'كلشي بلعبة وحدة',
    'Hitta siffran': 'دوّر على الرقم', 'Hitta bokstaven': 'دوّر على الحرف',
    'Hitta ordet': 'دوّر على الكلمة', 'Hitta figuren': 'دوّر على الشكل',
    'Hitta saken': 'دوّر على الغرض', 'Hitta ': 'دوّر على ',
    'Bra jobbat! 🎉': 'عاش! 🎉', 'Försök igen!': 'جرّب مرة ثانية!',
    'Rätt!': 'صح!', 'Nej, det är fel.': 'لا، غلط.',
    'Skriv vad du ser.': 'اكتب شنو تشوف.', 'Skriv vad du ser': 'اكتب شنو تشوف',
    'Skriv svaret': 'اكتب الجواب', '💡 Hjälp': '💡 مساعدة', 'Klart ✓': 'خلص ✓',
    'Lyssna': 'اسمع', 'Tillbaka': 'رجوع', 'Inställningar': 'الإعدادات',
    'Säg igen': 'قول مرة ثانية', 'Sudda': 'مسح', 'Klart': 'خلص',
    'Räkna en och en!': 'عدّ واحد واحد!',
    'Hur mycket är': 'شكد يصير',
    '🔊 Volym': '🔊 الصوت', '🎵 Bakgrundsmusik': '🎵 موسيقى الخلفية',
    '🗣️ Läs upp': '🗣️ القراءة بصوت عالي', '🖼️ Visa ledtråd': '🖼️ إظهار التلميح',
    '🌱 Nivå': '🌱 المستوى', 'Lugn': 'هادئ', 'Klurig': 'صعب شوية',
    '🃏 Antal kort': '🃏 عدد البطاقات', '🧩 Antal delar': '🧩 عدد القطع', 'Automatisk': 'تلقائي', '🔢 Talområde': '🔢 مدى الأرقام',
    'Minst': 'الأدنى', 'Högst': 'الأعلى', '🌐 Språk': '🌐 اللغة',
    'Välj ett större talområde: minst måste vara lägre än högst, och området måste rymma alla kort.': 'اختار مدى أكبر للأرقام: الأدنى لازم يكون أقل من الأعلى، والمدى لازم يسع كل البطاقات.',
    'Selma': 'سلمى', 'Celia': 'سيليا',
};
function T(s) { return lang === 'ar' && AR_UI[s] !== undefined ? AR_UI[s] : s; }
function siteName() { return T('Celia och Selmas Spel'); }
function pname(key) { return T(PROFILES[key].name); }
function backArrow() { return lang === 'ar' ? '→' : '←'; }
function upptackter(n) { return lang === 'ar' ? '★ ' + n + ' اكتشاف' : '★ ' + n + ' upptäckter'; }
const AR_NAMES = {
    '🐶': 'الكلب', '🐱': 'البزونة', '🐷': 'الخنزير', '🐮': 'البقرة', '🐴': 'الحصان', '🐵': 'القرد', '🦁': 'الأسد', '🐯': 'النمر',
    '🐘': 'الفيل', '🦒': 'الزرافة', '🦓': 'الحمار الوحشي', '🐰': 'الأرنب', '🐻': 'الدب', '🦊': 'الثعلب', '🐸': 'الضفدع', '🦆': 'البطة',
    '🐔': 'الدجاجة', '🐧': 'البطريق', '🦉': 'البومة', '🦋': 'الفراشة', '🐟': 'السمكة', '🐬': 'الدلفين', '🐢': 'السلحفاة', '🐝': 'النحلة',
    '🐭': 'الفأرة', '🐹': 'الهامستر', '🐺': 'الذيب', '🐊': 'التمساح', '🐙': 'الأخطبوط', '🐞': 'الدعسوقة', '🐌': 'الحلزون', '🦈': 'القرش',
    '🐳': 'الحوت', '🦘': 'الكنغر', '🐿️': 'السنجاب', '🦔': 'القنفذ', '🐑': 'الخروف', '🐓': 'الديج',
    '🔴': 'الدائرة الحمراء', '🔵': 'الدائرة الزرقاء', '🟢': 'الدائرة الخضراء', '🟡': 'الدائرة الصفراء', '🟣': 'الدائرة البنفسجية', '🟠': 'الدائرة البرتقالية',
    '🟥': 'المربع الأحمر', '🟦': 'المربع الأزرق', '🟩': 'المربع الأخضر', '🟨': 'المربع الأصفر', '🟪': 'المربع البنفسجي', '🟧': 'المربع البرتقالي',
    '🔶': 'المعيّن البرتقالي', '🔷': 'المعيّن الأزرق', '⭐': 'النجمة', '❤️': 'القلب', '🌙': 'القمر', '⚫': 'الدائرة السوداء', '⬛': 'المربع الأسود',
    '💙': 'القلب الأزرق', '💚': 'القلب الأخضر', '💛': 'القلب الأصفر', '💜': 'القلب البنفسجي',
    '🍎': 'التفاحة', '🍌': 'الموزة', '🍓': 'الفراولة', '🍞': 'الخبز', '🥕': 'الجزرة', '🍦': 'البوظة', '🥛': 'الحليب', '🍪': 'الكليجة',
    '🍇': 'العنب', '🍊': 'البرتقالة', '🍉': 'الرقي', '🧀': 'الجبن', '🥚': 'البيضة', '🍕': 'البيتزا', '🍅': 'الطماطة', '🍐': 'الكمثرى',
    '🚗': 'السيارة', '🚌': 'الباص', '🚂': 'القطار', '✈️': 'الطيارة', '🚲': 'الدراجة', '⚽': 'الكرة', '🧸': 'الدبدوب', '🏠': 'البيت',
    '☀️': 'الشمس', '🌳': 'الشجرة', '🚒': 'سيارة الإطفاء', '⛵': 'القارب', '🎈': 'البالون', '👟': 'الجزمة', '🧦': 'الجورب', '🛏️': 'السرير',
    '🪑': 'الكرسي', '🌈': 'قوس قزح',
    '👁️': 'العين', '👂': 'الأذن', '👃': 'الخشم', '👄': 'الفم', '✋': 'الإيد', '🦶': 'القدم', '🦷': 'السن', '👅': 'اللسان', '🦵': 'الرجل', '💪': 'الذراع',
};
const AR_PICTURE_PROMPT = { 'Hitta djuret': 'دوّر على الحيوان', 'Hitta figuren': 'دوّر على الشكل', 'Hitta maten': 'دوّر على الأكل', 'Hitta saken': 'دوّر على الغرض', 'Hitta på kroppen': 'دوّر على جزء من الجسم' };
const AR_LETTERS = [
    ['ا', 'ألف'], ['ب', 'باء'], ['ت', 'تاء'], ['ث', 'ثاء'], ['ج', 'جيم'], ['ح', 'حاء'], ['خ', 'خاء'], ['د', 'دال'], ['ذ', 'ذال'], ['ر', 'راء'],
    ['ز', 'زاي'], ['س', 'سين'], ['ش', 'شين'], ['ص', 'صاد'], ['ض', 'ضاد'], ['ط', 'طاء'], ['ظ', 'ظاء'], ['ع', 'عين'], ['غ', 'غين'], ['ف', 'فاء'],
    ['ق', 'قاف'], ['ك', 'كاف'], ['ل', 'لام'], ['م', 'ميم'], ['ن', 'نون'], ['ه', 'هاء'], ['و', 'واو'], ['ي', 'ياء'],
];
const AR_WORDS = ['هلا', 'شكراً', 'فرحان', 'حلويات', 'لعبة', 'مدرسة', 'كتاب', 'قطار', 'سيارة', 'كرة', 'دراجة', 'بوظة', 'كلب', 'بزونة', 'سمك', 'حصان', 'طير', 'وردة', 'دبدوب', 'ماي', 'حليب', 'فاكهة', 'شمس', 'قمر', 'نجمة', 'مطر', 'ثلج', 'هوا', 'حار', 'بارد', 'بنطرون', 'جزمة', 'قلب', 'إيد', 'فم', 'خشم', 'عين', 'أذن', 'راس', 'سن', 'بطن', 'بيت'];
const AR_WRITE_WORDS = [
    ['🐶','كلب'],['🐱','بزونة'],['🐮','بقرة'],['🐷','خنزير'],['🐴','حصان'],['🐵','قرد'],['🐟','سمكة'],['🐘','فيل'],['🦁','أسد'],['🐸','ضفدع'],['🦉','بومة'],['🐢','سلحفاة'],['🐝','نحلة'],['🦋','فراشة'],
    ['🚗','سيارة'],['🚂','قطار'],['☀️','شمس'],['🌙','قمر'],['⭐','نجمة'],['⚽','كرة'],['📖','كتاب'],['🏠','بيت'],['🐭','فأرة'],['🐰','أرنب'],['🐻','دب'],['🦊','ثعلب'],['🐧','بطريق'],['🐬','دلفين'],
    ['🍓','فراولة'],['🥕','جزرة'],['🍕','بيتزا'],['🥚','بيضة'],['🎈','بالون'],['👑','تاج'],['🔑','مفتاح'],['🚌','باص'],['✈️','طيارة'],['🏰','قلعة'],['☁️','غيمة'],['🔥','نار'],['🍄','فطر'],['👟','جزمة'],
    ['🥁','طبل'],['🐊','تمساح'],['🐙','أخطبوط'],['🌸','وردة'],['🌳','شجرة'],['🚲','دراجة'],['🍦','بوظة'],['❤️','قلب'],['🍎','تفاحة'],['🍌','موزة'],['🎂','كيكة'],
];
const AR_WRITE_EASY = new Set(['كلب','بزونة','بقرة','قرد','فيل','شمس','قمر','كتاب','بيت','كرة','باص','نار','قلب','دب','تاج','طبل','بيضة','نجمة','سمكة','قطار','حصان','بوظة','وردة']);
function arNorm(s) { return String(s).replace(/[\u064B-\u065F\u0670\u0640]/g, '').replace(/[أإآٱ]/g, 'ا').replace(/ى/g, 'ي').replace(/ة/g, 'ه').replace(/\s+/g, '').trim(); }
const AR_UNITS = ['صفر','واحد','اثنين','ثلاثة','أربعة','خمسة','ستة','سبعة','ثمانية','تسعة','عشرة','احداعش','اثناعش','ثلثطعش','أربعطعش','خمسطعش','سطعش','سبعطعش','ثمنطعش','تسعطعش'];
const AR_TENS = { 20: 'عشرين', 30: 'ثلاثين', 40: 'أربعين', 50: 'خمسين', 60: 'ستين', 70: 'سبعين', 80: 'ثمانين', 90: 'تسعين' };
function arNum(n) {
    n = parseInt(n, 10);
    if (isNaN(n) || n < 0 || n > 100) return String(n);
    if (n === 100) return 'مية';
    if (n < 20) return AR_UNITS[n];
    const t = n - n % 10, u = n % 10;
    return u ? AR_UNITS[u] + ' و' + AR_TENS[t] : AR_TENS[t];
}
function N(x) { return lang === 'ar' ? arNum(x) : String(x); }
const AR_TTS_FIX = [['احداعش','أحد عشر'],['اثناعش','اثنا عشر'],['ثلثطعش','ثلاثة عشر'],['أربعطعش','أربعة عشر'],['خمسطعش','خمسة عشر'],['سبعطعش','سبعة عشر'],['ثمنطعش','ثمانية عشر'],['تسعطعش','تسعة عشر'],['سطعش','ستة عشر'],['مية','مئة']];
function ttsText(s) { if (lang !== 'ar') return s; const m = new Map(AR_TTS_FIX); return s.replace(/[\u0600-\u06FF]+/g, w => m.has(w) ? m.get(w) : w); }
const AR_OPS = { '+': 'زائد', '−': 'ناقص', '×': 'ضرب', '÷': 'تقسيم على' };
function localizeList(list) { return lang === 'ar' ? list.map(([f, n]) => [f, AR_NAMES[f] || n]) : list; }
function applyLang() {
    const ar = lang === 'ar';
    document.documentElement.lang = ar ? 'ar-IQ' : 'sv';
    document.documentElement.dir = ar ? 'rtl' : 'ltr';
    document.title = siteName();
    if (ar && !document.getElementById('cairoFont')) { const l = document.createElement('link'); l.id = 'cairoFont'; l.rel = 'stylesheet'; l.href = 'https://fonts.googleapis.com/css2?family=Cairo:wght@500;600;700;800&display=swap'; document.head.appendChild(l); }
}
function setLang(l) { lang = l; if (l === 'ar' && typeof loadArClips === 'function') loadArClips(); try { localStorage.setItem('cs-lang', l); } catch (e) {} applyLang(); stopSpeech(); }
(function(){ const st = document.createElement('style'); st.textContent = 'html[dir=rtl] body,html[dir=rtl] button,html[dir=rtl] input,html[dir=rtl] select{font-family:"Cairo","Baloo 2",system-ui,sans-serif} html[dir=rtl] .keypad,html[dir=rtl] .math-eq,html[dir=rtl] .math-pics,html[dir=rtl] .range-pair{direction:ltr} html[dir=rtl] .math-eq .write-lead{direction:rtl} .langsel{min-width:160px}.lang-pill{display:block;margin:14px auto 0;border:none;border-radius:999px;padding:10px 20px;background:#fff;box-shadow:0 6px 18px rgba(45,42,50,.12);font:700 16px inherit;font-family:inherit;color:#2d2a32;cursor:pointer}'; document.head.appendChild(st); })();
applyLang();

const PROFILES = {
    selma: { name: 'Selma', icon: '🌼', defaults: { cardCount: 2, minRange: 1, maxRange: 20 } },
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
    mat:       { name: 'Mat',       icon: '🍎', sub: 'Hitta maten' },
    saker:     { name: 'Saker',     icon: '🚗', sub: 'Bilar, bollar och mer' },
    kroppen:   { name: 'Kroppen',   icon: '👂', sub: 'Hitta på kroppen' },
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

const FOOD = [
    ['🍎', 'äpplet'],
    ['🍌', 'bananen'],
    ['🍓', 'jordgubben'],
    ['🍞', 'brödet'],
    ['🥕', 'moroten'],
    ['🍦', 'glassen'],
    ['🥛', 'mjölken'],
    ['🍪', 'kakan'],
    ['🍇', 'druvorna'],
    ['🍊', 'apelsinen'],
    ['🍉', 'vattenmelonen'],
    ['🧀', 'osten'],
    ['🥚', 'ägget'],
    ['🍕', 'pizzan'],
    ['🍅', 'tomaten'],
    ['🍐', 'päronet'],
];

const THINGS = [
    ['🚗', 'bilen'],
    ['🚌', 'bussen'],
    ['🚂', 'tåget'],
    ['✈️', 'flygplanet'],
    ['🚲', 'cykeln'],
    ['⚽', 'bollen'],
    ['🧸', 'nallen'],
    ['🏠', 'huset'],
    ['☀️', 'solen'],
    ['🌳', 'trädet'],
    ['🚒', 'brandbilen'],
    ['⛵', 'båten'],
    ['🎈', 'ballongen'],
    ['👟', 'skon'],
    ['🧦', 'strumpan'],
    ['🛏️', 'sängen'],
    ['🪑', 'stolen'],
    ['🌈', 'regnbågen'],
];

const BODY = [
    ['👁️', 'ögat'],
    ['👂', 'örat'],
    ['👃', 'näsan'],
    ['👄', 'munnen'],
    ['✋', 'handen'],
    ['🦶', 'foten'],
    ['🦷', 'tanden'],
    ['👅', 'tungan'],
    ['🦵', 'benet'],
    ['💪', 'armen'],
];

const SELMA_ONLY = ['mat', 'saker', 'kroppen'];
const SELMA_CATS = ['djur', 'figurer', 'siffror', 'bokstaver', 'mat', 'saker', 'kroppen'];
const PICTURE_CATS = { djur: ['Hitta djuret', () => localizeList(ANIMALS)], figurer: ['Hitta figuren', () => localizeList(FIGURES)], mat: ['Hitta maten', () => localizeList(FOOD)], saker: ['Hitta saken', () => localizeList(THINGS)], kroppen: ['Hitta på kroppen', () => localizeList(BODY)] };
const COUNT_STEPS = [2, 3, 4, 6, 9, 12, 16];

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
const clipLoads = [fetch('5-speech-audio.json?v=3').then(r => r.ok ? r.json() : {}).then(data => { Object.assign(audioMap, data); }).catch(() => {})];
for (let i = 1; i <= 2; i++) clipLoads.push(fetch('sp2-' + i + '.json?v=9').then(r => r.ok ? r.json() : {}).then(data => { Object.assign(audioMap, data); }).catch(() => {}));
for (let i = 3; i <= 12; i++) clipLoads.push(new Promise(res => { const sc = document.createElement('script'); sc.src = (i === 12 ? '3-sp-12' : 'sp3-' + i) + '.js?v=10'; sc.onload = () => { Object.assign(audioMap, window.__clips || {}); res(); }; sc.onerror = () => res(); document.head.appendChild(sc); }));
let arClipsRequested = false;
let audioBooted = false;
function loadArClips() {
    if (arClipsRequested) return Promise.resolve(); arClipsRequested = true;
    const loads = [];
    for (let i = 1; i <= 24; i++) loads.push(new Promise(res => { const sc = document.createElement('script'); sc.src = 'c' + (i < 10 ? '0' : '') + i + '.js?v=1'; sc.onload = () => { Object.assign(audioMap, window.__arclips || {}); res(); }; sc.onerror = () => res(); document.head.appendChild(sc); }));
    const p = Promise.all(loads);
    if (audioBooted) { clipsLoaded = false; audioReady = Promise.all([audioReady, p]); audioReady.then(() => { clipsLoaded = true; }); }
    return p;
}
if (lang === 'ar') clipLoads.push(loadArClips());
let audioReady = Promise.all(clipLoads);
let clipsLoaded = false; audioReady.then(() => { clipsLoaded = true; }); audioBooted = true;
const OPK = { '+': 'plus', '−': 'minus', '×': 'gånger', '÷': 'delat med' };
(function(){ const st = document.createElement('style'); st.textContent = 'button,.card,.key{touch-action:manipulation;-webkit-tap-highlight-color:transparent} .card{animation-duration:.15s} .card.correct{animation-duration:.35s} .card.wrong{animation-duration:.3s}'; document.head.appendChild(st); })();
let speechDone = null;
let speechToken = 0;
let talking = false;
let liveUtterance = null;
let lastCancelAt = 0;
let ttsUnlocked = false;
function unlockTts() {
    if (ttsUnlocked) return; ttsUnlocked = true;
    try { const u = new SpeechSynthesisUtterance(' '); u.volume = 0; u.lang = 'sv-SE'; speechSynthesis.speak(u); } catch (e) {}
    try { if (!talking) { voiceAudio.src = SILENT; voiceAudio.volume = 0; voiceAudio.play().catch(() => {}); } } catch (e) {}
}
const SILENT = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';
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
    waStop();
    voiceAudio.pause();
    voiceAudio.onended = voiceAudio.onerror = null;
    try { if (speechSynthesis.speaking || speechSynthesis.pending) { speechSynthesis.cancel(); lastCancelAt = Date.now(); } } catch (e) {}
    if (speechDone) { speechDone(); speechDone = null; }
    talking = false;
    ['clickSound', 'matchSound', 'rightSound', 'wrongSound'].forEach(id => { const a = document.getElementById(id); if(a) a.pause(); });
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
function feedbackFx(right, parts, fallbackText) {
    const fx = playSound(right ? 'rightSound' : 'wrongSound');
    if (!settings.speech) return fx;
    return fx.then(() => speakSeq(parts, fallbackText));
}
function speak(text) {
    if (!clipsLoaded) { const t0 = speechToken; return audioReady.then(() => { if (t0 === speechToken) return speak(text); }); }
    stopSpeech();
    if (!settings.speech || settings.volume === 0) return Promise.resolve();
    if (audioMap[text]) { const c = waCtx(); if (c && c.state === 'running' && !c._broken) return waSeq([text], text); }
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
                    const u = new SpeechSynthesisUtterance(ttsText(text));
                    const ar = lang === 'ar';
                    u.rate = ar ? 0.85 : 0.9; u.volume = 1;
                    const voices = speechSynthesis.getVoices().filter(v => (ar ? /^ar(?:-|_|$)/i : /^sv(?:-|_)/i).test(v.lang));
                    const vv = (ar && (voices.find(v => /^ar[-_]IQ/i.test(v.lang)) || voices.find(v => /enhanced|premium|natural|maged|majed|tarik|laila|hoda/i.test(v.name)))) || (!ar && voices.find(v => /enhanced|premium|natural|sofie/i.test(v.name))) || voices[0];
                    u.lang = vv ? vv.lang : (ar ? 'ar-SA' : 'sv-SE');
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
            voiceAudio.src = audioMap[text]; voiceAudio.volume = settings.volume; voiceAudio.playbackRate = 1.1;
            voiceAudio.onended = done; voiceAudio.onerror = fallback;
            voiceAudio.play().catch(fallback);
        } else fallback();
    });
}
function sayTarget(t) { return lang === 'ar' ? speakSeq(t.parts, t.speech) : speak(t.speech); }

/* ---------- sammanhängande uppläsning (trimmade ljudbitar, WebAudio) ---------- */
let actx = null, waSrc = [], waBuf = {}, waLog = [];
function waCtx() { if (!actx) { try { const C = window.AudioContext || window.webkitAudioContext; if (C) actx = new C(); } catch (e) {} } return actx; }
['pointerdown', 'touchstart', 'click', 'keydown'].forEach(n => document.addEventListener(n, () => { const c = waCtx(); if (c && c.state !== 'running') c.resume().catch(() => {}); }, { passive: true, capture: true }));
function waTrim(k) {
    if (waBuf[k]) return waBuf[k];
    return waBuf[k] = fetch(audioMap[k]).then(r => r.arrayBuffer()).then(ab => new Promise((res, rej) => { const p = actx.decodeAudioData(ab, res, rej); if (p && p.catch) p.catch(rej); })).then(buf => {
        const d = buf.getChannelData(0); let pk = 0;
        for (let i = 0; i < d.length; i++) { const v = Math.abs(d[i]); if (v > pk) pk = v; }
        const th = Math.max(0.0005, pk * 0.008);   // about -42 dB under this clip's own peak
        let a = 0, e = d.length - 1;
        while (a < e && Math.abs(d[a]) < th) a++;
        while (e > a && Math.abs(d[e]) < th) e--;
        a = Math.max(0, a - Math.floor(buf.sampleRate * 0.03)); e = Math.min(d.length - 1, e + Math.floor(buf.sampleRate * 0.08));
        if (pk < 0.0005 || (e - a) / buf.sampleRate < 0.12) { a = 0; e = d.length - 1; }   // never cut a near-silent or very short clip
        return { buf, s: a / buf.sampleRate, d: (e - a) / buf.sampleRate, full: buf.duration };
    });
}
function waStop() { waSrc.forEach(x => { try { x.onended = null; x.stop(); } catch (e) {} }); waSrc = []; }
function waSeq(parts, fallbackText) {
    const token = speechToken;
    return Promise.all(parts.map(waTrim)).then(items => new Promise(resolve => {
        if (token !== speechToken) return resolve();
        talking = true; applyMusic();
        const rate = 1.12, gap = 0.04, g = actx.createGain(); g.gain.value = settings.volume; g.connect(actx.destination);
        let t = actx.currentTime + 0.02, last = null; const t0 = t;
        items.forEach((it, i) => {
            const src = actx.createBufferSource(); src.buffer = it.buf; src.playbackRate.value = rate; src.connect(g);
            src.start(t, it.s, it.d); waSrc.push(src); last = src;
            waLog.push({ part: parts[i], at: +(t - t0).toFixed(3), dur: +(it.d / rate).toFixed(3), trimmed: +((it.full - it.d) / rate).toFixed(3) });
            t += it.d / rate + gap;
        });
        let finished = false;
        const done = () => { if (finished) return; finished = true; clearTimeout(timer); if (token === speechToken) { talking = false; speechDone = null; applyMusic(); } waSrc = []; resolve(); };
        speechDone = done;
        const timer = setTimeout(done, (t - t0 + 1) * 1000);
        last.onended = done;
    })).catch(() => { if (token !== speechToken) return; if (actx) actx._broken = true; return speakSeqOld(parts, fallbackText); });
}
function speakSeqOld(parts, fallbackText) {
    if (!clipsLoaded) { const t0 = speechToken; return audioReady.then(() => { if (t0 === speechToken) return speakSeq(parts, fallbackText); }); }
    stopSpeech();
    if (!settings.speech || settings.volume === 0) return Promise.resolve();
    if (!parts.every(k => audioMap[k])) return speak(fallbackText || parts.join(' '));
    const token = speechToken;
    talking = true; applyMusic();
    return new Promise(resolve => {
        let i = 0, timer;
        const done = () => {
            clearTimeout(timer);
            if (token === speechToken) { talking = false; speechDone = null; applyMusic(); }
            resolve();
        };
        speechDone = done;
        timer = setTimeout(() => { if (token === speechToken) stopSpeech(); done(); }, 20000);
        const next = () => {
            if (token !== speechToken || i >= parts.length) return done();
            voiceAudio.src = audioMap[parts[i++]]; voiceAudio.volume = settings.volume;
            voiceAudio.playbackRate = 1.12; voiceAudio.onended = next; voiceAudio.onerror = done;
            voiceAudio.play().catch(done);
        };
        next();
    });
}
function speakSeq(parts, fallbackText) {
    if (!clipsLoaded) { const t0 = speechToken; return audioReady.then(() => { if (t0 === speechToken) return speakSeq(parts, fallbackText); }); }
    if (parts.length >= 1 && settings.speech && settings.volume > 0 && parts.every(k => audioMap[k])) {
        const c = waCtx();
        if (c && c.state === 'running' && !c._broken) { stopSpeech(); return waSeq(parts, fallbackText); }
    }
    return speakSeqOld(parts, fallbackText);
}
function mathQ(q) { return lang === 'ar' ? [T('Hur mycket är'), N(q.a), AR_OPS[q.op], N(q.b)] : ['Hur mycket är', String(q.a), OPK[q.op], String(q.b)]; }
function mathFb(q) { return lang === 'ar' ? mathQ(q).join(' ') : 'Hur mycket är ' + q.speech + '?'; }
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
function refreshView() {
    leaveScene();
    if (!activeProfile) renderProfiles(); else if (game.cat) newRound(); else renderHome();
}
function langPill() {
    const b = el('button', 'lang-pill', lang === 'ar' ? '🌐 Svenska' : '🌐 العراقية (عربي)');
    b.onclick = () => { setLang(lang === 'ar' ? 'sv' : 'ar'); refreshView(); };
    return b;
}
function renderProfiles() {
    document.title = siteName();
    app.innerHTML = '';
    const hero = el('div','hero');
    hero.appendChild(el('div','profile-balloon','🎈'));
    hero.appendChild(el('h1',null,T('Vem vill leka?')));
    hero.appendChild(el('p',null,siteName())); app.appendChild(hero);
    const list = el('div','profiles');
    Object.entries(PROFILES).forEach(([key,p]) => {
        const b = el('button','profile-card ' + key);
        b.appendChild(el('span','profile-icon',p.icon));
        b.appendChild(el('span','profile-name',pname(key)));
        b.appendChild(el('span','profile-sub', T(key === 'selma' ? 'Titta, lyssna och hitta' : 'Upptäck, räkna och läs')));
        b.onclick = () => selectProfile(key); list.appendChild(b);
    }); app.appendChild(list);
    app.appendChild(langPill());
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

function buildRound(scope) {
    const cat = game.cat;
    const n = settings.cardCount;
    const mk = (face, key, prompt, name, say, parts) => ({ face, key, prompt, name, say, parts, speech: parts.join(' ') });
    let poolKeys = null, byKey = null, count = n;
    if (cat === 'siffror') {
        let min = parseInt(settings.minRange), max = parseInt(settings.maxRange);
        const dd = (PROFILES[activeProfile] && PROFILES[activeProfile].defaults) || {};
        if (isNaN(min) || min < 0) min = dd.minRange != null ? dd.minRange : 1;
        if (isNaN(max)) max = dd.maxRange != null ? dd.maxRange : 20;
        if (min >= max) { const t = min; min = Math.min(t, max); max = Math.max(t, max, min + n); }
        if ((max - min + 1) < n) max = min + n - 1;
        const pool = [];
        for (let i = min; i <= max; i++) pool.push(String(i));
        poolKeys = pool;
        byKey = v => { const o = mk(v, v, T('Hitta siffran'), undefined, N(v), [T('Hitta siffran'), N(v)]); if (lang !== 'ar') { o.speech = 'Hitta siffran ' + v; } return o; };
    } else if (cat === 'bokstaver') {
        if (lang === 'ar') { poolKeys = AR_LETTERS.map(x => x[0]); byKey = f => { const row = AR_LETTERS.find(x => x[0] === f) || [f, f]; return mk(f, f, T('Hitta bokstaven'), undefined, row[1], [T('Hitta bokstaven'), row[1]]); }; }
        else { poolKeys = LETTERS; byKey = v => ({ face: v, key: v, prompt: 'Hitta bokstaven', say: v.toLowerCase(), speech: 'Hitta bokstaven ' + v }); }
    } else if (cat === 'ord') {
        if (lang === 'ar') { poolKeys = AR_WORDS; byKey = v => mk(v, v, T('Hitta ordet'), undefined, v, [T('Hitta ordet'), v]); }
        else { poolKeys = WORDS; byKey = v => ({ face: v, key: v, prompt: 'Hitta ordet', say: v.toLowerCase(), speech: 'Hitta ordet ' + v }); }
    } else if (PICTURE_CATS[cat]) {
        const pool = PICTURE_CATS[cat][1]();
        count = cat === 'djur' || cat === 'figurer' ? n : Math.max(2, COUNT_STEPS.filter(c => c <= pool.length && c <= n).pop() || 2);
        const byFace = {}; pool.forEach(p => { byFace[p[0]] = p[1]; });
        poolKeys = pool.map(p => p[0]);
        byKey = face => { const name = byFace[face]; return { face, key: face, prompt: T(PICTURE_CATS[cat][0]), name, say: name, speech: lang === 'ar' ? T('Hitta ').trim() + ' ' + name : T('Hitta ') + name, parts: lang === 'ar' ? [T('Hitta ').trim(), name] : [T('Hitta ') + name] }; };
    }
    if (!poolKeys) return { values: [] };
    const drawn = bagTake(poolKeys, count, lgetS('last', null, scope), scope);
    if (drawn.exhausted) game.exhausted = true;
    return { values: drawn.keys.map(byKey), targetKey: drawn.keys[0] };
}

function newRound() {
    leaveScene();
    if (game.cat === 'skriv') { newWriteRound(); return; }
    if (MATH_CATS.includes(game.cat)) { newMathRound(); return; }
    game.exhausted = false;
    const built = buildRound(game.cat);
    if (built.error) { renderGame(built.error); return; }
    game.values = built.values;
    game.target = game.values.find(v => v.key === built.targetKey) || pick(game.values);
    lsetS('last', game.target.key, game.cat);
    game.locked = false;
    renderGame();
    const current = scene;
    roundTimer = setTimeout(() => { if(current === scene && !game.locked) sayTarget(game.target); }, 120);
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
    document.querySelectorAll('.card.wrong').forEach(el => el.classList.remove('wrong'));
    stopSpeech();
    const current = scene;
    const picked = (game.values || []).find(v => v.key === key);
    const sayK = picked && picked.say ? picked.say : String(key).toLowerCase();
    const choice = [sayK];
    const said = sayK;
    if (key === game.target.key) {
        game.locked = true; game.stars++; saveProgress();
        btn.classList.add('correct');
        const score = document.querySelector('.stars');
        if (score) score.textContent = '★ ' + game.stars;
        confettiBurst(); setFeedback(T('Bra jobbat! 🎉'), 'good');
        const minPause = new Promise(r => setTimeout(r, 250));
        await Promise.all([feedbackFx(true, choice.concat([T('Rätt!')]), said + '. ' + T('Rätt!')), minPause]);
        if (current !== scene || !game.cat) return;
        game.round++; newRound();
    } else {
        btn.classList.add('wrong'); setFeedback(T('Försök igen!'), 'bad');
        feedbackFx(false, choice.concat([T('Nej, det är fel.')]), said + '. ' + T('Nej, det är fel.'));
        feedbackTimer = setTimeout(() => { if (current === scene) { btn.classList.remove('wrong'); setFeedback('', ''); } }, 450);
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
    const pool = (lang === 'ar' ? AR_WRITE_WORDS : WRITE_WORDS).filter(([, w]) => hard || (lang === 'ar' ? AR_WRITE_EASY : WRITE_EASY).has(w));
    const drawn = bagTake(pool.map(p => p[1]), 1, lgetS('last', null, 'skriv'), 'skriv');
    game.exhausted = drawn.exhausted;
    const answer = drawn.keys[0];
    const face = (pool.find(p => p[1] === answer) || pool[0])[0];
    lsetS('last', answer, 'skriv');
    write.item = { mode: 'word', face, answer, lead: T('Skriv vad du ser.') };
    write.hinted = 0;
    game.locked = false;
    renderWrite();
    const wcur = scene;
    roundTimer = setTimeout(() => { if (wcur === scene && !game.locked) speakSeq([T('Skriv vad du ser')]); }, 120);
}
function renderWrite() {
    const cat = CATEGORIES.skriv;
    document.title = siteName() + ': ' + T(cat.name);
    app.innerHTML = '';
    const head = el('div', 'gamehead');
    const back = el('button', 'icon-btn', backArrow());
    back.setAttribute('aria-label', T('Tillbaka'));
    back.onclick = () => { location.hash = '#/'; };
    head.appendChild(back);
    head.appendChild(el('h2', null, cat.icon + ' ' + T(cat.name)));
    head.appendChild(el('div', 'stars', '★ ' + game.stars));
    const gear = el('button', 'icon-btn', '⚙️');
    gear.setAttribute('aria-label', T('Inställningar'));
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
    input.setAttribute('aria-label', T('Skriv svaret'));
    box.appendChild(input);
    const row = el('div', 'btn-row');
    const hintBtn = el('button', 'btn secondary', T('💡 Hjälp'));
    const go = el('button', 'btn', T('Klart ✓'));
    row.appendChild(hintBtn); row.appendChild(go);
    if (it.mode === 'word') { const ear = el('button', 'btn secondary', '🔊'); ear.setAttribute('aria-label', T('Lyssna')); ear.onclick = () => { speakSeq([it.answer], it.answer); input.focus(); }; row.insertBefore(ear, go); }
    box.appendChild(row);
    app.appendChild(box);
    { const ex = exhaustNote(); if (ex) app.appendChild(ex); }
    feedbackEl = el('div', 'feedback');
    app.appendChild(feedbackEl);

    function showHint() {
        write.hinted = Math.min(write.hinted + 1, it.answer.length);
        hintLine.textContent = it.answer.slice(0, write.hinted).toUpperCase() + ' _'.repeat(it.answer.length - write.hinted);
        if (it.mode === 'count') hintLine.textContent = T('Räkna en och en!');
    }
    hintBtn.onclick = () => { showHint(); input.focus(); };
    async function check() {
        if (game.locked) return;
        const v = input.value.trim().toLowerCase();
        if (!v) return;
        const current = scene;
        if (lang === 'ar' ? arNorm(v) === arNorm(it.answer) : v === it.answer) {
            game.locked = true; game.stars++; saveProgress();
            input.classList.add('ok'); input.blur();
            hintLine.textContent = it.mode === 'word' ? it.answer.split('').join(' ').toUpperCase() : it.answer;
            hintLine.classList.add('done');
            const sc = document.querySelector('.stars'); if (sc) sc.textContent = '★ ' + game.stars;
            confettiBurst(); setFeedback(T('Bra jobbat! 🎉'), 'good');
            await Promise.all([feedbackFx(true, [it.answer, T('Rätt!')], it.answer + '. ' + T('Rätt!')), new Promise(r => setTimeout(r, 250))]);
            if (current !== scene || game.cat !== 'skriv') return;
            game.round++; newWriteRound();
        } else {
            input.classList.add('bad'); setFeedback(T('Försök igen!'), 'bad'); { const sp = v.split(''); const spell = sp.length <= 12 && sp.every(ch => audioMap[ch]); feedbackFx(false, (spell ? sp : []).concat([T('Nej, det är fel.')]), v + '. ' + T('Nej, det är fel.')); }
            setTimeout(() => { input.classList.remove('bad'); setFeedback('', ''); }, 450);
        }
    }
    go.onclick = check;
    input.onkeydown = e => { if (e.key === 'Enter') check(); };
    if (it.mode === 'word') hintLine.textContent = '_ '.repeat(it.answer.length).trim();
    setTimeout(() => input.focus(), 50);
}


/* ---------- mattespel (Celia): räknefrågor med sifferknappar ---------- */
const math = { q: null, typed: '' };
const MATH_CATS = ['plusminus', 'ganger', 'dela', 'blandat'];
const pick = arr => arr[Math.floor(Math.random() * arr.length)];
const rnd = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));
const MATH_SYMS = ['🍎','⭐','🎈','🐟','🌸','🍪'];
function mathSpace(cat, hard) {
    const out = [];
    (cat === 'blandat' ? ['plusminus', 'ganger', 'dela'] : [cat]).forEach(k => {
        if (k === 'plusminus') {
            const max = hard ? 20 : 10;
            for (let a = 1; a <= max - 1; a++) for (let b = 1; b <= max - a; b++) out.push([k, '+', a, b]);
            for (let a = 2; a <= max; a++) for (let b = 1; b <= a - 1; b++) out.push([k, '−', a, b]);
        } else if (k === 'ganger') {
            const bs = hard ? [1, 2, 3, 4, 5, 6, 10] : [1, 2, 3, 4, 5];
            for (let a = 2; a <= (hard ? 6 : 4); a++) bs.forEach(b => out.push([k, '×', a, b]));
        } else {
            for (let a = 2; a <= (hard ? 6 : 4); a++) for (let b = 1; b <= (hard ? 6 : 5); b++) out.push([k, '÷', a * b, a]);
        }
    });
    return out;
}
function newMathRound() {
    const hard = settings.level === 'hard';
    const scope = game.cat;
    const space = mathSpace(game.cat, hard);
    const keys = space.map(t => t.join(':'));
    const drawn = bagTake(keys, 1, lgetS('last', null, scope), scope);
    game.exhausted = drawn.exhausted;
    const t = space[keys.indexOf(drawn.keys[0])];
    lsetS('last', drawn.keys[0], scope);
    const kind = t[0], a = t[2], b = t[3], sym = pick(MATH_SYMS);
    let q;
    if (kind === 'plusminus') q = { kind, a, b, op: t[1], ans: t[1] === '+' ? a + b : a - b, sym, speech: a + (t[1] === '+' ? ' plus ' : ' minus ') + b };
    else if (kind === 'ganger') q = { kind, a, b, op: '×', ans: a * b, sym, speech: a + ' gånger ' + b };
    else q = { kind, a, b, op: '÷', ans: a / b, sym, speech: a + ' delat med ' + b };
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
    roundTimer = setTimeout(() => { if (current === scene && !game.locked) speakSeq(mathQ(math.q), mathFb(math.q)); }, 120);
}
function renderMath() {
    const cat = CATEGORIES[game.cat];
    document.title = siteName() + ': ' + T(cat.name);
    app.innerHTML = '';
    const head = el('div', 'gamehead');
    const back = el('button', 'icon-btn', backArrow());
    back.setAttribute('aria-label', T('Tillbaka'));
    back.onclick = () => { location.hash = '#/'; };
    head.appendChild(back);
    head.appendChild(el('h2', null, cat.icon + ' ' + T(cat.name)));
    head.appendChild(el('div', 'stars', '★ ' + game.stars));
    const gear = el('button', 'icon-btn', '⚙️');
    gear.setAttribute('aria-label', T('Inställningar'));
    gear.onclick = renderSettings;
    head.appendChild(gear);
    app.appendChild(head);
    { const ex = exhaustNote(); if (ex) app.appendChild(ex); }

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
    if (q.kind === 'dela') box.appendChild(el('div', 'write-lead', lang === 'ar' ? 'وزّع بالتساوي على ' + q.b + ' أصدقاء' : 'Dela lika på ' + q.b + ' kompisar'));
    if (q.kind === 'ganger') box.appendChild(el('div', 'write-lead', lang === 'ar' ? q.a + ' أكوام، بكل كومة ' + q.b : q.a + ' högar med ' + q.b + ' i varje'));
    const eq = el('div', 'math-eq');
    eq.appendChild(el('span', null, q.a + ' ' + q.op + ' ' + q.b + ' ='));
    const ansEl = el('span', 'math-ans', '?');
    eq.appendChild(ansEl);
    const ear = el('button', 'speak-btn', '🔊');
    ear.setAttribute('aria-label', T('Säg igen'));
    ear.onclick = () => { if (!game.locked) { clearTimeout(roundTimer); speakSeq(mathQ(q), mathFb(q)); } };
    eq.appendChild(ear);
    box.appendChild(eq);
    const pad = el('div', 'keypad');
    function refresh() { ansEl.textContent = math.typed || '?'; ansEl.classList.toggle('empty', !math.typed); }
    function press(k) {
        if (game.locked) return;
        if (k === 'del') math.typed = math.typed.slice(0, -1);
        else if (k === 'ok') { check(); return; }
        else if (math.typed.length < 2) { math.typed = (math.typed + k).replace(/^0+(?=\d)/, ''); clearTimeout(roundTimer); speakSeq([N(math.typed)], N(math.typed)); }
        refresh();
    }
    ['1','2','3','4','5','6','7','8','9','del','0','ok'].forEach(k => {
        const b = el('button', 'key' + (k === 'ok' ? ' key-ok' : k === 'del' ? ' key-del' : ''), k === 'del' ? '⌫' : k === 'ok' ? '✓' : k);
        if (k === 'del') b.setAttribute('aria-label', T('Sudda'));
        if (k === 'ok') b.setAttribute('aria-label', T('Klart'));
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
            confettiBurst(); setFeedback(T('Bra jobbat! 🎉'), 'good');
            await Promise.all([feedbackFx(true, [N(math.typed), T('Rätt!')], N(math.typed) + '. ' + T('Rätt!')), new Promise(r => setTimeout(r, 250))]);
            if (current !== scene || !MATH_CATS.includes(game.cat)) return;
            game.round++; newMathRound();
        } else {
            ansEl.classList.add('bad'); setFeedback(T('Försök igen!'), 'bad'); feedbackFx(false, [N(math.typed), T('Nej, det är fel.')], N(math.typed) + '. ' + T('Nej, det är fel.'));
            setTimeout(() => { ansEl.classList.remove('bad'); math.typed = ''; refresh(); setFeedback('', ''); }, 450);
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
        const back = el('button', 'icon-btn', backArrow());
        back.setAttribute('aria-label', T('Tillbaka'));
        back.onclick = () => { location.hash = '#/'; };
        bar.appendChild(back);
    } else {
        const brand = el('div', 'brand');
        brand.appendChild(el('span', 'logo', '🎈'));
        brand.appendChild(el('span', null, siteName()));
        bar.appendChild(brand);
    }
    if (title) bar.appendChild(el('h2', null, title));
    const gear = el('button', 'icon-btn', '⚙️');
    gear.setAttribute('aria-label', T('Inställningar'));
    gear.onclick = renderSettings;
    bar.appendChild(gear);
    return bar;
}

function renderHome() {
    document.title = siteName();
    app.innerHTML = '';
    app.appendChild(renderTopbar(null, false));
    const switcher = el('button','profile-switch', PROFILES[activeProfile].icon + ' ' + pname(activeProfile) + T(' · Byt spelare'));
    switcher.onclick = () => { leaveScene(); activeProfile = null; game.cat = null; applyMusic(); renderProfiles(); };
    app.appendChild(switcher);
    const hero = el('div', 'hero');
    hero.appendChild(el('h1', null, T('Vad vill du leka, ') + pname(activeProfile) + (lang === 'ar' ? '؟' : '?')));
    hero.appendChild(el('p', null, T(activeProfile === 'selma' ? 'Titta på bilden. Lyssna och hitta samma!' : 'Välj en lek och upptäck något nytt.')));
    app.appendChild(hero);
    const tiles = el('div', 'tiles');
    Object.entries(CATEGORIES).filter(([key]) => (activeProfile === 'celia' ? !SELMA_ONLY.includes(key) : (key !== 'skriv' && !MATH_CATS.includes(key) && SELMA_CATS.includes(key)))).forEach(([key, c]) => {
        const t = el('button', 'tile ' + key);
        t.appendChild(el('span', 'emoji', c.icon));
        t.appendChild(el('span', 'label', T(c.name)));
        t.appendChild(el('span', 'sub', progress[key] ? upptackter(progress[key]) : T(c.sub)));
        t.onclick = () => { location.hash = '#/' + key; };
        tiles.appendChild(t);
    });
    app.appendChild(tiles);
}

function renderGame(errorMsg) {
    const cat = CATEGORIES[game.cat];
    document.title = siteName() + ': ' + T(cat.name);
    app.innerHTML = '';

    const head = el('div', 'gamehead');
    const back = el('button', 'icon-btn', backArrow());
    back.setAttribute('aria-label', T('Tillbaka'));
    back.onclick = () => { location.hash = '#/'; };
    head.appendChild(back);
    head.appendChild(el('h2', null, cat.icon + ' ' + T(cat.name)));
    head.appendChild(el('div', 'stars', '★ ' + game.stars));
    const gear = el('button', 'icon-btn', '⚙️');
    gear.setAttribute('aria-label', T('Inställningar'));
    gear.onclick = renderSettings;
    head.appendChild(gear);
    app.appendChild(head);
    { const ex = exhaustNote(); if (ex) app.appendChild(ex); }

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
    again.setAttribute('aria-label', T('Säg igen'));
    again.onclick = () => { if(!game.locked) { clearTimeout(roundTimer); sayTarget(t); } };
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
    sheet.appendChild(el('h3', null, T('Inställningar')));

    const langRow = el('div', 'settings-row');
    langRow.appendChild(el('span', null, T('🌐 Språk')));
    const ls = document.createElement('select'); ls.className = 'langsel';
    [['sv', 'Svenska'], ['ar', 'العراقية (عربي)']].forEach(([v, l]) => { const o = document.createElement('option'); o.value = v; o.textContent = l; o.selected = lang === v; ls.appendChild(o); });
    ls.onchange = () => { setLang(ls.value); overlay.remove(); refreshView(); };
    langRow.appendChild(ls);
    sheet.appendChild(langRow);

    const volRow = el('div', 'settings-row');
    volRow.appendChild(el('span', null, T('🔊 Volym')));
    const vol = document.createElement('input');
    vol.type = 'range'; vol.min = 0; vol.max = 1; vol.step = 0.1; vol.value = settings.volume;
    vol.oninput = () => { settings.volume = parseFloat(vol.value); saveSettings(); applyMusic(); };
    volRow.appendChild(vol);
    sheet.appendChild(volRow);

    const musRow = el('div', 'settings-row');
    musRow.appendChild(el('span', null, T('🎵 Bakgrundsmusik')));
    const mus = document.createElement('input');
    mus.type = 'checkbox'; mus.checked = settings.music;
    mus.onchange = () => { settings.music = mus.checked; saveSettings(); applyMusic(); };
    musRow.appendChild(mus);
    sheet.appendChild(musRow);

    const spRow = el('div', 'settings-row');
    spRow.appendChild(el('span', null, T('🗣️ Läs upp')));
    const sp = document.createElement('input');
    sp.type = 'checkbox'; sp.checked = settings.speech;
    sp.onchange = () => { settings.speech = sp.checked; if(!sp.checked) stopSpeech(); saveSettings(); };
    spRow.appendChild(sp);
    sheet.appendChild(spRow);

    const hintRow = el('div', 'settings-row');
    hintRow.appendChild(el('span', null, T('🖼️ Visa ledtråd')));
    const hint = document.createElement('input');
    hint.type = 'checkbox'; hint.checked = settings.showHint;
    hint.onchange = () => { settings.showHint = hint.checked; saveSettings(); };
    hintRow.appendChild(hint);
    if (activeProfile !== 'selma') sheet.appendChild(hintRow);

    if (activeProfile === 'celia') {
        const levelRow = el('div','settings-row');
        levelRow.appendChild(el('span',null,T('🌱 Nivå')));
        const level = document.createElement('select');
        [['easy','Lugn'],['hard','Klurig']].forEach(([v,label]) => {
            const o = document.createElement('option'); o.value=v; o.textContent=T(label);
            o.selected = (settings.level || 'easy') === v; level.appendChild(o);
        });
        level.onchange = () => { settings.level=level.value; settings.cardCount=level.value==='hard'?16:9; settings.cardCountSet=false; settings.maxRange=level.value==='hard'?100:30; settings.minRange=1; saveSettings(); };
        levelRow.appendChild(level); sheet.appendChild(levelRow);
    }
    if (game.cat === 'pussel') {
        const pRow = el('div', 'settings-row');
        pRow.appendChild(el('span', null, T('🧩 Antal delar')));
        const ps = document.createElement('select');
        [0, 2, 3, 4, 6, 8, 9, 12].forEach(n => { const o = document.createElement('option'); o.value = n; o.textContent = n ? n : T('Automatisk'); if ((settings.pussPieces || 0) === n) o.selected = true; ps.appendChild(o); });
        ps.onchange = () => { settings.pussPieces = parseInt(ps.value); saveSettings(); };
        pRow.appendChild(ps); sheet.appendChild(pRow);
    }
    const ccRow = el('div', 'settings-row');
    if (game.cat === 'pussel') ccRow.style.display = 'none';
    ccRow.appendChild(el('span', null, T('🃏 Antal kort')));
    const cc = document.createElement('select');
    (activeProfile === 'selma' ? [2, 3, 4, 6, 9, 12, 16] : [6, 9, 12, 16]).forEach(n => {
        const o = document.createElement('option');
        o.value = n; o.textContent = n; if (settings.cardCount === n) o.selected = true;
        cc.appendChild(o);
    });
    cc.onchange = () => { settings.cardCount = parseInt(cc.value); settings.cardCountSet = true; saveSettings(); };
    ccRow.appendChild(cc);
    sheet.appendChild(ccRow);

    if (game.cat === 'siffror') {
        const rRow = el('div', 'settings-row');
        rRow.appendChild(el('span', null, T('🔢 Talområde')));
        const pair = el('div', 'range-pair');
        const mn = document.createElement('input');
        mn.type = 'number'; mn.value = settings.minRange; mn.min = 0; mn.setAttribute('aria-label', T('Minst'));
        const mx = document.createElement('input');
        mx.type = 'number'; mx.value = settings.maxRange; mx.min = 1; mx.setAttribute('aria-label', T('Högst'));
        mn.onchange = () => { settings.minRange = parseInt(mn.value); saveSettings(); };
        mx.onchange = () => { settings.maxRange = parseInt(mx.value); saveSettings(); };
        pair.appendChild(mn); pair.appendChild(mx);
        rRow.appendChild(pair);
        sheet.appendChild(rRow);
    }

    const row = el('div', 'btn-row');
    const close = el('button', 'btn', T('Klart'));
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
    if ((activeProfile === 'selma' && !SELMA_CATS.concat(['']).includes(h)) || ((h === 'skriv' || MATH_CATS.includes(h)) && activeProfile !== 'celia') || (SELMA_ONLY.includes(h) && activeProfile !== 'selma')) { game.cat = null; renderHome(); return; }
    if (CATEGORIES[h]) { startGame(h); }
    else { game.cat = null; renderHome(); }
}
/* ===== fas 1: nya spel (Selma: Para ihop, Pussel, Ballongpop. Celia: Klockan, Textuppgifter, Mönster) ===== */
const NXP = {"Hitta paret": "دوّر على الزوج", "Bra, ett par!": "عاش! زوج!", "Sätt biten på rätt plats": "حط القطعة بمكانها", "Klart! Vilken fin bild!": "خلصت! صورة حلوة!", "Vad är klockan?": "شكد الساعة؟", "Klockan är": "الساعة", "halv": "ونص", "kvart över": "وربع", "kvart i": "إلا ربع", "Vad kommer sen?": "شنو يجي بعدين؟", "Du har": "عندك", "Du får": "وصلك", "till.": "بعد.", "Du ger bort": "تعطي", "Hur många har du nu?": "هسه شكد عندك؟", "Hur många har du kvar?": "شكد بقالك؟", "Nu övar vi en gång till.": "نعيدها مرة ثانية.", "ett": "واحد", "två": "ثنين", "tre": "ثلاثة", "fyra": "أربعة", "fem": "خمسة", "sex": "ستة", "sju": "سبعة", "åtta": "ثمانية", "nio": "تسعة", "tio": "عشرة", "elva": "احدعش", "tolv": "اثنعش", "äpplen": "تفاحات", "bollar": "كرات", "bilar": "سيارات", "blommor": "ورود", "kakor": "كعكات", "fiskar": "سمكات", "ballonger": "بالونات", "stjärnor": "نجمات"};
const SVNUM = ['', 'ett', 'två', 'tre', 'fyra', 'fem', 'sex', 'sju', 'åtta', 'nio', 'tio', 'elva', 'tolv'];
const NXOBJ = [['🍎', 'äpplen', 'تفاحات'], ['⚽', 'bollar', 'كرات'], ['🚗', 'bilar', 'سيارات'], ['🌸', 'blommor', 'ورود'], ['🍪', 'kakor', 'كعكات'], ['🐟', 'fiskar', 'سمكات'], ['🎈', 'ballonger', 'بالونات'], ['⭐', 'stjärnor', 'نجمات']];
const NXTOK = ['🔴', '🔵', '🟢', '🟡', '⭐', '🌙', '🍇', '🍌', '🐟', '🌸'];
function TT(s) { return lang === 'ar' && NXP[s] ? NXP[s] : s; }
function nw(n) { return lang === 'ar' ? N(n) : SVNUM[n]; }
const rn = n => Math.floor(Math.random() * n);
Object.assign(CATEGORIES, {
    para: { name: 'Para ihop', icon: '👯', sub: 'Hitta paren' },
    pussel: { name: 'Pussel', icon: '🧩', sub: 'Dra biten på plats' },
    ballong: { name: 'Ballongpop', icon: '🎈', sub: 'Poppa rätt ballong' },
    klockan: { name: 'Ställ klockan', icon: '🕒', sub: 'Flytta visarna' },
    klockan2: { name: 'Vad är klockan?', icon: '⏰', sub: 'Skriv tiden' },
    text: { name: 'Textuppgifter', icon: '📖', sub: 'Små räknehistorier' },
    monster: { name: 'Mönster', icon: '🔁', sub: 'Vad kommer sen?' }
});
const SELMA_NEW = ['para', 'pussel', 'ballong'];
SELMA_CATS.push(...SELMA_NEW); SELMA_ONLY.push(...SELMA_NEW);
Object.assign(AR_UI, {
    'Para ihop': 'طابق الأزواج', 'Pussel': 'بزل', 'Ballongpop': 'فجّر البالونات', 'Klockan': 'الساعة', 'Textuppgifter': 'مسائل', 'Mönster': 'الأنماط',
    'Hitta paren': 'دوّر على الأزواج', 'Dra biten på plats': 'حط القطعة بمكانها', 'Poppa rätt ballong': 'فجّر البالونة الصحيحة',
    'Läs och ställ klockan': 'اقرأ وظبّط الساعة', 'Flytta visarna': 'حرّك العقارب', 'Skriv tiden': 'اكتب الوقت', 'Ställ klockan': 'ظبّط الساعة', 'Vad är klockan?': 'شكد الساعة؟', 'Små räknehistorier': 'حكايات حساب صغيرة', 'Vad kommer sen?': 'شنو يجي بعدين؟', 'Ställ klockan på': 'ظبّط الساعة على', 'Lyssna och räkna': 'اسمع وعدّ',
    'Nu har allt varit med en gång!': 'خلص كلشي مرة!', 'Byt övning': 'بدّل التمرين'
});
let nxLoaded = false;
(function () {
    const p = new Promise(res => { const sc = document.createElement('script'); sc.src = 'nx-clips.js?v=1'; sc.onload = () => { Object.assign(audioMap, window.__arclips || {}); nxLoaded = true; res(); }; sc.onerror = () => res(); document.head.appendChild(sc); });
    clipsLoaded = false; audioReady = Promise.all([audioReady, p]); audioReady.then(() => { clipsLoaded = true; });
    const st = document.createElement('style');
    st.textContent = '.nx-grid{display:grid;gap:12px;margin:12px 0}.nx-card .nx-back{font-size:clamp(34px,10vw,54px)}.nx-card.open{background:#fff8e1;color:#2d2a32}.nx-card.correct,.nx-card.correct.open{background:#d9f3e0;color:#2d2a32}.nx-stage{position:relative;margin:12px auto;touch-action:none}.nx-board{position:absolute;left:0;top:0;border-radius:18px;background:#fff;box-shadow:var(--shadow)}.nx-slot{position:absolute;overflow:hidden;box-sizing:border-box;border:2px dashed #c9c2d6}.nx-slot .nx-ph{opacity:.16;filter:grayscale(1)}.nx-piece{position:absolute;overflow:hidden;border-radius:10px;background:#fff;box-shadow:0 4px 12px rgba(45,42,50,.25);touch-action:none;cursor:grab;box-sizing:border-box}.nx-piece.placed{box-shadow:none;border-radius:0;cursor:default}.nx-sky{position:relative;height:340px;overflow:hidden;margin-top:8px}.nx-balloon{position:absolute;bottom:20px;width:84px;height:104px;border:0;border-radius:50% 50% 48% 48%;font-size:34px;font-weight:800;color:#fff;box-shadow:inset -8px -8px 0 rgba(0,0,0,.12),var(--shadow);animation:nxbob 2.6s ease-in-out infinite;transition:transform 1.1s ease-in,opacity 1.1s ease-in,bottom 1.1s ease-in}.nx-balloon:after{content:"";position:absolute;left:50%;top:100%;width:2px;height:60px;background:#8a8494}.nx-balloon.pop{transform:scale(1.6);opacity:0;transition:transform .3s,opacity .3s}.nx-balloon.away{bottom:420px;opacity:0;animation:none}@keyframes nxbob{0%,100%{transform:translateY(0)}50%{transform:translateY(-18px)}}.nx-clock,.nx-clock *,.nx-stage,.nx-stage *{-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}.nx-clock{display:block;margin:10px auto;width:min(78vw,300px);height:auto;touch-action:none}.nx-digital{font-size:44px;font-weight:800;text-align:center}.nx-story{background:#fff;border-radius:18px;padding:14px;margin:10px 0;box-shadow:var(--shadow);font-size:20px;font-weight:700;line-height:1.5}.nx-icons{font-size:26px;line-height:1.3;margin-top:6px;word-break:break-all}.nx-seq{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;font-size:40px;margin:14px 0;background:#fff;border-radius:18px;padding:12px;box-shadow:var(--shadow)}.nx-seq .q{border:3px dashed #c9c2d6;border-radius:12px;min-width:52px;text-align:center}.nx-review{display:inline-block;margin-left:8px}.nx-k2 .prompt{padding:8px 14px;min-height:0;margin:4px 0}.nx-k2 .prompt .lead{font-size:16px}.nx-k2 .nx-clock{width:min(44vw,170px);margin:4px auto}.nx-k2 .nx-timein{margin:2px 0;font-size:36px}.nx-k2 .nx-tf{height:52px;min-width:72px}.nx-k2 .nx-pad{gap:6px;margin:6px auto}.nx-k2 .nx-key{height:46px;font-size:24px}.nx-timein{display:flex;align-items:center;justify-content:center;gap:8px;font-size:44px;font-weight:800;margin:6px 0}.nx-tf{min-width:84px;height:68px;border:3px solid #c9c2d6;border-radius:16px;background:#fff;font:inherit;color:#2d2a32}.nx-tf.on{border-color:#f5a623;box-shadow:0 0 0 3px rgba(245,166,35,.3)}.nx-pad{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:8px auto;max-width:300px}.nx-key{height:58px;border:0;border-radius:14px;background:#fff;box-shadow:var(--shadow);font:inherit;font-size:28px;font-weight:800;color:#2d2a32}.nx-key.ok{background:#43b581;color:#fff}.nx-kropp{display:block;margin:6px auto;width:min(88vw,330px);height:auto;touch-action:manipulation;-webkit-user-select:none;user-select:none}.nx-kropp .kz{cursor:pointer;-webkit-tap-highlight-color:transparent}.nx-kropp.shake{animation:kshake .35s}@keyframes kshake{0%,100%{transform:translateX(0)}25%{transform:translateX(-8px)}75%{transform:translateX(8px)}}';
    document.head.appendChild(st);
})();

function nxFrame() {
    const cat = CATEGORIES[game.cat];
    document.title = siteName() + ': ' + T(cat.name);
    app.innerHTML = '';
    const head = el('div', 'gamehead');
    const back = el('button', 'icon-btn', backArrow());
    back.setAttribute('aria-label', T('Tillbaka'));
    back.onclick = () => { location.hash = '#/'; };
    head.appendChild(back);
    head.appendChild(el('h2', null, cat.icon + ' ' + T(cat.name)));
    head.appendChild(el('div', 'stars', '★ ' + game.stars));
    const gear = el('button', 'icon-btn', '⚙️');
    gear.setAttribute('aria-label', T('Inställningar'));
    gear.onclick = renderSettings;
    head.appendChild(gear);
    app.appendChild(head);
    { const ex = exhaustNote(); if (ex) app.appendChild(ex); }
    const body = el('div', 'nx-body');
    app.appendChild(body);
    feedbackEl = el('div', 'feedback');
    app.appendChild(feedbackEl);
    return body;
}
function lk(k) { return 'cs-' + k + '-' + activeProfile + '-' + game.cat; }
function lget(k, d) { try { const v = JSON.parse(localStorage.getItem(lk(k))); return v == null ? d : v; } catch (e) { return d; } }
function lset(k, v) { try { localStorage.setItem(lk(k), JSON.stringify(v)); } catch (e) {} }
function lkS(k, scope) { return 'cs-' + k + '-' + activeProfile + '-' + (scope || game.cat); }
function lgetS(k, d, scope) { try { const v = JSON.parse(localStorage.getItem(lkS(k, scope))); return v == null ? d : v; } catch (e) { return d; } }
function lsetS(k, v, scope) { try { localStorage.setItem(lkS(k, scope), JSON.stringify(v)); } catch (e) {} }
/* Variation: allt i poolen kommer en gång innan något återkommer.
   Per spel sparas vilka nycklar som visats ("shown"); nivå- och scenbyten
   bygger vidare på samma lista, så inget återkommer förrän hela den
   aktuella poolen setts. Missade kommer först i nästa omgång, men aldrig
   som direkt upprepning av den allra senaste frågan. */
function bagTake(allKeys, count, avoid, scope, missFn) {
    const inPool = new Set(allKeys);
    let stored = lgetS('shown', [], scope);
    if (!Array.isArray(stored)) stored = [];
    const stale = stored.filter(k => !inPool.has(k));
    const shownSet = new Set(stored.filter(k => inPool.has(k)));
    let exhausted = false;
    const out = [];
    const drawOne = (cands, av) => {
        if (!cands.length) return null;
        let c = cands;
        if (av != null && cands.length > 1) { const f = cands.filter(k => k !== av); if (f.length) c = f; }
        return c[Math.floor(Math.random() * c.length)];
    };
    while (out.length < count) {
        let unseen = allKeys.filter(k => !shownSet.has(k) && out.indexOf(k) === -1);
        if (!unseen.length) {
            exhausted = true;
            allKeys.forEach(k => shownSet.delete(k));
            unseen = allKeys.filter(k => out.indexOf(k) === -1);
            if (!unseen.length) break;
        }
        const missed = missFn ? missFn().filter(k => unseen.indexOf(k) !== -1) : [];
        let key = null;
        if (missed.length) {
            key = drawOne(missed, avoid);
            if (key === avoid) { const alt = unseen.filter(k => k !== avoid); if (alt.length) key = drawOne(alt, null); }
        } else key = drawOne(unseen, avoid);
        if (key == null) break;
        out.push(key);
        shownSet.add(key);
    }
    lsetS('shown', [...shownSet].concat(stale).slice(-300), scope);
    return { keys: out, exhausted };
}

function exhaustNote() {
    if (!game.exhausted) return null;
    const d = el('div', 'nx-exhaust');
    d.appendChild(el('span', null, T('Nu har allt varit med en gång!')));
    const b = el('button', 'btn secondary nx-exhaust-btn', T('Byt övning'));
    b.onclick = () => { location.hash = '#/'; };
    d.appendChild(b);
    return d;
}
function explicitCount() {
    const d = (PROFILES[activeProfile] && PROFILES[activeProfile].defaults) || {};
    return (settings.cardCountSet || settings.cardCount !== d.cardCount) ? settings.cardCount : null;
}
function lvl() { return Math.min(4, Math.max(1, lget('lvl', 1))); }
function levelStep(ok, need) {
    need = need || 3;
    let g = game.good || 0, b = game.bad || 0;
    if (ok) { g++; b = 0; } else { b++; g = 0; }
    const L = lvl();
    if (g >= need && L < 4) { lset('lvl', L + 1); g = 0; }
    if (b >= 2 && L > 1) { lset('lvl', L - 1); b = 0; }
    game.good = g; game.bad = b;
}
function missAdd(k, data) {
    const m = lget('miss', []).filter(x => x !== k); m.push(k); lset('miss', m.slice(-8));
    if (data) { const md = lget('md', {}); md[k] = data; const keep = {}; m.slice(-8).forEach(x => { if (md[x]) keep[x] = md[x]; }); lset('md', keep); }
}
function missDel(k) { lset('miss', lget('miss', []).filter(x => x !== k)); }
function missPick(keys) {
    if ((game.round || 1) < 2 || Math.random() > 0.5) return null;
    const m = lget('miss', []).filter(k => keys.includes(k) && k !== game.lastKey);
    return m.length ? m[0] : null;
}
function nextQ(gen) {
    const m = lget('miss', []).filter(k => k !== game.lastKey), md = lget('md', {});
    game.review = false;
    if ((game.round || 1) >= 2 && m.length && md[m[0]] && Math.random() < 0.5) { game.review = true; return md[m[0]]; }
    return gen();
}
function sayT(t) { return lang === 'ar' ? speakSeq(t.parts, t.speech) : speak(t.speech); }
function sayParts(parts) { return speakSeq(parts, parts.join(' ')); }
function autoSay(fn) {
    const cur = scene;
    const lead = game.review ? () => speakSeq([TT('Nu övar vi en gång till.')], TT('Nu övar vi en gång till.')) : () => Promise.resolve();
    roundTimer = setTimeout(() => { if (cur === scene && !game.locked) lead().then(() => { if (cur === scene && !game.locked) fn(); }); }, 120);
}
function promptBar(lead, main, onSay) {
    const prompt = el('div', 'prompt');
    const txt = el('div', 'text');
    const l = el('div', 'lead', lead);
    if (game.review) l.appendChild(el('span', 'nx-review', '🔁'));
    txt.appendChild(l);
    if (main) txt.appendChild(el('div', 'name target-value', main));
    prompt.appendChild(txt);
    const again = el('button', 'speak-btn', '🔊');
    again.setAttribute('aria-label', T('Säg igen'));
    again.onclick = () => { if (!game.locked) { clearTimeout(roundTimer); onSay(); } };
    prompt.appendChild(again);
    return prompt;
}
async function nxRight(parts, fb) {
    game.locked = true; game.stars++; saveProgress();
    const s = document.querySelector('.stars'); if (s) s.textContent = '★ ' + game.stars;
    confettiBurst(); setFeedback(T('Bra jobbat! 🎉'), 'good');
    const cur = scene;
    await Promise.all([feedbackFx(true, parts, fb), new Promise(r => setTimeout(r, 250))]);
    if (cur !== scene || !game.cat) return;
    game.round++; newRound();
}
function nxWrong(parts, fb) {
    setFeedback(T('Försök igen!'), 'bad');
    feedbackFx(false, parts, fb);
    const cur = scene;
    clearTimeout(feedbackTimer);
    feedbackTimer = setTimeout(() => { if (cur === scene) setFeedback('', ''); }, 700);
}
function cardBtn(face, big) {
    const c = el('button', 'card');
    if (big) { c.textContent = face; c.style.fontSize = big; } else c.appendChild(el('span', 'emoji', face));
    return c;
}

/* --- Para ihop --- */
function gPara() {
    const L = lvl(), ec = explicitCount(), pairs = ec ? Math.max(1, Math.min(8, Math.floor(ec / 2))) : [2, 3, 4, 6][L - 1];
    const pool = localizeList(ANIMALS.concat(FOOD));
    const drawn = bagTake(pool.map(p => p[0]), pairs, null, 'para', () => lget('miss', []));
    game.exhausted = drawn.exhausted;
    const byFace = {}; pool.forEach(p => { byFace[p[0]] = p[1]; });
    const items = drawn.keys.map(f => [f, byFace[f]]);
    const body = nxFrame();
    const deck = sample(items.concat(items), pairs * 2);
    const grid = el('div', 'nx-grid');
    grid.style.gridTemplateColumns = 'repeat(' + (pairs <= 2 ? 2 : pairs === 3 ? 3 : 4) + ',1fr)';
    body.appendChild(grid);
    let first = null, busy = false, matched = 0, mism = 0;
    deck.forEach(([face, name]) => {
        const c = el('button', 'card nx-card'); const bk = el('span', 'emoji nx-back', '❓');
        c.appendChild(bk); c.dataset.k = face; c.setAttribute('aria-label', '?');
        c.onclick = () => {
            if (busy || game.locked || c.dataset.done || c === first) return;
            c.classList.add('open'); bk.textContent = face;
            if (!first) { first = c; speakSeq([name], name); return; }
            const a = first; first = null;
            if (a.dataset.k === face) {
                a.dataset.done = c.dataset.done = '1'; a.classList.add('correct'); c.classList.add('correct'); matched++; missDel(face);
                if (matched === pairs) { levelStep(mism <= pairs, 2); nxRight([name, TT('Bra, ett par!')], name + '. ' + TT('Bra, ett par!')); }
                else speakSeq([name, TT('Bra, ett par!')], name + '. ' + TT('Bra, ett par!'));
            } else {
                busy = true; mism++; missAdd(face); speakSeq([name], name);
                const cur = scene;
                setTimeout(() => { if (cur !== scene) return; [a, c].forEach(x => { x.classList.remove('open'); x.querySelector('.nx-back').textContent = '❓'; }); busy = false; }, 1000);
            }
        };
        grid.appendChild(c);
    });
}

/* --- Pussel --- */
function gPussel() {
    const L = lvl(), [cols, rows] = settings.pussPieces ? ({ 2: [2, 1], 3: [3, 1], 4: [2, 2], 6: [3, 2], 8: [4, 2], 9: [3, 3], 12: [4, 3] })[settings.pussPieces] : [[3, 1], [2, 2], [3, 2], [2, 3]][L - 1], n = cols * rows;
    const pool = localizeList(ANIMALS.concat(FOOD));
    const drawn = bagTake(pool.map(p => p[0]), 1, game.lastKey, 'pussel', () => lget('miss', []));
    game.exhausted = drawn.exhausted;
    const [face, name] = pool.find(p => p[0] === drawn.keys[0]);
    game.lastKey = face;
    const body = nxFrame();
    const S = Math.min(230, Math.floor(Math.min(innerWidth, 520) - 60)), pw = S / cols, ph = S / rows;
    const trayRows = Math.ceil(n / cols), trayTop = S + 18;
    const stage = el('div', 'nx-stage'); stage.style.width = S + 'px'; stage.style.height = (trayTop + trayRows * (ph + 8)) + 'px';
    body.appendChild(stage);
    const board = el('div', 'nx-board'); board.style.width = board.style.height = S + 'px'; stage.appendChild(board);
    const inner = (c, r) => { const w = el('div', 'nx-ph', face); w.style.cssText = 'position:absolute;left:' + (-c * pw) + 'px;top:' + (-r * ph) + 'px;width:' + S + 'px;height:' + S + 'px;display:flex;align-items:center;justify-content:center;font-size:' + (S * 0.7) + 'px;line-height:1'; return w; };
    const spots = sample([...Array(n).keys()], n);
    let placed = 0, misses = 0;
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
        const idx = r * cols + c;
        const slot = el('div', 'nx-slot'); slot.style.cssText = 'left:' + (c * pw) + 'px;top:' + (r * ph) + 'px;width:' + pw + 'px;height:' + ph + 'px'; slot.appendChild(inner(c, r)); board.appendChild(slot);
        const p = el('div', 'nx-piece'); p.dataset.idx = idx;
        const sp = spots[idx], hx = (sp % cols) * pw, hy = trayTop + Math.floor(sp / cols) * (ph + 8), tx = c * pw, ty = r * ph;
        p.style.cssText = 'left:' + hx + 'px;top:' + hy + 'px;width:' + pw + 'px;height:' + ph + 'px;z-index:5'; p.appendChild(inner(c, r));
        let st = null;
        const snap = () => {
            p.style.transition = 'left .25s,top .25s'; p.style.left = tx + 'px'; p.style.top = ty + 'px'; p.classList.add('placed'); p.dataset.placed = '1'; p.style.zIndex = 2;
            playSound('clickSound'); placed++;
            if (placed === n) { levelStep(misses <= n, 2); if (misses >= 3) missAdd(face); else missDel(face); nxRight([name, TT('Klart! Vilken fin bild!')], name + '. ' + TT('Klart! Vilken fin bild!')); }
        };
        p.onpointerdown = e => { e.preventDefault(); if (p.dataset.placed || game.locked) return; try { p.setPointerCapture(e.pointerId); } catch (x) {} st = { sx: e.clientX, sy: e.clientY, ox: parseFloat(p.style.left), oy: parseFloat(p.style.top), moved: false }; p.style.transition = 'none'; p.style.zIndex = 20; };
        p.onpointermove = e => { if (!st) return; const dx = e.clientX - st.sx, dy = e.clientY - st.sy; if (Math.abs(dx) + Math.abs(dy) > 8) st.moved = true; p.style.left = (st.ox + dx) + 'px'; p.style.top = (st.oy + dy) + 'px'; };
        p.onpointerup = p.onpointercancel = e => {
            if (!st) return; const s = st; st = null;
            const near = Math.hypot(parseFloat(p.style.left) - tx, parseFloat(p.style.top) - ty) < Math.max(pw, ph) * 0.6;
            if (!s.moved || near) snap();
            else { misses++; p.style.transition = 'left .3s,top .3s'; p.style.left = hx + 'px'; p.style.top = hy + 'px'; p.style.zIndex = 5; }
        };
        stage.appendChild(p);
    }
}

/* --- Ballongpop --- */
function gBallong() {
    const L = lvl(), ec = explicitCount(), n = ec ? Math.max(3, Math.min(8, ec)) : [3, 4, 5, 5][L - 1];
    const useFig = game.round % 2 === 0;
    const sv = [game.cat, settings.cardCount, settings.minRange, settings.maxRange];
    let built;
    try { game.cat = useFig ? 'figurer' : 'siffror'; settings.cardCount = n; settings.minRange = 1; settings.maxRange = Math.max([5, 10, 20, 30][L - 1], n * 2); built = buildRound('ballong:' + (useFig ? 'fig' : 'sif')); }
    finally { game.cat = sv[0]; settings.cardCount = sv[1]; settings.minRange = sv[2]; settings.maxRange = sv[3]; }
    const vals = built.values || [];
    const target = vals.find(v => v.key === built.targetKey) || pick(vals);
    game.review = lgetS('miss', [], 'ballong').indexOf(target.key) !== -1;
    game.lastKey = target.key; game.target = target; game.locked = false;
    const body = nxFrame();
    body.appendChild(promptBar(target.prompt + ':', target.name || target.face, () => sayT(target)));
    const sky = el('div', 'nx-sky'); body.appendChild(sky);
    const colors = ['#ef5b5b', '#4a90e2', '#43b581', '#f5a623', '#a259d9', '#f06fa8'];
    sample(vals, vals.length).forEach((v, i) => {
        const b = el('button', 'nx-balloon'); if (vals.length > 5) { const per = Math.ceil(vals.length / 2), col = i % per, row = Math.floor(i / per); b.style.width = '64px'; b.style.height = '80px'; b.style.fontSize = '26px'; b.style.bottom = (row ? 170 : 20) + 'px'; b.style.left = 'calc(' + ((col + 0.5) * 100 / per) + '% - 32px)'; } else b.style.left = 'calc(' + ((i + 0.5) * 100 / vals.length) + '% - 42px)'; b.style.background = colors[i % colors.length]; b.style.animationDelay = (i * 0.4) + 's';
        b.textContent = v.face; b.setAttribute('aria-label', v.name || v.face);
        b.onclick = () => {
            if (game.locked || b.dataset.gone) return;
            clearTimeout(roundTimer); stopSpeech();
            const sk = v.say || String(v.key).toLowerCase();
            if (v.key === target.key) { b.classList.add('pop'); missDel(target.key); levelStep(true); nxRight([sk, T('Rätt!')], sk + '. ' + T('Rätt!')); }
            else { b.dataset.gone = '1'; b.classList.add('away'); b.style.bottom = '420px'; missAdd(target.key); levelStep(false); speakSeq([sk], sk); }
        };
        sky.appendChild(b);
    });
    autoSay(() => sayT(target));
}

/* --- Klockan --- */
function svgEl(tag, attrs) { const e = document.createElementNS('http://www.w3.org/2000/svg', tag); Object.keys(attrs || {}).forEach(k => e.setAttribute(k, attrs[k])); return e; }
function clockSvg(hAng, mAng) {
    const svg = svgEl('svg', { viewBox: '0 0 200 200', class: 'nx-clock' });
    svg.appendChild(svgEl('circle', { cx: 100, cy: 100, r: 94, fill: '#fff', stroke: '#2d2a32', 'stroke-width': 5 }));
    for (let i = 1; i <= 12; i++) {
        const a = i * Math.PI / 6, t = svgEl('text', { x: 100 + 76 * Math.sin(a), y: 100 - 76 * Math.cos(a) + 7, 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 800, fill: '#2d2a32' });
        t.textContent = i; svg.appendChild(t);
    }
    const hh = svgEl('line', { x1: 100, y1: 100, x2: 100, y2: 56, stroke: '#2d2a32', 'stroke-width': 9, 'stroke-linecap': 'round' });
    const mh = svgEl('line', { x1: 100, y1: 100, x2: 100, y2: 28, stroke: '#e0457b', 'stroke-width': 6, 'stroke-linecap': 'round' });
    svg.appendChild(hh); svg.appendChild(mh); svg.appendChild(svgEl('circle', { cx: 100, cy: 100, r: 7, fill: '#2d2a32' }));
    const set = (h, m) => { hh.setAttribute('transform', 'rotate(' + h + ' 100 100)'); mh.setAttribute('transform', 'rotate(' + m + ' 100 100)'); svg._h = h; svg._m = m; };
    svg.setHands = set; set(hAng, mAng);
    return svg;
}
function timeParts(h, m) {
    const nh = h % 12 + 1;
    if (lang === 'ar') {
        if (m === 0) return ['الساعة', N(h)];
        if (m === 30) return ['الساعة', N(h), TT('halv')];
        if (m === 15) return ['الساعة', N(h), TT('kvart över')];
        return ['الساعة', N(nh), TT('kvart i')];
    }
    if (m === 0) return ['Klockan är', nw(h)];
    if (m === 30) return ['Klockan är', 'halv', nw(nh)];
    if (m === 15) return ['Klockan är', 'kvart över', nw(h)];
    return ['Klockan är', 'kvart i', nw(nh)];
}
function digital(h, m) { return h + ':' + (m < 10 ? '0' : '') + m; }
function angDiff(a, b) { const d = Math.abs(((a - b) % 360 + 540) % 360 - 180); return d; }
function gKlockan() {
    const L = Math.min(3, lvl());
    const mode = 'set';
    const msL = [[0], [0, 30], [0, 15, 30, 45]][L - 1], keysL = [];
    msL.forEach(mm => { for (let hh = 1; hh <= 12; hh++) keysL.push(mode + ':' + hh + ':' + mm); });
    const drawn = bagTake(keysL, 1, game.lastKey, 'klockan', () => lget('miss', []));
    game.exhausted = drawn.exhausted;
    const kp = drawn.keys[0].split(':');
    const q = { mode, h: +kp[1], m: +kp[2], key: drawn.keys[0] };
    game.review = lget('miss', []).indexOf(q.key) !== -1;
    game.lastKey = q.key; const { h, m } = q;
    const body = nxFrame();
    const parts = timeParts(h, m), fb = parts.join(' ');
    const hA = (h % 12) * 30 + m * 0.5, mA = m * 6;
    if (q.mode === 'read') {
        body.appendChild(promptBar(TT('Vad är klockan?'), '', () => sayParts([TT('Vad är klockan?')])));
        body.appendChild(clockSvg(hA, mA));
        const opts = new Set([digital(h, m)]); const ms = [0, 15, 30, 45];
        let guard = 0;
        while (opts.size < 4 && guard++ < 50) { const r = rn(3); opts.add(r === 0 ? digital(h, pick(ms)) : r === 1 ? digital(1 + rn(12), m) : digital(h % 12 + 1, m)); }
        const grid = el('div', 'grid n4');
        sample([...opts], opts.size).forEach(d => {
            const c = cardBtn(d, '30px');
            c.onclick = () => {
                if (game.locked) return; clearTimeout(roundTimer); stopSpeech();
                if (d === digital(h, m)) { missDel(q.key); levelStep(true); c.classList.add('correct'); nxRight(parts, fb); }
                else { c.classList.add('wrong'); missAdd(q.key, q); levelStep(false); nxWrong([T('Nej, det är fel.')], T('Nej, det är fel.')); setTimeout(() => c.classList.remove('wrong'), 450); }
            };
            grid.appendChild(c);
        });
        body.appendChild(grid);
        autoSay(() => sayParts([TT('Vad är klockan?')]));
    } else {
        body.appendChild(promptBar(T('Ställ klockan på') + ':', '', () => sayParts(parts)));
        body.appendChild(el('div', 'nx-digital', digital(h, m)));
        const svg = clockSvg(((h + 3) % 12) * 30, ((m / 5 + 4) % 12) * 30); body.appendChild(svg);
        let sel = null, tries = 0, solved = false;
        const ang = e => { const r = svg.getBoundingClientRect(); return (Math.atan2(e.clientX - (r.left + r.width / 2), -(e.clientY - (r.top + r.height / 2))) * 180 / Math.PI + 360) % 360; };
        const tip = (a, len) => [Math.sin(a * Math.PI / 180) * len, -Math.cos(a * Math.PI / 180) * len];
        svg.onpointerdown = e => {
            e.preventDefault(); if (game.locked) return; try { svg.setPointerCapture(e.pointerId); } catch (x) {}
            const r = svg.getBoundingClientRect(), sc = r.width / 200, px = e.clientX - (r.left + r.width / 2), py = e.clientY - (r.top + r.height / 2);
            const th = tip(svg._h, 44 * sc), tm = tip(svg._m, 72 * sc);
            sel = Math.hypot(px - th[0], py - th[1]) < Math.hypot(px - tm[0], py - tm[1]) ? 'h' : 'm';
            svg.onpointermove(e);
        };
        svg.onpointermove = e => {
            if (sel) e.preventDefault(); if (!sel || game.locked) return; const a = ang(e);
            if (sel === 'm') svg.setHands(svg._h, Math.round(a / 30) * 30 % 360); else svg.setHands(Math.round(a / 7.5) * 7.5 % 360, svg._m);
        };
        svg.onpointerup = svg.onpointercancel = e => {
            if (!sel) return; sel = null; if (game.locked || solved) return;
            if (angDiff(svg._m, mA) < 1 && angDiff(svg._h, hA) <= 12) { solved = true; missDel(q.key); levelStep(tries < 5); nxRight(parts, fb); }
            else { tries++; if (tries === 3) { missAdd(q.key, q); levelStep(false); } if (tries >= 2) setFeedback(T('Försök igen!'), 'bad'); }
        };
        autoSay(() => sayParts(parts));
    }
}

function gKlockan2() {
    const L = Math.min(3, lvl());
    const msL = [[0], [0, 30], [0, 15, 30, 45]][L - 1], keysL = [];
    msL.forEach(mm => { for (let hh = 1; hh <= 12; hh++) keysL.push('in:' + hh + ':' + mm); });
    const drawn = bagTake(keysL, 1, game.lastKey, 'klockan2', () => lget('miss', []));
    game.exhausted = drawn.exhausted;
    const kp = drawn.keys[0].split(':');
    const q = { h: +kp[1], m: +kp[2], key: drawn.keys[0] };
    game.review = lget('miss', []).indexOf(q.key) !== -1;
    game.lastKey = q.key; const { h, m } = q; game.locked = false;
    const body = nxFrame(); body.classList.add('nx-k2');
    const parts = timeParts(h, m), fb = parts.join(' ');
    body.appendChild(promptBar(TT('Vad är klockan?'), '', () => sayParts([TT('Vad är klockan?')])));
    body.appendChild(clockSvg((h % 12) * 30 + m * 0.5, m * 6));
    let hh = '', mm = '', act = 'h';
    const disp = el('div', 'nx-timein'); disp.dir = 'ltr';
    const fh = el('button', 'nx-tf'), colon = el('span', null, ':'), fm = el('button', 'nx-tf');
    fh.onclick = () => { act = 'h'; draw(); }; fm.onclick = () => { act = 'm'; draw(); };
    disp.appendChild(fh); disp.appendChild(colon); disp.appendChild(fm); body.appendChild(disp);
    const draw = () => { fh.textContent = hh || '–'; fm.textContent = mm || '–'; fh.classList.toggle('on', act === 'h'); fm.classList.toggle('on', act === 'm'); };
    const pad = el('div', 'nx-pad'); pad.dir = 'ltr';
    const press = d => {
        if (game.locked) return; clearTimeout(roundTimer);
        if (d === 'del') { if (act === 'm' && mm) mm = mm.slice(0, -1); else if (act === 'm') act = 'h'; else hh = hh.slice(0, -1); draw(); return; }
        if (d === 'ok') {
            if (!hh || !mm) return;
            stopSpeech();
            if (parseInt(hh, 10) === h && parseInt(mm, 10) === m) { missDel(q.key); levelStep(true); nxRight(parts, fb); }
            else { missAdd(q.key, q); levelStep(false); nxWrong([T('Nej, det är fel.')], T('Nej, det är fel.')); mm = ''; act = 'm'; draw(); }
            return;
        }
        if (act === 'h') { hh += d; if (hh.length >= 2 || +d >= 2) { hh = hh.slice(0, 2); act = 'm'; } }
        else { mm += d; mm = mm.slice(0, 2); }
        draw();
    };
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'del', '0', 'ok'].forEach(k => {
        const b = el('button', 'nx-key' + (k === 'ok' ? ' ok' : ''), k === 'del' ? '⌫' : k === 'ok' ? '✔' : k);
        b.onclick = () => press(k); pad.appendChild(b);
    });
    body.appendChild(pad); draw();
    autoSay(() => sayParts([TT('Vad är klockan?')]));
}

/* --- Textuppgifter --- */
function gText() {
    const L = lvl();
    const keysT = [];
    const addMax = [6, 8, 12, 12][L - 1];
    if (L !== 3) for (let a = 2; a <= addMax - 1; a++) for (let b = 2; b <= addMax - 1 && a + b <= addMax; b++) for (let o = 0; o < NXOBJ.length; o++) keysT.push(a + '+' + b + ':' + o);
    if (L >= 3) for (let a = 4; a <= 12; a++) for (let b = 2; b <= a - 2; b++) for (let o = 0; o < NXOBJ.length; o++) keysT.push(a + '-' + b + ':' + o);
    const drawn = bagTake(keysT, 1, game.lastKey, 'text', () => lget('miss', []));
    game.exhausted = drawn.exhausted;
    game.review = lget('miss', []).indexOf(drawn.keys[0]) !== -1;
    const tp = drawn.keys[0].split(':'), tab = tp[0].split(/[+-]/);
    const q = { a: +tab[0], b: +tab[1], sub: tp[0].indexOf('-') !== -1, o: +tp[1], key: drawn.keys[0] };
    const body = nxFrame();
    game.lastKey = q.key;
    const { a, b, sub, o } = q, ans = sub ? a - b : a + b, ob = NXOBJ[o], objName = lang === 'ar' ? ob[2] : ob[1];
    let parts, line;
    if (lang === 'ar') {
        parts = sub ? [TT('Du har'), N(a), objName, TT('Du ger bort'), N(b), TT('Hur många har du kvar?')] : [TT('Du har'), N(a), objName, TT('Du får'), N(b), TT('till.'), TT('Hur många har du nu?')];
        line = sub ? TT('Du har') + ' ' + a + ' ' + objName + '. ' + TT('Du ger bort') + ' ' + b + '. ' + TT('Hur många har du kvar?') : TT('Du har') + ' ' + a + ' ' + objName + '. ' + TT('Du får') + ' ' + b + ' ' + TT('till.') + ' ' + TT('Hur många har du nu?');
    } else {
        parts = sub ? ['Du har', nw(a), objName, 'Du ger bort', nw(b), 'Hur många har du kvar?'] : ['Du har', nw(a), objName, 'Du får', nw(b), 'till.', 'Hur många har du nu?'];
        line = sub ? 'Du har ' + a + ' ' + objName + '. Du ger bort ' + b + '. Hur många har du kvar?' : 'Du har ' + a + ' ' + objName + '. Du får ' + b + ' till. Hur många har du nu?';
    }
    const fb = parts.join(' ');
    body.appendChild(promptBar(T('Lyssna och räkna'), '', () => sayParts(parts)));
    const story = el('div', 'nx-story'); story.appendChild(el('div', null, line));
    story.appendChild(el('div', 'nx-icons', ob[0].repeat(a) + (sub ? '' : ' + ' + ob[0].repeat(b))));
    body.appendChild(story);
    const opts = new Set([ans]); [ans + 1, ans - 1, ans + 2, ans - 2, a, b, ans + 3].forEach(x => { if (opts.size < 4 && x >= 1 && x <= 12) opts.add(x); });
    const grid = el('div', 'grid n4');
    sample([...opts], opts.size).forEach(v => {
        const c = cardBtn(String(v), '34px');
        c.onclick = () => {
            if (game.locked) return; clearTimeout(roundTimer); stopSpeech();
            const w = nw(v);
            if (v === ans) { missDel(q.key); levelStep(true); c.classList.add('correct'); nxRight([w, T('Rätt!')], w + '. ' + T('Rätt!')); }
            else { c.classList.add('wrong'); missAdd(q.key, q); levelStep(false); nxWrong([w, T('Nej, det är fel.')], w + '. ' + T('Nej, det är fel.')); setTimeout(() => c.classList.remove('wrong'), 450); }
        };
        grid.appendChild(c);
    });
    body.appendChild(grid);
    autoSay(() => sayParts(parts));
}

/* --- Mönster --- */
function gMonster() {
    const L = lvl();
    const keysM = [];
    if (L < 4) {
        const shapes = L === 1 ? [[0, 1, 0, 1, 0, 1]] : L === 2 ? [[0, 0, 1, 0, 0, 1], [0, 1, 1, 0, 1, 1]] : [[0, 1, 2, 0, 1, 2]];
        shapes.forEach(sh => {
            if (L === 3) { for (let i = 0; i < NXTOK.length; i++) for (let j = 0; j < NXTOK.length; j++) { if (j === i) continue; for (let k = 0; k < NXTOK.length; k++) { if (k === i || k === j) continue; keysM.push('p' + sh.join('') + ':' + i + ',' + j + ',' + k); } } }
            else { for (let i = 0; i < NXTOK.length; i++) for (let j = 0; j < NXTOK.length; j++) { if (j === i) continue; keysM.push('p' + sh.join('') + ':' + i + ',' + j); } }
        });
    } else {
        [2, 3, 5, 10].forEach(step => { for (let start = 1; start <= 10; start++) keysM.push('n' + start + ':' + step); });
    }
    const drawn = bagTake(keysM, 1, game.lastKey, 'monster', () => lget('miss', []));
    game.exhausted = drawn.exhausted;
    game.review = lget('miss', []).indexOf(drawn.keys[0]) !== -1;
    let q;
    const mk2 = drawn.keys[0];
    if (mk2[0] === 'p') {
        const pp = mk2.split(':'), shape = pp[0].slice(1).split('').map(Number), t = pp[1].split(',').map(i => NXTOK[+i]);
        const full = shape.map(i => t[i]);
        q = { kind: 'tok', shown: full.slice(0, 5), ans: full[5], set: t, key: mk2 };
    } else {
        const np = mk2.slice(1).split(':'), start = +np[0], step = +np[1], seq = [0, 1, 2, 3, 4].map(i => start + i * step);
        q = { kind: 'num', shown: seq.slice(0, 4), ans: seq[4], step, key: mk2 };
    }
    const body = nxFrame();
    game.lastKey = q.key;
    body.appendChild(promptBar(TT('Vad kommer sen?'), '', () => sayParts([TT('Vad kommer sen?')])));
    const seq = el('div', 'nx-seq');
    q.shown.forEach(x => seq.appendChild(el('span', null, String(x))));
    seq.appendChild(el('span', 'q', '❓'));
    body.appendChild(seq);
    const opts = new Set([q.ans]);
    if (q.kind === 'tok') { q.set.forEach(x => opts.add(x)); sample(NXTOK, 10).forEach(x => { if (opts.size < 4) opts.add(x); }); }
    else [q.ans + q.step, q.ans - q.step, q.ans + 1, q.ans - 1].forEach(x => { if (opts.size < 4 && x > 0) opts.add(x); });
    const grid = el('div', 'grid n4');
    sample([...opts], opts.size).forEach(v => {
        const c = q.kind === 'tok' ? cardBtn(v) : cardBtn(String(v), '34px');
        c.onclick = () => {
            if (game.locked) return; clearTimeout(roundTimer); stopSpeech();
            if (v === q.ans) { missDel(q.key); levelStep(true); c.classList.add('correct'); const w = q.kind === 'num' ? [String(v)] : []; nxRight(w.concat([T('Rätt!')]), T('Rätt!')); }
            else { c.classList.add('wrong'); missAdd(q.key, q); levelStep(false); nxWrong([T('Nej, det är fel.')], T('Nej, det är fel.')); setTimeout(() => c.classList.remove('wrong'), 450); }
        };
        grid.appendChild(c);
    });
    body.appendChild(grid);
    autoSay(() => sayParts([TT('Vad kommer sen?')]));
}


/* --- Kroppen: peka på ansikte och kropp --- */
const KFACE = [
  ['👄', [['e', 150, 228, 62, 44]]], ['👁️', [['e', 103, 118, 40, 34], ['e', 197, 118, 40, 34]]], ['👃', [['e', 150, 170, 30, 32]]],
  ['👂', [['e', 30, 150, 30, 44], ['e', 270, 150, 30, 44]]], ['🦷', [['e', 150, 208, 36, 13]]], ['👅', [['e', 150, 244, 28, 16]]]];
const KBODY = [
  ['💪', [['l', 96, 135, 52, 212, 58], ['l', 204, 135, 248, 212, 58]]], ['🦵', [['l', 128, 250, 124, 350, 58], ['l', 172, 250, 176, 350, 58]]],
  ['✋', [['e', 42, 236, 30, 30], ['e', 258, 236, 30, 30]]], ['🦶', [['e', 112, 378, 40, 26], ['e', 188, 378, 40, 26]]]];
function kSvg(scene) {
  const NS = 'http://www.w3.org/2000/svg', sk = '#f6c89f', sk2 = '#e9a77a', dk = '#2d2a32';
  const svg = svgEl('svg', { viewBox: scene === 'face' ? '0 0 300 300' : '0 0 300 420', class: 'nx-kropp' });
  const add = (t, a) => { const e = svgEl(t, a); svg.appendChild(e); return e; };
  if (scene === 'face') {
    add('ellipse', { cx: 30, cy: 150, rx: 24, ry: 36, fill: sk2 }); add('ellipse', { cx: 270, cy: 150, rx: 24, ry: 36, fill: sk2 });
    add('ellipse', { cx: 30, cy: 150, rx: 11, ry: 20, fill: '#d98a5f' }); add('ellipse', { cx: 270, cy: 150, rx: 11, ry: 20, fill: '#d98a5f' });
    add('ellipse', { cx: 150, cy: 150, rx: 120, ry: 135, fill: sk });
    add('path', { d: 'M40 120 Q50 22 150 18 Q250 22 260 120 Q215 70 150 72 Q85 70 40 120Z', fill: '#7a4a2b' });
    [103, 197].forEach(x => { add('ellipse', { cx: x, cy: 118, rx: 27, ry: 23, fill: '#fff', stroke: dk, 'stroke-width': 3 }); add('circle', { cx: x, cy: 120, r: 12, fill: '#3b7dd8' }); add('circle', { cx: x, cy: 120, r: 6, fill: dk }); add('circle', { cx: x + 4, cy: 115, r: 3, fill: '#fff' }); });
    add('path', { d: 'M150 150 Q128 182 150 188 Q172 182 150 150Z', fill: sk2 });
    add('path', { d: 'M96 212 Q150 196 204 212 Q196 266 150 268 Q104 266 96 212Z', fill: '#8c2f3c' });
    add('path', { d: 'M114 205 Q150 197 186 205 L184 220 Q150 214 116 220Z', fill: '#fff' });
    add('path', { d: 'M122 248 Q150 224 178 248 Q166 268 150 268 Q134 268 122 248Z', fill: '#ee6f8a' });
    add('circle', { cx: 62, cy: 190, r: 14, fill: '#f4a08a', opacity: .5 }); add('circle', { cx: 238, cy: 190, r: 14, fill: '#f4a08a', opacity: .5 });
  } else {
    [[96, 135, 52, 212], [204, 135, 248, 212]].forEach(a => add('line', { x1: a[0], y1: a[1], x2: a[2], y2: a[3], stroke: '#4a90e2', 'stroke-width': 40, 'stroke-linecap': 'round' }));
    [[128, 250, 124, 350], [172, 250, 176, 350]].forEach(a => add('line', { x1: a[0], y1: a[1], x2: a[2], y2: a[3], stroke: '#3a4a8a', 'stroke-width': 40, 'stroke-linecap': 'round' }));
    add('rect', { x: 90, y: 105, width: 120, height: 160, rx: 40, fill: '#4a90e2' });
    [42, 258].forEach(x => add('circle', { cx: x, cy: 236, r: 22, fill: sk }));
    [112, 188].forEach(x => add('ellipse', { cx: x, cy: 378, rx: 32, ry: 18, fill: '#ee5a6f' }));
    add('circle', { cx: 150, cy: 62, r: 48, fill: sk }); add('path', { d: 'M102 58 Q110 14 150 14 Q190 14 198 58 Q170 36 150 38 Q130 36 102 58Z', fill: '#7a4a2b' });
    [132, 168].forEach(x => add('circle', { cx: x, cy: 66, r: 5, fill: dk })); add('path', { d: 'M135 86 Q150 98 165 86', fill: 'none', stroke: dk, 'stroke-width': 4, 'stroke-linecap': 'round' });
  }
  return svg;
}
function gKroppen() {
  const L = lvl();
  const names = {}; localizeList(BODY).forEach(([f, n]) => { names[f] = n; });
  const scene = L >= 3 && game.round % 2 === 0 ? 'body' : 'face';
  const parts = scene === 'body' ? KBODY : (L === 1 ? KFACE.slice(0, 4) : KFACE);
  const drawn = bagTake(parts.map(p => p[0]), 1, game.lastKey, 'kroppen', () => lget('miss', []));
  game.exhausted = drawn.exhausted;
  const target = parts.find(p => p[0] === drawn.keys[0]);
  game.review = lget('miss', []).indexOf(target[0]) !== -1; game.lastKey = target[0]; game.locked = false;
  const body = nxFrame(); body.classList.add('nx-k2');
  const nm = names[target[0]];
  const sp = lang === 'ar' ? { parts: [T('Hitta ').trim(), nm], speech: T('Hitta ').trim() + ' ' + nm } : { parts: [T('Hitta ') + nm], speech: T('Hitta ') + nm };
  body.appendChild(promptBar(T('Peka på') + ':', nm, () => sayT(sp)));
  const svg = kSvg(scene); svg.style.width = Math.max(200, Math.min(330, innerWidth * 0.88, scene === 'body' ? (innerHeight - 200) * 300 / 420 : 400)) + 'px'; body.appendChild(svg);
  parts.forEach(([face, shapes]) => shapes.forEach(sh => {
    const z = sh[0] === 'e' ? svgEl('ellipse', { cx: sh[1], cy: sh[2], rx: sh[3], ry: sh[4], fill: 'rgba(0,0,0,0.001)', 'data-part': face })
      : svgEl('line', { x1: sh[1], y1: sh[2], x2: sh[3], y2: sh[4], stroke: 'rgba(0,0,0,0.001)', 'stroke-width': sh[5], 'stroke-linecap': 'round', 'data-part': face });
    z.classList.add('kz'); z.style.pointerEvents = sh[0] === 'e' ? 'all' : 'stroke';
    z.onclick = () => {
      if (game.locked) return; clearTimeout(roundTimer); stopSpeech();
      if (face === target[0]) {
        svg.querySelectorAll('.kz[data-part="' + face + '"]').forEach(q => { if (q.tagName === 'line') q.setAttribute('stroke', 'rgba(67,181,129,.6)'); else q.setAttribute('fill', 'rgba(67,181,129,.6)'); });
        missDel(face); levelStep(true); nxRight([nm, T('Rätt!')], nm + '. ' + T('Rätt!'));
      } else {
        const tn = names[face]; missAdd(target[0]); levelStep(false);
        svg.classList.remove('shake'); void svg.getBoundingClientRect(); svg.classList.add('shake');
        speakSeq([tn], tn);
      }
    };
    svg.appendChild(z);
  }));
  autoSay(() => sayT(sp));
}

const NXGAMES = { kroppen: gKroppen, para: gPara, pussel: gPussel, ballong: gBallong, klockan: gKlockan, klockan2: gKlockan2, text: gText, monster: gMonster };
const _nxStart = startGame, _nxNew = newRound;
startGame = function (cat) {
    if (NXGAMES[cat]) { game.cat = cat; game.round = 1; game.stars = 0; game.good = 0; game.bad = 0; game.lastKey = null; game.review = false; game.exhausted = false; newRound(); }
    else _nxStart(cat);
};
newRound = function () {
    if (NXGAMES[game.cat]) { leaveScene(); game.locked = false; game.exhausted = false; NXGAMES[game.cat](); }
    else _nxNew();
};
if (CATEGORIES[location.hash.replace(/^#\/?/, '')] && NXGAMES[location.hash.replace(/^#\/?/, '')]) route();

addEventListener('pagehide', leaveScene);
document.addEventListener('visibilitychange', () => { if(document.hidden) leaveScene(); else if(activeProfile && game.cat && !document.querySelector('.overlay')) newRound(); });
addEventListener('hashchange', route);
route();
