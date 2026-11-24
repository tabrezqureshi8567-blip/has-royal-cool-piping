/* ==========================================================================
   H.A.S Royal Cool Service - Website Assistant (v9)
   Runs fully inside the visitor's browser: no server, no API, no cost.
   Understands English, Hindi (Devanagari) and Hinglish.
   Every answer ends with Call Now / Book Now / WhatsApp so the visitor can act.
   To change an answer: edit the text in the lists below in Notepad.
   ========================================================================== */
(function () {
  'use strict';
  var PHONE = '+91 88286 34628', TEL = 'tel:8828634628';
  var AREAS = [["Bavdhan", "411021"], ["Sus", "411021"], ["Indrayani Nagar", "411026"], ["Hadapsar", "411028"], ["Sangvi", "411027"], ["Khadki", "411003"], ["Shivaji Nagar", "411005"], ["Yerwada", "411006"], ["Aundh", "411007"], ["Baner", "411008"], ["Dapodi", "411012"], ["Hadapsar", "411013"], ["Ravet", "412101"], ["Kiwale", "412101"], ["Chikhali", "411062"], ["Pimpri Gurav", "411061"], ["Mohammadwadi", "411060"], ["Warje", "411058"], ["Wakad", "411057"], ["Marunji", "411057"], ["Chinchwadgaon", "411033"], ["Punawale", "411033"], ["Kasarwadi", "411034"], ["Akurdi", "411035"], ["Mundhwa", "411036"], ["Bibwewadi", "411037"], ["Kothrud", "411038"], ["Dhayari", "411041"], ["Swargate", "411042"], ["Baner Gaon", "411045"], ["Vadgaon Sheri", "411014"], ["Viman Nagar", "411014"], ["Dhanori", "411015"], ["Pimpri", "411017"]];

  /* ---------------- helpers ---------------- */
  function norm(t) { return ' ' + String(t || '').toLowerCase().replace(/[^\u0900-\u097Fa-z0-9]+/g, ' ').replace(/\s+/g, ' ').trim() + ' '; }
  function has(t, list) {
    for (var i = 0; i < list.length; i++) {
      var k = list[i];
      if (/[^\x00-\x7f]/.test(k)) { if (t.indexOf(k) > -1) return true; }
      else if (k.length <= 3) { if (t.indexOf(' ' + k + ' ') > -1) return true; }
      else if (t.indexOf(' ' + k) > -1) return true;
    }
    return false;
  }
  var HINGLISH = ['kya', 'hai', 'nahi', 'nhi', 'kitna', 'kitne', 'kaise', 'karo', 'karna', 'chahiye', 'mujhe', 'mera', 'meri', 'aap', 'aapka', 'bhai', 'kab', 'kahan', 'paisa', 'thanda', 'garam', 'kharab', 'raha', 'rahi', 'hoga', 'haan', 'bata', 'batao', 'theek', 'thik', 'ghar', 'aaoge', 'aa', 'sakte', 'karwana', 'lagega', 'der', 'abhi'];

  var ctx = { svc: null, hi: false, last: '' };
  function T(en, hi) { return ctx.hi ? hi : en; }

  /* ---------------- buttons ---------------- */
  function callBtn() { return '<a class="hc-a call" href="' + TEL + '" onclick="return gtag_report_conversion(\'' + TEL + '\');">Call Now</a>'; }
  function bookBtn(svc) { return '<a class="hc-a book" href="#book" data-book="' + (svc ? S[svc].opt : '') + '">Book Now</a>'; }
  function waBtn(svc) {
    var m = 'Hi, I need ' + (svc ? S[svc].name : 'a service') + ' in Pune.';
    return '<a class="hc-a wa" href="https://wa.me/918828634628?text=' + encodeURIComponent(m) + '" target="_blank" rel="noopener">WhatsApp</a>';
  }
  function cta(svc) { return '<div class="hc-cta">' + callBtn() + bookBtn(svc) + waBtn(svc) + '</div>'; }
  function push(svc) {
    return '<div class="hc-push">' + T('Book now and our team calls you within about 5 minutes. Open 24 hours, 7 days a week.', 'अभी बुक करें, हमारी टीम लगभग 5 मिनट में आपको कॉल करेगी। हम 24 घंटे, हफ्ते के सातों दिन खुले हैं।') + '</div>';
  }

  /* ---------------- services ---------------- */
  var S = {
    ac: { name: 'AC', opt: 'AC Repair & Service', page: 'ac-service.html', hi: 'एसी',
      kw: ['ac', 'a c', 'air con', 'aircon', 'air conditioner', 'split', 'inverter', 'एसी', 'ए सी', 'एयर कंडीशनर'],
      over: 'We handle <b>AC repair, gas leak repair &amp; charging, jet-wash servicing, installation and uninstallation</b> for split and window ACs.',
      overHi: 'हम <b>एसी रिपेयर, गैस लीक रिपेयर और गैस चार्जिंग, जेट-वॉश सर्विस, इंस्टॉलेशन और अनइंस्टॉलेशन</b> करते हैं (स्प्लिट और विंडो एसी)।',
      p: [
        [['not cool', 'nahi thanda', 'thanda nahi', 'cooling nahi', 'cooling kam', 'weak cool', 'less cool', 'garam hawa', 'hot air', 'warm', 'thanda', 'cooling', 'ठंडा', 'ठण्डा', 'गर्म', 'कूलिंग'], 'AC not cooling is usually one of these: dirty filter or coil, low gas (which means a leak), a weak capacitor, or a choked outdoor unit. Please don\'t keep running it, that can damage the compressor. Our technician checks it at your home, tells you the exact fault and the cost first, and starts only after you say yes.', 'एसी ठंडा न करने की वजह आमतौर पर गंदे फ़िल्टर/कॉइल, गैस कम होना (यानी लीक), कमज़ोर कैपेसिटर या आउटडोर यूनिट का जाम होना होती है। कृपया इसे लगातार न चलाएँ, इससे कंप्रेसर ख़राब हो सकता है। हमारा टेक्नीशियन घर आकर सही फॉल्ट और खर्च पहले बताता है, आपकी हाँ के बाद ही काम शुरू करता है।'],
        [['gas', 'refrigerant', 'charging', 'charge gas', 'गैस'], 'If the gas is low, there is a leak somewhere. We find and repair the leak first, then charge the correct gas. Just topping up gas without fixing the leak does not last long.', 'अगर गैस कम है तो कहीं लीकेज है। हम पहले लीक ढूँढकर ठीक करते हैं, फिर सही गैस भरते हैं। बिना लीक ठीक किए सिर्फ़ गैस भरना ज़्यादा दिन नहीं चलता।'],
        [['water', 'leak', 'drip', 'tapak', 'paani', 'पानी', 'टपक', 'लीक'], 'Water dripping from the indoor unit is mostly a choked drain pipe or a dirty coil/filter. A proper jet-wash service usually fixes it. Switch the AC off until it is checked so your wall and floor stay safe.', 'इनडोर यूनिट से पानी टपकना ज़्यादातर ड्रेन पाइप जाम होने या गंदे कॉइल/फ़िल्टर की वजह से होता है। जेट-वॉश सर्विस से अक्सर ठीक हो जाता है। चेक होने तक एसी बंद रखें ताकि दीवार और फ़र्श ख़राब न हों।'],
        [['noise', 'sound', 'awaz', 'vibrat', 'rattl', 'आवाज', 'शोर'], 'AC noise often comes from a loose part, dust in the fan/blower or a weak outdoor fan motor. It is better to get it checked early, small noise problems become bigger repairs if ignored.', 'एसी की आवाज़ अक्सर ढीले पार्ट, फैन/ब्लोअर में धूल या आउटडोर फैन मोटर की कमज़ोरी से आती है। जल्दी चेक करवाना बेहतर है, वरना छोटी दिक्कत बड़ा ख़र्चा बन सकती है।'],
        [['smell', 'badbu', 'odour', 'odor', 'बदबू', 'smelly'], 'A bad smell from the AC means dust, moisture and mould in the coil and blower. Our jet-wash service cleans the coil, filters and blower and removes the odour.', 'एसी से बदबू का मतलब कॉइल और ब्लोअर में धूल, नमी और फफूंद है। हमारी जेट-वॉश सर्विस कॉइल, फ़िल्टर और ब्लोअर साफ़ करके बदबू हटा देती है।'],
        [['install', 'fitting', 'new ac', 'uninstall', 'shift', 'remove', 'lagana', 'lagwana', 'इंस्टॉल', 'लगवाना', 'लगाना', 'निकलवाना'], 'Yes, we do AC installation and uninstallation for split and window ACs, including shifting. Tell us the AC type and the floor/location when you book so the right team comes.', 'जी हाँ, हम स्प्लिट और विंडो एसी की इंस्टॉलेशन और अनइंस्टॉलेशन (शिफ्टिंग सहित) करते हैं। बुकिंग के समय एसी का टाइप और लोकेशन बता दें।'],
        [['service', 'clean', 'jet', 'wash', 'safai', 'सर्विस', 'सफाई', 'सफ़ाई'], 'Our jet-wash AC service cleans the indoor coil, filters, blower and outdoor unit, and checks the drain pipe. It brings back the cooling, improves airflow and removes dust, mould and smell.', 'हमारी जेट-वॉश सर्विस में इनडोर कॉइल, फ़िल्टर, ब्लोअर और आउटडोर यूनिट की सफ़ाई होती है और ड्रेन पाइप चेक होता है। इससे कूलिंग वापस आती है और धूल, फफूंद व बदबू हटती है।'],
        [['not start', 'not on', 'wont start', 'chalu nahi', 'on nahi', 'remote', 'blink', 'error', 'code', 'power', 'band', 'स्टार्ट', 'चालू', 'बंद', 'रिमोट'], 'If the AC does not switch on or is blinking an error, first check the MCB/plug and the remote batteries. If it still does not start, it may be a PCB, sensor or capacitor issue. Our technician will diagnose it and explain the cost before repairing.', 'अगर एसी चालू नहीं हो रहा या एरर ब्लिंक कर रहा है तो पहले MCB/प्लग और रिमोट की बैटरी देखें। फिर भी न चले तो PCB, सेंसर या कैपेसिटर की दिक्कत हो सकती है। हमारा टेक्नीशियन जाँच करके रिपेयर से पहले खर्च बताएगा।']
      ] },
    fridge: { name: 'Fridge', opt: 'Fridge Repair', page: 'fridge-repair.html', hi: 'फ्रिज',
      kw: ['fridge', 'frige', 'refrigerator', 'refrigerater', 'फ्रिज', 'फ्रीज', 'रेफ्रिजरेटर'],
      over: 'We repair <b>single door, double door, side-by-side and frost-free fridges</b> at your home.',
      overHi: 'हम <b>सिंगल डोर, डबल डोर, साइड-बाय-साइड और फ्रॉस्ट-फ्री फ्रिज</b> घर पर आकर ठीक करते हैं।',
      p: [
        [['not cool', 'cooling', 'nahi thanda', 'thanda nahi', 'warm', 'garam', 'ठंडा', 'कूलिंग', 'गर्म'], 'A fridge that is not cooling usually has a gas, compressor, relay/thermostat or fan problem. Please avoid opening the door often and don\'t stock new food until it is checked. Our technician finds the fault, tells you the cost, and tells you honestly if a repair is not worth it.', 'फ्रिज ठंडा न करे तो आमतौर पर गैस, कंप्रेसर, रिले/थर्मोस्टेट या फैन की दिक्कत होती है। चेक होने तक दरवाज़ा कम खोलें और नया सामान न रखें। हमारा टेक्नीशियन फॉल्ट और खर्च बताता है, और अगर रिपेयर फ़ायदेमंद नहीं तो साफ़ बता देता है।'],
        [['ice', 'frost', 'barf', 'जमना', 'बर्फ'], 'Heavy ice or frost build-up often points to a defrost heater, sensor or door gasket problem in frost-free models. These are usually small, fixable repairs.', 'ज़्यादा बर्फ़ जमना अक्सर फ्रॉस्ट-फ्री मॉडल में डिफ्रॉस्ट हीटर, सेंसर या डोर गैस्केट की दिक्कत होती है। ये आमतौर पर छोटे रिपेयर होते हैं।'],
        [['water', 'leak', 'paani', 'पानी', 'लीक'], 'Water under the fridge is commonly a blocked drain tube or a defrost drain problem. It is a quick fix in most cases, but don\'t ignore it, it can damage the floor.', 'फ्रिज के नीचे पानी आना अक्सर ड्रेन ट्यूब जाम होने से होता है। ज़्यादातर मामलों में जल्दी ठीक हो जाता है, पर नज़रअंदाज़ न करें, फ़र्श ख़राब हो सकता है।'],
        [['noise', 'sound', 'click', 'awaz', 'आवाज', 'शोर'], 'Constant clicking, humming or a very hot compressor are signs to get it checked soon. It is often a relay, fan or compressor issue.', 'लगातार क्लिक या घर्र की आवाज़ या कंप्रेसर बहुत गर्म होना, जल्दी चेक कराने के संकेत हैं। ये अक्सर रिले, फैन या कंप्रेसर की दिक्कत होती है।'],
        [['door', 'gasket', 'light', 'seal', 'दरवाज', 'दरवाज़ा'], 'A loose door gasket or a door that doesn\'t close properly makes the fridge work harder and cool less. Gasket and light faults are quick, small repairs.', 'ढीला डोर गैस्केट या ठीक से बंद न होने वाला दरवाज़ा फ्रिज की कूलिंग कम करता है। गैस्केट और लाइट की दिक्कत जल्दी और छोटे रिपेयर में ठीक हो जाती है।']
      ] },
    freezer: { name: 'Deep Freezer', opt: 'Deep Freezer Repair', page: 'deep-freezer-repair.html', hi: 'डीप फ्रीजर',
      kw: ['deep freezer', 'deepfreezer', 'chest freezer', 'display freezer', 'freezer', 'डीप फ्रीजर', 'डीप फ्रिज', 'फ्रीजर'],
      over: 'We repair <b>deep freezers, chest freezers and display freezers</b> for shops, restaurants and homes.',
      overHi: 'हम दुकानों, रेस्टोरेंट और घरों के <b>डीप फ्रीजर, चेस्ट फ्रीजर और डिस्प्ले फ्रीजर</b> रिपेयर करते हैं।',
      p: [[['not freez', 'not cool', 'cooling', 'nahi', 'ठंडा', 'जम'], 'A freezer that is not freezing is usually a compressor, gas, thermostat or fan problem. For shops, a quick visit matters because stock is at risk, so please call us directly for urgent jobs.', 'फ्रीजर न जमा रहा हो तो आमतौर पर कंप्रेसर, गैस, थर्मोस्टेट या फैन की दिक्कत होती है। दुकान के लिए जल्दी विज़िट ज़रूरी है क्योंकि माल का रिस्क है, इसलिए अर्जेंट काम में सीधे कॉल करें।'],
        [['frost', 'ice', 'बर्फ'], 'Heavy frost build-up usually comes from a faulty door seal or a defrost/thermostat issue. It can be corrected and is worth fixing early.', 'ज़्यादा बर्फ़ जमना अक्सर डोर सील या डिफ्रॉस्ट/थर्मोस्टेट की दिक्कत से होता है। इसे ठीक किया जा सकता है, जल्दी करवाना बेहतर है।']] },
    wm: { name: 'Washing Machine', opt: 'Washing Machine Repair', page: 'washing-machine-repair.html', hi: 'वॉशिंग मशीन',
      kw: ['washing', 'washer', 'wm', 'laundry', 'front load', 'top load', 'semi automatic', 'वॉशिंग', 'वाशिंग', 'वॉशर'],
      over: 'We repair <b>semi-automatic, top load and front load washing machines</b> at your home.',
      overHi: 'हम <b>सेमी-ऑटोमैटिक, टॉप लोड और फ्रंट लोड वॉशिंग मशीन</b> घर पर आकर ठीक करते हैं।',
      p: [
        [['drain', 'not draining', 'water not going', 'paani nahi', 'ड्रेन', 'पानी नहीं निकल'], 'If the machine is not draining, the drain pump, a choked pipe or a blocked filter is the usual cause. Please don\'t force the door open with water inside. We will clear and fix it.', 'मशीन से पानी न निकले तो ड्रेन पंप, पाइप जाम या फ़िल्टर ब्लॉक होना आम वजह है। पानी भरा हो तो दरवाज़ा ज़बरदस्ती न खोलें। हम इसे साफ़ करके ठीक कर देंगे।'],
        [['spin', 'not spinning', 'dryer', 'drum', 'घूम', 'स्पिन'], 'Not spinning is commonly a belt, motor, lid/door switch or control issue. The technician checks it and explains the fault and the cost before repairing.', 'स्पिन न होना आमतौर पर बेल्ट, मोटर, लिड/डोर स्विच या कंट्रोल की दिक्कत होती है। टेक्नीशियन जाँच करके रिपेयर से पहले फॉल्ट और खर्च बताएगा।'],
        [['noise', 'shak', 'vibrat', 'sound', 'awaz', 'आवाज', 'हिल', 'कंप'], 'Loud noise or shaking is often caused by unbalanced load, bearings, shock absorbers or levelling problems. Fixing it early avoids bigger damage.', 'तेज़ आवाज़ या हिलना अक्सर असंतुलित लोड, बेयरिंग, शॉक एब्ज़ॉर्बर या लेवलिंग की वजह से होता है। जल्दी ठीक करवाने से बड़ा नुकसान बचता है।'],
        [['not fill', 'water not coming', 'inlet', 'paani nahi aa', 'भर'], 'Water not filling is usually an inlet valve or filter blockage, or a pressure switch problem. A quick check sorts it out.', 'पानी न भरना आमतौर पर इनलेट वाल्व/फ़िल्टर जाम या प्रेशर स्विच की दिक्कत होती है। जल्दी चेक से ठीक हो जाता है।'],
        [['error', 'code', 'door', 'lock', 'display', 'start', 'on nahi', 'चालू', 'एरर'], 'Error codes and door-lock problems usually come from sensors, the door lock or the control board. Share the brand, model and the code when you book and we will come prepared.', 'एरर कोड और डोर-लॉक की दिक्कत आमतौर पर सेंसर, डोर लॉक या कंट्रोल बोर्ड की वजह से होती है। बुकिंग पर ब्रांड, मॉडल और कोड बता दें, हम तैयारी से आएँगे।']
      ] },
    mw: { name: 'Microwave', opt: 'Microwave Repair', page: 'microwave-repair.html', hi: 'माइक्रोवेव',
      kw: ['microwave', 'micro wave', 'oven', 'magnetron', 'माइक्रोवेव', 'ओवन'],
      over: 'We repair <b>solo, grill and convection microwave ovens</b>.',
      overHi: 'हम <b>सोलो, ग्रिल और कन्वेक्शन माइक्रोवेव ओवन</b> रिपेयर करते हैं।',
      p: [[['not heat', 'heating', 'garam nahi', 'गर्म'], 'A microwave that runs but doesn\'t heat usually has a magnetron, capacitor or diode fault. <b>Please do not open it yourself</b>, it can hold a dangerous electric charge even when unplugged. Our technician will handle it safely.', 'माइक्रोवेव चले पर गर्म न करे तो आमतौर पर मैग्नेट्रॉन, कैपेसिटर या डायोड की दिक्कत होती है। <b>कृपया खुद न खोलें</b>, अनप्लग होने पर भी इसमें ख़तरनाक करंट रह सकता है। हमारा टेक्नीशियन सुरक्षित तरीके से ठीक करेगा।'],
        [['spark', 'sparking', 'fire', 'burn', 'चिंगारी', 'जल'], 'Sparking inside a microwave is a safety issue. Stop using it right away, unplug it and call us. Don\'t open it yourself.', 'माइक्रोवेव में चिंगारी निकलना सुरक्षा का मामला है। तुरंत इस्तेमाल बंद करें, प्लग निकालें और हमें कॉल करें। खुद न खोलें।'],
        [['turntable', 'plate', 'rotat', 'door', 'keypad', 'button', 'घूम', 'दरवाज'], 'Turntable, door latch and keypad faults are common and usually quick repairs. Share the brand and model when you book.', 'टर्नटेबल, डोर लैच और कीपैड की दिक्कतें आम हैं और आमतौर पर जल्दी ठीक हो जाती हैं। बुकिंग पर ब्रांड और मॉडल बता दें।']] },
    geyser: { name: 'Geyser', opt: 'Geyser Repair', page: 'geyser-repair.html', hi: 'गीजर',
      kw: ['geyser', 'geezer', 'water heater', 'गीजर', 'गीज़र', 'गिजर'],
      over: 'We repair <b>electric storage and instant geysers</b> at your home.',
      overHi: 'हम <b>इलेक्ट्रिक स्टोरेज और इंस्टेंट गीजर</b> घर पर आकर ठीक करते हैं।',
      p: [
        [['shock', 'current', 'earth', 'करंट', 'झटका'], '<b>Safety first:</b> if the geyser gives a shock, switch it off at the MCB right now and don\'t touch the water or the body. Then call us, we will check the earthing and element.', '<b>पहले सुरक्षा:</b> अगर गीजर में करंट आ रहा है तो तुरंत MCB से बंद करें और पानी या बॉडी को न छुएँ। फिर हमें कॉल करें, हम अर्थिंग और एलिमेंट चेक करेंगे।'],
        [['not heat', 'heating', 'cold', 'thanda', 'गर्म', 'ठंडा'], 'A geyser that doesn\'t heat usually has a faulty heating element or thermostat. These are common repairs and the technician will explain the cost first.', 'गीजर गर्म न करे तो आमतौर पर हीटिंग एलिमेंट या थर्मोस्टेट ख़राब होता है। ये आम रिपेयर हैं और टेक्नीशियन खर्च पहले बताएगा।'],
        [['leak', 'water', 'drip', 'tapak', 'लीक', 'टपक'], 'Leakage from a geyser can come from the inlet/outlet valve, a worn gasket or a tank issue. Switch it off and call us quickly so the damage doesn\'t spread.', 'गीजर से लीकेज इनलेट/आउटलेट वाल्व, घिसे गैस्केट या टैंक की वजह से हो सकता है। इसे बंद करके जल्दी कॉल करें ताकि नुकसान न फैले।'],
        [['trip', 'mcb', 'noise', 'steam', 'sound', 'आवाज', 'ट्रिप'], 'Tripping or strange noise usually points to scaling on the element or an electrical fault. It should be checked before further use.', 'MCB ट्रिप होना या अजीब आवाज़ आमतौर पर एलिमेंट पर स्केलिंग या इलेक्ट्रिकल फॉल्ट का संकेत है। आगे इस्तेमाल से पहले चेक कराएँ।']] },
    ro: { name: 'RO Water Purifier', opt: 'RO Water Purifier Service', page: 'ro-service.html', hi: 'आरओ',
      kw: ['ro', 'water purifier', 'purifier', 'aquaguard', 'kent', 'pureit', 'livpure', 'आरओ', 'प्यूरीफायर', 'वाटर प्यूरीफायर'],
      over: 'We service and repair <b>RO water purifiers</b>: filter and membrane change, low flow, bad taste, leakage and pump faults.',
      overHi: 'हम <b>आरओ वाटर प्यूरीफायर</b> की सर्विस और रिपेयर करते हैं: फ़िल्टर और मेंब्रेन बदलना, कम फ्लो, बुरा स्वाद, लीकेज और पंप की दिक्कत।',
      p: [
        [['low flow', 'slow', 'flow', 'pressure', 'dheere', 'धीमा', 'कम पानी'], 'Low water flow is usually a choked filter, a weak pump or membrane trouble. We check them in order and fix the real cause.', 'पानी कम आना आमतौर पर फ़िल्टर जाम, कमज़ोर पंप या मेंब्रेन की दिक्कत होती है। हम क्रम से जाँचकर असली वजह ठीक करते हैं।'],
        [['taste', 'smell', 'bad', 'salty', 'tds', 'स्वाद', 'बदबू', 'नमकीन'], 'Bad taste or smell means the filters or membrane are overdue for change. A proper RO service brings the taste back. Your drinking water matters, so it\'s worth doing on time.', 'बुरा स्वाद या बदबू का मतलब फ़िल्टर या मेंब्रेन बदलने का समय हो गया है। सही आरओ सर्विस से स्वाद वापस आ जाता है। पीने के पानी का मामला है, समय पर करवाना अच्छा है।'],
        [['filter change', 'membrane', 'service', 'candle', 'सर्विस', 'फ़िल्टर', 'फिल्टर'], 'How often to change filters depends on your water quality and the brand. Book a service and the technician will check the water and tell you what really needs changing, nothing extra.', 'फ़िल्टर कितने समय में बदलें यह आपके पानी की क्वालिटी और ब्रांड पर निर्भर है। सर्विस बुक करें, टेक्नीशियन पानी चेक करके बताएगा कि वाकई क्या बदलना है।'],
        [['leak', 'drip', 'लीक', 'टपक'], 'Leakage in an RO is mostly a loose fitting, a worn pipe or a faulty valve. Close the inlet and call us, it is normally a quick fix.', 'आरओ में लीकेज ज़्यादातर ढीली फिटिंग, घिसा पाइप या ख़राब वाल्व से होता है। इनलेट बंद करके हमें कॉल करें, यह आमतौर पर जल्दी ठीक हो जाता है।']] },
    tv: { name: 'LED TV', opt: 'LED TV Repair', page: 'led-tv-repair.html', hi: 'एलईडी टीवी',
      kw: ['tv', 'led', 'lcd', 'television', 'smart tv', 'टीवी', 'टी वी', 'एलईडी'],
      over: 'We repair <b>LED, LCD and smart TVs</b>: no display, no sound, backlight problems, lines on screen, power and HDMI faults.',
      overHi: 'हम <b>LED, LCD और स्मार्ट टीवी</b> रिपेयर करते हैं: डिस्प्ले नहीं आना, आवाज़ नहीं, बैकलाइट, स्क्रीन पर लाइनें, पावर और HDMI की दिक्कत।',
      p: [
        [['no display', 'black', 'blank', 'no picture', 'dark', 'backlight', 'काला', 'डिस्प्ले', 'अँधेरा'], 'If the TV has sound but a black or very dark screen, it is usually a backlight or power board problem. Don\'t keep pressing the power button, let our technician check it.', 'टीवी में आवाज़ आए पर स्क्रीन काली या बहुत डार्क हो तो आमतौर पर बैकलाइट या पावर बोर्ड की दिक्कत होती है। बार-बार पावर बटन न दबाएँ, हमारा टेक्नीशियन चेक कर लेगा।'],
        [['line', 'lines', 'crack', 'spot', 'patch', 'लाइन', 'धारी'], 'Lines on the screen can be a panel cable or T-con issue. Our technician will tell you honestly if it is repairable and what it will cost.', 'स्क्रीन पर लाइनें पैनल केबल या T-con की दिक्कत हो सकती हैं। हमारा टेक्नीशियन ईमानदारी से बताएगा कि रिपेयर हो सकता है या नहीं और कितना खर्च आएगा।'],
        [['no sound', 'sound', 'audio', 'speaker', 'आवाज', 'साउंड'], 'No sound is usually a speaker, audio board or setting issue. Quick to diagnose at home.', 'आवाज़ न आना आमतौर पर स्पीकर, ऑडियो बोर्ड या सेटिंग की दिक्कत होती है। घर पर जल्दी पता चल जाता है।'],
        [['hdmi', 'power', 'not on', 'wont start', 'on nahi', 'चालू', 'स्टार्ट'], 'If the TV doesn\'t switch on or the HDMI doesn\'t work, it is typically a power supply or main board fault. We check and explain before repairing.', 'टीवी चालू न हो या HDMI काम न करे तो आमतौर पर पावर सप्लाई या मेन बोर्ड की दिक्कत होती है। हम जाँच करके रिपेयर से पहले समझाते हैं।']] },
    chimney: { name: 'Kitchen Chimney', opt: 'Kitchen Chimney Repair', page: 'chimney-repair.html', hi: 'चिमनी',
      kw: ['chimney', 'chimny', 'hob', 'चिमनी'],
      over: 'We repair and deep clean <b>kitchen chimneys</b>: weak suction, noisy motor, oil dripping and auto-clean faults.',
      overHi: 'हम <b>किचन चिमनी</b> की रिपेयर और डीप क्लीनिंग करते हैं: कमज़ोर सक्शन, शोर करती मोटर, तेल टपकना और ऑटो-क्लीन की दिक्कत।',
      p: [[['suction', 'weak', 'smoke', 'dhuan', 'सक्शन', 'धुआँ', 'धुआ'], 'Weak suction is mostly oil-choked filters, a dirty duct or motor wear. A deep cleaning of filters, blower and ducting usually brings the suction back.', 'कमज़ोर सक्शन ज़्यादातर तेल से जाम फ़िल्टर, गंदे डक्ट या मोटर घिसने से होता है। फ़िल्टर, ब्लोअर और डक्ट की डीप क्लीनिंग से अक्सर सक्शन लौट आता है।'],
        [['noise', 'sound', 'awaz', 'आवाज'], 'A noisy chimney usually has a dirty blower or a worn motor bearing. Better to clean or repair it before the motor burns out.', 'शोर करती चिमनी में आमतौर पर ब्लोअर गंदा या मोटर बेयरिंग घिसा होता है। मोटर जलने से पहले सफ़ाई या रिपेयर करवा लेना बेहतर है।'],
        [['oil', 'drip', 'tapak', 'तेल', 'टपक'], 'Oil dripping means the oil collector or filter is full or the seal is loose. Our deep cleaning handles it.', 'तेल टपकने का मतलब ऑयल कलेक्टर या फ़िल्टर भर गया है या सील ढीली है। हमारी डीप क्लीनिंग से ठीक हो जाता है।']] },
    commercial: { name: 'Commercial AC', opt: 'Commercial / Bulk AC Work', page: 'commercial-ac.html', hi: 'कमर्शियल एसी',
      kw: ['commercial', 'vrf', 'hvac', 'ductable', 'cassette', 'bulk', 'piping', 'nitrogen', 'builder', 'contractor', 'office ac', 'showroom', 'hospital', 'society', 'कमर्शियल', 'पाइपिंग'],
      over: 'For <b>commercial AC work</b> we do HVAC and VRF copper piping, ductable and cassette AC installation, bulk split AC installation and nitrogen pressure testing for builders, contractors, hospitals, societies and offices in Pune. Bulk work is quoted per running foot after a site inspection.',
      overHi: '<b>कमर्शियल एसी</b> के लिए हम HVAC और VRF कॉपर पाइपिंग, डक्टेबल और कैसेट एसी इंस्टॉलेशन, बल्क स्प्लिट एसी इंस्टॉलेशन और नाइट्रोजन प्रेशर टेस्टिंग करते हैं (बिल्डर, कॉन्ट्रैक्टर, अस्पताल, सोसायटी और ऑफिस)। बल्क काम का कोटेशन साइट इंस्पेक्शन के बाद प्रति रनिंग फ़ुट दिया जाता है।',
      p: [] },
    other: { name: 'Appliance', opt: 'Other Appliance Repair', page: 'appliance-repair.html', hi: 'अप्लायंस',
      kw: ['dispenser', 'air cooler', 'cooler', 'induction', 'cooktop', 'अन्य', 'डिस्पेंसर', 'कूलर', 'इंडक्शन'],
      over: 'Yes, we also repair <b>water dispensers, air coolers, induction cooktops and other home appliances</b>.',
      overHi: 'जी हाँ, हम <b>वॉटर डिस्पेंसर, एयर कूलर, इंडक्शन कुकटॉप और अन्य घरेलू अप्लायंस</b> भी रिपेयर करते हैं।',
      p: [] }
  };
  var ORDER = ['commercial', 'freezer', 'mw', 'chimney', 'geyser', 'ro', 'tv', 'wm', 'fridge', 'other', 'ac'];
  function detectSvc(t) {
    for (var i = 0; i < ORDER.length; i++) if (has(t, S[ORDER[i]].kw)) return ORDER[i];
    return null;
  }

  /* ---------------- area check ---------------- */
  function areaHit(t) {
    var low = t.trim(), best = null;
    AREAS.forEach(function (a) { if (has(' ' + low + ' ', [a[0].toLowerCase()]) && (!best || a[0].length > best.length)) best = a[0]; });
    return best;
  }
  function areaAnswer(raw, t) {
    var hit = areaHit(t), pm = (t.match(/\b4[01]\d{4}\b/g) || [])[0];
    if (hit) {
      var pins = AREAS.filter(function (a) { return a[0] === hit; }).map(function (a) { return a[1]; }).join(', ');
      return T('Yes, we serve <b>' + hit + '</b> (' + pins + '). 👍 A technician can visit you there. Shall I help you book now?', 'जी हाँ, हम <b>' + hit + '</b> (' + pins + ') में सेवा देते हैं। 👍 टेक्नीशियन आपके यहाँ आ सकता है। अभी बुक करें?');
    }
    if (pm) {
      var m = AREAS.filter(function (a) { return a[1] === pm; });
      if (m.length) return T('Yes, we serve pin code <b>' + pm + '</b> (' + m.map(function (a) { return a[0]; }).join(', ') + ').', 'जी हाँ, हम पिन कोड <b>' + pm + '</b> (' + m.map(function (a) { return a[0]; }).join(', ') + ') में सेवा देते हैं।');
      return T('I don\'t see ' + pm + ' on my list, but we may still be able to reach you. Please call and our team will confirm quickly.', 'मेरी लिस्ट में ' + pm + ' नहीं दिख रहा, फिर भी हम पहुँच सकते हैं। कृपया कॉल करें, हमारी टीम जल्दी कन्फ़र्म कर देगी।');
    }
    if (has(t, ['area', 'areas', 'pin code', 'pincode', 'cover', 'serve', 'service area', 'इलाके', 'एरिया'])) {
      return T('We serve <b>33 areas of Pune and Pimpri-Chinchwad</b>, including Kothrud, Baner, Aundh, Hadapsar, Viman Nagar, Wakad, Pimpri, Shivaji Nagar and more. Type your area name or pin code and I\'ll check it for you.', 'हम <b>पुणे और पिंपरी-चिंचवड के 33 इलाकों</b> में सेवा देते हैं, जैसे कोथरुड, बाणेर, औंध, हड़पसर, विमान नगर, वाकड, पिंपरी, शिवाजी नगर आदि। अपना एरिया या पिन कोड लिखें, मैं चेक कर दूँगा।');
    }
    return null;
  }

  /* ---------------- general intents ---------------- */
  var CHIPS_MAIN = function () { return ctx.hi ? ['एसी ठंडा नहीं कर रहा', 'खर्च कितना होगा?', 'आज आ सकते हैं?', 'कौन से इलाके?', 'बुक करना है'] : ['AC not cooling', 'How much will it cost?', 'Can you come today?', 'Areas you serve', 'Book a technician']; };
  function follow(svc) {
    return ctx.hi ? ['खर्च कितना होगा?', 'आज आ सकते हैं?', 'बुक करना है'] : ['How much will it cost?', 'Can you come today?', 'Book a technician'];
  }
  function out(html, svc, chips) { return { h: html, c: chips || follow(svc), s: svc }; }
  function withCta(text, svc, chips, noPush) { return out('<p>' + text + '</p>' + (noPush ? '' : push()) + cta(svc), svc, chips); }

  function reply(raw) {
    var t = norm(raw), words = t.trim().split(' ').length;
    var dev = /[\u0900-\u097F]/.test(raw);
    var hing = HINGLISH.filter(function (w) { return t.indexOf(' ' + w + ' ') > -1; }).length;
    if (dev || hing >= 1) ctx.hi = true; else if (/\b(the|what|how|can|you|your|is|are|do|does|my|please|need|want|price|cost|book)\b/i.test(raw)) ctx.hi = false;
    var svc = detectSvc(t); if (svc) ctx.svc = svc; else svc = ctx.svc;
    var own = detectSvc(t);                       // service named in THIS message

    // greetings / small talk
    if (words <= 5 && !own && has(t, ['hi', 'hii', 'hello', 'hey', 'hlo', 'namaste', 'namaskar', 'good morning', 'good evening', 'good afternoon', 'नमस्ते', 'नमस्कार', 'हेलो', 'हैलो', 'हाय']))
      return out('<p>' + T('Hello! 👋 Welcome to <b>H.A.S Royal Cool Service</b>. I can help with repair advice, cost, timing, areas and booking. What is the problem?', 'नमस्ते! 👋 <b>H.A.S Royal Cool Service</b> में आपका स्वागत है। मैं रिपेयर की सलाह, खर्च, समय, इलाके और बुकिंग में मदद कर सकता हूँ। क्या प्रॉब्लम है?') + '</p>', null, CHIPS_MAIN());
    if (words <= 6 && has(t, ['thank', 'thanks', 'thx', 'shukriya', 'dhanyavad', 'धन्यवाद', 'शुक्रिया', 'थैंक']))
      return out('<p>' + T('You\'re most welcome! 😊 Whenever you need a technician, just call or book. We\'re open 24 hours.', 'आपका बहुत स्वागत है! 😊 जब भी टेक्नीशियन चाहिए, कॉल करें या बुक करें। हम 24 घंटे खुले हैं।') + '</p>' + cta(svc), svc, CHIPS_MAIN());
    if (words <= 4 && has(t, ['bye', 'ok bye', 'good night', 'alvida', 'बाय'])) return out('<p>' + T('Take care! 😊 We\'re just a call away, 24 hours a day.', 'ध्यान रखिए! 😊 हम 24 घंटे बस एक कॉल दूर हैं।') + '</p>' + cta(svc), svc, CHIPS_MAIN());
    if (words <= 4 && has(t, ['yes', 'yeah', 'yep', 'sure', 'ok', 'okay', 'haan', 'han', 'ha', 'ji', 'हाँ', 'हां', 'जी', 'ठीक है', 'theek hai']) && ctx.last)
      return withCta(T('Great! 🎉 Just tap <b>Book Now</b> and fill your name, phone and service (takes 20 seconds), or call us directly.', 'बहुत बढ़िया! 🎉 <b>Book Now</b> दबाएँ और नाम, फ़ोन और सर्विस भरें (सिर्फ़ 20 सेकंड), या सीधे कॉल करें।'), svc, ['Areas you serve', 'How much will it cost?']);

    // area
    var ar = areaAnswer(raw, t);
    if (ar && (!own || has(t, ['area', 'serve', 'cover', 'aate', 'available', 'milega', 'pin']) || words <= 3)) return withCta(ar, own, ['How much will it cost?', 'Can you come today?']);

    // callback / contact / booking
    if (has(t, ['call back', 'callback', 'call me', 'phone karo', 'mujhe call', 'call karo', 'कॉल बैक', 'फोन करो', 'कॉल करो']))
      return withCta(T('Sure! Tap <b>Book Now</b>, enter your name, number and service, and our team will call you back within about 5 minutes. In a hurry? Just call us now.', 'ज़रूर! <b>Book Now</b> दबाएँ, नाम, नंबर और सर्विस भरें, हमारी टीम लगभग 5 मिनट में कॉल करेगी। जल्दी है? अभी सीधे कॉल करें।'), svc);
    if (has(t, ['phone', 'number', 'whatsapp', 'contact', 'email', 'reach', 'nambar', 'नंबर', 'फोन', 'कॉन्टैक्ट', 'संपर्क', 'व्हाट्सएप', 'ईमेल']))
      return withCta(T('You can call or WhatsApp us on <b>' + PHONE + '</b>, 24 hours a day, 7 days a week, including Sundays. 📞', 'आप हमें <b>' + PHONE + '</b> पर कॉल या WhatsApp कर सकते हैं, 24 घंटे, हफ्ते के सातों दिन, रविवार को भी। 📞'), svc, CHIPS_MAIN(), true);

    // places we do not list: be honest, invite a call
    var EXTRA = ['hinjewadi', 'hinjawadi', 'kharadi', 'magarpatta', 'katraj', 'kondhwa', 'wanowrie', 'wanwadi', 'camp', 'deccan', 'nigdi', 'bhosari', 'talegaon', 'pashan', 'balewadi', 'koregaon park', 'kalyani nagar', 'wagholi', 'undri', 'pisoli', 'ambegaon', 'sinhagad road', 'pirangut', 'lohegaon', 'alandi', 'moshi', 'tathawade', 'hinjewadi phase', 'हिंजवडी', 'खराडी', 'कात्रज', 'निगडी', 'भोसरी', 'वाघोली']
    if (!areaHit(t) && has(t, EXTRA) && !own) {
      var place = (EXTRA.filter(function (e) { return has(t, [e]); })[0] || '');
      place = place.charAt(0).toUpperCase() + place.slice(1);
      return withCta(T('I don\'t see <b>' + place + '</b> on my main list yet, but we may still be able to reach you. 😊 Please call or book and our team will confirm quickly.', 'मेरी मुख्य लिस्ट में <b>' + place + '</b> अभी नहीं दिख रहा, फिर भी हम पहुँच सकते हैं। 😊 कृपया कॉल करें या बुक करें, हमारी टीम जल्दी कन्फ़र्म कर देगी।'), null);
    }
    if (!own && (has(t, ['lpg', 'cylinder', 'cooking gas', 'gas stove', 'gas smell', 'stove', 'सिलेंडर', 'एलपीजी', 'गैस की बदबू']) || has(t, ['gas leak', 'गैस लीक']))) {
      return out('<p>' + T('<b>Safety first:</b> if you smell cooking gas (LPG), don\'t switch any electrical item on or off, open the windows and doors, close the regulator and call your gas agency or emergency number right away. We repair AC and home appliances, not LPG systems. Once you\'re safe, we\'re happy to help with any appliance.', '<b>पहले सुरक्षा:</b> अगर किचन गैस (LPG) की बदबू आए तो कोई भी बिजली का स्विच ऑन/ऑफ न करें, खिड़की-दरवाज़े खोलें, रेगुलेटर बंद करें और तुरंत अपनी गैस एजेंसी या इमरजेंसी नंबर पर कॉल करें। हम AC और घरेलू अप्लायंस रिपेयर करते हैं, LPG सिस्टम नहीं। आप सुरक्षित हो जाएँ, फिर किसी भी अप्लायंस में हम मदद करेंगे।') + '</p>', null, CHIPS_MAIN());
    }

    // objections
    if (has(t, ['expensive', 'costly', 'too much', 'discount', 'cheaper', 'cheap', 'negotiat', 'bargain', 'mehnga', 'mehenga', 'kam karo', 'sasta', 'महंगा', 'मेहेंगा', 'सस्ता', 'डिस्काउंट', 'कम करो']))
      return withCta(T('I understand, nobody likes surprises in the bill. That\'s why we work this way: the technician <b>checks first, explains the fault and the cost, and starts only after you approve</b>. No blind charges. Call us once, describe the problem, and our team will give you a clear idea of the cost.', 'मैं समझता हूँ, बिल में सरप्राइज़ किसी को पसंद नहीं। इसीलिए हमारा तरीका है: टेक्नीशियन <b>पहले चेक करता है, फॉल्ट और खर्च बताता है, और आपकी मंज़ूरी के बाद ही काम शुरू करता है</b>। कोई अंधा चार्ज नहीं। एक बार कॉल करके प्रॉब्लम बताइए, टीम खर्च का साफ़ अंदाज़ा दे देगी।'), svc);
    if (has(t, ['trust', 'fraud', 'fake', 'are you genuine', 'you genuine', 'real company', 'reliable', 'cheat', 'scam', 'bharosa', 'bharose', 'vishwas', 'भरोसा', 'विश्वास', 'धोखा', 'भरोसेमंद']))
      return withCta(T('Fair question, and the right one to ask. 👍 We have <b>10 years of experience</b>, trained technicians, we explain the fault and the cost <b>before</b> any work, and repairs are tested before handover. Our owner\'s name and address are on the <a class="hc-l" href="about.html">About</a> and <a class="hc-l" href="contact.html">Contact</a> pages. Call us and judge by how we talk.', 'बिल्कुल सही सवाल है। 👍 हमारे पास <b>10 साल का अनुभव</b> है, ट्रेंड टेक्नीशियन हैं, हम किसी भी काम से <b>पहले</b> फॉल्ट और खर्च बताते हैं, और हैंडओवर से पहले रिपेयर टेस्ट होता है। मालिक का नाम और पता <a class="hc-l" href="about.html">About</a> और <a class="hc-l" href="contact.html">Contact</a> पेज पर है। एक बार कॉल करके हमारी बात से खुद परखिए।'), svc);
    if (has(t, ['think', 'later', 'not now', 'baad me', 'baad mein', 'sochta', 'soch ke', 'dekhta', 'सोचकर', 'बाद में', 'सोचता', 'अभी नहीं']))
      return withCta(T('No problem at all! 😊 Save our number <b>' + PHONE + '</b>. We\'re open 24 hours, even on Sundays. If there is water leakage, burning smell or a shock, switch the appliance off right away and call us.', 'कोई बात नहीं! 😊 हमारा नंबर <b>' + PHONE + '</b> सेव कर लें। हम 24 घंटे, रविवार को भी खुले हैं। अगर पानी लीक हो रहा हो, जलने की बदबू आए या करंट लगे तो तुरंत अप्लायंस बंद करके हमें कॉल करें।'), svc, CHIPS_MAIN(), true);
    if (has(t, ['other company', 'other service', 'compare', 'competitor', 'urban', 'dusre', 'doosre', 'comparison', 'दूसरे', 'तुलना']) || (has(t, ['why']) && has(t, ['you', 'choose', 'your'])) || has(t, ['why choose', 'kyu aap', 'kyon aap', 'आप ही क्यों', 'क्यों चुनें']))
      return withCta(T('Why people choose us: ✅ the technician explains the fault and cost <b>before</b> starting, ✅ honest advice, we tell you if a repair is not worth it, ✅ 10 years of experience, ✅ open 24×7 including Sundays, ✅ repairs tested before handover. Call and describe your problem, you will feel the difference in the first minute.', 'लोग हमें क्यों चुनते हैं: ✅ काम से <b>पहले</b> फॉल्ट और खर्च बताया जाता है, ✅ ईमानदार सलाह, रिपेयर फ़ायदेमंद न हो तो साफ़ बताते हैं, ✅ 10 साल का अनुभव, ✅ 24×7 सेवा, रविवार को भी, ✅ हैंडओवर से पहले टेस्टिंग। कॉल करके प्रॉब्लम बताइए, पहले मिनट में फ़र्क़ महसूस होगा।'), svc);
    if (has(t, ['repair or replace', 'replace or', 'worth repair', 'worth fixing', 'new one', 'naya lena', 'नया लेना', 'बदलना ठीक']))
      return withCta(T('Good thinking. Our technician looks at the age, the fault and the repair cost, and tells you <b>honestly</b> if repairing makes sense or if replacing is smarter. You decide with full information.', 'अच्छी सोच है। हमारा टेक्नीशियन उम्र, फॉल्ट और रिपेयर के खर्च को देखकर <b>ईमानदारी से</b> बताता है कि रिपेयर ठीक रहेगा या नया लेना समझदारी है। फ़ैसला आप पूरी जानकारी के साथ लेते हैं।'), svc);

    // time first (so "kitna time" is not treated as price)
    var strongPrice = has(t, ['price', 'cost', 'rate', 'charge', 'charges', 'fee', 'estimate', 'quote', 'quotation', 'paisa', 'paise', 'rupee', 'rupay', 'kharcha', 'खर्च', 'कीमत', 'चार्ज', 'पैसे', 'रेट', 'भाव', 'कोटेशन']);
    var prob = false;
    if (own) for (var pi = 0; pi < S[own].p.length; pi++) if (has(t, S[own].p[pi][0])) { prob = true; break; }
    var timeStrong = has(t, ['kab', 'when', 'how soon', 'kitni der', 'kitna time', 'aaoge', 'arrive', 'come', 'available', 'same day', 'open', 'timing', 'timings', 'sunday', 'hours', '24', 'night', 'raat', 'holiday', 'समय', 'कब', 'रात', 'संडे', 'रविवार', 'खुले', 'कितनी देर', 'आ सकते', 'आओगे', 'टाइमिंग']);
    var timeWeak = has(t, ['time', 'today', 'tonight', 'now', 'abhi', 'urgent', 'emergency', 'fast', 'quick', 'der', 'lagega', 'टाइम', 'आज', 'अभी', 'जल्दी', 'अर्जेंट', 'तुरंत']);
    if (!strongPrice && (timeStrong || (timeWeak && !prob)))
      return withCta(T('We\'re <b>open 24 hours, 7 days a week</b>, including Sundays and nights. 🕒 After you book, our team calls you within about 5 minutes to confirm the slot. For urgent jobs, call directly, we try to arrange same-day visits depending on technician availability.', 'हम <b>24 घंटे, हफ्ते के सातों दिन</b> खुले हैं, रविवार और रात में भी। 🕒 बुकिंग के बाद हमारी टीम लगभग 5 मिनट में स्लॉट कन्फ़र्म करने के लिए कॉल करती है। अर्जेंट काम के लिए सीधे कॉल करें, तकनीशियन की उपलब्धता के अनुसार हम उसी दिन विज़िट कराने की कोशिश करते हैं।'), svc, ['How much will it cost?', 'Areas you serve', 'Book a technician']);

    if (strongPrice || has(t, ['kitna', 'kitne', 'kitni', 'how much', 'कितना', 'कितने', 'कितनी']))
      return withCta(T('Fair question! The exact cost depends on your ' + (svc ? (svc === 'ac' ? 'AC' : S[svc].name.toLowerCase()) : 'appliance') + ' model and the actual fault, so we don\'t throw blind numbers. What we <b>promise</b>: the technician checks first, tells you the fault and the cost, and <b>starts only after your approval</b>. The visit/inspection charge is explained by our team when you book. 💬 Want a rough idea right now? A 1-minute call is the fastest way.', 'अच्छा सवाल! सही खर्च आपके ' + (svc ? S[svc].hi : 'अप्लायंस') + ' के मॉडल और असली फॉल्ट पर निर्भर करता है, इसलिए हम अंदाज़े से रेट नहीं बताते। हमारा <b>वादा</b>: टेक्नीशियन पहले जाँचता है, फॉल्ट और खर्च बताता है, और <b>आपकी मंज़ूरी के बाद ही</b> काम शुरू करता है। विज़िट/इंस्पेक्शन चार्ज बुकिंग के समय हमारी टीम समझा देती है। 💬 अभी मोटा अंदाज़ा चाहिए? 1 मिनट की कॉल सबसे तेज़ तरीका है।'), svc, ['Can you come today?', 'Areas you serve', 'Book a technician']);

    if (has(t, ['payment', 'pay', 'upi', 'cash', 'card', 'gpay', 'phonepe', 'online pay', 'पेमेंट', 'भुगतान', 'कैश']))
      return withCta(T('Our team will confirm the payment options with you when you book, so there is no confusion later. Payment is for the work done after you have approved the cost.', 'पेमेंट के तरीके बुकिंग के समय हमारी टीम बता देगी, ताकि बाद में कोई उलझन न रहे। पेमेंट आपकी मंज़ूर की गई लागत के अनुसार हुए काम का होता है।'), svc);
    if (has(t, ['warranty', 'guarantee', 'वारंटी', 'गारंटी']))
      return withCta(T('Warranty depends on the repair and the parts used. Our team tells you clearly before the work starts, so you know exactly what is covered. If your appliance is still under company warranty, please check the brand\'s terms too.', 'वारंटी रिपेयर और इस्तेमाल हुए पार्ट्स पर निर्भर करती है। काम शुरू होने से पहले टीम साफ़ बता देती है कि क्या कवर है। अगर अप्लायंस अभी कंपनी वारंटी में है तो ब्रांड की शर्तें भी देख लें।'), svc);
    if (has(t, ['spare', 'parts', 'part ', 'original', 'duplicate', 'पार्ट', 'स्पेयर']))
      return withCta(T('The technician tells you <b>which part is faulty and what it costs</b> before replacing anything. You approve first, nothing is changed without your OK.', 'टेक्नीशियन किसी भी पार्ट को बदलने से <b>पहले बताता है कि कौन-सा पार्ट ख़राब है और उसकी कीमत क्या है</b>। पहले आपकी मंज़ूरी, उसके बिना कुछ नहीं बदला जाता।'), svc);
    if (has(t, ['brand', 'lg', 'samsung', 'voltas', 'daikin', 'whirlpool', 'godrej', 'carrier', 'hitachi', 'bosch', 'ifb', 'haier', 'blue star', 'bluestar', 'panasonic', 'lloyd', 'sony', 'mi', 'ब्रांड', 'सैमसंग', 'एलजी']) && words <= 10)
      return withCta(T('We work on most popular brands. 👍 Share the brand and model number when you book so the right technician comes prepared. If the appliance is under company warranty, please check the brand\'s terms first.', 'हम ज़्यादातर पॉपुलर ब्रांड पर काम करते हैं। 👍 बुकिंग पर ब्रांड और मॉडल नंबर बता दें ताकि सही तकनीशियन तैयारी से आए। अगर अप्लायंस कंपनी वारंटी में है तो पहले ब्रांड की शर्तें देख लें।'), svc);
    if (has(t, ['experience', 'years', 'anubhav', 'saal', 'trained', 'skilled', 'qualified', 'अनुभव', 'साल', 'ट्रेंड']))
      return withCta(T('We have <b>10 years of experience</b> in AC and home appliance repair, and our technicians are trained and explain the fault and the cost before starting any work. 🔧', 'हमारे पास AC और घरेलू अप्लायंस रिपेयर का <b>10 साल का अनुभव</b> है, और हमारे टेक्नीशियन ट्रेंड हैं, काम शुरू करने से पहले फॉल्ट और खर्च बताते हैं। 🔧'), svc);
    if (has(t, ['owner', 'malik', 'tabrez', 'who are you', 'about you', 'about us', 'company', 'मालिक', 'तबरेज़', 'तबरेज']))
      return withCta(T('H.A.S Royal Cool Service is run by <b>Mohammad Tabrez Qureshi</b>. We repair AC and home appliances across Pune and Pimpri-Chinchwad. <a class="hc-l" href="about.html">More about us</a>', 'H.A.S Royal Cool Service के संचालक <b>मोहम्मद तबरेज़ कुरैशी</b> हैं। हम पूरे पुणे और पिंपरी-चिंचवड में AC और घरेलू अप्लायंस रिपेयर करते हैं। <a class="hc-l" href="about.html">हमारे बारे में</a>'), svc);
    if (has(t, ['address', 'located', 'where is your', 'your office', 'पता', 'आपका ऑफिस']))
      return withCta(T('Our registered address is Sarve No 125, Jadhav Pada, Gaondevi Road, Dhaniv Talav, Palghar, Maharashtra - 401209. For service in Pune, our technician comes to your home, so you just need to book or call. <a class="hc-l" href="contact.html">Contact page</a>', 'हमारा रजिस्टर्ड पता: सर्वे नं 125, जाधव पाडा, गांवदेवी रोड, धनिव तालाव, पालघर, महाराष्ट्र - 401209। पुणे में सेवा के लिए हमारा टेक्नीशियन आपके घर आता है, आपको सिर्फ़ बुक या कॉल करना है। <a class="hc-l" href="contact.html">Contact पेज</a>'), svc);
    if (has(t, ['home visit', 'at home', 'ghar', 'pickup', 'pick up', 'घर पर', 'घर आ']))
      return withCta(T('Yes, our technician comes to your home in Pune and Pimpri-Chinchwad and checks the appliance there. 🏠 Most repairs are completed at home.', 'जी हाँ, हमारा टेक्नीशियन पुणे और पिंपरी-चिंचवड में आपके घर आकर अप्लायंस चेक करता है। 🏠 ज़्यादातर रिपेयर घर पर ही पूरे हो जाते हैं।'), svc);
    if (has(t, ['book', 'booking', 'appointment', 'schedule', 'visit', 'technician', 'engineer', 'mistri', 'mechanic', 'send someone', 'बुक', 'मिस्त्री', 'टेक्नीशियन', 'टेक्नीसियन', 'इंजीनियर', 'बुकिंग']))
      return withCta(T('Booking takes just 20 seconds: tap <b>Book Now</b>, enter your <b>name, phone number and the service</b>. Our team then calls you within about 5 minutes. Prefer talking? Call or WhatsApp us anytime. ✅', 'बुकिंग सिर्फ़ 20 सेकंड की है: <b>Book Now</b> दबाएँ, अपना <b>नाम, फ़ोन नंबर और सर्विस</b> भरें। हमारी टीम लगभग 5 मिनट में कॉल करेगी। बात करना पसंद है? कभी भी कॉल या WhatsApp करें। ✅'), svc, ['Areas you serve', 'How much will it cost?']);

    // service + problem
    if (svc) {
      var sv = S[svc];
      if (own || ctx.last === 'svc') {
        for (var i = 0; i < sv.p.length; i++) if (has(t, sv.p[i][0])) {
          return withCta(T(sv.p[i][1], sv.p[i][2]), svc);
        }
      }
      if (own) {
        return withCta(T(sv.over + ' Tell me what\'s wrong, e.g. "not cooling", "making noise" or "leaking", and I\'ll guide you. <a class="hc-l" href="' + sv.page + '">' + sv.name + ' page</a>', sv.overHi + ' बताइए क्या दिक्कत है, जैसे "ठंडा नहीं कर रहा", "आवाज़ आ रही है" या "लीक हो रहा है", मैं गाइड करूँगा। <a class="hc-l" href="' + sv.page + '">' + sv.hi + ' पेज</a>'), svc);
      }
    }
    // problem words without a service named: use last service or ask
    if (has(t, ['not working', 'not start', 'problem', 'issue', 'kharab', 'band', 'repair', 'fix', 'broken', 'dead', 'nahi chal', 'काम नहीं', 'ख़राब', 'खराब', 'दिक्कत', 'प्रॉब्लम', 'रिपेयर', 'बंद'])) {
      if (ctx.svc) return withCta(T('Sorry to hear that, let\'s get it sorted! 🔧 ' + S[ctx.svc].over + ' Tell me what exactly is happening, or let our technician check it at your home.', 'सुनकर अफ़सोस हुआ, चलिए ठीक करवाते हैं! 🔧 ' + S[ctx.svc].overHi + ' बताइए ठीक क्या हो रहा है, या हमारा टेक्नीशियन घर आकर चेक कर लेगा।'), ctx.svc);
      return out('<p>' + T('Sorry to hear that, I\'ll help! Which appliance is it? Tap one below or just type it.', 'सुनकर अफ़सोस हुआ, मैं मदद करता हूँ! कौन सा अप्लायंस है? नीचे से चुनें या लिख दें।') + '</p>', null, ctx.hi ? ['एसी', 'फ्रिज', 'वॉशिंग मशीन', 'माइक्रोवेव', 'गीजर', 'आरओ', 'एलईडी टीवी'] : ['AC', 'Fridge', 'Washing machine', 'Microwave', 'Geyser', 'RO', 'LED TV']);
    }
    if (has(t, ['service', 'services', 'repair', 'what do you', 'offer', 'kya kya', 'list', 'सेवा', 'सर्विस', 'क्या क्या']))
      return out('<p>' + T('We repair: <a class="hc-l" href="ac-service.html">AC</a>, <a class="hc-l" href="fridge-repair.html">Fridge</a>, <a class="hc-l" href="washing-machine-repair.html">Washing Machine</a>, <a class="hc-l" href="microwave-repair.html">Microwave</a>, <a class="hc-l" href="deep-freezer-repair.html">Deep Freezer</a>, <a class="hc-l" href="led-tv-repair.html">LED TV</a>, <a class="hc-l" href="geyser-repair.html">Geyser</a>, <a class="hc-l" href="ro-service.html">RO</a>, <a class="hc-l" href="chimney-repair.html">Chimney</a>, <a class="hc-l" href="appliance-repair.html">other appliances</a> and <a class="hc-l" href="commercial-ac.html">Commercial AC</a>. Which one do you need?', 'हम इन्हें रिपेयर करते हैं: <a class="hc-l" href="ac-service.html">एसी</a>, <a class="hc-l" href="fridge-repair.html">फ्रिज</a>, <a class="hc-l" href="washing-machine-repair.html">वॉशिंग मशीन</a>, <a class="hc-l" href="microwave-repair.html">माइक्रोवेव</a>, <a class="hc-l" href="deep-freezer-repair.html">डीप फ्रीजर</a>, <a class="hc-l" href="led-tv-repair.html">LED टीवी</a>, <a class="hc-l" href="geyser-repair.html">गीजर</a>, <a class="hc-l" href="ro-service.html">आरओ</a>, <a class="hc-l" href="chimney-repair.html">चिमनी</a>, <a class="hc-l" href="appliance-repair.html">अन्य अप्लायंस</a> और <a class="hc-l" href="commercial-ac.html">कमर्शियल एसी</a>। आपको कौन सा चाहिए?') + '</p>' + cta(null), null, CHIPS_MAIN());

    // friendly fallback
    return out('<p>' + T('Good question! 😊 I want to give you a <b>correct</b> answer, and for this one our team can answer you best in a minute. Call or WhatsApp us, or book and we\'ll call you back within about 5 minutes. You can also ask me about services, cost, timing or areas.', 'अच्छा सवाल! 😊 मैं आपको <b>सही</b> जवाब देना चाहता हूँ, और इसके लिए हमारी टीम एक मिनट में सबसे अच्छा बता पाएगी। कॉल या WhatsApp करें, या बुक करें, हम लगभग 5 मिनट में कॉल करेंगे। आप मुझसे सेवाओं, खर्च, समय या इलाकों के बारे में भी पूछ सकते हैं।') + '</p>' + cta(svc), svc, CHIPS_MAIN());
  }

  /* ---------------- UI ---------------- */
  var AV = 'images/ai-agent.jpg';
  var fab = document.createElement('button');
  fab.className = 'hc-fab';
  fab.type = 'button';
  fab.setAttribute('aria-label', 'Open chat assistant');
  fab.innerHTML = '<span class="hc-av"><img src="' + AV + '" alt="Virtual assistant" width="48" height="48"></span><span class="hc-t"><b>Chat with us</b><small><i class="hc-dot"></i>Instant answers 24&times;7</small></span><span class="hc-nudge" aria-hidden="true"></span>';
  var panel = document.createElement('div');
  panel.className = 'hc-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'Chat assistant');
  panel.innerHTML =
    '<div class="hc-head"><span class="hc-av"><img src="' + AV + '" alt="" width="46" height="46"></span><div class="hc-title"><strong>H.A.S Royal Assistant</strong><small><i class="hc-dot"></i>Virtual assistant &middot; Online 24&times;7</small></div><button type="button" class="hc-x" aria-label="Close chat">&times;</button></div>' +
    '<div class="hc-bar"><a class="hc-bt call" href="' + TEL + '" onclick="return gtag_report_conversion(\'' + TEL + '\');">&#128222; Call Now</a><a class="hc-bt book" href="#book" data-book="">&#9989; Book Now</a><a class="hc-bt wa" href="https://wa.me/918828634628?text=Hi%2C%20I%20need%20a%20service%20in%20Pune." target="_blank" rel="noopener">WhatsApp</a></div>' +
    '<div class="hc-body" aria-live="polite"></div><div class="hc-chips"></div>' +
    '<form class="hc-form" autocomplete="off"><input type="text" placeholder="Type your problem, cost, area..." aria-label="Your question" maxlength="200"><button type="submit" aria-label="Send">&#10148;</button></form>';
  document.body.appendChild(fab);
  document.body.appendChild(panel);

  var body = panel.querySelector('.hc-body'), chipsEl = panel.querySelector('.hc-chips'), input = panel.querySelector('input');
  function scrollDown() { body.scrollTop = body.scrollHeight; }
  function add(cls, html, isText) {
    var d = document.createElement('div'); d.className = 'hc-msg ' + cls;
    if (isText) d.textContent = html; else d.innerHTML = html;
    var row = d;
    if (cls === 'bot') { row = document.createElement('div'); row.className = 'hc-row'; row.innerHTML = '<img src="' + AV + '" alt="" width="28" height="28">'; row.appendChild(d); }
    body.appendChild(row); scrollDown(); return row;
  }
  function setChips(list) {
    chipsEl.innerHTML = '';
    (list || []).forEach(function (c) {
      var b = document.createElement('button'); b.type = 'button'; b.textContent = c;
      b.addEventListener('click', function () { ask(c); });
      chipsEl.appendChild(b);
    });
    chipsEl.scrollLeft = 0;
  }
  var busy = false;
  function ask(q) {
    q = (q || '').trim(); if (!q || busy) return;
    busy = true; add('me', q, true); setChips([]);
    var typing = add('bot', '<span class="hc-typing"><i></i><i></i><i></i></span>');
    var r = reply(q);
    setTimeout(function () {
      if (typing.parentNode) typing.parentNode.removeChild(typing);
      add('bot', r.h); setChips(r.c); ctx.last = r.s ? 'svc' : 'x'; busy = false; scrollDown();
    }, 550 + Math.min(600, r.h.length / 2));
  }
  var greeted = false;
  function open() {
    panel.classList.add('open'); fab.style.display = 'none'; document.documentElement.classList.add('hc-open');
    if (!greeted) {
      greeted = true;
      add('bot', '<p>Namaste! 🙏 I\'m the <b>H.A.S Royal Cool</b> assistant. Tell me your problem (AC, fridge, washing machine, geyser, RO, TV...) and I\'ll guide you, share the cost process, check your area and help you book. 😊</p>');
      setChips(CHIPS_MAIN());
    }
    if (window.innerWidth > 768) setTimeout(function () { input.focus(); }, 80);
  }
  function close() { panel.classList.remove('open'); fab.style.display = ''; document.documentElement.classList.remove('hc-open'); }
  fab.addEventListener('click', open);
  panel.querySelector('.hc-x').addEventListener('click', close);
  panel.querySelector('form').addEventListener('submit', function (e) { e.preventDefault(); var v = input.value; input.value = ''; ask(v); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && panel.classList.contains('open')) close(); });

  // Book Now inside the chat: close the chat, pick the service in the real form, scroll to it
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[data-book]') : null;
    if (!a || !panel.contains(a)) return;
    e.preventDefault();
    var sel = document.getElementById('f_project'), box = document.getElementById('book'), v = a.getAttribute('data-book');
    close();
    if (!box) { window.location.href = 'booking.html#book'; return; }
    if (sel && v) for (var i = 0; i < sel.options.length; i++) if (sel.options[i].value === v) { sel.selectedIndex = i; break; }
    box.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(function () { var n = document.getElementById('f_name'); if (n) n.focus({ preventScroll: true }); }, 700);
  });

  /* ---------------- greeting bubble (never opens the chat by itself) ---------------- */
  var NUDGES = [
    ['Hello! \uD83D\uDC4B What problem are you facing?', 'AC, fridge, washing machine... ask me.'],
    ['\u0939\u0947\u0932\u094B! \u0915\u094D\u092F\u093E \u092A\u094D\u0930\u0949\u092C\u094D\u0932\u092E \u0939\u0948?', 'Tap here, I reply instantly.'],
    ['Need a technician in Pune?', 'Check your area and book in 1 minute.'],
    ['Hi! AC not cooling?', 'Ask me about repair, gas or servicing.']
  ];
  var nudge = fab.querySelector('.hc-nudge'), nIdx = 0, nShown = 0, nStop = false;
  function hideNudge() { nudge.classList.remove('show'); fab.classList.remove('wave'); }
  function showNudge() {
    if (nStop || panel.classList.contains('open') || document.hidden || nShown >= 5) return;
    var m = NUDGES[nIdx++ % NUDGES.length];
    nudge.innerHTML = '<b></b><small></small><i class="x">&times;</i>';
    nudge.querySelector('b').textContent = m[0]; nudge.querySelector('small').textContent = m[1];
    nudge.classList.add('show'); fab.classList.add('wave'); nShown++;
    setTimeout(hideNudge, 7000); setTimeout(showNudge, 30000);
  }
  nudge.addEventListener('click', function (e) { if (e.target.className === 'x') { e.stopPropagation(); nStop = true; hideNudge(); } });
  fab.addEventListener('click', function () { nStop = true; hideNudge(); });
  setTimeout(showNudge, 9000);
})();
