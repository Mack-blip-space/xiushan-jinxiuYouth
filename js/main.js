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

})();
