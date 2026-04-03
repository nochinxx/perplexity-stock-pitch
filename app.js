/* ============================================================= */
/* ELV Investment Thesis App — JavaScript                        */
/* All financial data sourced from verified JSON files            */
/* ============================================================= */

(function () {
  'use strict';

  /* ----------------------------------------------------------- */
  /* COUNTDOWN TIMER                                              */
  /* ----------------------------------------------------------- */
  function updateCountdown() {
    const target = new Date('2026-04-06T00:00:00-07:00');
    const now = new Date();
    const diff = target - now;
    const days = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    const el = document.getElementById('countdown-days');
    if (el) el.textContent = days;
  }
  updateCountdown();
  setInterval(updateCountdown, 60000);

  /* ----------------------------------------------------------- */
  /* MOBILE NAV                                                   */
  /* ----------------------------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });
    mobileNav.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
      });
    });
  }

  /* ----------------------------------------------------------- */
  /* ACTIVE NAV LINK (Intersection Observer)                      */
  /* ----------------------------------------------------------- */
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav-link');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });

  sections.forEach(s => navObserver.observe(s));

  /* ----------------------------------------------------------- */
  /* SCROLL REVEAL                                                */
  /* ----------------------------------------------------------- */
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => revealObserver.observe(el));

  /* ----------------------------------------------------------- */
  /* CHART.JS DEFAULTS                                            */
  /* ----------------------------------------------------------- */
  Chart.defaults.color = '#8896AB';
  Chart.defaults.borderColor = '#2a3a52';
  Chart.defaults.font.family = "'Inter', sans-serif";
  Chart.defaults.font.size = 12;
  Chart.defaults.plugins.legend.labels.usePointStyle = true;
  Chart.defaults.plugins.legend.labels.padding = 16;
  Chart.defaults.responsive = true;
  Chart.defaults.maintainAspectRatio = true;

  /* ----------------------------------------------------------- */
  /* SECTION 3: ELV REVENUE PIE CHART                             */
  /* ----------------------------------------------------------- */
  const elvCtx = document.getElementById('elvRevenueChart');
  if (elvCtx) {
    new Chart(elvCtx.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: ['Commercial (~33%)', 'Medicaid (~28%)', 'MA (~17%)', 'Carelon (36%)*'],
        datasets: [{
          data: [33, 28, 17, 36],
          backgroundColor: [
            '#60A5FA',
            '#A78BFA',
            '#F87171',
            '#D4A843'
          ],
          borderColor: '#111827',
          borderWidth: 3,
          hoverBorderWidth: 0,
          hoverOffset: 8
        }]
      },
      options: {
        cutout: '55%',
        plugins: {
          legend: { position: 'bottom', labels: { font: { size: 11 }, padding: 12 } },
          title: { display: true, text: 'ELV Revenue Mix', font: { size: 14, weight: 700 }, color: '#E8EDF5', padding: { bottom: 12 } },
          tooltip: {
            backgroundColor: '#1a2332',
            borderColor: '#2a3a52',
            borderWidth: 1,
            titleColor: '#E8EDF5',
            bodyColor: '#8896AB',
            padding: 12,
            cornerRadius: 8
          }
        }
      }
    });
  }

  /* ----------------------------------------------------------- */
  /* SECTION 3: HUM REVENUE PIE CHART                             */
  /* ----------------------------------------------------------- */
  const humCtx = document.getElementById('humRevenueChart');
  if (humCtx) {
    new Chart(humCtx.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: ['Medicare Advantage (~82%)', 'CenterWell (~4%)', 'Other (~14%)'],
        datasets: [{
          data: [82, 4, 14],
          backgroundColor: [
            '#F87171',
            '#FBBF24',
            '#4E5D73'
          ],
          borderColor: '#111827',
          borderWidth: 3,
          hoverBorderWidth: 0,
          hoverOffset: 8
        }]
      },
      options: {
        cutout: '55%',
        plugins: {
          legend: { position: 'bottom', labels: { font: { size: 11 }, padding: 12 } },
          title: { display: true, text: 'HUM Revenue Mix', font: { size: 14, weight: 700 }, color: '#E8EDF5', padding: { bottom: 12 } },
          tooltip: {
            backgroundColor: '#1a2332',
            borderColor: '#2a3a52',
            borderWidth: 1,
            titleColor: '#E8EDF5',
            bodyColor: '#8896AB',
            padding: 12,
            cornerRadius: 8
          }
        }
      }
    });
  }

  /* ----------------------------------------------------------- */
  /* SECTION 4: CARELON REVENUE GROWTH BAR CHART                  */
  /* ----------------------------------------------------------- */
  const carelonCtx = document.getElementById('carelonChart');
  if (carelonCtx) {
    new Chart(carelonCtx.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['FY2023', 'FY2024', 'FY2025'],
        datasets: [{
          label: 'CarelonRx',
          data: [null, 35.9, 43.4],
          backgroundColor: '#D4A843',
          borderRadius: 4,
          barPercentage: 0.6,
          categoryPercentage: 0.7
        }, {
          label: 'Carelon Services',
          data: [null, 18.0, 28.3],
          backgroundColor: '#60A5FA',
          borderRadius: 4,
          barPercentage: 0.6,
          categoryPercentage: 0.7
        }, {
          label: 'Total Carelon',
          data: [48.0, 53.9, 71.7],
          backgroundColor: 'rgba(212, 168, 67, 0.2)',
          borderColor: '#D4A843',
          borderWidth: 2,
          borderRadius: 4,
          barPercentage: 0.6,
          categoryPercentage: 0.7,
          type: 'bar'
        }]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 80,
            grid: { color: 'rgba(42,58,82,0.4)' },
            ticks: {
              callback: v => '$' + v + 'B',
              font: { family: "'JetBrains Mono', monospace", size: 11 }
            }
          },
          x: {
            grid: { display: false },
            ticks: { font: { weight: 600 } }
          }
        },
        plugins: {
          legend: { position: 'bottom', labels: { font: { size: 11 }, padding: 14 } },
          tooltip: {
            backgroundColor: '#1a2332',
            borderColor: '#2a3a52',
            borderWidth: 1,
            titleColor: '#E8EDF5',
            bodyColor: '#8896AB',
            padding: 12,
            cornerRadius: 8,
            callbacks: {
              label: function(ctx) {
                if (ctx.raw === null) return null;
                return ctx.dataset.label + ': $' + ctx.raw + 'B';
              }
            }
          }
        }
      }
    });
  }

  /* ----------------------------------------------------------- */
  /* SECTION 7: SENSITIVITY TABLE                                 */
  /* ----------------------------------------------------------- */
  const sensitivityData = {
    currentPrice: 292.75,
    eps: [24, 26, 28, 31, 34],
    pe: [8, 10, 12, 14, 16],
    matrix: [
      [192, 240, 288, 336, 384],
      [208, 260, 312, 364, 416],
      [224, 280, 336, 392, 448],
      [248, 310, 372, 434, 496],
      [272, 340, 408, 476, 544]
    ]
  };

  const tbody = document.querySelector('#sensitivityTable tbody');
  if (tbody) {
    sensitivityData.eps.forEach((eps, i) => {
      const tr = document.createElement('tr');
      const tdEps = document.createElement('td');
      tdEps.textContent = '$' + eps;
      tr.appendChild(tdEps);

      sensitivityData.pe.forEach((pe, j) => {
        const price = sensitivityData.matrix[i][j];
        const upside = ((price - sensitivityData.currentPrice) / sensitivityData.currentPrice * 100).toFixed(1);
        const td = document.createElement('td');
        td.innerHTML = '$' + price + '<br><span style="font-size:10px;opacity:0.7">' + (upside > 0 ? '+' : '') + upside + '%</span>';

        if (upside > 20) td.className = 'cell-green';
        else if (upside >= 0) td.className = 'cell-yellow';
        else td.className = 'cell-red';

        tr.appendChild(td);
      });

      tbody.appendChild(tr);
    });
  }

  /* ----------------------------------------------------------- */
  /* NAV BACKGROUND ON SCROLL                                     */
  /* ----------------------------------------------------------- */
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const nav = document.getElementById('main-nav');
        if (nav) {
          if (window.scrollY > 60) {
            nav.style.background = 'rgba(11, 17, 32, 0.95)';
          } else {
            nav.style.background = 'rgba(11, 17, 32, 0.85)';
          }
        }
        ticking = false;
      });
      ticking = true;
    }
  });

})();
