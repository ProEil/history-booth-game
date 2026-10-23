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
function render(){const app=document.getElementById('app');let body='';const title=level==='low'?'初級挑戰 P.1–P.3':'進階挑戰 P.4–P.6';
if(screen==='home'){body=`<div class="center"><div class="mascot" aria-hidden="true">🦉</div><div class="eyebrow">年度中國歷史人物選舉 2026</div><h1>歷史人物挑戰站</h1><p class="subtitle">抽一張卡・答一道題・認識一位歷史人物</p></div><div class="portraits"><img src="images/qin.webp" alt="秦始皇"><img src="images/han.webp" alt="漢武帝"><img src="images/tang.webp" alt="唐太宗"><img src="images/ming.webp" alt="明太祖"><img src="images/qing.webp" alt="康熙帝"></div><div class="level-grid"><button class="level" data-action="low"><span>🌱 初級挑戰</span><strong>P.1–P.3</strong><span>圖片・是非題・二選一</span></button><button class="level high" data-action="high"><span>🌟 進階挑戰</span><strong>P.4–P.6</strong><span>三選一歷史問答</span></button></div><div class="staff"><label><input type="checkbox" id="staff" ${staffMode?'checked':''}> 顯示主持人題號（方便綵排）</label></div>`;}
if(screen==='draw'){body=`<div class="center"><div class="eyebrow">${title}</div><h2>準備好挑戰了嗎？</h2><div class="drawcard"><div>📜</div><small>神秘歷史題卡</small></div><p class="subtitle">每位同學只可以抽一題</p><div class="action-row"><button class="primary" data-action="draw">🎴 抽取題卡</button></div></div>`;}
if(screen==='question'){const letters=question.opts.length===2?(question.opts[0].startsWith('✓')?['','']:['A','B']):['A','B','C'];const options=question.opts.map((x,i)=>`<button class="answer" data-answer="${i}">${letters[i]?`<span class="letter">${letters[i]}</span>`:''}<span>${x}</span></button>`).join('');body=`<div class="eyebrow">${title} ${staffMode?`｜${question.id}`:''}</div><div class="question-layout">${`<div class="scene"><img src="images/${question.scene || question.f}.webp" alt="${question.scene ? sceneNames[question.scene] : ({qin:"秦始皇",han:"漢武帝",tang:"唐太宗",ming:"明太祖",qing:"康熙帝"})[question.f]}的彩色插畫" loading="eager"></div>`}<div><div class="qnumber">請選出正確答案</div><h2>${question.q}</h2><div class="options">${options}</div></div></div>`;}
if(screen==='result'){const yes=selected===question.a;body=`<div class="center"><div class="result-icon">${yes?'🎉':'💛'}</div><div class="result-title ${yes?'correct':'incorrect'}">${yes?'答對了！':'謝謝你勇敢挑戰！'}</div><div class="subtitle">正確答案：<strong>${question.opts[question.a]}</strong></div><div class="fact">📖 ${facts[question.f]}</div><div class="reward">${yes?'🎁 請學生大使派發一份小禮物':'🌷 今次沒有小禮物，但你學到了一項歷史知識！'}</div><div class="action-row"><button class="primary" data-action="home">👋 下一位參加者</button></div><p class="small-note">每位參加者只限一次抽題機會</p></div>`;}
app.replaceChildren(el(`<div class="shell"><header class="top"><div class="brand">🏮 歷史人物挑戰站</div><div class="pill">${screen==='home'?'歡迎挑戰':title}</div></header><section class="panel">${body}</section><footer class="footer">《憲法》和《基本法》學生校園大使｜認識歷史・開心學習</footer></div>`));
app.querySelectorAll('[data-action]').forEach(b=>b.addEventListener('click',()=>{const a=b.dataset.action;if(a==='low'||a==='high'){level=a;screen='draw';}else if(a==='draw'){draw();return;}else if(a==='home'){screen='home';question=null;selected=null;}render();}));
app.querySelectorAll('[data-answer]').forEach(b=>b.addEventListener('click',()=>{if(screen!=='question'||selected!==null)return;selected=Number(b.dataset.answer);screen='result';render();}));const staff=app.querySelector('#staff');if(staff)staff.addEventListener('change',e=>{staffMode=e.target.checked;});}
render();
