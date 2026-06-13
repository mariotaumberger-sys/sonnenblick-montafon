/* ============================================================
   SUPABASE — Backend client
   ============================================================ */
const SUPABASE_URL = 'https://ncjpfzdkwqvwodxevrqo.supabase.co';
const SUPABASE_KEY = 'sb_publishable_2j5cBVoBF8LyrUsNFCG3qw_AaMlC5VZ';
let sb = null;
let adminSession = null;
function initSupabase() {
  if (typeof window.supabase === 'undefined') {
    console.warn('Supabase SDK nicht geladen — Offline-Modus');
    return false;
  }
  sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: { persistSession: true, autoRefreshToken: true, storage: window.localStorage }
  });
  return true;
}

/* ============================================================
   STATE & DEFAULTS
   ============================================================ */
const STORAGE_KEY = 'sonnenblick_montafon_v1';

const DEFAULTS = {
  // Branding
  brand: 'Sonnenblick',
  hero_eyebrow: 'Bartholomäberg · Montafon · Vorarlberg',
  hero_title: 'Wo die Berge<br><em>still werden.</em>',
  hero_subtitle: 'Eine neue Luxus-Ferienwohnung mit Südlage, Panoramablick und der ruhigen Eleganz, die das Montafon so besonders macht.',
  hero_image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2400&q=85',
  about_img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',

  // Address & contact
  address: 'Mateinaweg 8, 6781 Bartholomäberg, Österreich',
  maps_url: 'https://www.google.com/maps/search/?api=1&query=Mateinaweg+8%2C+6781+Bartholom%C3%A4berg%2C+%C3%96sterreich',
  checkin: '14:00 Uhr',
  checkout: '10:00 Uhr',
  contact_email: 'taumberger.m@gmx.at',
  contact_phone: '',

  // Texts
  about_title: '78 m² stille Eleganz, eingebettet in das Panorama des Montafon.',
  about_lead: 'Zwei Schlafzimmer, ein großzügiges Bad und ein offener Wohnbereich mit Südfront — alles in warmen Naturmaterialien gestaltet.',
  about_p1: 'Sonnenblick ist eine neu erbaute Ferienwohnung im Herzen von Bartholomäberg, einem der höchstgelegenen ganzjährig bewohnten Dörfer Österreichs. Vom großzügigen Balkon blicken Sie direkt auf die Rätikon-Gipfel — vom Sonnenaufgang über der Zimba bis zum Alpenglühen am Abend.',
  about_p2: 'Im Inneren erwartet Sie ruhige, durchdachte Gestaltung: helles Eichenholz, Naturstein, hochwertige Textilien. Eine vollausgestattete Küche, ein modernes Badezimmer und schnelles WLAN machen den Aufenthalt zur stilvollen Auszeit — ob für eine Skiwoche oder einen Wandersommer.',
  gallery_title: 'Räume zum Ankommen',
  gallery_subtitle: 'Ein erster Blick in die Wohnung, die Aussicht und den Charakter der Lage.',
  activities_title: 'Berge, die zu allem einladen.',
  activities_subtitle: 'Das Montafon bietet zu jeder Jahreszeit mehr als Sie unterbringen können — eine Auswahl direkt vor Ihrer Haustür.',
  location_title: 'Bartholomäberg — der Sonnenbalkon des Montafon.',
  location_lead: 'Höher als das Tal, ruhiger als die Liftstationen, sonniger als fast jeder andere Ort der Region.',
  location_p1: 'Bartholomäberg liegt auf 1.087 m und ist berühmt für seine Südlage — das Tal liegt morgens noch im Schatten, während hier oben die Sonne schon den Frühstückstisch wärmt. Die Hochjoch Bahn in Schruns ist nur 5 km entfernt, die Golm Bergbahnen 10 km, die Silvretta Montafon mit 140 Pistenkilometern in 12 Minuten erreichbar. Im Sommer beginnen die schönsten Wanderungen direkt vor der Haustür.',
  footer_tagline: 'Luxus-Ferienwohnung in Bartholomäberg. Neu erbaut, persönlich geführt, mit dem schönsten Blick des Tals.',

  // Pricing
  base_price: 400,
  person5_surcharge: 100,
  person6_surcharge: 100,
  mult_low: 1.0,
  mult_summer: 1.2,
  mult_winter: 1.3,
  cleaning_fee: 90,
  tourism_tax: 2.20,
  min_nights: 3,
  max_nights: 21,

  // Seasons (DD-MM)
  summer_start: '15-06',
  summer_end: '15-09',
  winter_start: '01-12',
  winter_end: '15-04',

  // Blocked dates
  blocked: [],
  requests: [],

  // Gallery
  gallery: [
    { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85', caption: 'Offener Wohnbereich mit Südfront' },
    { url: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=85', caption: 'Schlafzimmer mit Bergblick' },
    { url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=85', caption: 'Küche aus Eichenholz' },
    { url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=900&q=85', caption: 'Modernes Badezimmer' },
    { url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=85', caption: 'Zweites Schlafzimmer' },
    { url: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?auto=format&fit=crop&w=900&q=85', caption: 'Aussicht vom Balkon' },
    { url: 'https://images.unsplash.com/photo-1571055107559-3e67626fa8be?auto=format&fit=crop&w=900&q=85', caption: 'Esstisch am Fenster' },
    { url: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1600&q=85', caption: 'Winterstimmung über dem Tal' }
  ],

  // Activities
  activities_winter: [
    { icon: 'ski', title: 'Skifahren & Snowboarden', desc: 'Drei große Skigebiete: Hochjoch direkt in Schruns, Silvretta Montafon mit 140 km Pisten und die Golm Bergbahnen.', meta: 'Ab 5 km · 8 Min', image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=900&q=80' },
    { icon: 'touring', title: 'Skitouren', desc: 'Die klassischen Touren auf Itonskopf, Zamangspitze und Geißspitze starten praktisch vor der Haustür.', meta: 'Ab Haustür', image: 'https://images.unsplash.com/photo-1604881744146-da92cd1edfaa?auto=format&fit=crop&w=900&q=80' },
    { icon: 'crosscountry', title: 'Langlaufen', desc: 'Gespurte Loipen in Gauenstein und am Kristberg — klassisch und Skating, mit Talblick.', meta: 'Ab 3 km · 5 Min', image: 'https://images.unsplash.com/photo-1612878010854-1250dfc5000a?auto=format&fit=crop&w=900&q=80' },
    { icon: 'snowshoe', title: 'Schneeschuhwandern', desc: 'Geführte Touren oder eigenständig durch verschneite Lärchenwälder am Kristberg.', meta: 'Ab Haustür', image: 'https://images.unsplash.com/photo-1517825738774-7de9363ef735?auto=format&fit=crop&w=900&q=80' },
    { icon: 'sled', title: 'Rodeln', desc: 'Naturrodelbahn am Hochjoch, beleuchtete Nachtrodelbahn am Golm — Familienspaß garantiert.', meta: 'Ab 5 km', image: 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&w=900&q=80' },
    { icon: 'boot', title: 'Winterwandern', desc: 'Über 100 km gespurte Winterwanderwege — vom gemütlichen Talweg bis zur Panoramatour.', meta: 'Ab Haustür', image: 'https://images.unsplash.com/photo-1542485770-c238fc8f0eba?auto=format&fit=crop&w=900&q=80' },
    { icon: 'skate', title: 'Eislaufen', desc: 'Natureisplatz in Schruns und Kunsteisbahn in Bludenz — beide bestens für Familien geeignet.', meta: '6 km · 10 Min', image: 'https://images.unsplash.com/photo-1610126252569-9bf2b3a3afe3?auto=format&fit=crop&w=900&q=80' },
    { icon: 'iceaxe', title: 'Eisklettern', desc: 'Gefrorene Wasserfälle in Gargellen und im Silbertal — Touren mit Bergführer buchbar.', meta: 'Auf Anfrage', image: 'https://images.unsplash.com/photo-1551582045-6ec9c11d8697?auto=format&fit=crop&w=900&q=80' }
  ],
  activities_summer: [
    { icon: 'hiker', title: 'Wandern', desc: 'Von gemütlichen Familienrouten bis zum Drei-Türme-Klassiker — über 1.000 km markierte Wege.', meta: 'Ab Haustür', image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=900&q=80' },
    { icon: 'bike', title: 'Mountainbiken & E-Bike', desc: '400 km MTB-Trails, Bike-Park Schruns mit Flowtrails, E-Bike-Verleih am Berg.', meta: 'Ab Haustür', image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=900&q=80' },
    { icon: 'climb', title: 'Klettersteige & Klettergarten', desc: 'Klettersteige am Kristberg und Rätikon, Naturklettergarten in Vandans für Anfänger und Profis.', meta: 'Ab 8 km', image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=900&q=80' },
    { icon: 'paraglide', title: 'Paragleiten', desc: 'Tandemflüge ab Golm und Hochjoch — der spektakulärste Blick auf das Montafon, den es gibt.', meta: 'Tandem buchbar', image: 'https://images.unsplash.com/photo-1601024445121-e5b82f020549?auto=format&fit=crop&w=900&q=80' },
    { icon: 'coaster', title: 'Alpine Coaster', desc: 'Alpine-Coaster-Golm: 2,6 km Schienenrutsche bergab mit Tempo bis 40 km/h.', meta: '10 km · Golm', image: 'https://images.unsplash.com/photo-1574958269340-fa927503f3dd?auto=format&fit=crop&w=900&q=80' },
    { icon: 'zipline', title: 'Flying Fox XXL', desc: 'Die längste Flying-Fox-Anlage Vorarlbergs am Golm — 565 m mit bis zu 70 km/h.', meta: '10 km · Golm', image: 'https://images.unsplash.com/photo-1622060033919-3d1a39be9ec6?auto=format&fit=crop&w=900&q=80' },
    { icon: 'tree', title: 'Aktivpark & Hochseilgarten', desc: 'Hochseilgarten, Riesentrampolin und Wasserspielplatz am Golm — perfekt für Kinder.', meta: '10 km · Golm', image: 'https://images.unsplash.com/photo-1568346676543-1ad4d0bce5f5?auto=format&fit=crop&w=900&q=80' },
    { icon: 'raft', title: 'Rafting & Canyoning', desc: 'Wildwasser auf der Ill, Canyoning durch die Litz-Schlucht — geführte Touren mit Profis.', meta: 'Tagesausflug', image: 'https://images.unsplash.com/photo-1530870110042-98b2cb110834?auto=format&fit=crop&w=900&q=80' }
  ],

  // Service Links
  service_links: [
    { icon: 'cloud', title: 'Wetter & Schneebericht', desc: 'Aktuelle Wettervorhersage und Schneehöhen für Bartholomäberg, von Bergfex.', url: 'https://www.bergfex.at/sommer/bartholomaeberg/wetter/', cta: 'Wetter ansehen' },
    { icon: 'compass', title: 'Ausflugstipps', desc: 'Die schönsten Plätze, Restaurants und Geheimtipps im Montafon — direkt vom Tourismusverband.', url: 'https://www.montafon.at/de/weitere-erlebnisse/ausflugstipps', cta: 'Ausflugstipps' },
    { icon: 'webcam', title: 'Live-Webcams', desc: 'Schauen Sie schon vor der Anreise auf die Berge — Live-Bilder aus dem Montafon.', url: 'https://www.montafon.at/de/service/webcams', cta: 'Webcams öffnen' }
  ],

  // FAQ
  faqs: [
    { q: 'Wie läuft der Check-in ab?', a: 'Check-in ist ab 14:00 Uhr. Sie erhalten 48 Stunden vor Anreise eine Begrüßungs-E-Mail mit allen Details zum Schlüsselübergang. Auf Wunsch ist auch ein persönlicher Empfang vor Ort möglich — schreiben Sie uns einfach.' },
    { q: 'Gibt es einen Parkplatz?', a: 'Ja, ein privater Parkplatz direkt am Haus ist im Mietpreis inbegriffen. Auch für ein zweites Fahrzeug ist Platz vorhanden.' },
    { q: 'Was ist im Preis inbegriffen?', a: 'Im Übernachtungspreis enthalten sind WLAN, Bettwäsche, Handtücher, Strom, Heizung und Wasser. Endreinigung und Kurtaxe werden separat ausgewiesen.' },
    { q: 'Wie viele Personen können übernachten?', a: 'Die Wohnung ist für 4 bis 6 Personen ausgelegt. Bis 4 Personen gilt der Grundpreis, ab Person 5 und 6 fällt jeweils ein Aufpreis von €100 pro Nacht an.' },
    { q: 'Sind Haustiere erlaubt?', a: 'Aus Rücksicht auf Allergiker ist die Wohnung haustierfrei und Nichtraucher.' },
    { q: 'Wie storniere ich eine Buchung?', a: 'Eine kostenfreie Stornierung ist bis 30 Tage vor Anreise möglich. Details finden Sie in unseren AGB. Bei Fragen kontaktieren Sie uns gerne direkt.' },
    { q: 'Wie weit sind die Skigebiete entfernt?', a: 'Die Hochjoch Bahn in Schruns ist nur 5 km (8 Min) entfernt — direkt nebenan. Die Golm Bergbahnen erreichen Sie in 15 Min, die Silvretta Montafon mit 140 km Pisten in rund 12 Min. Im Winter fahren regelmäßig Skibusse vom Ort.' },
    { q: 'Welche Zahlungsmöglichkeiten gibt es?', a: 'Wir akzeptieren Banküberweisung sowie Kreditkarte (Visa, Mastercard). Eine Anzahlung von 30 % ist bei verbindlicher Reservierung fällig, der Restbetrag spätestens 14 Tage vor Anreise.' }
  ],

  // Legal
  impressum: `Sonnenblick Montafon
Inhaber: Max Mustermann
Mateinaweg 8
6781 Bartholomäberg, Österreich

Tel: +43 664 123 45 67
E-Mail: info@sonnenblick-montafon.at

UID-Nummer: ATU12345678
Mitglied der WKÖ, Fachgruppe Privatzimmervermietung

Aufsichtsbehörde: Bezirkshauptmannschaft Bludenz
Berufsrecht: Gewerbeordnung 1994, www.ris.bka.gv.at

Verbraucherstreitbeilegung: Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.`,

  datenschutz: `Datenschutzerklärung

1. Verantwortlicher
Sonnenblick Montafon, Max Mustermann, Mateinaweg 8, 6781 Bartholomäberg, Österreich. E-Mail: info@sonnenblick-montafon.at

2. Erhebung und Verarbeitung von Daten
Wir verarbeiten Ihre personenbezogenen Daten (Name, Kontaktdaten, Reisedaten) ausschließlich zum Zweck der Buchungsabwicklung und Kommunikation mit Ihnen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).

3. Speicherdauer
Buchungsdaten werden für die Dauer der gesetzlichen Aufbewahrungsfristen (7 Jahre nach BAO) gespeichert und anschließend gelöscht.

4. Weitergabe
Eine Weitergabe Ihrer Daten an Dritte erfolgt nur, soweit dies zur Vertragsabwicklung erforderlich ist (z. B. Tourismusverband zur Meldung der Kurtaxe).

5. Ihre Rechte
Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Beschwerden können bei der österreichischen Datenschutzbehörde eingebracht werden.

6. Cookies und lokale Speicherung
Diese Webseite verwendet ausschließlich technisch notwendige lokale Speicherung (localStorage) für die Funktion des Buchungssystems. Es werden keine Tracking-Cookies oder Analyse-Tools eingesetzt.`,

  agb: `Allgemeine Geschäftsbedingungen

1. Geltungsbereich
Diese AGB gelten für alle Buchungen der Ferienwohnung Sonnenblick Montafon.

2. Buchung und Vertragsabschluss
Der Mietvertrag kommt mit Bestätigung Ihrer Buchung durch uns zustande. Sofortbuchungen gelten als verbindliche Reservierung und werden binnen 24 Stunden bestätigt.

3. Zahlung
30 % Anzahlung sind binnen 7 Tagen nach Buchungsbestätigung zu leisten. Der Restbetrag ist spätestens 14 Tage vor Anreise fällig.

4. Stornobedingungen
- Bis 30 Tage vor Anreise: kostenlose Stornierung
- 29 bis 14 Tage vor Anreise: 50 % des Gesamtpreises
- 13 bis 7 Tage vor Anreise: 80 % des Gesamtpreises
- Weniger als 7 Tage oder No-Show: 100 % des Gesamtpreises

Eine Reiserücktrittsversicherung wird empfohlen.

5. An- und Abreise
Check-in ab 14:00 Uhr, Check-out bis 10:00 Uhr. Abweichende Zeiten nach Absprache.

6. Hausordnung
Die Wohnung ist haustierfrei und Nichtraucher. Übernachtungen mit mehr als 6 Personen sind nicht gestattet. Bitte respektieren Sie die Ruhezeit von 22:00 bis 7:00 Uhr.

7. Haftung
Der Vermieter haftet nicht für Wertsachen der Gäste. Schäden an Inventar sind unverzüglich zu melden und vom Mieter zu ersetzen.

8. Anwendbares Recht
Es gilt österreichisches Recht. Gerichtsstand ist Bludenz.`,

  // Email notification (EmailJS) — baked in so it works for ALL visitors, not just admin
  email_config: {
    public_key: 'bDCbjrY9q_SIbyA7F',
    service_id: 'service_7q8se1a',
    template_id_owner: 'template_dq64arp',
    template_id_customer: 'template_fdnoxps',
    recipient: 'taumberger.m@gmx.at'
  },

  // Admin login is now via Supabase Auth (email + password set in dashboard)
};

let state = loadStateLocal();
let selection = { start: null, end: null, persons: 4 };
let viewMonth = new Date();
viewMonth.setDate(1);
viewMonth.setHours(0, 0, 0, 0);

let lightboxIndex = 0;

/* ============================================================
   STORAGE — Supabase first, localStorage as cache
   ============================================================ */
function loadStateLocal() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULTS };
    const parsed = JSON.parse(raw);
    return { ...DEFAULTS, ...parsed };
  } catch (e) { return { ...DEFAULTS }; }
}
function saveStateLocal() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
function saveState() { saveStateLocal(); }

/* ---------- Site content ---------- */
async function loadContentFromDB() {
  if (!sb) return null;
  try {
    const { data, error } = await sb.from('site_content').select('data').eq('id', 1).single();
    if (error) throw error;
    return data?.data && Object.keys(data.data).length ? data.data : null;
  } catch (e) { console.warn('loadContent:', e.message); return null; }
}
async function saveContentToDB() {
  if (!sb || !adminSession) return false;
  const content = { ...state };
  delete content.requests;
  delete content.blocked;
  try {
    const { error } = await sb.from('site_content')
      .update({ data: content, updated_at: new Date().toISOString() })
      .eq('id', 1);
    if (error) throw error;
    return true;
  } catch (e) { console.error('saveContent:', e); return false; }
}

/* ---------- Blocked dates (public read) ---------- */
async function loadBlockedFromDB() {
  if (!sb) return [];
  try {
    const { data, error } = await sb.from('blocked_dates').select('*');
    if (error) throw error;
    return (data || []).map(b => ({
      id: b.id,
      start: b.start_date,
      end: b.end_date,
      note: b.note,
      type: b.type || 'manual',
      request_id: b.request_id
    }));
  } catch (e) { console.warn('loadBlocked:', e.message); return []; }
}
async function addBlockedToDB(start, end, note, type='manual', request_id=null) {
  if (!sb) return null;
  // Client-side UUID so guest inserts don't need SELECT permission
  const id = (crypto.randomUUID && crypto.randomUUID())
    || ('blk-' + Date.now() + '-' + Math.random().toString(36).slice(2));
  try {
    const { error } = await sb.from('blocked_dates').insert({
      id, start_date: start, end_date: end, note, type, request_id
    });
    if (error) throw error;
    return { id };
  } catch (e) { console.error('addBlocked:', e); return null; }
}
async function removeBlockedFromDB(id) {
  if (!sb) return false;
  try {
    const { error } = await sb.from('blocked_dates').delete().eq('id', id);
    if (error) throw error;
    return true;
  } catch (e) { console.error('removeBlocked:', e); return false; }
}

/* ---------- Requests (admin read) ---------- */
async function loadRequestsFromDB() {
  if (!sb || !adminSession) return [];
  try {
    const { data, error } = await sb.from('requests').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return (data || []).map(r => ({
      id: r.id,
      name: r.name,
      email: r.email,
      phone: r.phone,
      start: r.start_date,
      end: r.end_date,
      persons: r.persons,
      nights: r.nights,
      total: r.total,
      message: r.message,
      mode: r.mode,
      status: r.status,
      created_at: r.created_at
    }));
  } catch (e) { console.warn('loadRequests:', e.message); return []; }
}
async function createRequestInDB(req) {
  if (!sb) return null;
  // Client-side UUID so we don't need SELECT permission to read it back after insert
  const id = (crypto.randomUUID && crypto.randomUUID())
    || ('req-' + Date.now() + '-' + Math.random().toString(36).slice(2));
  try {
    const { error } = await sb.from('requests').insert({
      id,
      name: req.name,
      email: req.email,
      phone: req.phone || '',
      start_date: req.start || null,
      end_date: req.end || null,
      persons: req.persons || 0,
      nights: req.nights || 0,
      total: req.total || 0,
      message: req.message || '',
      mode: req.mode,
      status: 'pending'
    });
    if (error) throw error;

    // For booking/inquiry: also add a blocked_dates entry so calendar reflects it
    if ((req.mode === 'instant' || req.mode === 'inquiry') && req.start && req.end) {
      const type = req.mode === 'instant' ? 'pending_instant' : 'pending_inquiry';
      await addBlockedToDB(req.start, req.end, req.name, type, id);
    }
    return { id };
  } catch (e) { console.error('createRequest:', e); return null; }
}
async function updateRequestStatusInDB(id, status) {
  if (!sb || !adminSession) return false;
  try {
    const { error } = await sb.from('requests').update({ status }).eq('id', id);
    if (error) throw error;
    if (status === 'confirmed') {
      await sb.from('blocked_dates').update({ type: 'confirmed' }).eq('request_id', id);
    } else if (status === 'rejected') {
      await sb.from('blocked_dates').delete().eq('request_id', id);
    }
    return true;
  } catch (e) { console.error('updateRequestStatus:', e); return false; }
}

/* ---------- Admin auth via Supabase ---------- */
async function adminSignIn(email, password) {
  if (!sb) return { ok: false, error: 'Supabase nicht verfügbar' };
  try {
    const { data, error } = await sb.auth.signInWithPassword({ email, password });
    if (error) throw error;
    adminSession = data.session;
    return { ok: true };
  } catch (e) { return { ok: false, error: e.message }; }
}
async function adminSignOut() {
  if (!sb) return;
  await sb.auth.signOut();
  adminSession = null;
}
async function adminCheckSession() {
  if (!sb) return false;
  const { data } = await sb.auth.getSession();
  adminSession = data?.session || null;
  return !!adminSession;
}
/* ---------- Image upload (Supabase Storage) ---------- */
async function uploadImage(file, folder = 'gallery') {
  if (!sb || !adminSession) { showToast('Bitte zuerst einloggen.'); return null; }
  if (!file || !file.type || !file.type.startsWith('image/')) {
    showToast('Nur Bilder erlaubt.'); return null;
  }
  if (file.size > 8 * 1024 * 1024) {
    showToast('Bild zu groß (max. 8 MB).'); return null;
  }
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
  const safeExt = ['jpg','jpeg','png','webp','gif'].includes(ext) ? ext : 'jpg';
  const filename = `${folder}/${Date.now()}-${Math.floor(Math.random()*1e6)}.${safeExt}`;
  try {
    const { data, error } = await sb.storage.from('media').upload(filename, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type
    });
    if (error) throw error;
    const { data: pub } = sb.storage.from('media').getPublicUrl(data.path);
    return pub.publicUrl;
  } catch (e) {
    console.error('uploadImage:', e);
    showToast('Upload fehlgeschlagen: ' + (e.message || 'unbekannt'));
    return null;
  }
}

// Generic helper: triggered by a file input. Updates the URL input + image preview in the same row.
async function handleHeroImageUpload(fileInput) {
  const file = fileInput.files[0];
  if (!file) return;
  const btn = fileInput.nextElementSibling;
  const originalText = btn ? btn.textContent : '';
  if (btn) { btn.textContent = '⏳ wird hochgeladen…'; btn.disabled = true; }
  const url = await uploadImage(file, 'hero');
  if (btn) { btn.textContent = originalText; btn.disabled = false; }
  if (!url) return;
  const input = document.getElementById('heroImgUrlInput');
  if (input) input.value = url;
  fileInput.value = '';
  showToast('✓ Hero-Bild hochgeladen.');
}

async function handleFileToInput(fileInput, urlInputClass, folder) {
  const file = fileInput.files[0];
  if (!file) return;
  const btn = fileInput.parentElement.querySelector('.upload-btn');
  const originalText = btn ? btn.textContent : '';
  if (btn) { btn.textContent = '⏳ wird hochgeladen…'; btn.disabled = true; }
  const url = await uploadImage(file, folder);
  if (btn) { btn.textContent = originalText; btn.disabled = false; }
  if (!url) return;
  const row = fileInput.closest('.admin-row') || fileInput.closest('.admin-field') || fileInput.parentElement;
  const urlInput = row.querySelector(urlInputClass);
  if (urlInput) {
    urlInput.value = url;
    // Update preview image if there is one in the row
    const img = row.querySelector('img');
    if (img) img.src = url;
    // Bubble an input event so previews bound via oninput pick it up
    urlInput.dispatchEvent(new Event('input'));
  }
  fileInput.value = '';
  showToast('✓ Bild hochgeladen.');
}

async function adminChangePasswordSb(newPassword) {
  if (!sb || !adminSession) return false;
  try {
    const { error } = await sb.auth.updateUser({ password: newPassword });
    if (error) throw error;
    return true;
  } catch (e) { console.error('updatePassword:', e); return false; }
}

/* ============================================================
   LIVE SYNC — realtime + polling + visibility refresh
   ============================================================ */
let _bookingPollTimer = null;
let _blockedChannel = null;
let _requestsChannel = null;
let _refreshInFlight = false;

async function refreshBookings() {
  if (!sb || _refreshInFlight) return;
  _refreshInFlight = true;
  try {
    const blocked = await loadBlockedFromDB();
    state.blocked = blocked;
    if (adminSession) state.requests = await loadRequestsFromDB();
    saveStateLocal();
    renderCalendar();
    const adminOpen = document.getElementById('adminPanel')?.classList.contains('open');
    if (adminSession && adminOpen) {
      renderRequests();
      renderBlocked();
      const stamp = document.getElementById('requestsLastSync');
      if (stamp) {
        const t = new Date();
        stamp.textContent = '· zuletzt aktualisiert ' + t.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
      }
    }
  } catch (e) {
    console.warn('refreshBookings:', e);
  } finally {
    _refreshInFlight = false;
  }
}

function subscribeBlockedRealtime() {
  if (!sb || _blockedChannel) return;
  try {
    _blockedChannel = sb.channel('blocked_dates_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'blocked_dates' }, refreshBookings)
      .subscribe();
  } catch (e) { console.warn('subscribeBlocked:', e); }
}
function subscribeRequestsRealtime() {
  if (!sb || !adminSession || _requestsChannel) return;
  try {
    _requestsChannel = sb.channel('requests_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'requests' }, refreshBookings)
      .subscribe();
  } catch (e) { console.warn('subscribeRequests:', e); }
}
function unsubscribeRequestsRealtime() {
  if (_requestsChannel && sb) {
    try { sb.removeChannel(_requestsChannel); } catch (e) {}
    _requestsChannel = null;
  }
}

function startBookingPolling() {
  if (_bookingPollTimer) return;
  _bookingPollTimer = setInterval(() => {
    if (document.visibilityState === 'visible') refreshBookings();
  }, 30000);
}

function setupLiveSync() {
  subscribeBlockedRealtime();
  startBookingPolling();
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') refreshBookings();
  });
  window.addEventListener('focus', () => refreshBookings());
}

/* ============================================================
   INIT
   ============================================================ */
async function init() {
  initSupabase();

  // First render with whatever is cached locally so the page paints immediately
  applyTexts();
  applyImages();
  buildGallery();
  buildActivities('winter');
  buildService();
  buildFAQ();
  renderCalendar();
  renderSummary();
  bindEvents();
  setupReveal();
  setupNavScroll();
  setupParallax();
  const yr = document.getElementById('copyYear'); if (yr) yr.textContent = new Date().getFullYear();

  // Then hydrate from Supabase in background
  try {
    const [remoteContent, remoteBlocked, hasSession] = await Promise.all([
      loadContentFromDB(),
      loadBlockedFromDB(),
      adminCheckSession()
    ]);
    if (remoteContent) state = { ...DEFAULTS, ...remoteContent };
    state.blocked = remoteBlocked;
    if (hasSession) state.requests = await loadRequestsFromDB();
    saveStateLocal();
    // Re-render with fresh data
    applyTexts();
    applyImages();
    buildGallery();
    const activePane = document.querySelector('.activity-tab.active')?.getAttribute('data-pane') || 'winter';
    buildActivities(activePane);
    buildService();
    buildFAQ();
    renderCalendar();
    renderSummary();
  } catch (e) {
    console.warn('Hydration failed, running offline with cached data:', e);
  }

  // Live sync: realtime subscriptions, polling fallback, refresh on tab focus
  setupLiveSync();
  if (adminSession) subscribeRequestsRealtime();
}

/* ============================================================
   ACTIVITY ICONS
   ============================================================ */
const ACTIVITY_ICONS = {
  ski: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M7 3v18M17 3v18"/><path d="M5 16h14"/><path d="M9 8h6"/></svg>',
  touring: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="13" cy="4" r="1.4"/><path d="M13 6l-1 4 3 2v6"/><path d="M12 10l-3 1 2 4"/><path d="M3 18l4-2 3 4"/><path d="M16 7l4-3M18 4l2 0 0 2"/></svg>',
  crosscountry: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4" r="1.4"/><path d="M12 6v6l-3 4 4 2"/><path d="M12 12l4-2 2 4"/><path d="M3 19l18-4"/></svg>',
  snowshoe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19"/></svg>',
  sled: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17h18"/><path d="M5 13h14l-1 4H6z"/><path d="M7 9l2 4M17 9l-2 4"/></svg>',
  boot: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 19V7h5l1 4h6a3 3 0 013 3v5z"/><path d="M3 19h18"/><path d="M10 11V7"/></svg>',
  skate: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 17V9c0-1 1-2 2-2h3l2 4h6"/><path d="M3 20h18"/><path d="M5 17l-2 3M17 13l-2 4"/></svg>',
  iceaxe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21L21 3"/><path d="M16 3h5v5"/><path d="M14 6l4 4"/></svg>',
  hiker: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="14" cy="4" r="1.5"/><path d="M14 6l-1 5 3 3v6"/><path d="M13 11l-3-1-3 5"/><path d="M7 21l-1-6 4-5"/></svg>',
  bike: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-7h4l4 7M14 10V6h2"/></svg>',
  climb: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20l7-12 4 7 3-5 6 10z"/><circle cx="9" cy="5" r="1.4"/></svg>',
  paraglide: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9a10 10 0 0120 0H2z"/><path d="M2 9l10 10L22 9M9 9l3 10M15 9l-3 10"/></svg>',
  coaster: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 18c4-12 6-4 10-4s6-8 10 4"/><circle cx="6" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/></svg>',
  zipline: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 5l18 5"/><path d="M11 7l1 4"/><circle cx="12" cy="14" r="2"/><path d="M12 16v5M9 21h6"/></svg>',
  tree: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L6 10h3l-3 5h3l-3 5h12l-3-5h3l-3-5h3z"/><path d="M12 20v3"/></svg>',
  raft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 16c2-2 4 0 6 0s4-2 6 0 4 0 6-2"/><path d="M2 20c2-2 4 0 6 0s4-2 6 0 4 0 6-2"/><path d="M8 13V7h8v6"/></svg>'
};

const SERVICE_ICONS = {
  cloud: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10a5 5 0 00-9.5-1.5A4 4 0 005 16h13a4 4 0 000-6z"/><path d="M12 6V3M8 4l1.5 2M16 4l-1.5 2"/></svg>',
  compass: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M15 9l-2 6-6 2 2-6z"/><circle cx="12" cy="12" r="1" fill="currentColor"/></svg>',
  webcam: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="10" r="6"/><circle cx="12" cy="10" r="2"/><path d="M8 19h8M10 16l-1 3M14 16l1 3"/></svg>',
  link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 007.5.5l3-3a5 5 0 00-7-7l-1.5 1.5"/><path d="M14 11a5 5 0 00-7.5-.5l-3 3a5 5 0 007 7l1.5-1.5"/></svg>'
};

function buildService() {
  const grid = document.getElementById('serviceGrid');
  if (!grid) return;
  const links = state.service_links || [];
  grid.innerHTML = links.map(s => `
    <a class="service-card" href="${escapeHtml(s.url)}" target="_blank" rel="noopener noreferrer">
      <div class="service-icon">${SERVICE_ICONS[s.icon] || SERVICE_ICONS.link}</div>
      <h4>${escapeHtml(s.title)}</h4>
      <p>${escapeHtml(s.desc)}</p>
      <span class="service-link">${escapeHtml(s.cta || 'Öffnen')}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M9 7h8v8"/></svg>
      </span>
    </a>
  `).join('');
}

function buildActivities(pane) {
  const grid = document.getElementById('activitiesGrid');
  if (!grid) return;
  const items = state['activities_' + pane] || [];
  grid.innerHTML = items.map(a => `
    <div class="activity-card">
      <div class="activity-image">
        ${a.image ? `<img src="${escapeHtml(a.image)}" alt="${escapeHtml(a.title)}" loading="lazy" onerror="this.style.display='none'" />` : ''}
        <div class="activity-icon-badge">${ACTIVITY_ICONS[a.icon] || ACTIVITY_ICONS.hiker}</div>
      </div>
      <div class="activity-body">
        <h3>${escapeHtml(a.title)}</h3>
        <p>${escapeHtml(a.desc)}</p>
        <div class="activity-meta">${escapeHtml(a.meta)}</div>
      </div>
    </div>
  `).join('');
}

function applyTexts() {
  document.querySelectorAll('[data-text]').forEach(el => {
    const key = el.getAttribute('data-text');
    if (state[key] !== undefined) {
      if (key === 'hero_title') el.innerHTML = state[key];
      else el.textContent = state[key];
    }
  });
  const setText = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  const setHTML = (id, val) => { const el = document.getElementById(id); if (el) el.innerHTML = val; };
  const setAttr = (id, attr, val) => { const el = document.getElementById(id); if (el) el[attr] = val; };

  setHTML('heroTitle', state.hero_title);

  // Price table
  const base = parseFloat(state.base_price) || 0;
  setText('rowLowAmount', '€' + Math.round(base * state.mult_low));
  setText('rowSummerAmount', '€' + Math.round(base * state.mult_summer));
  setText('rowWinterAmount', '€' + Math.round(base * state.mult_winter));
  setText('rowP5', '+€' + state.person5_surcharge);
  setText('rowP6', '+€' + state.person6_surcharge);
  setText('rowClean', '€' + state.cleaning_fee);
  setText('rowTax', '€' + parseFloat(state.tourism_tax).toFixed(2).replace('.', ','));
  setText('rowSummerPeriod', formatPeriod(state.summer_start, state.summer_end));
  setText('rowWinterPeriod', formatPeriod(state.winter_start, state.winter_end));

  // Contact links
  const mailLine = document.getElementById('contactMailLine');
  const telLine = document.getElementById('contactTelLine');
  if (mailLine) {
    if (state.contact_email) { mailLine.href = 'mailto:' + state.contact_email; mailLine.style.display = ''; }
    else { mailLine.style.display = 'none'; }
  }
  if (telLine) {
    if (state.contact_phone) { telLine.href = 'tel:' + state.contact_phone.replace(/\s/g, ''); telLine.style.display = ''; }
    else { telLine.style.display = 'none'; }
  }

  setAttr('mapsLink', 'href', state.maps_url);

  // Summary date labels
  const sumStart = document.querySelector('#sumStart');
  const sumEnd = document.querySelector('#sumEnd');
  if (sumStart) sumStart.parentElement.querySelector('.summary-date-label').textContent = 'Anreise · ab ' + state.checkin;
  if (sumEnd) sumEnd.parentElement.querySelector('.summary-date-label').textContent = 'Abreise · bis ' + state.checkout;
}

function formatPeriod(start, end) {
  const months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
  const [sd, sm] = start.split('-').map(Number);
  const [ed, em] = end.split('-').map(Number);
  if (!sd || !sm || !ed || !em) return '';
  return `${sd}. ${months[sm-1]} – ${ed}. ${months[em-1]}`;
}

function applyImages() {
  const heroImg = document.getElementById('heroImg');
  if (heroImg) heroImg.src = state.hero_image;
  const aboutImg = document.getElementById('aboutImg');
  if (aboutImg) aboutImg.src = state.about_img || state.gallery[0]?.url || state.hero_image;
}

/* ============================================================
   GALLERY
   ============================================================ */
function buildGallery() {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;
  grid.innerHTML = '';
  state.gallery.slice(0, 8).forEach((item, idx) => {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.onclick = () => openLightbox(idx);
    div.innerHTML = `
      <img src="${item.url}" alt="${escapeHtml(item.caption)}" loading="lazy" />
      <div class="gallery-caption">${escapeHtml(item.caption)}</div>
    `;
    grid.appendChild(div);
  });
}

function openLightbox(idx) {
  lightboxIndex = idx;
  const item = state.gallery[idx];
  if (!item) return;
  document.getElementById('lightboxImg').src = item.url;
  document.getElementById('lightboxImg').alt = item.caption;
  document.getElementById('lightboxCaption').textContent = item.caption;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}
function lightboxNav(delta) {
  const total = Math.min(state.gallery.length, 8);
  lightboxIndex = (lightboxIndex + delta + total) % total;
  openLightbox(lightboxIndex);
}

/* ============================================================
   FAQ
   ============================================================ */
function buildFAQ() {
  const list = document.getElementById('faqList');
  if (!list) return;
  list.innerHTML = '';
  state.faqs.forEach((item, idx) => {
    const div = document.createElement('div');
    div.className = 'faq-item';
    div.innerHTML = `
      <button class="faq-q" onclick="toggleFaq(${idx})">
        <span>${escapeHtml(item.q)}</span>
        <span class="faq-q-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg></span>
      </button>
      <div class="faq-a"><div class="faq-a-inner">${escapeHtml(item.a)}</div></div>
    `;
    list.appendChild(div);
  });
}
function toggleFaq(idx) {
  const items = document.querySelectorAll('#faqList .faq-item');
  items.forEach((el, i) => {
    if (i === idx) {
      const isOpen = el.classList.contains('open');
      el.classList.toggle('open');
      const ans = el.querySelector('.faq-a');
      if (!isOpen) {
        ans.style.maxHeight = ans.scrollHeight + 'px';
      } else {
        ans.style.maxHeight = '0';
      }
    } else {
      el.classList.remove('open');
      el.querySelector('.faq-a').style.maxHeight = '0';
    }
  });
}

/* ============================================================
   CALENDAR
   ============================================================ */
function renderCalendar() {
  const wrap = document.getElementById('calendarMonths');
  if (!wrap) return;
  wrap.innerHTML = '';
  const m1 = new Date(viewMonth);
  const m2 = new Date(viewMonth);
  m2.setMonth(m2.getMonth() + 1);
  wrap.appendChild(renderMonth(m1));
  wrap.appendChild(renderMonth(m2));

  // Disable prev if we're at this month
  const today = new Date();
  today.setDate(1); today.setHours(0,0,0,0);
  document.getElementById('calPrev').disabled = viewMonth <= today;
}

function renderMonth(date) {
  const months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
  const weekdays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
  const wrap = document.createElement('div');
  const label = document.createElement('div');
  label.className = 'calendar-month-label';
  label.textContent = months[date.getMonth()] + ' ' + date.getFullYear();
  wrap.appendChild(label);

  const grid = document.createElement('div');
  grid.className = 'calendar-grid';
  weekdays.forEach(d => {
    const cell = document.createElement('div');
    cell.className = 'calendar-weekday';
    cell.textContent = d;
    grid.appendChild(cell);
  });

  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const startWeekday = (firstDay.getDay() + 6) % 7; // Mon = 0

  for (let i = 0; i < startWeekday; i++) {
    const empty = document.createElement('div');
    empty.className = 'calendar-day empty';
    grid.appendChild(empty);
  }

  const today = new Date();
  today.setHours(0,0,0,0);

  for (let d = 1; d <= lastDay.getDate(); d++) {
    const cellDate = new Date(date.getFullYear(), date.getMonth(), d);
    const cell = document.createElement('div');
    cell.className = 'calendar-day';

    const isoDate = toISO(cellDate);
    const isPast = cellDate < today;
    const hardBlocked = isHardBlocked(cellDate) || isConfirmedBooked(cellDate);
    const pendingInst = isPendingInstant(cellDate);
    const pendingInq = isPendingInquiry(cellDate);
    const inRange = isInSelection(cellDate);
    const isStart = selection.start && sameDay(cellDate, selection.start);
    const isEnd = selection.end && sameDay(cellDate, selection.end);
    const isToday = sameDay(cellDate, today);

    if (isPast) cell.classList.add('past');
    if (hardBlocked) cell.classList.add('blocked');
    else if (pendingInst) cell.classList.add('pending-instant');
    else if (pendingInq) cell.classList.add('pending-inquiry');
    if (isStart) cell.classList.add('selected-start');
    else if (isEnd) cell.classList.add('selected-end');
    else if (inRange && !hardBlocked && !pendingInst) cell.classList.add('in-range');
    if (isToday) cell.classList.add('today');

    const isUnavail = hardBlocked || pendingInst;

    const dayNum = document.createElement('div');
    dayNum.className = 'calendar-day-num';
    dayNum.textContent = d;
    cell.appendChild(dayNum);

    if (!isPast) {
      const price = calcDayPrice(cellDate);
      const pe = document.createElement('div');
      pe.className = 'calendar-day-price';
      pe.textContent = '€' + Math.round(price);
      cell.appendChild(pe);
      if (!isUnavail) cell.onclick = () => onDayClick(cellDate);
    }

    grid.appendChild(cell);
  }

  wrap.appendChild(grid);
  return wrap;
}

function onDayClick(date) {
  if (!selection.start || (selection.start && selection.end)) {
    selection.start = date;
    selection.end = null;
  } else {
    if (date <= selection.start) {
      selection.start = date;
      selection.end = null;
    } else {
      // Check that no day in range is blocked
      const range = datesBetween(selection.start, date);
      const conflict = range.some(d => isDateBlocked(d));
      if (conflict) {
        showToast('Im gewählten Zeitraum sind belegte Tage. Bitte anderen Zeitraum wählen.');
        selection.start = date;
        selection.end = null;
      } else {
        selection.end = date;
      }
    }
  }
  renderCalendar();
  renderSummary();
}

function _dateInRange(date, start, end) {
  if (!start || !end) return false;
  const s = new Date(start); const e = new Date(end);
  s.setHours(0,0,0,0); e.setHours(0,0,0,0);
  return date >= s && date < e;
}
function isHardBlocked(date) {
  // manual blocks + confirmed bookings — both fully block selection
  return (state.blocked || []).some(b =>
    (!b.type || b.type === 'manual' || b.type === 'confirmed') && _dateInRange(date, b.start, b.end)
  );
}
function isPendingInstant(date) {
  return (state.blocked || []).some(b =>
    b.type === 'pending_instant' && _dateInRange(date, b.start, b.end)
  );
}
function isPendingInquiry(date) {
  return (state.blocked || []).some(b =>
    b.type === 'pending_inquiry' && _dateInRange(date, b.start, b.end)
  );
}
function isConfirmedBooked(date) { return false; /* deprecated — folded into isHardBlocked */ }
function isDateBlocked(date) {
  // Inquiries are visible but selectable — they don't block selection
  return isHardBlocked(date) || isPendingInstant(date);
}
function isInSelection(date) {
  if (!selection.start || !selection.end) return false;
  return date > selection.start && date < selection.end;
}
function sameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function toISO(d) {
  return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
}
function fromISO(s) {
  const [y,m,d] = s.split('-').map(Number);
  return new Date(y, m-1, d);
}
function datesBetween(start, end) {
  const out = [];
  const d = new Date(start); d.setHours(0,0,0,0);
  const stop = new Date(end); stop.setHours(0,0,0,0);
  while (d < stop) {
    out.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return out;
}

/* ============================================================
   PRICING
   ============================================================ */
function getSeasonMultiplier(date) {
  const dm = String(date.getDate()).padStart(2,'0') + '-' + String(date.getMonth()+1).padStart(2,'0');
  if (isInDateRange(dm, state.winter_start, state.winter_end)) return parseFloat(state.mult_winter);
  if (isInDateRange(dm, state.summer_start, state.summer_end)) return parseFloat(state.mult_summer);
  return parseFloat(state.mult_low);
}
function isInDateRange(dm, start, end) {
  // dm, start, end in DD-MM format
  const [sd, sm] = start.split('-').map(Number);
  const [ed, em] = end.split('-').map(Number);
  const [d, m] = dm.split('-').map(Number);
  const dayOfYear = m * 100 + d;
  const startDoy = sm * 100 + sd;
  const endDoy = em * 100 + ed;
  if (startDoy <= endDoy) {
    return dayOfYear >= startDoy && dayOfYear <= endDoy;
  } else {
    // Wraps around year (e.g. Winter 01-12 to 15-04)
    return dayOfYear >= startDoy || dayOfYear <= endDoy;
  }
}
function calcDayPrice(date) {
  return parseFloat(state.base_price) * getSeasonMultiplier(date);
}
function calcStay(start, end, persons) {
  const nights = datesBetween(start, end);
  let nightlyTotal = 0;
  nights.forEach(d => { nightlyTotal += calcDayPrice(d); });

  const p5 = persons >= 5 ? parseFloat(state.person5_surcharge) * nights.length : 0;
  const p6 = persons >= 6 ? parseFloat(state.person6_surcharge) * nights.length : 0;
  const cleaning = parseFloat(state.cleaning_fee);
  const tax = parseFloat(state.tourism_tax) * persons * nights.length;
  const total = nightlyTotal + p5 + p6 + cleaning + tax;
  return {
    nights: nights.length,
    nightlyTotal,
    p5, p6, cleaning, tax, total
  };
}

/* ============================================================
   SUMMARY
   ============================================================ */
function renderSummary() {
  const sumStart = document.getElementById('sumStart');
  const sumEnd = document.getElementById('sumEnd');
  const summaryContent = document.getElementById('summaryContent');
  const actions = document.getElementById('summaryActions');
  if (!sumStart || !sumEnd || !summaryContent || !actions) return;

  const personsVal = document.getElementById('personsVal');
  if (personsVal) personsVal.textContent = selection.persons;
  const pMinus = document.getElementById('personsMinus');
  const pPlus = document.getElementById('personsPlus');
  if (pMinus) pMinus.disabled = selection.persons <= 1;
  if (pPlus) pPlus.disabled = selection.persons >= 6;

  if (selection.start) {
    sumStart.textContent = formatDate(selection.start);
    sumStart.classList.remove('empty');
  } else {
    sumStart.textContent = 'Datum wählen';
    sumStart.classList.add('empty');
  }
  if (selection.end) {
    sumEnd.textContent = formatDate(selection.end);
    sumEnd.classList.remove('empty');
  } else {
    sumEnd.textContent = 'Datum wählen';
    sumEnd.classList.add('empty');
  }

  if (selection.start && selection.end) {
    const calc = calcStay(selection.start, selection.end, selection.persons);
    const min = parseInt(state.min_nights) || 1;
    const max = parseInt(state.max_nights) || 365;
    let validationMsg = '';
    if (calc.nights < min) {
      validationMsg = `<div style="background:var(--red-soft);color:var(--red);padding:var(--s-3) var(--s-4);border-radius:var(--r-md);font-size:0.85rem;margin-bottom:var(--s-4);">Mindestaufenthalt: ${min} Nächte. Bitte verlängern Sie Ihren Aufenthalt.</div>`;
    } else if (calc.nights > max) {
      validationMsg = `<div style="background:var(--red-soft);color:var(--red);padding:var(--s-3) var(--s-4);border-radius:var(--r-md);font-size:0.85rem;margin-bottom:var(--s-4);">Höchstaufenthalt: ${max} Nächte. Bitte kontaktieren Sie uns für längere Aufenthalte.</div>`;
    }

    summaryContent.innerHTML = validationMsg + `
      <div class="summary-breakdown">
        <div class="breakdown-line"><span>${calc.nights} Nächte × Übernachtung</span><span>€${calc.nightlyTotal.toFixed(0)}</span></div>
        ${calc.p5 ? `<div class="breakdown-line"><span>Person 5 (${calc.nights}×)</span><span>€${calc.p5.toFixed(0)}</span></div>` : ''}
        ${calc.p6 ? `<div class="breakdown-line"><span>Person 6 (${calc.nights}×)</span><span>€${calc.p6.toFixed(0)}</span></div>` : ''}
        <div class="breakdown-line"><span>Endreinigung</span><span>€${calc.cleaning.toFixed(0)}</span></div>
        <div class="breakdown-line"><span>Kurtaxe (${selection.persons} × ${calc.nights} Nächte)</span><span>€${calc.tax.toFixed(2)}</span></div>
        <div class="breakdown-line total"><span>Gesamt</span><span>€${calc.total.toFixed(0)}</span></div>
      </div>
    `;
    const valid = calc.nights >= min && calc.nights <= max;
    actions.style.display = valid ? 'flex' : 'none';
  } else {
    summaryContent.innerHTML = '<div class="summary-empty">Wählen Sie Anreise und Abreise im Kalender.</div>';
    actions.style.display = 'none';
  }
}
function formatDate(d) {
  const months = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
  return d.getDate() + '. ' + months[d.getMonth()] + ' ' + d.getFullYear();
}

/* ============================================================
   BOOKING SUBMIT
   ============================================================ */
let bookingMode = 'inquiry';
function openBookingDialog(mode) {
  bookingMode = 'instant'; // single binding flow
  const calc = calcStay(selection.start, selection.end, selection.persons);
  document.getElementById('bookingModalTitle').textContent = 'Buchung anfragen';
  const note = '<div style="background:var(--gold-tint);color:var(--wood);padding:var(--s-3) var(--s-4);border-radius:var(--r-md);font-size:0.85rem;margin-bottom:var(--s-4);line-height:1.55;"><strong>Verbindliche Buchungsanfrage.</strong> Der Zeitraum wird sofort für Sie reserviert. Sie erhalten binnen 24 Stunden eine schriftliche Bestätigung — erst diese ist rechtsverbindlich.</div>';
  document.getElementById('bookingFormSummary').innerHTML = note + `
    <div style="display:flex;justify-content:space-between;margin-bottom:var(--s-2);"><span>${formatDate(selection.start)} → ${formatDate(selection.end)}</span><span>${calc.nights} Nächte</span></div>
    <div style="display:flex;justify-content:space-between;font-weight:600;font-family:var(--font-serif);font-size:1.1rem;"><span>${selection.persons} Gäste</span><span>€${calc.total.toFixed(0)}</span></div>
  `;
  const submitBtn = document.querySelector('#bookingForm button[type="submit"]');
  submitBtn.textContent = 'Verbindlich anfragen';
  openModal('bookingModal');
}

async function submitBooking(e) {
  e.preventDefault();
  const calc = calcStay(selection.start, selection.end, selection.persons);
  const req = {
    name: document.getElementById('bf-first').value.trim() + ' ' + document.getElementById('bf-last').value.trim(),
    email: document.getElementById('bf-email').value.trim(),
    phone: document.getElementById('bf-phone').value.trim(),
    start: toISO(selection.start),
    end: toISO(selection.end),
    persons: selection.persons,
    nights: calc.nights,
    total: calc.total,
    message: document.getElementById('bf-msg').value.trim(),
    mode: bookingMode,
    status: 'pending',
    created_at: new Date().toISOString()
  };

  // Persist to Supabase (creates request + pending block in calendar)
  const saved = await createRequestInDB(req);
  if (!saved) {
    showToast('Buchung konnte nicht gespeichert werden. Bitte erneut versuchen oder uns direkt kontaktieren.');
    return;
  }
  req.id = saved.id;

  // Fire-and-forget email
  sendEmailNotification(req);

  closeModal('bookingModal');
  document.getElementById('bookingForm').reset();

  // Refresh local blocked-list so calendar updates immediately
  state.blocked = await loadBlockedFromDB();

  document.getElementById('confirmTitle').textContent = bookingMode === 'instant' ? 'Buchung eingegangen' : 'Anfrage gesendet';
  document.getElementById('confirmText').textContent = bookingMode === 'instant'
    ? `Vielen Dank, ${req.name.split(' ')[0]}. Wir bestätigen Ihre Buchung binnen 24 Stunden per E-Mail.`
    : `Vielen Dank, ${req.name.split(' ')[0]}. Wir melden uns binnen 24 Stunden bei Ihnen.`;
  openModal('confirmModal');

  selection = { start: null, end: null, persons: selection.persons };
  renderCalendar();
  renderSummary();
}

async function submitContact(e) {
  e.preventDefault();
  const req = {
    name: document.getElementById('cf-name').value.trim(),
    email: document.getElementById('cf-email').value.trim(),
    phone: '',
    start: null,
    end: null,
    persons: 0,
    nights: 0,
    total: 0,
    message: '[Kontaktformular] ' + (document.getElementById('cf-subject').value ? '(' + document.getElementById('cf-subject').value + ') ' : '') + document.getElementById('cf-msg').value.trim(),
    mode: 'contact',
    status: 'pending',
    created_at: new Date().toISOString()
  };
  const saved = await createRequestInDB(req);
  if (!saved) {
    showToast('Nachricht konnte nicht gesendet werden. Bitte erneut versuchen.');
    return;
  }
  document.getElementById('contactForm').reset();
  sendEmailNotification(req);
  showToast('Nachricht gesendet — wir melden uns bald.');
}

/* ============================================================
   MODAL HELPERS
   ============================================================ */
function openModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('open');
  document.body.style.overflow = '';
}
function openLegal(type) {
  const titles = { impressum: 'Impressum', datenschutz: 'Datenschutzerklärung', agb: 'AGB & Stornobedingungen' };
  const titleEl = document.getElementById('legalTitle');
  const contentEl = document.getElementById('legalContent');
  if (!titleEl || !contentEl) return;
  titleEl.textContent = titles[type];
  contentEl.textContent = state[type] || '';
  openModal('legalModal');
}

/* ============================================================
   TOAST
   ============================================================ */
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) { console.log('[toast]', msg); return; }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3200);
}

/* ============================================================
   ADMIN
   ============================================================ */
async function openAdmin() {
  const panel = document.getElementById('adminPanel');
  if (!panel) {
    // Not on admin page — navigate there
    const base = document.body.getAttribute('data-base') || '.';
    window.location.href = base + '/admin/';
    return;
  }
  panel.classList.add('open');
  document.body.style.overflow = 'hidden';
  // If already signed in (persisted session), skip login screen
  if (await adminCheckSession()) {
    await enterAdminDashboard();
  } else {
    const login = document.getElementById('adminLogin');
    const body = document.getElementById('adminBody');
    const email = document.getElementById('adminEmailInput');
    if (login) login.style.display = 'flex';
    if (body) body.style.display = 'none';
    if (email) setTimeout(() => email.focus(), 100);
  }
}
async function closeAdmin() {
  document.getElementById('adminPanel').classList.remove('open');
  document.body.style.overflow = '';
}
async function adminLogout() {
  unsubscribeRequestsRealtime();
  await adminSignOut();
  state.requests = [];
  document.getElementById('adminPanel').classList.remove('open');
  document.body.style.overflow = '';
  showToast('Abgemeldet.');
}
async function adminLogin() {
  const email = document.getElementById('adminEmailInput').value.trim();
  const pw = document.getElementById('adminPwInput').value;
  const err = document.getElementById('adminLoginErr');
  err.classList.remove('show');
  const res = await adminSignIn(email, pw);
  if (res.ok) {
    document.getElementById('adminEmailInput').value = '';
    document.getElementById('adminPwInput').value = '';
    await enterAdminDashboard();
  } else {
    err.textContent = 'Login fehlgeschlagen: ' + (res.error || 'unbekannter Fehler');
    err.classList.add('show');
  }
}
async function enterAdminDashboard() {
  document.getElementById('adminLogin').style.display = 'none';
  document.getElementById('adminBody').style.display = 'grid';
  // Refresh requests with admin access + subscribe to live changes
  subscribeRequestsRealtime();
  state.requests = await loadRequestsFromDB();
  fillAdminFields();
  fillEmailFields();
  renderBlocked();
  renderRequests();
  renderGalleryAdmin();
  renderActivitiesAdmin();
  renderServiceAdmin();
  renderFaqAdmin();
}

function renderActivitiesAdmin() {
  ['winter', 'summer'].forEach(season => {
    const list = document.getElementById(season + 'ActList');
    list.innerHTML = '';
    (state['activities_' + season] || []).forEach(a => list.appendChild(activityRow(a, season)));
  });
}
function activityRow(a, season) {
  const row = document.createElement('div');
  row.className = 'admin-row admin-activity-row';
  row.setAttribute('data-season', season);
  row.style.gridTemplateColumns = '80px 1fr auto';
  row.style.alignItems = 'start';
  const iconOptions = Object.keys(ACTIVITY_ICONS).map(k =>
    `<option value="${k}"${k === a.icon ? ' selected' : ''}>${k}</option>`).join('');
  row.innerHTML = `
    <div style="width:80px;height:80px;border-radius:var(--r-sm);overflow:hidden;background:var(--line);">
      <img src="${escapeHtml(a.image || '')}" style="width:100%;height:100%;object-fit:cover;" onerror="this.style.opacity=0.15" />
    </div>
    <div style="display:flex;flex-direction:column;gap:var(--s-2);">
      <div style="display:grid;grid-template-columns:140px 1fr;gap:var(--s-2);">
        <select class="act-icon">${iconOptions}</select>
        <input type="text" class="act-title" value="${escapeHtml(a.title)}" placeholder="Titel" />
      </div>
      <input type="url" class="act-image" value="${escapeHtml(a.image || '')}" placeholder="Bild URL oder hochladen ↓" oninput="this.closest('.admin-row').querySelector('img').src=this.value" />
      <div style="display:flex;gap:var(--s-2);align-items:center;">
        <input type="file" accept="image/*" style="display:none" onchange="handleFileToInput(this, '.act-image', 'activities')" />
        <button type="button" class="upload-btn" onclick="this.previousElementSibling.click()">📷 Bild hochladen</button>
      </div>
      <textarea class="act-desc" placeholder="Beschreibung" style="min-height:60px;">${escapeHtml(a.desc)}</textarea>
      <input type="text" class="act-meta" value="${escapeHtml(a.meta)}" placeholder="Distanz/Info, z.B. 'Ab Haustür'" />
    </div>
    <button class="icon-btn danger" onclick="this.closest('.admin-row').remove()" aria-label="Entfernen">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6M5 6l1 14a2 2 0 002 2h8a2 2 0 002-2l1-14"/></svg>
    </button>
  `;
  return row;
}
function addActivity(season) {
  document.getElementById(season + 'ActList').appendChild(
    activityRow({ icon: 'hiker', title: '', desc: '', meta: '', image: '' }, season)
  );
}

function renderServiceAdmin() {
  const list = document.getElementById('serviceAdminList');
  list.innerHTML = '';
  (state.service_links || []).forEach(s => list.appendChild(serviceRow(s)));
}
function serviceRow(s) {
  const row = document.createElement('div');
  row.className = 'admin-row admin-service-row';
  row.style.gridTemplateColumns = '1fr auto';
  row.style.alignItems = 'start';
  const iconOptions = Object.keys(SERVICE_ICONS).map(k =>
    `<option value="${k}"${k === s.icon ? ' selected' : ''}>${k}</option>`).join('');
  row.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:var(--s-2);">
      <div style="display:grid;grid-template-columns:140px 1fr;gap:var(--s-2);">
        <select class="svc-icon">${iconOptions}</select>
        <input type="text" class="svc-title" value="${escapeHtml(s.title)}" placeholder="Titel (z.B. Wetter)" />
      </div>
      <textarea class="svc-desc" placeholder="Beschreibung" style="min-height:60px;">${escapeHtml(s.desc)}</textarea>
      <input type="url" class="svc-url" value="${escapeHtml(s.url)}" placeholder="https://..." />
      <input type="text" class="svc-cta" value="${escapeHtml(s.cta || '')}" placeholder="CTA-Text (z.B. 'Wetter ansehen')" />
    </div>
    <button class="icon-btn danger" onclick="this.closest('.admin-row').remove()" aria-label="Entfernen">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6M5 6l1 14a2 2 0 002 2h8a2 2 0 002-2l1-14"/></svg>
    </button>
  `;
  return row;
}
function addServiceLink() {
  document.getElementById('serviceAdminList').appendChild(
    serviceRow({ icon: 'link', title: '', desc: '', url: '', cta: 'Öffnen' })
  );
}

function fillAdminFields() {
  document.querySelectorAll('[data-set]').forEach(input => {
    const key = input.getAttribute('data-set');
    if (state[key] !== undefined) input.value = state[key];
  });
}
async function saveAdmin() {
  document.querySelectorAll('[data-set]').forEach(input => {
    const key = input.getAttribute('data-set');
    let val = input.value;
    if (input.type === 'number') val = parseFloat(val) || 0;
    state[key] = val;
  });

  state.gallery = [];
  document.querySelectorAll('#galleryAdminList .admin-gallery-row').forEach(row => {
    const url = row.querySelector('.g-url').value.trim();
    const caption = row.querySelector('.g-caption').value.trim();
    if (url) state.gallery.push({ url, caption });
  });

  state.faqs = [];
  document.querySelectorAll('#faqAdminList .admin-faq-row').forEach(row => {
    const q = row.querySelector('.faq-q-input').value.trim();
    const a = row.querySelector('.faq-a-input').value.trim();
    if (q && a) state.faqs.push({ q, a });
  });

  state.service_links = [];
  document.querySelectorAll('#serviceAdminList .admin-service-row').forEach(row => {
    const icon = row.querySelector('.svc-icon').value;
    const title = row.querySelector('.svc-title').value.trim();
    const desc = row.querySelector('.svc-desc').value.trim();
    const url = row.querySelector('.svc-url').value.trim();
    const cta = row.querySelector('.svc-cta').value.trim() || 'Öffnen';
    if (title && url) state.service_links.push({ icon, title, desc, url, cta });
  });

  ['winter', 'summer'].forEach(season => {
    const arr = [];
    document.querySelectorAll(`#${season}ActList .admin-activity-row`).forEach(row => {
      const icon = row.querySelector('.act-icon').value;
      const title = row.querySelector('.act-title').value.trim();
      const desc = row.querySelector('.act-desc').value.trim();
      const meta = row.querySelector('.act-meta').value.trim();
      const image = row.querySelector('.act-image').value.trim();
      if (title) arr.push({ icon, title, desc, meta, image });
    });
    state['activities_' + season] = arr;
  });

  // Persist locally first (instant feedback), then push to Supabase
  saveStateLocal();
  applyTexts();
  applyImages();
  buildGallery();
  buildActivities(document.querySelector('.activity-tab.active').getAttribute('data-pane'));
  buildService();
  buildFAQ();
  renderCalendar();
  renderSummary();

  const ok = await saveContentToDB();
  showToast(ok ? '✓ Änderungen für alle Gäste gespeichert.' : '✗ Cloud-Sync fehlgeschlagen — nur lokal.');
}

function renderBlocked() {
  const list = document.getElementById('blockedList');
  // Only show manually entered blocks here (pending/confirmed bookings are managed via Requests tab)
  const manual = (state.blocked || []).filter(b => !b.type || b.type === 'manual');
  if (!manual.length) {
    list.innerHTML = '<div class="admin-empty">Noch keine manuell belegten Zeiträume.</div>';
    return;
  }
  list.innerHTML = '';
  manual.forEach((b, idx) => {
    const row = document.createElement('div');
    row.className = 'admin-row';
    const start = fromISO(b.start);
    const end = fromISO(b.end);
    row.innerHTML = `
      <div>
        <div style="font-family:var(--font-serif);font-size:1.1rem;font-weight:500;">${formatDate(start)} → ${formatDate(end)}</div>
        <div style="font-size:0.85rem;color:var(--ink-mute);margin-top:2px;">${escapeHtml(b.note || '')}</div>
      </div>
      <div class="row-actions">
        <button class="icon-btn danger" onclick="removeBlocked(${idx})" aria-label="Entfernen">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6M5 6l1 14a2 2 0 002 2h8a2 2 0 002-2l1-14"/></svg>
        </button>
      </div>
    `;
    list.appendChild(row);
  });
}
async function addBlocked() {
  const start = document.getElementById('newBlockStart').value;
  const end = document.getElementById('newBlockEnd').value;
  const note = document.getElementById('newBlockNote').value;
  if (!start || !end) { showToast('Bitte beide Daten angeben.'); return; }
  if (end <= start) { showToast('Abreise muss nach Anreise liegen.'); return; }
  const created = await addBlockedToDB(start, end, note, 'manual');
  if (!created) { showToast('✗ Fehler beim Speichern.'); return; }
  state.blocked = await loadBlockedFromDB();
  renderBlocked();
  renderCalendar();
  document.getElementById('newBlockStart').value = '';
  document.getElementById('newBlockEnd').value = '';
  document.getElementById('newBlockNote').value = '';
  showToast('Zeitraum hinzugefügt.');
}
async function removeBlocked(idx) {
  const b = state.blocked.filter(x => x.type === 'manual' || !x.type)[idx];
  if (!b) return;
  const ok = await removeBlockedFromDB(b.id);
  if (!ok) { showToast('✗ Fehler.'); return; }
  state.blocked = await loadBlockedFromDB();
  renderBlocked();
  renderCalendar();
}

function renderRequests() {
  const list = document.getElementById('requestsList');
  if (!state.requests || !state.requests.length) {
    list.innerHTML = '<div class="admin-empty">Noch keine Anfragen.</div>';
    return;
  }
  list.innerHTML = '';
  state.requests.forEach((r, idx) => {
    const card = document.createElement('div');
    card.className = 'req-card';
    const isContact = r.mode === 'contact';
    const modeLabel = r.mode === 'instant' ? 'Sofortbuchung' : (r.mode === 'inquiry' ? 'Anfrage' : 'Kontaktnachricht');
    card.innerHTML = `
      <div class="req-card-head">
        <div>
          <div class="req-name">${escapeHtml(r.name)}</div>
          <div style="font-size:0.78rem;color:var(--ink-mute);margin-top:2px;">${modeLabel} · ${new Date(r.created_at).toLocaleString('de-AT')}</div>
        </div>
        <div class="req-status ${r.status}">${r.status === 'pending' ? 'Offen' : r.status === 'confirmed' ? 'Bestätigt' : 'Abgelehnt'}</div>
      </div>
      ${!isContact ? `
        <div class="req-meta">
          <div class="req-meta-item"><label>Anreise</label><span>${formatDate(fromISO(r.start))}</span></div>
          <div class="req-meta-item"><label>Abreise</label><span>${formatDate(fromISO(r.end))}</span></div>
          <div class="req-meta-item"><label>Nächte</label><span>${r.nights}</span></div>
          <div class="req-meta-item"><label>Personen</label><span>${r.persons}</span></div>
          <div class="req-meta-item"><label>Gesamt</label><span>€${Math.round(r.total)}</span></div>
        </div>
      ` : ''}
      <div class="req-meta">
        <div class="req-meta-item"><label>E-Mail</label><span><a href="mailto:${escapeHtml(r.email)}" style="color:var(--gold);">${escapeHtml(r.email)}</a></span></div>
        ${r.phone ? `<div class="req-meta-item"><label>Telefon</label><span><a href="tel:${escapeHtml(r.phone)}" style="color:var(--gold);">${escapeHtml(r.phone)}</a></span></div>` : ''}
      </div>
      ${r.message ? `<div class="req-msg">„${escapeHtml(r.message)}"</div>` : ''}
      <div class="req-actions">
        ${r.status === 'pending' && !isContact ? `<button class="btn-confirm" onclick="confirmRequest(${idx})">Bestätigen</button>` : ''}
        ${r.status === 'pending' ? `<button class="btn-reject" onclick="rejectRequest(${idx})">${isContact ? 'Erledigt' : 'Ablehnen'}</button>` : ''}
        <button class="btn-delete" onclick="deleteRequest(${idx})">Löschen</button>
      </div>
    `;
    list.appendChild(card);
  });
}

async function confirmRequest(idx) {
  const r = state.requests[idx];
  const ok = await updateRequestStatusInDB(r.id, 'confirmed');
  if (!ok) { showToast('✗ Fehler — bitte erneut versuchen.'); return; }
  r.status = 'confirmed';
  state.blocked = await loadBlockedFromDB();
  renderRequests();
  renderCalendar();
  showToast('Buchung bestätigt und im Kalender als belegt eingetragen.');
}
async function rejectRequest(idx) {
  const r = state.requests[idx];
  const ok = await updateRequestStatusInDB(r.id, 'rejected');
  if (!ok) { showToast('✗ Fehler — bitte erneut versuchen.'); return; }
  r.status = 'rejected';
  state.blocked = await loadBlockedFromDB();
  renderRequests();
  renderCalendar();
  showToast('Anfrage abgelehnt.');
}
async function deleteRequest(idx) {
  const r = state.requests[idx];
  const wasConfirmed = r.status === 'confirmed';
  const msg = wasConfirmed
    ? `Bestätigte Buchung von "${r.name}" wirklich stornieren?\n\nDer Zeitraum wird im Kalender wieder freigegeben. Bitte informieren Sie den Gast separat per Mail.`
    : `Anfrage von "${r.name}" wirklich löschen?\n\nDas kann nicht rückgängig gemacht werden.`;
  if (!confirm(msg)) return;
  if (!sb || !adminSession) { showToast('Nicht eingeloggt.'); return; }
  try {
    await sb.from('blocked_dates').delete().eq('request_id', r.id);
    const { error } = await sb.from('requests').delete().eq('id', r.id);
    if (error) throw error;
  } catch (e) { console.error('deleteRequest:', e); showToast('✗ Fehler beim Löschen.'); return; }
  state.requests.splice(idx, 1);
  state.blocked = await loadBlockedFromDB();
  renderRequests();
  renderCalendar();
  showToast(wasConfirmed ? 'Buchung storniert · Kalender freigegeben.' : 'Gelöscht.');
}

function renderGalleryAdmin() {
  const list = document.getElementById('galleryAdminList');
  list.innerHTML = '';
  state.gallery.forEach((g, idx) => {
    list.appendChild(galleryRow(g, idx));
  });
}
function galleryRow(g, idx) {
  const row = document.createElement('div');
  row.className = 'admin-row admin-gallery-row';
  row.style.gridTemplateColumns = '80px 1fr 1fr auto';
  row.innerHTML = `
    <div style="width:80px;height:80px;border-radius:var(--r-sm);overflow:hidden;background:var(--line);">
      <img src="${escapeHtml(g.url)}" style="width:100%;height:100%;object-fit:cover;" onerror="this.style.opacity=0.2" />
    </div>
    <div style="display:flex;flex-direction:column;gap:var(--s-2);">
      <input type="url" class="g-url" value="${escapeHtml(g.url)}" placeholder="Bild URL oder hochladen ↓" oninput="this.closest('.admin-row').querySelector('img').src=this.value" />
      <div style="display:flex;gap:var(--s-2);align-items:center;">
        <input type="file" accept="image/*" style="display:none" onchange="handleFileToInput(this, '.g-url', 'gallery')" />
        <button type="button" class="upload-btn" onclick="this.previousElementSibling.click()">📷 Bild hochladen</button>
      </div>
    </div>
    <input type="text" class="g-caption" value="${escapeHtml(g.caption)}" placeholder="Beschriftung" />
    <button class="icon-btn danger" onclick="this.closest('.admin-row').remove()" aria-label="Entfernen">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6M5 6l1 14a2 2 0 002 2h8a2 2 0 002-2l1-14"/></svg>
    </button>
  `;
  return row;
}
function addGalleryItem() {
  document.getElementById('galleryAdminList').appendChild(galleryRow({ url: '', caption: '' }, state.gallery.length));
}

function renderFaqAdmin() {
  const list = document.getElementById('faqAdminList');
  list.innerHTML = '';
  state.faqs.forEach((f, idx) => {
    list.appendChild(faqRow(f, idx));
  });
}
function faqRow(f, idx) {
  const row = document.createElement('div');
  row.className = 'admin-row admin-faq-row';
  row.style.gridTemplateColumns = '1fr auto';
  row.style.alignItems = 'start';
  row.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:var(--s-2);">
      <input type="text" class="faq-q-input" value="${escapeHtml(f.q)}" placeholder="Frage" />
      <textarea class="faq-a-input" placeholder="Antwort" style="min-height:80px;">${escapeHtml(f.a)}</textarea>
    </div>
    <button class="icon-btn danger" onclick="this.closest('.admin-row').remove()" aria-label="Entfernen">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6M5 6l1 14a2 2 0 002 2h8a2 2 0 002-2l1-14"/></svg>
    </button>
  `;
  return row;
}
function addFaqItem() {
  document.getElementById('faqAdminList').appendChild(faqRow({ q: '', a: '' }, state.faqs.length));
}

/* ============================================================
   EMAIL (EmailJS)
   ============================================================ */
function fillEmailFields() {
  const cfg = state.email_config || {};
  document.getElementById('emailPublicKey').value = cfg.public_key || '';
  document.getElementById('emailServiceId').value = cfg.service_id || '';
  // Backwards compat: old `template_id` becomes the owner template
  document.getElementById('emailTemplateIdOwner').value = cfg.template_id_owner || cfg.template_id || '';
  document.getElementById('emailTemplateIdCustomer').value = cfg.template_id_customer || '';
  document.getElementById('emailRecipient').value = cfg.recipient || state.contact_email || '';
}
function saveEmailConfig() {
  state.email_config = {
    public_key: document.getElementById('emailPublicKey').value.trim(),
    service_id: document.getElementById('emailServiceId').value.trim(),
    template_id_owner: document.getElementById('emailTemplateIdOwner').value.trim(),
    template_id_customer: document.getElementById('emailTemplateIdCustomer').value.trim(),
    recipient: document.getElementById('emailRecipient').value.trim()
  };
  saveState();
  showToast('E-Mail-Konfiguration gespeichert.');
}
function loadEmailJS() {
  return new Promise((resolve, reject) => {
    if (typeof emailjs !== 'undefined') return resolve();
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
    s.async = true;
    s.onload = resolve;
    s.onerror = () => reject(new Error('EmailJS konnte nicht geladen werden'));
    document.head.appendChild(s);
  });
}
async function sendEmailNotification(req) {
  const cfg = state.email_config || {};
  if (!cfg.public_key || !cfg.service_id) return false;
  const hasOwner = !!cfg.template_id_owner;
  const hasCustomer = !!cfg.template_id_customer;
  if (!hasOwner && !hasCustomer) return false;
  try {
    await loadEmailJS();
    emailjs.init({ publicKey: cfg.public_key });
    const modeLabel = req.mode === 'instant' ? 'Sofortbuchung'
      : req.mode === 'inquiry' ? 'Anfrage'
      : 'Kontaktnachricht';
    const modeAction = req.mode === 'instant' ? 'gebucht'
      : req.mode === 'inquiry' ? 'angefragt'
      : 'kontaktiert';
    const baseParams = {
      from_name: req.name,
      first_name: (req.name || '').split(' ')[0] || req.name,
      from_email: req.email,
      phone: req.phone || '—',
      mode: modeLabel,
      mode_action: modeAction,
      start: req.start ? formatDate(fromISO(req.start)) : '—',
      end: req.end ? formatDate(fromISO(req.end)) : '—',
      nights: req.nights || '—',
      persons: req.persons || '—',
      total: req.total ? Math.round(req.total) : '—',
      message: req.message || '—',
      created_at: new Date().toLocaleString('de-AT'),
      property_name: state.brand ? (state.brand + ' Montafon') : 'Sonnenblick Montafon',
      property_address: state.address || 'Mateinaweg 8, 6781 Bartholomäberg',
      property_phone: state.contact_phone || '',
      property_mail: state.contact_email || ''
    };

    const sends = [];
    if (hasOwner) {
      sends.push(emailjs.send(cfg.service_id, cfg.template_id_owner, {
        ...baseParams,
        to_email: cfg.recipient || state.contact_email
      }));
    }
    if (hasCustomer && req.email) {
      sends.push(emailjs.send(cfg.service_id, cfg.template_id_customer, {
        ...baseParams,
        to_email: req.email
      }));
    }
    await Promise.all(sends);
    return true;
  } catch (e) {
    console.error('EmailJS send failed:', e);
    return false;
  }
}
async function testEmailSend() {
  saveEmailConfig();
  const cfg = state.email_config;
  if (!cfg.public_key || !cfg.service_id) {
    showToast('Bitte zuerst Public Key und Service ID eintragen.');
    return;
  }
  if (!cfg.template_id_owner && !cfg.template_id_customer) {
    showToast('Bitte mindestens eine Template-ID eintragen.');
    return;
  }
  showToast('Test-E-Mails werden gesendet…');
  // Use the recipient as the test "customer" email so both Owner + Customer test arrive in YOUR inbox
  const ok = await sendEmailNotification({
    name: 'Test Gast',
    email: cfg.recipient || state.contact_email || 'test@beispiel.at',
    phone: '+43 660 0000000',
    mode: 'inquiry',
    start: toISO(new Date()),
    end: toISO(new Date(Date.now() + 3*24*60*60*1000)),
    nights: 3,
    persons: 2,
    total: 1500,
    message: 'Das ist eine Test-E-Mail vom Sonnenblick Admin-Panel.'
  });
  showToast(ok ? '✓ Test-E-Mails versendet — Inbox prüfen!' : '✗ Fehler — Konsole prüfen.');
}

async function changePassword() {
  const a = document.getElementById('newPw1').value;
  const b = document.getElementById('newPw2').value;
  if (!a || a.length < 6) { showToast('Mindestens 6 Zeichen.'); return; }
  if (a !== b) { showToast('Passwörter stimmen nicht überein.'); return; }
  const ok = await adminChangePasswordSb(a);
  if (!ok) { showToast('✗ Fehler beim Ändern.'); return; }
  document.getElementById('newPw1').value = '';
  document.getElementById('newPw2').value = '';
  showToast('Passwort geändert (auf allen Geräten).');
}

/* ============================================================
   EVENTS
   ============================================================ */
function bindEvents() {
  const on = (id, ev, fn) => { const el = document.getElementById(id); if (el) el[ev] = fn; };

  // Calendar nav
  on('calPrev', 'onclick', () => { viewMonth.setMonth(viewMonth.getMonth() - 1); renderCalendar(); });
  on('calNext', 'onclick', () => { viewMonth.setMonth(viewMonth.getMonth() + 1); renderCalendar(); });

  // Persons stepper
  on('personsMinus', 'onclick', () => { if (selection.persons > 1) { selection.persons--; renderSummary(); } });
  on('personsPlus', 'onclick', () => { if (selection.persons < 6) { selection.persons++; renderSummary(); } });

  // Booking button (single binding request)
  on('btnInstantBook', 'onclick', () => openBookingDialog('instant'));

  // Admin dot
  on('adminDot', 'onclick', openAdmin);

  // Manual refresh in Anfragen tab
  const refreshBtn = document.getElementById('btnRefreshRequests');
  if (refreshBtn) {
    refreshBtn.onclick = async () => {
      refreshBtn.disabled = true;
      const orig = refreshBtn.textContent;
      refreshBtn.textContent = 'Lade…';
      await refreshBookings();
      refreshBtn.textContent = orig;
      refreshBtn.disabled = false;
    };
  }

  // Activity tabs
  document.querySelectorAll('.activity-tab').forEach(btn => {
    btn.onclick = () => {
      const target = btn.getAttribute('data-pane');
      document.querySelectorAll('.activity-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      buildActivities(target);
    };
  });

  // Admin tabs
  document.querySelectorAll('.admin-tab').forEach(btn => {
    btn.onclick = () => {
      const target = btn.getAttribute('data-tab');
      document.querySelectorAll('.admin-tab').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
      btn.classList.add('active');
      document.querySelector(`.admin-section[data-section="${target}"]`).classList.add('active');
    };
  });

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  if (navToggle && nav) {
    navToggle.onclick = () => nav.classList.toggle('nav-mobile-open');
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.addEventListener('click', () => nav.classList.remove('nav-mobile-open'));
    });
  }

  // Lightbox close on backdrop
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.onclick = (e) => { if (e.target.id === 'lightbox') closeLightbox(); };
  }

  // Esc to close modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      ['legalModal', 'bookingModal', 'confirmModal'].forEach(closeModal);
    }
    const lb = document.getElementById('lightbox');
    if (lb && lb.classList.contains('open')) {
      if (e.key === 'ArrowLeft') lightboxNav(-1);
      if (e.key === 'ArrowRight') lightboxNav(1);
    }
  });

  // Modal backdrop click
  document.querySelectorAll('.modal-backdrop').forEach(bd => {
    bd.onclick = (e) => { if (e.target === bd) bd.classList.remove('open'), document.body.style.overflow = ''; };
  });
}

/* ============================================================
   REVEAL on scroll
   ============================================================ */
function setupReveal() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ============================================================
   NAV scroll
   ============================================================ */
function setupNavScroll() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }, { passive: true });
}

/* ============================================================
   PARALLAX hero
   ============================================================ */
function setupParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const img = document.getElementById('heroImg');
  if (!img) return;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < window.innerHeight) {
          img.style.transform = `translateY(${y * 0.3}px) scale(${1 + y * 0.0002})`;
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/* ============================================================
   UTIL
   ============================================================ */
function escapeHtml(s) {
  if (s == null) return '';
  return String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
}

/* ============================================================
   BOOT
   ============================================================ */
document.addEventListener('DOMContentLoaded', init);