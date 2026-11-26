// Single source of truth for site content shared across pages.

export const SITE_URL = 'https://mirabilia.com.au';
export const SITE_NAME = 'Mirabilia';
export const PHONE = '(08) 6115 0123';
export const PHONE_HREF = 'tel:+61861150123';
export const PHONE_E164 = '+61 8 6115 0123';
export const EMAIL = 'info@mirabilia.com.au';
export const HOURS = '6:30am to 6:30pm';
export const AGES = '6 weeks to 5 years';

/* ---------------------------------------------------------------- settings
 * Switches the client may ask us to flip. Change a value here and rebuild.
 */
export const SETTINGS = {
  /**
   * Which reviews a centre page shows.
   * 'per-centre': that centre's own reviews first, topped up with general ones.
   * 'generic':    the same hand-picked set everywhere (GENERIC_REVIEWS).
   */
  reviews: 'per-centre' as 'per-centre' | 'generic',
  /**
   * Squad Programs page layout.
   * 'slideshow': one program at a time, click through (current proposal).
   * 'grid':      all program photos at once.
   * 'list':      the original long zigzag page (first draft).
   */
  squadLayout: 'slideshow' as 'slideshow' | 'grid' | 'list',
};

/* ------------------------------------------------------------------ offer
 * The new-enrolment offer. Every mention on the site (top bar, homepage card, FAQ,
 * menu, /promotion, sitemap) reads from here.
 * - To hide it everywhere: set `enabled: false`. /promotion then redirects to the CCS page.
 * - It also hides itself once `endsOn` has passed (checked at build time, so rebuild after that date).
 */
export const OFFER = {
  // Revision Nov 2026: client asked to remove the promo banner. Flip back to true to restore.
  enabled: false,
  endsOn: '2026-12-31',
  endsLabel: '31 December',
  /** Top bar, one line. */
  bar: 'Up to 4 free playdates for babies + 25% off your first month. Ends 31 December.',
  /** Homepage card. */
  title: '4 free playdates',
  text: 'for babies 0–2 years, plus 25% off the first month for new enrolments.',
  /** Menu label. */
  nav: 'Current Offer: 25% Off',
  /** Homepage FAQ answer. */
  faq: 'Babies aged 0 to 2 can enjoy up to 4 free playdates, and new enrolments get 25% off. The offer ends 31 December.',
};

export const offerActive = (now = new Date()) =>
  OFFER.enabled && now <= new Date(`${OFFER.endsOn}T23:59:59+08:00`);

export type Color = 'purple' | 'blue' | 'teal' | 'green' | 'lime' | 'yellow' | 'orange' | 'pink';
export type Tint = 'purple' | 'blue' | 'yellow';
export type Photo = [src: string, alt: string];

/* ------------------------------------------------------------------ team */

export type TeamKey = 'clarissa' | 'jaclyn' | 'naomi' | 'abbie';
export type Person = { name: string; role: string; photo: string; quote: string[] };

export const TEAM: Record<TeamKey, Person> = {
  clarissa: {
    name: 'Clarissa De Fretes',
    role: 'Approved Provider, Mirabilia Education',
    photo: 'team-clarissa.jpg',
    quote: [
      'As an Approved Provider, my focus is supporting the Directors, the services and the team as a community. As an early childhood educator I pride myself on providing quality care. I believe a stimulating and creative environment encourages children to feel safe, express themselves and extend on their current skills and knowledge.',
      'I lead by example, helping co-workers to enhance their learning and understanding of child care. I believe it takes a village to raise a child: home, child care, families and friends. Together we can support and nurture a child’s individual needs and ensure they have the best start in life.',
    ],
  },
  jaclyn: {
    name: 'Jaclyn Pereira',
    role: 'Centre Director, Mirabilia Caversham',
    photo: 'team-jaclyn.jpg',
    quote: [
      'I believe that as an early childhood educator I am responsible for providing young children with positive learning experiences. I strive to model respect, patience and care for children and adults I come in contact with.',
      'Children have the right to have their needs met and receive the proper education while in our care.',
    ],
  },
  naomi: {
    name: 'Naomi Holly',
    role: 'Centre Director, Mirabilia Byford',
    photo: 'team-naomi.jpg',
    quote: [
      'I believe that each child is an individual and as an educator, I will value and facilitate the development of each child’s strengths, interests, skills, abilities and knowledge to extend their learning. I believe that children learn through play and I endeavour to provide opportunities for children to explore, create, discover and imagine.',
      'Children need reassurance of being loved and cared for while they are enjoying an educational environment, so I will commit to provide a home-like environment that promotes this, further developing trusting and reciprocal relationships with them and their families.',
    ],
  },
  abbie: {
    name: 'Abbie Wray',
    role: 'Centre Director, Mirabilia Citiplace',
    photo: 'team-abbie.jpg',
    quote: [
      'I have developed an interest in Early Childhood as I come from a large family in Ireland. As the oldest sibling, I have developed a nurturing approach towards children. As the director of Mirabilia Citiplace it is my mission to ensure each and every child in our care has the most positive, happy experience of growth through learning and playing.',
      'My goal as the centre director is to create ‘a home away from home’ for children, staff and families at Mirabilia. I thrive in helping my staff, supporting them and empowering them. “Together we can do so much.”',
    ],
  },
};

