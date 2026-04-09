import { useState, useEffect, useRef, useContext, createContext, useCallback } from "react";

// ═══════════════════════════════════════════════════════════════════════════════
// 1. TRANSLATIONS — zero hardcoded text anywhere in the app
// ═══════════════════════════════════════════════════════════════════════════════
const T = {
  en: {
    appTagline: "Coimbatore · Driver-First Rides",
    continuePassenger: "Continue as Passenger",
    continueDriver: "Continue as Driver",
    demoNote: "Demo prototype · No account required",
    nav: { home: "Home", map: "Map", rides: "Rides", profile: "Profile" },
    home: { title: "Book a Ride", subtitle: "Coimbatore, Tamil Nadu", pickupLabel: "Your Location", whereTo: "Where to? Enter any destination…", expandMap: "Expand", collapseMap: "Collapse", tapMapHint: "Tap map to move pickup pin", nearbyDrivers: "Nearby Drivers", noDrivers: "No drivers available for this ride type", chooseRide: "Choose Ride", distance: "Distance", fareBreakdown: "Fare Breakdown", baseFare: "Base Fare", rideCharge: "Ride charge", pickupComp: "Pickup Compensation", total: "Total", firstRideNote: "Pickup compensation applies for driver's first ride of the day beyond 1 km.", confirm: "Confirm", popularDests: "Popular", setAsPickup: "Set as Pickup", setAsDest: "Set as Destination", mapPin: "Pin on map" },
    ride: { searching: "Searching for driver…", assigned: "Driver Assigned ✓", arriving: "Driver Arriving…", onTrip: "On Trip 🚀", completed: "Ride Completed! 🎉", recording: "This ride is being recorded", driver: "Driver", bike: "Bike", to: "To", fare: "Fare", sos: "SOS", cancel: "Cancel Ride", done: "Done ✓", keepRide: "Keep Ride", cancelRide: "Cancel" },
    cancel: { title: "Cancel Ride?", travelledMsg: "Driver has travelled", towards: "km towards you.", fee: "Cancellation fee:", keep: "Keep Ride", confirm: "Cancel Ride" },
    sos: { title: "SOS Activated", locationShared: "Live location shared with contacts", tripShared: "Trip details transmitted", audio: "Audio recording active", emergency: "Emergency services notified", dismiss: "Dismiss" },
    map: { title: "Live Map", onlineCount: "drivers online", heatOn: "Heat ON", heatOff: "Heat OFF", tapHint: "Tap map to move your location", heatTitle: "Demand Heat Map", heatNote: "Simulated · Updates", veryHigh: "Very High", high: "High", moderate: "Moderate" },
    rides: { title: "My Rides", total: "total rides", all: "All", completed: "Completed", cancelled: "Cancelled", noRides: "No rides yet", ridesWillAppear: "Your rides will appear here", completedLabel: "✅ Completed", cancelledLabel: "❌ Cancelled", driver: "Driver", to: "To", comp: "fee", noFee: "No fee", driverTravelled: "Driver travelled", compensation: "Compensation" },
    profile: { title: "Profile", demoUser: "Demo User", payment: "Payment Method", language: "Language", safety: "Safety Settings", langUpdated: "UI updated to", switchRole: "Switch Role", signOut: "Sign Out", selectedPayment: "Selected" },
    payment: { cash: "Cash", upi: "UPI", card: "Card", wallet: "Wallet" },
    safety: { emergencyShare: "Emergency Contact Sharing", emergencyDesc: "Auto-share location during SOS", autoSOS: "Auto SOS", autoSOSDesc: "Trigger SOS automatically", recording: "Ride Recording", recordingDesc: "Record audio during trips" },
    driver: { title: "Driver Dashboard", offline: "You are offline", online: "You are online", earnings: "Earnings", rides: "Rides", rating: "Rating", wellness: "Low Energy Mode", wellnessDesc: "Short rides · No penalties · No rating loss", wellnessActive: "✓ Only rides under 4 km assigned", goOnline: "Go Online", online_btn: "● Online", offline_btn: "○ Go Online", waiting: "Waiting for requests…", waitingNote: "Next request in a few seconds", sleepNote: "Go online to receive rides", incoming: "Incoming Requests", newRequest: "🔔 New Request", reject: "Reject", accept: "Accept", longRideWarn: "⚠️ Long ride (wellness mode on)", headingPickup: "🏍️ Heading to pickup…", passengerBoard: "✅ Passenger on board", tripDone: "🎉 Trip completed!", passenger: "Passenger", from: "From", fare: "Fare", completeRide: "Complete Ride ✓", ai: { title: "🤖 AI Rating Summary", subtitle: "Based on recent trip feedback", positives: "✅ Positives:", pos1: "Friendly & polite behavior", pos2: "Safe and smooth driving", improve: "⚠️ Improve:", imp1: "Late arrival on 1 trip", imp2: "Follow GPS route suggestion", currentRating: "Rating", ridesToday: "Rides Today", gotIt: "Got it!" } },
  },
  hi: {
    appTagline: "कोयम्बटूर · ड्राइवर-फर्स्ट राइड्स",
    continuePassenger: "यात्री के रूप में जारी रखें",
    continueDriver: "ड्राइवर के रूप में जारी रखें",
    demoNote: "डेमो प्रोटोटाइप · कोई खाता आवश्यक नहीं",
    nav: { home: "होम", map: "नक्शा", rides: "राइड्स", profile: "प्रोफ़ाइल" },
    home: { title: "राइड बुक करें", subtitle: "कोयम्बटूर, तमिलनाडु", pickupLabel: "आपका स्थान", whereTo: "कहाँ जाना है? कोई भी स्थान दर्ज करें…", expandMap: "विस्तार", collapseMap: "संक्षिप्त", tapMapHint: "पिकअप पिन हिलाने के लिए नक्शे पर टैप करें", nearbyDrivers: "पास के ड्राइवर", noDrivers: "इस राइड प्रकार के लिए कोई ड्राइवर उपलब्ध नहीं", chooseRide: "राइड चुनें", distance: "दूरी", fareBreakdown: "किराया विवरण", baseFare: "आधार किराया", rideCharge: "राइड शुल्क", pickupComp: "पिकअप मुआवज़ा", total: "कुल", firstRideNote: "1 किमी से अधिक पर ड्राइवर के पहले राइड के लिए पिकअप मुआवज़ा लागू होता है।", confirm: "पुष्टि करें", popularDests: "लोकप्रिय", setAsPickup: "पिकअप सेट करें", setAsDest: "गंतव्य सेट करें", mapPin: "नक्शे पर पिन" },
    ride: { searching: "ड्राइवर खोज रहे हैं…", assigned: "ड्राइवर असाइन ✓", arriving: "ड्राइवर आ रहा है…", onTrip: "यात्रा पर 🚀", completed: "राइड पूर्ण! 🎉", recording: "यह राइड रिकॉर्ड हो रही है", driver: "ड्राइवर", bike: "बाइक", to: "गंतव्य", fare: "किराया", sos: "SOS", cancel: "राइड रद्द करें", done: "हो गया ✓", keepRide: "राइड रखें", cancelRide: "रद्द करें" },
    cancel: { title: "राइड रद्द करें?", travelledMsg: "ड्राइवर चला है", towards: "किमी आपकी ओर।", fee: "रद्दीकरण शुल्क:", keep: "राइड रखें", confirm: "राइड रद्द करें" },
    sos: { title: "SOS सक्रिय", locationShared: "लाइव लोकेशन साझा", tripShared: "यात्रा विवरण भेजा", audio: "ऑडियो रिकॉर्डिंग सक्रिय", emergency: "आपातकालीन सेवाएं सूचित", dismiss: "बंद करें" },
    map: { title: "लाइव नक्शा", onlineCount: "ड्राइवर ऑनलाइन", heatOn: "हीट चालू", heatOff: "हीट बंद", tapHint: "अपना स्थान बदलने के लिए टैप करें", heatTitle: "मांग हीट मैप", heatNote: "सिमुलेटेड · अपडेट", veryHigh: "बहुत अधिक", high: "अधिक", moderate: "मध्यम" },
    rides: { title: "मेरी राइड्स", total: "कुल राइड्स", all: "सभी", completed: "पूर्ण", cancelled: "रद्द", noRides: "अभी तक कोई राइड नहीं", ridesWillAppear: "आपकी राइड्स यहाँ दिखेंगी", completedLabel: "✅ पूर्ण", cancelledLabel: "❌ रद्द", driver: "ड्राइवर", to: "गंतव्य", comp: "शुल्क", noFee: "कोई शुल्क नहीं", driverTravelled: "ड्राइवर गया", compensation: "मुआवज़ा" },
    profile: { title: "प्रोफ़ाइल", demoUser: "डेमो उपयोगकर्ता", payment: "भुगतान विधि", language: "भाषा", safety: "सुरक्षा सेटिंग्स", langUpdated: "UI अपडेट", switchRole: "भूमिका बदलें", signOut: "साइन आउट", selectedPayment: "चुना गया" },
    payment: { cash: "नकद", upi: "UPI", card: "कार्ड", wallet: "वॉलेट" },
    safety: { emergencyShare: "आपातकालीन संपर्क साझाकरण", emergencyDesc: "SOS के दौरान लोकेशन साझा", autoSOS: "ऑटो SOS", autoSOSDesc: "स्वचालित SOS ट्रिगर", recording: "राइड रिकॉर्डिंग", recordingDesc: "यात्रा के दौरान ऑडियो रिकॉर्ड" },
    driver: { title: "ड्राइवर डैशबोर्ड", offline: "आप ऑफ़लाइन हैं", online: "आप ऑनलाइन हैं", earnings: "कमाई", rides: "राइड्स", rating: "रेटिंग", wellness: "लो एनर्जी मोड", wellnessDesc: "छोटी राइड्स · कोई दंड नहीं · रेटिंग हानि नहीं", wellnessActive: "✓ केवल 4 किमी से कम राइड्स", goOnline: "ऑनलाइन जाएं", online_btn: "● ऑनलाइन", offline_btn: "○ ऑनलाइन जाएं", waiting: "अनुरोधों की प्रतीक्षा…", waitingNote: "कुछ सेकंड में अगला अनुरोध", sleepNote: "राइड्स पाने के लिए ऑनलाइन जाएं", incoming: "आने वाले अनुरोध", newRequest: "🔔 नया अनुरोध", reject: "अस्वीकार", accept: "स्वीकार", longRideWarn: "⚠️ लंबी राइड (वेलनेस मोड चालू)", headingPickup: "🏍️ पिकअप की ओर…", passengerBoard: "✅ यात्री सवार", tripDone: "🎉 यात्रा पूर्ण!", passenger: "यात्री", from: "से", fare: "किराया", completeRide: "राइड पूर्ण करें ✓", ai: { title: "🤖 AI रेटिंग सारांश", subtitle: "हाल की यात्रा प्रतिक्रिया", positives: "✅ सकारात्मक:", pos1: "मैत्रीपूर्ण व्यवहार", pos2: "सुरक्षित ड्राइविंग", improve: "⚠️ सुधारें:", imp1: "1 यात्रा में देरी", imp2: "GPS रूट का पालन करें", currentRating: "रेटिंग", ridesToday: "आज राइड्स", gotIt: "समझ गया!" } },
  },
  ta: {
    appTagline: "கோயம்புத்தூர் · டிரைவர்-ஃபர்ஸ்ட் சவாரிகள்",
    continuePassenger: "பயணியாக தொடரவும்",
    continueDriver: "டிரைவராக தொடரவும்",
    demoNote: "டெமோ · கணக்கு தேவையில்லை",
    nav: { home: "முகப்பு", map: "வரைபடம்", rides: "சவாரிகள்", profile: "சுயவிவரம்" },
    home: { title: "சவாரி பதிவு செய்", subtitle: "கோயம்புத்தூர், தமிழ்நாடு", pickupLabel: "உங்கள் இடம்", whereTo: "எங்கு செல்ல? எந்த இடத்தையும் உள்ளிடவும்…", expandMap: "விரிவாக்கு", collapseMap: "சுருக்கு", tapMapHint: "பிக்அப் பின்னை நகர்த்த வரைபடத்தை தட்டவும்", nearbyDrivers: "அருகில் உள்ள டிரைவர்கள்", noDrivers: "இந்த வகைக்கு டிரைவர்கள் இல்லை", chooseRide: "சவாரி தேர்வு", distance: "தூரம்", fareBreakdown: "கட்டண விவரம்", baseFare: "அடிப்படை கட்டணம்", rideCharge: "சவாரி கட்டணம்", pickupComp: "பிக்அப் இழப்பீடு", total: "மொத்தம்", firstRideNote: "1 கி.மீ. தாண்டி டிரைவரின் முதல் சவாரிக்கு இழப்பீடு.", confirm: "உறுதிப்படுத்து", popularDests: "பிரபலமான", setAsPickup: "பிக்அப் ஆக அமை", setAsDest: "இலக்காக அமை", mapPin: "வரைபடத்தில் பின்" },
    ride: { searching: "டிரைவர் தேடுகிறோம்…", assigned: "டிரைவர் நியமிக்கப்பட்டார் ✓", arriving: "டிரைவர் வருகிறார்…", onTrip: "பயணத்தில் 🚀", completed: "சவாரி முடிந்தது! 🎉", recording: "இந்த சவாரி பதிவு செய்யப்படுகிறது", driver: "டிரைவர்", bike: "பைக்", to: "இலக்கு", fare: "கட்டணம்", sos: "SOS", cancel: "சவாரி ரத்து", done: "முடிந்தது ✓", keepRide: "சவாரி வை", cancelRide: "ரத்து செய்" },
    cancel: { title: "சவாரி ரத்து செய்யவா?", travelledMsg: "டிரைவர் சென்றார்", towards: "கி.மீ. உங்களை நோக்கி.", fee: "ரத்து கட்டணம்:", keep: "சவாரி வை", confirm: "சவாரி ரத்து" },
    sos: { title: "SOS செயல்படுத்தப்பட்டது", locationShared: "நேரடி இடம் பகிரப்பட்டது", tripShared: "பயண விவரங்கள் அனுப்பப்பட்டன", audio: "ஆடியோ பதிவு செயல்படுகிறது", emergency: "அவசர சேவைகளுக்கு அறிவிக்கப்பட்டது", dismiss: "மூடு" },
    map: { title: "நேரடி வரைபடம்", onlineCount: "டிரைவர்கள் ஆன்லைன்", heatOn: "வெப்ப இயக்கம்", heatOff: "வெப்பம் அணை", tapHint: "உங்கள் இடம் மாற்ற வரைபடம் தட்டவும்", heatTitle: "தேவை வெப்ப வரைபடம்", heatNote: "உருவகப்படுத்தப்பட்டது · புதுப்பிப்புகள்", veryHigh: "மிக அதிகம்", high: "அதிகம்", moderate: "மிதமான" },
    rides: { title: "என் சவாரிகள்", total: "மொத்த சவாரிகள்", all: "அனைத்தும்", completed: "முடிந்தவை", cancelled: "ரத்தானவை", noRides: "இன்னும் சவாரிகள் இல்லை", ridesWillAppear: "உங்கள் சவாரிகள் இங்கே தோன்றும்", completedLabel: "✅ முடிந்தது", cancelledLabel: "❌ ரத்தானது", driver: "டிரைவர்", to: "இலக்கு", comp: "கட்டணம்", noFee: "கட்டணம் இல்லை", driverTravelled: "டிரைவர் சென்றது", compensation: "இழப்பீடு" },
    profile: { title: "சுயவிவரம்", demoUser: "டெமோ பயனர்", payment: "கட்டண முறை", language: "மொழி", safety: "பாதுகாப்பு அமைப்புகள்", langUpdated: "UI புதுப்பிக்கப்பட்டது", switchRole: "பாத்திரம் மாற்று", signOut: "வெளியேறு", selectedPayment: "தேர்ந்தெடுக்கப்பட்டது" },
    payment: { cash: "பணம்", upi: "UPI", card: "அட்டை", wallet: "பணப்பை" },
    safety: { emergencyShare: "அவசர தொடர்பு பகிர்வு", emergencyDesc: "SOS போது இடம் பகிர்", autoSOS: "தானியங்கி SOS", autoSOSDesc: "தானாக SOS செயல்படுத்து", recording: "சவாரி பதிவு", recordingDesc: "பயணத்தில் ஆடியோ பதிவு" },
    driver: { title: "டிரைவர் டாஷ்போர்டு", offline: "நீங்கள் ஆஃப்லைன்", online: "நீங்கள் ஆன்லைன்", earnings: "வருமானம்", rides: "சவாரிகள்", rating: "மதிப்பீடு", wellness: "குறைந்த ஆற்றல் பயன்முறை", wellnessDesc: "குறுகிய சவாரிகள் · தண்டனை இல்லை", wellnessActive: "✓ 4 கி.மீ. குறைவான சவாரிகள் மட்டும்", goOnline: "ஆன்லைன் செல்", online_btn: "● ஆன்லைன்", offline_btn: "○ ஆன்லைன் செல்", waiting: "கோரிக்கைகளுக்காக காத்திருக்கிறோம்…", waitingNote: "சில வினாடிகளில் அடுத்த கோரிக்கை", sleepNote: "சவாரிகள் பெற ஆன்லைன் செல்லவும்", incoming: "வரும் கோரிக்கைகள்", newRequest: "🔔 புதிய கோரிக்கை", reject: "நிராகரி", accept: "ஏற்கவும்", longRideWarn: "⚠️ நீண்ட சவாரி (வெல்னஸ் மோட்)", headingPickup: "🏍️ பிக்அப்பை நோக்கி…", passengerBoard: "✅ பயணி ஏறினார்", tripDone: "🎉 பயணம் முடிந்தது!", passenger: "பயணி", from: "இருந்து", fare: "கட்டணம்", completeRide: "சவாரி முடி ✓", ai: { title: "🤖 AI மதிப்பீட்டு சுருக்கம்", subtitle: "சமீபத்திய பயண கருத்துக்கள்", positives: "✅ நேர்மறை:", pos1: "நட்பான நடத்தை", pos2: "பாதுகாப்பான வாகனம் ஓட்டுதல்", improve: "⚠️ மேம்படுத்தல்:", imp1: "1 பயணத்தில் தாமதம்", imp2: "GPS வழி பின்பற்றவும்", currentRating: "மதிப்பீடு", ridesToday: "இன்று சவாரிகள்", gotIt: "புரிந்தது!" } },
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. GLOBAL CONTEXT
// ═══════════════════════════════════════════════════════════════════════════════
const AppContext = createContext(null);
function useApp() { return useContext(AppContext); }

// ═══════════════════════════════════════════════════════════════════════════════
// 3. CONSTANTS & UTILS
// ═══════════════════════════════════════════════════════════════════════════════
const CBE = { lat: 11.0168, lng: 76.9558 };

const POPULAR_DESTS = [
  { label: "RS Puram",       lat: 11.0060, lng: 76.9530 },
  { label: "Gandhipuram",    lat: 11.0200, lng: 76.9700 },
  { label: "Peelamedu",      lat: 11.0270, lng: 77.0040 },
  { label: "Saibaba Colony", lat: 11.0100, lng: 76.9640 },
  { label: "Race Course",    lat: 11.0050, lng: 76.9680 },
  { label: "Ukkadam",        lat: 11.0000, lng: 76.9600 },
];

const RIDE_TYPES = [
  { id: "lite",    emoji: "🛵", labelKey: "Bike Lite",    descKey: "Cheapest",               rate: 8,  eta: "3 min", minRating: 0   },
  { id: "plus",    emoji: "🛵", labelKey: "Bike Plus",    descKey: "Faster pickup",           rate: 10, eta: "2 min", minRating: 0   },
  { id: "comfort", emoji: "🏍", labelKey: "Bike Comfort", descKey: "Top-rated drivers only",  rate: 13, eta: "4 min", minRating: 4.0 },
];

const INIT_DRIVERS = [
  { id: 1, name: "Kumar",  rating: 4.5, dist: 1.2, bike: "TN38 AB1234", lat: 11.0210, lng: 76.9620, online: true,  wellness: false },
  { id: 2, name: "Ramesh", rating: 3.8, dist: 2.4, bike: "TN38 CD5678", lat: 11.0130, lng: 76.9490, online: true,  wellness: true  },
  { id: 3, name: "Suresh", rating: 4.2, dist: 0.9, bike: "TN38 EF9012", lat: 11.0185, lng: 76.9505, online: false, wellness: false },
];

const MOCK_PASSENGERS = [
  { name: "Priya R.",   from: "Gandhipuram",    to: "RS Puram",       dist: 3.2, fare: 87,  pickup: 0.8 },
  { name: "Arjun K.",   from: "Peelamedu",      to: "Race Course",    dist: 5.1, fare: 112, pickup: 1.5 },
  { name: "Meena S.",   from: "Ukkadam",        to: "Saibaba Colony", dist: 2.7, fare: 71,  pickup: 0.6 },
  { name: "Vijay M.",   from: "RS Puram",       to: "Gandhipuram",    dist: 4.0, fare: 95,  pickup: 1.1 },
  { name: "Lakshmi P.", from: "Race Course",    to: "Peelamedu",      dist: 6.3, fare: 138, pickup: 0.4 },
  { name: "Karthik S.", from: "Saibaba Colony", to: "Ukkadam",        dist: 2.2, fare: 58,  pickup: 0.9 },
];

const HEAT_ZONES = [
  { lat: 11.0200, lng: 76.9700, r: 0.9 }, { lat: 11.0100, lng: 76.9600, r: 0.7 },
  { lat: 11.0270, lng: 77.0040, r: 0.85 },{ lat: 11.0050, lng: 76.9680, r: 0.6 },
  { lat: 11.0000, lng: 76.9600, r: 0.75 },
];

const PAYMENT_KEYS = ["cash", "upi", "card", "wallet"];

function haversine(lat1, lng1, lat2, lng2) {
  const R = 6371, r = x => x * Math.PI / 180;
  const dLat = r(lat2 - lat1), dLng = r(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(r(lat1)) * Math.cos(r(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function calcFare(dist, rate, driverDist, firstRide) {
  const base = 25, ridePart = Math.round(dist * rate);
  const pickupExtra = firstRide && driverDist > 1 ? Math.round((driverDist - 1) * 5) : 0;
  return { base, ridePart, pickupExtra, total: base + ridePart + pickupExtra };
}

function lerpPos(a, b, t) {
  return { lat: a.lat + (b.lat - a.lat) * t, lng: a.lng + (b.lng - a.lng) * t };
}

function destFromText(text) {
  const match = POPULAR_DESTS.find(p => p.label.toLowerCase().includes(text.toLowerCase()));
  if (match) return match;
  const hash = text.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return { label: text, lat: CBE.lat + ((hash % 100) - 50) * 0.0004, lng: CBE.lng + ((hash % 80) - 40) * 0.0005 };
}

// ═══════════════════════════════════════════════════════════════════════════════
// 4. LEAFLET MAP COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
function LeafletMap({ passengerPos, destPos, drivers, activeDriverId, onMapClick, onMapLongPress, showHeat, routePoints, mapMode }) {
  const containerRef = useRef(null);
  const mapRef       = useRef(null);
  const pmRef        = useRef(null);
  const dmRef        = useRef(null);
  const dMarkers     = useRef({});
  const routeRef     = useRef(null);
  const heatRef      = useRef([]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const L = window.L; if (!L) return;
    const map = L.map(containerRef.current, { zoomControl: false, attributionControl: false });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19 }).addTo(map);
    map.setView([CBE.lat, CBE.lng], 13);
    map.on("click", e => { if (onMapClick) onMapClick(e.latlng.lat, e.latlng.lng); });
    mapRef.current = map;
    return () => { if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; } };
  }, []);

  useEffect(() => {
    const L = window.L; if (!L || !mapRef.current) return;
    const icon = L.divIcon({ html: `<div style="font-size:26px;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.7))">📍</div>`, className: "", iconAnchor: [13, 26] });
    if (pmRef.current) mapRef.current.removeLayer(pmRef.current);
    pmRef.current = L.marker([passengerPos.lat, passengerPos.lng], { icon }).addTo(mapRef.current);
  }, [passengerPos]);

  useEffect(() => {
    const L = window.L; if (!L || !mapRef.current) return;
    if (dmRef.current) { mapRef.current.removeLayer(dmRef.current); dmRef.current = null; }
    if (!destPos) return;
    const icon = L.divIcon({ html: `<div style="font-size:24px;line-height:1">🏁</div>`, className: "", iconAnchor: [12, 24] });
    dmRef.current = L.marker([destPos.lat, destPos.lng], { icon }).addTo(mapRef.current);
  }, [destPos]);

  useEffect(() => {
    const L = window.L; if (!L || !mapRef.current) return;
    Object.values(dMarkers.current).forEach(m => mapRef.current.removeLayer(m));
    dMarkers.current = {};
    drivers.filter(d => d.online).forEach(d => {
      const isA = d.id === activeDriverId;
      const icon = L.divIcon({ html: `<div style="font-size:${isA ? 30 : 22}px;line-height:1;filter:${isA ? "drop-shadow(0 0 8px gold)" : ""}">${isA ? "🏍" : "🛵"}</div>`, className: "", iconAnchor: [12, 12] });
      const m = L.marker([d.lat, d.lng], { icon }).addTo(mapRef.current);
      m.bindPopup(`<b>${d.name}</b><br>⭐${d.rating} · ${d.bike}`);
      dMarkers.current[d.id] = m;
    });
  }, [drivers, activeDriverId]);

  useEffect(() => {
    const L = window.L; if (!L || !mapRef.current) return;
    if (routeRef.current) { mapRef.current.removeLayer(routeRef.current); routeRef.current = null; }
    if (!routePoints || routePoints.length < 2) return;
    routeRef.current = L.polyline(routePoints.map(p => [p.lat, p.lng]), { color: "#facc15", weight: 4, dashArray: "8 6", opacity: 0.9 }).addTo(mapRef.current);
  }, [routePoints]);

  useEffect(() => {
    const L = window.L; if (!L || !mapRef.current) return;
    heatRef.current.forEach(h => mapRef.current.removeLayer(h));
    heatRef.current = [];
    if (!showHeat) return;
    HEAT_ZONES.forEach(z => {
      const col = z.r > 0.8 ? "#ef4444" : z.r > 0.65 ? "#f97316" : "#eab308";
      const c = L.circle([z.lat, z.lng], { radius: 700, color: col, fillColor: col, fillOpacity: 0.22 + z.r * 0.15, weight: 0 }).addTo(mapRef.current);
      heatRef.current.push(c);
    });
  }, [showHeat]);

  return <div ref={containerRef} style={{ width: "100%", height: "100%", borderRadius: "12px" }} />;
}

// ═══════════════════════════════════════════════════════════════════════════════
// 5. ROLE SELECTION SCREEN
// ═══════════════════════════════════════════════════════════════════════════════
function RoleScreen({ onSelect }) {
  const { lang } = useApp();
  const tx = T[lang];
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
      <div className="mb-12 text-center">
        <div className="text-7xl mb-4" style={{ filter: "drop-shadow(0 0 24px rgba(250,204,21,0.35))" }}>🛵</div>
        <h1 style={{ fontFamily: "Georgia,serif", letterSpacing: "-3px" }} className="text-6xl font-black text-yellow-400">YATRA</h1>
        <p className="text-gray-500 text-xs mt-2 tracking-widest uppercase">{tx.appTagline}</p>
      </div>
      <div className="w-full max-w-xs space-y-4">
        <button onClick={() => onSelect("passenger")} className="w-full bg-yellow-400 text-black font-black text-lg py-5 rounded-2xl flex items-center justify-center gap-3 active:scale-95 transition-all shadow-xl shadow-yellow-400/20">
          <span className="text-2xl">🧑</span> {tx.continuePassenger}
        </button>
        <button onClick={() => onSelect("driver")} className="w-full bg-gray-900 border border-gray-700 text-white font-black text-lg py-5 rounded-2xl flex items-center justify-center gap-3 active:scale-95 transition-all">
          <span className="text-2xl">🧑‍✈️</span> {tx.continueDriver}
        </button>
      </div>
      <p className="text-gray-700 text-xs mt-10 text-center">{tx.demoNote}</p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 6. BOTTOM NAV
// ═══════════════════════════════════════════════════════════════════════════════
function BottomNav({ tab, setTab }) {
  const { lang } = useApp();
  const tx = T[lang].nav;
  const tabs = [
    { id: "home",    icon: "🏠", label: tx.home    },
    { id: "map",     icon: "🗺️",  label: tx.map     },
    { id: "rides",   icon: "🚗", label: tx.rides   },
    { id: "profile", icon: "👤", label: tx.profile },
  ];
  return (
    <div className="fixed bottom-0 z-50 w-full flex justify-center">
      <div style={{ width: "100%", maxWidth: 1200 }}>
        <div className="bg-black border-t border-gray-800 flex justify-around py-2">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`flex flex-col items-center gap-0.5 px-4 py-1 rounded-xl transition-all ${tab === t.id ? "text-yellow-400" : "text-gray-600"}`}>
              <span className="text-xl">{t.icon}</span>
              <span className="text-xs font-bold">{t.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 7. PASSENGER HOME
// ═══════════════════════════════════════════════════════════════════════════════
function PassengerHome({ onRideComplete }) {
  const { lang, drivers, safetySettings, payment } = useApp();
  const tx = T[lang];
  const hm = tx.home; const rt = tx.ride; const cx = tx.cancel; const sx = tx.sos;

  const [pickup, setPickup]       = useState({ lat: CBE.lat, lng: CBE.lng, label: hm.pickupLabel });
  const [dest, setDest]           = useState(null);
  const [destInput, setDestInput] = useState("");
  const [rideType, setRideType]   = useState(null);
  const [selDriver, setSelDriver] = useState(null);
  const [step, setStep]           = useState(1); // 1=location 2=vehicle 3=booking 4=active
  const [rideState, setRideState] = useState(0); // 0-4
  const [driverPos, setDriverPos] = useState(null);
  const [driverTravelled, setDriverTravelled] = useState(0);
  const [showCancelWarn, setShowCancelWarn]   = useState(false);
  const [showSOS, setShowSOS]     = useState(false);
  const [showMapLarge, setShowMapLarge] = useState(false);
  const [isFirstRide, setIsFirstRide]   = useState(true);
  const [mapClickMode, setMapClickMode] = useState("pickup"); // "pickup" | "dest"
  const moveRef  = useRef(null);
  const stateRef = useRef(null);

  // Recalculate dist/fare whenever pickup or dest changes
  const rideDist = dest ? haversine(pickup.lat, pickup.lng, dest.lat, dest.lng) : 0;
  const fare = rideType ? calcFare(rideDist, rideType.rate, selDriver?.dist ?? 0, isFirstRide) : null;
  const availDrivers = drivers.filter(d => d.online && (!rideType || d.rating >= rideType.minRating) && (!d.wellness || rideDist < 4));

  // Update pickup label on language change
  useEffect(() => {
    setPickup(p => p.label === T.en.home.pickupLabel || p.label === T.hi.home.pickupLabel || p.label === T.ta.home.pickupLabel
      ? { ...p, label: hm.pickupLabel } : p);
  }, [lang]);

  function handleMapClick(lat, lng) {
    if (step === 4) return;
    if (mapClickMode === "pickup") {
      setPickup({ lat, lng, label: `${lat.toFixed(4)}, ${lng.toFixed(4)}` });
    } else {
      const d = { label: `${lat.toFixed(4)}, ${lng.toFixed(4)}`, lat, lng };
      setDest(d); setDestInput(d.label); if (step < 2) setStep(2);
    }
  }

  function handleDestInput(val) {
    setDestInput(val);
    if (val.length > 2) { setDest(destFromText(val)); if (step < 2) setStep(2); }
    else { setDest(null); }
  }

  function confirmRide(driver) {
    setSelDriver(driver);
    setDriverPos({ lat: driver.lat, lng: driver.lng });
    setDriverTravelled(0); setRideState(0); setStep(4);
  }

  // Ride state auto-advance
  useEffect(() => {
    if (step !== 4 || rideState >= 4) return;
    stateRef.current = setTimeout(() => setRideState(s => s + 1), 3800);
    return () => clearTimeout(stateRef.current);
  }, [step, rideState]);

  // Driver movement simulation
  useEffect(() => {
    if (step !== 4 || !selDriver || !driverPos || rideState >= 3) return;
    const target = rideState < 2 ? pickup : dest;
    if (!target) return;
    clearInterval(moveRef.current);
    let t = 0;
    const start = { ...driverPos };
    moveRef.current = setInterval(() => {
      t = Math.min(t + 0.025, 1);
      const np = lerpPos(start, target, t);
      setDriverPos(np);
      if (rideState < 2) setDriverTravelled(d => +(d + 0.03).toFixed(2));
      if (t >= 1) clearInterval(moveRef.current);
    }, 300);
    return () => clearInterval(moveRef.current);
  }, [rideState, step]);

  function doCancel() {
    const comp = Math.round(driverTravelled * 4);
    onRideComplete({ type: "cancelled", driver: selDriver, comp, driverDist: driverTravelled, dest: dest?.label, dist: rideDist.toFixed(1) });
    setShowCancelWarn(false); setStep(1); setDest(null); setDestInput(""); setRideType(null); setSelDriver(null); setRideState(0);
  }

  function doComplete() {
    onRideComplete({ type: "completed", driver: selDriver, fare: fare?.total, dist: rideDist.toFixed(1), dest: dest?.label, payment });
    setStep(1); setDest(null); setDestInput(""); setRideType(null); setSelDriver(null); setRideState(0); setIsFirstRide(false);
  }

  const stateInfo = [
    { label: rt.searching,  color: "text-yellow-400", dot: "bg-yellow-400" },
    { label: rt.assigned,   color: "text-green-400",  dot: "bg-green-400"  },
    { label: rt.arriving,   color: "text-blue-400",   dot: "bg-blue-400"   },
    { label: rt.onTrip,     color: "text-purple-400", dot: "bg-purple-400" },
    { label: rt.completed,  color: "text-green-400",  dot: "bg-green-400"  },
  ];

  const routePoints = driverPos && pickup && dest
    ? (rideState < 3 ? [driverPos, pickup] : [pickup, dest])
    : [];

  // ── ACTIVE RIDE ──
  if (step === 4) {
    return (
      <div className="min-h-screen bg-gray-950 text-white pb-24 flex justify-center">
        <div className="w-full max-w-5xl px-6">
          <div style={{ height: 260 }} className="relative mt-4 rounded-2xl overflow-hidden border border-gray-800">
            <LeafletMap
              passengerPos={pickup} destPos={dest}
              drivers={selDriver ? [{ ...selDriver, lat: driverPos?.lat ?? selDriver.lat, lng: driverPos?.lng ?? selDriver.lng, online: true }] : []}
              activeDriverId={selDriver?.id} onMapClick={null} showHeat={false} routePoints={routePoints}
            />
            <div className="absolute top-3 left-3 bg-black/80 backdrop-blur rounded-xl px-3 py-1.5 max-w-xs">
              <span className={`text-xs font-black ${stateInfo[rideState].color}`}>
                <span className={`inline-block w-2 h-2 rounded-full ${stateInfo[rideState].dot} mr-1.5 align-middle`} />
                {stateInfo[rideState].label}
              </span>
            </div>
          </div>

          <div className="py-4 space-y-3">
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map(i => <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-500 ${i <= rideState ? "bg-yellow-400" : "bg-gray-800"}`} />)}
            </div>

            {safetySettings.recording && (
              <div className="bg-red-950/50 border border-red-800 rounded-xl px-3 py-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs text-red-400 font-bold">{rt.recording}</span>
              </div>
            )}

            <div className="bg-gray-900 rounded-2xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-yellow-400/20 flex items-center justify-center text-2xl">🧑‍✈️</div>
              <div className="flex-1">
                <p className="font-black">{selDriver?.name} <span className="text-yellow-400">⭐{selDriver?.rating}</span></p>
                <p className="text-sm text-gray-400">{selDriver?.bike}</p>
                <p className="text-xs text-gray-500 mt-0.5">{rideType?.labelKey} · {rt.to}: {dest?.label}</p>
              </div>
              <div className="text-right">
                <p className="text-yellow-400 font-black text-lg">₹{fare?.total}</p>
                <p className="text-xs text-gray-500">{payment}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => setShowSOS(true)} className="bg-red-600 text-white font-black py-4 rounded-2xl active:scale-95 transition-all">{rt.sos}</button>
              {rideState < 4
                ? <button onClick={() => setShowCancelWarn(true)} className="bg-gray-900 border border-gray-700 text-red-400 font-bold py-4 rounded-2xl active:scale-95">{rt.cancel}</button>
                : <button onClick={doComplete} className="bg-green-500 text-black font-black py-4 rounded-2xl active:scale-95">{rt.done}</button>
              }
            </div>

            <div className="bg-gray-900 rounded-2xl p-4 text-sm space-y-1.5">
              <div className="flex justify-between"><span className="text-gray-400">{hm.baseFare}</span><span>₹{fare?.base}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">{hm.rideCharge} ({rideDist.toFixed(1)} km)</span><span>₹{fare?.ridePart}</span></div>
              {fare?.pickupExtra > 0 && <div className="flex justify-between text-yellow-400"><span>{hm.pickupComp}</span><span>₹{fare.pickupExtra}</span></div>}
              <div className="border-t border-gray-700 pt-2 flex justify-between font-black text-base"><span>{hm.total}</span><span className="text-yellow-400">₹{fare?.total}</span></div>
            </div>
          </div>

          {showCancelWarn && (
            <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6">
              <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-sm border border-red-800">
                <p className="font-black text-red-400 text-lg mb-2">⚠️ {cx.title}</p>
                <p className="text-gray-300 text-sm mb-1">{cx.travelledMsg} <span className="text-yellow-400 font-bold">{driverTravelled}</span> {cx.towards}</p>
                <p className="text-gray-300 text-sm mb-4">{cx.fee} <span className="text-red-400 font-black text-lg">₹{Math.round(driverTravelled * 4)}</span></p>
                <div className="flex gap-3">
                  <button onClick={() => setShowCancelWarn(false)} className="flex-1 bg-gray-800 py-3 rounded-xl font-bold">{cx.keep}</button>
                  <button onClick={doCancel} className="flex-1 bg-red-600 text-white py-3 rounded-xl font-black">{cx.confirm}</button>
                </div>
              </div>
            </div>
          )}

          {showSOS && (
            <div className="fixed inset-0 bg-red-950/95 z-50 flex items-center justify-center p-6">
              <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-sm text-center border border-red-600">
                <div className="text-6xl mb-4 animate-pulse">🆘</div>
                <p className="font-black text-2xl text-red-400 mb-3">{sx.title}</p>
                <div className="text-left space-y-2 mb-5 bg-gray-800 rounded-xl p-4 text-sm">
                  <p className="text-green-400">✅ {sx.locationShared}</p>
                  <p className="text-green-400">✅ {sx.tripShared}</p>
                  <p className="text-green-400">✅ {rt.driver}: {selDriver?.name} · {selDriver?.bike}</p>
                  {safetySettings.recording && <p className="text-yellow-400">🎙️ {sx.audio}</p>}
                  {safetySettings.autoSOS && <p className="text-yellow-400">📞 {sx.emergency}</p>}
                </div>
                <button onClick={() => setShowSOS(false)} className="w-full bg-red-600 text-white font-black py-3 rounded-xl">{sx.dismiss}</button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── BOOKING FLOW ──
  return (
    <div className="min-h-screen bg-gray-950 text-white pb-24 flex justify-center">
      <div className="w-full max-w-5xl px-6">
        <div className="bg-black py-6 md:pt-12 md:pb-6 rounded-b-2xl mb-6 text-center md:text-left">
          <h2 className="text-2xl font-black text-yellow-400">{hm.title}</h2>
          <p className="text-gray-500 text-xs">{hm.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column: MAP */}
          <div className="lg:pt-0">
            <div style={{ height: showMapLarge ? 420 : 260 }} className="rounded-2xl overflow-hidden border border-gray-800 transition-all duration-300 relative">
              <LeafletMap
                passengerPos={pickup} destPos={dest} drivers={drivers} activeDriverId={null}
                onMapClick={handleMapClick} showHeat={false} routePoints={[]}
              />
              <div className="absolute top-2 left-2 flex gap-1">
                <button onClick={() => setMapClickMode("pickup")}
                  className={`text-xs font-bold px-2 py-1 rounded-lg ${mapClickMode === "pickup" ? "bg-yellow-400 text-black" : "bg-black/70 text-yellow-400"}`}>
                  📍 {hm.setAsPickup}
                </button>
                <button onClick={() => setMapClickMode("dest")}
                  className={`text-xs font-bold px-2 py-1 rounded-lg ${mapClickMode === "dest" ? "bg-red-500 text-white" : "bg-black/70 text-gray-300"}`}>
                  🏁 {hm.setAsDest}
                </button>
              </div>
              <button onClick={() => setShowMapLarge(m => !m)}
                className="absolute bottom-2 right-2 bg-black/70 text-xs text-yellow-400 px-2 py-1 rounded-lg font-bold">
                {showMapLarge ? hm.collapseMap : hm.expandMap}
              </button>
            </div>
            <p className="text-xs text-gray-600 text-center mt-2">{hm.tapMapHint}</p>
          </div>

          {/* Right Column: Controls */}
          <div className="space-y-4">
            {/* Location inputs */}
            <div className="bg-gray-900 rounded-2xl p-4 space-y-2">
              <div className="flex items-center gap-3 bg-gray-800 rounded-xl px-3 py-3">
                <span className="text-green-400 text-lg">●</span>
                <span className="text-sm text-gray-200 flex-1 truncate">{pickup.label}</span>
              </div>
              <div className="flex items-center gap-3 bg-gray-800 rounded-xl px-3 py-3">
                <span className="text-red-400 text-lg">●</span>
                <input
                  className="flex-1 bg-transparent text-sm text-white outline-none placeholder-gray-500"
                  placeholder={hm.whereTo} value={destInput}
                  onChange={e => handleDestInput(e.target.value)}
                />
                {destInput && <button onClick={() => { setDestInput(""); setDest(null); setRideType(null); setStep(1); }} className="text-gray-500 text-xl leading-none">×</button>}
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1.5 mt-2">{hm.popularDests}</p>
                <div className="flex gap-2 flex-wrap">
                  {POPULAR_DESTS.map(p => (
                    <button key={p.label} onClick={() => { setDest(p); setDestInput(p.label); if (step < 2) setStep(2); }}
                      className="bg-gray-800 border border-gray-700 text-yellow-300 text-xs px-3 py-1.5 rounded-full font-semibold active:bg-gray-700">
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Ride type */}
            {step >= 2 && dest && (
              <div className="bg-gray-900 rounded-2xl p-4">
                <p className="text-xs text-gray-400 font-bold uppercase mb-1">{hm.chooseRide}</p>
                <p className="text-xs text-gray-500 mb-3">{hm.distance}: <span className="text-yellow-400 font-bold">{rideDist.toFixed(1)} km</span> → {dest.label}</p>
                <div className="space-y-2">
                  {RIDE_TYPES.map(r => {
                    const f = calcFare(rideDist, r.rate, 1.2, isFirstRide);
                    return (
                      <button key={r.id} onClick={() => { setRideType(r); setStep(3); }}
                        className={`w-full rounded-xl p-3 flex items-center gap-3 transition-all border ${rideType?.id === r.id ? "border-yellow-400 bg-yellow-400/10" : "border-gray-700 bg-gray-800"}`}>
                        <span className="text-2xl">{r.emoji}</span>
                        <div className="flex-1 text-left">
                          <p className="font-bold text-sm">{r.labelKey}</p>
                          <p className="text-xs text-gray-400">{r.descKey} · {r.eta}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-yellow-400">₹{f.total}</p>
                          <p className="text-xs text-gray-500">est.</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Fare breakdown */}
            {step >= 3 && fare && (
              <div className="bg-gray-900 rounded-2xl p-4">
                <p className="text-xs text-gray-400 font-bold uppercase mb-3">{hm.fareBreakdown}</p>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between"><span className="text-gray-400">{hm.baseFare}</span><span>₹{fare.base}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">{hm.rideCharge} ({rideDist.toFixed(1)} km × ₹{rideType?.rate})</span><span>₹{fare.ridePart}</span></div>
                  {fare.pickupExtra > 0 && <div className="flex justify-between text-yellow-400"><span>{hm.pickupComp}</span><span>₹{fare.pickupExtra}</span></div>}
                  <div className="border-t border-gray-700 pt-2 flex justify-between font-black text-base"><span>{hm.total}</span><span className="text-yellow-400">₹{fare.total}</span></div>
                </div>
                {isFirstRide && <p className="text-xs text-gray-500 mt-2">{hm.firstRideNote}</p>}
              </div>
            )}

            {/* Drivers */}
            {step >= 3 && rideType && (
              <div className="bg-gray-900 rounded-2xl p-4">
                <p className="text-xs text-gray-400 font-bold uppercase mb-3">{hm.nearbyDrivers}</p>
                {availDrivers.length === 0
                  ? <p className="text-gray-500 text-sm text-center py-4">{hm.noDrivers}</p>
                  : availDrivers.map(d => (
                    <div key={d.id} className="flex items-center gap-3 bg-gray-800 rounded-xl p-3 mb-2">
                      <div className="w-11 h-11 rounded-full bg-yellow-400/15 flex items-center justify-center text-xl flex-shrink-0">🧑‍✈️</div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm">{d.name} <span className="text-yellow-400">⭐{d.rating}</span></p>
                        <p className="text-xs text-gray-400 truncate">{d.bike} · {d.dist} km away</p>
                        {d.wellness && <p className="text-xs text-blue-400">🌿 {T[lang].driver.wellness}</p>}
                      </div>
                      <button onClick={() => confirmRide(d)} className="bg-yellow-400 text-black font-black text-xs px-4 py-2 rounded-xl flex-shrink-0 active:scale-95">
                        {hm.confirm}
                      </button>
                    </div>
                  ))
                }
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 8. MAP SCREEN
// ═══════════════════════════════════════════════════════════════════════════════
function MapScreen({ passengerPos, setPassengerPos }) {
  const { lang, drivers } = useApp();
  const tx = T[lang].map;
  const [showHeat, setShowHeat] = useState(false);
  const [tick, setTick] = useState(0);
  useEffect(() => { const t = setInterval(() => setTick(h => h + 1), 4000); return () => clearInterval(t); }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white pb-24 flex justify-center">
      <div className="w-full max-w-5xl px-6">
        <div className="bg-black py-6 md:pt-12 md:pb-6 rounded-b-2xl mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-yellow-400">{tx.title}</h2>
            <p className="text-gray-500 text-xs">{drivers.filter(d => d.online).length} {tx.onlineCount}</p>
          </div>
          <button onClick={() => setShowHeat(h => !h)}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${showHeat ? "bg-red-500 text-white" : "bg-gray-800 text-gray-300"}`}>
            🔥 {showHeat ? tx.heatOn : tx.heatOff}
          </button>
        </div>
        
        <div style={{ height: 450 }} className="rounded-2xl overflow-hidden border border-gray-800 mb-3">
          <LeafletMap passengerPos={passengerPos} destPos={null} drivers={drivers} activeDriverId={null}
            onMapClick={(lat, lng) => setPassengerPos({ lat, lng, label: `${lat.toFixed(4)}, ${lng.toFixed(4)}` })}
            showHeat={showHeat} routePoints={[]} />
        </div>
        <p className="text-xs text-gray-600 text-center mb-6">{tx.tapHint}</p>

        {showHeat && (
          <div className="bg-gray-900 rounded-xl p-3 text-xs mb-6">
            <p className="font-bold text-white mb-1">🔥 {tx.heatTitle}</p>
            <div className="flex gap-3"><span className="text-red-400">■ {tx.veryHigh}</span><span className="text-orange-400">■ {tx.high}</span><span className="text-yellow-400">■ {tx.moderate}</span></div>
            <p className="text-gray-600 mt-1">{tx.heatNote} #{tick}</p>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {drivers.map(d => (
            <div key={d.id} className={`bg-gray-900 rounded-xl p-3 border ${d.online ? "border-green-900/50" : "border-gray-800"}`}>
              <p className="font-bold text-xs truncate">{d.name}</p>
              <p className="text-yellow-400 text-xs">⭐{d.rating}</p>
              <p className={`text-xs font-bold mt-1 ${d.online ? "text-green-400" : "text-gray-600"}`}>{d.online ? "● Online" : "○ Offline"}</p>
              <p className="text-xs text-gray-500">{d.dist} km</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 9. RIDES SCREEN
// ═══════════════════════════════════════════════════════════════════════════════
function RidesScreen({ history }) {
  const { lang } = useApp();
  const tx = T[lang].rides;
  const [tab, setTab] = useState("all");
  const filtered = tab === "all" ? history : history.filter(r => r.type === tab);

  return (
    <div className="min-h-screen bg-gray-950 text-white pb-24 flex justify-center">
      <div className="w-full max-w-5xl px-6">
        <div className="bg-black py-6 md:pt-12 md:pb-6 rounded-b-2xl mb-4">
          <h2 className="text-2xl font-black text-yellow-400">{tx.title}</h2>
          <p className="text-gray-500 text-xs">{history.length} {tx.total}</p>
        </div>
        <div className="flex gap-4 pb-6">
          {["all", "completed", "cancelled"].map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 py-3 rounded-xl text-sm font-black transition-all ${tab === t ? "bg-yellow-400 text-black" : "bg-gray-900 text-gray-400"}`}>
              {t === "all" ? tx.all : t === "completed" ? tx.completed : tx.cancelled} ({t === "all" ? history.length : history.filter(r => r.type === t).length})
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.length === 0
            ? <div className="md:col-span-2 text-center py-14 text-gray-600"><p className="text-4xl mb-2">🚗</p><p className="font-semibold">{tx.noRides}</p><p className="text-sm mt-1">{tx.ridesWillAppear}</p></div>
            : filtered.map((r, i) => (
              <div key={i} className={`bg-gray-900 rounded-2xl p-4 border ${r.type === "completed" ? "border-green-900/40" : "border-red-900/40"}`}>
                <div className="flex justify-between items-start mb-2">
                  <p className="font-black">{r.type === "completed" ? tx.completedLabel : tx.cancelledLabel}</p>
                  <p className={`font-black ${r.type === "completed" ? "text-green-400" : "text-red-400"}`}>
                    {r.type === "completed" ? `₹${r.fare}` : r.comp > 0 ? `₹${r.comp} ${tx.comp}` : tx.noFee}
                  </p>
                </div>
                <p className="text-sm text-gray-400">{tx.driver}: {r.driver?.name} <span className="text-yellow-400">⭐{r.driver?.rating}</span></p>
                {r.dest && <p className="text-xs text-gray-500 mt-0.5">{tx.to}: {r.dest}</p>}
                <p className="text-xs text-gray-500">{r.dist} km{r.payment ? ` · ${r.payment}` : ""}</p>
                {r.type === "cancelled" && r.comp > 0 && (
                  <div className="mt-2 bg-red-950/30 rounded-xl p-2">
                    <p className="text-xs text-red-400">{tx.driverTravelled} {r.driverDist} km · {tx.compensation}: ₹{r.comp}</p>
                  </div>
                )}
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 10. PROFILE SCREEN
// ═══════════════════════════════════════════════════════════════════════════════
function ProfileScreen({ role, onSwitch }) {
  const { lang, setLang, payment, setPayment, safetySettings, setSafetySettings } = useApp();
  const tx = T[lang];
  const pf = tx.profile; const py = tx.payment; const sf = tx.safety;
  const LANGS = { en: "English", hi: "हिन्दी", ta: "தமிழ்" };

  function toggle(key) { setSafetySettings(s => ({ ...s, [key]: !s[key] })); }

  return (
    <div className="min-h-screen bg-gray-950 text-white pb-24 flex justify-center">
      <div className="w-full max-w-5xl px-6">
        <div className="bg-black py-6 md:pt-12 md:pb-6 rounded-b-2xl mb-6">
          <h2 className="text-2xl font-black text-yellow-400">{pf.title}</h2>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-gray-900 rounded-2xl p-5 flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-yellow-400/20 flex items-center justify-center text-3xl">{role === "passenger" ? "🧑" : "🧑‍✈️"}</div>
              <div>
                <p className="font-black text-lg capitalize">{role}</p>
                <p className="text-gray-400 text-sm">{pf.demoUser} · Coimbatore</p>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-gray-900 rounded-2xl p-4">
              <p className="text-xs text-gray-400 font-bold uppercase mb-3">💳 {pf.payment}</p>
              <div className="grid grid-cols-2 gap-3">
                {PAYMENT_KEYS.map(k => (
                  <button key={k} onClick={() => setPayment(py[k])}
                    className={`py-3 rounded-xl text-sm font-bold transition-all ${payment === py[k] ? "bg-yellow-400 text-black" : "bg-gray-800 text-gray-300"}`}>
                    {k === "cash" ? "💵" : k === "upi" ? "📱" : k === "card" ? "💳" : "👛"} {py[k]}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-600 mt-3">{pf.selectedPayment}: <span className="text-white font-bold">{payment}</span></p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Language */}
            <div className="bg-gray-900 rounded-2xl p-4">
              <p className="text-xs text-gray-400 font-bold uppercase mb-3">🌐 {pf.language}</p>
              <div className="flex gap-3">
                {Object.entries(LANGS).map(([key, label]) => (
                  <button key={key} onClick={() => setLang(key)}
                    className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${lang === key ? "bg-yellow-400 text-black" : "bg-gray-800 text-gray-300"}`}>
                    {label}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-600 mt-3">{pf.langUpdated}: <span className="text-white font-bold">{LANGS[lang]}</span></p>
            </div>

            {/* Safety Settings */}
            <div className="bg-gray-900 rounded-2xl p-4">
              <p className="text-xs text-gray-400 font-bold uppercase mb-3">🛡️ {pf.safety}</p>
              {[
                { key: "emergencyShare", label: sf.emergencyShare, desc: sf.emergencyDesc },
                { key: "autoSOS",        label: sf.autoSOS,        desc: sf.autoSOSDesc   },
                { key: "recording",      label: sf.recording,      desc: sf.recordingDesc },
              ].map(item => (
                <div key={item.key} className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0">
                  <div className="flex-1 pr-3">
                    <p className="text-sm font-semibold">{item.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                    {item.key === "recording" && safetySettings.recording && <p className="text-xs text-red-400 mt-0.5">● {tx.ride.recording}</p>}
                  </div>
                  <button onClick={() => toggle(item.key)}
                    className={`w-12 h-6 rounded-full transition-all relative flex-shrink-0 ${safetySettings[item.key] ? "bg-green-500" : "bg-gray-700"}`}>
                    <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${safetySettings[item.key] ? "left-6" : "left-0.5"}`} />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <button onClick={onSwitch} className="flex-1 bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 font-black py-4 rounded-2xl active:scale-95">{pf.switchRole}</button>
              <button onClick={onSwitch} className="flex-1 bg-red-950/50 border border-red-900 text-red-400 font-bold py-4 rounded-2xl active:scale-95">{pf.signOut}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 11. DRIVER HOME
// ═══════════════════════════════════════════════════════════════════════════════
function DriverHome() {
  const { lang } = useApp();
  const tx = T[lang].driver;
  const [online, setOnline]       = useState(false);
  const [wellness, setWellness]   = useState(false);
  const [earnings, setEarnings]   = useState(480);
  const [rides, setRides]         = useState(5);
  const [rideQueue, setRideQueue] = useState([]);
  const [activeRide, setActiveRide] = useState(null);
  const [rideStep, setRideStep]   = useState(0);
  const [showAI, setShowAI]       = useState(false);
  const qRef = useRef(null); const sRef = useRef(null);

  function nextPassenger() {
    const pool = wellness ? MOCK_PASSENGERS.filter(p => p.dist < 4) : MOCK_PASSENGERS;
    return { ...pool[Math.floor(Math.random() * pool.length)], id: Date.now() + Math.random() };
  }

  useEffect(() => {
    if (!online || activeRide) { setRideQueue([]); clearTimeout(qRef.current); return; }
    function add() {
      setRideQueue(q => q.length < 3 ? [...q, nextPassenger()] : q);
      qRef.current = setTimeout(add, 5000 + Math.random() * 4000);
    }
    qRef.current = setTimeout(add, 2500);
    return () => clearTimeout(qRef.current);
  }, [online, activeRide, wellness]);

  useEffect(() => {
    if (!activeRide || rideStep >= 2) return;
    sRef.current = setTimeout(() => setRideStep(s => s + 1), 3500);
    return () => clearTimeout(sRef.current);
  }, [activeRide, rideStep]);

  function acceptRide(ride) { setActiveRide(ride); setRideQueue(q => q.filter(r => r.id !== ride.id)); setRideStep(0); }
  function rejectRide(id) { setRideQueue(q => q.filter(r => r.id !== id)); }
  function completeRide() {
    setEarnings(e => e + (activeRide?.fare || 0)); setRides(r => r + 1);
    setActiveRide(null); setRideStep(0); setShowAI(true);
    setTimeout(() => setRideQueue(q => [...q, nextPassenger()]), 1500);
  }

  const stepLabels = [tx.headingPickup, tx.passengerBoard, tx.tripDone];
  const stepColors = ["text-yellow-400", "text-blue-400", "text-green-400"];
  const ai = tx.ai;

  return (
    <div className="min-h-screen bg-gray-950 text-white pb-24 flex justify-center">
      <div className="w-full max-w-5xl px-6">
        <div className="bg-black py-6 md:pt-12 md:pb-6 rounded-b-2xl mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-yellow-400">{tx.title}</h2>
            <p className="text-gray-500 text-xs">{online ? tx.online : tx.offline}</p>
          </div>
          <button onClick={() => setOnline(o => !o)}
            className={`px-5 py-3 rounded-xl font-black text-sm transition-all ${online ? "bg-green-500 text-black shadow-lg shadow-green-500/30" : "bg-gray-800 text-gray-400"}`}>
            {online ? tx.online_btn : tx.offline_btn}
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[{ v: `₹${earnings}`, l: tx.earnings, c: "text-green-400" }, { v: rides, l: tx.rides, c: "text-yellow-400" }, { v: "⭐4.5", l: tx.rating, c: "text-white" }].map(s => (
                <div key={s.l} className="bg-gray-900 rounded-2xl p-4 text-center">
                  <p className={`font-black text-2xl ${s.c}`}>{s.v}</p>
                  <p className="text-sm text-gray-500 mt-1">{s.l}</p>
                </div>
              ))}
            </div>

            {/* Wellness */}
            <div className="bg-gray-900 rounded-2xl p-5 flex items-center justify-between">
              <div>
                <p className="font-bold text-base">🌿 {tx.wellness}</p>
                <p className="text-sm text-gray-400 mt-0.5">{tx.wellnessDesc}</p>
                {wellness && <p className="text-sm text-blue-400 mt-0.5">{tx.wellnessActive}</p>}
              </div>
              <button onClick={() => setWellness(w => !w)}
                className={`w-12 h-6 rounded-full transition-all relative flex-shrink-0 ${wellness ? "bg-blue-500" : "bg-gray-700"}`}>
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${wellness ? "left-6" : "left-0.5"}`} />
              </button>
            </div>

            {/* Active ride */}
            {activeRide && (
              <div className="bg-green-900/25 border border-green-700 rounded-2xl p-5">
                <p className={`font-black mb-3 text-lg ${stepColors[rideStep]}`}>{stepLabels[rideStep]}</p>
                <div className="flex gap-2 mb-4">{[0, 1, 2].map(i => <div key={i} className={`h-2 flex-1 rounded-full ${i <= rideStep ? "bg-green-400" : "bg-gray-700"}`} />)}</div>
                <div className="space-y-2">
                  <p className="text-base">{tx.passenger}: <span className="font-bold">{activeRide.name}</span></p>
                  <p className="text-base">{tx.from}: <span className="font-bold">{activeRide.from}</span> → <span className="font-bold">{activeRide.to}</span></p>
                  <p className="text-base">{tx.fare}: <span className="text-green-400 font-black text-xl">₹{activeRide.fare}</span></p>
                </div>
                {rideStep >= 2 && <button onClick={completeRide} className="w-full mt-4 bg-green-500 text-black font-black py-4 rounded-xl active:scale-95">{tx.completeRide}</button>}
              </div>
            )}
          </div>

          <div className="space-y-4">
            {/* Request queue */}
            {online && !activeRide && rideQueue.length > 0 && (
              <div className="space-y-4">
                <p className="text-sm text-gray-400 font-bold uppercase">{tx.incoming} ({rideQueue.length})</p>
                {rideQueue.map(ride => (
                  <div key={ride.id} className="bg-yellow-400/10 border border-yellow-500/40 rounded-2xl p-5">
                    <div className="flex justify-between mb-2">
                      <p className="font-black text-yellow-400 text-base">{tx.newRequest}</p>
                      <span className="text-green-400 font-black text-lg">₹{ride.fare}</span>
                    </div>
                    <p className="text-base font-bold">{ride.name}</p>
                    <p className="text-sm text-gray-400">{ride.from} → {ride.to}</p>
                    <p className="text-sm text-gray-500 mt-1">{ride.dist} km · {ride.pickup} km {tx.from}</p>
                    {wellness && ride.dist > 4 && <p className="text-sm text-blue-400 mt-2">{tx.longRideWarn}</p>}
                    <div className="flex gap-4 mt-4">
                      <button onClick={() => rejectRide(ride.id)} className="flex-1 bg-gray-800 text-red-400 font-bold py-3 rounded-xl active:scale-95">{tx.reject}</button>
                      <button onClick={() => acceptRide(ride)} className="flex-1 bg-yellow-400 text-black font-black py-3 rounded-xl active:scale-95">{tx.accept}</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {online && !activeRide && rideQueue.length === 0 && (
              <div className="text-center py-20 text-gray-600 h-full flex flex-col items-center justify-center">
                <div className="text-6xl mb-4">🔍</div>
                <p className="font-semibold text-lg">{tx.waiting}</p>
                <p className="text-base mt-2">{tx.waitingNote}</p>
              </div>
            )}

            {!online && (
              <div className="text-center py-20 text-gray-600 h-full flex flex-col items-center justify-center">
                <p className="text-7xl mb-4">😴</p>
                <p className="font-semibold text-xl">{tx.offline}</p>
                <p className="text-base mt-2">{tx.sleepNote}</p>
              </div>
            )}
          </div>
        </div>

        {/* AI Review Modal */}
        {showAI && (
          <div className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-6">
            <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-sm border border-yellow-400/20">
              <p className="font-black text-xl text-yellow-400 mb-1">{ai.title}</p>
              <p className="text-xs text-gray-500 mb-4">{ai.subtitle}</p>
              <div className="bg-gray-800 rounded-xl p-4 text-sm space-y-1 mb-4">
                <p className="text-green-400 font-bold">{ai.positives}</p>
                <p className="text-gray-300">• {ai.pos1}</p>
                <p className="text-gray-300">• {ai.pos2}</p>
                <p className="text-red-400 font-bold mt-2">{ai.improve}</p>
                <p className="text-gray-300">• {ai.imp1}</p>
                <p className="text-gray-300">• {ai.imp2}</p>
              </div>
              <div className="flex gap-3 bg-gray-800 rounded-xl p-3 mb-4">
                <div><p className="text-xs text-gray-400">{ai.currentRating}</p><p className="text-yellow-400 font-black text-xl">⭐4.5</p></div>
                <div className="flex-1 text-right"><p className="text-xs text-gray-400">{ai.ridesToday}</p><p className="text-white font-black text-xl">{rides}</p></div>
              </div>
              <button onClick={() => setShowAI(false)} className="w-full bg-yellow-400 text-black font-black py-3 rounded-xl active:scale-95">{ai.gotIt}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 12. ROOT APP
// ═══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [role, setRole]     = useState(() => { try { return localStorage.getItem("yatra_role") || null; } catch { return null; } });
  const [tab, setTab]       = useState("home");
  const [lang, setLang]     = useState(() => { try { return localStorage.getItem("yatra_lang") || "en"; } catch { return "en"; } });
  const [history, setHistory] = useState([]);
  const [passengerPos, setPassengerPos] = useState({ lat: CBE.lat, lng: CBE.lng, label: "Your Location" });
  const [drivers, setDrivers] = useState(INIT_DRIVERS);
  const [safetySettings, setSafetySettings] = useState({ emergencyShare: true, autoSOS: false, recording: true });
  const [payment, setPayment] = useState("Cash");

  // Persist lang
  useEffect(() => { try { localStorage.setItem("yatra_lang", lang); } catch {} }, [lang]);

  // Load Leaflet once globally
  useEffect(() => {
    if (window.L) return;
    const link = document.createElement("link");
    link.rel = "stylesheet"; link.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
    document.head.appendChild(link);
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
    document.head.appendChild(s);
  }, []);

  // Driver drift
  useEffect(() => {
    const t = setInterval(() => {
      setDrivers(ds => ds.map(d => ({ ...d, lat: d.lat + (Math.random() - .5) * .0006, lng: d.lng + (Math.random() - .5) * .0006 })));
    }, 2500);
    return () => clearInterval(t);
  }, []);

  function selectRole(r) { setRole(r); try { localStorage.setItem("yatra_role", r); } catch {} }
  function switchRole() { try { localStorage.removeItem("yatra_role"); } catch {} setRole(null); setTab("home"); }
  function addHistory(r) { setHistory(h => [r, ...h]); }

  const ctx = { lang, setLang, drivers, safetySettings, setSafetySettings, payment, setPayment };

  return (
    <AppContext.Provider value={ctx}>
      {/* Width constraint removed allowing elements to properly span out on desktop.
        A relative width applies instead of hardcoded 430px.
      */}
      <div style={{ width: "100%", margin: "0 auto", minHeight: "100vh", background: "#030712", position: "relative" }}>
        <style>{`
          * { box-sizing: border-box; }
          ::-webkit-scrollbar { width: 4px; }
          ::-webkit-scrollbar-track { background: #111; }
          ::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }
          @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.5} }
          .animate-pulse { animation: pulse 2s ease-in-out infinite; }
        `}</style>

        {!role
          ? <RoleScreen onSelect={selectRole} />
          : (
            <>
              {tab === "home"    && role === "passenger" && <PassengerHome onRideComplete={addHistory} />}
              {tab === "home"    && role === "driver"    && <DriverHome />}
              {tab === "map"                             && <MapScreen passengerPos={passengerPos} setPassengerPos={setPassengerPos} />}
              {tab === "rides"                           && <RidesScreen history={role === "passenger" ? history : []} />}
              {tab === "profile"                         && <ProfileScreen role={role} onSwitch={switchRole} />}
              <BottomNav tab={tab} setTab={setTab} />
            </>
          )
        }
      </div>
    </AppContext.Provider>
  );
}