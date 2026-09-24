export type Photo = { id: string; alt: string }

export const brand = {
  name: 'TransGo',
  sub: 'GLOBAL LOGISTICS',
  tagline: 'We move the world forward.',
}

export const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Our Network', href: '#network' },
  { label: 'Journey', href: '#journey' },
  { label: 'Technology', href: '#technology' },
  { label: 'Contact', href: '#footer' },
]

/** The shipment the whole page follows. */
export const shipment = {
  id: '#TG784562',
  contents: '2 pallets · industrial components',
  weight: '1,840 kg',
  origin: { city: 'Lagos', country: 'Nigeria', code: 'LOS' },
  hub: { city: 'Algeciras', country: 'Spain', code: 'ALG' },
  destination: { city: 'London', country: 'United Kingdom', code: 'LDN' },
  distance: '8,140 km',
  eta: 'Thu 09:40',
}

export type Stage = {
  n: string
  id: string
  title: string
  short: string
  kicker: string
  copy: string
  place: string
  time: string
  metrics: { label: string; value: string }[]
  photo: Photo
}

export const stages: Stage[] = [
  {
    n: '01',
    id: 'pickup',
    title: 'Picked Up',
    short: 'Picked up',
    kicker: 'Origin — Lagos',
    copy: 'Your goods are scanned, wrapped and palletised on our floor. A forklift lifts the pallet into the trailer and the shipment goes live in your dashboard the moment the doors close.',
    place: 'TransGo DC · Apapa, Lagos',
    time: 'Mon 06:12',
    metrics: [
      { label: 'Pallets', value: '02' },
      { label: 'Weight', value: '1,840 kg' },
      { label: 'Scan', value: 'PASSED' },
    ],
    photo: { id: '1586528116311-ad8dd3c8310d', alt: 'Wide distribution warehouse with racking and forklifts' },
  },
  {
    n: '02',
    id: 'road',
    title: 'In Transit',
    short: 'On the road',
    kicker: 'Inland haul — 142 km',
    copy: 'A dedicated tractor unit runs the inland leg to the port. Position, door status and cabin temperature stream back every thirty seconds along the whole route.',
    place: 'Lagos–Badagry Expressway → Apapa Terminal',
    time: 'Mon 08:05',
    metrics: [
      { label: 'Speed', value: '86 km/h' },
      { label: 'Temp', value: '18.4 °C' },
      { label: 'Doors', value: 'SEALED' },
    ],
    photo: { id: '1519003722824-194d4455a60c', alt: 'Truck driving a highway through mountains' },
  },
  {
    n: '03',
    id: 'port',
    title: 'At the Port',
    short: 'At the port',
    kicker: 'Handover — Apapa',
    copy: 'At the terminal a gantry crane lifts the container from the chassis and stacks it aboard. When the clock matters more than the cost, the same shipment flies instead.',
    place: 'Apapa Container Terminal, Lagos',
    time: 'Mon 14:30',
    metrics: [
      { label: 'Container', value: 'TGUD 418 220' },
      { label: 'Bay', value: '07 / 14' },
      { label: 'Vessel', value: 'MV TRANSGO' },
    ],
    photo: { id: '1578575437130-527eed3abbec', alt: 'Container ship berthed under gantry cranes at a port' },
  },
  {
    n: '04',
    id: 'transit',
    title: 'Ocean Crossing',
    short: 'Ocean crossing',
    kicker: 'Main leg — 7,600 km',
    copy: 'Fourteen days at sea up the West African coast, past Algeciras and into the Thames. You watch the vessel move, and we watch the paperwork move with it.',
    place: 'Gulf of Guinea → Algeciras → North Sea',
    time: 'Day 07 · 03:20 UTC',
    metrics: [
      { label: 'Leg', value: '58% complete' },
      { label: 'Speed', value: '17.2 kn' },
      { label: 'ETA', value: 'On schedule' },
    ],
    photo: { id: '1605745341112-85968b19335b', alt: 'Container ship loaded with containers crossing open sea' },
  },
  {
    n: '05',
    id: 'customs',
    title: 'Customs Cleared',
    short: 'Cleared',
    kicker: 'Tilbury — UK entry',
    copy: 'Our brokers file ahead of arrival. Duties calculated, declaration lodged, release granted before the box is even lifted off the vessel.',
    place: 'Port of Tilbury · London',
    time: 'Day 14 · 07:55',
    metrics: [
      { label: 'Declaration', value: 'LODGED' },
      { label: 'Duty', value: 'PREPAID' },
      { label: 'Release', value: 'GRANTED' },
    ],
    photo: { id: '1521791055366-0d553872125f', alt: 'Hand signing a document on a desk' },
  },
  {
    n: '06',
    id: 'lastmile',
    title: 'Delivered',
    short: 'Delivered',
    kicker: 'London — last mile',
    copy: 'A city van runs the final 47 kilometres. Two hours out, your contact gets a live window and the driver’s name. Signature captured at the door closes the file.',
    place: 'Shoreditch, London',
    time: 'Thu 09:40',
    metrics: [
      { label: 'Window', value: '09:30–10:00' },
      { label: 'Driver', value: 'L. OKONKWO' },
      { label: 'Status', value: 'DELIVERED' },
    ],
    photo: { id: '1566576721346-d4a3b4eaeb55', alt: 'Driver handing a parcel to a recipient at the door' },
  },
]