/* --------------------------------------------------------------- reviews */

/**
 * To add a review: add an entry here. Set `centre` to a centre slug to show it on that
 * centre's page (when SETTINGS.reviews is 'per-centre'); leave it out for a general review.
 * `photo` is an optional parent/family photo in public/photos/. Without one the card shows
 * an initial in a coloured bubble, so reviews never look broken while photos are missing.
 */
export type ReviewKey = 'gigi' | 'sudarmani' | 'claire' | 'denisa' | 'shasta' | 'morwenna';
/** What a review backs up, so a short quote can sit beside the matching point on a page. */
export type ReviewTheme = 'educators' | 'play' | 'families';
/**
 * `pull` is the one-line quote shown beside a point (must be the parent's exact words,
 * copied from `text`). `themes` decides where it can appear.
 */
export type Review = { name: string; centre?: string; photo?: string; text: string; pull?: string; themes?: ReviewTheme[] };
export const REVIEWS: Record<ReviewKey, Review> = {
  gigi: { name: 'Gigi', themes: ['educators'], pull: 'The teachers here genuinely care about and support the children, and it shows.', text: 'The staff here are absolutely amazing! I’ve never felt this way at other centres before. The teachers here genuinely care about and support the children, and it shows. My child has learned so much since being here.' },
  sudarmani: { name: 'Sudarmani', text: 'I highly recommend this centre. My daughter has developed a lot after joining here. Special thanks to all the staff and educators.' },
  claire: { name: 'Claire', centre: 'byford', themes: ['educators'], pull: 'Great relationships with educators and so much one-on-one attention with smaller groups.', text: 'Our kids have been attending here for just over 1 year and they are so content and settled. Great relationships with educators and so much one-on-one attention with smaller groups. The grounds are as beautiful, new and clean as the day they opened!' },
  denisa: { name: 'Denisa', themes: ['families', 'educators'], pull: 'The staff connect and bond so well with the kids and parents.', text: 'We absolutely loved this centre and the staff here. The staff connect and bond so well with the kids and parents. They always took such good care of our boys. Cannot fault the staff here.' },
  shasta: { name: 'Shasta', centre: 'byford', themes: ['play'], pull: 'Our children have thrived there and come home tired from a fun day of learning through play.', text: 'The Byford Centre is wonderful! As our first daycare experience they have made it truly wonderful. Our children have thrived there and come home tired from a fun day of learning through play.' },
  morwenna: { name: 'Morwenna', themes: ['educators'], pull: 'The educators really go above and beyond.', text: 'My son loves his daycare! The educators really go above and beyond.' },
};

/** Used everywhere in 'generic' mode, and to top up centres with fewer than 3 reviews. */
export const GENERIC_REVIEWS: ReviewKey[] = ['gigi', 'denisa', 'morwenna', 'sudarmani'];

/**
 * One short quote that backs up a point on the page. On a centre page it prefers that
 * centre's own parents; otherwise the first general review with the theme.
 */
export function pullQuoteFor(theme: ReviewTheme, slug?: string): ReviewKey | undefined {
  const keys = (Object.keys(REVIEWS) as ReviewKey[]).filter((k) => REVIEWS[k].pull && REVIEWS[k].themes?.includes(theme));
  return keys.find((k) => slug && REVIEWS[k].centre === slug) ?? keys.find((k) => !REVIEWS[k].centre) ?? keys[0];
}

