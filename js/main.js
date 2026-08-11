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

  // ── CULTURE MEDIA CAROUSELS ──
  var carousels = document.querySelectorAll('[data-carousel]');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  carousels.forEach(function(carousel) {
    var track = carousel.querySelector('.carousel-track');
    var slides = Array.prototype.slice.call(carousel.querySelectorAll('.carousel-slide'));
    var prevBtn = carousel.querySelector('.carousel-prev');
    var nextBtn = carousel.querySelector('.carousel-next');
    var dotsWrap = carousel.querySelector('.carousel-dots');
    var status = carousel.querySelector('.carousel-status');
    var autoplayDelay = parseInt(carousel.getAttribute('data-autoplay'), 10) || 0;
    var current = 0;
    var timer = null;
    var userPaused = reduceMotion || autoplayDelay === 0;
    var interactionPaused = false;
    var touchStartX = 0;
    var isInView = !('IntersectionObserver' in window);

    if (!track || slides.length === 0) return;
    carousel.setAttribute('tabindex', '0');

    function hydrateSlide(index) {
      var slide = slides[(index + slides.length) % slides.length];
      if (!slide) return;
      var image = slide.querySelector('img[data-src]');
      if (!image) return;
      image.classList.add('is-loading');
      image.addEventListener('load', function() {
        image.classList.remove('is-loading');
        image.classList.add('is-loaded');
      }, { once: true });
      image.src = image.getAttribute('data-src');
      image.removeAttribute('data-src');
      if (image.complete) image.classList.add('is-loaded');
    }

    slides.forEach(function(slide) {
      var video = slide.querySelector('video');
      var source = video ? video.querySelector('source[data-src]') : null;
      var loadBtn = slide.querySelector('.video-load-btn');
      if (!video || !source || !loadBtn) return;

      function showVideoState(label, state) {
        loadBtn.hidden = false;
        loadBtn.classList.toggle('is-loading', state === 'loading');
        loadBtn.classList.toggle('is-error', state === 'error');
        loadBtn.innerHTML = '<span aria-hidden="true">' + (state === 'loading' ? '…' : '▶') + '</span> ' + label;
      }

      function loadAndPlayVideo() {
        interactionPaused = true;
        schedule();
        if (source.hasAttribute('data-src')) {
          source.src = source.getAttribute('data-src');
          source.removeAttribute('data-src');
          video.load();
        } else if (video.error) {
          video.load();
        }
        showVideoState('正在加载视频', 'loading');
        var playRequest = video.play();
        if (playRequest && typeof playRequest.catch === 'function') {
          playRequest.catch(function() {
            showVideoState('点击继续播放', 'ready');
          });
        }
      }

      loadBtn.addEventListener('click', loadAndPlayVideo);
      video.addEventListener('playing', function() { loadBtn.hidden = true; });
      video.addEventListener('waiting', function() {
        if (!video.paused) showVideoState('网络较慢，正在缓冲', 'loading');
      });
      video.addEventListener('error', function() {
        showVideoState('加载失败，点击重试', 'error');
      });
    });

    var dots = slides.map(function(_, index) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'carousel-dot';
      dot.setAttribute('aria-label', '查看第' + (index + 1) + '项，共' + slides.length + '项');
      dot.addEventListener('click', function() {
        goTo(index, true);
      });
      dotsWrap.appendChild(dot);
      return dot;
    });

    var toggleBtn = null;
    if (autoplayDelay > 0) {
      toggleBtn = document.createElement('button');
      toggleBtn.type = 'button';
      toggleBtn.className = 'carousel-toggle';
      toggleBtn.innerHTML = userPaused ? '&#9654;' : '&#10074;&#10074;';
      toggleBtn.setAttribute('aria-label', userPaused ? '开始自动轮播' : '暂停自动轮播');
      toggleBtn.addEventListener('click', function() {
        userPaused = !userPaused;
        toggleBtn.innerHTML = userPaused ? '&#9654;' : '&#10074;&#10074;';
        toggleBtn.setAttribute('aria-label', userPaused ? '开始自动轮播' : '暂停自动轮播');
        schedule();
      });
      dotsWrap.appendChild(toggleBtn);
    }

    function pauseHiddenMedia(activeIndex) {
      slides.forEach(function(slide, index) {
        var media = slide.querySelector('video, audio');
        if (media && index !== activeIndex) media.pause();
      });
    }

    function goTo(index, announce) {
      current = (index + slides.length) % slides.length;
      if (isInView) {
        hydrateSlide(current);
        hydrateSlide(current + 1);
      }
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      slides.forEach(function(slide, slideIndex) {
        var active = slideIndex === current;
        slide.setAttribute('aria-hidden', active ? 'false' : 'true');
        var media = slide.querySelector('video');
        if (media) media.tabIndex = active ? 0 : -1;
      });
      dots.forEach(function(dot, dotIndex) {
        var active = dotIndex === current;
        dot.classList.toggle('active', active);
        dot.setAttribute('aria-current', active ? 'true' : 'false');
      });
      pauseHiddenMedia(current);
      if (status && announce) status.textContent = '已切换到第' + (current + 1) + '项，共' + slides.length + '项';
      schedule();
    }

    function schedule() {
      if (timer) window.clearTimeout(timer);
      timer = null;
      if (isInView && !userPaused && !interactionPaused && autoplayDelay > 0 && slides.length > 1 && !document.hidden) {
        timer = window.setTimeout(function() { goTo(current + 1, false); }, autoplayDelay);
      }
    }

    prevBtn.addEventListener('click', function() { goTo(current - 1, true); });
    nextBtn.addEventListener('click', function() { goTo(current + 1, true); });
    carousel.addEventListener('keydown', function(event) {
      if (event.key === 'ArrowLeft') { event.preventDefault(); goTo(current - 1, true); }
      if (event.key === 'ArrowRight') { event.preventDefault(); goTo(current + 1, true); }
    });
    carousel.addEventListener('mouseenter', function() { interactionPaused = true; schedule(); });
    carousel.addEventListener('mouseleave', function() { interactionPaused = false; schedule(); });
    carousel.addEventListener('focusin', function() { interactionPaused = true; schedule(); });
    carousel.addEventListener('focusout', function(event) {
      if (!carousel.contains(event.relatedTarget)) { interactionPaused = false; schedule(); }
    });
    carousel.addEventListener('touchstart', function(event) {
      touchStartX = event.changedTouches[0].clientX;
      interactionPaused = true;
      schedule();
    }, { passive: true });
    carousel.addEventListener('touchend', function(event) {
      var distance = event.changedTouches[0].clientX - touchStartX;
      if (Math.abs(distance) > 45) goTo(distance > 0 ? current - 1 : current + 1, true);
      interactionPaused = false;
      schedule();
    }, { passive: true });
    document.addEventListener('visibilitychange', schedule);

    if (slides.length < 2) {
      prevBtn.hidden = true;
      nextBtn.hidden = true;
      dotsWrap.hidden = true;
    }
    goTo(0, false);

    if ('IntersectionObserver' in window) {
      var carouselObserver = new IntersectionObserver(function(entries) {
        isInView = entries[0].isIntersecting;
        if (isInView) {
          hydrateSlide(current);
          hydrateSlide(current + 1);
        }
        schedule();
      }, { rootMargin: '260px 0px', threshold: 0.01 });
      carouselObserver.observe(carousel);
    } else {
      hydrateSlide(0);
      hydrateSlide(1);
      schedule();
    }
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

    function trackLabel() {
      var t = tracks[currentTrack];
      return '\u300A' + t.name + '\u300B \u2014 ' + t.artist;
    }

    function setPlayerState(state, message) {
      playerEl.classList.toggle('is-buffering', state === 'buffering');
      playerEl.classList.toggle('is-error', state === 'error');
      isPlaying = state === 'playing';
      if (state === 'playing') {
        btnPlay.innerHTML = '&#x23F8;';
        btnPlay.setAttribute('aria-label', '\u6682\u505C');
      } else if (state === 'buffering') {
        btnPlay.innerHTML = '&hellip;';
        btnPlay.setAttribute('aria-label', '\u6B63\u5728\u52A0\u8F7D\u97F3\u9891');
      } else {
        btnPlay.innerHTML = '&#x25B6;';
        btnPlay.setAttribute('aria-label', '\u64AD\u653E');
      }
      nowPlayingTrack.textContent = message || trackLabel();
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
          + '<span class="playlist-item-status">' + (t.duration || '\u53EF\u64AD\u653E') + '</span>'
          + '</div>';
      });
      playlistContainer.innerHTML = html;

      // Bind playlist item clicks
      playlistContainer.querySelectorAll('.playlist-item').forEach(function(item) {
        item.addEventListener('click', function() {
          var idx = parseInt(item.getAttribute('data-index'), 10);
          selectTrack(idx);
          requestPlay();
        });
      });
    }

    // Select without requesting media. Loading starts only after user action.
    function selectTrack(idx) {
      if (idx < 0) idx = tracks.length - 1;
      if (idx >= tracks.length) idx = 0;
      var previousSrc = audioEl.getAttribute('src');
      currentTrack = idx;
      var t = tracks[currentTrack];
      audioEl.pause();
      if (previousSrc && previousSrc !== t.src) {
        audioEl.removeAttribute('src');
        audioEl.load();
      }
      progressBar.value = 0;
      timeCurrent.textContent = '0:00';
      timeTotal.textContent = t.duration || '0:00';
      setPlayerState('ready', trackLabel());
      renderPlaylist();
    }

    function ensureTrackSource(forceReload) {
      var t = tracks[currentTrack];
      if (forceReload || audioEl.getAttribute('src') !== t.src) {
        audioEl.pause();
        audioEl.src = t.src;
        audioEl.load();
      }
    }

    function requestPlay() {
      ensureTrackSource(Boolean(audioEl.error));
      setPlayerState('buffering', '\u6B63\u5728\u8FDE\u63A5\u97F3\u9891\uFF1A' + trackLabel());
      var playRequest = audioEl.play();
      if (playRequest && typeof playRequest.catch === 'function') {
        playRequest.catch(function(error) {
          if (error && error.name === 'AbortError') return;
          var hint = error && error.name === 'NotAllowedError'
            ? '\u8BF7\u518D\u6B21\u70B9\u51FB\u64AD\u653E'
            : '\u52A0\u8F7D\u5931\u8D25\uFF0C\u70B9\u51FB\u64AD\u653E\u952E\u91CD\u8BD5';
          setPlayerState('error', hint);
        });
      }
    }

    // Toggle play/pause
    function togglePlay() {
      if (audioEl.paused) {
        requestPlay();
      } else {
        audioEl.pause();
        setPlayerState('paused', trackLabel());
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

    audioEl.addEventListener('playing', function() {
      setPlayerState('playing', trackLabel());
    });

    audioEl.addEventListener('waiting', function() {
      if (!audioEl.paused) {
        setPlayerState('buffering', '\u7F51\u7EDC\u8F83\u6162\uFF0C\u6B63\u5728\u7F13\u51B2\uFF1A' + trackLabel());
      }
    });

    audioEl.addEventListener('stalled', function() {
      if (!audioEl.paused) {
        setPlayerState('buffering', '\u7F51\u7EDC\u4E2D\u65AD\uFF0C\u6B63\u5728\u5C1D\u8BD5\u7EE7\u7EED\u52A0\u8F7D');
      }
    });

    // Event: ended (auto next)
    audioEl.addEventListener('ended', function() {
      selectTrack(currentTrack + 1);
      requestPlay();
    });

    // Event: error
    audioEl.addEventListener('error', function() {
      setPlayerState('error', '\u52A0\u8F7D\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u540E\u91CD\u8BD5');
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
      selectTrack(currentTrack - 1);
      requestPlay();
    });
    btnNext.addEventListener('click', function() {
      selectTrack(currentTrack + 1);
      requestPlay();
    });

    // Playlist toggle
    btnPlaylist.addEventListener('click', function() {
      playlistContainer.classList.toggle('open');
    });

    // Initialize
    renderPlaylist();
    selectTrack(0);
  }

})();
