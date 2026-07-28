[index (3).html](https://github.com/user-attachments/files/29940232/index.3.html)
# revans-hp<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>REVANS｜Web制作・集客支援</title>
<meta name="description" content="REVANSは、LP・ホームページ制作から集客の設計まで、成果から逆算するWeb制作パートナーです。">

<meta property="og:title" content="REVANS｜Web制作・集客支援">
<meta property="og:description" content="つくって終わり、にしない。成果から逆算するWeb制作パートナー。">
<meta property="og:type" content="website">

<link rel="icon" href="data:image/svg+xml,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20100%20100'><path%20fill='%23181818'%20fill-rule='evenodd'%20d='M50,9L90,91L67,91L50,57L33,91L10,91ZM50,31L41,54L59,54Z'/><path%20fill='%23E44800'%20d='M15,72C42,66,68,57,89,29C91,26,93,26,92,29C91,33,88,37,83,41C63,58,43,66,22,75C18,77,13,76,15,72Z'/></svg>">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700&family=Zen+Kaku+Gothic+New:wght@400;500;700;900&display=swap" rel="stylesheet">

<style>
  :root{
    --ink:#0A0A0A;
    --ink-2:#3A3A3E;
    --ink-3:#8A8A92;
    --paper:#FFFFFF;
    --paper-2:#F6F6F3;
    --line:#E4E4E0;
    --line-2:#111114;
    --accent:#E44800;
    --accent-soft:#FCEAE1;
    --accent-deep:#B63A15;
    --accent-lite:#FF7A22;

    --f-display:"Space Grotesk","Zen Kaku Gothic New",system-ui,sans-serif;
    --f-body:"Zen Kaku Gothic New",system-ui,sans-serif;
    --f-mono:"Space Mono",ui-monospace,monospace;

    --edge:clamp(20px,5vw,72px);
    --maxw:1180px;
  }

  *{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}
  body{
    font-family:var(--f-body);
    color:var(--ink);
    background:var(--paper);
    line-height:1.7;font-weight:400;letter-spacing:.01em;
    overflow-x:hidden;
  }
  a{color:inherit;text-decoration:none}
  ::selection{background:var(--accent);color:#fff}
  .wrap{max-width:var(--maxw);margin:0 auto;padding:0 var(--edge);position:relative;z-index:2}

  .eyebrow{
    font-family:var(--f-mono);font-size:12px;letter-spacing:.18em;text-transform:uppercase;
    color:var(--accent);display:inline-flex;align-items:center;gap:10px;
  }
  .eyebrow::before{content:"";width:22px;height:1px;background:var(--accent);display:inline-block}

  /* ===== Scroll progress ===== */
  .scroll-progress{
    position:fixed;top:0;left:0;height:2px;width:0;
    background:var(--accent);z-index:60;will-change:width;
  }

  /* ===== Header ===== */
  header{
    position:fixed;top:0;left:0;right:0;z-index:50;
    background:rgba(255,255,255,.82);
    backdrop-filter:saturate(180%) blur(12px);
    border-bottom:1px solid transparent;transition:border-color .3s,background .3s;
  }
  header.scrolled{border-bottom-color:var(--line)}
  .nav{display:flex;align-items:center;justify-content:space-between;height:68px;max-width:var(--maxw);margin:0 auto;padding:0 var(--edge)}
  .brand{font-family:var(--f-display);font-weight:700;font-size:21px;letter-spacing:-.01em;display:flex;align-items:center;gap:9px}
  .brand-mark{width:27px;height:27px;display:block;flex:none}
  .brand-name{line-height:1}
  .nav-links{display:flex;align-items:center;gap:30px}
  .nav-links a.n{font-size:13px;font-weight:500;color:var(--ink-2);transition:color .2s;position:relative}
  .nav-links a.n::after{content:"";position:absolute;left:0;bottom:-4px;width:0;height:1px;background:var(--accent);transition:width .28s ease}
  .nav-links a.n:hover{color:var(--ink)}
  .nav-links a.n:hover::after{width:100%}
  .btn{
    font-family:var(--f-body);font-weight:700;font-size:13px;padding:11px 20px;border-radius:2px;
    border:1px solid var(--line-2);background:var(--ink);color:#fff;
    display:inline-flex;align-items:center;gap:8px;cursor:pointer;
    transition:background .2s,color .2s,box-shadow .25s;white-space:nowrap;will-change:transform;
  }
  .btn:hover{background:var(--accent);border-color:var(--accent);box-shadow:0 8px 24px -8px var(--accent)}
  .btn .arw{transition:transform .2s}
  .btn:hover .arw{transform:translateX(3px)}
  .btn.ghost{background:transparent;color:var(--ink);border-color:var(--line-2);box-shadow:none}
  .btn.ghost:hover{background:var(--ink);color:#fff}
  @media(max-width:720px){.nav-links a.n{display:none}}

  /* ===== Hero ===== */
  .hero{position:relative;padding:150px 0 100px;overflow:hidden}
  .hero-canvas{position:absolute;inset:0;z-index:0;pointer-events:none}
  .hero h1{
    font-family:var(--f-display);font-weight:700;
    font-size:clamp(42px,8vw,92px);line-height:1.05;letter-spacing:-.025em;margin:26px 0 0;
  }
  .hero h1 .ln{display:block;overflow:hidden;padding-bottom:.04em}
  .hero h1 .ln > span{display:block;transform:translateY(110%)}
  .hero h1 .accent{color:var(--accent);position:relative}
  .hero .sub{margin-top:30px;max-width:540px;font-size:clamp(15px,1.7vw,17px);color:var(--ink-2);line-height:1.85}
  .hero .cta-row{margin-top:40px;display:flex;gap:14px;flex-wrap:wrap;align-items:center}
  .hero .meta{margin-top:56px;display:flex;gap:38px;flex-wrap:wrap;padding-top:26px;border-top:1px solid var(--line);max-width:640px}
  .hero .meta div{display:flex;flex-direction:column;gap:3px}
  .hero .meta b{font-family:var(--f-display);font-size:15px;font-weight:600}
  .hero .meta span{font-family:var(--f-mono);font-size:11px;letter-spacing:.08em;color:var(--ink-3)}

  /* fixed signature line over the canvas */
  .signature{position:absolute;inset:0;z-index:1;pointer-events:none}
  .signature svg{position:absolute;right:-4%;top:8%;width:min(58%,640px);height:auto}
  .signature path{fill:none;stroke:var(--accent);stroke-width:1.4;stroke-dasharray:1600;stroke-dashoffset:1600}
  .signature .node{fill:var(--accent);opacity:0}
  @media(max-width:820px){.signature svg{opacity:.32;top:auto;bottom:2%;right:-10%;width:80%}}

  /* ===== Section shells ===== */
  section{position:relative}
  .band{padding:96px 0;position:relative;overflow:hidden}
  .band.alt{background:var(--paper-2)}
  .band-mark{
    position:absolute;top:38px;right:-1.5%;
    font-family:var(--f-display);font-weight:700;font-size:clamp(80px,15vw,210px);
    color:rgba(10,10,10,.035);letter-spacing:-.03em;line-height:1;
    pointer-events:none;user-select:none;z-index:0;white-space:nowrap;will-change:transform;
  }
  .band.alt .band-mark{color:rgba(10,10,10,.045)}
  .sec-head{max-width:680px;margin-bottom:52px}
  .sec-head h2{font-family:var(--f-display);font-weight:600;font-size:clamp(26px,3.6vw,40px);line-height:1.2;letter-spacing:-.01em;margin-top:18px}
  .sec-head p{margin-top:16px;color:var(--ink-2);font-size:15.5px;line-height:1.85}

  /* ===== About ===== */
  .pillars{display:grid;grid-template-columns:repeat(3,1fr);gap:0;border-top:1px solid var(--line)}
  .pillar{padding:34px 30px 34px 0;border-bottom:1px solid var(--line)}
  .pillar:not(:last-child){border-right:1px solid var(--line);padding-right:30px}
  .pillar:nth-child(2),.pillar:nth-child(3){padding-left:30px}
  .pillar .k{font-family:var(--f-mono);font-size:12px;color:var(--accent);letter-spacing:.1em}
  .pillar h3{font-family:var(--f-display);font-size:19px;font-weight:600;margin:14px 0 10px}
  .pillar p{font-size:14px;color:var(--ink-2);line-height:1.8}
  @media(max-width:800px){.pillars{grid-template-columns:1fr}.pillar{padding:26px 0!important;border-right:none!important}}

  /* ===== Services ===== */
  .svc{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--line);border:1px solid var(--line)}
  .svc-card{background:var(--paper);padding:40px 36px;display:flex;flex-direction:column;min-height:230px;transition:background .3s;position:relative;overflow:hidden}
  .band.alt .svc-card{background:var(--paper-2)}
  .svc-card::after{content:"";position:absolute;left:0;bottom:0;height:2px;width:0;background:var(--accent);transition:width .4s cubic-bezier(.2,.7,.2,1)}
  .svc-card:hover{background:var(--ink)}
  .svc-card:hover::after{width:100%}
  .svc-card:hover *{color:#fff}
  .svc-card:hover .idx{color:var(--accent)}
  .svc-card:hover .svc-tags span{border-color:rgba(255,255,255,.3)}
  .svc-card .idx{font-family:var(--f-mono);font-size:12px;color:var(--ink-3);letter-spacing:.1em;transition:letter-spacing .3s}
  .svc-card:hover .idx{letter-spacing:.2em}
  .svc-card h3{font-family:var(--f-display);font-size:22px;font-weight:600;margin:16px 0 12px;letter-spacing:-.01em}
  .svc-card p{font-size:14px;color:var(--ink-2);line-height:1.8;flex:1}
  .svc-tags{display:flex;flex-wrap:wrap;gap:8px;margin-top:20px}
  .svc-tags span{font-family:var(--f-mono);font-size:11px;letter-spacing:.04em;padding:4px 10px;border:1px solid var(--line);border-radius:2px;color:var(--ink-3);transition:border-color .3s}
  @media(max-width:720px){.svc{grid-template-columns:1fr}}

  /* ===== Flow ===== */
  .flow{border-top:1px solid var(--line)}
  .flow-step{display:grid;grid-template-columns:64px 1fr;gap:24px;padding:26px 0;border-bottom:1px solid var(--line);align-items:baseline;position:relative}
  .flow-step .no{font-family:var(--f-mono);font-size:13px;color:var(--accent);letter-spacing:.1em;padding-top:4px;transition:transform .3s}
  .flow-step:hover .no{transform:translateX(4px)}
  .flow-step h3{font-family:var(--f-display);font-size:19px;font-weight:600;letter-spacing:-.01em}
  .flow-step p{font-size:14px;color:var(--ink-2);margin-top:8px;line-height:1.8;max-width:600px}
  @media(max-width:600px){.flow-step{grid-template-columns:44px 1fr;gap:14px}}

  /* ===== Contact ===== */
  .contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:start}
  .contact-lead h2{font-family:var(--f-display);font-weight:600;font-size:clamp(28px,4vw,44px);line-height:1.15;letter-spacing:-.01em;margin-top:18px}
  .contact-lead p{margin-top:18px;color:var(--ink-2);font-size:15px;line-height:1.85;max-width:400px}
  .direct{margin-top:34px;display:flex;flex-direction:column;gap:2px}
  .direct a{display:flex;align-items:center;justify-content:space-between;padding:16px 4px;border-top:1px solid var(--line);font-size:14px;transition:color .2s,padding .25s}
  .direct a:last-child{border-bottom:1px solid var(--line)}
  .direct a:hover{color:var(--accent);padding-left:12px}
  .direct a .lbl{font-family:var(--f-mono);font-size:12px;letter-spacing:.08em;color:var(--ink-3)}
  .direct a:hover .lbl{color:var(--accent)}

  form{display:flex;flex-direction:column;gap:18px}
  .field{display:flex;flex-direction:column;gap:8px}
  .field label{font-family:var(--f-mono);font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-3)}
  .field label .req{color:var(--accent)}
  .field input,.field textarea{font-family:var(--f-body);font-size:15px;color:var(--ink);padding:13px 14px;border:1px solid var(--line);border-radius:2px;background:var(--paper);transition:border-color .2s,box-shadow .2s}
  .band.alt .field input,.band.alt .field textarea{background:#fff}
  .field textarea{resize:vertical;min-height:120px}
  .field input:focus,.field textarea:focus{outline:none;border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-soft)}
  form .btn{justify-content:center;padding:15px;font-size:14px}
  .form-note{font-family:var(--f-mono);font-size:11px;color:var(--ink-3);line-height:1.7}
  .form-msg{font-size:14px;padding:14px;border-radius:2px;display:none}
  .form-msg.ok{display:block;background:var(--accent-soft);color:var(--accent)}
  .form-msg.err{display:block;background:#FDEDED;color:#B42318}
  @media(max-width:800px){.contact-grid{grid-template-columns:1fr;gap:40px}}

  /* ===== Footer ===== */
  footer{background:var(--ink);color:#fff;padding:64px 0 40px;position:relative;overflow:hidden}
  .foot-top{display:flex;justify-content:space-between;flex-wrap:wrap;gap:30px;align-items:flex-start;position:relative;z-index:2}
  .foot-brand{font-family:var(--f-display);font-weight:700;font-size:26px;display:flex;align-items:center;gap:11px}
  .foot-mark-svg{width:34px;height:34px;display:block;flex:none}
  .foot-desc{font-size:13px;color:rgba(255,255,255,.55);margin-top:14px;max-width:280px;line-height:1.8;font-weight:400}
  .foot-info{font-family:var(--f-mono);font-size:12px;line-height:2.1;color:rgba(255,255,255,.6)}
  .foot-info b{color:#fff;font-weight:400}
  .foot-bottom{margin-top:48px;padding-top:22px;border-top:1px solid rgba(255,255,255,.12);display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px;font-family:var(--f-mono);font-size:11px;letter-spacing:.06em;color:rgba(255,255,255,.4);position:relative;z-index:2}
  .foot-mark{position:absolute;left:var(--edge);bottom:-3.4vw;font-family:var(--f-display);font-weight:700;font-size:clamp(90px,22vw,320px);line-height:1;color:rgba(255,255,255,.04);letter-spacing:-.04em;z-index:1;pointer-events:none;user-select:none}

  /* ===== Philosophy ===== */
  .phil-list{border-top:1px solid var(--line)}
  .phil{display:grid;grid-template-columns:190px 1fr;gap:30px;padding:40px 0;border-bottom:1px solid var(--line);align-items:start}
  .phil-k{font-family:var(--f-mono);font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:var(--accent);padding-top:10px;position:relative}
  .phil-k::after{content:"";position:absolute;left:0;bottom:-4px;width:24px;height:1px;background:var(--accent)}
  .phil-text{font-family:var(--f-display);font-weight:600;font-size:clamp(22px,3.4vw,38px);line-height:1.3;letter-spacing:-.01em}
  .phil-text .accent{color:var(--accent)}
  .phil-note{margin-top:14px;font-size:14px;color:var(--ink-2);line-height:1.85;max-width:560px}
  @media(max-width:700px){.phil{grid-template-columns:1fr;gap:14px;padding:30px 0}.phil-k{padding-top:0}.phil-k::after{display:none}}

  /* reveal */
  .reveal{opacity:0;transform:translateY(26px);transition:opacity .7s cubic-bezier(.2,.7,.2,1),transform .7s cubic-bezier(.2,.7,.2,1)}
  .reveal.in{opacity:1;transform:none}
  .stagger > *{opacity:0;transform:translateY(22px);transition:opacity .6s cubic-bezier(.2,.7,.2,1),transform .6s cubic-bezier(.2,.7,.2,1)}
  .stagger.in > *{opacity:1;transform:none}

  @media(prefers-reduced-motion:reduce){
    *{animation:none!important;transition-duration:.01ms!important}
    .reveal,.stagger > *{opacity:1;transform:none}
    .hero h1 .ln > span{transform:none}
    .signature path{stroke-dashoffset:0}
    .signature .node{opacity:1}
    html{scroll-behavior:auto}
  }
</style>
</head>
<body>

<div class="scroll-progress" id="scrollBar" aria-hidden="true"></div>

<header id="header">
  <nav class="nav">
    <a href="#top" class="brand" aria-label="REVANS ホーム">
      <svg class="brand-mark" viewBox="0 0 100 100" aria-hidden="true">
        <defs><linearGradient id="swH" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stop-color="#B63A15"/><stop offset=".5" stop-color="#E44800"/><stop offset="1" stop-color="#FF7A22"/>
        </linearGradient></defs>
        <path fill="#181818" fill-rule="evenodd" d="M50,9L90,91L67,91L50,57L33,91L10,91ZM50,31L41,54L59,54Z"/>
        <path fill="url(#swH)" d="M15,72C42,66,68,57,89,29C91,26,93,26,92,29C91,33,88,37,83,41C63,58,43,66,22,75C18,77,13,76,15,72Z"/>
      </svg>
      <span class="brand-name">REVANS</span>
    </a>
    <div class="nav-links">
      <a href="#philosophy" class="n">理念</a>
      <a href="#about" class="n">REVANSとは</a>
      <a href="#services" class="n">できること</a>
      <a href="#flow" class="n">進め方</a>
      <a href="#contact" class="btn magnetic">相談する <span class="arw">→</span></a>
    </div>
  </nav>
</header>

<!-- ===== HERO ===== -->
<section class="hero" id="top">
  <canvas class="hero-canvas" id="heroCanvas" aria-hidden="true"></canvas>
  <div class="signature" aria-hidden="true">
    <svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg">
      <path id="sigpath" d="M20,380 L150,330 L260,346 L370,250 L470,196 L560,96 L620,40"/>
      <circle class="node" cx="20" cy="380" r="4"/>
      <circle class="node" cx="260" cy="346" r="4"/>
      <circle class="node" cx="470" cy="196" r="4"/>
      <circle class="node" cx="620" cy="40" r="5"/>
    </svg>
  </div>
  <div class="wrap">
    <span class="eyebrow">Web制作 / 集客設計</span>
    <h1>
      <span class="ln"><span>集客の<span class="accent">&ldquo;答え&rdquo;</span>を、</span></span>
      <span class="ln"><span>デザインする。</span></span>
    </h1>
    <p class="sub">
      LP・広告・AIを通じて、集客の&ldquo;課題&rdquo;を解決する。<br>
      REVANSは、企業の可能性を一歩前へ進める、Webのパートナーです。<br>
      見た目を整えるだけで終わらせず、「問い合わせが増える」まで設計します。
    </p>
    <div class="cta-row">
      <a href="#contact" class="btn magnetic">無料で相談する <span class="arw">→</span></a>
      <a href="#services" class="btn ghost">できることを見る</a>
    </div>
    <div class="meta">
      <div><b>LP・広告</b><span>PRODUCTION</span></div>
      <div><b>AI活用</b><span>AI</span></div>
      <div><b>集客・改善</b><span>MARKETING</span></div>
    </div>
  </div>
</section>

<!-- ===== PHILOSOPHY ===== -->
<section class="band alt" id="philosophy">
  <span class="band-mark" data-speed="0.05" aria-hidden="true">PHILOSOPHY</span>
  <div class="wrap">
    <div class="sec-head reveal">
      <span class="eyebrow">Philosophy</span>
      <h2>REVANSが、大切にしていること。</h2>
      <p>「なんとなく」で作らない。私たちの仕事は、この3つの軸から始まります。</p>
    </div>
    <div class="phil-list stagger">
      <div class="phil">
        <span class="phil-k">Vision</span>
        <div class="phil-body">
          <p class="phil-text">企業の可能性を、<span class="accent">一歩前へ</span>。</p>
          <p class="phil-note">今のままで終わらせない。事業が次の一歩を踏み出すきっかけを、Webの側から後押しできる存在でありたい。</p>
        </div>
      </div>
      <div class="phil">
        <span class="phil-k">Mission</span>
        <div class="phil-body">
          <p class="phil-text">LP・広告・AIを通じて、集客の課題を解決する。</p>
          <p class="phil-note">手段は、ひとつじゃない。ランディングページも、広告も、AIも——「集客」という一点のために、必要なものを使い分けます。</p>
        </div>
      </div>
      <div class="phil">
        <span class="phil-k">Concept</span>
        <div class="phil-body">
          <p class="phil-text">集客の<span class="accent">&ldquo;答え&rdquo;</span>を、デザインする。</p>
          <p class="phil-note">きれいなだけのサイトは作らない。「なぜ問い合わせが増えるのか」に根拠を持って、成果から逆算して設計します。</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ===== ABOUT ===== -->
<section class="band" id="about">
  <span class="band-mark" data-speed="0.05" aria-hidden="true">ABOUT</span>
  <div class="wrap">
    <div class="sec-head reveal">
      <span class="eyebrow">About</span>
      <h2>大きくないからこそ、速く、近い。</h2>
      <p>制作会社に頼むと、やり取りが多くて遅い。フリーランスに頼むと、公開後は放置される。REVANSは、その間を埋めます。窓口はひとつ、判断は速く、そして「つくって終わり」にしない。</p>
    </div>
    <div class="pillars stagger">
      <div class="pillar">
        <span class="k">01</span>
        <h3>成果から逆算する</h3>
        <p>デザインの前に、「誰に・何を届けて・どう動いてほしいか」を決める。目的から構成を設計します。</p>
      </div>
      <div class="pillar">
        <span class="k">02</span>
        <h3>速く、直接やり取り</h3>
        <p>間に人を挟まない分、意思決定が速い。「言ったことが翌日には形になっている」進め方です。</p>
      </div>
      <div class="pillar">
        <span class="k">03</span>
        <h3>公開後まで伴走する</h3>
        <p>公開はスタート地点。アクセスや問い合わせの数字を見ながら、改善まで一緒に走ります。</p>
      </div>
    </div>
  </div>
</section>

<!-- ===== SERVICES ===== -->
<section class="band alt" id="services">
  <span class="band-mark" data-speed="-0.05" aria-hidden="true">SERVICES</span>
  <div class="wrap">
    <div class="sec-head reveal">
      <span class="eyebrow">Services</span>
      <h2>できること</h2>
      <p>「集客したい」「会社の信頼を示したい」「まず問い合わせを取りたい」——目的に合わせて、必要なものだけ。</p>
    </div>
    <div class="svc stagger">
      <div class="svc-card">
        <span class="idx">S / 01</span>
        <h3>LP制作</h3>
        <p>問い合わせ・申込を取るための1枚。広告やテレアポの受け皿として、動いてもらう導線から逆算して構成します。</p>
        <div class="svc-tags"><span>構成設計</span><span>デザイン</span><span>CTA最適化</span></div>
      </div>
      <div class="svc-card">
        <span class="idx">S / 02</span>
        <h3>ホームページ制作</h3>
        <p>会社の信頼を担保し、営業が動きやすくなるサイト。「検索されたときに、ちゃんとした会社に見える」を作ります。</p>
        <div class="svc-tags"><span>コーポレート</span><span>レスポンシブ</span><span>SEO基盤</span></div>
      </div>
      <div class="svc-card">
        <span class="idx">S / 03</span>
        <h3>Webマーケティング支援</h3>
        <p>作った後に、どう集客するか。広告運用・LINE・AI活用まで、問い合わせを増やす仕組みごと設計します。</p>
        <div class="svc-tags"><span>広告運用</span><span>AI活用</span><span>導線設計</span></div>
      </div>
      <div class="svc-card">
        <span class="idx">S / 04</span>
        <h3>改善・運用</h3>
        <p>公開後の数字を見て、直す。ヒートマップや問い合わせ数をもとに、成果が出るまで手を入れ続けます。</p>
        <div class="svc-tags"><span>アクセス解析</span><span>A/B改善</span><span>更新代行</span></div>
      </div>
    </div>
  </div>
</section>

<!-- ===== FLOW ===== -->
<section class="band" id="flow">
  <span class="band-mark" data-speed="0.05" aria-hidden="true">PROCESS</span>
  <div class="wrap">
    <div class="sec-head reveal">
      <span class="eyebrow">Process</span>
      <h2>進め方</h2>
      <p>初回の相談は無料です。ヒアリングから公開後の改善まで、一本の流れで進めます。</p>
    </div>
    <div class="flow stagger">
      <div class="flow-step"><span class="no">01</span><div><h3>相談・ヒアリング</h3><p>いま困っていること、達成したいことを伺います。ここは無料。無理な提案はしません。</p></div></div>
      <div class="flow-step"><span class="no">02</span><div><h3>構成・見積もり</h3><p>目的に対して「何を作るべきか」を構成案として提示。費用と期間もここで明確にします。</p></div></div>
      <div class="flow-step"><span class="no">03</span><div><h3>デザイン・制作</h3><p>確認をとりながら形にしていきます。認識のズレが出ないよう、こまめに共有します。</p></div></div>
      <div class="flow-step"><span class="no">04</span><div><h3>公開</h3><p>動作確認をして公開。スマホ表示・表示速度・問い合わせ動線までチェックします。</p></div></div>
      <div class="flow-step"><span class="no">05</span><div><h3>改善・運用</h3><p>数字を見ながら改善。「作って終わり」にせず、成果が出る状態まで伴走します。</p></div></div>
    </div>
  </div>
</section>

<!-- ===== CONTACT ===== -->
<section class="band alt" id="contact">
  <span class="band-mark" data-speed="-0.05" aria-hidden="true">CONTACT</span>
  <div class="wrap">
    <div class="contact-grid">
      <div class="contact-lead reveal">
        <span class="eyebrow">Contact</span>
        <h2>まず、話を<br>聞かせてください。</h2>
        <p>「何から始めればいいか分からない」でも大丈夫です。相談だけでも歓迎します。24時間以内を目安に返信します。</p>
        <div class="direct">
          <a href="mailto:xiaokoulu@gmail.com">
            <span class="lbl">MAIL</span>
            <span>xiaokoulu@gmail.com →</span>
          </a>
          <a href="https://lin.ee/YOUR_LINE_ID" target="_blank" rel="noopener">
            <span class="lbl">LINE</span>
            <span>LINEで相談する →</span>
          </a>
          <a href="tel:08077384477">
            <span class="lbl">TEL</span>
            <span>080-7738-4477 →</span>
          </a>
        </div>
      </div>

      <div class="reveal">
        <form id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
          <div class="field">
            <label for="name">お名前 <span class="req">*</span></label>
            <input type="text" id="name" name="name" required autocomplete="name">
          </div>
          <div class="field">
            <label for="company">会社名 / 屋号</label>
            <input type="text" id="company" name="company" autocomplete="organization">
          </div>
          <div class="field">
            <label for="email">メールアドレス <span class="req">*</span></label>
            <input type="email" id="email" name="email" required autocomplete="email">
          </div>
          <div class="field">
            <label for="message">ご相談内容 <span class="req">*</span></label>
            <textarea id="message" name="message" required placeholder="例）新しく会社を立ち上げたので、ホームページを作りたい。集客も相談したい。"></textarea>
          </div>
          <button type="submit" class="btn magnetic">送信する <span class="arw">→</span></button>
          <p class="form-msg" id="formMsg"></p>
          <p class="form-note">送信内容はお問い合わせ対応のみに使用します。</p>
        </form>
      </div>
    </div>
  </div>
</section>

<!-- ===== FOOTER ===== -->
<footer>
  <div class="foot-mark" aria-hidden="true">REVANS</div>
  <div class="wrap">
    <div class="foot-top">
      <div>
        <div class="foot-brand">
          <svg class="foot-mark-svg" viewBox="0 0 100 100" aria-hidden="true">
            <defs><linearGradient id="swF" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0" stop-color="#B63A15"/><stop offset=".5" stop-color="#E44800"/><stop offset="1" stop-color="#FF7A22"/>
            </linearGradient></defs>
            <path fill="#F4F4F2" fill-rule="evenodd" d="M50,9L90,91L67,91L50,57L33,91L10,91ZM50,31L41,54L59,54Z"/>
            <path fill="url(#swF)" d="M15,72C42,66,68,57,89,29C91,26,93,26,92,29C91,33,88,37,83,41C63,58,43,66,22,75C18,77,13,76,15,72Z"/>
          </svg>
          <span>REVANS</span>
        </div>
        <p class="foot-desc">成果から逆算するWeb制作パートナー。LP・ホームページ制作から集客設計まで。</p>
      </div>
      <div class="foot-info">
        屋号 &nbsp;<b>REVANS</b><br>
        事業 &nbsp;<b>Web制作 / 集客支援</b><br>
        対応 &nbsp;<b>全国オンライン対応</b><br>
        連絡 &nbsp;<b>xiaokoulu@gmail.com</b>
      </div>
    </div>
    <div class="foot-bottom">
      <span>© 2026 REVANS. All rights reserved.</span>
      <span>WEB PRODUCTION / MARKETING</span>
    </div>
  </div>
</footer>

<script>
(function(){
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer=window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // ---- header border ----
  var header=document.getElementById('header');
  // ---- scroll progress ----
  var bar=document.getElementById('scrollBar');
  function onScroll(){
    var y=window.scrollY||document.documentElement.scrollTop;
    header.classList.toggle('scrolled', y>8);
    var h=document.documentElement.scrollHeight-window.innerHeight;
    bar.style.width=(h>0?(y/h*100):0)+'%';
    parallax();
  }

  // ---- band-mark parallax ----
  var marks=[].slice.call(document.querySelectorAll('.band-mark'));
  function parallax(){
    if(reduce) return;
    var vh=window.innerHeight;
    marks.forEach(function(m){
      var r=m.parentElement.getBoundingClientRect();
      var prog=(vh-r.top)/(vh+r.height); // 0..1 as it passes
      var sp=parseFloat(m.getAttribute('data-speed'))||0;
      m.style.transform='translateX('+(prog*260*sp*-1).toFixed(1)+'px)';
    });
  }
  window.addEventListener('scroll',onScroll,{passive:true});
  window.addEventListener('resize',onScroll);
  onScroll();

  // ---- hero intro: headline + signature ----
  if(!reduce){
    document.querySelectorAll('.hero h1 .ln > span').forEach(function(el,i){
      el.style.transition='transform .85s cubic-bezier(.2,.8,.2,1)';
      el.style.transitionDelay=(0.15+i*0.12)+'s';
      requestAnimationFrame(function(){requestAnimationFrame(function(){el.style.transform='translateY(0)';});});
    });
    var path=document.getElementById('sigpath');
    if(path){
      path.style.transition='stroke-dashoffset 1.8s cubic-bezier(.4,0,.2,1) .3s';
      requestAnimationFrame(function(){requestAnimationFrame(function(){path.style.strokeDashoffset='0';});});
    }
    document.querySelectorAll('.signature .node').forEach(function(n,i){
      n.style.transition='opacity .4s ease '+(0.9+i*0.28)+'s';
      requestAnimationFrame(function(){requestAnimationFrame(function(){n.style.opacity='1';});});
    });
  }

  // ---- reveal / stagger ----
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(!e.isIntersecting) return;
      var t=e.target;
      if(t.classList.contains('stagger')){
        [].slice.call(t.children).forEach(function(c,i){
          c.style.transitionDelay=(i*0.09)+'s';
        });
      }
      t.classList.add('in');
      io.unobserve(t);
    });
  },{threshold:.14});
  document.querySelectorAll('.reveal,.stagger').forEach(function(el){io.observe(el);});

  // ---- magnetic buttons (desktop only) ----
  if(finePointer && !reduce){
    document.querySelectorAll('.btn.magnetic').forEach(function(btn){
      var strength=16;
      btn.style.transition='transform .25s cubic-bezier(.2,.8,.2,1),background .2s,color .2s,box-shadow .25s';
      btn.addEventListener('mousemove',function(e){
        var r=btn.getBoundingClientRect();
        var mx=e.clientX-(r.left+r.width/2);
        var my=e.clientY-(r.top+r.height/2);
        btn.style.transform='translate('+(mx/r.width*strength).toFixed(1)+'px,'+(my/r.height*strength).toFixed(1)+'px)';
      });
      btn.addEventListener('mouseleave',function(){btn.style.transform='translate(0,0)';});
    });
  }

  // ---- hero canvas: advancing lines ----
  var canvas=document.getElementById('heroCanvas');
  if(canvas && !reduce){
    var ctx=canvas.getContext('2d');
    var dpr=Math.min(window.devicePixelRatio||1,2);
    var W,H,lines,raf;
    var ANGLE=-Math.PI*0.13; // gentle upward-right
    var cos=Math.cos(ANGLE), sin=Math.sin(ANGLE);
    function size(){
      var host=canvas.parentElement.getBoundingClientRect();
      W=host.width; H=host.height;
      canvas.width=W*dpr; canvas.height=H*dpr; ctx.setTransform(dpr,0,0,dpr,0,0);
    }
    function seed(){
      lines=[];
      var n=Math.round(Math.min(34,Math.max(16,W/42)));
      for(var i=0;i<n;i++){
        lines.push({
          x:Math.random()*W*1.3-W*0.15,
          y:Math.random()*H,
          len:40+Math.random()*130,
          v:0.15+Math.random()*0.6,
          a:0.04+Math.random()*0.10,
          accent:Math.random()<0.14
        });
      }
    }
    function frame(){
      ctx.clearRect(0,0,W,H);
      for(var i=0;i<lines.length;i++){
        var L=lines[i];
        L.x+=L.v*cos*1.2; L.y+=L.v*sin*1.2;
        if(L.x-Math.abs(L.len*cos) > W+40){ L.x=-60; L.y=Math.random()*H; }
        ctx.beginPath();
        ctx.moveTo(L.x,L.y);
        ctx.lineTo(L.x+L.len*cos, L.y+L.len*sin);
        ctx.strokeStyle=L.accent?('rgba(228,72,0,'+(L.a+0.06)+')'):('rgba(10,10,10,'+L.a+')');
        ctx.lineWidth=1;
        ctx.stroke();
      }
      raf=requestAnimationFrame(frame);
    }
    function start(){ size(); seed(); cancelAnimationFrame(raf); frame(); }
    start();
    var rt; window.addEventListener('resize',function(){ clearTimeout(rt); rt=setTimeout(start,180); });
  }

  // ---- form (Formspree AJAX) ----
  var form=document.getElementById('contactForm');
  var msg=document.getElementById('formMsg');
  form.addEventListener('submit',function(ev){
    if(form.action.indexOf('YOUR_FORM_ID')!==-1){
      ev.preventDefault();
      msg.className='form-msg err';
      msg.textContent='送信先が未設定です。xiaokoulu@gmail.com までご連絡ください。';
      return;
    }
    ev.preventDefault();
    var btn=form.querySelector('button[type=submit]');
    var orig=btn.innerHTML; btn.innerHTML='送信中…'; btn.disabled=true;
    fetch(form.action,{method:'POST',body:new FormData(form),headers:{'Accept':'application/json'}})
      .then(function(r){
        if(r.ok){ form.reset(); msg.className='form-msg ok'; msg.textContent='送信しました。24時間以内を目安にご返信します。'; }
        else{ throw new Error(); }
      })
      .catch(function(){ msg.className='form-msg err'; msg.textContent='送信に失敗しました。お手数ですが xiaokoulu@gmail.com までご連絡ください。'; })
      .finally(function(){ btn.innerHTML=orig; btn.disabled=false; });
  });
})();
</script>
</body>
</html>
