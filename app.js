'use strict';
// Correct answers and historical explanations are displayed only after a selection.
const facts={qin:'秦始皇統一六國，建立秦朝，並推行統一文字等措施。',han:'漢武帝派張騫出使西域，促進不同地方的交流。',tang:'唐太宗重視大臣的意見，在位期間出現「貞觀之治」。',ming:'明太祖名叫朱元璋，出身貧困，後來建立明朝。',qing:'康熙帝是清朝皇帝，在位期間下令編纂《康熙字典》。'};
const low=[
{id:'L01',q:'這些兵馬俑與秦始皇有關。',opts:['✓ 對','✗ 錯'],a:0,f:'qin',scene:'warriors'},
{id:'L02',q:'秦始皇是唐朝的皇帝。',opts:['✓ 對','✗ 錯'],a:1,f:'qin',scene:null},
{id:'L03',q:'漢武帝是漢朝的皇帝。',opts:['✓ 對','✗ 錯'],a:0,f:'han',scene:null},
{id:'L04',q:'漢武帝派張騫到很遠的地方，與其他地方的人交流。',opts:['✓ 對','✗ 錯'],a:0,f:'han',scene:'journey'},
{id:'L05',q:'唐太宗從來不聽取大臣的意見。',opts:['✓ 對','✗ 錯'],a:1,f:'tang',scene:'court'},
{id:'L06',q:'唐太宗是哪個朝代的皇帝？',opts:['唐朝','清朝'],a:0,f:'tang',scene:null},
{id:'L07',q:'明太祖建立了清朝。',opts:['✓ 對','✗ 錯'],a:1,f:'ming',scene:null},
{id:'L08',q:'明太祖朱元璋小時候的生活是怎樣的？',opts:['家境貧困','一出生便是皇帝'],a:0,f:'ming',scene:'farm'},
{id:'L09',q:'康熙帝是哪個朝代的皇帝？',opts:['漢朝','清朝'],a:1,f:'qing',scene:null},
{id:'L10',q:'《康熙字典》主要幫助人們認識甚麼？',opts:['漢字','動物'],a:0,f:'qing',scene:'dictionary'}
];
const high=[
{id:'H01',q:'哪位皇帝統一六國，建立秦朝？',opts:['漢武帝','秦始皇','唐太宗'],a:1,f:'qin'},
{id:'H02',q:'秦始皇統一文字，主要有甚麼好處？',opts:['方便各地交流','讓人人寫字更快','讓所有人不用讀書'],a:0,f:'qin'},
{id:'H03',q:'漢武帝是哪個朝代的皇帝？',opts:['漢朝','明朝','清朝'],a:0,f:'han'},
{id:'H04',q:'漢武帝派張騫出使西域，主要有助於甚麼？',opts:['興建皇宮','促進不同地方的交流','統一六國'],a:1,f:'han'},
{id:'H05',q:'哪位皇帝開創了「貞觀之治」？',opts:['康熙帝','明太祖','唐太宗'],a:2,f:'tang'},
{id:'H06',q:'唐太宗願意聽取大臣的意見，反映他懂得甚麼？',opts:['虛心聆聽','只相信自己','拒絕別人的建議'],a:0,f:'tang'},
{id:'H07',q:'明太祖朱元璋建立了哪個朝代？',opts:['唐朝','明朝','清朝'],a:1,f:'ming'},
{id:'H08',q:'明太祖朱元璋年少時的生活是怎樣的？',opts:['一直住在皇宮','出生便是皇帝','家境貧困'],a:2,f:'ming'},
{id:'H09',q:'康熙帝是哪個朝代的皇帝？',opts:['秦朝','清朝','唐朝'],a:1,f:'qing'},
{id:'H10',q:'以下哪一本字典與康熙帝有關？',opts:['《康熙字典》','《新華字典》','《牛津英語詞典》'],a:0,f:'qing'}
];
const sceneNames={warriors:'兵馬俑',journey:'張騫出使西域',court:'唐太宗與大臣議事',farm:'年少的朱元璋',dictionary:'《康熙字典》'};
let screen='home',level='low',question=null,selected=null,staffMode=false;
const pools={low:[],high:[]};let last={low:null,high:null};
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function draw(){const bank=level==='low'?low:high;if(!pools[level].length){pools[level]=shuffle(bank.map(x=>x.id));if(pools[level][pools[level].length-1]===last[level]&&pools[level].length>1){[pools[level][0],pools[level][pools[level].length-1]]=[pools[level][pools[level].length-1],pools[level][0]];}}const id=pools[level].pop();last[level]=id;question=bank.find(x=>x.id===id);selected=null;screen='question';render();}
function el(s){return document.createRange().createContextualFragment(s)}
function render(){
const app=document.getElementById('app');let body='';
const title=level==='low'?'初級挑戰｜P.1–P.3':'進階挑戰｜P.4–P.6';
const names=['秦始皇','漢武帝','唐太宗','明太祖','康熙帝'];
const keys=['qin','han','tang','ming','qing'];
if(screen==='home'){
body=`<div class="art-home" role="group" aria-label="歷史人物挑戰站首頁"><img class="art-home-image" src="images/illustrated-home.png" alt="歷史人物挑戰站：五位歷史人物、初級挑戰、進階挑戰及認識歷史人物"><button class="art-hit art-low" data-action="low" aria-label="開始 P.1 至 P.3 初級挑戰"><span class="sr-only">P.1–P.3 初級挑戰</span></button><button class="art-hit art-high" data-action="high" aria-label="開始 P.4 至 P.6 進階挑戰"><span class="sr-only">P.4–P.6 進階挑戰</span></button><button class="art-hit art-people" data-action="people" aria-label="認識五位歷史人物"><span class="sr-only">認識五位歷史人物</span></button><button class="art-hit art-rules" data-action="rules" aria-label="查看遊戲規則"><span class="sr-only">遊戲規則</span></button></div><div class="art-home-controls"><span>每人隨機抽一題，答對可獲小禮物</span><label class="staff"><input type="checkbox" id="staff" ${staffMode?'checked':''}> 顯示主持人題號</label></div>`;
}
if(screen==='rules'){body=`<div class="page-head"><span class="tag">遊戲小指南</span><h2>挑戰規則</h2><p>簡單四步，一起認識歷史！</p></div><div class="rule-grid"><div>🧑‍🎓<b>1. 按年級排隊</b><span>P.1–P.3 初級｜P.4–P.6 進階</span></div><div>🎴<b>2. 隨機抽一題</b><span>每位參加者只有一次機會</span></div><div>☝️<b>3. 選出答案</b><span>選定後不能更改</span></div><div>🎁<b>4. 看結果</b><span>答對有小禮物；答錯學新知識</span></div></div><div class="action-row"><button class="primary" data-action="home">返回首頁</button></div>`;}
if(screen==='people'){body=`<div class="page-head"><span class="tag">年度中國歷史人物選舉 2026</span><h2>認識五位歷史人物</h2><p>先認識他們的生平事蹟，再來接受挑戰！</p></div><div class="people-grid">${[{key:'qin',name:'秦始皇',dynasty:'秦朝',detail:'統一六國，建立秦朝，推行統一文字等措施。',extra:'你知道嗎？兵馬俑與秦始皇陵有關。'},{key:'han',name:'漢武帝',dynasty:'漢朝',detail:'派張騫出使西域，促進不同地區的交流。',extra:'張騫出使西域，為後來絲綢之路的交流奠定基礎。'},{key:'tang',name:'唐太宗',dynasty:'唐朝',detail:'重視聽取大臣意見，在位期間出現「貞觀之治」。',extra:'願意聽取不同意見，是他的施政特色之一。'},{key:'ming',name:'明太祖',dynasty:'明朝',detail:'名叫朱元璋，年少時家境貧困，後來建立明朝。',extra:'他並非一出生就是皇帝。'},{key:'qing',name:'康熙帝',dynasty:'清朝',detail:'在位期間下令編纂《康熙字典》。',extra:'《康熙字典》是一部收錄大量漢字的字典。'}].map(x=>`<article class="person-card"><img src="images/${x.key}.webp" alt="${x.name}卡通人物插畫"><div><span class="dynasty">${x.dynasty}</span><h3>${x.name}</h3><p>${x.detail}</p><small>${x.extra}</small></div></article>`).join('')}</div><div class="action-row"><button class="primary" data-action="home">返回首頁</button></div>`;}
if(screen==='draw'){body=`<div class="page-head"><span class="tag">${title}</span><h2>抽出你的歷史挑戰卡！</h2><p>每人只有一次抽題機會，準備好了嗎？</p></div><div class="drawcard"><span class="draw-symbol">📜</span><strong>神秘歷史題卡</strong><small>一題挑戰・一份新知識</small></div><div class="action-row"><button class="primary" data-action="draw">🎴 隨機抽取題目</button><button class="secondary" data-action="home">返回首頁</button></div>`;}
if(screen==='question'){
const isTF=question.opts[0].startsWith('✓');
const letters=isTF?['','']:question.opts.length===2?['A','B']:['A','B','C'];
const options=question.opts.map((x,i)=>`<button class="answer" data-answer="${i}">${letters[i]?`<span class="letter">${letters[i]}</span>`:`<span class="letter">${i===0?'✓':'✗'}</span>`}<span>${isTF?x.replace(/^[✓✗] /,''):x}</span></button>`).join('');
const showScene=level==='low'&&Boolean(question.scene);
body=`<div class="quiz-top"><span class="tag">${title}</span><span class="quiz-count">${staffMode?question.id:'歷史挑戰題'}</span></div><div class="question-layout ${showScene?'with-scene':'text-only'}">${showScene?`<div class="scene"><img src="images/${question.scene}.webp" alt="${sceneNames[question.scene]}的歷史情境插畫"></div>`:''}<div class="question-content"><div class="question-caption">💡 請仔細想一想</div><h2>${question.q}</h2><div class="options">${options}</div></div></div><div class="quiz-note">請選出一個答案，選定後不能更改。</div>`;}
if(screen==='result'){
const yes=selected===question.a;
body=`<div class="result-wrap"><div class="result-burst">${yes?'🎉':'💛'}</div><div class="result-title ${yes?'correct':'incorrect'}">${yes?'恭喜你，答對了！':'勇敢挑戰，值得鼓勵！'}</div><div class="answer-reveal"><span>正確答案</span><strong>${question.opts[question.a]}</strong></div><div class="fact"><span class="fact-heading">📖 歷史小知識</span><p>${facts[question.f]}</p></div><div class="reward ${yes?'win':'try'}">${yes?'🎁 請大使派發一份小禮物！':'🌷 今次沒有小禮物，但你又學到一項新知識！'}</div><div class="action-row"><button class="primary" data-action="home">👋 下一位參加者</button></div><p class="quiz-note">每位參加者只可抽題一次</p></div>`;}
app.innerHTML=`<div class="stage ${screen==='home'?'stage-home':''}"><div class="sky-decor" aria-hidden="true"><span class="sun"></span><span class="cloud c1"></span><span class="cloud c2"></span><span class="hill h1"></span><span class="hill h2"></span></div><div class="shell"><header class="top ${screen==='home'?'top-hidden':''}"><div class="brand">🏮 <span>歷史人物挑戰站</span></div><div class="header-right"><span class="tiny-tag">校園大使活動</span>${screen!=='home'?`<button class="top-home" data-action="home" aria-label="返回首頁">⌂ 首頁</button>`:''}</div></header><section class="panel ${screen==='home'?'home-panel art-panel':''}">${body}</section><footer class="footer">《憲法》和《基本法》學生校園大使　✦　認識歷史・開心學習</footer></div></div>`;
app.querySelectorAll('[data-action]').forEach(b=>b.addEventListener('click',()=>{const a=b.dataset.action;if(a==='low'||a==='high'){level=a;screen='draw';}else if(a==='draw'){draw();return;}else if(a==='home'){screen='home';question=null;selected=null;}else if(a==='rules'){screen='rules';}else if(a==='people'){screen='people';}render();}));
app.querySelectorAll('[data-answer]').forEach(b=>b.addEventListener('click',()=>{if(screen!=='question'||selected!==null)return;selected=Number(b.dataset.answer);screen='result';render();}));
const staff=app.querySelector('#staff');if(staff)staff.addEventListener('change',e=>{staffMode=e.target.checked;});
}
render();
