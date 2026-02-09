/* Whammy the Sammy - Web Canvas Game (Atari/NES-inspired)
   No external assets. Pure Canvas + WebAudio.
*/
(function(){
  'use strict';

  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  // --- Basic 8-bit palette helpers ---
  const PAL = {
    bg: '#000000',
    fg: '#e0e0e0',
    red: '#ff004d',
    green: '#00e436',
    blue: '#29adff',
    yellow: '#ffec27',
    dark: '#1a1a1a',
    gray: '#555555',
    purple: '#83769c'
  };

  // --- Audio ---
  let audioCtx = null;
  let audioUnlocked = false;
  function unlockAudio(){
    if (!audioCtx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) audioCtx = new AC();
    }
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
    audioUnlocked = !!audioCtx;
  }
  function beep(freq=220, dur=0.08, type='square', volume=0.05){
    if (!audioUnlocked || !audioCtx) return;
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.value = volume;
    o.connect(g).connect(audioCtx.destination);
    const t = audioCtx.currentTime;
    o.start(t);
    o.stop(t + Math.max(0.01, dur));
  }
  function noiseBurst(dur=0.12, volume=0.07){
    if (!audioUnlocked || !audioCtx) return;
    const bufferSize = Math.max(256, Math.floor(44100 * dur));
    const buffer = audioCtx.createBuffer(1, bufferSize, 44100);
    const data = buffer.getChannelData(0);
    for (let i=0;i<bufferSize;i++) data[i] = (Math.random()*2-1) * 0.6;
    const src = audioCtx.createBufferSource();
    src.buffer = buffer;
    const g = audioCtx.createGain();
    g.gain.value = volume;
    src.connect(g).connect(audioCtx.destination);
    src.start();
  }

  let drone = null;
  function startDrone(){
    if (!audioUnlocked || !audioCtx || drone) return;
    const o1 = audioCtx.createOscillator();
    const o2 = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o1.type = 'sawtooth'; o2.type = 'triangle';
    o1.frequency.value = 58; o2.frequency.value = 61;
    g.gain.value = 0.0;
    o1.connect(g); o2.connect(g); g.connect(audioCtx.destination);
    const t = audioCtx.currentTime;
    g.gain.linearRampToValueAtTime(0.02, t+1.0);
    o1.start(); o2.start();
    drone = {o1,o2,g};
  }
  function stopDrone(){
    if (!drone || !audioCtx) return;
    const t = audioCtx.currentTime;
    drone.g.gain.linearRampToValueAtTime(0.0, t+0.5);
    try { drone.o1.stop(t+0.6); drone.o2.stop(t+0.6); } catch(_){ }
    drone = null;
  }

  // --- Input ---
  const keys = {};
  const mouse = {x:0, y:0, down:false, clicked:false};

  function screenToCanvas(mx, my){
    const rect = canvas.getBoundingClientRect();
    const sx = canvas.width / rect.width;
    const sy = canvas.height / rect.height;
    return {
      x: (mx - rect.left) * sx,
      y: (my - rect.top) * sy
    };
  }

  window.addEventListener('keydown', (e)=>{
    if (!audioUnlocked) unlockAudio();
    keys[e.key.toLowerCase()] = true;
    if (e.key === ' ') e.preventDefault();
  });
  window.addEventListener('keyup', (e)=>{
    keys[e.key.toLowerCase()] = false;
  });
  window.addEventListener('mousedown', (e)=>{
    if (!audioUnlocked) unlockAudio();
    mouse.down = true;
    mouse.clicked = true;
  });
  window.addEventListener('mouseup', ()=>{
    mouse.down = false;
  });
  window.addEventListener('mousemove', (e)=>{
    const p = screenToCanvas(e.clientX, e.clientY);
    mouse.x = p.x; mouse.y = p.y;
  });
  window.addEventListener('touchstart', (e)=>{
    if (!audioUnlocked) unlockAudio();
    if (e.changedTouches && e.changedTouches[0]){
      const t = e.changedTouches[0];
      const p = screenToCanvas(t.clientX, t.clientY);
      mouse.x = p.x; mouse.y = p.y;
    }
    mouse.down = true;
    mouse.clicked = true;
    e.preventDefault();
  }, {passive:false});
  window.addEventListener('touchmove', (e)=>{
    if (e.changedTouches && e.changedTouches[0]){
      const t = e.changedTouches[0];
      const p = screenToCanvas(t.clientX, t.clientY);
      mouse.x = p.x; mouse.y = p.y;
    }
    e.preventDefault();
  }, {passive:false});
  window.addEventListener('touchend', ()=>{
    mouse.down = false;
  }, {passive:true});

  // --- Util ---
  const clamp = (v,a,b)=>Math.max(a,Math.min(b,v));
  const rand = (a,b)=>a + Math.random()*(b-a);
  const randi = (a,b)=>Math.floor(rand(a,b));

  // --- Game State ---
  const STATE = {
    TITLE: 0,
    WHACK: 1,
    TRANSITION: 2,
    WALK: 3,
    CUTSCENE: 4,
    END: 5,
    JUMPSCARE: 6
  };

  let state = STATE.TITLE;
  let fade = 0; // 0..1 fade overlay alpha
  let fadingOut = false;

  // --- Global timers ---
  let lastTime = performance.now();
  let dt = 0;

  // --- TITLE ---
  const title = { t:0, started:false, glitch:0, blinkT:0 };
  function initTitle(){
    title.t = 0; title.started = false; title.glitch = 0; title.blinkT = 0;
  }
  function updateTitle(now){
    title.t += dt; title.blinkT += dt;
    if (!title.started && (keys[' ']||keys['enter']||mouse.clicked||title.t>5)){
      title.started = true;
    }
    if (title.started){
      title.glitch += dt;
      if (title.glitch > 1.2){
        startFadeOut(()=>{ state = STATE.WHACK; initWhack(); startFadeIn(); });
      }
    }
    drawTitle();
    mouse.clicked = false;
  }
  function drawTitle(){
    for (let y=0;y<canvas.height;y+=16){
      for (let x=0;x<canvas.width;x+=16){
        const c = ((x>>4)+(y>>4))%2 ? '#1bffba' : '#0c7b5b';
        rect(x,y,16,16,c);
      }
    }
    ctx.textAlign='center'; ctx.textBaseline='middle';
    setColor('#fff');
    ctx.font='8px monospace';
    text('WHAMMY THE SAMMY', 128, 80);
    setColor('#000');
    text('AN HONEST FAMILY GAME', 128, 98);
    if (Math.sin(title.blinkT*6)>0){ setColor('#fff'); text('PRESS START',128,130); }
    if (title.started){
      for (let i=0;i<10;i++){
        const y=randi(0,canvas.height);
        rect(0,y,canvas.width,1,'rgba(255,255,255,'+(Math.random()*0.3)+')');
      }
      rect(0,0,canvas.width,canvas.height,`rgba(0,0,0,${clamp(title.glitch,0,0.7)})`);
    }
    drawFade();
  }

  // --- WHACK-A-MOLE ---
  const whack = {
    started: false,
    time: 0,
    duration: 28.0, // seconds until Sammy intervenes
    grid: [], // hole centers
    mole: null, // {idx, t, alive, sammy}
    popMin: 0.7,
    popMax: 1.3,
    nextPopIn: 1.0,
    score: 0,
    hearts: 3,
    sammyAttack: false,
    sammyT: 0,
    tension: 0,
    hazardClock: 0,
    safeWindow: 18,
    failSafeMax: 75,
    nextAnomalyIn: 3,
    blackoutT: 0,
    decoyChance: 0.15,
    lastClickAt: -999,
    malletCooldown: 0.22
  };

  function initWhack(){
    // 3x3 grid
    whack.grid = [];
    const gw = 3, gh = 3;
    const marginX = 24, marginY = 36;
    const w = canvas.width - marginX*2;
    const h = canvas.height - marginY*2;
    for (let gy=0; gy<gh; gy++){
      for (let gx=0; gx<gw; gx++){
        const x = marginX + (w/(gw-1)) * gx;
        const y = marginY + (h/(gh-1)) * gy;
        whack.grid.push({x,y});
      }
    }
    whack.started = false;
    whack.time = 0;
    whack.mole = null;
    whack.nextPopIn = 1.0;
    whack.score = 0;
    whack.hearts = 3;
    whack.sammyAttack = false;
    whack.sammyT = 0;
    whack.tension = 0;
    whack.hazardClock = 0;
    whack.safeWindow = rand(12, 22);
    whack.failSafeMax = rand(55, 90);
    whack.nextAnomalyIn = rand(2, 6);
    whack.blackoutT = 0;
    whack.lastClickAt = -999;
    whack.duration = rand(45, 90);
  }

  function updateWhack(t){
    if (!whack.started){
      // waiting for input to begin
      if (keys[' '] || mouse.clicked){
        whack.started = true;
        beep(440, 0.08);
      }
    } else {
      whack.time += dt;
      whack.tension = clamp(whack.tension + dt*0.02, 0, 1);
      if (whack.blackoutT > 0) whack.blackoutT -= dt;
      whack.nextAnomalyIn -= dt;
      if (!whack.sammyAttack && whack.nextAnomalyIn <= 0){
        whack.blackoutT = rand(0.2, 0.7);
        whack.nextAnomalyIn = rand(2, 6);
        noiseBurst(0.25, 0.08);
        whack.tension = clamp(whack.tension + rand(0.06, 0.16), 0, 1);
      }

      if (!whack.sammyAttack && whack.time >= whack.duration){
        // Sammy appears - destined loss
        whack.sammyAttack = true;
        whack.sammyT = 0;
        whack.mole = {idx: 4, t: 0, alive: true, sammy: true}; // center hole
        noiseBurst(0.2, 0.08);
      }

      if (!whack.sammyAttack && whack.time > whack.safeWindow){
        whack.hazardClock += dt;
        if (whack.hazardClock >= 0.6){
          whack.hazardClock = 0;
          const p = 0.02 + whack.tension * 0.08;
          if (Math.random() < p || whack.time > whack.failSafeMax){
            whack.sammyAttack = true;
            whack.sammyT = 0;
            whack.mole = {idx: 4, t: 0, alive: true, sammy: true};
            whack.blackoutT = 0.5;
            noiseBurst(0.3, 0.1);
          }
        }
      }

      if (whack.sammyAttack){
        whack.sammyT += dt;
        // Drain hearts over ~2.4s
        if (whack.sammyT > 0.6 && whack.hearts === 3){ whack.hearts = 2; noiseBurst(0.15, 0.08); }
        if (whack.sammyT > 1.2 && whack.hearts === 2){ whack.hearts = 1; noiseBurst(0.15, 0.08); }
        if (whack.sammyT > 1.8 && whack.hearts === 1){ whack.hearts = 0; noiseBurst(0.25, 0.1); }
        if (whack.sammyT > 2.2){
          // transition to walk
          startFadeOut(() => {
            state = STATE.WALK;
            initWalk();
            startFadeIn();
          });
        }
      } else {
        // regular mole logic
        if (!whack.mole){
          whack.nextPopIn -= dt;
          if (whack.nextPopIn <= 0){
            const idx = randi(0, whack.grid.length);
            const decoy = Math.random() < whack.decoyChance;
            whack.mole = {idx, t: 0, alive: true, sammy: false, decoy};
          }
        } else if (whack.mole.alive){
          whack.mole.t += dt;
          if (whack.mole.t > rand(whack.popMin, whack.popMax)){
            // mole escaped
            whack.mole.alive = false;
            whack.mole = null;
            whack.nextPopIn = rand(0.2, 0.6);
          }
        }

        // click to whack
        if (mouse.clicked && whack.mole && whack.mole.alive && !whack.mole.sammy && (t - whack.lastClickAt) > whack.malletCooldown*1000){
          const hole = whack.grid[whack.mole.idx];
          const dx = mouse.x - hole.x;
          const dy = mouse.y - hole.y;
          const r = 16;
          if (dx*dx + dy*dy <= r*r){
            // hit!
            if (whack.mole.decoy){
              beep(180, 0.05, 'triangle', 0.06);
              noiseBurst(0.12, 0.06);
              whack.tension = clamp(whack.tension + 0.08, 0, 1);
            } else {
              whack.score += 1;
              beep(880, 0.05);
            }
            whack.mole.alive = false;
            whack.mole = null;
            whack.nextPopIn = rand(0.3, 0.7);
            whack.lastClickAt = t;
          } else {
            // miss
            beep(220, 0.04, 'triangle');
            whack.tension = clamp(whack.tension + 0.03, 0, 1);
            whack.lastClickAt = t;
          }
        }
      }
    }

    // Render
    drawWhack();
    mouse.clicked = false;
  }

  function drawWhack(){
    // BG
    fill(PAL.bg);

    // Title/Instruction
    ctx.font = '8px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    setColor(PAL.fg);
    text('WHAMMY THE SAMMY', 128, 6);
    ctx.textBaseline = 'alphabetic';

    // Holes
    for (let i=0;i<whack.grid.length;i++){
      const h = whack.grid[i];
      // hole
      circle(h.x, h.y+4, 12, PAL.dark);
      circle(h.x, h.y+4, 12, null, PAL.gray);
    }

    // Mole
    if (whack.mole && whack.mole.alive){
      const h = whack.grid[whack.mole.idx];
      const t = whack.mole.t || 0;
      const rise = Math.min(1, t/0.2);
      const y = h.y + 8 - rise*16;
      if (whack.mole.sammy){
        // distorted colors and shake
        const shake = Math.sin(performance.now()*0.02) * 1.5;
        moleSprite(h.x+shake, y, true);
      } else {
        moleSprite(h.x, y, false);
      }
    }

    // HUD
    drawHUD();

    // Mallet reticle
    drawReticle(mouse.x, mouse.y);

    // Overlay instructions
    if (!whack.started){
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      rect(20, 180, 216, 40, 'rgba(0,0,0,0.6)');
      setColor(PAL.fg);
      text('CLICK MOLES. PRESS SPACE TO START.', 128, 194);
    }

    if (whack.blackoutT > 0){
      rect(0,0,canvas.width,canvas.height, `rgba(0,0,0,${clamp(whack.blackoutT,0,0.9)})`);
      for (let i=0;i<8;i++){
        const y = randi(0, canvas.height);
        rect(0, y, canvas.width, 1, 'rgba(255,255,255,'+(Math.random()*0.08)+')');
      }
    }
    drawFade();
  }

  function moleSprite(x,y, isSammy){
    const body = isSammy ? PAL.purple : PAL.green;
    const eye = isSammy ? PAL.red : PAL.blue;
    rect(x-8, y-10, 16, 10, body);
    rect(x-10, y-6, 20, 6, body);
    // eyes
    rect(x-5, y-7, 3, 3, eye);
    rect(x+2, y-7, 3, 3, eye);
    // teeth
    rect(x-3, y-1, 2, 2, PAL.fg);
    rect(x+1, y-1, 2, 2, PAL.fg);
  }

  function drawHUD(){
    // score left
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    setColor(PAL.fg);
    text('SCORE '+whack.score, 6, 6);

    // timer bar right
    const t = 1;
    rect(180, 6, 70, 6, PAL.bg);
    rect(180, 6, Math.floor(70*(1-t)), 6, PAL.blue);
    setColor(PAL.fg);
    text('', 170, 6);

    // hearts
    for (let i=0;i<3;i++){
      const x = 6 + i*10;
      const y = 18;
      rect(x, y, 8, 6, i < whack.hearts ? PAL.red : PAL.gray);
    }
  }

  function drawReticle(x,y){
    const r = 6;
    // crosshair
    rect(x-r, y-1, r*2, 2, PAL.yellow);
    rect(x-1, y-r, 2, r*2, PAL.yellow);
  }

  // --- WALK SCENE ---
  const walk = {
    px: 128,
    py: 180,
    speed: 60,
    mole: {x: 128, y: 70},
    started: false,
    drips: [],
    flickerT: 0,
    ox: 0,
    introRevealT: 2.0,
    revealDist: 56
  };

  function initWalk(){
    walk.px = 128;
    walk.py = 180;
    let mx, my;
    do { mx = randi(20, 236); my = randi(36, 120); } while (Math.hypot(mx-128, my-180) < 90);
    walk.mole = {x: mx, y: my};
    walk.started = false;
    walk.drips = [];
    walk.flickerT = 0;
    walk.ox = 0;
    startDrone();
  }

  function updateWalk(){
    if (!walk.started){
      walk.started = true;
      beep(330, 0.06);
    }
    if (walk.introRevealT>0) walk.introRevealT -= dt;
    // move
    let dx = 0, dy = 0;
    if (keys['arrowleft']||keys['a']) dx -= 1;
    if (keys['arrowright']||keys['d']) dx += 1;
    if (keys['arrowup']||keys['w']) dy -= 1;
    if (keys['arrowdown']||keys['s']) dy += 1;
    const len = Math.hypot(dx,dy)||1;
    walk.px = clamp(walk.px + (dx/len)*walk.speed*dt, 8, canvas.width-8);
    walk.py = clamp(walk.py + (dy/len)*walk.speed*dt, 32, canvas.height-8);
    walk.ox = clamp(walk.ox + dx*dt*20, -200, 200);

    if (Math.abs(dx)+Math.abs(dy) > 0){
      if (Math.random() < 0.02) beep(120, 0.02, 'square', 0.02);
    }

    walk.flickerT -= dt;
    if (walk.flickerT <= 0 && Math.random() < 0.05){
      walk.flickerT = rand(0.05, 0.2);
      noiseBurst(0.08, 0.04);
    }

    if (Math.random() < 0.03){
      walk.drips.push({x: randi(12, canvas.width-12), y: 26, v: rand(12, 24)});
      if (walk.drips.length > 40) walk.drips.shift();
    }
    for (let d of walk.drips){ d.y += d.v*dt; }
    walk.drips = walk.drips.filter(d=>d.y < canvas.height-6);

    // proximity trigger
    const dd = Math.hypot(walk.px - walk.mole.x, walk.py - walk.mole.y);
    if (dd < 16){
      startFadeOut(() => {
        state = STATE.CUTSCENE;
        initCutscene();
        startFadeIn();
      });
    }

    drawWalk();
    mouse.clicked = false;
  }

  function drawWalk(){
    for (let y=0;y<canvas.height;y+=16){
      for (let x=0;x<canvas.width;x+=16){
        const c = ((x>>4)+(y>>4))%2 ? '#060606' : '#040404';
        rect(x,y,16,16,c);
      }
    }

    rect(0, 24, canvas.width, 2, PAL.dark);
    for (let x=0;x<canvas.width;x+=32){
      rect(x + Math.sin((x+walk.ox)*0.05)*2, 26, 4, canvas.height-30, '#0a0a0a');
    }
    for (let d of walk.drips){
      rect(d.x, d.y, 1, 4, PAL.purple);
    }

    // distorted mole (hidden until close)
    const t = performance.now()*0.02;
    const shake = Math.sin(t*0.8)*1 + Math.random()*0.4;
    const ddm = Math.hypot(walk.px - walk.mole.x, walk.py - walk.mole.y);
    if (ddm < walk.revealDist){
      moleSprite(walk.mole.x + shake, walk.mole.y + Math.sin(t)*1, true);
    }

    // player (simple square)
    rect(walk.px-4, walk.py-6, 8, 12, PAL.blue);
    rect(walk.px-2, walk.py-8, 4, 2, PAL.blue);

    // instruction
    ctx.textAlign='center'; ctx.textBaseline='top'; setColor(PAL.fg);
    text('ARROW KEYS/WASD TO MOVE', 128, 4);

    ctx.save();
    ctx.globalCompositeOperation = 'source-over';
    const baseAlpha = 0.93;
    const alpha = clamp(baseAlpha - (2.0 - clamp(walk.introRevealT,0,2.0))*0.6, 0.4, 0.93);
    rect(0,0,canvas.width,canvas.height,`rgba(0,0,0,${alpha})`);
    ctx.globalCompositeOperation = 'destination-out';
    const baseR = 46;
    const r = baseR + Math.max(0, walk.introRevealT)*30;
    ctx.beginPath();
    ctx.arc(Math.round(walk.px), Math.round(walk.py-2), r, 0, Math.PI*2);
    ctx.fill();
    ctx.restore();

    if (walk.flickerT > 0){
      rect(0,0,canvas.width,canvas.height,'rgba(255,255,255,0.02)');
      for (let i=0;i<6;i++){
        const y = randi(0, canvas.height);
        rect(0,y,canvas.width,1,'rgba(255,255,255,'+(Math.random()*0.08)+')');
      }
    }

    drawFade();
  }

  // --- CUTSCENE ---
  const cut = {
    t: 0,
    dur: 4.0
  };

  function initCutscene(){
    cut.t = 0;
    noiseBurst(0.4, 0.09);
    stopDrone();
  }

  function updateCutscene(){
    cut.t += dt;
    drawCutscene();
    if (cut.t > cut.dur){
      startFadeOut(() => {
        state = STATE.END;
        initEnd();
        startFadeIn();
      });
    }
  }

  function drawCutscene(){
    // flashing background
    const f = (Math.sin(performance.now()*0.02)*0.5+0.5);
    fill(f>0.5?PAL.purple:PAL.dark);
    // giant mole face zoom
    const s = 1 + cut.t*1.5;
    const cx = 128, cy = 120;
    // draw multiple offset layers for glitch
    for (let i=0;i<3;i++){
      const ox = Math.sin((cut.t+i)*4)*2*(i+1);
      const oy = Math.cos((cut.t+i)*3)*2*(i+1);
      ctx.save();
      ctx.translate(cx+ox, cy+oy);
      ctx.scale(s, s);
      moleSprite(0, -10, true);
      ctx.restore();
    }

    // static noise bars
    for (let i=0;i<10;i++){
      const y = randi(0, canvas.height);
      rect(0, y, canvas.width, 1, 'rgba(255,255,255,'+(Math.random()*0.1)+')');
    }

    drawFade();
  }

  const endState = { t:0 };
  function initEnd(){ endState.t = 0; }
  function updateEnd(){
    endState.t += dt;
    drawEnd();
    if (endState.t > 1.8){
      startFadeOut(()=>{ state = STATE.JUMPSCARE; initJumpscare(); startFadeIn(); });
    }
  }
  // --- END SCREEN ---
  function drawEnd(){
    fill(PAL.bg);
    ctx.textAlign='center';
    ctx.textBaseline='middle';
    setColor(PAL.fg);
    text("YOU CAN'T WHAMMY THE SAMMY", 128, 100);
    setColor(PAL.red);
    text('REFRESH TO REPLAY', 128, 130);
    drawFade();
    stopDrone();
  }

  // --- JUMPSCARE ---
  const jump = { t:0, dur:0.7 };
  function initJumpscare(){ jump.t = 0; noiseBurst(0.6, 0.2); }
  function updateJumpscare(){
    jump.t += dt;
    drawJumpscare();
    if (jump.t > jump.dur){
      startFadeOut(()=>{ state = STATE.TITLE; initTitle(); startFadeIn(); });
    }
  }
  function drawJumpscare(){
    const s = 2.5 + jump.t*6;
    const cx = 128, cy = 120;
    fill('#000');
    for (let i=0;i<3;i++){
      const ox = Math.sin((jump.t+i)*9)*4*(i+1);
      const oy = Math.cos((jump.t+i)*7)*4*(i+1);
      ctx.save(); ctx.translate(cx+ox, cy+oy); ctx.scale(s, s); moleSprite(0, -10, true); ctx.restore();
    }
    rect(0,0,canvas.width,canvas.height,'rgba(255,255,255,0.15)');
    drawFade();
  }

  // --- Fade utilities ---
  function startFadeOut(onDone){
    if (fadingOut) return;
    fadingOut = true;
    const start = performance.now();
    const dur = 600;
    (function step(){
      const now = performance.now();
      const k = clamp((now-start)/dur, 0, 1);
      fade = k;
      if (k < 1){ requestAnimationFrame(step); }
      else { onDone && onDone(); fadingOut = false; }
    })();
  }
  function startFadeIn(){
    const start = performance.now();
    const dur = 600;
    (function step(){
      const now = performance.now();
      const k = 1 - clamp((now-start)/dur, 0, 1);
      fade = k;
      if (k > 0){ requestAnimationFrame(step); }
    })();
  }
  function drawFade(){
    if (fade > 0){
      rect(0,0,canvas.width,canvas.height,`rgba(0,0,0,${fade})`);
    }
  }

  // --- Drawing helpers ---
  function setColor(c){ ctx.fillStyle = c; ctx.strokeStyle = c; }
  function fill(c){ setColor(c); ctx.fillRect(0,0,canvas.width,canvas.height); }
  function rect(x,y,w,h,c){ if (c) setColor(c); ctx.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h)); }
  function circle(x,y,r,fillC,strokeC){
    ctx.beginPath();
    ctx.arc(Math.round(x), Math.round(y), Math.round(r), 0, Math.PI*2);
    if (fillC){ setColor(fillC); ctx.fill(); }
    if (strokeC){ setColor(strokeC); ctx.stroke(); }
  }
  function text(str, x, y){ ctx.fillText(str, Math.round(x), Math.round(y)); }

  // --- Main loop ---
  function loop(){
    const now = performance.now();
    dt = Math.min(0.05, (now - lastTime)/1000);
    lastTime = now;

    switch(state){
      case STATE.TITLE: updateTitle(now); break;
      case STATE.WHACK: updateWhack(now); break;
      case STATE.TRANSITION: break;
      case STATE.WALK: updateWalk(); break;
      case STATE.CUTSCENE: updateCutscene(); break;
      case STATE.END: updateEnd(); break;
      case STATE.JUMPSCARE: updateJumpscare(); break;
    }

    requestAnimationFrame(loop);
  }

  // Initialize
  initTitle();
  startFadeIn();
  loop();
})();