/** Reviews for one centre: its own first, then general ones, `count` in total. */
export function reviewsFor(slug?: string, count = 3): ReviewKey[] {
  const own = slug && SETTINGS.reviews === 'per-centre'
    ? (Object.keys(REVIEWS) as ReviewKey[]).filter((k) => REVIEWS[k].centre === slug)
    : [];
  return [...own, ...GENERIC_REVIEWS.filter((k) => !own.includes(k))].slice(0, count);
}

/* --------------------------------------------------------------- centres */

export type Centre = {
  slug: string;
  name: string;
  color: Color;
  tint: Tint;
  street: string;
  locality: string;
  postcode: string;
  suburb: string;
  card: Photo;
  hero: Photo;
  gallery: Photo[];
  director: TeamKey;
  isNew?: boolean;
  title: string;
  welcome: string;
  intro: string;
  videoTour?: string;
  /** Map pin. Street-level from OpenStreetMap; nudge to the front gate if needed. */
  geo: { lat: number; lng: number };
  /**
   * Google rating, shown in the centre facts strip and above reviews when set.
   * e.g. { score: 4.8, count: 37, url: 'https://g.page/r/…' }. Leave out until the client confirms.
   */
  rating?: { score: number; count: number; url: string };
};

export const CENTRES: Centre[] = [
  {
    slug: 'caversham', name: 'Caversham', color: 'purple', tint: 'purple',
    street: '1 Mavro Street', locality: 'Caversham', postcode: '6055', suburb: 'Caversham WA 6055',
    card: ['centre-caversham.jpg', 'Rainbow Mirabilia banner on the front wall of the Caversham centre'],
    hero: ['caversham-yard.jpg', 'Outdoor play area with a shade sail, cubby house and red slide'],
    gallery: [
      ['caversham-room.jpg', 'Bright playroom with low shelves and small tables'],
      ['caversham-room-2.jpg', 'Long sunny room set up with activity tables'],
      ['caversham-sign.jpg', 'Mirabilia sign in the Caversham entrance'],
      ['caversham-visit.jpg', 'An educator playing guitar while children listen'],
    ],
    director: 'jaclyn',
    geo: { lat: -31.86812, lng: 115.98015 },
    title: 'Caversham Childcare, Early Learning & Kindy',
    welcome: 'Welcome to Mirabilia Caversham',
    intro: 'Nestled close to the beauty of the Swan Valley, our Caversham centre is a nurturing space where children are free to explore, play and discover. Our dedicated educators build close, caring relationships with every child and family, creating a true sense of belonging from the very first day.',
    /** Video tour URL (YouTube/Vimeo embed or .mp4). Placeholder shown until the client sends it. */
    videoTour: '',
  },
  {
    slug: 'byford', name: 'Byford', color: 'orange', tint: 'yellow',
    street: '2 Walters Road', locality: 'Byford', postcode: '6122', suburb: 'Byford WA 6122',
    card: ['centre-byford.jpg', 'Colourful Mirabilia sign on the stone wall at the Byford centre'],
    hero: ['byford-pergola.jpg', 'Byford outdoor area with a timber pergola and sandpit'],
    gallery: [
      ['byford-room.jpg', 'Byford playroom with rugs and open shelves'],
      ['byford-yard.jpg', 'Shade sail over the Byford play yard and slide'],
      ['byford-room-2.jpg', 'Learning room with sensory tables'],
      ['byford-room-3.jpg', 'Classroom with an easel and art corner'],
    ],
    director: 'naomi',
    geo: { lat: -32.21290, lng: 116.01397 },
    title: 'Byford Childcare, Early Learning & Kindy',
    welcome: 'Welcome to Mirabilia Byford',
    intro: 'Our Byford centre reflects the friendly, family-focused spirit of the community it serves. With inspiring learning spaces and educators who genuinely care, we help children grow in confidence, curiosity and independence in a setting that feels like an extension of home.',
    /** Video tour URL (YouTube/Vimeo embed or .mp4). Placeholder shown until the client sends it. */
    videoTour: '',
  },
  {
    slug: 'citiplace', name: 'Citiplace', color: 'teal', tint: 'blue',
    street: '16/378 Wellington Street', locality: 'Perth', postcode: '6000', suburb: 'Perth WA 6000',
    card: ['centre-citiplace.jpg', 'Mirabilia entrance with a painted river mural at Citiplace'],
    hero: ['citiplace-room.jpg', 'Citiplace room with teal shelves and small wooden tables'],
    gallery: [
      ['centre-citiplace.jpg', 'Citiplace entrance with a painted mural'],
      ['classroom.jpg', 'Classroom set up with trays and loose parts'],
    ],
    director: 'abbie',
    geo: { lat: -31.95131, lng: 115.85951 },
    title: 'Childcare & Kindy Perth CBD, near Perth Station',
    welcome: 'Welcome to Mirabilia Citiplace',
    intro: 'Conveniently located in the city, our Citiplace centre is perfect for busy families looking for care that fits seamlessly into the working day. Our calm, welcoming environment gives children a place to learn, create and connect, while giving parents peace of mind that their child is in caring hands.',
    /** Video tour URL (YouTube/Vimeo embed or .mp4). Placeholder shown until the client sends it. */
    videoTour: '',
  },
  {
    slug: 'champion-lakes', name: 'Champion Lakes', color: 'pink', tint: 'purple',
    street: '4 McNeill Road', locality: 'Champion Lakes', postcode: '6111', suburb: 'Champion Lakes WA 6111',
    card: ['champion-2.jpg', 'Timber furniture and play areas inside the Champion Lakes centre'],
    hero: ['champion-1.jpg', 'New playroom at Mirabilia Champion Lakes'],
    gallery: [
      ['champion-3.jpg', 'Champion Lakes room with natural timber furniture'],
      ['champion-4.jpg', 'Reading nook and soft play corner'],
      ['champion-5.jpg', 'Activity tables ready for the day'],
      ['champion-6.jpg', 'Bright learning space at Champion Lakes'],
    ],
    director: 'clarissa',
    geo: { lat: -32.12829, lng: 115.97360 }, // TODO: confirm, McNeill Road is long
    isNew: true,
    title: 'New Childcare & Kindy in Champion Lakes WA',
    welcome: 'Welcome to Mirabilia Champion Lakes',
    intro: 'Close to the open spaces and natural surrounds of Champion Lakes, our centre encourages children to connect with the world around them. Through play-based learning and meaningful experiences, our educators nurture every child’s growth, creativity and love of learning.',
    /** Video tour URL (YouTube/Vimeo embed or .mp4). Placeholder shown until the client sends it. */
    videoTour: '',
  },
];

