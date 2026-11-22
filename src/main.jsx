import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createClient } from '@supabase/supabase-js';
import { ArrowRight, ArrowUpRight, BadgeCheck, Check, ChevronDown, Droplet, HeartHandshake, HeartPulse, MapPin, Menu, Search, ShieldCheck, X, LockKeyhole, Trash2, LogIn, LogOut, FileText, Eye, UserCheck, Phone, Quote } from 'lucide-react';
import './style.css';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://fpibnalcztfghugtpjex.supabase.co';
const supabasePublicKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_1_zray2a3tJXitgo0Yr3mg_LY8FUBPb';

// Accept a modern publishable key or a legacy JWT whose role is explicitly "anon".
// Never allow service_role or sb_secret keys into browser code.
function isSafeSupabasePublicKey(value) {
  if (typeof value !== 'string') return false;
  if (value.startsWith('sb_publishable_')) return true;
  const parts = value.split('.');
  if (parts.length !== 3) return false;
  try {
    const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const decoded = atob(payload.padEnd(Math.ceil(payload.length / 4) * 4, '='));
    return JSON.parse(decoded).role === 'anon';
  } catch {
    return false;
  }
}

const supabase = supabaseUrl && isSafeSupabasePublicKey(supabasePublicKey)
  ? createClient(supabaseUrl, supabasePublicKey)
  : null;

const copy = {
  en: {
    eyebrow:'A LOCAL DONOR DIRECTORY', title:'Find a blood donor.', titleAccent:'In Biratnagar, Morang.', intro:'Search the local directory for consenting voluntary blood donors in Biratnagar, Morang, Nepal. Filter by blood group and area, or register as a donor.', find:'Find a donor', become:'Become a donor', local:'BIRATNAGAR & NEARBY', community:'A local directory built on consent.', communityText:'BiratnagarBloodNetwork helps people find local volunteers who have agreed to be listed as blood donors. Always confirm availability and compatibility with a licensed blood bank or hospital.', donorCount:'registered donors', groups:'blood groups', mission:'local community',
    searchTitle:'Find a blood donor', searchText:'Filter consenting donors by blood group and area.', bloodGroup:'Blood group', allGroups:'All blood groups', location:'Location', locationPlaceholder:'e.g. Biratnagar, Tintolia…', searchBtn:'Search donors', available:'Available donors', noResults:'No matching donors yet', noResultsText:'Try another blood group or nearby area. Confirm donor availability and compatibility with a licensed blood bank or hospital.', demo:'Illustrative sample', demoNote:'No sample donor profiles are shown. Only actual consenting records appear after the database is connected.', registerTitle:'Your one registration could help someone.', registerText:'Join the local donor community. Your details are only listed publicly if you choose public visibility.', fullName:'Full name', phone:'Phone number', chooseGroup:'Choose blood group', area:'Your location / neighbourhood', areaPlaceholder:'e.g. Biratnagar-4, Morang', publicConsent:'Required to join the public donor directory: I agree to display my name, blood group, area and phone number so people can contact me.', registerBtn:'Register as a donor', registering:'Submitting…', registerSuccess:'Thank you for registering.', registerSuccessText:'Your donor profile has been submitted.', registerError:'Could not submit your registration. Please try again.', consentRequired:'Please agree to public listing to register as a donor.', privacy:'Your information is personal. Only register if you are comfortable sharing the selected details. You can request removal later.', needTitle:'Looking for blood?', needText:'Share the basic details of the request so the community team can help coordinate.', patientName:'Contact person name', neededGroup:'Blood group needed', units:'Units needed', hospital:'Hospital / location', hospitalPlaceholder:'Hospital name and area', needPhone:'Contact phone', requestBtn:'Submit blood request', requestSuccess:'Request submitted', requestSuccessText:'Your request has been received.', requestError:'Could not submit the request. Please try again.', awarenessEyebrow:'KNOW BEFORE YOU DONATE', awarenessTitle:'Before you donate, know the basics.', awarenessText:'Donation should be voluntary and take place only after a qualified health professional has checked your eligibility.', fact1:'Check your eligibility', fact1Text:'A health professional or blood bank staff member should assess whether you can donate today.', fact2:'Every donation is screened', fact2Text:'Donated blood is tested and handled by qualified services before it can be used.', fact3:'Ask the blood bank', fact3Text:'Blood type alone does not confirm compatibility. The hospital or blood bank must complete the required checks.', safety:'BiratnagarBloodNetwork is a community connection platform, not a blood bank or medical service. Donor availability, eligibility and blood compatibility must be confirmed by a licensed blood bank or hospital.', footerLine:'A stronger community, one connection at a time.', about:'About', directory:'Find donors', awareness:'Awareness', contact:'Contact', menu:'Menu', live:'Community connection platform', privacyTitle:'Your privacy matters', privacyText:'Donor contact details are shown only when the donor explicitly agrees. Never share another person’s details without their permission.', coordinator:'For urgent medical needs, contact a licensed blood bank or hospital directly.', needHelp:'Need blood', donorForm:'Donor registration', online:'Live directory', preview:'Preview mode', backendMissing:'Live registration and donor search will activate after the secure database is connected.', requestConsent:'I confirm this request is being submitted with the contact person’s permission.'
  },
  ne: {
    eyebrow:'स्थानीय रक्तदाता सूची', title:'रक्तदाता खोज्नुहोस्,', titleAccent:'विराटनगर, मोरङमा।', intro:'विराटनगर र आसपासका सहमतिसहित दर्ता भएका रक्तदाता सजिलै खोज्नुहोस्। रक्त समूह र स्थान छानेर खोजी गर्नुहोस् वा रक्तदाताका रूपमा दर्ता हुनुहोस्।', find:'मलाई रगत चाहिन्छ', become:'म रक्तदाता हुँ', local:'विराटनगर तथा आसपास', community:'सहमति र विश्वासमा आधारित स्थानीय सूची।', communityText:'विराटनगर रक्तदाता सञ्जालले सार्वजनिक सूचीमा रहन सहमति दिएका स्थानीय रक्तदातासँग सम्पर्क गर्न सहज बनाउँछ। रक्तदाताको उपलब्धता र अनुकूलता मान्यता प्राप्त रक्तसञ्चार केन्द्र वा अस्पतालबाट पुष्टि गर्नुहोस्।', donorCount:'दर्ता भएका रक्तदाता', groups:'रक्त समूह', mission:'एउटै साझा उद्देश्य',
    searchTitle:'रक्तदाता खोज्नुहोस्', searchText:'रक्त समूह र स्थानका आधारमा जाँच गरिएका, सहमति दिएका रक्तदाता खोज्नुहोस्।', bloodGroup:'रक्त समूह', allGroups:'सबै रक्त समूह', location:'स्थान', locationPlaceholder:'जस्तै: विराटनगर, टिनटोलिया…', searchBtn:'खोज्नुहोस्', available:'उपलब्ध', noResults:'मिल्दो रक्तदाता भेटिएन', noResultsText:'अर्को रक्त समूह वा नजिकको स्थान छानेर खोज्नुहोस्। रक्तदाताको उपलब्धता र अनुकूलता मान्यता प्राप्त रक्तसञ्चार केन्द्र वा अस्पतालबाट पुष्टि गर्नुहोस्।', demo:'उदाहरण मात्र', demoNote:'नमुना रक्तदाता विवरण देखाइँदैन। डाटाबेस जडान भएपछि सहमति दिएका वास्तविक विवरण मात्र देखाइनेछन्।', registerTitle:'तपाईंको दर्ताले कसैलाई आशा दिन सक्छ।', registerText:'स्थानीय रक्तदाता समुदायमा जोडिनुहोस्। तपाईंले सार्वजनिक देखाउन सहमति दिएमा मात्र विवरण सूचीमा देखाइनेछ।', fullName:'पूरा नाम', phone:'मोबाइल नम्बर', chooseGroup:'रक्त समूह छान्नुहोस्', area:'ठेगाना / स्थान', areaPlaceholder:'जस्तै: विराटनगर-४, मोरङ', publicConsent:'सार्वजनिक रक्तदाता सूचीमा दर्ता हुन अनिवार्य: मानिसहरूले मसँग सम्पर्क गर्न सकून् भनेर मेरो नाम, रक्त समूह, स्थान र फोन नम्बर सार्वजनिक देखाउन म सहमत छु।', registerBtn:'रक्तदाताका रूपमा दर्ता गर्नुहोस्', registering:'पठाउँदै…', registerSuccess:'धन्यवाद! तपाईंको नाम सुरक्षित भयो।', registerSuccessText:'तपाईंको रक्तदाता विवरण पठाइएको छ।', registerError:'दर्ता पठाउन सकिएन। कृपया फेरि प्रयास गर्नुहोस्।', consentRequired:'रक्तदाताका रूपमा दर्ता हुन सार्वजनिक सूचीको सहमति आवश्यक छ।', privacy:'तपाईंको विवरण व्यक्तिगत हो। सार्वजनिक रूपमा देखाउन सहज भएमा मात्र दर्ता गर्नुहोस्। पछि हटाउन अनुरोध गर्न सक्नुहुन्छ।', needTitle:'रगत आवश्यक छ?', needText:'समन्वयमा सहयोग गर्न आवश्यक आधारभूत विवरण पठाउनुहोस्।', patientName:'सम्पर्क व्यक्तिको नाम', neededGroup:'आवश्यक रक्त समूह', units:'कति पिन्ट चाहिएको', hospital:'अस्पताल / स्थान', hospitalPlaceholder:'अस्पतालको नाम र स्थान', needPhone:'सम्पर्क फोन', requestBtn:'रक्त अनुरोध पठाउनुहोस्', requestSuccess:'अनुरोध पठाइयो', requestSuccessText:'तपाईंको अनुरोध प्राप्त भएको छ।', requestError:'अनुरोध पठाउन सकिएन। फेरि प्रयास गर्नुहोस्।', awarenessEyebrow:'रक्तदान गर्नुअघि जानौँ', awarenessTitle:'रक्तदान गर्नुअघि जान्नुपर्ने कुरा।', awarenessText:'रक्तदान स्वैच्छिक हुनुपर्छ। रक्तदान गर्नुअघि स्वास्थ्यकर्मीबाट आफ्नो योग्यता जाँच गराउनुहोस्।', fact1:'योग्यता जाँच गराउनुहोस्', fact1Text:'आज रक्तदान गर्न मिल्छ कि मिल्दैन भन्ने कुरा स्वास्थ्यकर्मी वा रक्तसञ्चार केन्द्रले जाँच गर्नुपर्छ।', fact2:'रगत परीक्षण गरिन्छ', fact2Text:'प्रयोग गर्नुअघि दान गरिएको रगत सम्बन्धित सेवाबाट परीक्षण र व्यवस्थापन गरिन्छ।', fact3:'रक्तसञ्चार केन्द्रसँग बुझ्नुहोस्', fact3Text:'रक्त समूह मिल्दैमा रगत सुरक्षित रूपमा मिल्छ भन्ने हुँदैन। आवश्यक परीक्षण अस्पताल वा रक्तसञ्चार केन्द्रले गर्नुपर्छ।', safety:'विराटनगर रक्तदाता सञ्जाल रक्तदाता र आवश्यक पर्ने व्यक्तिबीच सम्पर्क गराउने समुदायिक माध्यम हो, रक्तसञ्चार केन्द्र वा चिकित्सा सेवा होइन। रक्तदाताको उपलब्धता, योग्यता र रगतको अनुकूलता मान्यता प्राप्त रक्तसञ्चार केन्द्र वा अस्पतालबाट पुष्टि गर्नुपर्छ।', footerLine:'समुदायको साथ, हरेक सम्पर्कमा नयाँ आशा।', about:'हाम्रो बारेमा', directory:'रक्तदाताको सूची', awareness:'जनचेतना', contact:'सम्पर्क', menu:'मेनु', live:'समुदायिक सम्पर्क माध्यम', privacyTitle:'तपाईंको गोपनीयता महत्त्वपूर्ण छ', privacyText:'रक्तदाताले स्पष्ट सहमति दिएमा मात्र सम्पर्क विवरण सार्वजनिक देखाइन्छ। अनुमति बिना अरूको विवरण साझा नगर्नुहोस्।', coordinator:'तत्काल स्वास्थ्य आवश्यकताका लागि मान्यता प्राप्त रक्तसञ्चार केन्द्र वा अस्पतालमा सिधै सम्पर्क गर्नुहोस्।', needHelp:'मलाई रगत चाहिन्छ', donorForm:'रक्तदाता दर्ता', online:'प्रत्यक्ष सूची', preview:'पूर्वावलोकन', backendMissing:'सुरक्षित डाटाबेस जोडिएपछि मात्र प्रत्यक्ष दर्ता र रक्तदाता खोजी सुरु हुनेछ।', requestConsent:'सम्पर्क व्यक्तिको सहमतिमा यो अनुरोध पठाइएको हो भन्ने म पुष्टि गर्छु।'
  }
};

