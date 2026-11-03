(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("js");

  var cfg = window.SITE || { images: {}, links: {} };
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var clamp = function (n, lo, hi) { return Math.min(hi, Math.max(lo, n)); };

  /* ---------- Photos: apply config, fall back to a labelled placeholder ---------- */
  function placeholder(path) {
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4a2a9e"/><stop offset="1" stop-color="#8a5cf0"/></linearGradient></defs>' +
      '<rect width="800" height="600" fill="url(#g)"/>' +
      '<path d="M60 330H270L305 290L350 395L400 175L450 435L490 315L520 330H740" fill="none" stroke="#7ff0d8" stroke-opacity=".6" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<text x="400" y="500" text-anchor="middle" font-family="system-ui,sans-serif" font-size="30" fill="#fff" fill-opacity=".9">Add photo: ' +
      String(path).replace(/&/g, "&amp;").replace(/</g, "&lt;") + "</text></svg>";
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }

  document.querySelectorAll("img[data-slot]").forEach(function (img) {
    var slot = img.getAttribute("data-slot");
    var c = (cfg.images && cfg.images[slot]) || {};
    if (c.alt) img.alt = c.alt;
    var failed = false;
    img.addEventListener("error", function () {
      if (failed) return;
      failed = true;
      img.src = placeholder(c.src || "images/" + slot + ".jpg");
      img.classList.add("is-placeholder");
    });
    if (c.src) img.src = c.src;
    else img.src = placeholder("images/" + slot + ".jpg");
  });

  /* ---------- Links from config ---------- */
  document.querySelectorAll("[data-link]").forEach(function (a) {
    var key = a.getAttribute("data-link");
    var v = cfg.links && cfg.links[key];
    if (!v) { a.hidden = true; return; }
    a.href = key === "email" ? "mailto:" + v : v;
  });

  /* ---------- Optional Buraq video ---------- */
  var vid = document.getElementById("buraq-video");
  if (vid && cfg.buraqVideoId) {
    var f = document.createElement("iframe");
    f.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(cfg.buraqVideoId);
    f.title = "Buraq Planetary Society STEM camp video";
    f.loading = "lazy";
    f.allow = "accelerometer; encrypted-media; gyroscope; picture-in-picture";
    f.allowFullscreen = true;
    vid.appendChild(f);
    vid.hidden = false;
  }

  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- Mobile menu ---------- */
  var nav = document.querySelector(".nav");
  var toggle = document.querySelector(".nav__toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("nav--open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    document.querySelectorAll(".nav__links a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("nav--open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Active section in nav ---------- */
  var links = {};
  document.querySelectorAll(".nav__links a").forEach(function (a) { links[a.getAttribute("href").slice(1)] = a; });
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        Object.keys(links).forEach(function (k) { links[k].classList.toggle("is-active", k === e.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(links).forEach(function (id) {
      var s = document.getElementById(id);
      if (s) spy.observe(s);
    });
  }

  /* ---------- Photo reveal ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("in"); });
  } else {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); ro.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    reveals.forEach(function (el, i) { el.querySelector("img").style.transitionDelay = (i % 3) * 90 + "ms"; ro.observe(el); });
  }

  /* ---------- Soft spotlight that follows the cursor on panels ---------- */
  if (!reduce) {
    document.querySelectorAll(".spot").forEach(function (p) {
      p.addEventListener("pointermove", function (e) {
        var r = p.getBoundingClientRect();
        p.style.setProperty("--mx", e.clientX - r.left + "px");
        p.style.setProperty("--my", e.clientY - r.top + "px");
      });
    });
  }

  /* ---------- Heartbeat spine ---------- */
  var timeline = document.querySelector(".timeline");
  var spine = timeline && timeline.querySelector(".spine");
  var base = spine && spine.querySelector(".spine__base");
  var trace = spine && spine.querySelector(".spine__trace");
  var entries = timeline ? Array.prototype.slice.call(timeline.querySelectorAll(".entry")) : [];
  var beatYs = [];
  var tlHeight = 0;

  function buildSpine() {
    if (!timeline) return;
    tlHeight = timeline.offsetHeight;
    beatYs = entries.map(function (e) { return e.offsetTop + 40; });
    var d = "M24 0";
    beatYs.forEach(function (y) {
      d += " L24 " + (y - 34) + " L30 " + (y - 29) + " L24 " + (y - 24) +
           " L24 " + (y - 12) + " L17 " + (y - 6) + " L43 " + (y + 6) +
           " L11 " + (y + 16) + " L24 " + (y + 24) + " L24 " + (y + 36) +
           " L29 " + (y + 41) + " L24 " + (y + 46);
    });
    d += " L24 " + tlHeight;
    spine.setAttribute("viewBox", "0 0 48 " + tlHeight);
    base.setAttribute("d", d);
    trace.setAttribute("d", d);
  }

  function updateSpine() {
    if (!timeline) return;
    var rect = timeline.getBoundingClientRect();
    var prog = reduce ? 1 : clamp((window.innerHeight * 0.62 - rect.top) / tlHeight, 0, 1);
    trace.style.strokeDashoffset = prog <= 0 ? 1 : 1 - prog;
    trace.style.opacity = prog <= 0 ? 0 : 1;
    entries.forEach(function (e, i) { e.classList.toggle("hit", beatYs[i] / tlHeight <= prog); });
  }

  /* ---------- Scroll loop ---------- */
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var y = window.scrollY || window.pageYOffset;
      var max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      root.style.setProperty("--p", clamp(y / max, 0, 1).toFixed(4));
      root.style.setProperty("--y", Math.round(y));
      nav.classList.toggle("nav--scrolled", y > 12);
      updateSpine();
      ticking = false;
    });
  }

  function layout() { buildSpine(); onScroll(); }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", layout);
  window.addEventListener("load", layout);
  if (window.ResizeObserver && timeline) new ResizeObserver(layout).observe(timeline);
  layout();
})();
