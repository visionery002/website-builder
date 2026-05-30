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
