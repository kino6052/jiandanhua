import React, { useState, useEffect, useRef } from "react";

/**
 * Jiǎndānhuà (简单话) — front page
 * Self-contained React component. Drops into Docusaurus as src/pages/index.js
 * (rename the export to Home and wrap in <Layout>…</Layout>).
 */

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&family=Noto+Serif+SC:wght@500;700;900&display=swap');

.jdh{
  --paper:#F4F2EB; --paper-2:#FBFAF5;
  --ink:#1C1B17; --ink-2:#6B675C; --ink-3:#96917F;
  --jade:#2F6F5E; --jade-2:#4E9A85; --jade-wash:#E6EFEA; --jade-wash-2:#D2E3DC;
  --seal:#B23B2E;
  --line:#E2DECF; --line-strong:#CFC9B7;
  --disp:'Space Grotesk',system-ui,sans-serif;
  --body:'IBM Plex Sans',system-ui,sans-serif;
  --mono:'IBM Plex Mono',ui-monospace,monospace;
  --han:'Noto Serif SC',serif;
  background:var(--paper); color:var(--ink);
  font-family:var(--body); line-height:1.6;
  -webkit-font-smoothing:antialiased; text-rendering:optimizeLegibility;
}
.jdh *{box-sizing:border-box; margin:0;}
.jdh ::selection{background:var(--jade-wash-2);}
.jdh .wrap{max-width:1140px; margin:0 auto; padding:0 28px;}
.jdh a{color:inherit; text-decoration:none;}
.jdh button{font-family:inherit; cursor:pointer; border:none; background:none;}

/* ---------- nav ---------- */
.jdh .nav{position:sticky; top:0; z-index:40; backdrop-filter:saturate(140%) blur(8px);
  background:rgba(244,242,235,.82); border-bottom:1px solid var(--line);}
.jdh .nav .wrap{display:flex; align-items:center; justify-content:space-between; height:68px;}
.jdh .brand{display:flex; align-items:baseline; gap:10px;}
.jdh .brand .han{font-family:var(--han); font-weight:900; font-size:24px; letter-spacing:1px;}
.jdh .brand .rom{font-family:var(--disp); font-weight:600; font-size:13px; color:var(--ink-2); letter-spacing:.5px;}
.jdh .navlinks{display:flex; gap:30px; align-items:center;}
.jdh .navlinks a{font-size:14px; color:var(--ink-2); transition:color .15s;}
.jdh .navlinks a:hover{color:var(--jade);}
.jdh .btn{font-family:var(--disp); font-weight:600; font-size:14px; padding:11px 20px;
  border-radius:999px; transition:transform .15s, background .15s, box-shadow .15s; display:inline-flex; align-items:center; gap:8px;}