const localGuideCopy = {
  en: {
    heading: 'Blood donors in Biratnagar, Morang',
    intro: 'BiratnagarBloodNetwork is a local directory that helps people look for consenting voluntary blood donors by blood group and area. It connects people with listed volunteers; it is not a blood bank or emergency medical service.',
    guideCards: [
      { title: 'Search by blood group and area', body: 'Choose the blood group you are looking for, then enter a city, ward or neighbourhood to narrow the directory. The directory supports all eight common ABO and Rh blood groups: A+, A−, B+, B−, AB+, AB−, O+ and O−.' },
      { title: 'Biratnagar and nearby locations', body: 'The registration form includes Biratnagar wards 1–19, Itahari, Rangeli and other areas of Morang, along with an option for another location. Listings depend on volunteers who choose to register; a location option does not mean a donor is currently available there.' },
      { title: 'Contact and confirm availability', body: 'Use the contact request on a donor listing rather than relying on an old phone number. Donor availability can change. Always confirm current availability and blood compatibility with a licensed blood bank or hospital before making arrangements.' }
    ],
    faqHeading: 'Questions about finding blood donors',
    faqIntro: 'A few practical details about using this community donor directory.',
    faqCards: [
      { title: 'Does the directory guarantee a donor is available?', body: 'No. It shows public listings from volunteers who have agreed to be included. Listings can change, and the site cannot guarantee that a donor is available for a particular request.' },
      { title: 'Are donor phone numbers shown openly?', body: 'Yes. Donors who explicitly consent have their phone number shown on their public card. Tapping it opens the phone dialler. Contact only for genuine blood-donation needs and respect donor privacy.' },
      { title: 'Can I register as a voluntary donor?', body: 'Yes. Use the donor registration form and provide your own details. The registration form collects your name, phone, blood group, area, age, weight and self-reported blood donation history. Age and weight are kept private; public cards show only the details covered by your consent. Register only with your own details if you agree to the form’s stated consent terms.' }
    ]
  },
  ne: {
    heading: 'विराटनगर, मोरङमा रक्तदाता खोज्नुहोस्',
    intro: 'विराटनगर रक्तदाता सञ्जाल रक्त समूह र स्थानका आधारमा सहमति दिएका स्वैच्छिक रक्तदाता खोज्न सहयोग गर्ने स्थानीय सूची हो। यसले रक्तदाता र आवश्यक पर्ने व्यक्तिबीच सम्पर्क गराउँछ; यो रक्तसञ्चार केन्द्र वा आकस्मिक चिकित्सा सेवा होइन।',
    guideCards: [
      { title: 'रक्त समूह र स्थान छानेर खोज्नुहोस्', body: 'आवश्यक रक्त समूह छान्नुहोस् र सूची छोट्याउन सहर, वडा वा टोल लेख्नुहोस्। सूचीमा A+, A−, B+, B−, AB+, AB−, O+ र O− गरी आठै रक्त समूह समावेश छन्।' },
      { title: 'विराटनगर र आसपासका स्थान', body: 'दर्ता फाराममा विराटनगरका वडा १–१९, इटहरी, रंगेली, मोरङका अन्य क्षेत्र र अन्य स्थान छान्ने विकल्प छन्। ती स्थानमा रक्तदाता उपलब्ध छन् भन्ने ग्यारेन्टी होइन; सहमतिसहित दर्ता भएका व्यक्तिका विवरण मात्र देखिन्छन्।' },
      { title: 'सम्पर्क गरेर उपलब्धता पुष्टि गर्नुहोस्', body: 'पुरानो फोन नम्बरमा भर नपरी रक्तदाता सूचीमा रहेको सम्पर्क अनुरोध प्रयोग गर्नुहोस्। उपलब्धता परिवर्तन हुन सक्छ। व्यवस्था गर्नुअघि मान्यता प्राप्त रक्तसञ्चार केन्द्र वा अस्पतालबाट उपलब्धता र रगतको अनुकूलता पुष्टि गर्नुहोस्।' }
    ],
    faqHeading: 'रक्तदाता खोज्नेबारे सामान्य प्रश्न',
    faqIntro: 'स्थानीय रक्तदाता सूची प्रयोग गर्दा जान्नुपर्ने केही कुरा।',
    faqCards: [
      { title: 'के सूचीले रक्तदाता उपलब्ध हुने ग्यारेन्टी गर्छ?', body: 'गर्दैन। यसमा सार्वजनिक सूचीमा रहन सहमति दिएका रक्तदाताका विवरण देखिन्छन्। उपलब्धता परिवर्तन हुन सक्छ र कुनै विशेष अनुरोधका लागि रक्तदाता उपलब्ध हुने ग्यारेन्टी छैन।' },
      { title: 'के रक्तदाताको फोन नम्बर सबैले देख्न सक्छन्?', body: 'सक्छन्। स्पष्ट सहमति दिएका रक्तदाताको फोन नम्बर सार्वजनिक कार्डमा देखाइन्छ। नम्बर थिच्दा फोन गर्ने विकल्प खुल्छ। वास्तविक रक्तदान आवश्यकताका लागि मात्र सम्पर्क गर्नुहोस् र गोपनीयताको सम्मान गर्नुहोस्।' },
      { title: 'के म स्वैच्छिक रक्तदाताका रूपमा दर्ता हुन सक्छु?', body: 'सक्नुहुन्छ। रक्तदाता दर्ता फाराममा आफ्नै विवरण राख्नुहोस्। दर्ता फाराममा नाम, फोन, रक्त समूह, स्थान, उमेर, तौल र आफूले दिएको रक्तदान इतिहास मागिन्छ। उमेर र तौल गोप्य राखिन्छ; सार्वजनिक कार्डमा सहमतिमा समेटिएका विवरण मात्र देखाइन्छ। फाराममा उल्लेख गरिएको सहमतिमा राजी हुनुहुन्छ भने मात्र आफ्नै विवरण राखेर दर्ता गर्नुहोस्।' }
    ]
  }
};

