HOW TO CHANGE IMAGES
- Open the images folder. Every page has its own folder (images/ac, images/fridge, images/geyser ...).
- Replace image with your own photo using the SAME FILE NAME (example: images/ac/ac-1.jpg). Keep .jpg
- Service card images (Home / Services pages) are in images/cards/ (example: images/cards/ac-service.jpg)
- Chat assistant photo: images/ai-agent.jpg (replace with a real photo, square works best)
- Any photo size works (Google images too). The site auto-crops to fit: best ratio is 4:3 (example 800x600),
  keep each image under about 150 KB so the site loads fast.

DESIGN NOTES (v3)
- Colours and styling are in css/style.css (v3 block at the bottom). Page colours: body.t-* lines.
- Customer review names (Rohit Deshmukh, Sneha Patil, Amit Kulkarni) are sample names: replace them with your real customers' names and feedback in each page (search for "who" in the HTML).
- Call / WhatsApp / Book buttons: bottom bar on mobile and tablet, floating buttons on the right on laptop (class "sticky-cta" at the end of every page).
- Home page: the 3 top images were removed. Other pages keep their image cards.

UPDATE v4 (final)
- Business name + logo: new stylish crown/snowflake mark with glowing "H.A.S ROYAL" and sparkling stars (header + footer). Ready-made files: images/logo.png (wide, transparent), images/logo-square.png (profile picture for Google Business / WhatsApp / Facebook), images/favicon.png, images/apple-touch-icon.png.
- Timings: everywhere on the site now says Open 24 Hours, 7 Days a Week (footer, contact, FAQ, chat assistant, Google schema).
- Privacy Policy page: privacy-policy.html, linked in the footer of every page and under the booking form.
- Thank-you page: thank-you.html (noindex). In its head there is a line  var LEAD_CONVERSION_SEND_TO = "";  -> paste your Google Ads lead conversion label there (example AW-17590964978/AbCdEfGhIj). It was a "YOUR_CONVERSION_LABEL" placeholder before, so no booking conversion was being counted.
- SEO: every page has its own title, description, keywords, Open Graph tags and JSON-LD (business, service, FAQ). Exactly one H1 per page.
- Chat assistant photo: images/ai-agent.jpg (square photo).
- Still placeholders to replace with your real content: service card photos in images/cards/ (they show "replace with your photo") 

UPDATE v5
- Your ORIGINAL logo is back in the header and footer of every page (images/logo.png, logo-square.png, favicon.png, apple-touch-icon.png are all made from your logo file).
- Address removed from the footer on all pages; it now shows only on contact.html (and in the privacy policy contact section).
- Service card pictures (images/cards/) no longer say "replace with your photo": clean coloured banners. Replace with real photos any time using the same file names.
- Titles are colourful and glowing, icons added on service pages, footer redesigned with emoji.

UPDATE v6
- Footer: no boxes, no emoji; clean glowing headings and links. Logo is a glowing card with spinning stars (header + footer, sized for mobile and laptop).
- Every service card (Home, Services, "Other services") now has Call Now + Book Now buttons. Book Now pre-selects that service in the form.
- Booking form (all pages): name, 10-digit phone (validated), full service list (AC repair, gas, jet-wash, install, uninstall, all appliances, commercial), your area (all 33 areas + "not listed"), preferred time, problem details. The service page you are on is pre-selected. Page name is sent with every lead.
- SEO: shortened 4 titles to 60 characters or less. Still to add once you give the domain: canonical tags, sitemap.xml, social share image.

UPDATE v7
- Booking form: only 3 fields (Name, Phone Number, Select Service). Submit logic unchanged.
- Logo: medium size on laptop and mobile (header and footer), glowing card with stars orbiting around it.

UPDATE v8 (final audit)
- Removed the sample "What our customers say" review sections and the 5-star badge/claims (Google Ads misrepresentation risk). Add real reviews later only if they are genuine.
- Thank-you page: only the confirmation, "our team will contact you within 5 minutes" and a Back to Home button. No menu, footer or chat there.
- Chat assistant (Riya) now shows a small greeting bubble every ~30 seconds ("What problem are you facing?"). It never opens the chat by itself.
- Call tracking added to the 3 phone links on the privacy page, so every tel: link on every page fires the Click-to-call conversion.
- robots.txt: thank-you page no longer blocked (it is noindex instead).
- Still needed from you: (1) your Google Ads "Lead / Booking" conversion label in thank-you.html (LEAD_CONVERSION_SEND_TO), (2) your domain to add canonical tags + sitemap.xml.
- Image folder: 81 files, 1.2 MB total (under 100 files). To replace a photo keep the same file name and .jpg.

UPDATE v9
- Chat assistant rebuilt: no personal name, stylish mobile-friendly design, Call / Book / WhatsApp bar always visible.
- Understands English, Hindi and Hinglish: problems for every service, cost, timing, areas/pin codes, trust, discounts, warranty, brands, payment, address, safety (shock / microwave / LPG).
- Every answer ends with Call Now / Book Now / WhatsApp. Book Now in the chat pre-selects the service in the form.
- To edit answers open js/assistant.js in Notepad (text inside the S = {...} service lists and the intent section).
- Footer "Back to top" button fixed (smooth scroll to the top on every page).
