import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createClient } from '@supabase/supabase-js';
import { ArrowRight, ArrowUpRight, BadgeCheck, Check, ChevronDown, Droplet, HeartHandshake, HeartPulse, MapPin, Menu, Search, ShieldCheck, X, LockKeyhole, Trash2, LogIn, LogOut, FileText, Eye, UserCheck, Phone, Quote } from 'lucide-react';
import './style.css';
import './redesign.css';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://fpibnalcztfghugtpjex.supabase.co';
const supabasePublicKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY;

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
    eyebrow:'A COMMUNITY THAT SHOWS UP', title:'Find a blood donor.', titleAccent:'Closer to home.', intro:'A simple way to find consenting blood donors in Biratnagar and nearby areas. Search by blood group and location, or register as a donor.', find:'Find a donor', become:'Become a donor', local:'BIRATNAGAR & NEARBY', community:'Real people. One connected community.', communityText:'When a blood request comes in, finding the right person quickly matters. BiratnagarBloodNetwork helps make that connection easier.', donorCount:'registered donors', groups:'blood groups', mission:'local community',
    searchTitle:'Find a blood donor', searchText:'Filter consenting donors by blood group and area.', bloodGroup:'Blood group', allGroups:'All blood groups', location:'Location', locationPlaceholder:'e.g. Biratnagar, Tintolia…', searchBtn:'Search donors', available:'Available donors', noResults:'No matching donors yet', noResultsText:'Try another blood group or nearby area. Confirm donor availability and compatibility with a licensed blood bank or hospital.', demo:'Illustrative sample', demoNote:'No sample donor profiles are shown. Only actual consenting records appear after the database is connected.', registerTitle:'Your one registration could help someone.', registerText:'Join the local donor community. Your details are only listed publicly if you choose public visibility.', fullName:'Full name', phone:'Phone number', chooseGroup:'Choose blood group', area:'Your location / neighbourhood', areaPlaceholder:'e.g. Biratnagar-4, Morang', publicConsent:'Required to join the public donor directory: I agree to display my name, blood group, area and phone number so people can contact me.', registerBtn:'Register as a donor', registering:'Submitting…', registerSuccess:'Thank you for registering.', registerSuccessText:'Your donor profile has been submitted.', registerError:'Could not submit your registration. Please try again.', consentRequired:'Please agree to public listing to register as a donor.', privacy:'Your information is personal. Only register if you are comfortable sharing the selected details. You can request removal later.', needTitle:'Looking for blood?', needText:'Share the basic details of the request so the community team can help coordinate.', patientName:'Contact person name', neededGroup:'Blood group needed', units:'Units needed', hospital:'Hospital / location', hospitalPlaceholder:'Hospital name and area', needPhone:'Contact phone', requestBtn:'Submit blood request', requestSuccess:'Request submitted', requestSuccessText:'Your request has been received.', requestError:'Could not submit the request. Please try again.', awarenessEyebrow:'KNOW BEFORE YOU DONATE', awarenessTitle:'A few things worth knowing.', awarenessText:'Blood donation is a generous act — and it should always be safe, voluntary and guided by qualified health professionals.', fact1:'Check your eligibility', fact1Text:'A health professional or blood bank staff member should assess whether you can donate today.', fact2:'Every donation is screened', fact2Text:'Donated blood is tested and handled by qualified services before it can be used.', fact3:'Ask the blood bank', fact3Text:'Blood type alone does not confirm compatibility. The hospital or blood bank must complete the required checks.', safety:'BiratnagarBloodNetwork is a community connection platform, not a blood bank or medical service. Donor availability, eligibility and blood compatibility must be confirmed by a licensed blood bank or hospital.', footerLine:'A stronger community, one connection at a time.', about:'About', directory:'Find donors', awareness:'Awareness', contact:'Contact', menu:'Menu', live:'Community connection platform', privacyTitle:'Your privacy matters', privacyText:'Donor contact details are shown only when the donor explicitly agrees. Never share another person’s details without their permission.', coordinator:'For urgent medical needs, contact a licensed blood bank or hospital directly.', needHelp:'Need blood', donorForm:'Donor registration', online:'Live directory', preview:'Preview mode', backendMissing:'Live registration and donor search will activate after the secure database is connected.', requestConsent:'I confirm this request is being submitted with the contact person’s permission.'
  },
  ne: {
    eyebrow:'समुदायको साथ, जीवनको आशा', title:'रक्तदाता खोज्नुहोस्,', titleAccent:'नजिकैबाट सहयोग पाउनुहोस्।', intro:'विराटनगर र आसपासका सहमतिसहित दर्ता भएका रक्तदाता सजिलै खोज्नुहोस्। रक्त समूह र स्थान छानेर खोजी गर्नुहोस् वा रक्तदाताका रूपमा दर्ता हुनुहोस्।', find:'मलाई रगत चाहिन्छ', become:'म रक्तदाता हुँ', local:'विराटनगर तथा आसपास', community:'वास्तविक मानिस। एउटै समुदाय।', communityText:'रगतको आवश्यकता पर्दा सही व्यक्तिसँग छिटो सम्पर्क हुन जरुरी हुन्छ। विराटनगर रक्तदाता सञ्जालले यस्तो सम्पर्क सहज बनाउन मद्दत गर्छ।', donorCount:'दर्ता भएका रक्तदाता', groups:'रक्त समूह', mission:'एउटै साझा उद्देश्य',
    searchTitle:'रक्तदाता खोज्नुहोस्', searchText:'रक्त समूह र स्थानका आधारमा जाँच गरिएका, सहमति दिएका रक्तदाता खोज्नुहोस्।', bloodGroup:'रक्त समूह', allGroups:'सबै रक्त समूह', location:'स्थान', locationPlaceholder:'जस्तै: विराटनगर, टिनटोलिया…', searchBtn:'खोज्नुहोस्', available:'उपलब्ध', noResults:'मिल्दो रक्तदाता भेटिएन', noResultsText:'अर्को रक्त समूह वा नजिकको स्थान छानेर खोज्नुहोस्। रक्तदाताको उपलब्धता र अनुकूलता मान्यता प्राप्त रक्तसञ्चार केन्द्र वा अस्पतालबाट पुष्टि गर्नुहोस्।', demo:'उदाहरण मात्र', demoNote:'नमुना रक्तदाता विवरण देखाइँदैन। डाटाबेस जडान भएपछि सहमति दिएका वास्तविक विवरण मात्र देखाइनेछन्।', registerTitle:'तपाईंको दर्ताले कसैलाई आशा दिन सक्छ।', registerText:'स्थानीय रक्तदाता समुदायमा जोडिनुहोस्। तपाईंले सार्वजनिक देखाउन सहमति दिएमा मात्र विवरण सूचीमा देखाइनेछ।', fullName:'पूरा नाम', phone:'मोबाइल नम्बर', chooseGroup:'रक्त समूह छान्नुहोस्', area:'ठेगाना / स्थान', areaPlaceholder:'जस्तै: विराटनगर-४, मोरङ', publicConsent:'सार्वजनिक रक्तदाता सूचीमा दर्ता हुन अनिवार्य: मानिसहरूले मसँग सम्पर्क गर्न सकून् भनेर मेरो नाम, रक्त समूह, स्थान र फोन नम्बर सार्वजनिक देखाउन म सहमत छु।', registerBtn:'रक्तदाताका रूपमा दर्ता गर्नुहोस्', registering:'पठाउँदै…', registerSuccess:'धन्यवाद! तपाईंको नाम सुरक्षित भयो।', registerSuccessText:'तपाईंको रक्तदाता विवरण पठाइएको छ।', registerError:'दर्ता पठाउन सकिएन। कृपया फेरि प्रयास गर्नुहोस्।', consentRequired:'रक्तदाताका रूपमा दर्ता हुन सार्वजनिक सूचीको सहमति आवश्यक छ।', privacy:'तपाईंको विवरण व्यक्तिगत हो। सार्वजनिक रूपमा देखाउन सहज भएमा मात्र दर्ता गर्नुहोस्। पछि हटाउन अनुरोध गर्न सक्नुहुन्छ।', needTitle:'रगत आवश्यक छ?', needText:'समन्वयमा सहयोग गर्न आवश्यक आधारभूत विवरण पठाउनुहोस्।', patientName:'सम्पर्क व्यक्तिको नाम', neededGroup:'आवश्यक रक्त समूह', units:'कति पिन्ट चाहिएको', hospital:'अस्पताल / स्थान', hospitalPlaceholder:'अस्पतालको नाम र स्थान', needPhone:'सम्पर्क फोन', requestBtn:'रक्त अनुरोध पठाउनुहोस्', requestSuccess:'अनुरोध पठाइयो', requestSuccessText:'तपाईंको अनुरोध प्राप्त भएको छ।', requestError:'अनुरोध पठाउन सकिएन। फेरि प्रयास गर्नुहोस्।', awarenessEyebrow:'रक्तदान गर्नुअघि जानौँ', awarenessTitle:'जान्नैपर्ने केही कुरा।', awarenessText:'रक्तदान उदार कार्य हो — यो सधैँ सुरक्षित, स्वैच्छिक र स्वास्थ्यकर्मीको सल्लाहअनुसार हुनुपर्छ।', fact1:'योग्यता जाँच गराउनुहोस्', fact1Text:'आज रक्तदान गर्न मिल्छ कि मिल्दैन भन्ने कुरा स्वास्थ्यकर्मी वा रक्तसञ्चार केन्द्रले जाँच गर्नुपर्छ।', fact2:'रगत परीक्षण गरिन्छ', fact2Text:'प्रयोग गर्नुअघि दान गरिएको रगत सम्बन्धित सेवाबाट परीक्षण र व्यवस्थापन गरिन्छ।', fact3:'रक्तसञ्चार केन्द्रसँग बुझ्नुहोस्', fact3Text:'रक्त समूह मिल्दैमा रगत सुरक्षित रूपमा मिल्छ भन्ने हुँदैन। आवश्यक परीक्षण अस्पताल वा रक्तसञ्चार केन्द्रले गर्नुपर्छ।', safety:'विराटनगर रक्तदाता सञ्जाल रक्तदाता र आवश्यक पर्ने व्यक्तिबीच सम्पर्क गराउने समुदायिक माध्यम हो, रक्तसञ्चार केन्द्र वा चिकित्सा सेवा होइन। रक्तदाताको उपलब्धता, योग्यता र रगतको अनुकूलता मान्यता प्राप्त रक्तसञ्चार केन्द्र वा अस्पतालबाट पुष्टि गर्नुपर्छ।', footerLine:'समुदायको साथ, हरेक सम्पर्कमा नयाँ आशा।', about:'हाम्रो बारेमा', directory:'रक्तदाताको सूची', awareness:'जनचेतना', contact:'सम्पर्क', menu:'मेनु', live:'समुदायिक सम्पर्क माध्यम', privacyTitle:'तपाईंको गोपनीयता महत्त्वपूर्ण छ', privacyText:'रक्तदाताले स्पष्ट सहमति दिएमा मात्र सम्पर्क विवरण सार्वजनिक देखाइन्छ। अनुमति बिना अरूको विवरण साझा नगर्नुहोस्।', coordinator:'तत्काल स्वास्थ्य आवश्यकताका लागि मान्यता प्राप्त रक्तसञ्चार केन्द्र वा अस्पतालमा सिधै सम्पर्क गर्नुहोस्।', needHelp:'मलाई रगत चाहिन्छ', donorForm:'रक्तदाता दर्ता', online:'प्रत्यक्ष सूची', preview:'पूर्वावलोकन', backendMissing:'सुरक्षित डाटाबेस जोडिएपछि मात्र प्रत्यक्ष दर्ता र रक्तदाता खोजी सुरु हुनेछ।', requestConsent:'सम्पर्क व्यक्तिको सहमतिमा यो अनुरोध पठाइएको हो भन्ने म पुष्टि गर्छु।'
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

function App() {
  const [lang,setLang] = useState(() => { try { return localStorage.getItem('rakta-language-v2') || 'en'; } catch { return 'en'; } });
  const [mobileMenu,setMobileMenu] = useState(false);
  const [group,setGroup] = useState('all');
  const [searchLocation,setSearchLocation] = useState('');
  
  const [donors,setDonors] = useState([]);
  const [loading,setLoading] = useState(false);
  const [searchDone,setSearchDone] = useState(false);
  const [searchError,setSearchError] = useState(false);
  const [donorForm,setDonorForm] = useState({name:'',phone:'',blood_group:'',location:'',consent:false});
  const [donorStatus,setDonorStatus] = useState('');
  const [submitting,setSubmitting] = useState(false);
  const [session,setSession] = useState(null);
  const [adminEmail,setAdminEmail] = useState('');
  const [adminPassword,setAdminPassword] = useState('');
  const [adminMessage,setAdminMessage] = useState('');
  const [adminDonors,setAdminDonors] = useState([]);
  const [adminLoading,setAdminLoading] = useState(false);
  const [isAdmin,setIsAdmin] = useState(false);
  const [privacyOpen,setPrivacyOpen] = useState(false);
  const [contactNumbers,setContactNumbers] = useState({});
  const [contactLoading,setContactLoading] = useState({});
  const [faqOpen,setFaqOpen] = useState(0);
  const t = copy[lang];
  useEffect(() => { document.documentElement.lang = lang; document.title = lang === 'ne' ? 'विराटनगर रक्तदाता सञ्जाल' : 'BiratnagarBloodNetwork'; try { localStorage.setItem('rakta-language-v2',lang); } catch {} }, [lang]);

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
    const {data:donorData,error:donorError} = await supabase.from('donors').select('id,name,phone,blood_group,location,public_listing,is_available,is_approved,created_at').order('created_at',{ascending:false});
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

  async function searchDonors(e) {
    e?.preventDefault();
    setLoading(true); setSearchDone(true); setSearchError(false);
    if (!supabase) {
      setDonors([]);
      setLoading(false); return;
    }
    let query = supabase.from('donors').select('id,blood_group,location,is_available,created_at').eq('is_available',true).eq('public_listing',true).eq('is_approved',true).order('created_at',{ascending:false});
    if (group !== 'all') query = query.eq('blood_group',group);
    if (searchLocation.trim()) query = query.ilike('location',`%${searchLocation.trim()}%`);
    const {data,error} = await query.limit(60);
    setDonors(error ? [] : (data || []));
    setSearchError(Boolean(error));
    setLoading(false);
  }

  async function revealDonorContact(donor) {
    if (contactNumbers[donor.id] || contactLoading[donor.id]) return;
    setContactLoading(rows=>({...rows,[donor.id]:true}));
    // Contact data is requested only after the visitor presses the contact button.
    const {data,error} = await supabase.from('donors').select('phone').eq('id',donor.id).eq('is_available',true).eq('public_listing',true).eq('is_approved',true).maybeSingle();
    if (error || !data?.phone) {
      setSearchError(true);
    } else {
      setContactNumbers(rows=>({...rows,[donor.id]:data.phone}));
    }
    setContactLoading(rows=>({...rows,[donor.id]:false}));
  }

  async function submitDonor(e) {
    e.preventDefault(); setDonorStatus('');
    if (!supabase) { setDonorStatus('offline'); return; }
    const cleanPhone = normalizeNepalPhone(donorForm.phone);
    if (!cleanPhone) { setDonorStatus('invalidPhone'); return; }
    if (!donorForm.blood_group) { setDonorStatus('invalidBloodGroup'); return; }
    if (!donorForm.consent) { setDonorStatus('consentRequired'); return; }
    setSubmitting(true);
    try {
      const {error} = await supabase.from('donors').insert({
        name:donorForm.name.trim(),
        phone:cleanPhone,
        blood_group:donorForm.blood_group,
        location:donorForm.location.trim(),
        public_listing:donorForm.consent,
        is_available:true,
        is_approved:donorForm.consent
      });
      if (error) throw error;
      setDonorStatus('success');
      setDonorForm({name:'',phone:'',blood_group:'',location:'',consent:false});
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
    <header className="header"><div className="container nav-wrap">
      <a className="brand" href="#home" onClick={e=>{e.preventDefault();scrollTo('home')}}><span className="brand-mark"><Droplet size={23} fill="currentColor"/></span><span><strong>BiratnagarBloodNetwork</strong><small>Biratnagar, Morang, Nepal</small></span></a>
      <nav className={mobileMenu?'nav-links open':'nav-links'} aria-label="Main navigation">
        <button onClick={()=>scrollTo('find')}>{lang==='ne'?'रक्तदाता खोज्नुहोस्':'Find donors'}</button>
        <button onClick={()=>scrollTo('how')}>{lang==='ne'?'कसरी काम गर्छ':'How it works'}</button>
        <button onClick={()=>scrollTo('donate')}>{lang==='ne'?'रक्तदाता बन्नुहोस्':'Become a donor'}</button>
        <button onClick={()=>scrollTo('faq')}>FAQ</button>
        <div className="language-switch"><button className={lang==='ne'?'active':''} onClick={()=>setLang('ne')}>नेपाली</button><span aria-hidden="true">/</span><button className={lang==='en'?'active':''} onClick={()=>setLang('en')}>English</button></div>
      </nav>
      <button className="mobile-toggle" onClick={()=>setMobileMenu(!mobileMenu)} aria-label={mobileMenu?'Close menu':'Open menu'} aria-expanded={mobileMenu}>{mobileMenu?<X/>:<Menu/>}</button>
    </div></header>
    <main>
      <section className="hero" id="home">
        <div className="container hero-content">
          <div className="hero-copy">
            <div className="eyebrow"><Droplet size={17}/> Biratnagar, Morang</div>
            <h1>{lang==='ne'?'विराटनगरमा रगत चाहियो?':'Need blood in Biratnagar?'} <span>{lang==='ne'?'नजिकै रक्तदाता खोज्नुहोस्।':'Find a donor near you.'}</span></h1>
            <p className="hero-intro">{lang==='ne'?'रक्त समूह र स्थानका आधारमा स्वेच्छिक रक्तदाता खोज्नुहोस् वा रक्तदाताका रूपमा दर्ता हुनुहोस्।':'A community directory to find consenting voluntary donors by blood group and area, or register as a donor.'}</p>
            <div className="hero-actions">
              <button className="button button-light" onClick={()=>scrollTo('find')}>{lang==='ne'?'रक्तदाता खोज्नुहोस्':'Find a donor'} <Search size={17}/></button>
              <button className="button button-outline-light" onClick={()=>scrollTo('donate')}>{lang==='ne'?'रक्तदाता बन्नुहोस्':'Become a donor'} <ArrowRight size={17}/></button>
            </div>
          </div>
          <aside className="hero-card" aria-label="Blood groups supported">
            <span className="hero-card-mark"><Droplet size={22} fill="currentColor"/></span>
            <h2>{lang==='ne'?'आठ रक्त समूह':'Search all blood groups'}</h2>
            <p>{lang==='ne'?'आवश्यक रक्त समूह छानेर खोजी गर्नुहोस्।':'Choose a blood group to find listed donors in your area.'}</p>
            <div className="hero-blood-groups">{bloodGroups.map(g=><span key={g}>{g}</span>)}</div>
          </aside>
        </div>
      </section>

      <div className="ticker" tabIndex="0" aria-label="Save blood. Donate life. Every donor is a hero.">
        <div className="ticker-track"><div className="ticker-group"><span>Save blood.</span><i>•</i><span>Donate life.</span><i>•</i><span>Every donor is a hero.</span><i>•</i><span>One donation can save up to three lives.</span><i>•</i></div><div className="ticker-group" aria-hidden="true"><span>Save blood.</span><i>•</i><span>Donate life.</span><i>•</i><span>Every donor is a hero.</span><i>•</i><span>One donation can save up to three lives.</span><i>•</i></div></div>
      </div>

      <section className="directory-section section-pad" id="find">
        <div className="container">
          <div className="section-heading"><div><h2>{lang==='ne'?'रक्तदाता खोज्नुहोस्':'Find a donor'}</h2><p>{lang==='ne'?'रक्त समूह र विराटनगरको क्षेत्र छान्नुहोस्।':'Choose a blood group and area in Biratnagar.'}</p></div></div>
          <form className="search-panel portal-search" onSubmit={searchDonors}>
            <fieldset className="field blood-search-field"><legend>{t.bloodGroup}</legend><div className="blood-picker search-blood-picker">{bloodGroups.map(g=><button type="button" key={g} className={group===g?'blood-choice selected':'blood-choice'} aria-pressed={group===g} onClick={()=>setGroup(group===g?'all':g)}>{g}</button>)}</div></fieldset>
            <div className="field"><label htmlFor="search-area">{lang==='ne'?'क्षेत्र':'Area'}</label><select id="search-area" value={searchLocation} onChange={e=>setSearchLocation(e.target.value)}><option value="">{lang==='ne'?'सबै क्षेत्र':'All areas'}</option>{locations.map(v=><option key={v.value} value={v.en}>{v.en}</option>)}</select></div>
            <button className="button button-red search-submit" type="submit"><Search size={17}/>{lang==='ne'?'रक्तदाता खोज्नुहोस्':'Search donors'}</button>
          </form>
          <div className="directory-meta"><div><span className="status-dot"></span><strong>{lang==='ne'?'सूचीमा रहेका रक्तदाता':'Listed donors'}</strong><span className="meta-count">{searchDone?displayed.length:0}</span></div><span className="sample-label">{supabase?(lang==='ne'?'प्रत्यक्ष सूची':'Live directory'):(lang==='ne'?'पूर्वावलोकन':'Preview')}</span></div>
          {loading ? <div className="donor-grid" aria-label="Loading donors"><div className="donor-skeleton"/><div className="donor-skeleton"/><div className="donor-skeleton"/></div> :
          searchError ? <div className="empty-state"><h3>{lang==='ne'?'सूची उपलब्ध छैन':'Directory temporarily unavailable'}</h3><p>{lang==='ne'?'कृपया केहीबेरपछि फेरि प्रयास गर्नुहोस्।':'Please try again in a moment.'}</p></div> :
          displayed.length ? <div className="donor-grid">{displayed.map(d=><article className="donor-card" key={d.id}>
            <div className="donor-card-top"><div className="blood-badge"><Droplet size={16} fill="currentColor"/><b>{d.blood_group}</b></div><span className="available-tag"><span/> {lang==='ne'?'सूचीमा':'Listed'}</span></div>
            <div className="donor-details"><h3>{lang==='ne'?'स्वैच्छिक रक्तदाता':'Voluntary donor'}</h3><p className="donor-location"><MapPin size={15}/>{d.location}</p><p className="donor-date">{lang==='ne'?'सूचीमा थपिएको':'Listed'}: {new Date(d.created_at).toLocaleDateString(lang==='ne'?'ne-NP':'en-NP',{day:'numeric',month:'short',year:'numeric'})}</p></div>
            {contactNumbers[d.id] ? <a className="donor-contact" href={`tel:${contactNumbers[d.id]}`}><Phone size={17}/>{lang==='ne'?'फोन गर्नुहोस्':'Call donor'}</a> :
            <button className="donor-contact" type="button" disabled={contactLoading[d.id]} onClick={()=>revealDonorContact(d)}><Phone size={17}/>{contactLoading[d.id]?(lang==='ne'?'खोल्दै…':'Loading…'):(lang==='ne'?'सम्पर्क विवरण हेर्नुहोस्':'Request contact')}</button>}
            <span className="card-caption">{lang==='ne'?'सम्पर्क विवरण अनुरोध गरेपछि मात्र देखाइन्छ।':'Contact details appear only after you request them.'}</span>
          </article>)}</div> :
          searchDone ? <div className="empty-state"><div className="empty-icon"><Search size={22}/></div><h3>{lang==='ne'?'यस क्षेत्रमा रक्तदाता भेटिएन':'No donors listed for this blood group and area yet.'}</h3><p>{lang==='ne'?'नजिकको अर्को क्षेत्र छानेर प्रयास गर्नुहोस्।':'Try a nearby area.'}</p></div> :
          <div className="empty-state"><div className="empty-icon"><Search size={22}/></div><h3>{lang==='ne'?'रक्त समूह र क्षेत्र छान्नुहोस्':'Choose a blood group and area'}</h3><p>{lang==='ne'?'मिल्दो रक्तदाता हेर्न खोजी गर्नुहोस्।':'Search to see matching consenting donors.'}</p></div>}
        </div>
      </section>

      <section className="how-section section-pad" id="how"><div className="container"><div className="section-heading"><h2>{lang==='ne'?'यसरी काम गर्छ':'How it works'}</h2></div><div className="steps-grid">
        <article><span>01</span><div><h3>{lang==='ne'?'खोज्नुहोस्':'Search'}</h3><p>{lang==='ne'?'रक्त समूह र नजिकको क्षेत्र छान्नुहोस्।':'Choose a blood group and nearby area.'}</p></div></article>
        <article><span>02</span><div><h3>{lang==='ne'?'सम्पर्क अनुरोध गर्नुहोस्':'Request contact'}</h3><p>{lang==='ne'?'सम्पर्क विवरण हेर्न अनुरोध बटन थिच्नुहोस्।':'Press the contact button to reveal the donor contact.'}</p></div></article>
        <article><span>03</span><div><h3>{lang==='ne'?'समन्वय गर्नुहोस्':'Coordinate'}</h3><p>{lang==='ne'?'रक्तदानको उपलब्धता र सुरक्षा अस्पतालमा पुष्टि गर्नुहोस्।':'Confirm availability and safety with a licensed blood bank or hospital.'}</p></div></article>
      </div></div></section>

      <section className="action-section" id="donate"><div className="container action-layout">
        <div className="action-copy"><h2>{lang==='ne'?'रक्तदाता बन्न चाहनुहुन्छ?':'Become a voluntary donor.'}</h2><p>{lang==='ne'?'आफ्नो विवरण दर्ता गर्नुहोस् र आवश्यक पर्दा सम्पर्क हुन सहमति दिनुहोस्।':'Register your details and consent to be contacted by people looking for blood.'}</p><div className="action-aside"><ShieldCheck size={19}/><span>{lang==='ne'?'तपाईंको सहमतिबिना विवरण सार्वजनिक गरिँदैन।':'Your listing is based on your consent.'}</span></div></div>
        <div className="form-card"><div className="form-card-head"><div><h3>{lang==='ne'?'रक्तदाता दर्ता':'Donor registration'}</h3><p>{lang==='ne'?'सबै विवरण भर्नुहोस्।':'Complete each field below.'}</p></div><span className="form-icon"><Droplet size={22}/></span></div>
          <form onSubmit={submitDonor} className="stack-form">
            <div className="field"><label htmlFor="donor-name">{t.fullName}</label><input id="donor-name" required maxLength="90" value={donorForm.name} onChange={e=>setDonorForm({...donorForm,name:e.target.value})} placeholder={lang==='ne'?'पूरा नाम लेख्नुहोस्':'Enter your full name'}/></div>
            <div className="field"><label>{t.bloodGroup}</label><div className="blood-picker">{bloodGroups.map(g=><button type="button" key={g} className={donorForm.blood_group===g?'blood-choice selected':'blood-choice'} aria-pressed={donorForm.blood_group===g} onClick={()=>setDonorForm({...donorForm,blood_group:g})}>{g}</button>)}</div></div>
            <div className="field"><label htmlFor="donor-area">{lang==='ne'?'क्षेत्र':'Area'}</label><select id="donor-area" required value={donorForm.location} onChange={e=>setDonorForm({...donorForm,location:e.target.value})}><option value="">{lang==='ne'?'क्षेत्र छान्नुहोस्':'Choose your area'}</option>{locations.map(v=><option key={v.value} value={v.value}>{lang==='ne'?v.ne:v.en}</option>)}</select></div>
            <div className="field"><label htmlFor="donor-phone">{t.phone}</label><input id="donor-phone" required type="tel" inputMode="tel" autoComplete="tel" maxLength="20" value={donorForm.phone} onChange={e=>setDonorForm({...donorForm,phone:e.target.value})} placeholder="98XXXXXXXX"/></div>
            <label className="consent"><input type="checkbox" required checked={donorForm.consent} onChange={e=>setDonorForm({...donorForm,consent:e.target.checked})}/><span>{lang==='ne'?'स्वैच्छिक रक्तदाताका रूपमा सूचीमा रहन र आवश्यक व्यक्तिबाट सम्पर्क हुन म सहमत छु।':'I agree to be listed as a voluntary blood donor and to be contacted by people who need blood.'}</span></label>
            <button className="button button-red form-submit" disabled={submitting}>{submitting? t.registering:t.registerBtn}<ArrowRight size={17}/></button>
            {donorStatus==='success'&&<div className="form-message success" role="status"><Check size={16}/>{lang==='ne'?'दर्ता सफल भयो।':'Registration received successfully.'}</div>}
            {['consentRequired','invalidBloodGroup','invalidPhone','error','offline'].includes(donorStatus)&&<div className="form-message error" role="alert">{donorStatus==='invalidPhone'?'Please enter a valid Nepal mobile number.':donorStatus==='invalidBloodGroup'?'Please choose a blood group.':donorStatus==='offline'?t.backendMissing:donorStatus==='consentRequired'?t.consentRequired:t.registerError}</div>}
          </form>
        </div>
      </div></section>

      <section className="faq-section section-pad" id="faq"><div className="container"><div className="section-heading"><h2>{lang==='ne'?'बारम्बार सोधिने प्रश्न':'Frequently asked questions'}</h2></div>
        {[
          ['Who can donate blood?','A licensed blood bank or qualified health professional must assess donor eligibility. This directory does not determine eligibility.'],
          ['Are phone numbers public?','They are not displayed on donor cards. A visitor must press “Request contact” to reveal a listed number.'],
          ['How do I remove my listing?','Use the private administrator contact channel to request review or removal.'],
          ['Is this a medical service?','No. This is a community directory, not a hospital, blood bank or emergency service.']
        ].map(([q,a],i)=><article className="faq-row" key={q}><button aria-expanded={faqOpen===i} onClick={()=>setFaqOpen(faqOpen===i?-1:i)}><span>{q}</span><ChevronDown size={19}/></button>{faqOpen===i&&<p>{a}</p>}</article>)}
      </div></section>
    </main>

    <section className="privacy-section section-pad" id="privacy"><div className="container privacy-layout"><div><div className="section-kicker">{lang==='ne'?'०६ / विश्वास र गोपनीयता':'06 / TRUST & PRIVACY'}</div><h2>{lang==='en'?'Your details. Your choice.':'तपाईंको विवरण, तपाईंको निर्णय।'}</h2><p>{lang==='en'?'We collect only the details needed to connect donors and people requesting blood. Public listing is always based on your consent.':'रक्तदाता र रगत आवश्यक पर्ने व्यक्तिलाई जोड्न आवश्यक विवरण मात्र सङ्कलन गरिन्छ। सार्वजनिक सूचीमा राख्न तपाईंको सहमति अनिवार्य छ।'}</p></div><div className="privacy-points"><article><LockKeyhole size={20}/><div><b>{lang==='en'?'Limited access':'सीमित पहुँच'}</b><p>{lang==='en'?'Only the authorised site administrator can manage or remove donor records.':'अधिकृत वेबसाइट प्रशासकले मात्र रक्तदाता विवरण व्यवस्थापन वा हटाउन सक्छ।'}</p></div></article><article><Eye size={20}/><div><b>{lang==='en'?'Clear public listing':'स्पष्ट सार्वजनिक सूची'}</b><p>{lang==='en'?'Your name, blood group, area and phone are displayed automatically only if you opt in to public listing.':'तपाईंले सार्वजनिक सूचीमा राख्न सहमति दिएमा मात्र नाम, रक्त समूह, स्थान र फोन स्वतः देखाइन्छ।'}</p></div></article><article><FileText size={20}/><div><b>{lang==='en'?'Removal requests':'विवरण हटाउने अनुरोध'}</b><p>{lang==='en'?'Contact the site administrator if you want your details reviewed or removed.':'आफ्नो विवरण सच्याउन वा हटाउन वेबसाइट प्रशासकलाई सम्पर्क गर्नुहोस्।'}</p></div></article></div></div><div className="container privacy-full"><h3>{lang==='en'?'Privacy policy':'गोपनीयता नीति'}</h3><p>{lang==='en'?'BiratnagarBloodNetwork is a community contact directory, not a hospital or blood bank. When you register, the information you submit (name, phone number, blood group and location) is stored to help people find voluntary donors. Your phone number and other profile details are publicly visible only when you tick the public-listing consent box. Blood requests are kept for coordination and are not displayed in the public donor directory. The administrator account is restricted to authorised personnel and is the only role permitted to review donor registrations, update availability, or remove records. We do not intentionally sell personal information. Do not submit another person’s details without their permission. You may ask the administrator to correct or remove your information. Information may be retained only as long as needed for the directory. This is a plain-language draft and should be reviewed by the responsible organisation before public launch.':'विराटनगर रक्तदाता सञ्जाल रक्तदाता र रगत आवश्यक पर्ने व्यक्तिबीच सम्पर्क गराउने माध्यम हो; यो अस्पताल वा रक्तसञ्चार केन्द्र होइन। दर्ता गर्दा पठाइएको नाम, फोन नम्बर, रक्त समूह र स्थान स्वैच्छिक रक्तदाता खोज्न प्रयोग गरिन्छ। सार्वजनिक सूचीमा राख्न सहमति बाकसमा टिक गरेपछि मात्र तपाईंको फोन र अन्य विवरण सार्वजनिक देखाइन्छ। रक्त अनुरोधहरू समन्वयका लागि राखिन्छन् र सार्वजनिक रक्तदाता सूचीमा देखाइँदैनन्। अधिकृत प्रशासक खाताले मात्र रक्तदाता दर्ता जाँच गर्न, उपलब्धता बदल्न वा विवरण हटाउन सक्छ। व्यक्तिगत विवरण बिक्री गर्ने उद्देश्य छैन। अनुमति बिना अरू व्यक्तिको विवरण नपठाउनुहोस्। आफ्नो विवरण सच्याउन वा हटाउन प्रशासकलाई अनुरोध गर्न सक्नुहुन्छ। आवश्यक अवधिसम्म मात्र विवरण राखिनेछ। यो सरल भाषामा तयार गरिएको मस्यौदा हो; सार्वजनिक सुरुआतअघि जिम्मेवार संस्थाले समीक्षा गर्नुपर्छ।'}</p><p className="privacy-updated">Last reviewed: 21 November 2026 · अन्तिम समीक्षा: २१ नोभेम्बर २०२६</p></div></section>
    </>}

    {isPrivateAdminRoute && <section className="admin-section section-pad" id="admin"><div className="container"><div className="section-heading"><div><div className="section-kicker">{lang==='ne'?'०७ / निजी प्रशासन':'07 / PRIVATE ADMINISTRATION'}</div><h2>{lang==='en'?'Administrator dashboard':'प्रशासक ड्यासबोर्ड'}</h2><p>{lang==='en'?'A private area for the authorised administrator only.':'अधिकृत प्रशासकका लागि मात्र निजी क्षेत्र।'}</p></div><div className="admin-lock"><LockKeyhole size={23}/></div></div>
      {!supabase ? <div className="admin-locked"><LockKeyhole size={24}/><h3>{lang==='en'?'Database connection required':'डाटाबेस जडान आवश्यक छ'}</h3><p>{t.backendMissing}</p></div> : !session ? <form className="admin-login form-card" onSubmit={adminLogin}><div className="form-card-head"><div><span className="form-step">AUTHORISATION REQUIRED</span><h3>{lang==='en'?'Administrator sign in':'प्रशासक लगइन'}</h3></div><span className="form-icon"><LockKeyhole size={21}/></span></div><div className="field"><label>{lang==='ne'?'प्रशासकको इमेल':'Administrator email'}</label><input required type="email" autoComplete="username" value={adminEmail} onChange={e=>setAdminEmail(e.target.value)} placeholder="Your authorised email"/></div><div className="field"><label>{lang==='ne'?'पासवर्ड':'Password'}</label><input required type="password" autoComplete="current-password" value={adminPassword} onChange={e=>setAdminPassword(e.target.value)}/></div><button className="button button-red form-submit"><LogIn size={16}/> {lang==='en'?'Sign in securely':'सुरक्षित लगइन'}</button>{adminMessage&&<div className="form-message error">{adminMessage}</div>}<p className="form-privacy">No public administrator registration. Admin access must be assigned securely in Supabase by the project owner.</p></form> : !isAdmin ? <div className="admin-locked"><LockKeyhole size={24}/><h3>Access denied</h3><p>{adminMessage||'This account is not authorised.'}</p><button className="button button-dark" onClick={adminLogout}><LogOut size={15}/> Sign out</button></div> : <div className="admin-dashboard"><div className="admin-toolbar"><span><UserCheck size={17}/> {lang==='en'?'Signed in as authorised administrator':'अधिकृत प्रशासकका रूपमा लगइन'}</span><button onClick={adminLogout}><LogOut size={15}/> Sign out</button></div>{adminMessage&&<p className="admin-message">{adminMessage}</p>}{adminLoading?<p>Loading records…</p>:<><h3>{lang==='en'?'Donor records':'रक्तदाता विवरण'} <span>{adminDonors.length}</span></h3><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Name</th><th>Blood</th><th>Location</th><th>Phone</th><th>Listing</th><th>Review</th><th>Actions</th></tr></thead><tbody>{adminDonors.map(d=><tr key={d.id}><td>{d.name}</td><td><b className="admin-blood">{d.blood_group}</b></td><td>{d.location}</td><td>{d.phone}</td><td>{d.public_listing?'Public opt-in':'Private'}</td><td><span className={d.is_approved?'review-approved':'review-pending'}>{d.is_approved?'Approved':'Pending review'}</span></td><td><div className="admin-actions"><button onClick={()=>adminToggleApproval(d)}>{d.is_approved?'Unapprove':'Approve'}</button><button onClick={()=>adminToggleAvailability(d)}>{d.is_available?'Pause':'Activate'}</button><button className="delete-action" onClick={()=>adminDeleteDonor(d.id)}><Trash2 size={14}/> Remove</button></div></td></tr>)}</tbody></table></div></>}</div>}
    </div></section>}

    {!isPrivateAdminRoute && <footer className="footer"><div className="container footer-inner">
      <a className="brand brand-footer" href="#home"><span className="brand-mark"><Droplet size={22} fill="currentColor"/></span><span><strong>BiratnagarBloodNetwork</strong><small>Biratnagar, Morang, Nepal</small></span></a>
      <p>This is a community directory, not a medical service. Donor eligibility, availability and blood safety must be confirmed at a licensed blood bank or hospital.</p>
      <div className="footer-links"><button onClick={()=>scrollTo('find')}>Find donors</button><button onClick={()=>scrollTo('donate')}>Become a donor</button><button onClick={()=>scrollTo('faq')}>FAQ</button><button onClick={()=>scrollTo('privacy')}>Privacy</button></div>
      <small>© 2026 BiratnagarBloodNetwork</small>
    </div></footer>}
    {!isPrivateAdminRoute && <div className="mobile-action-bar"><button onClick={()=>scrollTo('find')}>Find donor</button><button onClick={()=>scrollTo('donate')}>Become a donor</button></div>}
  </div>;
}

createRoot(document.getElementById('root')).render(<App/>);