const bloodGroups = ['A+','A-','B+','B-','AB+','AB-','O+','O-'];
const normalizeNepalPhone = value => {
  const nepaliDigits = '०१२३४५६७८९';
  let digits = String(value || '').replace(/[०-९]/g, digit => String(nepaliDigits.indexOf(digit))).replace(/\D/g, '');
  if (digits.startsWith('977') && digits.length === 13) digits = digits.slice(3);
  if (digits.startsWith('0') && digits.length === 11) digits = digits.slice(1);
  return /^9[0-9]{9}$/.test(digits) ? digits : '';
};

const blockedNameWords = new Set(['fuck','shit','bitch','asshole','bastard','dick','pussy','cunt','motherfucker','slut','whore','nigger','faggot','muji','machikne','randi','chikne','मुजी','माचिक्ने','राँडी','चिक्ने']);
const placeholderNames = new Set(['test','testing','asdf','asdfgh','qwerty','unknown','admin','name','xxxx','xxxxx']);
function cleanAndValidateDonorName(value) {
  const name = String(value || '').trim().replace(/\s+/g, ' ');
  if (name.length < 2 || name.length > 60) return '';
  if (!/^[\p{L}][\p{L}\p{M} .'-]{1,59}$/u.test(name)) return '';
  if (/(.)\1{4,}/iu.test(name)) return '';
  const words = name.toLocaleLowerCase().split(/[\s.'-]+/u);
  if (words.some(word => blockedNameWords.has(word) || placeholderNames.has(word))) return '';
  return name;
}

function App() {
  const [lang,setLang] = useState(() => { try { return localStorage.getItem('rakta-language-v2') || 'en'; } catch { return 'en'; } });
  const [mobileMenu,setMobileMenu] = useState(false);
  const [group,setGroup] = useState('all');
  const [searchLocation,setSearchLocation] = useState('');
  
  const [donors,setDonors] = useState([]);
  const [loading,setLoading] = useState(false);
  const [searchDone,setSearchDone] = useState(false);
  const [searchError,setSearchError] = useState(false);
  const [donorForm,setDonorForm] = useState({name:'',phone:'',blood_group:'',location:'',over_18:'',weight_kg:'',has_donated:false,last_donation_date:'',consent:false});
  const [donorStatus,setDonorStatus] = useState('');
  const [submitting,setSubmitting] = useState(false);
  const [session,setSession] = useState(null);
  const [adminEmail,setAdminEmail] = useState('');
  const [adminPassword,setAdminPassword] = useState('');
  const [adminMessage,setAdminMessage] = useState('');
  const [adminDonors,setAdminDonors] = useState([]);
  const [adminLoading,setAdminLoading] = useState(false);
  const [contactingDonor,setContactingDonor] = useState('');
  const [contactError,setContactError] = useState('');
  const [isAdmin,setIsAdmin] = useState(false);
  const [privacyOpen,setPrivacyOpen] = useState(false);
  const t = copy[lang];
  const localGuide = localGuideCopy[lang];
  useEffect(() => { document.documentElement.lang = lang; document.title = lang === 'ne' ? 'विराटनगर रक्तदाता सञ्जाल | विराटनगरमा रक्तदाता खोज्नुहोस्' : 'Biratnagar Blood Donors | BiratnagarBloodNetwork'; try { localStorage.setItem('rakta-language-v2',lang); } catch {} }, [lang]);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({data}) => setSession(data.session));
    const {data:{subscription}} = supabase.auth.onAuthStateChange((_event,nextSession) => setSession(nextSession));
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session && supabase) loadAdminData();
    else { setIsAdmin(false); setAdminDonors([]); }
  }, [session]);

  async function loadAdminData() {
    setAdminLoading(true); setAdminMessage('');
    const {data:adminCheck,error:adminError} = await supabase.rpc('is_admin');
    if (adminError || !adminCheck) {
      setIsAdmin(false);
      setAdminMessage('This account is not authorised as an administrator.');
      setAdminLoading(false); return;
    }
    setIsAdmin(true);
    let {data:donorData,error:donorError} = await supabase.rpc('admin_list_donors');
    // Compatibility while the privacy migration is being applied; the database RLS still controls this fallback.
    if (donorError) ({data:donorData,error:donorError} = await supabase.from('donors').select('id,name,phone,blood_group,location,public_listing,is_available,is_approved,created_at').order('created_at',{ascending:false}));
    if (donorError) setAdminMessage('Could not load donor records. Check the database policies.');
    setAdminDonors(donorData || []);
    setAdminLoading(false);
  }

  async function adminLogin(e) {
    e.preventDefault(); setAdminMessage('');
    const {error} = await supabase.auth.signInWithPassword({email:adminEmail.trim(),password:adminPassword});
    if (error) setAdminMessage('Login failed. Check your email and password.');
    else setAdminPassword('');
  }

  async function adminLogout() {
    await supabase.auth.signOut(); setAdminMessage('You have been signed out.');
  }

  async function adminDeleteDonor(id) {
    if (!window.confirm('Remove this donor record permanently?')) return;
    const {error} = await supabase.from('donors').delete().eq('id',id);
    if (error) setAdminMessage('Could not remove this donor. Check administrator access.');
    else { setAdminDonors(rows=>rows.filter(row=>row.id!==id)); searchDonors(); }
  }


  async function adminToggleAvailability(donor) {
    const {error} = await supabase.from('donors').update({is_available:!donor.is_available}).eq('id',donor.id);
    if (error) setAdminMessage('Could not update donor status.');
    else { setAdminDonors(rows=>rows.map(row=>row.id===donor.id?{...row,is_available:!row.is_available}:row)); searchDonors(); }
  }
  async function adminToggleApproval(donor) {
    const nextApproval = !donor.is_approved;
    const {error} = await supabase.from('donors').update({is_approved:nextApproval}).eq('id',donor.id);
    if (error) setAdminMessage('Could not update the review status.');
    else {
      setAdminDonors(rows=>rows.map(row=>row.id===donor.id?{...row,is_approved:nextApproval}:row));
      searchDonors();
    }
  }

  async function contactDonor(donor) {
    if (!supabase || !donor?.id) return;
    setContactError('');
    setContactingDonor(donor.id);
    try {
      let requestToken = sessionStorage.getItem('brtblood-contact-session');
      if (!requestToken) {
        requestToken = crypto.randomUUID();
        sessionStorage.setItem('brtblood-contact-session', requestToken);
      }
      const {data,error} = await supabase.rpc('request_donor_contact', {
        p_donor_id: donor.id,
        p_request_token: requestToken
      });
      if (error || !data) throw error || new Error('Contact unavailable');
      window.location.href = `tel:${data}`;
    } catch (error) {
      setContactError('Contact details are temporarily unavailable. Please try again later or contact a local hospital.');
    } finally {
      setContactingDonor('');
    }
  }

  async function searchDonors(e) {
    e?.preventDefault();
    setLoading(true); setSearchDone(true); setSearchError(false);
    if (!supabase) {
      setDonors([]);
      setLoading(false); return;
    }
    let query = supabase.from('donors').select('id,name,phone,blood_group,location,has_donated,last_donation_date,is_available,created_at').eq('is_available',true).eq('public_listing',true).eq('is_approved',true).order('created_at',{ascending:false});
    if (group !== 'all') query = query.eq('blood_group',group);
    if (searchLocation.trim()) query = query.ilike('location',`%${searchLocation.trim()}%`);
    const {data,error} = await query.limit(60);
    setDonors(error ? [] : (data || []));
    setSearchError(Boolean(error));
    setLoading(false);
  }

  async function submitDonor(e) {
    e.preventDefault(); setDonorStatus('');
    if (!supabase) { setDonorStatus('offline'); return; }
    const cleanPhone = normalizeNepalPhone(donorForm.phone);
    const cleanName = cleanAndValidateDonorName(donorForm.name);
    if (!cleanName) { setDonorStatus('invalidName'); return; }
    if (!cleanPhone) { setDonorStatus('invalidPhone'); return; }
    const weight = Number(donorForm.weight_kg);
    if (donorForm.over_18 !== 'yes') { setDonorStatus('invalidAge'); return; }
    if (!Number.isFinite(weight) || weight < 45 || weight > 250) { setDonorStatus('invalidWeight'); return; }
    if (donorForm.has_donated && !donorForm.last_donation_date) { setDonorStatus('missingDonationDate'); return; }
    if (!donorForm.has_donated && donorForm.last_donation_date) { setDonorStatus('invalidDonationHistory'); return; }
    if (donorForm.last_donation_date && donorForm.last_donation_date > new Date().toISOString().slice(0,10)) { setDonorStatus('invalidDonationHistory'); return; }
    if (!donorForm.blood_group) { setDonorStatus('invalidBloodGroup'); return; }
    if (!donorForm.consent) { setDonorStatus('consentRequired'); return; }
    setSubmitting(true);
    try {
      const {error} = await supabase.from('donors').insert({
        name:cleanName,
        phone:cleanPhone,
        blood_group:donorForm.blood_group,
        location:donorForm.location.trim(),
        over_18:true,
        weight_kg:weight,
        has_donated:donorForm.has_donated,
        last_donation_date:donorForm.has_donated ? donorForm.last_donation_date : null,
        public_listing:donorForm.consent,
        is_available:true,
        is_approved:donorForm.consent
      });
      if (error) throw error;
      setDonorStatus('success');
      setDonorForm({name:'',phone:'',blood_group:'',location:'',over_18:'',weight_kg:'',has_donated:false,last_donation_date:'',consent:false});
      // Refresh the public directory immediately after a successful opt-in registration.
      await searchDonors();
    } catch (error) {
      console.error('Donor registration failed:', error);
      setDonorStatus('error');
    } finally {
      setSubmitting(false);
    }
  }


  // Load the live public directory automatically when visitors open the site.
  useEffect(() => {
    if (supabase) searchDonors();
  }, []);

  const displayed = donors;
  const scrollTo = id => { document.getElementById(id)?.scrollIntoView({behavior:'smooth'}); setMobileMenu(false); };
  const toNepaliDigits = value => String(value).replace(/[0-9]/g, digit => '०१२३४५६७८९'[Number(digit)]);
  const locations = [
    ...Array.from({length:19},(_,index) => {
      const ward = index + 1;
      return {value:`Biratnagar-${ward} / विराटनगर-${toNepaliDigits(ward)}`,en:`Biratnagar-${ward}`,ne:`विराटनगर-${toNepaliDigits(ward)}`};
    }),
    {value:'Itahari / इटहरी',en:'Itahari',ne:'इटहरी'},
    {value:'Rangeli / रंगेली',en:'Rangeli',ne:'रंगेली'},
    {value:'Other areas of Morang / मोरङका अन्य क्षेत्र',en:'Other areas of Morang',ne:'मोरङका अन्य क्षेत्र'},
    {value:'Other location / अन्य स्थान',en:'Other location',ne:'अन्य स्थान'}
  ];

  const isPrivateAdminRoute = window.location.pathname === '/raktasetu-control-8f4c2d91';

  return <div className="site-shell">
    {!isPrivateAdminRoute && <>
    <div className="topline"><div className="container topline-inner"><span><span className="pulse"></span>{t.live}</span><span className="topline-right"><MapPin size={13}/> Biratnagar, Nepal <span className="top-divider"></span><div className="language-switch"><button className={lang==='ne'?'active':''} onClick={()=>setLang('ne')}>नेपाली</button><span>|</span><button className={lang==='en'?'active':''} onClick={()=>setLang('en')}>English</button></div></span></div></div>
    <header className="header"><div className="container nav-wrap">
      <a className="brand" href="#" onClick={e=>{e.preventDefault();scrollTo('home')}}><span className="brand-mark"><Droplet size={24} fill="currentColor"/></span><span><strong>{lang==='ne'?'विराटनगर रक्तदाता सञ्जाल':'BiratnagarBloodNetwork'}</strong><small>{lang==='ne'?'विराटनगर, नेपाल':'BIRATNAGAR, NEPAL'}</small></span></a>
      <nav className={mobileMenu?'nav-links open':'nav-links'}><button onClick={()=>scrollTo('home')}>{lang==='ne'?'गृहपृष्ठ':'Home'}</button><button className="nav-register" onClick={()=>scrollTo('donate')}>{lang==='ne'?'रक्तदाता दर्ता':'Donor Registration'}</button><button onClick={()=>scrollTo('find')}>{lang==='ne'?'रक्तदाता खोज्नुहोस्':'Find Donors'}</button><button onClick={()=>scrollTo('awareness')}>{lang==='ne'?'रक्तदान जानकारी':'Donation Info'}</button><button onClick={()=>scrollTo('about')}>{t.about}</button><button onClick={()=>scrollTo('privacy')}>{lang==='en'?'Privacy':'गोपनीयता'}</button><button className="nav-cta" onClick={()=>scrollTo('donate')}>{t.become}<ArrowUpRight size={15}/></button></nav>
      <button className="mobile-toggle" onClick={()=>setMobileMenu(!mobileMenu)} aria-label="Toggle menu">{mobileMenu?<X/>:<Menu/>}</button>
    </div></header>

    <main>
      <section className="directory-section section-pad" id="find"><div className="container"><div className="section-heading"><div><div className="section-kicker">{lang==='ne'?'०१ / रक्तदाताको सूची':'01 / THE DIRECTORY'}</div><h2>{t.searchTitle}</h2><p>{t.searchText}</p></div><div className="section-number">02</div></div>
        <form className="search-panel portal-search" onSubmit={searchDonors}><div className="field"><label>{t.bloodGroup}</label><div className="select-wrap"><Droplet size={16}/><select value={group} onChange={e=>setGroup(e.target.value)}><option value="all">{t.allGroups}</option>{bloodGroups.map(g=><option key={g}>{g}</option>)}</select><ChevronDown size={15}/></div></div><div className="field"><label>{t.location}</label><input value={searchLocation} onChange={e=>setSearchLocation(e.target.value)} placeholder={lang==='ne'?'विराटनगर, वडा वा टोल लेख्नुहोस्':'Enter city, ward or area'}/></div><button className="button button-red search-submit" type="submit"><Search size={17}/>{t.searchBtn}</button></form>
        <div className="directory-meta"><div><span className="status-dot"></span><strong>{t.available}</strong><span className="meta-count">{searchDone?displayed.length:0}</span></div><span className="sample-label">{!supabase?t.demo:t.online}</span></div>
        {!supabase && <div className="preview-notice"><span><ShieldCheck size={16}/></span><div><strong>{t.preview}</strong><p>{t.backendMissing} {t.demoNote}</p></div></div>}
        {contactError && <div className="form-message error" role="status">{contactError}</div>}{loading ? <div className="empty-state">Loading…</div> : searchError ? <div className="empty-state"><h3>{lang==='ne'?'सूची उपलब्ध छैन':'Directory temporarily unavailable'}</h3><p>{lang==='ne'?'डाटाबेस जडान वा अनुमति जाँच गर्न प्रशासकलाई सम्पर्क गर्नुहोस्।':'Please ask the site administrator to check the database connection and permissions.'}</p></div> : displayed.length ? <div className="donor-grid">{displayed.map(d=><article className="donor-card" key={d.id}><div className="donor-card-top"><div className="blood-badge">{d.blood_group}</div><span className="available-tag"><span></span>{t.available}</span></div><h3>{d.name}</h3><p className="donor-location"><MapPin size={15}/>{d.location}</p><a className="donor-phone-preview donor-phone-link" href={`tel:${d.phone}`} aria-label={`${lang==='ne'?'फोन गर्नुहोस्':'Call'} ${d.name}`}><Phone size={15}/><span>{d.phone}</span><small>{lang==='ne'?'फोन गर्न थिच्नुहोस्':'Tap the number to call'}</small></a>{d.has_donated===true&&d.last_donation_date?<p className="donor-last-donation">{lang==='ne'?'अन्तिम रक्तदान मिति (स्वयंले दिएको जानकारी):':'Last blood donation (self-reported):'} {new Date(`${d.last_donation_date}T00:00:00`).toLocaleDateString(lang==='ne'?'ne-NP':'en-GB')}</p>:d.has_donated===false?<p className="donor-last-donation">{lang==='ne'?'पहिलो पटक रक्तदान गर्न इच्छुक':'First-time donor (self-reported)'}</p>:<p className="donor-last-donation">{lang==='ne'?'रक्तदान इतिहास उपलब्ध छैन':'Donation history not provided'}</p>}<span className="card-caption">{lang==='ne'?'पहिले अस्पतालसँग उपलब्धता पुष्टि गर्नुहोस्':'Please confirm availability with the hospital'}</span></article>)}</div> : searchDone ? <div className="empty-state"><div className="empty-icon"><Search size={23}/></div><h3>{t.noResults}</h3><p>{t.noResultsText}</p></div> : <div className="empty-state search-prompt"><div className="empty-icon"><Search size={23}/></div><h3>{lang==='ne'?'रक्त समूह र स्थान छान्नुहोस्':'Choose a blood group and area'}</h3><p>{lang==='ne'?'मिल्दो रक्तदाता हेर्न माथिको खोजी प्रयोग गर्नुहोस्।':'Use the search above to see matching registered donors.'}</p></div>}
      </div></section>

      <section className="hero" id="home"><div className="hero-grid"></div><div className="container hero-content">
        <div className="hero-copy"><div className="eyebrow"><span className="eyebrow-line"></span>{t.eyebrow}</div><h1>{t.title}<br/><em>{t.titleAccent}</em></h1><p className="hero-intro">{t.intro}</p><div className="hero-actions"><button className="button button-light" onClick={()=>scrollTo('find')}>{lang==='ne'?'रक्तदाता खोज्नुहोस्':'Find a Donor'}<Search size={17}/></button></div><div className="hero-proof"><div className="proof-icon"><HeartHandshake size={18}/></div><span>{t.local}</span><span className="proof-dot"></span><span>{lang==='ne'?'स्वैच्छिक · सहमतिमा आधारित':'VOLUNTARY · CONSENT-BASED'}</span></div></div>

      <aside className="hero-directory-card" aria-label="Blood group directory preview"><div className="directory-card-top"><span className="directory-card-mark"><Droplet size={17}/></span><span>LOCAL DONOR DIRECTORY</span></div><div className="directory-card-place"><MapPin size={15}/><span>BIRATNAGAR, NEPAL</span></div><h2>{lang==='ne'?'आठ रक्त समूह':'Eight blood groups'}</h2><p>{lang==='ne'?'आफूलाई चाहिएको समूह छानेर खोजी सुरु गर्नुहोस्।':'Select the blood group you are looking for to begin.'}</p><div className="hero-blood-groups">{bloodGroups.map(g=><span key={g}>{g}</span>)}</div><div className="directory-card-foot"><ShieldCheck size={15}/><span>{lang==='ne'?'सहमति दिएका रक्तदाता मात्र':'Consenting donors only'}</span></div></aside></div><div className="hero-bottom"><div className="container hero-bottom-inner"><span>01 — CONNECT</span><span>02 — SUPPORT</span><span>03 — SAVE LIVES</span><span className="hero-bottom-caption">A LOCAL INITIATIVE FOR BIRATNAGAR</span></div></div></section>

      <section className="campaign-section" id="campaigns">
        <div className="container">
          <div className="campaign-heading">
            <div>
              <div className="section-kicker">{lang==='ne'?'०२ / रक्तदान जनचेतना':'02 / BLOOD DONATION AWARENESS'}</div>
              <h2>{lang==='ne'?'रक्तदानको महत्व बुझौँ।':'Every donation makes a difference.'}</h2>
              <p>{lang==='ne'?'रक्तदानबारे जानकारी फैलाऔँ र जीवन बचाउने अभियानमा साथ दिऔँ।':'Explore our blood donation awareness campaigns and help spread the message across Biratnagar.'}</p>
            </div>
            <span className="campaign-count">01 — 02</span>
          </div>
          <div className="campaign-grid">
            <article className="campaign-card">
              <div className="campaign-image-wrap"><img src="./10170cd7-bd22-4b0d-aab4-f03464970431.jpg" alt={lang==='ne'?'रक्तदानको महत्व र रगतको थैली':'Blood donation awareness poster featuring a blood bag'} loading="lazy"/></div>
              <div className="campaign-card-caption"><span>CAMPAIGN 01</span><h3>{lang==='ne'?'रगतको आवश्यकता र रक्तदानको महत्व':'Why every blood donation matters'}</h3></div>
            </article>
            <article className="campaign-card">
              <div className="campaign-image-wrap"><img src="./f39a2f8d-2b61-490b-9eb5-6bd98de1fccb.jpg" alt={lang==='ne'?'माया र सहयोगमार्फत रक्तदानको सन्देश':'A heartfelt blood donation awareness poster'} loading="lazy"/></div>
              <div className="campaign-card-caption"><span>CAMPAIGN 02</span><h3>{lang==='ne'?'एक थोपा रगत, जीवनभरको आशा':'A small act. A lasting impact.'}</h3></div>
            </article>
          </div>
        </div>
      </section>



      <section className="action-section" id="donate"><div className="container action-layout"><div className="action-copy"><div className="section-kicker light-kicker">{lang==='ne'?'०३ / समुदायमा जोडिनुहोस्':'03 / JOIN THE COMMUNITY'}</div><h2>{t.registerTitle}</h2><p>{t.registerText}</p><div className="action-aside"><ShieldCheck size={19}/><span>{t.privacyTitle}<small>{t.privacyText}</small></span></div><div className="action-aside"><HeartPulse size={19}/><span>{t.coordinator}</span></div></div><div className="form-card"><div className="form-card-head"><div><span className="form-step">{lang==='ne'?'चरण १ — व्यक्तिगत विवरण':'STEP 1 — DONOR DETAILS'}</span><h3>{t.donorForm}</h3></div><span className="form-icon"><Droplet size={22}/></span></div><form onSubmit={submitDonor} className="stack-form"><div className="field"><label>{t.fullName}</label><input required minLength="2" maxLength="60" autoComplete="name" value={donorForm.name} onChange={e=>setDonorForm({...donorForm,name:e.target.value})} placeholder={lang==='ne'?'पूरा नाम लेख्नुहोस्':'Enter your genuine full name'}/></div>
      <div className="form-row"><div className="field"><label>{lang==='ne'?'के तपाईं १८ वर्ष वा सोभन्दा माथि हुनुहुन्छ?':'Are you 18 or older?'}</label><select required value={donorForm.over_18} onChange={e=>setDonorForm({...donorForm,over_18:e.target.value})}><option value="">{lang==='ne'?'छान्नुहोस्':'Choose yes or no'}</option><option value="yes">{lang==='ne'?'हो':'Yes'}</option><option value="no">{lang==='ne'?'होइन':'No'}</option></select></div><div className="field"><label>{lang==='ne'?'तपाईंको तौल (केजीमा)':'Your weight (kg)'}</label><input required type="number" max="250" step="0.1" value={donorForm.weight_kg} onChange={e=>setDonorForm({...donorForm,weight_kg:e.target.value})} placeholder="e.g. 50"/></div></div><div className="form-row"><div className="field"><label>{t.phone}</label><input required type="tel" maxLength="20" value={donorForm.phone} onChange={e=>setDonorForm({...donorForm,phone:e.target.value})} placeholder={lang==='ne'?'९८XXXXXXXX':'98XXXXXXXX'}/></div><div className="field"><label>{t.bloodGroup}</label><div className="blood-picker">{bloodGroups.map(g=><button type="button" key={g} className={donorForm.blood_group===g?'blood-choice selected':'blood-choice'} aria-pressed={donorForm.blood_group===g} onClick={()=>setDonorForm({...donorForm,blood_group:g})}>{g}</button>)}</div></div></div><div className="field"><label>{lang==='ne'?'के तपाईंले पहिले रक्तदान गर्नुभएको छ?':'Have you donated blood before?'}</label><select required value={donorForm.has_donated?'yes':'no'} onChange={e=>setDonorForm({...donorForm,has_donated:e.target.value==='yes',last_donation_date:''})}><option value="no">{lang==='ne'?'छैन, पहिलो पटक':'No, first-time donor'}</option><option value="yes">{lang==='ne'?'छ':'Yes'}</option></select></div>
      {donorForm.has_donated&&<div className="field"><label>{lang==='ne'?'अन्तिम पटक रक्तदान कहिले गर्नुभएको थियो?':'When was your last blood donation?'}</label><input required type="date" max={new Date().toISOString().slice(0,10)} value={donorForm.last_donation_date} onChange={e=>setDonorForm({...donorForm,last_donation_date:e.target.value})}/></div>}
      <div className="field"><label>{t.area}</label><select required value={donorForm.location} onChange={e=>setDonorForm({...donorForm,location:e.target.value})}><option value="">{lang==='ne'?'स्थान छान्नुहोस्':'Choose your area'}</option>{locations.map(v=><option key={v.value} value={v.value}>{lang==='ne'?v.ne:v.en}</option>)}</select></div><label className="consent"><input type="checkbox" required checked={donorForm.consent} onChange={e=>setDonorForm({...donorForm,consent:e.target.checked})}/><span>{lang==='ne'?'अनिवार्य सार्वजनिक सहमति: मेरो नाम, फोन नम्बर, रक्त समूह, स्थान र अन्तिम रक्तदान मिति सार्वजनिक देखाउन म सहमत छु।':'Required public consent: I agree to display my name, phone number, blood group, area and self-reported last blood donation date (or first-time status). Anyone may tap my number to call me.'}</span></label><p className="form-privacy">{t.privacy}</p><button className="button button-red form-submit" disabled={submitting}>{submitting?<><span className="loading-spinner" aria-hidden="true"/>{t.registering}</>:t.registerBtn}<ArrowRight size={17}/></button>{donorStatus==='success'&&<div className="form-message success"><Check size={16}/>{lang==='ne'?'दर्ता सुरक्षित भयो। तपाईंले सार्वजनिक देखाउन सहमति दिनुभएकोले तपाईंको विवरण स्वतः सूचीमा देखिनेछ।':'Registration received. Your profile will be listed automatically because you agreed to public visibility.'}</div>}{donorStatus==='consentRequired'&&<div className="form-message error">{t.consentRequired}</div>}{donorStatus==='invalidName'&&<div className="form-message error">{lang==='ne'?'कृपया वास्तविक नाम राख्नुहोस्। अपशब्द, अंक वा अनियमित अक्षर प्रयोग नगर्नुहोस्।':'Please enter a genuine name using letters only. Numbers, abusive words and random text are not allowed.'}</div>}{donorStatus==='invalidAge'&&<div className="form-message error">{lang==='ne'?'दर्ता गर्नुभएकोमा धन्यवाद। हाल तपाईंको विवरणका आधारमा हामी दर्ता अगाडि बढाउन सक्दैनौँ। थप जानकारीका लागि नजिकको मान्यता प्राप्त रक्तसञ्चार केन्द्रमा बुझ्नुहोस्।':'Thank you for your interest. We can’t continue this registration based on the information provided. Please contact a licensed blood bank for guidance.'}</div>}{donorStatus==='invalidWeight'&&<div className="form-message error">{lang==='ne'?'धन्यवाद। हाल तपाईंको विवरणका आधारमा हामी दर्ता अगाडि बढाउन सक्दैनौँ। थप जानकारीका लागि नजिकको मान्यता प्राप्त रक्तसञ्चार केन्द्रमा बुझ्नुहोस्।':'Thank you. We can’t continue this registration based on the information provided. Please contact a licensed blood bank for guidance.'}</div>}{donorStatus==='missingDonationDate'&&<div className="form-message error">{lang==='ne'?'अन्तिम रक्तदान मिति राख्नुहोस्।':'Please enter your last blood donation date.'}</div>}{donorStatus==='invalidDonationHistory'&&<div className="form-message error">{lang==='ne'?'रक्तदान इतिहासको मिति जाँच गर्नुहोस्।':'Please check your donation-history date.'}</div>}{donorStatus==='invalidBloodGroup'&&<div className="form-message error">{lang==='ne'?'कृपया रक्त समूह छान्नुहोस्।':'Please choose a blood group.'}</div>}{donorStatus==='invalidPhone'&&<div className="form-message error">{lang==='ne'?'कृपया १० अंकको मोबाइल नम्बर राख्नुहोस्':'Please enter a valid 10-digit mobile number.'}</div>}{donorStatus==='error'&&<div className="form-message error">{t.registerError}</div>}{donorStatus==='offline'&&<div className="form-message error">{t.backendMissing}</div>}</form></div></div></section>

      <section className="intro-band" id="about"><div className="container intro-layout"><div><div className="section-kicker">01 / {t.about}</div><h2>{t.community}</h2></div><div className="intro-right"><p>{t.communityText}</p><div className="mini-stats"><div><strong>8</strong><span>{t.groups}</span></div><div><strong>01</strong><span>{t.mission}</span></div><div><strong>LOCAL</strong><span>{lang==='ne'?'स्थानीय समुदाय':'Community-led'}</span></div></div></div></div></section>

      <section className="awareness-section section-pad" id="local-guide">
        <div className="container">
          <div className="section-heading awareness-heading">
            <div>
              <div className="section-kicker">{lang==='ne'?'०४ / स्थानीय रक्तदाता जानकारी':'04 / LOCAL DONOR GUIDE'}</div>
              <h2>{localGuide.heading}</h2>
              <p>{localGuide.intro}</p>
            </div>
            <div className="section-number">04</div>
          </div>
          <div className="awareness-grid">
            {localGuide.guideCards.map((card,index)=><article key={card.title}>
              <span className="awareness-icon"><MapPin size={22}/></span>
              <span className="awareness-index">{String(index+1).padStart(2,'0')}</span>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>)}
          </div>
          <div className="section-heading awareness-heading" style={{marginTop:'46px'}}>
            <div>
              <div className="section-kicker">{lang==='ne'?'सोधिने प्रश्नहरू':'FREQUENT QUESTIONS'}</div>
              <h2>{localGuide.faqHeading}</h2>
              <p>{localGuide.faqIntro}</p>
            </div>
          </div>
          <div className="awareness-grid">
            {localGuide.faqCards.map((card,index)=><article key={card.title}>
              <span className="awareness-icon"><HeartPulse size={22}/></span>
              <span className="awareness-index">{String(index+1).padStart(2,'0')}</span>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>)}
          </div>
          <div className="seo-related-pages">
            <a href="./blood-donors-in-biratnagar/">{lang==='ne'?'विराटनगरमा रक्तदाता खोज्ने तरिका':'How to find blood donors in Biratnagar'} <ArrowUpRight size={15}/></a>
            <a href="./blood-needed-in-biratnagar/">{lang==='ne'?'विराटनगरमा रगत खोजिरहनुभएको छ?':'Looking for blood in Biratnagar?'} <ArrowUpRight size={15}/></a>
          </div>
        </div>
      </section>

      <section className="quote-band"><div className="container quote-inner"><Quote size={28}/><blockquote>{lang==='ne'?'स्वैच्छिक रक्तदाताले स्थानीय समुदायलाई बलियो बनाउन सहयोग गर्छन्।':'Voluntary donors help strengthen the local community.'}</blockquote><span>{lang==='ne'?'— विराटनगर रक्तदाता सञ्जाल':'— BiratnagarBloodNetwork'}</span></div></section>

      <section className="awareness-section section-pad" id="awareness"><div className="container"><div className="section-heading awareness-heading"><div><div className="section-kicker">05 / {t.awarenessEyebrow}</div><h2>{t.awarenessTitle}</h2><p>{t.awarenessText}</p></div><div className="section-number">05</div></div><div className="awareness-grid"><article><span className="awareness-icon"><BadgeCheck size={22}/></span><span className="awareness-index">01</span><h3>{t.fact1}</h3><p>{t.fact1Text}</p></article><article><span className="awareness-icon"><ShieldCheck size={22}/></span><span className="awareness-index">02</span><h3>{t.fact2}</h3><p>{t.fact2Text}</p></article><article><span className="awareness-icon"><HeartPulse size={22}/></span><span className="awareness-index">03</span><h3>{t.fact3}</h3><p>{t.fact3Text}</p></article></div><div className="safety-note"><ShieldCheck size={20}/><p>{t.safety}</p></div></div></section>
    </main>

    <section className="privacy-section section-pad" id="privacy"><div className="container privacy-layout"><div><div className="section-kicker">{lang==='ne'?'०६ / विश्वास र गोपनीयता':'06 / TRUST & PRIVACY'}</div><h2>{lang==='en'?'Your details. Your choice.':'तपाईंको विवरण, तपाईंको निर्णय।'}</h2><p>{lang==='en'?'We collect only the details needed to connect donors and people requesting blood. Public listing is always based on your consent.':'रक्तदाता र रगत आवश्यक पर्ने व्यक्तिलाई जोड्न आवश्यक विवरण मात्र सङ्कलन गरिन्छ। सार्वजनिक सूचीमा राख्न तपाईंको सहमति अनिवार्य छ।'}</p></div><div className="privacy-points"><article><LockKeyhole size={20}/><div><b>{lang==='en'?'Limited access':'सीमित पहुँच'}</b><p>{lang==='en'?'Only the authorised site administrator can manage or remove donor records.':'अधिकृत वेबसाइट प्रशासकले मात्र रक्तदाता विवरण व्यवस्थापन वा हटाउन सक्छ।'}</p></div></article><article><Eye size={20}/><div><b>{lang==='en'?'Clear public listing':'स्पष्ट सार्वजनिक सूची'}</b><p>{lang==='en'?'Your name, blood group, area and phone are displayed automatically only if you opt in to public listing.':'तपाईंले सार्वजनिक सूचीमा राख्न सहमति दिएमा मात्र नाम, रक्त समूह, स्थान र फोन स्वतः देखाइन्छ।'}</p></div></article><article><FileText size={20}/><div><b>{lang==='en'?'Removal requests':'विवरण हटाउने अनुरोध'}</b><p>{lang==='en'?'Contact the site administrator if you want your details reviewed or removed.':'आफ्नो विवरण सच्याउन वा हटाउन वेबसाइट प्रशासकलाई सम्पर्क गर्नुहोस्।'}</p></div></article></div></div><div className="container privacy-full"><h3>{lang==='en'?'Privacy policy':'गोपनीयता नीति'}</h3><p>{lang==='en'?'BiratnagarBloodNetwork is a community contact directory, not a hospital or blood bank. When you register, we collect your name, phone number, blood group, location, an 18-or-older self-declaration, weight and self-reported blood donation history. If you consent to public listing, your name, phone number, blood group, location and self-reported last donation date or first-time status are shown publicly. The age declaration and weight remain private and are not shown on donor cards. Blood requests are kept for coordination and are not displayed in the public donor directory. The administrator account is restricted to authorised personnel and is the only role permitted to review donor registrations, update availability, or remove records. We do not intentionally sell personal information. Do not submit another person’s details without their permission. You may ask the administrator to correct or remove your information. Information may be retained only as long as needed for the directory. This is a plain-language draft and should be reviewed by the responsible organisation before public launch.':'विराटनगर रक्तदाता सञ्जाल रक्तदाता र रगत आवश्यक पर्ने व्यक्तिबीच सम्पर्क गराउने माध्यम हो; यो अस्पताल वा रक्तसञ्चार केन्द्र होइन। दर्ता गर्दा नाम, फोन नम्बर, रक्त समूह, स्थान, १८ वर्ष वा माथि भएको स्वघोषणा, तौल र स्वयंले दिएको रक्तदान इतिहास सङ्कलन गरिन्छ। सार्वजनिक सूचीमा सहमति दिएमा नाम, फोन नम्बर, रक्त समूह, स्थान र स्वयंले दिएको अन्तिम रक्तदान मिति वा पहिलो पटक रक्तदान गर्ने जानकारी सार्वजनिक देखाइन्छ। उमेर र तौल गोप्य राखिन्छ र रक्तदाता कार्डमा देखाइँदैन। रक्त अनुरोधहरू समन्वयका लागि राखिन्छन् र सार्वजनिक रक्तदाता सूचीमा देखाइँदैनन्। अधिकृत प्रशासक खाताले मात्र रक्तदाता दर्ता जाँच गर्न, उपलब्धता बदल्न वा विवरण हटाउन सक्छ। व्यक्तिगत विवरण बिक्री गर्ने उद्देश्य छैन। अनुमति बिना अरू व्यक्तिको विवरण नपठाउनुहोस्। आफ्नो विवरण सच्याउन वा हटाउन प्रशासकलाई अनुरोध गर्न सक्नुहुन्छ। आवश्यक अवधिसम्म मात्र विवरण राखिनेछ। यो सरल भाषामा तयार गरिएको मस्यौदा हो; सार्वजनिक सुरुआतअघि जिम्मेवार संस्थाले समीक्षा गर्नुपर्छ।'}</p><p className="privacy-updated">Last reviewed: 21 November 2026 · अन्तिम समीक्षा: २१ नोभेम्बर २०२६</p></div></section>
    </>}

    {isPrivateAdminRoute && <section className="admin-section section-pad" id="admin"><div className="container"><div className="section-heading"><div><div className="section-kicker">{lang==='ne'?'०७ / निजी प्रशासन':'07 / PRIVATE ADMINISTRATION'}</div><h2>{lang==='en'?'Administrator dashboard':'प्रशासक ड्यासबोर्ड'}</h2><p>{lang==='en'?'A private area for the authorised administrator only.':'अधिकृत प्रशासकका लागि मात्र निजी क्षेत्र।'}</p></div><div className="admin-lock"><LockKeyhole size={23}/></div></div>
      {!supabase ? <div className="admin-locked"><LockKeyhole size={24}/><h3>{lang==='en'?'Database connection required':'डाटाबेस जडान आवश्यक छ'}</h3><p>{t.backendMissing}</p></div> : !session ? <form className="admin-login form-card" onSubmit={adminLogin}><div className="form-card-head"><div><span className="form-step">AUTHORISATION REQUIRED</span><h3>{lang==='en'?'Administrator sign in':'प्रशासक लगइन'}</h3></div><span className="form-icon"><LockKeyhole size={21}/></span></div><div className="field"><label>{lang==='ne'?'प्रशासकको इमेल':'Administrator email'}</label><input required type="email" autoComplete="username" value={adminEmail} onChange={e=>setAdminEmail(e.target.value)} placeholder="Your authorised email"/></div><div className="field"><label>{lang==='ne'?'पासवर्ड':'Password'}</label><input required type="password" autoComplete="current-password" value={adminPassword} onChange={e=>setAdminPassword(e.target.value)}/></div><button className="button button-red form-submit"><LogIn size={16}/> {lang==='en'?'Sign in securely':'सुरक्षित लगइन'}</button>{adminMessage&&<div className="form-message error">{adminMessage}</div>}<p className="form-privacy">No public administrator registration. Admin access must be assigned securely in Supabase by the project owner.</p></form> : !isAdmin ? <div className="admin-locked"><LockKeyhole size={24}/><h3>Access denied</h3><p>{adminMessage||'This account is not authorised.'}</p><button className="button button-dark" onClick={adminLogout}><LogOut size={15}/> Sign out</button></div> : <div className="admin-dashboard"><div className="admin-toolbar"><span><UserCheck size={17}/> {lang==='en'?'Signed in as authorised administrator':'अधिकृत प्रशासकका रूपमा लगइन'}</span><button onClick={adminLogout}><LogOut size={15}/> Sign out</button></div>{adminMessage&&<p className="admin-message">{adminMessage}</p>}{adminLoading?<p>Loading records…</p>:<><h3>{lang==='en'?'Donor records':'रक्तदाता विवरण'} <span>{adminDonors.length}</span></h3><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Name</th><th>Blood</th><th>Location</th><th>Phone</th><th>Listing</th><th>Review</th><th>Actions</th></tr></thead><tbody>{adminDonors.map(d=><tr key={d.id}><td>{d.name}</td><td><b className="admin-blood">{d.blood_group}</b></td><td>{d.location}</td><td>{d.phone}</td><td>{d.public_listing?'Public opt-in':'Private'}</td><td><span className={d.is_approved?'review-approved':'review-pending'}>{d.is_approved?'Approved':'Pending review'}</span></td><td><div className="admin-actions"><button onClick={()=>adminToggleApproval(d)}>{d.is_approved?'Unapprove':'Approve'}</button><button onClick={()=>adminToggleAvailability(d)}>{d.is_available?'Pause':'Activate'}</button><button className="delete-action" onClick={()=>adminDeleteDonor(d.id)}><Trash2 size={14}/> Remove</button></div></td></tr>)}</tbody></table></div></>}</div>}
    </div></section>}

    {!isPrivateAdminRoute && <footer className="footer"><div className="container"><div className="footer-main"><div className="footer-brand"><a className="brand brand-footer" href="#home"><span className="brand-mark"><Droplet size={24} fill="currentColor"/></span><span><strong>{lang==='ne'?'विराटनगर रक्तदाता सञ्जाल':'BiratnagarBloodNetwork'}</strong><small>{lang==='ne'?'विराटनगर, नेपाल':'BIRATNAGAR, NEPAL'}</small></span></a><p>{t.footerLine}</p></div><div className="footer-links"><div><span>{t.menu}</span><button onClick={()=>scrollTo('find')}>{t.directory}</button><button onClick={()=>scrollTo('donate')}>{t.donorForm}</button><button onClick={()=>scrollTo('awareness')}>{t.awareness}</button><button onClick={()=>scrollTo('privacy')}>{lang==='en'?'Privacy policy':'गोपनीयता नीति'}</button></div><div><span>{t.contact}</span><p>Biratnagar, Koshi Province<br/>Nepal</p><p className="footer-note">Community initiative · Volunteer-led</p></div></div></div><div className="footer-bottom"><span>© 2026 BiratnagarBloodNetwork. Built for the community.</span><span>{lang==='ne'?'नेपालमा सद्भावका साथ बनाइएको':'Made with care in Nepal'} <span className="nepal-flag">♥</span></span></div></div></footer>}
  </div>;
}

createRoot(document.getElementById('root')).render(<App/>);