export const centreBySlug = (slug: string) => CENTRES.find((c) => c.slug === slug);
export const mapUrl = (c: Centre) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${c.street} ${c.suburb}`)}`;
export const directionsUrl = (c: Centre) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${c.street} ${c.suburb}`)}`;

/* ---------------------------------------------------------- child safety
 * Concrete practices, not adjectives. Shown on every centre page (#child-safety).
 * TODO: confirm each line with Mirabilia before launch (and add CCTV, lanyards etc. if they apply).
 */
export const CHILD_SAFETY: [icon: string, color: Color, title: string, text: string][] = [
  ['tick', 'green', 'Checked educators', 'Every educator holds a current Working with Children Check and completes child protection training.'],
  ['heart', 'pink', 'First aid on site, always', 'An educator trained in first aid, anaphylaxis and asthma is on site the whole time we are open.'],
  ['house', 'orange', 'Secure entry and pick-up', 'Children are signed in and out each day, and only go home with adults you have authorised.'],
  ['flag', 'blue', 'Practised drills', 'We rehearse emergency evacuation and lockdown procedures with children and staff every term.'],
  ['camera', 'teal', 'Photos stay private', 'Photos of your child are shared with you through your own secure Storypark login.'],
  ['people', 'purple', 'Proper ratios', 'Every room is staffed to the national educator-to-child ratios, all day.'],
];

/* ------------------------------------------------------------ centre FAQ */

