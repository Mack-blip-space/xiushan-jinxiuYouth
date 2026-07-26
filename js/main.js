/* ═══════════════════ MAIN JS ═══════════════════ */
(function(){
  'use strict';

  // ── NAV SCROLL EFFECT ──
  var nav = document.getElementById('nav');
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', function() {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // Mobile toggle
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      navLinks.classList.toggle('open');
      var spans = navToggle.querySelectorAll('span');
      if (navLinks.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });
  }

  // Close mobile nav on link click
  navLinks.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      navLinks.classList.remove('open');
      var spans = navToggle.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });

  // ── ACTIVE NAV LINK (scroll spy) ──
  var sections = document.querySelectorAll('.section, .hero');
  var links = navLinks.querySelectorAll('a');

  if ('IntersectionObserver' in window) {
    var spyObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          links.forEach(function(l) {
            l.classList.toggle('active', l.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-40% 0px -60% 0px' });

    sections.forEach(function(s) { spyObserver.observe(s); });
  }

  // ── SCROLL REVEAL ──
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(function(el) { revealObserver.observe(el); });
  } else {
    reveals.forEach(function(el) { el.classList.add('visible'); });
  }

  // ── PARALLAX (hero background) ──
  var heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', function() {
      var scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        heroBg.style.transform = 'translateY(' + (scrollY * 0.35) + 'px)';
      }
    }, { passive: true });
  }

  // ── E-COMMERCE CHART (CSS-based bar chart, no library needed) ──
  var chartCanvas = document.getElementById('ecomCanvas');
  if (chartCanvas && chartCanvas.getContext) {
    var ctx = chartCanvas.getContext('2d');
    var chartDrawn = false;

    function drawChart() {
      if (chartDrawn) return;
      chartDrawn = true;

      var data = [
        { year: '2014', value: 3.4 },
        { year: '2016', value: 8.2 },
        { year: '2018', value: 16.5 },
        { year: '2020', value: 31.4 }
      ];
      var maxVal = 35;
      var dpr = window.devicePixelRatio || 1;
      var rect = chartCanvas.parentElement.getBoundingClientRect();
      var w = rect.width;
      var h = rect.height;
      chartCanvas.width = w * dpr;
      chartCanvas.height = h * dpr;
      chartCanvas.style.width = w + 'px';
      chartCanvas.style.height = h + 'px';
      ctx.scale(dpr, dpr);

      var padL = 50, padR = 20, padT = 30, padB = 50;
      var chartW = w - padL - padR;
      var chartH = h - padT - padB;
      var barW = chartW / data.length * 0.5;
      var gap = chartW / data.length;

      // Grid lines
      ctx.strokeStyle = 'rgba(0,0,0,0.06)';
      ctx.lineWidth = 1;
      for (var i = 0; i <= 5; i++) {
        var gy = padT + chartH - (chartH * i / 5);
        ctx.beginPath();
        ctx.moveTo(padL, gy);
        ctx.lineTo(w - padR, gy);
        ctx.stroke();
        ctx.fillStyle = '#888';
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText((maxVal * i / 5).toFixed(0) + '亿', padL - 8, gy + 4);
      }

      // Bars with animation
      var animDuration = 1200;
      var startTime = null;

      function animate(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / animDuration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);

        // Clear bars area
        ctx.clearRect(padL, padT - 5, chartW + padR, chartH + padB + 5);

        // Redraw grid
        ctx.strokeStyle = 'rgba(0,0,0,0.06)';
        for (var i = 0; i <= 5; i++) {
          var gy = padT + chartH - (chartH * i / 5);
          ctx.beginPath();
          ctx.moveTo(padL, gy);
          ctx.lineTo(w - padR, gy);
          ctx.stroke();
        }

        data.forEach(function(d, idx) {
          var x = padL + gap * idx + (gap - barW) / 2;
          var barH = (d.value / maxVal) * chartH * eased;
          var y = padT + chartH - barH;

          // Bar gradient
          var grad = ctx.createLinearGradient(x, y, x, padT + chartH);
          grad.addColorStop(0, '#38a858');
          grad.addColorStop(1, '#1a8848');
          ctx.fillStyle = grad;

          // Rounded top
          var r = Math.min(4, barW / 2);
          ctx.beginPath();
          ctx.moveTo(x + r, y);
          ctx.lineTo(x + barW - r, y);
          ctx.quadraticCurveTo(x + barW, y, x + barW, y + r);
          ctx.lineTo(x + barW, padT + chartH);
          ctx.lineTo(x, padT + chartH);
          ctx.lineTo(x, y + r);
          ctx.quadraticCurveTo(x, y, x + r, y);
          ctx.fill();

          // Value label
          if (eased > 0.5) {
            ctx.fillStyle = '#333';
            ctx.font = 'bold 13px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(d.value + '亿', x + barW / 2, y - 8);
          }

          // Year label
          ctx.fillStyle = '#888';
          ctx.font = '12px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(d.year, x + barW / 2, padT + chartH + 24);
        });

        if (progress < 1) requestAnimationFrame(animate);
      }
      requestAnimationFrame(animate);
    }

    // Draw when chart area is visible
    if ('IntersectionObserver' in window) {
      var chartObserver = new IntersectionObserver(function(entries) {
        if (entries[0].isIntersecting) {
          drawChart();
          chartObserver.disconnect();
        }
      }, { threshold: 0.3 });
      chartObserver.observe(chartCanvas.parentElement);
    } else {
      drawChart();
    }
  }

  // ── GALLERY FILTER ──
  var filterBtns = document.querySelectorAll('.filter-btn');
  var galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var filter = btn.getAttribute('data-filter');

      // Update active button
      filterBtns.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');

      // Filter items
      galleryItems.forEach(function(item) {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // ── INTERVIEW ACCORDION ──
  var chapters = document.querySelectorAll('.chapter');
  chapters.forEach(function(ch) {
    var header = ch.querySelector('.chapter-header');
    if (!header) return;
    header.addEventListener('click', function() {
      var isActive = ch.classList.contains('active');
      // Close all chapters
      chapters.forEach(function(c) {
        c.classList.remove('active');
        var body = c.querySelector('.chapter-body');
        if (body) body.style.maxHeight = '0px';
        var hdr = c.querySelector('.chapter-header');
        if (hdr) hdr.setAttribute('aria-expanded', 'false');
      });
      // Open clicked chapter if it wasn't active
      if (!isActive) {
        ch.classList.add('active');
        var body = ch.querySelector('.chapter-body');
        if (body) {
          body.style.maxHeight = body.scrollHeight + 'px';
        }
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ── AUDIO PLAYER ──
  var audioData = (typeof SITE_DATA !== 'undefined' && SITE_DATA.interview) ? SITE_DATA.interview.audio : null;
  var playerEl = document.getElementById('audioPlayer');
  var audioEl = document.getElementById('audioEl');

  if (playerEl && audioEl && audioData && audioData.tracks && audioData.tracks.length) {
    var tracks = audioData.tracks;
    var currentTrack = 0;
    var isPlaying = false;

    var btnPlay = playerEl.querySelector('.btn-play');
    var btnPrev = playerEl.querySelector('.btn-prev');
    var btnNext = playerEl.querySelector('.btn-next');
    var btnPlaylist = playerEl.querySelector('.btn-playlist');
    var progressBar = playerEl.querySelector('.progress-bar');
    var timeCurrent = playerEl.querySelector('.time-current');
    var timeTotal = playerEl.querySelector('.time-total');
    var nowPlayingTrack = playerEl.querySelector('.now-playing-track');
    var playlistContainer = playerEl.querySelector('.player-playlist');

    // Format time helper
    function fmtTime(sec) {
      if (isNaN(sec) || !isFinite(sec)) return '0:00';
      var m = Math.floor(sec / 60);
      var s = Math.floor(sec % 60);
      return m + ':' + (s < 10 ? '0' : '') + s;
    }

    // Render playlist
    function renderPlaylist() {
      var html = '';
      tracks.forEach(function(t, i) {
        var cls = 'playlist-item' + (i === currentTrack ? ' active' : '');
        html += '<div class="' + cls + '" data-index="' + i + '">'
          + '<span class="playlist-item-num">' + (i + 1) + '</span>'
          + '<div class="playlist-item-info">'
          + '<span class="playlist-item-name">\u300A' + t.name + '\u300B</span>'
          + '<span class="playlist-item-artist">' + t.artist + '</span>'
          + '</div>'
          + '<span class="playlist-item-status">\u5F85\u4E0A\u4F20</span>'
          + '</div>';
      });
      playlistContainer.innerHTML = html;

      // Bind playlist item clicks
      playlistContainer.querySelectorAll('.playlist-item').forEach(function(item) {
        item.addEventListener('click', function() {
          var idx = parseInt(item.getAttribute('data-index'), 10);
          loadTrack(idx);
          togglePlay();
        });
      });
    }

    // Load track
    function loadTrack(idx) {
      if (idx < 0) idx = tracks.length - 1;
      if (idx >= tracks.length) idx = 0;
      currentTrack = idx;
      var t = tracks[currentTrack];
      audioEl.src = t.src;
      audioEl.load();
      nowPlayingTrack.textContent = '\u300A' + t.name + '\u300B \u2014 ' + t.artist;
      progressBar.value = 0;
      timeCurrent.textContent = '0:00';
      timeTotal.textContent = '0:00';
      renderPlaylist();
    }

    // Toggle play/pause
    function togglePlay() {
      if (!audioEl.src || audioEl.src === window.location.href) {
        loadTrack(0);
      }
      if (audioEl.paused) {
        audioEl.play().then(function() {
          isPlaying = true;
          btnPlay.innerHTML = '&#x23F8;';
          btnPlay.setAttribute('aria-label', '\u6682\u505C');
        }).catch(function() {
          // Audio file not available yet
          nowPlayingTrack.textContent = '\u97F3\u9891\u6587\u4EF6\u5F85\u4E0A\u4F20';
        });
      } else {
        audioEl.pause();
        isPlaying = false;
        btnPlay.innerHTML = '&#x25B6;';
        btnPlay.setAttribute('aria-label', '\u64AD\u653E');
      }
    }

    // Event: timeupdate
    audioEl.addEventListener('timeupdate', function() {
      if (audioEl.duration) {
        progressBar.value = (audioEl.currentTime / audioEl.duration) * 100;
        timeCurrent.textContent = fmtTime(audioEl.currentTime);
      }
    });

    // Event: loadedmetadata
    audioEl.addEventListener('loadedmetadata', function() {
      timeTotal.textContent = fmtTime(audioEl.duration);
    });

    // Event: ended (auto next)
    audioEl.addEventListener('ended', function() {
      loadTrack(currentTrack + 1);
      audioEl.play().catch(function() {});
    });

    // Event: error
    audioEl.addEventListener('error', function() {
      nowPlayingTrack.textContent = '\u97F3\u9891\u6587\u4EF6\u5F85\u4E0A\u4F20';
      isPlaying = false;
      btnPlay.innerHTML = '&#x25B6;';
    });

    // Progress bar seek
    progressBar.addEventListener('input', function() {
      if (audioEl.duration) {
        audioEl.currentTime = (progressBar.value / 100) * audioEl.duration;
      }
    });

    // Button bindings
    btnPlay.addEventListener('click', togglePlay);
    btnPrev.addEventListener('click', function() {
      loadTrack(currentTrack - 1);
      audioEl.play().catch(function() {});
    });
    btnNext.addEventListener('click', function() {
      loadTrack(currentTrack + 1);
      audioEl.play().catch(function() {});
    });

    // Playlist toggle
    btnPlaylist.addEventListener('click', function() {
      playlistContainer.classList.toggle('open');
    });

    // Initialize
    renderPlaylist();
    loadTrack(0);
  }

})();
