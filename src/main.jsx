import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createClient } from '@supabase/supabase-js';
import { ArrowRight, ArrowUpRight, BadgeCheck, Check, ChevronDown, Clock3, Droplet, HeartHandshake, HeartPulse, Languages, MapPin, Menu, Search, ShieldCheck, Users, X, LockKeyhole, Trash2, LogIn, LogOut, FileText, Eye, UserCheck, Phone, Quote } from 'lucide-react';
import './style.css';

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
    eyebrow:'A COMMUNITY THAT SHOWS UP', title:'A little help can mean', titleAccent:'another tomorrow.', intro:'Connecting people who are ready to donate blood with people who need it — starting in Biratnagar.', find:'Find a donor', become:'Become a donor', local:'BIRATNAGAR & NEARBY', community:'Real people. One connected community.', communityText:'When a blood request comes in, finding the right person quickly matters. BiratnagarBloodNetwork helps make that connection easier.', donorCount:'registered donors', groups:'blood groups', mission:'one shared purpose',
    searchTitle:'Find a blood donor', searchText:'Filter reviewed, consenting donors by blood group and area.', bloodGroup:'Blood group', allGroups:'All blood groups', location:'Location', locationPlaceholder:'e.g. Biratnagar, Tintolia…', searchBtn:'Search donors', available:'Available donors', noResults:'No matching donors yet', noResultsText:'Try another blood group. If this is urgent, contact a nearby licensed blood bank or hospital.', demo:'Illustrative sample', demoNote:'No sample donor profiles are shown. Only actual consenting records appear after the database is connected.', registerTitle:'Your one registration could help someone.', registerText:'Join the local donor community. Your details are only listed publicly if you choose public visibility.', fullName:'Full name', phone:'Phone number', chooseGroup:'Choose blood group', area:'Your location / neighbourhood', areaPlaceholder:'e.g. Biratnagar-4, Morang', publicConsent:'Optional: I agree to show my name, blood group, area and phone number publicly so people can contact me.', registerBtn:'Register as a donor', registering:'Submitting…', registerSuccess:'Thank you for registering.', registerSuccessText:'Your donor profile has been submitted.', registerError:'Could not submit your registration. Please try again.', privacy:'Your information is personal. Only register if you are comfortable sharing the selected details. You can request removal later.', needTitle:'Looking for blood?', needText:'Share the basic details of the request so the community team can help coordinate.', patientName:'Contact person name', neededGroup:'Blood group needed', units:'Units needed', hospital:'Hospital / location', hospitalPlaceholder:'Hospital name and area', needPhone:'Contact phone', requestBtn:'Submit blood request', requestSuccess:'Request submitted', requestSuccessText:'Your request has been received.', requestError:'Could not submit the request. Please try again.', awarenessEyebrow:'KNOW BEFORE YOU DONATE', awarenessTitle:'A few things worth knowing.', awarenessText:'Blood donation is a generous act — and it should always be safe, voluntary and guided by qualified health professionals.', fact1:'Check your eligibility', fact1Text:'A health professional or blood bank staff member should assess whether you can donate today.', fact2:'Every donation is screened', fact2Text:'Donated blood is tested and handled by qualified services before it can be used.', fact3:'Ask the blood bank', fact3Text:'Blood type alone does not confirm compatibility. The hospital or blood bank must complete the required checks.', safety:'BiratnagarBloodNetwork is a community connection platform, not a blood bank or medical service. Donor availability, eligibility and blood compatibility must be confirmed by a licensed blood bank or hospital.', footerLine:'A stronger community, one connection at a time.', about:'About', directory:'Find donors', awareness:'Awareness', contact:'Contact', menu:'Menu', live:'Community connection platform', privacyTitle:'Your privacy matters', privacyText:'Donor contact details are shown only when the donor explicitly agrees. Never share another person’s details without their permission.', coordinator:'For urgent medical needs, contact a licensed blood bank or hospital directly.', needHelp:'Need blood', donorForm:'Donor registration', online:'Live directory', preview:'Preview mode', backendMissing:'Live registration and donor search will activate after the secure database is connected.', requestConsent:'I confirm this request is being submitted with the contact person’s permission.'
  },
  ne: {
    eyebrow:'समुदायको साथ, जीवनको आशा', title:'रक्तदान गरौं,', titleAccent:'जीवन बचाऔं।', intro:'रक्तदान गर्न इच्छुक व्यक्ति र रगत आवश्यक पर्ने व्यक्तिलाई जोड्ने प्रयास — विराटनगरबाट सुरु।', find:'मलाई रगत चाहिन्छ', become:'म रक्तदाता हुँ', local:'विराटनगर तथा आसपास', community:'वास्तविक मानिस। एउटै समुदाय।', communityText:'रगतको आवश्यकता पर्दा सही व्यक्तिसँग छिटो सम्पर्क हुन जरुरी हुन्छ। विराटनगर रक्तदाता सञ्जालले यस्तो सम्पर्क सहज बनाउन मद्दत गर्छ।', donorCount:'दर्ता भएका रक्तदाता', groups:'रक्त समूह', mission:'एउटै साझा उद्देश्य',
    searchTitle:'रक्तदाता खोज्नुहोस्', searchText:'रक्त समूह र स्थानका आधारमा जाँच गरिएका, सहमति दिएका रक्तदाता खोज्नुहोस्।', bloodGroup:'रक्त समूह', allGroups:'सबै रक्त समूह', location:'स्थान', locationPlaceholder:'जस्तै: विराटनगर, टिनटोलिया…', searchBtn:'खोज्नुहोस्', available:'उपलब्ध', noResults:'मिल्दो रक्तदाता भेटिएन', noResultsText:'अर्को रक्त समूह छानेर खोज्नुहोस्। आपतकालीन अवस्थामा नजिकको मान्यता प्राप्त रक्तसञ्चार केन्द्र वा अस्पतालमा सम्पर्क गर्नुहोस्।', demo:'उदाहरण मात्र', demoNote:'नमुना रक्तदाता विवरण देखाइँदैन। डाटाबेस जडान भएपछि सहमति दिएका वास्तविक विवरण मात्र देखाइनेछन्।', registerTitle:'तपाईंको दर्ताले कसैलाई आशा दिन सक्छ।', registerText:'स्थानीय रक्तदाता समुदायमा जोडिनुहोस्। तपाईंले सार्वजनिक देखाउन सहमति दिएमा मात्र विवरण सूचीमा देखाइनेछ।', fullName:'पूरा नाम', phone:'मोबाइल नम्बर', chooseGroup:'रक्त समूह छान्नुहोस्', area:'ठेगाना / स्थान', areaPlaceholder:'जस्तै: विराटनगर-४, मोरङ', publicConsent:'ऐच्छिक: मानिसहरूले मसँग सम्पर्क गर्न सकून् भनेर मेरो नाम, रक्त समूह, स्थान र फोन नम्बर सार्वजनिक देखाउन म सहमत छु।', registerBtn:'रक्तदाताका रूपमा दर्ता गर्नुहोस्', registering:'पठाउँदै…', registerSuccess:'धन्यवाद! तपाईंको नाम सुरक्षित भयो।', registerSuccessText:'तपाईंको रक्तदाता विवरण पठाइएको छ।', registerError:'दर्ता पठाउन सकिएन। कृपया फेरि प्रयास गर्नुहोस्।', privacy:'तपाईंको विवरण व्यक्तिगत हो। सार्वजनिक रूपमा देखाउन सहज भएमा मात्र दर्ता गर्नुहोस्। पछि हटाउन अनुरोध गर्न सक्नुहुन्छ।', needTitle:'रगत आवश्यक छ?', needText:'समन्वयमा सहयोग गर्न आवश्यक आधारभूत विवरण पठाउनुहोस्।', patientName:'सम्पर्क व्यक्तिको नाम', neededGroup:'आवश्यक रक्त समूह', units:'कति पिन्ट चाहिएको', hospital:'अस्पताल / स्थान', hospitalPlaceholder:'अस्पतालको नाम र स्थान', needPhone:'सम्पर्क फोन', requestBtn:'रक्त अनुरोध पठाउनुहोस्', requestSuccess:'अनुरोध पठाइयो', requestSuccessText:'तपाईंको अनुरोध प्राप्त भएको छ।', requestError:'अनुरोध पठाउन सकिएन। फेरि प्रयास गर्नुहोस्।', awarenessEyebrow:'रक्तदान गर्नुअघि जानौँ', awarenessTitle:'जान्नैपर्ने केही कुरा।', awarenessText:'रक्तदान उदार कार्य हो — यो सधैँ सुरक्षित, स्वैच्छिक र स्वास्थ्यकर्मीको सल्लाहअनुसार हुनुपर्छ।', fact1:'योग्यता जाँच गराउनुहोस्', fact1Text:'आज रक्तदान गर्न मिल्छ कि मिल्दैन भन्ने कुरा स्वास्थ्यकर्मी वा रक्तसञ्चार केन्द्रले जाँच गर्नुपर्छ।', fact2:'रगत परीक्षण गरिन्छ', fact2Text:'प्रयोग गर्नुअघि दान गरिएको रगत सम्बन्धित सेवाबाट परीक्षण र व्यवस्थापन गरिन्छ।', fact3:'रक्तसञ्चार केन्द्रसँग बुझ्नुहोस्', fact3Text:'रक्त समूह मिल्दैमा रगत सुरक्षित रूपमा मिल्छ भन्ने हुँदैन। आवश्यक परीक्षण अस्पताल वा रक्तसञ्चार केन्द्रले गर्नुपर्छ।', safety:'विराटनगर रक्तदाता सञ्जाल रक्तदाता र आवश्यक पर्ने व्यक्तिबीच सम्पर्क गराउने समुदायिक माध्यम हो, रक्तसञ्चार केन्द्र वा चिकित्सा सेवा होइन। रक्तदाताको उपलब्धता, योग्यता र रगतको अनुकूलता मान्यता प्राप्त रक्तसञ्चार केन्द्र वा अस्पतालबाट पुष्टि गर्नुपर्छ।', footerLine:'समुदायको साथ, हरेक सम्पर्कमा नयाँ आशा।', about:'हाम्रो बारेमा', directory:'रक्तदाताको सूची', awareness:'जनचेतना', contact:'सम्पर्क', menu:'मेनु', live:'समुदायिक सम्पर्क माध्यम', privacyTitle:'तपाईंको गोपनीयता महत्त्वपूर्ण छ', privacyText:'रक्तदाताले स्पष्ट सहमति दिएमा मात्र सम्पर्क विवरण सार्वजनिक देखाइन्छ। अनुमति बिना अरूको विवरण साझा नगर्नुहोस्।', coordinator:'तत्काल स्वास्थ्य आवश्यकताका लागि मान्यता प्राप्त रक्तसञ्चार केन्द्र वा अस्पतालमा सिधै सम्पर्क गर्नुहोस्।', needHelp:'मलाई रगत चाहिन्छ', donorForm:'रक्तदाता दर्ता', online:'प्रत्यक्ष सूची', preview:'पूर्वावलोकन', backendMissing:'सुरक्षित डाटाबेस जोडिएपछि मात्र प्रत्यक्ष दर्ता र रक्तदाता खोजी सुरु हुनेछ।', requestConsent:'सम्पर्क व्यक्तिको सहमतिमा यो अनुरोध पठाइएको हो भन्ने म पुष्टि गर्छु।'
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
  const [lang,setLang] = useState(() => { try { return localStorage.getItem('rakta-language') || 'ne'; } catch { return 'ne'; } });
  const [mobileMenu,setMobileMenu] = useState(false);
  const [group,setGroup] = useState('all');
  const [searchLocation,setSearchLocation] = useState('');
  
  const [donors,setDonors] = useState([]);
  const [loading,setLoading] = useState(false);
  const [searchDone,setSearchDone] = useState(false);
  const [searchError,setSearchError] = useState(false);
  const [donorForm,setDonorForm] = useState({name:'',phone:'',blood_group:'',location:'',consent:false});
  const [requestForm,setRequestForm] = useState({name:'',phone:'',blood_group:'',units:'1',hospital:'',consent:false});
  const [donorStatus,setDonorStatus] = useState('');
  const [requestStatus,setRequestStatus] = useState('');
  const [submitting,setSubmitting] = useState(false);
  const [session,setSession] = useState(null);
  const [adminEmail,setAdminEmail] = useState('');
  const [adminPassword,setAdminPassword] = useState('');
  const [adminMessage,setAdminMessage] = useState('');
  const [adminDonors,setAdminDonors] = useState([]);
  const [adminRequests,setAdminRequests] = useState([]);
  const [adminLoading,setAdminLoading] = useState(false);
  const [isAdmin,setIsAdmin] = useState(false);
  const [privacyOpen,setPrivacyOpen] = useState(false);
  const t = copy[lang];
  useEffect(() => { document.documentElement.lang = lang; document.title = lang === 'ne' ? 'विराटनगर रक्तदाता सञ्जाल' : 'BiratnagarBloodNetwork'; try { localStorage.setItem('rakta-language',lang); } catch {} }, [lang]);

  useEffect(() => {
    if (!supabase) return;
    searchDonors();
    supabase.auth.getSession().then(({data}) => setSession(data.session));
    const {data:{subscription}} = supabase.auth.onAuthStateChange((_event,nextSession) => setSession(nextSession));
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session && supabase) loadAdminData();
    else { setIsAdmin(false); setAdminDonors([]); setAdminRequests([]); }
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
    const [donorResult,requestResult] = await Promise.all([
      supabase.from('donors').select('id,name,phone,blood_group,location,public_listing,is_available,is_approved,created_at').order('created_at',{ascending:false}),
      supabase.from('blood_requests').select('id,contact_name,contact_phone,blood_group,units,hospital_location,created_at').order('created_at',{ascending:false})
    ]);
    if (donorResult.error || requestResult.error) setAdminMessage('Could not load all records. Check the database policies.');
    setAdminDonors(donorResult.data || []);
    setAdminRequests(requestResult.data || []);
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

  async function adminDeleteRequest(id) {
    if (!window.confirm('Remove this blood request?')) return;
    const {error} = await supabase.from('blood_requests').delete().eq('id',id);
    if (error) setAdminMessage('Could not remove this request.');
    else setAdminRequests(rows=>rows.filter(row=>row.id!==id));
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
    let query = supabase.from('donors').select('id,name,phone,blood_group,location,is_available,created_at').eq('is_available',true).eq('public_listing',true).eq('is_approved',true).order('created_at',{ascending:false});
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
    if (!cleanPhone) { setDonorStatus('invalidPhone'); return; }
    if (!donorForm.blood_group) { setDonorStatus('invalidBloodGroup'); return; }
    setSubmitting(true);
    try {
      const {error} = await supabase.from('donors').insert({
        name:donorForm.name.trim(),
        phone:cleanPhone,
        blood_group:donorForm.blood_group,
        location:donorForm.location.trim(),
        public_listing:donorForm.consent,
        is_available:true,
        is_approved:false
      });
      if (error) throw error;
      setDonorStatus('success');
      setDonorForm({name:'',phone:'',blood_group:'',location:'',consent:false});
    } catch (error) {
      console.error('Donor registration failed:', error);
      setDonorStatus('error');
    } finally {
      setSubmitting(false);
    }
  }

  async function submitRequest(e) {
    e.preventDefault(); setRequestStatus('');
    if (!supabase) { setRequestStatus('offline'); return; }
    const cleanPhone = normalizeNepalPhone(requestForm.phone);
    if (!cleanPhone) { setRequestStatus('invalidPhone'); return; }
    setSubmitting(true);
    try {
      const {error} = await supabase.from('blood_requests').insert({
        contact_name:requestForm.name.trim(),
        contact_phone:cleanPhone,
        blood_group:requestForm.blood_group,
        units:Number(requestForm.units),
        hospital_location:requestForm.hospital.trim(),
        consent_confirmed:requestForm.consent
      });
      if (error) throw error;
      setRequestStatus('success');
      setRequestForm({name:'',phone:'',blood_group:'',units:'1',hospital:'',consent:false});
    } catch (error) {
      console.error('Blood request submission failed:', error);
      setRequestStatus('error');
    } finally {
      setSubmitting(false);
    }
  }

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

  return <div className="site-shell">
    <div className="topline"><div className="container topline-inner"><span><span className="pulse"></span>{t.live}</span><span className="topline-right"><MapPin size={13}/> Biratnagar, Nepal <span className="top-divider"></span><div className="language-switch"><button className={lang==='ne'?'active':''} onClick={()=>setLang('ne')}>नेपाली</button><span>|</span><button className={lang==='en'?'active':''} onClick={()=>setLang('en')}>English</button></div></span></div></div>
    <header className="header"><div className="container nav-wrap">
      <a className="brand" href="#" onClick={e=>{e.preventDefault();scrollTo('home')}}><span className="brand-mark"><Droplet size={24} fill="currentColor"/></span><span><strong>{lang==='ne'?'विराटनगर रक्तदाता सञ्जाल':'BiratnagarBloodNetwork'}</strong><small>{lang==='ne'?'विराटनगर, नेपाल':'BIRATNAGAR, NEPAL'}</small></span></a>
      <nav className={mobileMenu?'nav-links open':'nav-links'}><button onClick={()=>scrollTo('home')}>{lang==='ne'?'गृहपृष्ठ':'Home'}</button><button className="nav-register" onClick={()=>scrollTo('donate')}>{lang==='ne'?'रक्तदाता दर्ता':'Donor Registration'}</button><button onClick={()=>scrollTo('find')}>{lang==='ne'?'रक्तदाता खोज्नुहोस्':'Find Donors'}</button><button onClick={()=>scrollTo('request')}>{lang==='ne'?'रगत अनुरोध':'Request Blood'}</button><button onClick={()=>scrollTo('awareness')}>{lang==='ne'?'रक्तदान जानकारी':'Donation Info'}</button><button onClick={()=>scrollTo('about')}>{t.about}</button><button onClick={()=>scrollTo('privacy')}>{lang==='en'?'Privacy':'गोपनीयता'}</button><button className="nav-cta" onClick={()=>scrollTo('donate')}>{t.become}<ArrowUpRight size={15}/></button></nav>
      <button className="mobile-toggle" onClick={()=>setMobileMenu(!mobileMenu)} aria-label="Toggle menu">{mobileMenu?<X/>:<Menu/>}</button>
    </div></header>

    <main>
      <section className="hero" id="home"><div className="hero-grid"></div><div className="container hero-content">
        <div className="hero-copy"><div className="eyebrow"><span className="eyebrow-line"></span>{t.eyebrow}</div><h1>{t.title}<br/><em>{t.titleAccent}</em></h1><p className="hero-intro">{t.intro}</p><div className="hero-actions"><button className="button button-light" onClick={()=>scrollTo('find')}>{lang==='ne'?'रक्तदाता खोज्नुहोस्':'Find a Donor'}<Search size={17}/></button><button className="button button-outline" onClick={()=>scrollTo('request')}>{lang==='ne'?'रगत अनुरोध गर्नुहोस्':'Request Blood'}<ArrowRight size={17}/></button></div><div className="hero-proof"><div className="proof-icon"><HeartHandshake size={18}/></div><span>{t.local}</span><span className="proof-dot"></span><span>EST. FOR COMMUNITY</span></div></div>

      <div className="hero-illustration" aria-label="Illustration of a blood donation bag"><svg viewBox="0 0 340 340" role="img" aria-hidden="true"><circle cx="170" cy="170" r="150" fill="#fbe8e8"/><circle cx="170" cy="170" r="116" fill="#fff"/><path d="M139 58h62v26h-62z" rx="8" fill="#b71c2b"/><path d="M126 84h88v164a18 18 0 0 1-18 18h-52a18 18 0 0 1-18-18z" fill="#fff" stroke="#b71c2b" strokeWidth="7"/><path d="M132 173h76v73a12 12 0 0 1-12 12h-52a12 12 0 0 1-12-12z" fill="#c62828"/><path d="M170 113v42m-21-21h42" stroke="#c62828" strokeWidth="9" strokeLinecap="round"/><path d="M170 266v29m0 0c0 10-16 10-16 0" fill="none" stroke="#b71c2b" strokeWidth="6" strokeLinecap="round"/><path d="M218 112l19-13m-111 17-17-14" stroke="#d9a3a3" strokeWidth="5" strokeLinecap="round"/><rect x="225" y="210" width="58" height="58" rx="18" fill="#fff" stroke="#f0d0d0"/><path d="M254 222c-13 0-18 15 0 31 18-16 13-31 0-31z" fill="#c62828"/></svg><p>{lang==='ne'?'एक थोपा रगत, धेरै आशा':'One donation. A world of hope.'}</p></div></div><div className="hero-bottom"><div className="container hero-bottom-inner"><span>01 — CONNECT</span><span>02 — SUPPORT</span><span>03 — SAVE LIVES</span><span className="hero-bottom-caption">A LOCAL INITIATIVE FOR BIRATNAGAR</span></div></div></section>

      <section className="directory-section section-pad" id="find"><div className="container"><div className="section-heading"><div><div className="section-kicker">{lang==='ne'?'०२ / रक्तदाताको सूची':'02 / THE DIRECTORY'}</div><h2>{t.searchTitle}</h2><p>{t.searchText}</p></div><div className="section-number">02</div></div>
        <form className="search-panel portal-search" onSubmit={searchDonors}><div className="field"><label>{t.bloodGroup}</label><div className="select-wrap"><Droplet size={16}/><select value={group} onChange={e=>setGroup(e.target.value)}><option value="all">{t.allGroups}</option>{bloodGroups.map(g=><option key={g}>{g}</option>)}</select><ChevronDown size={15}/></div></div><div className="field"><label>{t.location}</label><input value={searchLocation} onChange={e=>setSearchLocation(e.target.value)} placeholder={lang==='ne'?'विराटनगर, वडा वा टोल लेख्नुहोस्':'Enter city, ward or area'}/></div><button className="button button-red search-submit" type="submit"><Search size={17}/>{t.searchBtn}</button></form>
        <div className="directory-meta"><div><span className="status-dot"></span><strong>{t.available}</strong><span className="meta-count">{searchDone?displayed.length:0}</span></div><span className="sample-label">{!supabase?t.demo:t.online}</span></div>
        {!supabase && <div className="preview-notice"><span><ShieldCheck size={16}/></span><div><strong>{t.preview}</strong><p>{t.backendMissing} {t.demoNote}</p></div></div>}
        {loading ? <div className="empty-state">Loading…</div> : searchError ? <div className="empty-state"><h3>{lang==='ne'?'सूची उपलब्ध छैन':'Directory temporarily unavailable'}</h3><p>{lang==='ne'?'डाटाबेस जडान वा अनुमति जाँच गर्न प्रशासकलाई सम्पर्क गर्नुहोस्।':'Please ask the site administrator to check the database connection and permissions.'}</p></div> : displayed.length ? <div className="donor-grid">{displayed.map(d=><article className="donor-card" key={d.id}><div className="donor-card-top"><div className="blood-badge">{d.blood_group}</div><span className="available-tag"><span></span>{t.available}</span></div><h3>{d.name}</h3><p className="donor-location"><MapPin size={15}/>{d.location}</p><div className="donor-phone-preview"><Phone size={15}/><span>{String(d.phone||'').replace(/.(?=.{2})/g,'•')}</span><small>{lang==='ne'?'सहमतिअनुसार सम्पर्क':'Shared with donor consent'}</small></div><a className="donor-contact" href={`tel:${d.phone}`}><Phone size={17}/>{lang==='ne'?'रक्तदातालाई फोन गर्नुहोस्':'Call donor'}</a><span className="card-caption">{lang==='ne'?'पहिले अस्पतालसँग उपलब्धता पुष्टि गर्नुहोस्':'Please confirm availability with the hospital'}</span></article>)}</div> : <div className="empty-state"><div className="empty-icon"><Search size={23}/></div><h3>{t.noResults}</h3><p>{t.noResultsText}</p></div>}
      </div></section>

      <section className="action-section" id="donate"><div className="container action-layout"><div className="action-copy"><div className="section-kicker light-kicker">{lang==='ne'?'०३ / समुदायमा जोडिनुहोस्':'03 / JOIN THE COMMUNITY'}</div><h2>{t.registerTitle}</h2><p>{t.registerText}</p><div className="action-aside"><ShieldCheck size={19}/><span>{t.privacyTitle}<small>{t.privacyText}</small></span></div><div className="action-aside"><HeartPulse size={19}/><span>{t.coordinator}</span></div></div><div className="form-card"><div className="form-card-head"><div><span className="form-step">{lang==='ne'?'चरण १ — व्यक्तिगत विवरण':'STEP 1 — DONOR DETAILS'}</span><h3>{t.donorForm}</h3></div><span className="form-icon"><Droplet size={22}/></span></div><form onSubmit={submitDonor} className="stack-form"><div className="field"><label>{t.fullName}</label><input required maxLength="90" value={donorForm.name} onChange={e=>setDonorForm({...donorForm,name:e.target.value})} placeholder={lang==='ne'?'पूरा नाम लेख्नुहोस्':'Enter your full name'}/></div><div className="form-row"><div className="field"><label>{t.phone}</label><input required type="tel" maxLength="20" value={donorForm.phone} onChange={e=>setDonorForm({...donorForm,phone:e.target.value})} placeholder={lang==='ne'?'९८XXXXXXXX':'98XXXXXXXX'}/></div><div className="field"><label>{t.bloodGroup}</label><div className="blood-picker">{bloodGroups.map(g=><button type="button" key={g} className={donorForm.blood_group===g?'blood-choice selected':'blood-choice'} aria-pressed={donorForm.blood_group===g} onClick={()=>setDonorForm({...donorForm,blood_group:g})}>{g}</button>)}</div></div></div><div className="field"><label>{t.area}</label><select required value={donorForm.location} onChange={e=>setDonorForm({...donorForm,location:e.target.value})}><option value="">{lang==='ne'?'स्थान छान्नुहोस्':'Choose your area'}</option>{locations.map(v=><option key={v.value} value={v.value}>{lang==='ne'?v.ne:v.en}</option>)}</select></div><label className="consent"><input type="checkbox" checked={donorForm.consent} onChange={e=>setDonorForm({...donorForm,consent:e.target.checked})}/><span>{t.publicConsent}</span></label><p className="form-privacy">{t.privacy}</p><button className="button button-red form-submit" disabled={submitting}>{submitting?<><span className="loading-spinner" aria-hidden="true"/>{t.registering}</>:t.registerBtn}<ArrowRight size={17}/></button>{donorStatus==='success'&&<div className="form-message success"><Check size={16}/>{lang==='ne'?'दर्ता सुरक्षित भयो। सार्वजनिक सूचीमा राख्न प्रशासकले सहमति र विवरण जाँच गरेपछि मात्र देखिनेछ।':'Registration received. Your profile stays private until an administrator reviews the consent and approves the listing.'}</div>}{donorStatus==='invalidBloodGroup'&&<div className="form-message error">{lang==='ne'?'कृपया रक्त समूह छान्नुहोस्।':'Please choose a blood group.'}</div>}{donorStatus==='invalidPhone'&&<div className="form-message error">{lang==='ne'?'कृपया १० अंकको मोबाइल नम्बर राख्नुहोस्':'Please enter a valid 10-digit mobile number.'}</div>}{donorStatus==='error'&&<div className="form-message error">{t.registerError}</div>}{donorStatus==='offline'&&<div className="form-message error">{t.backendMissing}</div>}</form></div></div></section>

      <section className="intro-band" id="about"><div className="container intro-layout"><div><div className="section-kicker">01 / {t.about}</div><h2>{t.community}</h2></div><div className="intro-right"><p>{t.communityText}</p><div className="mini-stats"><div><strong>8</strong><span>{t.groups}</span></div><div><strong>01</strong><span>{t.mission}</span></div><div><strong>24/7</strong><span>Community-led</span></div></div></div></div></section>

      <section className="quote-band"><div className="container quote-inner"><Quote size={28}/><blockquote>{lang==='ne'?'सानो सहयोगले पनि कसैको जीवनमा ठूलो आशा जगाउन सक्छ।':'A small act of kindness can bring a lifetime of hope.'}</blockquote><span>{lang==='ne'?'— विराटनगर रक्तदाता सञ्जाल':'— BiratnagarBloodNetwork'}</span></div></section>

      <section className="request-section section-pad" id="request"><div className="container request-layout"><div className="request-heading"><div className="section-kicker">{lang==='ne'?'०४ / रगतको अनुरोध':'04 / REQUEST SUPPORT'}</div><h2>{t.needTitle}</h2><p>{t.needText}</p><div className="request-callout"><Clock3 size={19}/><span>{t.coordinator}</span></div></div><div className="request-form-wrap"><div className="form-card request-card"><div className="form-card-head"><div><span className="form-step">{lang==='ne'?'चरण १ — अनुरोध विवरण':'STEP 1 — REQUEST DETAILS'}</span><h3>{t.needHelp}</h3></div><span className="form-icon"><HeartPulse size={22}/></span></div><form className="stack-form" onSubmit={submitRequest}><div className="form-row"><div className="field"><label>{t.patientName}</label><input required maxLength="90" value={requestForm.name} onChange={e=>setRequestForm({...requestForm,name:e.target.value})}/></div><div className="field"><label>{t.needPhone}</label><input required type="tel" maxLength="20" value={requestForm.phone} onChange={e=>setRequestForm({...requestForm,phone:e.target.value})}/></div></div><div className="form-row"><div className="field"><label>{t.neededGroup}</label><select required value={requestForm.blood_group} onChange={e=>setRequestForm({...requestForm,blood_group:e.target.value})}><option value="">{t.chooseGroup}</option>{bloodGroups.map(g=><option key={g}>{g}</option>)}</select></div><div className="field"><label>{t.units}</label><select value={requestForm.units} onChange={e=>setRequestForm({...requestForm,units:e.target.value})}>{['1','2','3','4','5'].map(n=><option key={n}>{n}</option>)}</select></div></div><div className="field"><label>{t.hospital}</label><input required maxLength="160" value={requestForm.hospital} onChange={e=>setRequestForm({...requestForm,hospital:e.target.value})} placeholder={t.hospitalPlaceholder}/></div><label className="consent"><input type="checkbox" required checked={requestForm.consent} onChange={e=>setRequestForm({...requestForm,consent:e.target.checked})}/><span>{t.requestConsent}</span></label><button className="button button-dark form-submit" disabled={submitting}>{submitting?<><span className="loading-spinner" aria-hidden="true"/>{lang==='ne'?'पठाउँदै…':'Submitting…'}</>:<>{t.requestBtn}<ArrowRight size={17}/></>}</button>{requestStatus==='success'&&<div className="form-message success"><Check size={16}/>{t.requestSuccess} {t.requestSuccessText}</div>}{requestStatus==='invalidPhone'&&<div className="form-message error">{lang==='ne'?'कृपया १० अंकको मोबाइल नम्बर राख्नुहोस्':'Please enter a valid 10-digit mobile number.'}</div>}{requestStatus==='error'&&<div className="form-message error">{t.requestError}</div>}{requestStatus==='offline'&&<div className="form-message error">{t.backendMissing}</div>}</form></div></div></div></section>

      <section className="awareness-section section-pad" id="awareness"><div className="container"><div className="section-heading awareness-heading"><div><div className="section-kicker">05 / {t.awarenessEyebrow}</div><h2>{t.awarenessTitle}</h2><p>{t.awarenessText}</p></div><div className="section-number">05</div></div><div className="awareness-grid"><article><span className="awareness-icon"><BadgeCheck size={22}/></span><span className="awareness-index">01</span><h3>{t.fact1}</h3><p>{t.fact1Text}</p></article><article><span className="awareness-icon"><ShieldCheck size={22}/></span><span className="awareness-index">02</span><h3>{t.fact2}</h3><p>{t.fact2Text}</p></article><article><span className="awareness-icon"><HeartPulse size={22}/></span><span className="awareness-index">03</span><h3>{t.fact3}</h3><p>{t.fact3Text}</p></article></div><div className="safety-note"><ShieldCheck size={20}/><p>{t.safety}</p></div></div></section>
    </main>

    <section className="privacy-section section-pad" id="privacy"><div className="container privacy-layout"><div><div className="section-kicker">{lang==='ne'?'०६ / विश्वास र गोपनीयता':'06 / TRUST & PRIVACY'}</div><h2>{lang==='en'?'Your details. Your choice.':'तपाईंको विवरण, तपाईंको निर्णय।'}</h2><p>{lang==='en'?'We collect only the details needed to connect donors and people requesting blood. Public listing is always based on your consent.':'रक्तदाता र रगत आवश्यक पर्ने व्यक्तिलाई जोड्न आवश्यक विवरण मात्र सङ्कलन गरिन्छ। सार्वजनिक सूचीमा राख्न तपाईंको सहमति अनिवार्य छ।'}</p></div><div className="privacy-points"><article><LockKeyhole size={20}/><div><b>{lang==='en'?'Limited access':'सीमित पहुँच'}</b><p>{lang==='en'?'Only the authorised site administrator can manage or remove donor records.':'अधिकृत वेबसाइट प्रशासकले मात्र रक्तदाता विवरण व्यवस्थापन वा हटाउन सक्छ।'}</p></div></article><article><Eye size={20}/><div><b>{lang==='en'?'Clear public listing':'स्पष्ट सार्वजनिक सूची'}</b><p>{lang==='en'?'Your name, blood group, area and phone are displayed only after you opt in and an administrator approves the record.':'तपाईंले सहमति दिएर प्रशासकले विवरण जाँच गरी स्वीकृत गरेपछि मात्र नाम, रक्त समूह, स्थान र फोन सार्वजनिक देखाइन्छ।'}</p></div></article><article><FileText size={20}/><div><b>{lang==='en'?'Removal requests':'विवरण हटाउने अनुरोध'}</b><p>{lang==='en'?'Contact the site administrator if you want your details reviewed or removed.':'आफ्नो विवरण सच्याउन वा हटाउन वेबसाइट प्रशासकलाई सम्पर्क गर्नुहोस्।'}</p></div></article></div></div><div className="container privacy-full"><h3>{lang==='en'?'Privacy policy':'गोपनीयता नीति'}</h3><p>{lang==='en'?'BiratnagarBloodNetwork is a community contact directory, not a hospital or blood bank. When you register, the information you submit (name, phone number, blood group and location) is stored to help people find voluntary donors. Your phone number and other profile details are publicly visible only when you tick the public-listing consent box. Blood requests are kept for coordination and are not displayed in the public donor directory. The administrator account is restricted to authorised personnel and is the only role permitted to view private submissions, update donor availability, or remove records. We do not intentionally sell personal information. Do not submit another person’s details without their permission. You may ask the administrator to correct or remove your information. Information may be retained only as long as needed for the directory and coordination. This is a plain-language draft and should be reviewed by the responsible organisation before public launch.':'विराटनगर रक्तदाता सञ्जाल रक्तदाता र रगत आवश्यक पर्ने व्यक्तिबीच सम्पर्क गराउने माध्यम हो; यो अस्पताल वा रक्तसञ्चार केन्द्र होइन। दर्ता गर्दा पठाइएको नाम, फोन नम्बर, रक्त समूह र स्थान स्वैच्छिक रक्तदाता खोज्न प्रयोग गरिन्छ। सार्वजनिक सूचीमा राख्न सहमति बाकसमा टिक गरेपछि मात्र तपाईंको फोन र अन्य विवरण सार्वजनिक देखाइन्छ। रक्त अनुरोधहरू समन्वयका लागि राखिन्छन् र सार्वजनिक रक्तदाता सूचीमा देखाइँदैनन्। अधिकृत प्रशासक खाताले मात्र निजी विवरण हेर्न, रक्तदाताको उपलब्धता बदल्न वा विवरण हटाउन सक्छ। व्यक्तिगत विवरण बिक्री गर्ने उद्देश्य छैन। अनुमति बिना अरू व्यक्तिको विवरण नपठाउनुहोस्। आफ्नो विवरण सच्याउन वा हटाउन प्रशासकलाई अनुरोध गर्न सक्नुहुन्छ। आवश्यक अवधिसम्म मात्र विवरण राखिनेछ। यो सरल भाषामा तयार गरिएको मस्यौदा हो; सार्वजनिक सुरुआतअघि जिम्मेवार संस्थाले समीक्षा गर्नुपर्छ।'}</p><p className="privacy-updated">Last reviewed: 21 November 2026 · अन्तिम समीक्षा: २१ नोभेम्बर २०२६</p></div></section>

    <section className="admin-section section-pad" id="admin"><div className="container"><div className="section-heading"><div><div className="section-kicker">{lang==='ne'?'०७ / निजी प्रशासन':'07 / PRIVATE ADMINISTRATION'}</div><h2>{lang==='en'?'Administrator dashboard':'प्रशासक ड्यासबोर्ड'}</h2><p>{lang==='en'?'A private area for the authorised administrator only.':'अधिकृत प्रशासकका लागि मात्र निजी क्षेत्र।'}</p></div><div className="admin-lock"><LockKeyhole size={23}/></div></div>
      {!supabase ? <div className="admin-locked"><LockKeyhole size={24}/><h3>{lang==='en'?'Database connection required':'डाटाबेस जडान आवश्यक छ'}</h3><p>{t.backendMissing}</p></div> : !session ? <form className="admin-login form-card" onSubmit={adminLogin}><div className="form-card-head"><div><span className="form-step">AUTHORISATION REQUIRED</span><h3>{lang==='en'?'Administrator sign in':'प्रशासक लगइन'}</h3></div><span className="form-icon"><LockKeyhole size={21}/></span></div><div className="field"><label>{lang==='ne'?'प्रशासकको इमेल':'Administrator email'}</label><input required type="email" autoComplete="username" value={adminEmail} onChange={e=>setAdminEmail(e.target.value)} placeholder="Your authorised email"/></div><div className="field"><label>{lang==='ne'?'पासवर्ड':'Password'}</label><input required type="password" autoComplete="current-password" value={adminPassword} onChange={e=>setAdminPassword(e.target.value)}/></div><button className="button button-red form-submit"><LogIn size={16}/> {lang==='en'?'Sign in securely':'सुरक्षित लगइन'}</button>{adminMessage&&<div className="form-message error">{adminMessage}</div>}<p className="form-privacy">No public administrator registration. Admin access must be assigned securely in Supabase by the project owner.</p></form> : !isAdmin ? <div className="admin-locked"><LockKeyhole size={24}/><h3>Access denied</h3><p>{adminMessage||'This account is not authorised.'}</p><button className="button button-dark" onClick={adminLogout}><LogOut size={15}/> Sign out</button></div> : <div className="admin-dashboard"><div className="admin-toolbar"><span><UserCheck size={17}/> {lang==='en'?'Signed in as authorised administrator':'अधिकृत प्रशासकका रूपमा लगइन'}</span><button onClick={adminLogout}><LogOut size={15}/> Sign out</button></div>{adminMessage&&<p className="admin-message">{adminMessage}</p>}{adminLoading?<p>Loading records…</p>:<><h3>{lang==='en'?'Donor records':'रक्तदाता विवरण'} <span>{adminDonors.length}</span></h3><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Name</th><th>Blood</th><th>Location</th><th>Phone</th><th>Listing</th><th>Review</th><th>Actions</th></tr></thead><tbody>{adminDonors.map(d=><tr key={d.id}><td>{d.name}</td><td><b className="admin-blood">{d.blood_group}</b></td><td>{d.location}</td><td>{d.phone}</td><td>{d.public_listing?'Public opt-in':'Private'}</td><td><span className={d.is_approved?'review-approved':'review-pending'}>{d.is_approved?'Approved':'Pending review'}</span></td><td><div className="admin-actions"><button onClick={()=>adminToggleApproval(d)}>{d.is_approved?'Unapprove':'Approve'}</button><button onClick={()=>adminToggleAvailability(d)}>{d.is_available?'Pause':'Activate'}</button><button className="delete-action" onClick={()=>adminDeleteDonor(d.id)}><Trash2 size={14}/> Remove</button></div></td></tr>)}</tbody></table></div><h3>{lang==='en'?'Blood requests':'रक्त अनुरोध'} <span>{adminRequests.length}</span></h3><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Contact</th><th>Blood</th><th>Units</th><th>Hospital / location</th><th>Phone</th><th>Action</th></tr></thead><tbody>{adminRequests.map(r=><tr key={r.id}><td>{r.contact_name}</td><td>{r.blood_group}</td><td>{r.units}</td><td>{r.hospital_location}</td><td>{r.contact_phone}</td><td><button className="delete-action" onClick={()=>adminDeleteRequest(r.id)}><Trash2 size={14}/> Remove</button></td></tr>)}</tbody></table></div></>}</div>}
    </div></section>

    <a className="urgent-float" href="#request" onClick={()=>scrollTo('request')}>🆘 {lang==='ne'?'तुरुन्त रगत चाहियो?':'Need blood urgently?'}</a>
    <footer className="footer"><div className="container"><div className="footer-main"><div className="footer-brand"><a className="brand brand-footer" href="#home"><span className="brand-mark"><Droplet size={24} fill="currentColor"/></span><span><strong>{lang==='ne'?'विराटनगर रक्तदाता सञ्जाल':'BiratnagarBloodNetwork'}</strong><small>{lang==='ne'?'विराटनगर, नेपाल':'BIRATNAGAR, NEPAL'}</small></span></a><p>{t.footerLine}</p></div><div className="footer-links"><div><span>{t.menu}</span><button onClick={()=>scrollTo('find')}>{t.directory}</button><button onClick={()=>scrollTo('donate')}>{t.donorForm}</button><button onClick={()=>scrollTo('request')}>{t.needHelp}</button><button onClick={()=>scrollTo('awareness')}>{t.awareness}</button><button onClick={()=>scrollTo('privacy')}>{lang==='en'?'Privacy policy':'गोपनीयता नीति'}</button><button onClick={()=>scrollTo('admin')}>{lang==='en'?'Admin':'प्रशासक'}</button></div><div><span>{t.contact}</span><p>Biratnagar, Koshi Province<br/>Nepal</p><p className="footer-note">Community initiative · Volunteer-led</p></div></div></div><div className="footer-bottom"><span>© 2026 BiratnagarBloodNetwork. Built for the community.</span><span>{lang==='ne'?'नेपालमा सद्भावका साथ बनाइएको':'Made with care in Nepal'} <span className="nepal-flag">♥</span></span></div></div></footer>
  </div>;
}

createRoot(document.getElementById('root')).render(<App/>);