export const centreFaq = (c: Centre): [q: string, a: string][] => [
  [`What are the opening hours at Mirabilia ${c.name}?`, `Mirabilia ${c.name} is open ${HOURS}, Monday to Friday.`],
  [`What ages does Mirabilia ${c.name} care for?`, `We care for children from ${AGES}, with rooms grouped by age so every child has friends at the same stage.`],
  ['Can I get the Child Care Subsidy?', 'Most families using approved care are eligible. The subsidy is paid straight to us and comes off your fees. Our team can help you check your eligibility.'],
  ['Can I choose which days my child attends?', 'Yes. Tell us the days you need when you book a tour or enquire, and we will let you know what is available in your child’s room.'],
  ['How will I know how my child’s day went?', 'Educators share photos, stories and learning notes through Storypark, a secure app. Every family gets its own login.'],
  ['How do I enrol?', `Book a tour first so you can see the rooms and meet the team. After the tour we will help you with the enrolment form and your CCS details.`],
];

/* -------------------------------------------------------------- programs */

export type Program = {
  slug: string;
  name: string;
  icon: string;
  color: Color;
  photo: Photo;
  short: string;
};

export const PROGRAMS: Program[] = [
  { slug: 'cooking-class', name: 'Cooking Class', icon: 'chef', color: 'orange', photo: ['cooking-class.jpg', 'Children in gloves helping an educator with a recipe'],
    short: 'Washing, mixing and tasting. Little chefs learn about healthy food with real recipes.' },
  // Purple, not blue: program cards sit on blue bands in this design.
  { slug: 'music-class', name: 'Music Class', icon: 'music', color: 'purple', photo: ['music-class.jpg', 'An educator playing guitar for a group of toddlers'],
    short: 'Singing, drums and shakers, with simple rhythm games for every age.' },
  { slug: 'sports-class', name: 'Sports Class', icon: 'ball', color: 'green', photo: ['sports-outdoor.jpg', 'Toddlers playing with hoops and balls outside'],
    short: 'Ball games, obstacle courses and running that build coordination and teamwork.' },
  { slug: 'happy-feet', name: 'Happy Feet', icon: 'feet', color: 'pink', photo: ['happy-feet.jpg', 'A Happy Feet presenter with a finger puppet and a smiling toddler'],
    short: 'Dance and movement sessions that get everyone wiggling, jumping and grooving.' },
  { slug: 'elderly-visit', name: 'Elderly Visit', icon: 'teacup', color: 'teal', photo: ['elderly-2.jpg', 'Children sitting with elderly friends during a visit'],
    short: 'Songs, stories and games shared with seniors at local aged care homes.' },
];

export const programBySlug = (slug: string) => PROGRAMS.find((p) => p.slug === slug);

export type ProgramDetail = {
  tagline: string[];
  tint: Tint;
  photos: [Photo, Photo];
  gallery: Photo[];
  intro: string[];
  blocks: [string, string][];
  why: [icon: string, color: Color, title: string, text: string][];
  join: string;
};