/** The four ways we move freight — the service cards. */
export const services = [
  {
    n: '01',
    title: 'Road Transport',
    text: 'Reliable delivery across cities and countries, with dedicated and groupage options on every major corridor.',
    points: ['FTL / LTL', 'Cross-border', 'Live tracking'],
    photo: { id: '1601584115197-04ecc0da31d7', alt: 'Long-haul truck on an open highway' },
  },
  {
    n: '02',
    title: 'Ocean Freight',
    text: 'Global shipping for bigger possibilities — FCL and LCL with fixed-day sailings and guaranteed vessel space.',
    points: ['FCL / LCL', 'Port-to-door', 'Reefer cargo'],
    photo: { id: '1605745341112-85968b19335b', alt: 'Container ship crossing open sea fully loaded' },
  },
  {
    n: '03',
    title: 'Air Freight',
    text: 'Speed that keeps your business moving: next-flight-out and consolidated air, cleared within hours of landing.',
    points: ['Next flight out', 'Charter', 'AOG & pharma'],
    photo: { id: '1542296332-2e4473faf563', alt: 'Cargo aircraft on an airport apron at sunset' },
  },
  {
    n: '04',
    title: 'Rail Freight',
    text: 'Efficient and sustainable cargo movement on block trains, at a fraction of the carbon of road or air.',
    points: ['Block trains', 'Intermodal', 'Low carbon'],
    photo: { id: '1474487548417-781cb71495f3', alt: 'Freight train hauling wagons along a rail line' },
  },
]

export const network = {
  stats: [
    { value: 150, suffix: '+', label: 'Countries' },
    { value: 1000, suffix: '+', label: 'Logistics partners' },
    { value: 99.8, suffix: '%', label: 'On-time delivery' },
    { value: 24, suffix: '/7', label: 'Control tower' },
  ],
  lanes: [
    { from: 'Lagos', to: 'London', mode: 'Ocean', days: '14 days', status: 'In transit' },
    { from: 'New York', to: 'London', mode: 'Air', days: '1 day', status: 'In transit' },
    { from: 'Dubai', to: 'Nairobi', mode: 'Road', days: '3 days', status: 'On road' },
    { from: 'Berlin', to: 'Tokyo', mode: 'Rail', days: '18 days', status: 'By rail' },
    { from: 'Shanghai', to: 'Hamburg', mode: 'Ocean', days: '28 days', status: 'Scheduled' },
    { from: 'Durban', to: 'Felixstowe', mode: 'Ocean', days: '21 days', status: 'Scheduled' },
  ],
}

