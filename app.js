/* ===========================
   SaveTheStray — App Logic
   =========================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- State ---
  let currentScreen = 'splash';
  let selectedAnimalType = null;
  let selectedUrgency = null;
  let currentLang = localStorage.getItem('sts-lang') || 'en';
  let isEmergencyMode = false;

  // ==========================
  // i18n Translations
  // ==========================
  const translations = {
    en: {
      tagline: 'Every life deserves a chance',
      get_started: 'Get Started →',
      greeting: 'Hello, Rescuer! 👋',
      greeting_sub: 'What would you like to do today?',
      emotional_banner: "They can't ask for help. But you can.",
      report_emergency: 'Report Emergency',
      report_emergency_sub: 'Tap here to report an animal in danger',
      quick_actions: 'Quick Actions',
      report_animal: 'Report Animal',
      report_animal_sub: 'Report a stray that needs help',
      safety_guide: 'Safety Guide',
      safety_guide_sub: 'Learn safe rescue methods',
      track_rescue: 'Track Rescue',
      track_rescue_sub: 'Follow ongoing rescues',
      sos_alert: 'SOS Alert',
      sos_alert_sub: 'Immediate help needed',
      recent_reports: 'Recent Reports',
      report_1_title: 'Injured Dog — MG Road',
      report_1_time: 'Reported 15 min ago',
      report_2_title: 'Stranded Kitten — HSR Layout',
      report_2_time: 'Reported 2 hours ago',
      report_3_title: 'Emaciated Puppy — Koramangala',
      report_3_time: 'Reported 5 hours ago',
      status_active: 'Active',
      status_pending: 'Pending',
      success_stories: '🎉 Success Stories',
      rescued_badge: '🏠 Rescued & Adopted',
      story_text: 'Max was found injured on NH-44. Today he has a loving home!',
      take_photo: 'Take a Photo',
      upload_gallery: 'or upload from gallery',
      animal_type: 'Animal Type',
      urgency_level: 'Urgency Level',
      location: 'Location',
      description: 'Description',
      contact_number: 'Your Contact Number',
      success_title: 'Report Submitted Successfully',
      success_msg: 'Your report has been sent to nearby rescue teams. You will receive updates on the rescue progress.',
      stay_safe: 'Stay Safe While Rescuing',
      stay_safe_sub: 'Essential tips for safe animal rescue',
      track_rescues: 'Track Rescues',
      urgency_what: 'What do these levels mean?',
      urgency_low_desc: 'Animal is not in immediate danger. Appears healthy but is roaming, lost, or in need of shelter. No visible injuries.',
      urgency_low_ex: 'e.g. A stray dog sleeping near a park, a cat wandering in a colony',
      urgency_medium_desc: 'Animal shows signs of distress, minor injury, illness, or is stuck in a difficult location. Needs attention soon but is not life-threatening.',
      urgency_medium_ex: 'e.g. Limping dog, cat stuck on a ledge, animal with skin infection',
      urgency_high_desc: 'Animal is in immediate danger or critical condition. Severe injury, bleeding, hit by vehicle, trapped, drowning, or being abused. Requires emergency intervention.',
      urgency_high_ex: 'e.g. Dog hit by car, animal caught in wire/trap, drowning puppy, visible fractures',
      sos_title: 'Emergency Helplines',
      sos_desc: 'Tap to call immediately',
      call_now: 'Call Now',
      emergency_mode: 'Emergency Mode',
      emergency_mode_sub: 'High urgency · Auto-locating · Fast track',
      nearby_shelters: 'Nearby Shelters',
      nearby_shelters_sub: 'Find NGOs & shelters near you',
      chip_all: 'All',
      chip_active: 'Live Cases',
      chip_transit: 'In Progress',
      chip_rescued: 'Rescued',
      shelter_search_placeholder: 'Search by name or area...',
      emergency_contacts: '📞 Emergency Contacts',
      track_section_active: 'Active Rescues',
      track_section_transit: 'In Transit',
      track_section_rescued: 'Rescued'
    },
    hi: {
      tagline: 'हर जीवन एक मौका पाने का हकदार है',
      get_started: 'शुरू करें →',
      greeting: 'नमस्ते, बचावकर्ता! 👋',
      greeting_sub: 'आज आप क्या करना चाहेंगे?',
      emotional_banner: 'वे मदद नहीं माँग सकते। लेकिन आप कर सकते हैं।',
      report_emergency: 'आपातकाल रिपोर्ट',
      report_emergency_sub: 'खतरे में किसी जानवर की रिपोर्ट करें',
      quick_actions: 'त्वरित कार्य',
      report_animal: 'जानवर की रिपोर्ट',
      report_animal_sub: 'मदद चाहने वाले आवारा की रिपोर्ट करें',
      safety_guide: 'सुरक्षा गाइड',
      safety_guide_sub: 'सुरक्षित बचाव के तरीके सीखें',
      track_rescue: 'बचाव ट्रैक करें',
      track_rescue_sub: 'चल रहे बचाव को फ़ॉलो करें',
      sos_alert: 'SOS अलर्ट',
      sos_alert_sub: 'तत्काल सहायता चाहिए',
      recent_reports: 'हाल की रिपोर्ट',
      report_1_title: 'घायल कुत्ता — एमजी रोड',
      report_1_time: '15 मिनट पहले रिपोर्ट किया गया',
      report_2_title: 'फंसा बिल्ली का बच्चा — HSR लेआउट',
      report_2_time: '2 घंटे पहले रिपोर्ट किया गया',
      report_3_title: 'कमज़ोर पिल्ला — कोरमंगला',
      report_3_time: '5 घंटे पहले रिपोर्ट किया गया',
      status_active: 'सक्रिय',
      status_pending: 'लंबित',
      success_stories: '🎉 सफलता की कहानियाँ',
      rescued_badge: '🏠 बचाया और गोद लिया',
      story_text: 'मैक्स NH-44 पर घायल पाया गया। आज उसका एक प्यारा घर है!',
      take_photo: 'फोटो लें',
      upload_gallery: 'या गैलरी से अपलोड करें',
      animal_type: 'जानवर का प्रकार',
      urgency_level: 'तात्कालिकता स्तर',
      location: 'स्थान',
      description: 'विवरण',
      contact_number: 'आपका संपर्क नंबर',
      success_title: 'रिपोर्ट सफलतापूर्वक जमा की गई',
      success_msg: 'आपकी रिपोर्ट नजदीकी बचाव दल को भेज दी गई है। आपको बचाव प्रगति पर अपडेट मिलेंगे।',
      stay_safe: 'बचाव के दौरान सुरक्षित रहें',
      stay_safe_sub: 'सुरक्षित पशु बचाव के लिए आवश्यक सुझाव',
      track_rescues: 'बचाव ट्रैक करें',
      urgency_what: 'इन स्तरों का क्या अर्थ है?',
      urgency_low_desc: 'जानवर तत्काल खतरे में नहीं है। घूम रहा है, खो गया है या आश्रय की जरूरत है। कोई दिखाई देने वाली चोट नहीं।',
      urgency_low_ex: 'जैसे: पार्क में सो रहा कुत्ता, कॉलोनी में घूम रही बिल्ली',
      urgency_medium_desc: 'जानवर तकलीफ में है, मामूली चोट, बीमारी, या कठिन स्थान में फंसा है। जल्द ध्यान देने की जरूरत।',
      urgency_medium_ex: 'जैसे: लंगड़ाता कुत्ता, कार्निश पर फंसी बिल्ली, त्वचा संक्रमण वाला जानवर',
      urgency_high_desc: 'जानवर तत्काल खतरे में है। गंभीर चोट, रक्तस्राव, वाहन दुर्घटना, फंसा हुआ, डूब रहा है या दुर्व्यवहार किया जा रहा है।',
      urgency_high_ex: 'जैसे: गाड़ी से कुचला कुत्ता, तार/जाल में फंसा जानवर, डूबता पिल्ला',
      sos_title: 'आपातकालीन हेल्पलाइन',
      sos_desc: 'तुरंत कॉल करें',
      call_now: 'अभी कॉल करें',
      emergency_mode: 'आपातकालीन मोड',
      emergency_mode_sub: 'उच्च तात्कालिकता · ऑटो-लोकेशन · फास्ट ट्रैक',
      nearby_shelters: 'नजदीकी आश्रय',
      nearby_shelters_sub: 'अपने पास NGO और आश्रय खोजें',
      chip_all: 'सभी',
      chip_active: 'लाइव केस',
      chip_transit: 'प्रगति में',
      chip_rescued: 'बचाया गया',
      shelter_search_placeholder: 'नाम या क्षेत्र से खोजें...',
      emergency_contacts: '📞 आपातकालीन संपर्क',
      track_section_active: 'सक्रिय बचाव',
      track_section_transit: 'ट्रांसिट में',
      track_section_rescued: 'बचाए गए'
    },
    bn: {
      tagline: 'প্রতিটি জীবন একটি সুযোগ পাওয়ার যোগ্য',
      get_started: 'শুরু করুন →',
      greeting: 'হ্যালো, উদ্ধারকারী! 👋',
      greeting_sub: 'আজ আপনি কী করতে চান?',
      emotional_banner: 'তারা সাহায্য চাইতে পারে না। কিন্তু আপনি পারেন।',
      report_emergency: 'জরুরি রিপোর্ট',
      report_emergency_sub: 'বিপদে থাকা প্রাণীর রিপোর্ট করুন',
      quick_actions: 'দ্রুত কাজ',
      report_animal: 'প্রাণী রিপোর্ট',
      report_animal_sub: 'সাহায্য প্রয়োজন এমন পথের প্রাণীর রিপোর্ট করুন',
      safety_guide: 'নিরাপত্তা গাইড',
      safety_guide_sub: 'নিরাপদ উদ্ধার পদ্ধতি শিখুন',
      track_rescue: 'উদ্ধার ট্র্যাক করুন',
      track_rescue_sub: 'চলমান উদ্ধার অনুসরণ করুন',
      sos_alert: 'SOS সতর্কতা',
      sos_alert_sub: 'তাৎক্ষণিক সাহায্য প্রয়োজন',
      recent_reports: 'সাম্প্রতিক রিপোর্ট',
      report_1_title: 'আহত কুকুর — এমজি রোড',
      report_1_time: '১৫ মিনিট আগে রিপোর্ট',
      report_2_title: 'আটকে পড়া বিড়ালছানা — HSR লেআউট',
      report_2_time: '২ ঘণ্টা আগে রিপোর্ট',
      report_3_title: 'দুর্বল কুকুরছানা — কোরমঙ্গলা',
      report_3_time: '৫ ঘণ্টা আগে রিপোর্ট',
      status_active: 'সক্রিয়',
      status_pending: 'বিচারাধীন',
      success_stories: '🎉 সাফল্যের গল্প',
      rescued_badge: '🏠 উদ্ধার ও দত্তক',
      story_text: 'ম্যাক্স NH-44 তে আহত অবস্থায় পাওয়া গেছিল। আজ তার একটি ভালোবাসার ঘর আছে!',
      take_photo: 'ছবি তুলুন',
      upload_gallery: 'বা গ্যালারি থেকে আপলোড করুন',
      animal_type: 'প্রাণীর ধরন',
      urgency_level: 'জরুরি স্তর',
      location: 'অবস্থান',
      description: 'বিবরণ',
      contact_number: 'আপনার যোগাযোগ নম্বর',
      success_title: 'রিপোর্ট সফলভাবে জমা হয়েছে',
      success_msg: 'আপনার রিপোর্ট নিকটবর্তী উদ্ধার দলের কাছে পাঠানো হয়েছে।',
      stay_safe: 'উদ্ধারের সময় নিরাপদ থাকুন',
      stay_safe_sub: 'নিরাপদ প্রাণী উদ্ধারের জন্য প্রয়োজনীয় টিপস',
      track_rescues: 'উদ্ধার ট্র্যাক করুন',
      urgency_what: 'এই স্তরগুলির অর্থ কী?',
      urgency_low_desc: 'প্রাণী তাৎক্ষণিক বিপদে নেই। ঘুরে বেড়াচ্ছে, হারিয়ে গেছে বা আশ্রয় প্রয়োজন।',
      urgency_low_ex: 'যেমন: পার্কে ঘুমন্ত কুকুর, কলোনিতে ঘুরে বেড়ানো বিড়াল',
      urgency_medium_desc: 'প্রাণী কষ্টে আছে, সামান্য আঘাত বা অসুস্থতা। শীঘ্রই মনোযোগ প্রয়োজন।',
      urgency_medium_ex: 'যেমন: খোঁড়া কুকুর, কার্নিশে আটকে থাকা বিড়াল',
      urgency_high_desc: 'প্রাণী তাৎক্ষণিক বিপদে। গুরুতর আঘাত, রক্তপাত, গাড়ি দুর্ঘটনা বা নির্যাতন।',
      urgency_high_ex: 'যেমন: গাড়ি চাপা কুকুর, তারে আটকে পড়া প্রাণী, ডুবন্ত কুকুরছানা',
      sos_title: 'জরুরি হেল্পলাইন', sos_desc: 'এখনই কল করুন', call_now: 'এখনই কল করুন',
      emergency_mode: 'জরুরি মোড', emergency_mode_sub: 'উচ্চ তাৎক্ষণিকতা · অটো-লোকেশন · ফাস্ট ট্র্যাক',
      nearby_shelters: 'কাছের আশ্রয়', nearby_shelters_sub: 'আপনার কাছে NGO ও আশ্রয় খুঁজুন',
      chip_all: 'সব', chip_active: 'লাইভ কেস', chip_transit: 'প্রগতিতে', chip_rescued: 'উদ্ধার হয়েছে',
      shelter_search_placeholder: 'নাম বা এলাকা দিয়ে খুঁজুন...',
      emergency_contacts: '📞 জরুরি যোগাযোগ',
      track_section_active: 'সক্রিয় উদ্ধার', track_section_transit: 'পরিবহনে', track_section_rescued: 'উদ্ধার হয়েছে'
    },
    ta: {
      tagline: 'ஒவ்வொரு உயிரும் ஒரு வாய்ப்புக்கு தகுதியானது',
      get_started: 'தொடங்குங்கள் →',
      greeting: 'வணக்கம், மீட்பரே! 👋',
      greeting_sub: 'இன்று நீங்கள் என்ன செய்ய விரும்புகிறீர்கள்?',
      emotional_banner: 'அவர்களால் உதவி கேட்க முடியாது. ஆனால் உங்களால் முடியும்.',
      report_emergency: 'அவசர அறிக்கை',
      report_emergency_sub: 'ஆபத்தில் உள்ள விலங்கை புகாரளிக்கவும்',
      quick_actions: 'விரைவு செயல்கள்',
      report_animal: 'விலங்கு அறிக்கை',
      report_animal_sub: 'உதவி தேவைப்படும் தெரு விலங்கை புகாரளிக்கவும்',
      safety_guide: 'பாதுகாப்பு வழிகாட்டி',
      safety_guide_sub: 'பாதுகாப்பான மீட்பு முறைகளை கற்றுக்கொள்ளுங்கள்',
      track_rescue: 'மீட்பு கண்காணிப்பு',
      track_rescue_sub: 'நடைபெறும் மீட்புகளை பின்தொடருங்கள்',
      sos_alert: 'SOS எச்சரிக்கை',
      sos_alert_sub: 'உடனடி உதவி தேவை',
      recent_reports: 'சமீபத்திய அறிக்கைகள்',
      report_1_title: 'காயமடைந்த நாய் — MG ரோடு',
      report_1_time: '15 நிமிடங்களுக்கு முன் புகாரளிக்கப்பட்டது',
      report_2_title: 'சிக்கிய பூனைக்குட்டி — HSR லேஅவுட்',
      report_2_time: '2 மணி நேரத்திற்கு முன் புகாரளிக்கப்பட்டது',
      report_3_title: 'மெலிந்த நாய்க்குட்டி — கோரமங்கலா',
      report_3_time: '5 மணி நேரத்திற்கு முன் புகாரளிக்கப்பட்டது',
      status_active: 'செயலில்',
      status_pending: 'நிலுவையில்',
      success_stories: '🎉 வெற்றிக் கதைகள்',
      rescued_badge: '🏠 மீட்கப்பட்டது & தத்தெடுக்கப்பட்டது',
      story_text: 'மேக்ஸ் NH-44 இல் காயமடைந்த நிலையில் கண்டுபிடிக்கப்பட்டார். இன்று அவருக்கு ஒரு அன்பான வீடு உள்ளது!',
      take_photo: 'புகைப்படம் எடுங்கள்',
      upload_gallery: 'அல்லது கேலரியிலிருந்து பதிவேற்றுங்கள்',
      animal_type: 'விலங்கு வகை',
      urgency_level: 'அவசர நிலை',
      location: 'இடம்',
      description: 'விவரம்',
      contact_number: 'உங்கள் தொடர்பு எண்',
      success_title: 'அறிக்கை வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது',
      success_msg: 'உங்கள் அறிக்கை அருகிலுள்ள மீட்பு குழுக்களுக்கு அனுப்பப்பட்டது.',
      stay_safe: 'மீட்பின் போது பாதுகாப்பாக இருங்கள்',
      stay_safe_sub: 'பாதுகாப்பான விலங்கு மீட்புக்கான அத்தியாவசிய குறிப்புகள்',
      track_rescues: 'மீட்புகளை கண்காணிக்கவும்',
      urgency_what: 'இந்த நிலைகள் என்ன அர்த்தம்?',
      urgency_low_desc: 'விலங்கு உடனடி ஆபத்தில் இல்லை. அலைந்து திரிகிறது அல்லது தங்குமிடம் தேவை.',
      urgency_low_ex: 'எ.கா. பூங்காவில் தூங்கும் நாய், காலனியில் அலையும் பூனை',
      urgency_medium_desc: 'விலங்கு துன்பத்தில் உள்ளது, சிறிய காயம் அல்லது நோய். விரைவில் கவனிப்பு தேவை.',
      urgency_medium_ex: 'எ.கா. நொண்டும் நாய், உயரத்தில் சிக்கிய பூனை',
      urgency_high_desc: 'விலங்கு உடனடி ஆபத்தில். கடுமையான காயம், இரத்தப்போக்கு, வாகன விபத்து அல்லது துஷ்பிரயோகம்.',
      urgency_high_ex: 'எ.கா. கார் மோதிய நாய், கம்பியில் சிக்கிய விலங்கு, மூழ்கும் நாய்க்குட்டி',
      sos_title: 'அவசர உதவி எண்கள்', sos_desc: 'இப்போதே அழைக்கவும்', call_now: 'இப்போதே அழைக்கவும்',
      emergency_mode: 'அவசர பயன்முறை', emergency_mode_sub: 'அதிக அவசரம் · தானியங்கி இடம் · வேக பாதை',
      nearby_shelters: 'அருகிலுள்ள தங்குமிடங்கள்', nearby_shelters_sub: 'உங்களுக்கு அருகிலுள்ள NGO மற்றும் தங்குமிடங்களை கண்டுபிடிக்கவும்',
      chip_all: 'அனைத்தும்', chip_active: 'நேரடி வழக்குகள்', chip_transit: 'முன்னேறுகிறது', chip_rescued: 'மீட்கப்பட்டது',
      shelter_search_placeholder: 'பெயர் அல்லது பகுதி மூலம் தேடுங்கள்...',
      emergency_contacts: '📞 அவசர தொடர்புகள்',
      track_section_active: 'செயலில் உள்ள மீட்புகள்', track_section_transit: 'போக்குவரத்தில்', track_section_rescued: 'மீட்கப்பட்டவை'
    },
    te: {
      tagline: 'ప్రతి జీవితం ఒక అవకాశానికి అర్హమైనది', get_started: 'ప్రారంభించండి →',
      greeting: 'హలో, రక్షకుడా! 👋', greeting_sub: 'ఈ రోజు మీరు ఏమి చేయాలనుకుంటున్నారు?',
      emotional_banner: 'వారు సహాయం అడగలేరు. కానీ మీరు చేయగలరు.',
      report_emergency: 'అత్యవసర నివేదిక', report_emergency_sub: 'ప్రమాదంలో ఉన్న జంతువును నివేదించండి',
      quick_actions: 'త్వరిత చర్యలు', report_animal: 'జంతువు నివేదిక',
      report_animal_sub: 'సహాయం అవసరమైన వీధి జంతువును నివేదించండి',
      safety_guide: 'భద్రతా గైడ్', safety_guide_sub: 'సురక్షిత రక్షణ పద్ధతులు నేర్చుకోండి',
      track_rescue: 'రక్షణ ట్రాక్', track_rescue_sub: 'కొనసాగుతున్న రక్షణలను అనుసరించండి',
      sos_alert: 'SOS హెచ్చరిక', sos_alert_sub: 'తక్షణ సహాయం అవసరం',
      recent_reports: 'ఇటీవలి నివేదికలు',
      report_1_title: 'గాయపడిన కుక్క — MG రోడ్', report_1_time: '15 నిమిషాల క్రితం నివేదించబడింది',
      report_2_title: 'చిక్కుకున్న పిల్లి పిల్ల — HSR లేఅవుట్', report_2_time: '2 గంటల క్రితం నివేదించబడింది',
      report_3_title: 'బలహీన కుక్కపిల్ల — కోరమంగళ', report_3_time: '5 గంటల క్రితం నివేదించబడింది',
      status_active: 'సక్రియం', status_pending: 'పెండింగ్',
      success_stories: '🎉 విజయ కథలు', rescued_badge: '🏠 రక్షించబడింది & దత్తత',
      story_text: 'మ్యాక్స్ NH-44 లో గాయపడి కనుగొనబడ్డాడు. ఈ రోజు అతనికి ప్రేమగల ఇల్లు ఉంది!',
      take_photo: 'ఫోటో తీయండి', upload_gallery: 'లేదా గ్యాలరీ నుండి అప్‌లోడ్ చేయండి',
      animal_type: 'జంతువు రకం', urgency_level: 'అత్యవసర స్థాయి',
      location: 'ప్రదేశం', description: 'వివరణ', contact_number: 'మీ సంప్రదింపు నంబర్',
      success_title: 'నివేదిక విజయవంతంగా సమర్పించబడింది',
      success_msg: 'మీ నివేదిక సమీపంలోని రక్షణ బృందాలకు పంపబడింది.',
      stay_safe: 'రక్షణ సమయంలో సురక్షితంగా ఉండండి', stay_safe_sub: 'సురక్షిత జంతు రక్షణ కోసం అవసరమైన చిట్కాలు',
      track_rescues: 'రక్షణలను ట్రాక్ చేయండి',
      urgency_what: 'ఈ స్థాయిలు ఏమిటి?',
      urgency_low_desc: 'జంతువు తక్షణ ప్రమాదంలో లేదు. తిరుగుతోంది, తప్పిపోయింది లేదా ఆశ్రయం అవసరం.',
      urgency_low_ex: 'ఉదా: పార్కులో నిద్రపోతున్న కుక్క', urgency_medium_desc: 'జంతువు బాధలో ఉంది, చిన్న గాయం లేదా అనారోగ్యం. త్వరలో శ్రద్ధ అవసరం.',
      urgency_medium_ex: 'ఉదా: కుంటుతున్న కుక్క, అంచుపై చిక్కుకున్న పిల్లి',
      urgency_high_desc: 'జంతువు తక్షణ ప్రమాదంలో ఉంది. తీవ్రమైన గాయం, రక్తస్రావం, వాహన ప్రమాదం.',
      urgency_high_ex: 'ఉదా: కారు ఢీకొన్న కుక్క, వైర్‌లో చిక్కుకున్న జంతువు',
      sos_title: 'అత్యవసర హెల్ప్‌లైన్లు', sos_desc: 'వెంటనే కాల్ చేయండి', call_now: 'ఇప్పుడే కాల్ చేయండి',
      emergency_mode: 'అత్యవసర మోడ్', emergency_mode_sub: 'అధిక అత్యవసరత · ఆటో-లొకేటింగ్ · ఫాస్ట్ ట్రాక్',
      nearby_shelters: 'సమీప ఆశ్రయాలు', nearby_shelters_sub: 'మీ దగ్గర NGO మరియు ఆశ్రయాలు కనుగొనండి',
      chip_all: 'అన్నీ', chip_active: 'లైవ్ కేసులు', chip_transit: 'పురోగతిలో', chip_rescued: 'రక్షించబడింది',
      shelter_search_placeholder: 'పేరు లేదా ప్రాంతం ద్వారా వెతకండి...',
      emergency_contacts: '📞 అత్యవసర సంప్రదింపులు',
      track_section_active: 'సక్రియ రక్షణలు', track_section_transit: 'రవాణాలో', track_section_rescued: 'రక్షించబడినవి'
    },
    mr: {
      tagline: 'प्रत्येक जीवाला एक संधी मिळायला हवी', get_started: 'सुरू करा →',
      greeting: 'नमस्कार, बचावकर्ता! 👋', greeting_sub: 'आज तुम्हाला काय करायचे आहे?',
      emotional_banner: 'ते मदत मागू शकत नाहीत. पण तुम्ही मागू शकता.',
      report_emergency: 'आपत्कालीन अहवाल', report_emergency_sub: 'धोक्यात असलेल्या प्राण्याची तक्रार करा',
      quick_actions: 'जलद कृती', report_animal: 'प्राणी अहवाल',
      report_animal_sub: 'मदत हवी असलेल्या भटक्या प्राण्याची तक्रार करा',
      safety_guide: 'सुरक्षा मार्गदर्शक', safety_guide_sub: 'सुरक्षित बचाव पद्धती शिका',
      track_rescue: 'बचाव मागोवा', track_rescue_sub: 'सुरू असलेल्या बचावाचा मागोवा घ्या',
      sos_alert: 'SOS सूचना', sos_alert_sub: 'तात्काळ मदत हवी',
      recent_reports: 'अलीकडील अहवाल',
      report_1_title: 'जखमी कुत्रा — MG रोड', report_1_time: '१५ मिनिटांपूर्वी नोंदवले',
      report_2_title: 'अडकलेले मांजरीचे पिल्लू — HSR लेआउट', report_2_time: '२ तासांपूर्वी नोंदवले',
      report_3_title: 'अशक्त कुत्र्याचे पिल्लू — कोरमंगला', report_3_time: '५ तासांपूर्वी नोंदवले',
      status_active: 'सक्रिय', status_pending: 'प्रलंबित',
      success_stories: '🎉 यशोगाथा', rescued_badge: '🏠 बचावले आणि दत्तक',
      story_text: 'मॅक्स NH-44 वर जखमी अवस्थेत सापडला. आज त्याला एक प्रेमळ घर आहे!',
      take_photo: 'फोटो काढा', upload_gallery: 'किंवा गॅलरीतून अपलोड करा',
      animal_type: 'प्राण्याचा प्रकार', urgency_level: 'तातडी पातळी',
      location: 'ठिकाण', description: 'वर्णन', contact_number: 'तुमचा संपर्क क्रमांक',
      success_title: 'अहवाल यशस्वीरित्या सादर केला', success_msg: 'तुमचा अहवाल जवळच्या बचाव पथकाकडे पाठवला गेला आहे.',
      stay_safe: 'बचाव करताना सुरक्षित राहा', stay_safe_sub: 'सुरक्षित प्राणी बचावासाठी आवश्यक टिप्स',
      track_rescues: 'बचावाचा मागोवा घ्या',
      urgency_what: 'या पातळ्यांचा अर्थ काय?',
      urgency_low_desc: 'प्राणी तात्काळ धोक्यात नाही. भटकत आहे, हरवला आहे किंवा आश्रय आवश्यक आहे.',
      urgency_low_ex: 'उदा: उद्यानात झोपलेला कुत्रा, वस्तीत भटकणारी मांजर',
      urgency_medium_desc: 'प्राणी त्रासात आहे, किरकोळ दुखापत किंवा आजार. लवकरच लक्ष आवश्यक.',
      urgency_medium_ex: 'उदा: लंगडणारा कुत्रा, कठड्यावर अडकलेली मांजर',
      urgency_high_desc: 'प्राणी तात्काळ धोक्यात आहे. गंभीर दुखापत, रक्तस्राव, वाहन अपघात किंवा अत्याचार.',
      urgency_high_ex: 'उदा: गाडीने उडवलेला कुत्रा, तारेत अडकलेला प्राणी, बुडणारे पिल्लू',
      sos_title: 'आपत्कालीन हेल्पलाइन', sos_desc: 'लगेच कॉल करा', call_now: 'आत्ता कॉल करा',
      emergency_mode: 'आपत्कालीन मोड', emergency_mode_sub: 'उच्च तातडी · ऑटो-लोकेशन · फास्ट ट्रॅक',
      nearby_shelters: 'जवळचे आश्रय', nearby_shelters_sub: 'तुमच्या जवळ NGO आणि आश्रय शोधा',
      chip_all: 'सर्व', chip_active: 'लाइव्ह केस', chip_transit: 'प्रगतीत', chip_rescued: 'बचावले',
      shelter_search_placeholder: 'नाव किंवा क्षेत्रानुसार शोधा...',
      emergency_contacts: '📞 आपत्कालीन संपर्क',
      track_section_active: 'सक्रिय बचाव', track_section_transit: 'पारगमनात', track_section_rescued: 'बचावलेले'
    },
    kn: {
      tagline: 'ಪ್ರತಿ ಜೀವಿ ಒಂದು ಅವಕಾಶಕ್ಕೆ ಅರ್ಹ', get_started: 'ಪ್ರಾರಂಭಿಸಿ →',
      greeting: 'ಹಲೋ, ರಕ್ಷಕರೇ! 👋', greeting_sub: 'ಇಂದು ನೀವು ಏನು ಮಾಡಲು ಬಯಸುತ್ತೀರಿ?',
      emotional_banner: 'ಅವರು ಸಹಾಯ ಕೇಳಲು ಸಾಧ್ಯವಿಲ್ಲ. ಆದರೆ ನೀವು ಮಾಡಬಹುದು.',
      report_emergency: 'ತುರ್ತು ವರದಿ', report_emergency_sub: 'ಅಪಾಯದಲ್ಲಿರುವ ಪ್ರಾಣಿಯನ್ನು ವರದಿ ಮಾಡಿ',
      quick_actions: 'ತ್ವರಿತ ಕ್ರಮಗಳು', report_animal: 'ಪ್ರಾಣಿ ವರದಿ',
      report_animal_sub: 'ಸಹಾಯ ಬೇಕಾದ ಬೀದಿ ಪ್ರಾಣಿಯನ್ನು ವರದಿ ಮಾಡಿ',
      safety_guide: 'ಸುರಕ್ಷತಾ ಮಾರ್ಗದರ್ಶಿ', safety_guide_sub: 'ಸುರಕ್ಷಿತ ರಕ್ಷಣಾ ವಿಧಾನಗಳನ್ನು ಕಲಿಯಿರಿ',
      track_rescue: 'ರಕ್ಷಣೆ ಟ್ರ್ಯಾಕ್', track_rescue_sub: 'ನಡೆಯುತ್ತಿರುವ ರಕ್ಷಣೆಗಳನ್ನು ಅನುಸರಿಸಿ',
      sos_alert: 'SOS ಎಚ್ಚರಿಕೆ', sos_alert_sub: 'ತಕ್ಷಣದ ಸಹಾಯ ಬೇಕು',
      recent_reports: 'ಇತ್ತೀಚಿನ ವರದಿಗಳು',
      report_1_title: 'ಗಾಯಗೊಂಡ ನಾಯಿ — MG ರಸ್ತೆ', report_1_time: '15 ನಿಮಿಷಗಳ ಹಿಂದೆ ವರದಿ',
      report_2_title: 'ಸಿಕ್ಕಿಕೊಂಡ ಬೆಕ್ಕಿನ ಮರಿ — HSR ಲೇಔಟ್', report_2_time: '2 ಗಂಟೆಗಳ ಹಿಂದೆ ವರದಿ',
      report_3_title: 'ದುರ್ಬಲ ನಾಯಿ ಮರಿ — ಕೋರಮಂಗಲ', report_3_time: '5 ಗಂಟೆಗಳ ಹಿಂದೆ ವರದಿ',
      status_active: 'ಸಕ್ರಿಯ', status_pending: 'ಬಾಕಿ',
      success_stories: '🎉 ಯಶೋಗಾಥೆಗಳು', rescued_badge: '🏠 ರಕ್ಷಿಸಲಾಗಿದೆ & ದತ್ತು',
      story_text: 'ಮ್ಯಾಕ್ಸ್ NH-44 ನಲ್ಲಿ ಗಾಯಗೊಂಡ ಸ್ಥಿತಿಯಲ್ಲಿ ಕಂಡುಬಂದನು. ಇಂದು ಅವನಿಗೆ ಪ್ರೀತಿಯ ಮನೆ ಇದೆ!',
      take_photo: 'ಫೋಟೋ ತೆಗೆಯಿರಿ', upload_gallery: 'ಅಥವಾ ಗ್ಯಾಲರಿಯಿಂದ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
      animal_type: 'ಪ್ರಾಣಿ ವಿಧ', urgency_level: 'ತುರ್ತು ಮಟ್ಟ',
      location: 'ಸ್ಥಳ', description: 'ವಿವರಣೆ', contact_number: 'ನಿಮ್ಮ ಸಂಪರ್ಕ ಸಂಖ್ಯೆ',
      success_title: 'ವರದಿ ಯಶಸ್ವಿಯಾಗಿ ಸಲ್ಲಿಸಲಾಗಿದೆ', success_msg: 'ನಿಮ್ಮ ವರದಿ ಸಮೀಪದ ರಕ್ಷಣಾ ತಂಡಗಳಿಗೆ ಕಳುಹಿಸಲಾಗಿದೆ.',
      stay_safe: 'ರಕ್ಷಣೆ ಸಮಯದಲ್ಲಿ ಸುರಕ್ಷಿತವಾಗಿರಿ', stay_safe_sub: 'ಸುರಕ್ಷಿತ ಪ್ರಾಣಿ ರಕ್ಷಣೆಗೆ ಅಗತ್ಯ ಸಲಹೆಗಳು',
      track_rescues: 'ರಕ್ಷಣೆಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ',
      urgency_what: 'ಈ ಮಟ್ಟಗಳ ಅರ್ಥವೇನು?',
      urgency_low_desc: 'ಪ್ರಾಣಿ ತಕ್ಷಣದ ಅಪಾಯದಲ್ಲಿಲ್ಲ. ಅಲೆದಾಡುತ್ತಿದೆ ಅಥವಾ ಆಶ್ರಯ ಬೇಕು.',
      urgency_low_ex: 'ಉದಾ: ಉದ್ಯಾನದಲ್ಲಿ ಮಲಗಿರುವ ನಾಯಿ',
      urgency_medium_desc: 'ಪ್ರಾಣಿ ಸಂಕಷ್ಟದಲ್ಲಿದೆ, ಸಣ್ಣ ಗಾಯ ಅಥವಾ ಅನಾರೋಗ್ಯ. ಶೀಘ್ರ ಗಮನ ಅಗತ್ಯ.',
      urgency_medium_ex: 'ಉದಾ: ಕುಂಟುವ ನಾಯಿ, ಎತ್ತರದಲ್ಲಿ ಸಿಕ್ಕಿಕೊಂಡ ಬೆಕ್ಕು',
      urgency_high_desc: 'ಪ್ರಾಣಿ ತಕ್ಷಣದ ಅಪಾಯದಲ್ಲಿದೆ. ತೀವ್ರ ಗಾಯ, ರಕ್ತಸ್ರಾವ, ವಾಹನ ಅಪಘಾತ ಅಥವಾ ಹಿಂಸೆ.',
      urgency_high_ex: 'ಉದಾ: ಕಾರು ಹೊಡೆದ ನಾಯಿ, ತಂತಿಯಲ್ಲಿ ಸಿಕ್ಕಿಕೊಂಡ ಪ್ರಾಣಿ',
      sos_title: 'ತುರ್ತು ಸಹಾಯವಾಣಿಗಳು', sos_desc: 'ಈಗಲೇ ಕರೆ ಮಾಡಿ', call_now: 'ಈಗಲೇ ಕರೆ ಮಾಡಿ',
      emergency_mode: 'ತುರ್ತು ಮೋಡ್', emergency_mode_sub: 'ಹೆಚ್ಚಿನ ತುರ್ತು · ಸ್ವಯಂ-ಸ್ಥಳ · ತ್ವರಿತ ಮಾರ್ಗ',
      nearby_shelters: 'ಹತ್ತಿರದ ಆಶ್ರಯಗಳು', nearby_shelters_sub: 'ನಿಮ್ಮ ಸಮೀಪ NGO ಮತ್ತು ಆಶ್ರಯಗಳನ್ನು ಹುಡುಕಿ',
      chip_all: 'ಎಲ್ಲ', chip_active: 'ಲೈವ್ ಕೇಸ್‌ಗಳು', chip_transit: 'ಪ್ರಗತಿಯಲ್ಲಿ', chip_rescued: 'ರಕ್ಷಿಸಲಾಗಿದೆ',
      shelter_search_placeholder: 'ಹೆಸರು ಅಥವಾ ಪ್ರದೇಶದಿಂದ ಹುಡುಕಿ...',
      emergency_contacts: '📞 ತುರ್ತು ಸಂಪರ್ಕಗಳು',
      track_section_active: 'ಸಕ್ರಿಯ ರಕ್ಷಣೆಗಳು', track_section_transit: 'ಸಾರಿಗೆಯಲ್ಲಿ', track_section_rescued: 'ರಕ್ಷಿಸಲಾದವು'
    }
  };

  // Merge supplemental locale strings
  if (window.STS_I18N_EXTRA) {
    Object.keys(window.STS_I18N_EXTRA).forEach((lang) => {
      if (translations[lang]) {
        Object.assign(translations[lang], window.STS_I18N_EXTRA[lang]);
      }
    });
  }

  function t(key) {
    const dict = translations[currentLang] || translations.en;
    return dict[key] ?? translations.en[key] ?? key;
  }

  const langMeta = {
    en: { flag: '🇬🇧', code: 'EN' },
    hi: { flag: '🇮🇳', code: 'HI' },
    bn: { flag: '🇮🇳', code: 'BN' },
    ta: { flag: '🇮🇳', code: 'TA' },
    te: { flag: '🇮🇳', code: 'TE' },
    mr: { flag: '🇮🇳', code: 'MR' },
    kn: { flag: '🇮🇳', code: 'KN' }
  };

  // --- Apply translations ---
  function applyLanguage(lang) {
    const dict = translations[lang];
    if (!dict) return;

    currentLang = lang;
    localStorage.setItem('sts-lang', lang);
    document.getElementById('app-root').setAttribute('lang', lang);

    // Update all data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    // Update placeholder text on inputs/textareas
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      if (dict[key]) {
        el.placeholder = dict[key];
      }
    });

    // Update language button display
    const meta = langMeta[lang];
    const flagEl = document.getElementById('lang-flag');
    const codeEl = document.getElementById('lang-code');
    if (flagEl) flagEl.textContent = meta.flag;
    if (codeEl) codeEl.textContent = meta.code;

    // Update active state in dropdown
    document.querySelectorAll('.lang-option').forEach(opt => {
      opt.classList.toggle('active', opt.dataset.lang === lang);
    });

    // Report screen title (respect emergency mode)
    const reportTitle = document.getElementById('report-screen-title');
    if (reportTitle) {
      reportTitle.textContent = isEmergencyMode ? t('report_emergency') : t('report_animal');
    }

    // Tracking section label for active filter chip
    const trackingLabel = document.getElementById('tracking-section-label');
    const activeChip = document.querySelector('.chip.active');
    if (trackingLabel && activeChip) {
      const filter = activeChip.id.replace('chip-', '');
      const key = { all: '', active: 'track_section_active', transit: 'track_section_transit', rescued: 'track_section_rescued' }[filter];
      trackingLabel.textContent = key ? t(key) : '';
    }
  }

  // --- DOM refs ---
  const screens = document.querySelectorAll('.screen');
  const navItems = document.querySelectorAll('.nav-item');
  const bottomNav = document.querySelector('.bottom-nav');
  const toast = document.getElementById('toast');
  const successOverlay = document.getElementById('success-overlay');

  // ==========================
  // Language Switcher
  // ==========================
  const langSwitcher = document.getElementById('lang-switcher');
  const langBtn = document.getElementById('lang-btn');
  const langDropdown = document.getElementById('lang-dropdown');

  if (langBtn) {
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langSwitcher.classList.toggle('open');
    });
  }

  // Language option selection
  document.querySelectorAll('.lang-option').forEach(option => {
    option.addEventListener('click', (e) => {
      e.stopPropagation();
      const lang = option.dataset.lang;
      applyLanguage(lang);
      langSwitcher.classList.remove('open');
      showToast(`🌐 ${option.textContent.trim()}`);
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', () => {
    if (langSwitcher) langSwitcher.classList.remove('open');
  });

  // ==========================
  // SOS Overlay
  // ==========================
  const sosOverlay = document.getElementById('sos-overlay');
  const sosClose = document.getElementById('sos-close');
  const actionSos = document.getElementById('action-sos');

  if (actionSos && sosOverlay) {
    actionSos.addEventListener('click', () => {
      sosOverlay.classList.add('show');
    });
  }

  if (sosClose && sosOverlay) {
    sosClose.addEventListener('click', () => {
      sosOverlay.classList.remove('show');
    });
  }

  // Close SOS overlay when clicking backdrop
  if (sosOverlay) {
    sosOverlay.addEventListener('click', (e) => {
      if (e.target === sosOverlay) {
        sosOverlay.classList.remove('show');
      }
    });
  }

  // ==========================
  // Nearby Shelters
  // ==========================
  const actionShelters = document.getElementById('action-shelters');
  if (actionShelters) {
    actionShelters.addEventListener('click', () => {
      navigateTo('shelters', false);
    });
  }

  // ==========================
  // Navigation
  // ==========================
  function navigateTo(screenId, showNav = true) {
    const current = document.querySelector('.screen.active');
    if (current) {
      current.classList.add('slide-out');
      current.classList.remove('active');
    }

    setTimeout(() => {
      screens.forEach(s => {
        s.classList.remove('active', 'slide-out');
      });
      const target = document.getElementById(screenId);
      if (target) {
        target.classList.add('active');
        // Scroll the report-scroll-area to top, not the screen itself
        const scrollArea = target.querySelector('.report-scroll-area');
        if (scrollArea) {
          scrollArea.scrollTop = 0;
        } else {
          target.scrollTop = 0;
        }
      }
      currentScreen = screenId;
      // Re-apply language so every screen renders in the selected language
      applyLanguage(currentLang);
    }, 150);

    // Bottom nav: hide on report screen (submit footer takes its place)
    if (bottomNav) {
      if (screenId === 'report') {
        bottomNav.style.display = 'none';
      } else {
        bottomNav.style.display = showNav ? 'flex' : 'none';
      }
    }

    // Submit footer: only visible on report screen
    const submitFooterEl = document.getElementById('submit-footer');
    if (submitFooterEl) {
      submitFooterEl.style.display = (screenId === 'report') ? 'block' : 'none';
    }

    // Update nav active state
    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.dataset.screen === screenId) {
        item.classList.add('active');
      }
    });
  }

  // --- Splash "Get Started" ---
  const btnStart = document.getElementById('btn-get-started');
  if (btnStart) {
    btnStart.addEventListener('click', () => {
      navigateTo('home', true);
    });
  }

  // --- Bottom nav ---
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const target = item.dataset.screen;
      if (target) {
        // Normal report entry from nav — ensure emergency mode is off
        if (target === 'report') exitEmergencyMode();
        navigateTo(target, true);
      }
    });
  });

  // --- Back buttons ---
  document.querySelectorAll('.btn-back').forEach(btn => {
    btn.addEventListener('click', () => {
      exitEmergencyMode();
      navigateTo('home', true);
    });
  });

  // --- Emergency banner → Report (EMERGENCY MODE) ---
  const emergencyBanner = document.getElementById('emergency-banner');
  const emergencyModeBanner = document.getElementById('emergency-mode-banner');
  const reportScreenTitle = document.getElementById('report-screen-title');

  function enterEmergencyMode() {
    isEmergencyMode = true;
    navigateTo('report', true);
    // Show emergency banner
    if (emergencyModeBanner) emergencyModeBanner.style.display = 'block';
    // Change title
    if (reportScreenTitle) {
      reportScreenTitle.textContent = t('report_emergency');
    }
    // Pre-select high urgency
    selectUrgency('high');
    // Auto-detect location
    const locInput = document.getElementById('location-input');
    if (locInput) {
      locInput.value = t('fetching_location');
      locInput.style.color = 'var(--grey-400)';
      setTimeout(() => {
        locInput.value = 'MG Road, Bangalore';
        locInput.style.color = 'var(--slate)';
        locationFilled = true;
        validateReportForm();
        showToast('📍 Location auto-detected');
      }, 1200);
    }
  }

  function exitEmergencyMode() {
    isEmergencyMode = false;
    if (emergencyModeBanner) emergencyModeBanner.style.display = 'none';
    if (reportScreenTitle) {
      reportScreenTitle.textContent = t('report_animal');
    }
  }

  if (emergencyBanner) {
    emergencyBanner.addEventListener('click', () => {
      enterEmergencyMode();
    });
  }

  // --- Quick action cards ---
  document.querySelectorAll('.action-card').forEach(card => {
    card.addEventListener('click', () => {
      const target = card.dataset.screen;
      if (target) {
        // Normal report entry — ensure emergency mode is off
        if (target === 'report') exitEmergencyMode();
        navigateTo(target, true);
      }
    });
  });

  // ==========================
  // Report Screen
  // ==========================

  // --- Validation state ---
  let photoUploaded = false;
  let locationFilled = false;

  const submitFooter = document.getElementById('submit-footer');
  const btnSubmit = document.getElementById('btn-submit');
  const checkPhoto = document.getElementById('check-photo');
  const checkType = document.getElementById('check-type');
  const checkLocation = document.getElementById('check-location');
  const photoUpload = document.getElementById('photo-upload');
  const photoFileInput = document.getElementById('photo-file-input');
  const locationInput = document.getElementById('location-input');

  // --- Validate & update submit button state ---
  function validateReportForm() {
    const isPhotoReady = photoUploaded;
    const isTypeReady = selectedAnimalType !== null;
    const isLocationReady = locationFilled;

    // Update checklist pills
    if (checkPhoto) checkPhoto.classList.toggle('done', isPhotoReady);
    if (checkType) checkType.classList.toggle('done', isTypeReady);
    if (checkLocation) checkLocation.classList.toggle('done', isLocationReady);

    const allReady = isPhotoReady && isTypeReady && isLocationReady;

    // Enable/disable button (footer is always visible)
    if (btnSubmit) {
      btnSubmit.disabled = !allReady;
    }
  }

  // --- Photo upload ---
  if (photoUpload && photoFileInput) {
    photoUpload.addEventListener('click', () => {
      if (photoUploaded) return; // already uploaded
      photoFileInput.click();
    });

    // Real file selected
    photoFileInput.addEventListener('change', () => {
      if (photoFileInput.files && photoFileInput.files.length > 0) {
        markPhotoUploaded();
      }
    });

    // Also allow tap-to-simulate (in case file input doesn't work, e.g. prototype demo)
    // If no file is selected after a timeout, simulate upload
    photoUpload.addEventListener('click', () => {
      if (photoUploaded) return;
      setTimeout(() => {
        if (!photoUploaded) {
          markPhotoUploaded();
        }
      }, 600);
    });
  }

  function markPhotoUploaded() {
    photoUploaded = true;
    if (photoUpload) photoUpload.classList.add('uploaded');
    showToast('✅ Photo added');
    validateReportForm();
  }

  // --- Animal type picker ---
  document.querySelectorAll('.type-option').forEach(option => {
    option.addEventListener('click', () => {
      document.querySelectorAll('.type-option').forEach(o => o.classList.remove('selected'));
      option.classList.add('selected');
      selectedAnimalType = option.dataset.type;
      validateReportForm();
    });
  });

  // --- Urgency picker ---
  function selectUrgency(level) {
    document.querySelectorAll('.urgency-option').forEach(o => o.classList.remove('selected'));
    const target = document.querySelector(`.urgency-option[data-level="${level}"]`);
    if (target) {
      target.classList.add('selected');
      selectedUrgency = level;
    }
  }

  document.querySelectorAll('.urgency-option').forEach(option => {
    option.addEventListener('click', () => {
      selectUrgency(option.dataset.level);
    });
  });

  // --- Location input (manual typing) ---
  if (locationInput) {
    locationInput.addEventListener('input', () => {
      locationFilled = locationInput.value.trim().length > 0;
      validateReportForm();
    });
  }

  // --- GPS button ---
  const btnLocate = document.getElementById('btn-locate');
  if (btnLocate) {
    btnLocate.addEventListener('click', () => {
      if (locationInput) {
        locationInput.value = t('fetching_location');
        locationInput.style.color = 'var(--grey-400)';
        setTimeout(() => {
          locationInput.value = 'MG Road, Bangalore';
          locationInput.style.color = 'var(--slate)';
          locationFilled = true;
          validateReportForm();
          showToast('📍 Location detected');
        }, 1200);
      }
    });
  }

  // --- Submit report ---
  if (btnSubmit) {
    btnSubmit.addEventListener('click', (e) => {
      e.preventDefault();
      if (btnSubmit.disabled) return;
      // Show success overlay
      if (successOverlay) {
        successOverlay.classList.add('show');
      }
    });
  }

  // --- Success done button → Tracking ---
  const btnDone = document.getElementById('btn-done');
  if (btnDone) {
    btnDone.addEventListener('click', () => {
      successOverlay.classList.remove('show');
      // Reset form
      resetReportForm();
      navigateTo('tracking', true);
    });
  }

  function resetReportForm() {
    const form = document.getElementById('report-form');
    if (form) form.reset();
    document.querySelectorAll('.type-option').forEach(o => o.classList.remove('selected'));
    document.querySelectorAll('.urgency-option').forEach(o => o.classList.remove('selected'));
    if (photoUpload) photoUpload.classList.remove('uploaded');
    selectedAnimalType = null;
    selectedUrgency = null;
    photoUploaded = false;
    locationFilled = false;
    if (btnSubmit) btnSubmit.disabled = true;
    if (checkPhoto) checkPhoto.classList.remove('done');
    if (checkType) checkType.classList.remove('done');
    if (checkLocation) checkLocation.classList.remove('done');
  }

  // ==========================
  // Urgency Guide Toggle
  // ==========================
  const urgencyGuideToggle = document.getElementById('urgency-guide-toggle');
  const urgencyGuide = document.getElementById('urgency-guide');
  if (urgencyGuideToggle && urgencyGuide) {
    urgencyGuideToggle.addEventListener('click', () => {
      urgencyGuide.classList.toggle('expanded');
    });
  }

  // ==========================
  // Safety Guide
  // ==========================
  document.querySelectorAll('.guide-card').forEach(card => {
    card.addEventListener('click', () => {
      const isExpanded = card.classList.contains('expanded');
      // Collapse all others
      document.querySelectorAll('.guide-card').forEach(c => c.classList.remove('expanded'));
      if (!isExpanded) {
        card.classList.add('expanded');
      }
    });
  });

  // ==========================
  // Tracking Screen — filter chips (functional)
  // ==========================
  const trackingLabel = document.getElementById('tracking-section-label');
  const chipSectionKeys = { all: '', active: 'track_section_active', transit: 'track_section_transit', rescued: 'track_section_rescued' };

  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const filter = chip.id.replace('chip-', '');
      if (trackingLabel) {
        const key = chipSectionKeys[filter];
        trackingLabel.textContent = key ? t(key) : '';
      }
      document.querySelectorAll('.track-card').forEach(card => {
        const status = card.dataset.status;
        card.style.display = (filter === 'all' || status === filter) ? '' : 'none';
      });
      // Hide group labels when all cards in the group are hidden
      ['mine', 'other'].forEach(owner => {
        const label = document.getElementById(`group-label-${owner}`);
        if (!label) return;
        const cards = document.querySelectorAll(`.track-card[data-owner="${owner}"]`);
        const anyVisible = Array.from(cards).some(c => c.style.display !== 'none');
        label.style.display = anyVisible ? '' : 'none';
      });
    });
  });

  // ==========================
  // Shelters Search
  // ==========================
  const shelterSearch = document.getElementById('shelter-search');
  if (shelterSearch) {
    shelterSearch.addEventListener('input', () => {
      const q = shelterSearch.value.toLowerCase();
      document.querySelectorAll('.shelter-card').forEach(card => {
        card.style.display = card.textContent.toLowerCase().includes(q) ? '' : 'none';
      });
    });
  }
  document.querySelectorAll('.shelter-dir-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      showToast('📍 Opening directions...');
    });
  });

  // ==========================
  // Profile — Edit Profile
  // ==========================
  const editModal = document.getElementById('edit-profile-modal');
  const btnEditProfile = document.getElementById('btn-edit-profile');
  const btnEditCancel = document.getElementById('edit-cancel');
  const btnEditSave = document.getElementById('edit-save');
  const profileDisplayName = document.getElementById('profile-display-name');

  if (btnEditProfile && editModal) {
    btnEditProfile.addEventListener('click', () => { editModal.style.display = 'flex'; });
  }
  if (btnEditCancel && editModal) {
    btnEditCancel.addEventListener('click', () => { editModal.style.display = 'none'; });
  }
  if (btnEditSave && editModal) {
    btnEditSave.addEventListener('click', () => {
      const newName = document.getElementById('edit-name')?.value || 'Jahanvi';
      if (profileDisplayName) profileDisplayName.textContent = newName;
      editModal.style.display = 'none';
      showToast('✅ Profile updated!');
    });
  }

  // Profile Menu Items
  const menuMyReports = document.getElementById('menu-my-reports');
  if (menuMyReports) menuMyReports.addEventListener('click', () => navigateTo('tracking', true));

  const menuLocations = document.getElementById('menu-saved-locations');
  if (menuLocations) menuLocations.addEventListener('click', () => showToast('📍 2 saved locations: Home, MG Road'));

  const menuHelp = document.getElementById('menu-help');
  if (menuHelp) menuHelp.addEventListener('click', () => showToast('📧 Contact: help@savethestray.org'));

  const menuLogout = document.getElementById('menu-logout');
  if (menuLogout) menuLogout.addEventListener('click', () => {
    showToast('👋 Logged out');
    setTimeout(() => navigateTo('splash', false), 800);
  });

  // Notification toggle
  const toggleNotif = document.getElementById('toggle-notif');
  if (toggleNotif) toggleNotif.addEventListener('change', () => {
    showToast(toggleNotif.checked ? '🔔 Notifications enabled' : '🔕 Notifications disabled');
  });

  // Dark mode toggle
  const toggleDark = document.getElementById('toggle-dark');
  if (toggleDark) toggleDark.addEventListener('change', () => {
    showToast(toggleDark.checked ? '🌙 Dark mode on (coming soon)' : '☀️ Light mode');
  });

  // ==========================
  // Toast
  // ==========================
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2000);
  }

  // ==========================
  // Init
  // ==========================
  applyLanguage(currentLang);
  navigateTo('splash', false);
});