export const PROGRAM_DETAIL: Record<string, ProgramDetail> = {
  'cooking-class': {
    tagline: ['Inspiring little chefs to explore, create and ', 'taste!'],
    tint: 'yellow',
    photos: [['cooking-toddler.jpg', 'A toddler mixing ingredients in a bowl'], ['little-chef.jpg', 'A toddler in a chef’s hat stirring a pan']],
    gallery: [['cooking-class.jpg', 'Children in gloves gathered around a mixing bowl'], ['cooking-play.jpg', 'A boy pretending to cook at a play kitchen'], ['cooking-tray.jpg', 'Two children with chef hats holding a baking tray'], ['water-pouring.jpg', 'Children pouring water into a pot at the outdoor kitchen']],
    intro: [
      'At Mirabilia, our Cooking Class is more than a fun activity. It’s a hands-on learning experience that introduces children to the joys of cooking and the importance of healthy eating.',
      'Little chefs put on their aprons and step into a world of creativity, flavour and adventure. From mixing ingredients to tasting their own creations, every session is a delightful and educational journey.',
    ],
    blocks: [
      ['What we offer', 'A structured yet flexible program that encourages children to engage with food in a positive way. Children learn about different ingredients, basic kitchen skills and essential safety practices, with each class planned to suit different ages and skill levels.'],
      ['Learning through play', 'Children explore textures, smells and tastes while learning life skills like measuring, mixing and following instructions. Sessions foster creativity, build motor skills and boost confidence as children make their own snacks, meals and treats.'],
      ['Health & nutrition', 'We talk about healthy eating habits, food groups and a balanced diet, with fruits, vegetables, grains and proteins. Children also try dishes from different cuisines, celebrating cultural diversity.'],
    ],
    why: [
      ['chef', 'orange', 'Hands-on experience', 'Children take part in every step, from prepping ingredients to plating dishes.'],
      ['tick', 'green', 'Qualified instructors', 'Educators trained in both childcare and culinary skills keep sessions safe and engaging.'],
      ['heart', 'pink', 'Safety first', 'Children learn to handle kitchen tools and equipment with care.'],
      ['star', 'yellow', 'Creative & fun', 'Every session includes games, stories and crafts linked to the dish.'],
    ],
    join: 'At Mirabilia, we believe every child is a little chef in the making, ready to explore a world of taste and creativity!',
  },
  'music-class': {
    tagline: ['Discover the joy of ', 'music & sound!'],
    tint: 'blue',
    photos: [['music-drums.jpg', 'A toddler playing a hand drum'], ['music-shaker.jpg', 'A baby shaking a musical instrument']],
    gallery: [['music-class.jpg', 'An educator playing guitar with toddlers'], ['music-babies.jpg', 'Babies playing with a floor piano mat'], ['music-circle.jpg', 'Children sitting in a circle for a guitar sing-along'], ['caversham-visit.jpg', 'Children listening to live guitar']],
    intro: [
      'Our Music Class is a joyful journey into rhythm, melody and sound. Designed for children of all ages, it introduces the basics of music in a playful, engaging way.',
      'We believe music is a universal language that inspires creativity, encourages emotional expression and brings joy to every child.',
    ],
    blocks: [
      ['What makes it special', 'Music is a tool for holistic development. Children sing, dance, play instruments and explore sound, with sessions tailored to each age group and developmental stage.'],
      ['Benefits of music', 'Music supports cognitive development, memory, and social and emotional skills. Children learn about different genres, try various instruments and explore concepts like beat, tempo and pitch, while practising teamwork and cooperation.'],
      ['Interactive & fun', 'Singing, dancing and instrument play keep everyone engaged. From tambourines to maracas, every session is a new adventure in sound, with simple music theory taught through games.'],
    ],
    why: [
      ['people', 'purple', 'Inclusive', 'Open to all children, whatever their musical background or ability.'],
      ['music', 'blue', 'Expert educators', 'Experienced music teachers who love nurturing young talent.'],
      ['book', 'teal', 'Well-rounded', 'Singing, instruments, rhythm and melody, all in one program.'],
      ['heart', 'pink', 'Emotional expression', 'A safe, creative space for children to express their feelings.'],
    ],
    join: 'Let your child explore the magical world of music, discover new sounds, make new friends and develop a lifelong love for music!',
  },
  'sports-class': {
    tagline: ['Active kids, ', 'healthy futures!'],
    tint: 'blue',
    photos: [['sports-cones.jpg', 'Children kicking soccer balls around cones'], ['sports-basketball.jpg', 'A girl lifting a basketball towards the hoop']],
    gallery: [['sports-outdoor.jpg', 'Toddlers playing with hoops and balls outside'], ['sports-ladder.jpg', 'Children stepping through an agility ladder'], ['sports-screen.jpg', 'Children following a movement video'], ['sports-basketball.jpg', 'A toddler shooting hoops indoors']],
    intro: [
      'Mirabilia Sports Class promotes physical activity, teamwork and a love for sport in a fun, encouraging environment.',
      'Tailored to children of all ages, it focuses on motor skills, coordination and a positive attitude to fitness, while teaching the value of exercise, healthy competition and teamwork.',
    ],
    blocks: [
      ['About the program', 'From team sports like soccer and basketball to running and gymnastics, each session suits different ages and skill levels. A mix of structured lessons and free play builds both skills and a love of staying active.'],
      ['Benefits of being active', 'Regular activity builds strength, coordination, balance and agility. We introduce basic sports skills and rules, promote fair play, and build confidence through positive encouragement.'],
      ['Social skills & teamwork', 'Children learn to work as a team, make new friends, take turns, and handle winning and losing with grace. These lessons build lifelong social skills.'],
    ],
    why: [
      ['ball', 'green', 'Lots to try', 'From ball games to obstacle courses, there’s something for every child.'],
      ['flag', 'orange', 'Professional coaches', 'Qualified instructors who are passionate about sport.'],
      ['people', 'purple', 'Everyone joins in', 'All children are encouraged to take part, whatever their ability.'],
      ['star', 'yellow', 'Fun first', 'A supportive environment for learning new skills and enjoying it.'],
    ],
    join: 'Give your child the chance to stay active, healthy and happy, and build friendships through sport!',
  },
  'happy-feet': {
    tagline: ['Dance, movement and ', 'joy', ' for every little one!'],
    tint: 'purple',
    photos: [['happyfeet-3.jpg', 'Children holding the edge of a colourful parachute'], ['happy-feet.jpg', 'A Happy Feet presenter with a puppet and a toddler']],
    gallery: [['happyfeet-1.jpg', 'Children dancing around the room'], ['happyfeet-2.jpg', 'Children following dance moves on a mat'], ['squad-dance.jpg', 'Kindergarten children dancing with maracas'], ['music-circle.jpg', 'Children sitting in a circle for a sing-along']],
    intro: [
      'Happy Feet is all about getting children moving and grooving to the rhythm of fun! This dance and movement class combines music, rhythm and play to build fitness and creative expression.',
      'It’s perfect for children who love to dance, jump and wiggle, or who simply enjoy moving to the beat.',
    ],
    blocks: [
      ['About the program', 'A dynamic dance and movement program tailored to different age groups, mixing basic dance steps, movement games and creative expression. Sessions are inclusive and encourage children to move in their own unique way.'],
      ['Physical development', 'Happy Feet builds gross motor skills, coordination, balance and flexibility. Each session supports muscle development, posture and physical health, making fitness a fun part of the routine.'],
      ['Creativity & confidence', 'Exploring different dance styles and music helps children interpret rhythm in their own way, building self-esteem, social skills and a real sense of achievement.'],
    ],
    why: [
      ['music', 'pink', 'Engaging curriculum', 'Ballet, jazz, hip-hop and contemporary keep things fresh and exciting.'],
      ['feet', 'purple', 'Experienced instructors', 'Qualified dance educators who love teaching children.'],
      ['heart', 'orange', 'Fun & safe', 'Safe classes with the right measures in place to prevent injuries.'],
      ['sprout', 'green', 'Whole-child growth', 'Supports emotional, social and cognitive development too.'],
    ],
    join: 'Watch your child’s love for dance and movement flourish as they make friends, build confidence and stay active!',
  },
  'elderly-visit': {
    tagline: ['Connecting generations with ', 'love & care'],
    tint: 'yellow',
    photos: [['elderly-1.jpg', 'Children doing crafts with elderly residents'], ['elderly-3.jpg', 'Toddlers playing on the floor while seniors watch']],
    gallery: [['elderly-2.jpg', 'Children and seniors sitting together in a circle'], ['elderly-4.jpg', 'A group singing session with elderly friends'], ['caversham-visit.jpg', 'A visitor sitting with children'], ['elderly-1.jpg', 'Crafts with elderly friends']],
    intro: [
      'We believe in fostering empathy, kindness and community spirit from a young age. Our Elderly Visit Squad Program bridges the generational gap by bringing children and seniors together.',
      'Through regular visits to local aged care homes, children connect with elderly friends, learning valuable life lessons while spreading joy and companionship.',
    ],
    blocks: [
      ['About the program', 'Visits are carefully planned so every interaction is meaningful and positive. Children and seniors read stories, play games, sing songs and simply spend time together, forming friendships and lasting memories.'],
      ['Benefits for children', 'Children develop empathy, compassion and a sense of community. They learn about different life experiences, history and the value of kindness and respect, and gain an understanding of ageing.'],
      ['Benefits for the elderly', 'Children bring joy, energy and companionship. Many seniors look forward to these visits for the social connection and a happy break from routine.'],
    ],
    why: [
      ['heart', 'pink', 'Building empathy', 'Children learn kindness, respect and understanding.'],
      ['people', 'purple', 'Creating connections', 'Meaningful relationships between young and old.'],
      ['sprout', 'green', 'Emotional growth', 'Children grow their emotional intelligence and social skills.'],
      ['teacup', 'teal', 'Fun together', 'Activities that children and seniors can enjoy side by side.'],
    ],
    join: 'Help your child become part of something special. Together we can build a compassionate, connected community, one visit at a time.',
  },
};

