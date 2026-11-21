import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createClient } from '@supabase/supabase-js';
import { ArrowRight, ArrowUpRight, BadgeCheck, Check, ChevronDown, Clock3, Droplet, HeartHandshake, HeartPulse, Languages, MapPin, Menu, Search, ShieldCheck, Users, X, LockKeyhole, Trash2, LogIn, LogOut, FileText, Eye, UserCheck } from 'lucide-react';
import './style.css';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

const copy = {
  en: {
    eyebrow:'A COMMUNITY THAT SHOWS UP', title:'A little help can mean', titleAccent:'another tomorrow.', intro:'Connecting people who are ready to donate blood with people who need it — starting in Biratnagar.', find:'Find a donor', become:'Become a donor', local:'BIRATNAGAR & NEARBY', community:'Real people. One connected community.', communityText:'When a blood request comes in, finding the right person quickly matters. RaktaSetu helps make that connection easier.', donorCount:'registered donors', groups:'blood groups', mission:'one shared purpose',
    searchTitle:'Find a blood donor', searchText:'Search the community by blood group and location.', bloodGroup:'Blood group', allGroups:'All blood groups', location:'Location', locationPlaceholder:'e.g. Biratnagar, Tintolia…', searchBtn:'Search donors', available:'Available donors', noResults:'No matching donors yet', noResultsText:'Try another blood group or location. If this is urgent, contact a nearby licensed blood bank or hospital.', demo:'Illustrative sample', demoNote:'These are fictional examples for preview only — not real donor records.', registerTitle:'Your one registration could help someone.', registerText:'Join the local donor community. Your details are only listed publicly if you choose public visibility.', fullName:'Full name', phone:'Phone number', chooseGroup:'Choose blood group', area:'Your location / neighbourhood', areaPlaceholder:'e.g. Biratnagar-4, Morang', publicConsent:'I agree to show my name, blood group, location and phone number in the public donor directory.', registerBtn:'Register as a donor', registering:'Submitting…', registerSuccess:'Thank you for registering.', registerSuccessText:'Your donor profile has been submitted.', registerError:'Could not submit your registration. Please try again.', privacy:'Your information is personal. Only register if you are comfortable sharing the selected details. You can request removal later.', needTitle:'Looking for blood?', needText:'Share the basic details of the request so the community team can help coordinate.', patientName:'Contact person name', neededGroup:'Blood group needed', units:'Units needed', hospital:'Hospital / location', hospitalPlaceholder:'Hospital name and area', needPhone:'Contact phone', requestBtn:'Submit blood request', requestSuccess:'Request submitted', requestSuccessText:'Your request has been received.', requestError:'Could not submit the request. Please try again.', awarenessEyebrow:'KNOW BEFORE YOU DONATE', awarenessTitle:'A few things worth knowing.', awarenessText:'Blood donation is a generous act — and it should always be safe, voluntary and guided by qualified health professionals.', fact1:'Check your eligibility', fact1Text:'A health professional or blood bank staff member should assess whether you can donate today.', fact2:'Every donation is screened', fact2Text:'Donated blood is tested and handled by qualified services before it can be used.', fact3:'Ask the blood bank', fact3Text:'Blood type alone does not confirm compatibility. The hospital or blood bank must complete the required checks.', safety:'RaktaSetu is a community connection platform, not a blood bank or medical service. Donor availability, eligibility and blood compatibility must be confirmed by a licensed blood bank or hospital.', footerLine:'A stronger community, one connection at a time.', about:'About', directory:'Find donors', awareness:'Awareness', contact:'Contact', menu:'Menu', live:'Community connection platform', privacyTitle:'Your privacy matters', privacyText:'Donor contact details are shown only when the donor explicitly agrees. Never share another person’s details without their permission.', coordinator:'For urgent medical needs, contact a licensed blood bank or hospital directly.', needHelp:'Need blood', donorForm:'Donor registration', online:'Live directory', preview:'Preview mode', backendMissing:'Live registration and donor search will activate after the secure database is connected.', requestConsent:'I confirm this request is being submitted with the contact person’s permission.'
  },
  ne: {
    eyebrow:'समुदायको साथ, जीवनको आशा', title:'सानो सहयोगले', titleAccent:'नयाँ आशा दिन सक्छ।', intro:'रक्तदान गर्न इच्छुक व्यक्ति र रगत आवश्यक पर्ने व्यक्तिलाई जोड्ने प्रयास — विराटनगरबाट सुरु।', find:'रक्तदाता खोज्नुहोस्', become:'रक्तदाता बन्नुहोस्', local:'विराटनगर तथा आसपास', community:'वास्तविक मानिस। एउटै समुदाय।', communityText:'रगतको आवश्यकता पर्दा सही व्यक्तिसँग छिटो सम्पर्क हुन जरुरी हुन्छ। रक्तसेतुले यस्तो सम्पर्क सहज बनाउन मद्दत गर्छ।', donorCount:'दर्ता भएका रक्तदाता', groups:'रक्त समूह', mission:'एउटै साझा उद्देश्य',
    searchTitle:'रक्तदाता खोज्नुहोस्', searchText:'रक्त समूह र स्थानका आधारमा खोज्नुहोस्।', bloodGroup:'रक्त समूह', allGroups:'सबै रक्त समूह', location:'स्थान', locationPlaceholder:'जस्तै: विराटनगर, टिनटोलिया…', searchBtn:'रक्तदाता खोज्नुहोस्', available:'उपलब्ध रक्तदाता', noResults:'मिल्दो रक्तदाता भेटिएन', noResultsText:'अर्को रक्त समूह वा स्थान राखेर खोज्नुहोस्। आपतकालीन अवस्थामा नजिकको मान्यता प्राप्त रक्तसञ्चार केन्द्र वा अस्पतालमा सम्पर्क गर्नुहोस्।', demo:'उदाहरण मात्र', demoNote:'यी वेबसाइटको नमुना देखाउन राखिएका काल्पनिक विवरण हुन् — वास्तविक रक्तदाता होइनन्।', registerTitle:'तपाईंको दर्ताले कसैलाई आशा दिन सक्छ।', registerText:'स्थानीय रक्तदाता समुदायमा जोडिनुहोस्। तपाईंले सार्वजनिक देखाउन सहमति दिएमा मात्र विवरण सूचीमा देखाइनेछ।', fullName:'पूरा नाम', phone:'फोन नम्बर', chooseGroup:'रक्त समूह छान्नुहोस्', area:'तपाईंको स्थान / टोल', areaPlaceholder:'जस्तै: विराटनगर-४, मोरङ', publicConsent:'मेरो नाम, रक्त समूह, स्थान र फोन नम्बर सार्वजनिक रक्तदाता सूचीमा देखाउन म सहमत छु।', registerBtn:'रक्तदाताका रूपमा दर्ता गर्नुहोस्', registering:'पठाउँदै…', registerSuccess:'दर्ता गर्नुभएकोमा धन्यवाद।', registerSuccessText:'तपाईंको रक्तदाता विवरण पठाइएको छ।', registerError:'दर्ता पठाउन सकिएन। कृपया फेरि प्रयास गर्नुहोस्।', privacy:'तपाईंको विवरण व्यक्तिगत हो। सार्वजनिक रूपमा देखाउन सहज भएमा मात्र दर्ता गर्नुहोस्। पछि हटाउन अनुरोध गर्न सक्नुहुन्छ।', needTitle:'रगत आवश्यक छ?', needText:'समन्वयमा सहयोग गर्न आवश्यक आधारभूत विवरण पठाउनुहोस्।', patientName:'सम्पर्क व्यक्तिको नाम', neededGroup:'आवश्यक रक्त समूह', units:'आवश्यक युनिट', hospital:'अस्पताल / स्थान', hospitalPlaceholder:'अस्पतालको नाम र स्थान', needPhone:'सम्पर्क फोन', requestBtn:'रक्त अनुरोध पठाउनुहोस्', requestSuccess:'अनुरोध पठाइयो', requestSuccessText:'तपाईंको अनुरोध प्राप्त भएको छ।', requestError:'अनुरोध पठाउन सकिएन। फेरि प्रयास गर्नुहोस्।', awarenessEyebrow:'रक्तदान गर्नुअघि जानौँ', awarenessTitle:'जान्नैपर्ने केही कुरा।', awarenessText:'रक्तदान उदार कार्य हो — यो सधैँ सुरक्षित, स्वैच्छिक र स्वास्थ्यकर्मीको सल्लाहअनुसार हुनुपर्छ।', fact1:'योग्यता जाँच गराउनुहोस्', fact1Text:'आज रक्तदान गर्न मिल्छ कि मिल्दैन भन्ने कुरा स्वास्थ्यकर्मी वा रक्तसञ्चार केन्द्रले जाँच गर्नुपर्छ।', fact2:'रगत परीक्षण गरिन्छ', fact2Text:'प्रयोग गर्नुअघि दान गरिएको रगत सम्बन्धित सेवाबाट परीक्षण र व्यवस्थापन गरिन्छ।', fact3:'रक्तसञ्चार केन्द्रसँग बुझ्नुहोस्', fact3Text:'रक्त समूह मिल्दैमा रगत सुरक्षित रूपमा मिल्छ भन्ने हुँदैन। आवश्यक परीक्षण अस्पताल वा रक्तसञ्चार केन्द्रले गर्नुपर्छ।', safety:'रक्तसेतु रक्तदाता र आवश्यक पर्ने व्यक्तिबीच सम्पर्क गराउने समुदायिक माध्यम हो, रक्तसञ्चार केन्द्र वा चिकित्सा सेवा होइन। रक्तदाताको उपलब्धता, योग्यता र रगतको अनुकूलता मान्यता प्राप्त रक्तसञ्चार केन्द्र वा अस्पतालबाट पुष्टि गर्नुपर्छ।', footerLine:'समुदायको साथ, हरेक सम्पर्कमा नयाँ आशा।', about:'हाम्रो बारेमा', directory:'रक्तदाता खोज्नुहोस्', awareness:'जनचेतना', contact:'सम्पर्क', menu:'मेनु', live:'समुदायिक सम्पर्क माध्यम', privacyTitle:'तपाईंको गोपनीयता महत्त्वपूर्ण छ', privacyText:'रक्तदाताले स्पष्ट सहमति दिएमा मात्र सम्पर्क विवरण सार्वजनिक देखाइन्छ। अनुमति बिना अरूको विवरण साझा नगर्नुहोस्।', coordinator:'तत्काल स्वास्थ्य आवश्यकताका लागि मान्यता प्राप्त रक्तसञ्चार केन्द्र वा अस्पतालमा सिधै सम्पर्क गर्नुहोस्।', needHelp:'रगत चाहियो', donorForm:'रक्तदाता दर्ता', online:'प्रत्यक्ष सूची', preview:'पूर्वावलोकन', backendMissing:'सुरक्षित डाटाबेस जोडिएपछि मात्र प्रत्यक्ष दर्ता र रक्तदाता खोजी सुरु हुनेछ।', requestConsent:'सम्पर्क व्यक्तिको सहमतिमा यो अनुरोध पठाइएको हो भन्ने म पुष्टि गर्छु।'
  }
};

