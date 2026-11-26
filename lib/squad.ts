import type { Photo } from './data';

/**
 * Squad pages that exist for SEO only. They are linked from /squad-programs but kept
 * out of the main menu, as the brief asks. URL: /squad-programs/<slug>.
 */
export type SquadTopic = { slug: string; name: string; officer: string; photo: Photo; summary: string; body: string[] };

export const SQUAD_TOPICS: SquadTopic[] = [
  {
    slug: 'physical-literacy-wellbeing',
    name: 'Physical Literacy & Wellbeing',
    officer: 'KIDDO Physical Literacy Officer & Wellness and Wellbeing Officer',
    photo: ['sports-cones.jpg', 'Children kicking soccer balls around cones'],
    summary: 'Fundamental movement skills, emotional literacy and mindfulness, woven into every room each week.',
    body: [
      'Our KIDDO Physical Literacy Officer champions fundamental movement skills, such as balancing, throwing, catching, and agility, through fun, evidence-based play that builds lifelong physical confidence.',
      'Alongside them, our Wellness & Wellbeing Officer nurtures emotional literacy, mindfulness, sensory calm, and resilience, helping children recognise their feelings and develop healthy coping tools.',
    ],
  },
  {
    slug: 'reconciliation-action-plan',
    name: 'Reconciliation Action Plan',
    officer: 'RAP (Reconciliation Action Plan) Officer',
    photo: ['outdoor-discover.jpg', 'Three children exploring a discovery tray on the grass'],
    summary: 'Authentic, respectful engagement with Aboriginal and Torres Strait Islander cultures every week.',
    body: [
      'Our RAP Officer leads authentic, respectful engagement with Aboriginal and Torres Strait Islander cultures, stories, languages, and connections to Country every week.',
      'This work sits alongside our daily Acknowledgement of Country, Dreaming stories, NAIDOC Week, and National Reconciliation Week.',
    ],
  },
  {
    slug: 'cultural-linguistic-diversity',
    name: 'Cultural & Linguistic Diversity',
    officer: 'CALD (Culturally & Linguistically Diverse) Officer',
    photo: ['home-corner-story.jpg', 'An educator reading a picture book to children'],
    summary: 'Celebrating the rich multicultural heritage of our families and local communities.',
    body: [
      'Our CALD Officer celebrates the rich multicultural heritage of our families and local Western Australian communities, ensuring every child sees their culture, home language, and traditions valued.',
      'Playful language classes and family traditions shared in our rooms spark cognitive flexibility, cultural curiosity, and respect for our diverse world.',
    ],
  },
  {
    slug: 'sustainability',
    name: 'Sustainability',
    officer: 'Sustainability Officer',
    photo: ['water-pouring.jpg', 'Children pouring water at the outdoor kitchen'],
    summary: 'Worm farming, composting, conservation and hands-on care for our edible gardens.',
    body: [
      'Our Sustainability Officer inspires environmental stewardship through worm farming, composting, water and energy conservation, recycling, and hands-on care for our edible gardens.',
      'Through seed-to-plate experiences, children help plant, water, and harvest herbs and produce, discovering where real food comes from and developing genuine pride in caring for our environment.',
    ],
  },
];

export const squadTopicBySlug = (slug: string) => SQUAD_TOPICS.find((t) => t.slug === slug);