/* --------------------------------------------------------------- navigation */

type NavLink = [href: string, label: string];

/**
 * A menu entry is a dropdown (`items`), a dropdown split under small headings (`groups`),
 * or a plain link (`href`). Groups stay one level deep on purpose: no fly-out submenus.
 */
export type NavEntry = {
  label: string; key: string; href?: string; items?: NavLink[];
  groups?: { heading: string; items: NavLink[] }[];
};

/** Every link inside a dropdown, grouped or not. */
export const navLinks = (g: NavEntry): NavLink[] => g.groups?.flatMap((x) => x.items) ?? g.items ?? [];

// Revision Nov 2026: menu follows the Greenleaf-style sitemap agreed with the client.
export const NAV: NavEntry[] = [
  { label: 'Our Centres', key: 'centres', items: [['/centres', 'All Centres'], ...CENTRES.map((c) => [`/${c.slug}`, `Mirabilia ${c.name}`] as [string, string])] },
  { label: 'Curriculum & Programs', key: 'programs', items: [
    ['/our-philosophy', 'Philosophy'],
    ['/our-curriculum', 'Learning Journeys'],
    ['/squad-programs', 'Squad Programs'],
    ['/a-day-at-mirabilia', 'A Day at Mirabilia'],
    ['/our-spaces', 'Learning Spaces & Child Safety'],
  ] },
  { label: 'Families', key: 'families', items: [['/childcare-subsidy', 'Child Care Subsidy (CCS)'], ['/inclusive-care', 'Inclusive Care'], ['/family-benefits', 'Family Benefits']] },
  { label: 'Our Story', key: 'story', href: '/our-story' },
  { label: 'Careers', key: 'careers', href: '/careers' },
  { label: 'Contact', key: 'contact', href: '/contact' },
];