const sampleDonors = [
  { id:'sample-1', name:'Sample Donor One', blood_group:'B+', location:'Biratnagar-4', phone:'', is_available:true },
  { id:'sample-2', name:'Sample Donor Two', blood_group:'O+', location:'Tintolia, Biratnagar', phone:'', is_available:true },
  { id:'sample-3', name:'Sample Donor Three', blood_group:'A−', location:'Biratnagar-10', phone:'', is_available:true }
];
const bloodGroups = ['A+','A−','B+','B−','AB+','AB−','O+','O−'];

function App() {
  const [lang,setLang] = useState('en');
  const [mobileMenu,setMobileMenu] = useState(false);
  const [group,setGroup] = useState('all');
  const [place,setPlace] = useState('');
  const [donors,setDonors] = useState([]);
  const [loading,setLoading] = useState(false);
  const [searchDone,setSearchDone] = useState(false);
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
      supabase.from('donors').select('id,name,phone,blood_group,location,public_listing,is_available,created_at').order('created_at',{ascending:false}),
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

  async function searchDonors(e) {
    e?.preventDefault();
    setLoading(true); setSearchDone(true);
    if (!supabase) {
      setDonors(sampleDonors.filter(d => (group === 'all' || d.blood_group === group) && (!place || d.location.toLowerCase().includes(place.toLowerCase()))));
      setLoading(false); return;
    }
    let query = supabase.from('donors').select('id,name,blood_group,location,phone,is_available,created_at').eq('is_available',true).eq('public_listing',true).order('created_at',{ascending:false});
    if (group !== 'all') query = query.eq('blood_group',group);
    if (place.trim()) query = query.ilike('location', '%' + place.trim() + '%');
    const {data,error} = await query.limit(60);
    setDonors(error ? [] : (data || []));
    setLoading(false);
  }

  async function submitDonor(e) {
    e.preventDefault(); setDonorStatus('');
    if (!supabase) { setDonorStatus('offline'); return; }
    setSubmitting(true);
    const {error} = await supabase.from('donors').insert({name:donorForm.name.trim(),phone:donorForm.phone.trim(),blood_group:donorForm.blood_group,location:donorForm.location.trim(),public_listing:donorForm.consent,is_available:true});
    setSubmitting(false);
    if (error) setDonorStatus('error');
    else { setDonorStatus('success'); setDonorForm({name:'',phone:'',blood_group:'',location:'',consent:false}); }
  }

  async function submitRequest(e) {
    e.preventDefault(); setRequestStatus('');
    if (!supabase) { setRequestStatus('offline'); return; }
    setSubmitting(true);
    const {error} = await supabase.from('blood_requests').insert({contact_name:requestForm.name.trim(),contact_phone:requestForm.phone.trim(),blood_group:requestForm.blood_group,units:Number(requestForm.units),hospital_location:requestForm.hospital.trim(),consent_confirmed:requestForm.consent});
    setSubmitting(false);
    if (error) setRequestStatus('error');
    else { setRequestStatus('success'); setRequestForm({name:'',phone:'',blood_group:'',units:'1',hospital:'',consent:false}); }
  }

  const displayed = donors;
  const scrollTo = id => { document.getElementById(id)?.scrollIntoView({behavior:'smooth'}); setMobileMenu(false); };
  const formatPhone = phone => phone ? phone : null;

  return <div className="site-shell">
    <div className="topline"><div className="container topline-inner"><span><span className="pulse"></span>{t.live}</span><span className="topline-right"><MapPin size={13}/> Biratnagar, Nepal <span className="top-divider"></span><button className="lang-switch" onClick={()=>setLang(lang==='en'?'ne':'en')}><Languages size={14}/>{lang==='en'?'नेपाली':'English'}</button></span></div></div>
    <header className="header"><div className="container nav-wrap">
      <a className="brand" href="#" onClick={e=>{e.preventDefault();scrollTo('home')}}><span className="brand-mark"><Droplet size={24} fill="currentColor"/></span><span><strong>rakta<span>setu</span></strong><small>रक्तसेतु · BIRATNAGAR</small></span></a>
      <nav className={mobileMenu?'nav-links open':'nav-links'}><button onClick={()=>scrollTo('find')}>{t.directory}</button><button onClick={()=>scrollTo('donate')}>{t.donorForm}</button><button onClick={()=>scrollTo('request')}>{t.needHelp}</button><button onClick={()=>scrollTo('awareness')}>{t.awareness}</button><button onClick={()=>scrollTo('privacy')}>{lang==='en'?'Privacy':'गोपनीयता'}</button><button className="nav-cta" onClick={()=>scrollTo('donate')}>{t.become}<ArrowUpRight size={15}/></button></nav>
      <button className="mobile-toggle" onClick={()=>setMobileMenu(!mobileMenu)} aria-label="Toggle menu">{mobileMenu?<X/>:<Menu/>}</button>
    </div></header>

    <main>
      <section className="hero" id="home"><div className="hero-grid"></div><div className="container hero-content">
        <div className="hero-copy"><div className="eyebrow"><span className="eyebrow-line"></span>{t.eyebrow}</div><h1>{t.title}<br/><em>{t.titleAccent}</em></h1><p className="hero-intro">{t.intro}</p><div className="hero-actions"><button className="button button-light" onClick={()=>scrollTo('find')}>{t.find}<ArrowRight size={17}/></button><button className="button button-outline" onClick={()=>scrollTo('donate')}>{t.become}</button></div><div className="hero-proof"><div className="proof-icon"><HeartHandshake size={18}/></div><span>{t.local}</span><span className="proof-dot"></span><span>EST. FOR COMMUNITY</span></div></div>
        <div className="hero-art" aria-label="Blood donation illustration"><div className="orbit orbit-one"></div><div className="orbit orbit-two"></div><div className="hero-disc"><div className="disc-inner"><Droplet size={82} strokeWidth={1.25} fill="currentColor"/><span>GIVE<br/>LIFE</span></div></div><div className="float-note note-top"><span className="note-icon"><HeartPulse size={17}/></span><span><b>Every donor matters</b><small>हरेक रक्तदाता महत्त्वपूर्ण</small></span></div><div className="float-note note-bottom"><span className="mini-blood">O+</span><span><b>One community</b><small>एउटै समुदाय, एउटै आशा</small></span></div><div className="spark spark-one"></div><div className="spark spark-two"></div></div>
      </div><div className="hero-bottom"><div className="container hero-bottom-inner"><span>01 — CONNECT</span><span>02 — SUPPORT</span><span>03 — SAVE LIVES</span><span className="hero-bottom-caption">A LOCAL INITIATIVE FOR BIRATNAGAR</span></div></div></section>

      <section className="photo-story"><div className="container photo-story-grid"><div className="photo-story-copy"><div className="section-kicker">FROM NEPAL, WITH CARE / नेपालबाट</div><h2>{lang==='en'?'A community is strongest when it looks after one another.':'एकअर्काको ख्याल राख्दा समुदाय अझ बलियो हुन्छ।'}</h2><p>{lang==='en'?'Blood donation drives bring neighbours, volunteers and health workers together. This platform helps make those connections easier.':'रक्तदान कार्यक्रमले छिमेकी, स्वयंसेवक र स्वास्थ्यकर्मीलाई एकै ठाउँमा जोड्छ। यो माध्यमले त्यस्तो सम्पर्क सहज बनाउन सहयोग गर्छ।'}</p><button className="text-link" onClick={()=>scrollTo('donate')}>{t.become}<ArrowUpRight size={16}/></button></div><div className="photo-pair"><figure><img src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Blood%20donation.JPG" alt="A blood donor in Nepal at a donation session" loading="lazy"/><figcaption>Blood donation in Nepal · Srijan Karki / Wikimedia Commons · CC BY-SA 3.0</figcaption></figure><figure><img src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Blood%20donation%20during%20Maha%20Shivaratri%20Celebrations%20at%20Pashupatinath%20Temple%2C%20Kathmandu%2C%20Nepal-070A6641.jpg" alt="Blood donation activity during a community event in Kathmandu" loading="lazy"/><figcaption>Community blood donation · Bijay Chaurasia / Wikimedia Commons · CC BY-SA 4.0</figcaption></figure></div></div></section>

      <section className="intro-band" id="about"><div className="container intro-layout"><div><div className="section-kicker">01 / {t.about}</div><h2>{t.community}</h2></div><div className="intro-right"><p>{t.communityText}</p><div className="mini-stats"><div><strong>8</strong><span>{t.groups}</span></div><div><strong>01</strong><span>{t.mission}</span></div><div><strong>24/7</strong><span>Community-led</span></div></div></div></div></section>

      <section className="directory-section section-pad" id="find"><div className="container"><div className="section-heading"><div><div className="section-kicker">02 / THE DIRECTORY</div><h2>{t.searchTitle}</h2><p>{t.searchText}</p></div><div className="section-number">02</div></div>
        <form className="search-panel" onSubmit={searchDonors}><div className="field"><label>{t.bloodGroup}</label><div className="select-wrap"><Droplet size={16}/><select value={group} onChange={e=>setGroup(e.target.value)}><option value="all">{t.allGroups}</option>{bloodGroups.map(g=><option key={g}>{g}</option>)}</select><ChevronDown size={15}/></div></div><div className="field"><label>{t.location}</label><div className="input-wrap"><MapPin size={16}/><input value={place} onChange={e=>setPlace(e.target.value)} placeholder={t.locationPlaceholder}/></div></div><button className="button button-red search-submit" type="submit"><Search size={17}/>{t.searchBtn}</button></form>
        <div className="directory-meta"><div><span className="status-dot"></span><strong>{t.available}</strong><span className="meta-count">{searchDone?displayed.length:0}</span></div><span className="sample-label">{!supabase?t.demo:t.online}</span></div>
        {!supabase && <div className="preview-notice"><span><ShieldCheck size={16}/></span><div><strong>{t.preview}</strong><p>{t.backendMissing} {t.demoNote}</p></div></div>}
        {loading ? <div className="empty-state">Loading…</div> : displayed.length ? <div className="donor-grid">{displayed.map(d=><article className="donor-card" key={d.id}><div className="donor-card-top"><div className="blood-badge">{d.blood_group}</div><span className="available-tag"><span></span>{t.available}</span></div><h3>{d.name}</h3><p className="donor-location"><MapPin size={14}/>{d.location}</p>{formatPhone(d.phone)&&<a className="donor-contact" href={'tel:'+d.phone}>Call donor <ArrowUpRight size={15}/></a>}<div className="card-rule"></div><span className="card-caption">{!supabase?t.demo:'COMMUNITY DONOR'}</span></article>)}</div> : <div className="empty-state"><div className="empty-icon"><Search size={23}/></div><h3>{t.noResults}</h3><p>{t.noResultsText}</p></div>}
      </div></section>

      <section className="action-section" id="donate"><div className="container action-layout"><div className="action-copy"><div className="section-kicker light-kicker">03 / JOIN THE COMMUNITY</div><h2>{t.registerTitle}</h2><p>{t.registerText}</p><div className="action-aside"><ShieldCheck size={19}/><span>{t.privacyTitle}<small>{t.privacyText}</small></span></div><div className="action-aside"><HeartPulse size={19}/><span>{t.coordinator}</span></div></div><div className="form-card"><div className="form-card-head"><div><span className="form-step">01 — DONOR DETAILS</span><h3>{t.donorForm}</h3></div><span className="form-icon"><Droplet size={22}/></span></div><form onSubmit={submitDonor} className="stack-form"><div className="field"><label>{t.fullName}</label><input required maxLength="90" value={donorForm.name} onChange={e=>setDonorForm({...donorForm,name:e.target.value})} placeholder="Your name"/></div><div className="form-row"><div className="field"><label>{t.phone}</label><input required type="tel" maxLength="20" value={donorForm.phone} onChange={e=>setDonorForm({...donorForm,phone:e.target.value})} placeholder="+977"/></div><div className="field"><label>{t.bloodGroup}</label><select required value={donorForm.blood_group} onChange={e=>setDonorForm({...donorForm,blood_group:e.target.value})}><option value="">{t.chooseGroup}</option>{bloodGroups.map(g=><option key={g}>{g}</option>)}</select></div></div><div className="field"><label>{t.area}</label><input required maxLength="120" value={donorForm.location} onChange={e=>setDonorForm({...donorForm,location:e.target.value})} placeholder={t.areaPlaceholder}/></div><label className="consent"><input type="checkbox" required checked={donorForm.consent} onChange={e=>setDonorForm({...donorForm,consent:e.target.checked})}/><span>{t.publicConsent}</span></label><p className="form-privacy">{t.privacy}</p><button className="button button-red form-submit" disabled={submitting}>{submitting?t.registering:t.registerBtn}<ArrowRight size={17}/></button>{donorStatus==='success'&&<div className="form-message success"><Check size={16}/>{t.registerSuccess} {t.registerSuccessText}</div>}{donorStatus==='error'&&<div className="form-message error">{t.registerError}</div>}{donorStatus==='offline'&&<div className="form-message error">{t.backendMissing}</div>}</form></div></div></section>

      <section className="request-section section-pad" id="request"><div className="container request-layout"><div className="request-heading"><div className="section-kicker">04 / REQUEST SUPPORT</div><h2>{t.needTitle}</h2><p>{t.needText}</p><div className="request-callout"><Clock3 size={19}/><span>{t.coordinator}</span></div></div><div className="request-form-wrap"><div className="form-card request-card"><div className="form-card-head"><div><span className="form-step">02 — REQUEST DETAILS</span><h3>{t.needHelp}</h3></div><span className="form-icon"><HeartPulse size={22}/></span></div><form className="stack-form" onSubmit={submitRequest}><div className="form-row"><div className="field"><label>{t.patientName}</label><input required maxLength="90" value={requestForm.name} onChange={e=>setRequestForm({...requestForm,name:e.target.value})}/></div><div className="field"><label>{t.needPhone}</label><input required type="tel" maxLength="20" value={requestForm.phone} onChange={e=>setRequestForm({...requestForm,phone:e.target.value})}/></div></div><div className="form-row"><div className="field"><label>{t.neededGroup}</label><select required value={requestForm.blood_group} onChange={e=>setRequestForm({...requestForm,blood_group:e.target.value})}><option value="">{t.chooseGroup}</option>{bloodGroups.map(g=><option key={g}>{g}</option>)}</select></div><div className="field"><label>{t.units}</label><select value={requestForm.units} onChange={e=>setRequestForm({...requestForm,units:e.target.value})}>{['1','2','3','4','5'].map(n=><option key={n}>{n}</option>)}</select></div></div><div className="field"><label>{t.hospital}</label><input required maxLength="160" value={requestForm.hospital} onChange={e=>setRequestForm({...requestForm,hospital:e.target.value})} placeholder={t.hospitalPlaceholder}/></div><label className="consent"><input type="checkbox" required checked={requestForm.consent} onChange={e=>setRequestForm({...requestForm,consent:e.target.checked})}/><span>{t.requestConsent}</span></label><button className="button button-dark form-submit" disabled={submitting}>{t.requestBtn}<ArrowRight size={17}/></button>{requestStatus==='success'&&<div className="form-message success"><Check size={16}/>{t.requestSuccess} {t.requestSuccessText}</div>}{requestStatus==='error'&&<div className="form-message error">{t.requestError}</div>}{requestStatus==='offline'&&<div className="form-message error">{t.backendMissing}</div>}</form></div></div></div></section>

      <section className="awareness-section section-pad" id="awareness"><div className="container"><div className="section-heading awareness-heading"><div><div className="section-kicker">05 / {t.awarenessEyebrow}</div><h2>{t.awarenessTitle}</h2><p>{t.awarenessText}</p></div><div className="section-number">05</div></div><div className="awareness-grid"><article><span className="awareness-icon"><BadgeCheck size={22}/></span><span className="awareness-index">01</span><h3>{t.fact1}</h3><p>{t.fact1Text}</p></article><article><span className="awareness-icon"><ShieldCheck size={22}/></span><span className="awareness-index">02</span><h3>{t.fact2}</h3><p>{t.fact2Text}</p></article><article><span className="awareness-icon"><HeartPulse size={22}/></span><span className="awareness-index">03</span><h3>{t.fact3}</h3><p>{t.fact3Text}</p></article></div><div className="safety-note"><ShieldCheck size={20}/><p>{t.safety}</p></div></div></section>
    </main>

    <section className="privacy-section section-pad" id="privacy"><div className="container privacy-layout"><div><div className="section-kicker">06 / TRUST & PRIVACY</div><h2>{lang==='en'?'Your details. Your choice.':'तपाईंको विवरण, तपाईंको निर्णय।'}</h2><p>{lang==='en'?'We collect only the details needed to connect donors and people requesting blood. Public listing is always based on your consent.':'रक्तदाता र रगत आवश्यक पर्ने व्यक्तिलाई जोड्न आवश्यक विवरण मात्र सङ्कलन गरिन्छ। सार्वजनिक सूचीमा राख्न तपाईंको सहमति अनिवार्य छ।'}</p></div><div className="privacy-points"><article><LockKeyhole size={20}/><div><b>{lang==='en'?'Limited access':'सीमित पहुँच'}</b><p>{lang==='en'?'Only the authorised site administrator can manage or remove donor records.':'अधिकृत वेबसाइट प्रशासकले मात्र रक्तदाता विवरण व्यवस्थापन वा हटाउन सक्छ।'}</p></div></article><article><Eye size={20}/><div><b>{lang==='en'?'Clear public listing':'स्पष्ट सार्वजनिक सूची'}</b><p>{lang==='en'?'Your name, blood group, location and phone are displayed only after you agree.':'तपाईंको सहमति भएपछि मात्र नाम, रक्त समूह, स्थान र फोन सार्वजनिक देखाइन्छ।'}</p></div></article><article><FileText size={20}/><div><b>{lang==='en'?'Removal requests':'विवरण हटाउने अनुरोध'}</b><p>{lang==='en'?'Contact the site administrator if you want your details reviewed or removed.':'आफ्नो विवरण सच्याउन वा हटाउन वेबसाइट प्रशासकलाई सम्पर्क गर्नुहोस्।'}</p></div></article></div></div><div className="container privacy-full"><h3>{lang==='en'?'Privacy policy':'गोपनीयता नीति'}</h3><p>{lang==='en'?'RaktaSetu is a community contact directory, not a hospital or blood bank. When you register, the information you submit (name, phone number, blood group and location) is stored to help people find voluntary donors. Your phone number and other profile details are publicly visible only when you tick the public-listing consent box. Blood requests are kept for coordination and are not displayed in the public donor directory. The administrator account is restricted to authorised personnel and is the only role permitted to view private submissions, update donor availability, or remove records. We do not intentionally sell personal information. Do not submit another person’s details without their permission. You may ask the administrator to correct or remove your information. Information may be retained only as long as needed for the directory and coordination. This is a plain-language draft and should be reviewed by the responsible organisation before public launch.':'रक्तसेतु समुदायमा रक्तदाता र रगत आवश्यक पर्ने व्यक्तिबीच सम्पर्क गराउने माध्यम हो; यो अस्पताल वा रक्तसञ्चार केन्द्र होइन। दर्ता गर्दा पठाइएको नाम, फोन नम्बर, रक्त समूह र स्थान स्वैच्छिक रक्तदाता खोज्न प्रयोग गरिन्छ। सार्वजनिक सूचीमा राख्न सहमति बाकसमा टिक गरेपछि मात्र तपाईंको फोन र अन्य विवरण सार्वजनिक देखाइन्छ। रक्त अनुरोधहरू समन्वयका लागि राखिन्छन् र सार्वजनिक रक्तदाता सूचीमा देखाइँदैनन्। अधिकृत प्रशासक खाताले मात्र निजी विवरण हेर्न, रक्तदाताको उपलब्धता बदल्न वा विवरण हटाउन सक्छ। व्यक्तिगत विवरण बिक्री गर्ने उद्देश्य छैन। अनुमति बिना अरू व्यक्तिको विवरण नपठाउनुहोस्। आफ्नो विवरण सच्याउन वा हटाउन प्रशासकलाई अनुरोध गर्न सक्नुहुन्छ। आवश्यक अवधिसम्म मात्र विवरण राखिनेछ। यो सरल भाषामा तयार गरिएको मस्यौदा हो; सार्वजनिक सुरुआतअघि जिम्मेवार संस्थाले समीक्षा गर्नुपर्छ।'}</p><p className="privacy-updated">Last reviewed: 21 November 2026 · अन्तिम समीक्षा: २१ नोभेम्बर २०२६</p></div></section>

    <section className="admin-section section-pad" id="admin"><div className="container"><div className="section-heading"><div><div className="section-kicker">07 / PRIVATE ADMINISTRATION</div><h2>{lang==='en'?'Administrator dashboard':'प्रशासक ड्यासबोर्ड'}</h2><p>{lang==='en'?'A private area for the authorised administrator only.':'अधिकृत प्रशासकका लागि मात्र निजी क्षेत्र।'}</p></div><div className="admin-lock"><LockKeyhole size={23}/></div></div>
      {!supabase ? <div className="admin-locked"><LockKeyhole size={24}/><h3>{lang==='en'?'Database connection required':'डाटाबेस जडान आवश्यक छ'}</h3><p>{t.backendMissing}</p></div> : !session ? <form className="admin-login form-card" onSubmit={adminLogin}><div className="form-card-head"><div><span className="form-step">AUTHORISATION REQUIRED</span><h3>{lang==='en'?'Administrator sign in':'प्रशासक लगइन'}</h3></div><span className="form-icon"><LockKeyhole size={21}/></span></div><div className="field"><label>Administrator email</label><input required type="email" autoComplete="username" value={adminEmail} onChange={e=>setAdminEmail(e.target.value)} placeholder="Your authorised email"/></div><div className="field"><label>Password</label><input required type="password" autoComplete="current-password" value={adminPassword} onChange={e=>setAdminPassword(e.target.value)}/></div><button className="button button-red form-submit"><LogIn size={16}/> {lang==='en'?'Sign in securely':'सुरक्षित लगइन'}</button>{adminMessage&&<div className="form-message error">{adminMessage}</div>}<p className="form-privacy">No public administrator registration. Admin access must be assigned securely in Supabase by the project owner.</p></form> : !isAdmin ? <div className="admin-locked"><LockKeyhole size={24}/><h3>Access denied</h3><p>{adminMessage||'This account is not authorised.'}</p><button className="button button-dark" onClick={adminLogout}><LogOut size={15}/> Sign out</button></div> : <div className="admin-dashboard"><div className="admin-toolbar"><span><UserCheck size={17}/> {lang==='en'?'Signed in as authorised administrator':'अधिकृत प्रशासकका रूपमा लगइन'}</span><button onClick={adminLogout}><LogOut size={15}/> Sign out</button></div>{adminMessage&&<p className="admin-message">{adminMessage}</p>}{adminLoading?<p>Loading records…</p>:<><h3>{lang==='en'?'Donor records':'रक्तदाता विवरण'} <span>{adminDonors.length}</span></h3><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Name</th><th>Blood</th><th>Location</th><th>Phone</th><th>Listing</th><th>Actions</th></tr></thead><tbody>{adminDonors.map(d=><tr key={d.id}><td>{d.name}</td><td><b className="admin-blood">{d.blood_group}</b></td><td>{d.location}</td><td>{d.phone}</td><td>{d.public_listing?'Public':'Private'}</td><td><div className="admin-actions"><button onClick={()=>adminToggleAvailability(d)}>{d.is_available?'Pause':'Activate'}</button><button className="delete-action" onClick={()=>adminDeleteDonor(d.id)}><Trash2 size={14}/> Remove</button></div></td></tr>)}</tbody></table></div><h3>{lang==='en'?'Blood requests':'रक्त अनुरोध'} <span>{adminRequests.length}</span></h3><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Contact</th><th>Blood</th><th>Units</th><th>Hospital / location</th><th>Phone</th><th>Action</th></tr></thead><tbody>{adminRequests.map(r=><tr key={r.id}><td>{r.contact_name}</td><td>{r.blood_group}</td><td>{r.units}</td><td>{r.hospital_location}</td><td>{r.contact_phone}</td><td><button className="delete-action" onClick={()=>adminDeleteRequest(r.id)}><Trash2 size={14}/> Remove</button></td></tr>)}</tbody></table></div></>}</div>}
    </div></section>

    <footer className="footer"><div className="container"><div className="footer-main"><div className="footer-brand"><a className="brand brand-footer" href="#home"><span className="brand-mark"><Droplet size={24} fill="currentColor"/></span><span><strong>rakta<span>setu</span></strong><small>रक्तसेतु · BIRATNAGAR</small></span></a><p>{t.footerLine}</p></div><div className="footer-links"><div><span>{t.menu}</span><button onClick={()=>scrollTo('find')}>{t.directory}</button><button onClick={()=>scrollTo('donate')}>{t.donorForm}</button><button onClick={()=>scrollTo('request')}>{t.needHelp}</button><button onClick={()=>scrollTo('awareness')}>{t.awareness}</button><button onClick={()=>scrollTo('privacy')}>{lang==='en'?'Privacy policy':'गोपनीयता नीति'}</button><button onClick={()=>scrollTo('admin')}>{lang==='en'?'Admin':'प्रशासक'}</button></div><div><span>{t.contact}</span><p>Biratnagar, Koshi Province<br/>Nepal</p><p className="footer-note">Community initiative · Volunteer-led</p></div></div></div><div className="footer-bottom"><span>© 2026 Raktasetu. Built for the community.</span><span>Made with care in Nepal <span className="nepal-flag">♥</span></span></div></div></footer>
  </div>;
}

createRoot(document.getElementById('root')).render(<App/>);