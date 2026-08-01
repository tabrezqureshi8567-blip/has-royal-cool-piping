document.addEventListener('DOMContentLoaded', function () {

  // Footer year
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  // Scroll reveal
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  // Close mobile nav after a link is tapped
  var navLinks = document.querySelectorAll('#navbarExample .nav-link');
  var collapseEl = document.getElementById('navbarExample');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (collapseEl && collapseEl.classList.contains('show') && window.mdb && window.mdb.Collapse) {
        var instance = window.mdb.Collapse.getInstance(collapseEl) || new window.mdb.Collapse(collapseEl);
        instance.hide();
      }
    });
  });

  // Inquiry Form - Web3Forms Mail Submission & Thank-You Redirect (WhatsApp Removed)
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