/** Main call to action in the header ("Explore Now"). */
export const CTA_LINKS: NavLink[] = [['/book-a-tour', 'Book a Tour'], ['/enquire-now', 'Make an Enquiry']];

/* -------------------------------------------------------------- leadership
 * Our Story page. New staff photos are being taken this month, so `photo` stays empty
 * and the card shows a neutral placeholder. Do not reuse the old team photos.
 */
export type Leader = { name: string; role: string; photo?: string };
export const LEADERSHIP: { key: string; title: string; text: string; people: Leader[] }[] = [
  { key: 'senior', title: 'Senior Management Team',
    text: 'Our Senior Management Team sets the vision and direction for Mirabilia. With deep experience in early childhood education and a shared passion for quality, they lead with purpose, so that every decision we make puts children and families first.',
    people: [
      { name: 'Clarissa de Fretes', role: 'Approved Provider & Principal Director' },
      { name: 'Ditya Kusuma', role: 'Approved Provider' },
      { name: 'Anrivi Aryoputro', role: 'Finance Director' },
    ] },
  { key: 'centre', title: 'Centre Managers',
    text: 'Our Centre Managers are the heart of each centre. They lead their teams with warmth and professionalism, build strong relationships with families and create welcoming environments where children feel safe, valued and inspired to learn.',
    people: [
      { name: 'Jaclyn Pereira', role: 'Caversham' },
      { name: 'Naomi Holly', role: 'Byford and Champion Lakes' },
      { name: 'Abbie Wray', role: 'Citiplace' },
    ] },
  { key: 'shared', title: 'Shared Services Team',
    text: 'Our Shared Services team makes sure every family’s experience with Mirabilia is seamless, from your very first inquiry to enrolment and beyond. They’re here to answer your questions, guide you through fees and CCS, and support each centre behind the scenes. Through clear communication, efficient systems and a genuine commitment to service, they help our centres run smoothly, so that families feel supported and educators can focus on what matters most: the children in their care.',
    people: [
      { name: 'Madelyn Villa', role: 'Client Services' },
      { name: 'Pazia Faisal', role: 'Human Resources' },
      { name: 'Reinhard Welan', role: 'Operations' },
    ] },
];
