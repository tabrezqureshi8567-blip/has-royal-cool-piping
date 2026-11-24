document.addEventListener('DOMContentLoaded', function () {


  // Footer "Back to top" button: smooth scroll to the very top
  document.querySelectorAll('a[href="#top"], .to-top').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Footer year
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  // Mobile menu (full-height panel, locks page scroll while open)
  var hdr = document.querySelector('.hdr');
  var mb = document.querySelector('.menu-btn');
  var navEl = document.querySelector('.nav');
  function sizeMenu() {
    if (!navEl || !hdr) return;
    var h = window.innerHeight - hdr.getBoundingClientRect().bottom;
    navEl.style.height = Math.ceil(Math.max(260, h)) + 2 + 'px';
  }
  function setMenu(open) {
    if (!hdr || !mb) return;
    hdr.classList.toggle('open', open);
    document.documentElement.classList.toggle('menu-open', open);
    mb.setAttribute('aria-expanded', open ? 'true' : 'false');
    mb.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (open) { sizeMenu(); } else if (navEl) { navEl.style.height = ''; }
  }
  if (mb && hdr) {
    mb.addEventListener('click', function () { setMenu(!hdr.classList.contains('open')); });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 991) setMenu(false);
      else if (hdr.classList.contains('open')) sizeMenu();
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  }

  // Services dropdown (tap on mobile, hover on laptop)
  document.querySelectorAll('.has-dd > button').forEach(function (b) {
    b.addEventListener('click', function (e) {
      var li = b.parentNode;
      var o = li.classList.toggle('open');
      b.setAttribute('aria-expanded', o ? 'true' : 'false');
      e.stopPropagation();
    });
  });
  document.addEventListener('click', function (e) {
    document.querySelectorAll('.has-dd.open').forEach(function (li) {
      if (!li.contains(e.target)) li.classList.remove('open');
    });
  });
  document.querySelectorAll('.nav a').forEach(function (a) {
    a.addEventListener('click', function () { setMenu(false); });
  });

  // Book Now buttons on service cards: pre-select that service in the form
  document.querySelectorAll('a[data-service]').forEach(function (a) {
    a.addEventListener('click', function () {
      var sel = document.getElementById('f_project');
      if (!sel) return;
      for (var i = 0; i < sel.options.length; i++) {
        if (sel.options[i].value === a.getAttribute('data-service')) { sel.selectedIndex = i; break; }
      }
    });
  });

  // Booking Form - Web3Forms Mail Submission & Thank-You Redirect (ORIGINAL LOGIC - DO NOT CHANGE)
  var form = document.getElementById('inquiry-form');
  var submitBtn = document.getElementById('submit-btn');

  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      var formData = new FormData(form);
      var originalText = submitBtn.innerHTML;

      // Button Status
      submitBtn.innerHTML = "Sending Booking...";
      submitBtn.disabled = true;

      try {
        var response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        });

        var data = await response.json();

        if (data.success) {
          form.reset();
          // Direct Thank You Page Redirect
          window.location.href = "thank-you.html";
        } else {
          alert("Error: " + data.message);
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }
      } catch (error) {
        alert("Something went wrong. Please try again.");
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });
  }

});
