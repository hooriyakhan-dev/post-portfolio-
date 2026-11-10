(function () {
  var HELLO_OVERLAP = 0.54; /* 0.35 = more of Hello hidden behind her, 0.7 = Hello mostly visible */
  var $ = function (i) {
      return document.getElementById(i);
    },
    au = $("au"),
    T = [],
    muted = false,
    ctx,
    gn,
    an,
    buf,
    raf;
  var OFF = 3.3; /* audio starts at 3.3s of the reel so Hello appears at once */
  function at(s, f) {
    T.push(setTimeout(f, Math.max(0, s - OFF) * 1000));
  }
  function scene(id) {
    ["A", "B", "C"].forEach(function (x) {
      $(x).classList.toggle("on", x === id);
    });
  }
  function go(id) {
    $(id).classList.add("go");
  }
  /* live audio level -> glow */
  function meter() {
    if (!an) return;
    an.getByteTimeDomainData(buf);
    var s = 0;
    for (var i = 0; i < buf.length; i++) {
      var v = (buf[i] - 128) / 128;
      s += v * v;
    }
    var l = Math.min(1, Math.sqrt(s / buf.length) * 5),
      c =
        parseFloat(document.documentElement.style.getPropertyValue("--lv")) ||
        0;
    document.documentElement.style.setProperty(
      "--lv",
      (c + (l - c) * 0.35).toFixed(3),
    );
    raf = requestAnimationFrame(meter);
  }
  function initAudio() {
    if (ctx || location.protocol === "file:") return;
    try {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      var src = ctx.createMediaElementSource(au);
      an = ctx.createAnalyser();
      an.fftSize = 512;
      buf = new Uint8Array(an.fftSize);
      gn = ctx.createGain();
      src.connect(an);
      an.connect(gn);
      gn.connect(ctx.destination);
      meter();
    } catch (e) {
      ctx = null;
    }
  }
  /* pixel bg */
  var px = $("px"),
    cells = [],
    cols = ["#0f3d2b", "#145236", "#0a2e20", "#1f6a47", "#2a7d52"];
  for (var i = 0; i < 9 * 18; i++) {
    var s = document.createElement("span");
    s.style.background = cols[i % 5];
    s.style.opacity = Math.random() * 0.9;
    px.appendChild(s);
    cells.push(s);
  }
  setInterval(function () {
    for (var k = 0; k < 14; k++)
      cells[(Math.random() * cells.length) | 0].style.opacity =
        Math.random() * 0.9;
  }, 300);
  /* typing */
  var tt;
  function typeTo(t, sp) {
    clearTimeout(tt);
    var e = $("typed");
    (function st() {
      var c = e.textContent;
      if (!t.startsWith(c)) {
        e.textContent = c.slice(0, -1);
        tt = setTimeout(st, 28);
      } else if (c.length < t.length) {
        e.textContent = t.slice(0, c.length + 1);
        tt = setTimeout(st, sp || 85);
      }
    })();
  }
  var ws = ["Full Stack", "GenAI", "Website", "Project"];
  function swap(a, b, c) {
    ["y1", "w", "y3"].forEach(function (i) {
      $(i).classList.add("out");
    });
    setTimeout(function () {
      $("y1").textContent = a;
      $("w").textContent = b;
      $("y3").textContent = c;
      ["y1", "w", "y3"].forEach(function (i) {
        $(i).classList.remove("out");
      });
    }, 320);
  }
  function word(k) {
    var w = $("w");
    w.classList.add("out");
    setTimeout(function () {
      w.textContent = ws[k];
      w.classList.remove("out");
    }, 300);
  }

  function lay() {
    var W = innerWidth,
      H = innerHeight,
      h = $("h"),
      sp = h.querySelectorAll("span"),
      w = 0,
      i;
    h.style.fontSize = "100px";
    for (i = 0; i < sp.length; i++) w += sp[i].offsetWidth;
    var fs = Math.min((100 * W * 0.95) / w, H * 0.34),
      top = H * 0.065,
      py = top + fs * HELLO_OVERLAP,
      nat = (H - py) * 0.7437,
      Wp = W > H * 1.1 ? Math.min(nat * 1.2, W * 0.5) : Math.max(nat, W * 1.3);
    var c = document.createElement("canvas").getContext("2d");
    c.font = "800 100px Poppins,sans-serif";
    var bw = c.measureText("Connect.").width - 44;
    $("big").style.fontSize =
      Math.min((100 * W * 0.97) / bw, H * 0.26, 300) + "px";
    h.style.fontSize = fs + "px";
    h.style.top = top + "px";
    $("phw").style.width = Wp + "px";
    $("phw").style.height = H - py + "px";
    $("ph").style.width = Wp + "px";
    document.documentElement.style.setProperty("--pw", Wp + "px");
    $("A").style.setProperty("--iy", top + fs * 1.0 + "px");
  }
  lay();
  addEventListener("resize", lay);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(lay);
  if (/clean/.test(location.search)) document.body.classList.add("clean");
  function reset() {
    T.forEach(clearTimeout);
    T = [];
    clearTimeout(tt);
    document.querySelectorAll(".go,.press,.hit,.live").forEach(function (e) {
      e.classList.remove("go", "press", "hit", "live");
    });
    $("C").classList.remove("hit");
    $("typed").textContent = "";
    $("y1").textContent = "Your";
    $("w").textContent = "Full Stack";
    $("y3").textContent = "Developer";
    ["A", "B", "C"].forEach(function (x) {
      $(x).classList.remove("on");
    });
    $("rp").style.display = "none";
  }
  function run() {
    reset();
    lay();
    au.currentTime = 0;
    au.play().catch(function () {});
    scene("A");
    var L = document.querySelectorAll("#h span");
    [3.6, 3.85, 4.04, 4.13, 4.23].forEach(function (t, i) {
      at(t, function () {
        L[i].classList.add("go");
      });
    });
    at(5.4, function () {
      go("ph");
    });
    at(6.6, function () {
      go("iam");
    });
    at(7.9, function () {
      go("role");
      go("badge");
    });
    at(9.3, function () {
      typeTo("Full Stack Developer");
    });
    at(12.5, function () {
      typeTo("Generative AI Developer");
    });
    at(14.9, function () {
      typeTo("Websites & Projects", 75);
    });
    at(18.2, function () {
      scene("B");
    });
    at(19.4, function () {
      go("av");
      go("who");
    });
    at(19.7, function () {
      go("pill");
    });
    at(20.3, function () {
      go("cards");
    });
    at(21.0, function () {
      word(1);
    });
    at(22.9, function () {
      word(2);
    });
    at(25.7, function () {
      word(3);
    });
    at(27.0, function () {
      swap("Your one", "Dev partner", "for every project");
    });
    at(29.8, function () {
      go("cta");
    });
    at(31.5, function () {
      $("cta").classList.add("press");
    });
    at(33.3, function () {
      scene("C");
    });
    at(33.5, function () {
      go("big");
      go("chip");
      go("sub3");
    });
    document.querySelectorAll(".lk").forEach(function (l, i) {
      at(33.8 + i * 0.35, function () {
        l.classList.add("go");
      });
    });
    at(36.1, function () {
      $("C").classList.add("hit");
      setTimeout(function () {
        $("C").classList.remove("hit");
      }, 800);
    });
    at(38, function () {
      $("rp").style.display = "block";
    });
  }
  $("play").onclick = function () {
    initAudio();
    if (ctx && ctx.state === "suspended") ctx.resume();
    $("gate").classList.add("off");
    run();
  };
  $("rp").onclick = run;
  $("snd").onclick = function () {
    muted = !muted;
    if (gn) gn.gain.value = muted ? 0 : 1;
    else au.muted = muted;
    $("snd").textContent = muted ? "🔇" : "🔊";
  };
})();
