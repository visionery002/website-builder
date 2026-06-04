// ─── PostHog Analytics ────────────────────────────────────────
const posthogToken = import.meta.env.VITE_POSTHOG_API_KEY;
const posthogHost = import.meta.env.VITE_POSTHOG_HOST;

if (posthogToken && posthogToken !== 'phc_YOUR_PROJECT_TOKEN_HERE') {
  // Initialize PostHog with token from .env
  !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0===u.POSTHOG_DEBUG&&(u.POSTHOG_DEBUG=!1),o=0;o<e._i.length;o++)g(e._i[o]);e.SV=1.1,e.identify=function(t){e.append({"distinct_id":t})},e.capture=function(t,o){e.append({"event":t,"properties":o})},e.capturePageView=function(){e.capture("$pageview")},e.onready=function(t){e._onReady=t}},e.pageView=function(){e.capturePageView()});}(document,window.posthog||[]);

  posthog.init(posthogToken, {
    api_host: posthogHost || 'https://us.i.posthog.com',
    person_profiles: 'identified_only',
    capture_pageview: true,
    autocapture: true,
  });
}

// ─── Sticky Nav ───────────────────────────────────────────────
const nav = document.querySelector('.nav')
if (nav) {
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20)
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
}

// ─── Mobile Nav ───────────────────────────────────────────────
const hamburger = document.querySelector('.nav__hamburger')
const mobileNav  = document.querySelector('.nav__mobile')
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open')
    document.body.style.overflow = open ? 'hidden' : ''
    hamburger.setAttribute('aria-expanded', String(open))
  })
  mobileNav.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      mobileNav.classList.remove('open')
      document.body.style.overflow = ''
    })
  )
}

// ─── Scroll Reveal ────────────────────────────────────────────
// Module scripts are deferred — page has already painted by the time
// this runs. Hero content must stay visible. We ONLY hide elements
// that are below the fold so the user never sees blank content.

const vh   = window.innerHeight
const els  = [...document.querySelectorAll('.fade-up')]
const show = (el) => el.classList.add('visible')

// Split: in-viewport (leave visible) vs below-fold (hide + reveal on scroll)
const belowFold = els.filter(el => el.getBoundingClientRect().top > vh - 80)

// Mark below-fold elements — CSS will hide them
belowFold.forEach(el => el.classList.add('will-reveal'))

// Observe below-fold elements
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      show(entry.target)
      observer.unobserve(entry.target)
    }
  })
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' })

belowFold.forEach(el => observer.observe(el))

// Safety net — reveal anything still hidden after 3s
setTimeout(() => {
  document.querySelectorAll('.will-reveal:not(.visible)').forEach(show)
}, 3000)

// ─── FAQ Accordion ────────────────────────────────────────────
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item   = btn.closest('.faq-item')
    const isOpen = item.classList.contains('open')
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'))
    if (!isOpen) item.classList.add('open')
  })
})

// ─── Active nav link ──────────────────────────────────────────
const page = window.location.pathname.split('/').pop() || 'index.html'
document.querySelectorAll('.nav__links a').forEach(a => {
  const href = (a.getAttribute('href') || '').split('#')[0]
  if (href === page || (page === '' && href === 'index.html')) {
    a.classList.add('active')
  }
})