.jdh .btn-primary{background:var(--jade); color:#fff; box-shadow:0 1px 0 rgba(0,0,0,.04);}
.jdh .btn-primary:hover{background:#26594b; transform:translateY(-1px);}
.jdh .btn-ghost{border:1px solid var(--line-strong); color:var(--ink);}
.jdh .btn-ghost:hover{border-color:var(--jade); color:var(--jade);}
.jdh .navtoggle{display:none;}

/* ---------- hero ---------- */
.jdh .hero{padding:70px 0 30px;}
.jdh .hero-grid{display:grid; grid-template-columns:1.05fr .95fr; gap:54px; align-items:center;}
.jdh .eyebrow{font-family:var(--mono); font-size:12px; letter-spacing:2px; text-transform:uppercase;
  color:var(--jade); display:inline-flex; align-items:center; gap:9px; margin-bottom:22px;}
.jdh .eyebrow::before{content:""; width:26px; height:1px; background:var(--jade);}
.jdh h1.hero-h{font-family:var(--disp); font-weight:700; font-size:54px; line-height:1.04; letter-spacing:-1.2px;}
.jdh h1.hero-h .em{color:var(--jade); position:relative;}
.jdh .lede{margin-top:22px; font-size:18.5px; color:var(--ink-2); max-width:36ch;}
.jdh .hero-cta{margin-top:32px; display:flex; gap:14px; flex-wrap:wrap;}
.jdh .hero-note{margin-top:18px; font-family:var(--mono); font-size:12px; color:var(--ink-3); letter-spacing:.3px;}

/* composer card */
.jdh .composer{background:var(--paper-2); border:1px solid var(--line);
  border-radius:20px; padding:30px 30px 26px; position:relative;
  box-shadow:0 1px 0 rgba(0,0,0,.02), 0 24px 50px -34px rgba(28,27,23,.28);}
.jdh .composer-top{display:flex; justify-content:space-between; align-items:center; margin-bottom:24px;}
.jdh .composer-label{font-family:var(--mono); font-size:11px; letter-spacing:1.5px; text-transform:uppercase; color:var(--ink-3);}
.jdh .dots{display:flex; gap:7px;}
.jdh .dot{width:7px; height:7px; border-radius:50%; background:var(--line-strong); transition:background .25s, transform .25s;}
.jdh .dot.on{background:var(--jade); transform:scale(1.25);}

.jdh .unknown{display:flex; align-items:baseline; gap:14px; margin-bottom:6px;}
.jdh .unknown .x{font-family:var(--mono); color:var(--seal); font-size:13px;}
.jdh .unknown .han{font-family:var(--han); font-size:34px; font-weight:700; position:relative; color:var(--ink-2);}
.jdh .unknown .han::after{content:""; position:absolute; left:-4px; right:-4px; top:54%; height:2px; background:var(--seal); opacity:.75; transform:scaleX(var(--strike,1)); transform-origin:left;}
.jdh .unknown .gl{font-size:13px; color:var(--ink-3); font-style:italic;}
.jdh .arrow-down{font-family:var(--mono); color:var(--jade); font-size:13px; margin:14px 0 16px; letter-spacing:1px; display:flex; align-items:center; gap:8px;}
.jdh .arrow-down::before,.jdh .arrow-down::after{content:""; height:1px; background:var(--line); flex:0 0 18px;}

.jdh .atoms{display:flex; flex-wrap:wrap; gap:8px; align-items:flex-end;}
.jdh .atom{display:flex; flex-direction:column; align-items:center; gap:4px;
  background:var(--jade-wash); border:1px solid var(--jade-wash-2); border-radius:11px;
  padding:9px 11px 7px; min-width:46px;
  animation:pop .5s cubic-bezier(.2,.8,.2,1) both;}
.jdh .atom .ah{font-family:var(--han); font-size:26px; font-weight:700; color:var(--jade); line-height:1;}
.jdh .atom .ap{font-family:var(--mono); font-size:9.5px; color:var(--ink-2); letter-spacing:.2px;}
.jdh .atom .ag{font-size:9.5px; color:var(--ink-3);}
@keyframes pop{from{opacity:0; transform:translateY(9px) scale(.96);} to{opacity:1; transform:none;}}

.jdh .phrase-out{margin-top:22px; padding-top:18px; border-top:1px solid var(--line);}
.jdh .phrase-out .pl{font-family:var(--mono); font-size:11px; letter-spacing:1.4px; text-transform:uppercase; color:var(--jade); margin-bottom:7px;}
.jdh .phrase-out .ph{font-family:var(--han); font-size:25px; font-weight:700;}
.jdh .phrase-out .pp{font-family:var(--mono); font-size:12px; color:var(--ink-2); margin-top:4px;}
.jdh .phrase-out .pg{font-size:13.5px; color:var(--ink-3); font-style:italic; margin-top:2px;}

/* seal */
.jdh .seal{width:62px; height:62px; border:2.5px solid var(--seal); border-radius:9px;
  display:grid; grid-template-columns:1fr 1fr; place-items:center; transform:rotate(-5deg);
  padding:4px; color:var(--seal); box-shadow:inset 0 0 0 1px rgba(178,59,46,.25);}
.jdh .seal span{font-family:var(--han); font-weight:900; font-size:15px; line-height:1;}
.jdh .seal-row{display:flex; align-items:center; gap:14px; margin-top:28px;}
.jdh .seal-cap{font-size:13px; color:var(--ink-2);}
.jdh .seal-cap b{color:var(--ink); font-weight:600;}

/* ---------- stats ---------- */
.jdh .stats{border-top:1px solid var(--line); border-bottom:1px solid var(--line); margin-top:54px;}
.jdh .stats .wrap{display:grid; grid-template-columns:repeat(3,1fr);}
.jdh .stat{padding:34px 30px; border-left:1px solid var(--line);}
.jdh .stat:first-child{border-left:none; padding-left:0;}
.jdh .stat .k{font-family:var(--disp); font-weight:700; font-size:34px; letter-spacing:-1px; color:var(--jade);}
.jdh .stat .k .u{font-size:15px; color:var(--ink-2); font-weight:500; margin-left:6px;}
.jdh .stat .t{font-weight:600; font-size:15px; margin-top:8px;}
.jdh .stat .d{font-size:14px; color:var(--ink-2); margin-top:5px;}

/* ---------- section scaffold ---------- */
.jdh section.block{padding:88px 0;}
.jdh .kicker{font-family:var(--mono); font-size:12px; letter-spacing:2px; text-transform:uppercase; color:var(--jade); margin-bottom:14px;}
.jdh h2.sec{font-family:var(--disp); font-weight:700; font-size:36px; letter-spacing:-.8px; line-height:1.1; max-width:20ch;}
.jdh .sec-sub{margin-top:16px; font-size:17px; color:var(--ink-2); max-width:60ch;}

/* qualified definitions */
.jdh .defs{display:grid; grid-template-columns:repeat(3,1fr); gap:18px; margin-top:46px;}
.jdh .def{background:var(--paper-2); border:1px solid var(--line); border-radius:16px; padding:24px; transition:border-color .2s, transform .2s;}
.jdh .def:hover{border-color:var(--jade-2); transform:translateY(-3px);}
.jdh .def .top{display:flex; align-items:baseline; gap:10px; margin-bottom:4px;}
.jdh .def .top .dh{font-family:var(--han); font-size:26px; font-weight:700; color:var(--ink-2); text-decoration:line-through; text-decoration-color:var(--seal); text-decoration-thickness:2px;}
.jdh .def .top .dg{font-size:12.5px; color:var(--ink-3); font-style:italic;}
.jdh .def .eq{font-family:var(--mono); font-size:12px; color:var(--jade); margin:14px 0 12px; letter-spacing:.5px;}
.jdh .def .built{font-family:var(--han); font-size:23px; font-weight:700;}
.jdh .def .built b{color:var(--jade);}
.jdh .def .parts{margin-top:14px; display:flex; flex-direction:column; gap:5px;}
.jdh .def .part{display:flex; gap:8px; align-items:baseline; font-size:12.5px;}
.jdh .def .part .ph{font-family:var(--han); color:var(--jade); font-weight:700; width:30px;}
.jdh .def .part .pp{font-family:var(--mono); color:var(--ink-3); width:62px; font-size:11px;}
.jdh .def .part .pg{color:var(--ink-2);}

/* layers */
.jdh .layers-wrap{display:grid; grid-template-columns:1fr 1fr; gap:48px; align-items:center; margin-top:46px;}
.jdh .nest{background:var(--paper-2); border:1px solid var(--line); border-radius:18px; padding:14px;}
.jdh .ring{border-radius:13px; padding:18px; position:relative;}
.jdh .ring .rl{display:flex; justify-content:space-between; align-items:baseline; margin-bottom:2px;}
.jdh .ring .rn{font-family:var(--disp); font-weight:700; font-size:15px;}
.jdh .ring .rc{font-family:var(--mono); font-size:11px; color:var(--ink-2);}
.jdh .ring.r3{background:var(--jade-wash);}
.jdh .ring.r2{background:var(--jade-wash-2); margin-top:14px;}
.jdh .ring.r1{background:#BFD7CD; margin-top:14px;}
.jdh .ring.r1 .rn{color:#1f4d40;}
.jdh .subset{font-family:var(--mono); font-size:12.5px; color:var(--jade); margin-top:18px; text-align:center; letter-spacing:.5px;}
.jdh .ldetail{display:flex; flex-direction:column; gap:0;}
.jdh .lrow{padding:18px 0; border-top:1px solid var(--line);}
.jdh .lrow:first-child{border-top:none; padding-top:0;}
.jdh .lrow .lh{display:flex; align-items:baseline; gap:12px;}
.jdh .lrow .lh .nm{font-family:var(--disp); font-weight:700; font-size:18px;}
.jdh .lrow .lh .ct{font-family:var(--mono); font-size:12px; color:var(--jade);}
.jdh .lrow .ld{font-size:14.5px; color:var(--ink-2); margin-top:6px;}

/* grammar */
.jdh .gram{background:#211F19; color:#EDEAE0; border-radius:22px; padding:54px;}
.jdh .gram .kicker{color:var(--jade-2);}
.jdh .gram h2.sec{color:#fff;}
.jdh .gram .sec-sub{color:#B7B2A4;}
.jdh .grid4{display:grid; grid-template-columns:repeat(2,1fr); gap:1px; background:#3a372e; border:1px solid #3a372e; border-radius:14px; overflow:hidden; margin-top:40px;}
.jdh .gcell{background:#211F19; padding:26px 28px;}
.jdh .gcell .gn{font-family:var(--mono); font-size:12px; color:var(--jade-2); letter-spacing:1px;}
.jdh .gcell .gt{font-family:var(--disp); font-weight:600; font-size:18px; margin:8px 0 8px;}
.jdh .gcell .gd{font-size:14px; color:#B7B2A4; line-height:1.55;}
.jdh .gcell .gex{font-family:var(--han); font-size:18px; margin-top:14px; color:#fff;}
.jdh .gcell .gex em{color:var(--jade-2); font-style:normal;}

/* proof */
.jdh .proof{display:grid; grid-template-columns:.85fr 1.15fr; gap:48px; align-items:start; margin-top:46px;}
.jdh .reading{background:var(--paper-2); border:1px solid var(--line); border-radius:18px; padding:38px 40px; position:relative;
  box-shadow:0 24px 50px -40px rgba(28,27,23,.3);}
.jdh .reading .han{font-family:var(--han); font-size:21px; line-height:2.05; font-weight:500;}
.jdh .reading .han b{color:var(--jade); font-weight:700;}
.jdh .reading .pseal{position:absolute; top:24px; right:24px;}
.jdh .reveal{margin-top:26px; padding-top:22px; border-top:1px dashed var(--line-strong);}
.jdh .reveal-btn{font-family:var(--mono); font-size:12px; letter-spacing:1px; color:var(--jade); text-transform:uppercase; display:inline-flex; align-items:center; gap:8px;}
.jdh .reveal-btn .chev{transition:transform .2s;}
.jdh .reveal-btn.open .chev{transform:rotate(90deg);}
.jdh .reveal-body{font-size:15px; color:var(--ink-2); margin-top:14px; line-height:1.7;}
.jdh .proof-aside .kicker{margin-bottom:14px;}
.jdh .proof-aside p{font-size:16px; color:var(--ink-2); margin-top:16px;}
.jdh .proof-aside .ptag{font-family:var(--han); font-size:18px; color:var(--ink); margin-top:22px; font-weight:700;}

/* get started */
.jdh .start{background:var(--jade); color:#EAF3EF; border-radius:24px; padding:60px; text-align:center;}
.jdh .start .slogan{font-family:var(--han); font-weight:900; font-size:40px; color:#fff; line-height:1.2;}
.jdh .start .slogan-rom{font-family:var(--disp); font-size:14px; color:#BFE0D5; margin-top:12px; letter-spacing:.3px;}
.jdh .steps{display:grid; grid-template-columns:repeat(3,1fr); gap:20px; margin:44px 0 8px;}
.jdh .step{background:rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.16); border-radius:16px; padding:26px 22px; text-align:left;}
.jdh .step .sn{font-family:var(--mono); font-size:12px; color:#BFE0D5; letter-spacing:1px;}
.jdh .step .st{font-family:var(--disp); font-weight:600; font-size:19px; color:#fff; margin:10px 0 6px;}
.jdh .step .sd{font-size:14px; color:#CFE6DD;}
.jdh .start .btn-white{background:#fff; color:var(--jade); margin-top:30px;}
.jdh .start .btn-white:hover{background:#F0F7F4; transform:translateY(-1px);}

/* footer */
.jdh footer{padding:48px 0; border-top:1px solid var(--line);}
.jdh footer .wrap{display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:18px;}
.jdh footer .fbrand{font-family:var(--han); font-weight:900; font-size:20px;}
.jdh footer .fnote{font-size:13px; color:var(--ink-3); max-width:46ch;}
.jdh footer .flinks{display:flex; gap:24px; font-size:13px; color:var(--ink-2);}

/* reveal-on-scroll */
.jdh .rise{opacity:0; transform:translateY(20px); transition:opacity .7s ease, transform .7s cubic-bezier(.2,.8,.2,1);}
.jdh .rise.in{opacity:1; transform:none;}

@media (max-width:900px){
  .jdh .hero-grid{grid-template-columns:1fr; gap:38px;}
  .jdh h1.hero-h{font-size:42px;}
  .jdh .navlinks{display:none;}
  .jdh .defs{grid-template-columns:1fr;}
  .jdh .layers-wrap{grid-template-columns:1fr; gap:32px;}
  .jdh .grid4{grid-template-columns:1fr;}
  .jdh .gram{padding:36px 26px;}
  .jdh .proof{grid-template-columns:1fr; gap:30px;}
  .jdh .steps{grid-template-columns:1fr;}
  .jdh .start{padding:40px 26px;}
  .jdh .start .slogan{font-size:30px;}
  .jdh .stats .wrap{grid-template-columns:1fr;}
  .jdh .stat{border-left:none; border-top:1px solid var(--line); padding:26px 0;}
  .jdh .stat:first-child{border-top:none;}
}
@media (prefers-reduced-motion:reduce){
  .jdh *,.jdh *::before,.jdh *::after{animation:none !important; transition:none !important;}
  .jdh .rise{opacity:1; transform:none;}
}
`;

const EXAMPLES = [
  {
    unknown: "飞机",
    uGloss: "airplane",
    atoms: [
      { h: "天", p: "tiān", g: "sky" },
      { h: "上", p: "shàng", g: "above" },
      { h: "飞", p: "fēi", g: "fly" },
      { h: "的", p: "de", g: "that" },
      { h: "车", p: "chē", g: "vehicle" },
    ],
    phrase: "天上飞的车",
    pPin: "tiān shàng fēi de chē",
    pGloss: "a vehicle that flies in the sky",
  },
  {
    unknown: "冰箱",
    uGloss: "refrigerator",
    atoms: [
      { h: "保存", p: "bǎocún", g: "keep" },
      { h: "食物", p: "shíwù", g: "food" },
      { h: "冷", p: "lěng", g: "cold" },
      { h: "的", p: "de", g: "that" },
      { h: "机器", p: "jīqì", g: "machine" },
    ],
    phrase: "保存食物冷的机器",
    pPin: "bǎocún shíwù lěng de jīqì",
    pGloss: "a machine that keeps food cold",
  },
  {
    unknown: "医生",
    uGloss: "doctor",
    atoms: [
      { h: "看病", p: "kànbìng", g: "treat illness" },
      { h: "的", p: "de", g: "that" },
      { h: "人", p: "rén", g: "person" },
    ],
    phrase: "看病的人",
    pPin: "kànbìng de rén",
    pGloss: "a person who treats illness",
  },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".jdh .rise");
    if (!("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (en) => en.isIntersecting && en.target.classList.add("in"),
        ),
      { threshold: 0.12 },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
}

function Seal({ small }) {
  return (
    <div
      className="seal"
      style={small ? { width: 54, height: 54 } : undefined}
      aria-label="Verified by native speakers"
    >
      <span>母</span>
      <span>语</span>
      <span>认</span>
      <span>证</span>
    </div>
  );
}

function Composer() {
  const [i, setI] = useState(0);
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion:reduce)").matches;
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((v) => (v + 1) % EXAMPLES.length), 4600);
    return () => clearInterval(t);
  }, [reduce]);
  const ex = EXAMPLES[i];
  return (
    <div
      className="composer"
      role="group"
      aria-label="Qualified-definition composer"
    >
      <div className="composer-top">
        <span className="composer-label">
          Composer · build any word from atoms
        </span>
        <div className="dots">
          {EXAMPLES.map((_, k) => (
            <button
              key={k}
              className={"dot" + (k === i ? " on" : "")}
              onClick={() => setI(k)}
              aria-label={"Example " + (k + 1)}
            />
          ))}
        </div>
      </div>

      <div className="unknown">
        <span className="x">don't know</span>
        <span className="han">{ex.unknown}</span>
        <span className="gl">{ex.uGloss}</span>
      </div>

      <div className="arrow-down">rebuild it</div>

      <div className="atoms" key={i}>
        {ex.atoms.map((a, k) => (
          <div
            className="atom"
            key={k}
            style={{ animationDelay: (reduce ? 0 : k * 90) + "ms" }}
          >
            <span className="ah">{a.h}</span>
            <span className="ap">{a.p}</span>
            <span className="ag">{a.g}</span>
          </div>
        ))}
      </div>

      <div className="phrase-out">
        <div className="pl">In Jiǎndānhuà</div>
        <div className="ph">{ex.phrase}</div>
        <div className="pp">{ex.pPin}</div>
        <div className="pg">“{ex.pGloss}”</div>
      </div>
    </div>
  );
}

const DEFS = [
  {
    h: "飞机",
    g: "airplane",
    b: "天上飞的车",
    parts: [
      ["天", "tiān", "sky"],
      ["上", "shàng", "above"],
      ["飞", "fēi", "fly"],
      ["的", "de", "that"],
      ["车", "chē", "vehicle"],
    ],
  },
  {
    h: "冰箱",
    g: "refrigerator",
    b: "保存食物冷的机器",
    parts: [
      ["保存", "bǎocún", "keep"],
      ["食物", "shíwù", "food"],
      ["冷", "lěng", "cold"],
      ["机器", "jīqì", "machine"],
    ],
  },
  {
    h: "医生",
    g: "doctor",
    b: "看病的人",
    parts: [
      ["看病", "kànbìng", "treat illness"],
      ["的", "de", "that"],
      ["人", "rén", "person"],
    ],
  },
];

const PROOF_EN =
  "What is Jiǎndānhuà? Jiǎndānhuà is a small kind of Chinese, made by people. Its characters are few (only 537) and its words are few (only 551). Once you've learned the simplest 91 words, you can use those words to say everything. Don't know a word? Then say it using words you already know — “airplane” is “a vehicle that flies in the sky,” “refrigerator” is “a machine that keeps food cold.” If you can understand the sentences above, then Jiǎndānhuà does its job.";

export default function JiandanhuaLanding() {
  useReveal();
  const [open, setOpen] = useState(false);
  return (
    <div className="jdh">
      <style>{STYLES}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="wrap">
          <div className="brand">
            <span className="han">简单话</span>
            <span className="rom">Jiǎndānhuà</span>
          </div>
          <div className="navlinks">
            <a href="#how">How it works</a>
            <a href="#layers">Layers</a>
            <a href="#grammar">Grammar</a>
            <a href="#proof">Proof</a>
            <a href="#dictionary">Dictionary</a>
          </div>
          <a href="#start" className="btn btn-primary">
            Start learning →
          </a>
        </div>
      </nav>

      {/* HERO */}
      <header className="hero">
        <div className="wrap hero-grid">
          <div>
            <span className="eyebrow">
              Real Mandarin · necessary &amp; sufficient
            </span>
            <h1 className="hero-h">
              Learn Chinese,
              <br /> without taking <span className="em">ten years</span>.
            </h1>
            <p className="lede">
              简单话 is a minimal subset of real Mandarin. Every sentence uses
              real vocabulary and is understood by native speakers instantly —
              just a simpler, clearer way to speak Chinese.
            </p>
            <div className="hero-cta">
              <a href="#start" className="btn btn-primary">
                Start the Core layer →
              </a>
              <a href="#how" className="btn btn-ghost">
                See how it works
              </a>
            </div>
            <p className="hero-note">
              536 characters · 551 words · 0 invented vocabulary
            </p>

            <div className="seal-row">
              <Seal />
              <span className="seal-cap">
                Not a conlang. <b>Understood by native speakers</b> the moment
                you speak it.
              </span>
            </div>
          </div>

          <Composer />
        </div>
      </header>

      {/* STATS */}
      <div className="stats">
        <div className="wrap">
          <div className="stat rise">
            <div className="k">
              1<span className="u">week</span>
            </div>
            <div className="t">Master the basics</div>
            <div className="d">
              The 91-word Core layer covers basic needs and questions from day
              one.
            </div>
          </div>
          <div className="stat rise">
            <div className="k">
              1<span className="u">month</span>
            </div>
            <div className="t">Reach real content</div>
            <div className="d">
              Read books and watch videos in the language — not just textbooks.
            </div>
          </div>
          <div className="stat rise">
            <div className="k">
              536<span className="u">characters</span>
            </div>
            <div className="t">A closed set, forever</div>
            <div className="d">
              A strict, necessary-and-sufficient set. Learn it once and write
              anything.
            </div>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section className="block" id="how">
        <div className="wrap">
          <div className="rise">
            <div className="kicker">Under the hood · qualified definitions</div>
            <h2 className="sec">Don't memorize the word. Build it.</h2>
            <p className="sec-sub">
              Instead of memorizing thousands of nouns, Jiǎndānhuà defines words
              the way native speakers already think about them. When you don't
              know a word, you combine atomic words you already know to describe
              it.
            </p>
          </div>

          <div className="defs">
            {DEFS.map((d, k) => (
              <div className="def rise" key={k}>
                <div className="top">
                  <span className="dh">{d.h}</span>
                  <span className="dg">{d.g}</span>
                </div>
                <div className="eq">becomes ↓</div>
                <div className="built">
                  {d.b.split("").map((ch, j) => (
                    <b
                      key={j}
                      style={
                        ch === "的"
                          ? { color: "var(--ink-3)", fontWeight: 700 }
                          : undefined
                      }
                    >
                      {ch}
                    </b>
                  ))}
                </div>
                <div className="parts">
                  {d.parts.map((p, j) => (
                    <div className="part" key={j}>
                      <span className="ph">{p[0]}</span>
                      <span className="pp">{p[1]}</span>
                      <span className="pg">{p[2]}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LAYERS */}
      <section
        className="block"
        id="layers"
        style={{
          background: "var(--paper-2)",
          borderTop: "1px solid var(--line)",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div className="wrap">
          <div className="rise">
            <div className="kicker">Three layers · one language</div>
            <h2 className="sec">Each layer contains the last.</h2>
            <p className="sec-sub">
              The vocabulary is built as three nested layers — each a strict
              superset of the one before. Start at Core, climb only when you're
              ready, and at any layer you can already express everything you
              need.
            </p>
          </div>

          <div className="layers-wrap">
            <div className="nest rise" aria-hidden="true">
              <div className="ring r3">
                <div className="rl">
                  <span className="rn">Extended</span>
                  <span className="rc">551 words · 536 chars</span>
                </div>
                <div className="ring r2">
                  <div className="rl">
                    <span className="rn">Minimal</span>
                    <span className="rc">355 words · 370 chars</span>
                  </div>
                  <div className="ring r1">
                    <div className="rl">
                      <span className="rn">Core</span>
                      <span className="rc">91 words · 102 chars</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="subset">Core ⊂ Minimal ⊂ Extended</div>
            </div>

            <div className="ldetail rise">
              <div className="lrow">
                <div className="lh">
                  <span className="nm">Core</span>
                  <span className="ct">91 words / 102 characters</span>
                </div>
                <div className="ld">
                  Express basic needs, describe the objects around you, and
                  handle fundamental questions.
                </div>
              </div>
              <div className="lrow">
                <div className="lh">
                  <span className="nm">Minimal</span>
                  <span className="ct">355 words / 370 characters</span>
                </div>
                <div className="ld">
                  Hold fluid daily conversations, structure storytelling, and
                  define any new concept on the fly.
                </div>
              </div>
              <div className="lrow">
                <div className="lh">
                  <span className="nm">Extended</span>
                  <span className="ct">551 words / 536 characters</span>
                </div>
                <div className="ld">
                  Rich, precise expression across academic, financial,
                  geographic, and everyday domains.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GRAMMAR */}
      <section className="block" id="grammar">
        <div className="wrap">
          <div className="gram rise">
            <div className="kicker">The grammar ecosystem</div>
            <h2 className="sec">
              100% standard syntax. None of the mechanical overhead.
            </h2>
            <p className="sec-sub">
              High-yield rules that stay fully grammatical Chinese while
              removing the parts that slow learners down.
            </p>
            <div className="grid4">
              <div className="gcell">
                <div className="gn">01 · classifier</div>
                <div className="gt">One classifier for everything</div>
                <div className="gd">
                  Use 个 (gè) for every noun instead of memorizing dozens of
                  measure words.
                </div>
                <div className="gex">
                  <em>三</em>个人 · <em>两</em>个书
                </div>
              </div>
              <div className="gcell">
                <div className="gn">02 · tense</div>
                <div className="gt">Timeline, not conjugation</div>
                <div className="gd">
                  Verbs never change form — a time word does the work of tense.
                </div>
                <div className="gex">
                  我<em>昨天</em>去 · 他<em>明天</em>来
                </div>
              </div>
              <div className="gcell">
                <div className="gn">03 · order</div>
                <div className="gt">One strict word order</div>
                <div className="gd">
                  Always Subject – (Time) – Verb – Object – (Result). No
                  exceptions to track.
                </div>
                <div className="gex">
                  主 — <em>时间</em> — 动 — 宾 — <em>果</em>
                </div>
              </div>
              <div className="gcell">
                <div className="gn">04 · questions</div>
                <div className="gt">Ask and negate simply</div>
                <div className="gd">
                  Add 吗 for yes/no questions; use 不 or 没有 to negate.
                </div>
                <div className="gex">
                  你去<em>吗</em>？· 我<em>不</em>去
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROOF */}
      <section
        className="block"
        id="proof"
        style={{
          background: "var(--paper-2)",
          borderTop: "1px solid var(--line)",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div className="wrap">
          <div className="rise">
            <div className="kicker">The proof of concept</div>
            <h2 className="sec">Can you read this after the Core layer?</h2>
          </div>
          <div className="proof">
            <div className="proof-aside rise">
              <div className="kicker">Read it aloud</div>
              <p>
                The passage to the right is written entirely in Jiǎndānhuà —
                real Mandarin, nothing invented.
              </p>
              <p>
                If it makes sense to you, the language is working exactly as
                designed.
              </p>
              <div className="ptag">看懂了？简单话就有用。</div>
            </div>

            <div className="reading rise">
              <div className="pseal">
                <Seal small />
              </div>
              <div className="han">
                简单话是什么？简单话是一种人做的小中国话。它的字不多（只有
                <b>五百三十七</b>个），词不多（只有<b>五百五十一</b>
                个）。你学了最简单的<b>九十一</b>
                个词以后，就能用这些词说所有的事。不知道一个词？你就用知道的话说它。比如"飞机"是"
                <b>天上飞的车</b>"，"冰箱"是"<b>保存食物冷的机器</b>
                "。如果你能看懂上面这几句话，那简单话就有用。
              </div>
              <div className="reveal">
                <button
                  className={"reveal-btn" + (open ? " open" : "")}
                  onClick={() => setOpen((o) => !o)}
                  aria-expanded={open}
                >
                  <span className="chev">›</span>{" "}
                  {open ? "Hide translation" : "Show English translation"}
                </button>
                {open && <div className="reveal-body">{PROOF_EN}</div>}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GET STARTED */}
      <section className="block" id="start">
        <div className="wrap">
          <div className="start rise">
            <div className="slogan">学中国话，不用十年。</div>
            <div className="slogan-rom">
              Jiǎndānhuà — learn Chinese, without taking ten years.
            </div>
            <div className="steps">
              <div className="step">
                <div className="sn">Step 01</div>
                <div className="st">Watch the lessons</div>
                <div className="sd">
                  Start with the 91-word Core and speak from your first day.
                </div>
              </div>
              <div className="step">
                <div className="sn">Step 02</div>
                <div className="st">Read the library</div>
                <div className="sd">
                  Move into real books and videos within a month.
                </div>
              </div>
              <div className="step" id="dictionary">
                <div className="sn">Step 03</div>
                <div className="st">Visit the dictionary</div>
                <div className="sd">
                  Look up every atom in the closed 536-character set.
                </div>
              </div>
            </div>
            <a href="#" className="btn btn-white">
              Begin the Core layer →
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="wrap">
          <div>
            <div className="fbrand">简单话 · Jiǎndānhuà</div>
            <div className="fnote">
              A minimal, easy-to-learn bridge into real Mandarin Chinese — built
              on a closed, necessary-and-sufficient root set.
            </div>
          </div>
          <div className="flinks">
            <a href="#how">How it works</a>
            <a href="#layers">Layers</a>
            <a href="#grammar">Grammar</a>
            <a href="#dictionary">Dictionary</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