/** Cities plotted on the network map. */
export const hubs: { city: string; lat: number; lon: number }[] = [
  { city: 'Lagos', lat: 6.45, lon: 3.4 },
  { city: 'London', lat: 51.51, lon: -0.13 },
  { city: 'New York', lat: 40.71, lon: -74.01 },
  { city: 'Dubai', lat: 25.2, lon: 55.27 },
  { city: 'Nairobi', lat: -1.29, lon: 36.82 },
  { city: 'Berlin', lat: 52.52, lon: 13.4 },
  { city: 'Tokyo', lat: 35.68, lon: 139.69 },
  { city: 'Shanghai', lat: 31.23, lon: 121.47 },
]

/** Routes drawn as arcs between hubs. */
export const arcs = [
  { from: 'New York', to: 'London', label: 'New York → London', status: 'In Transit' },
  { from: 'Lagos', to: 'London', label: 'Lagos → London', status: 'On Water' },
  { from: 'Dubai', to: 'Nairobi', label: 'Dubai → Nairobi', status: 'On Road' },
  { from: 'Berlin', to: 'Tokyo', label: 'Berlin → Tokyo', status: 'By Rail' },
]

/** The technology strip beside the scanning photograph. */
export const tech = [
  { key: 'scan', title: 'Scan', text: 'Package identified' },
  { key: 'sort', title: 'Sort', text: 'Automated sorting' },
  { key: 'track', title: 'Track', text: 'Real-time updates' },
  { key: 'route', title: 'Route', text: 'Smartest route' },
  { key: 'deliver', title: 'Deliver', text: 'Safe and on time' },
]

export const techPhoto: Photo = { id: '1580674285054-bed31e145f59', alt: 'Parcels stacked and labelled ready for sorting' }

/** Demo shipments for the tracking panel. */
export const trackables: Record<string, { route: string; mode: string; steps: { label: string; time: string; done: boolean }[] }> = {
  '#TG784562': {
    route: 'Lagos → London',
    mode: 'Ocean + Road',
    steps: [
      { label: 'Package collected', time: 'Mon 06:12', done: true },
      { label: 'Sorted and scanned at warehouse', time: 'Mon 09:40', done: true },
      { label: 'Moving to destination', time: 'Tue 02:10', done: true },
      { label: 'Reached destination hub — Tilbury', time: 'Day 14 · 07:55', done: true },
      { label: 'Out for delivery — driver on the way', time: 'Thu 08:05', done: true },
      { label: 'Delivered · signed L. Okonkwo', time: 'Thu 09:40', done: true },
    ],
  },
  '#TG5120AE': {
    route: 'Dubai → Nairobi',
    mode: 'Air',
    steps: [
      { label: 'Package collected', time: 'Wed 11:20', done: true },
      { label: 'Tendered to airline · DXB', time: 'Wed 16:45', done: true },
      { label: 'In flight', time: 'Wed 21:30', done: true },
      { label: 'Arrived NBO — customs', time: 'Thu 04:15', done: false },
      { label: 'Out for delivery', time: 'Pending', done: false },
    ],
  },
  '#TG3098NL': {
    route: 'Berlin → Tokyo',
    mode: 'Rail',
    steps: [
      { label: 'Loaded at Berlin terminal', time: 'Fri 05:40', done: true },
      { label: 'Block train departed', time: 'Fri 09:15', done: true },
      { label: 'Border crossing — Malaszewicze', time: 'Sun 14:00', done: false },
      { label: 'Delivered', time: 'Pending', done: false },
    ],
  },
}

export const closing = {
  stats: [
    { value: 1, suffix: 'M+', label: 'Shipments delivered' },
    { value: 150, suffix: '+', label: 'Countries' },
    { value: 10000, suffix: '+', label: 'Happy customers' },
  ],
  photo: { id: '1592838064575-70ed626d3a0e', alt: 'Freight truck running an open highway at golden hour' },
}

export const hero = {
  photo: { id: '1586528116311-ad8dd3c8310d', alt: 'Warehouse loading dock with forklifts and a waiting trailer' },
}

export const finale = closing
