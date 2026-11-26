import { Cols, CtaStrip, InnerSplit, Panel, Rows } from "@/components/Blocks";
import JsonLd from "@/components/JsonLd";
import { PageHero, Section, SectionHead } from "@/components/Sections";
import { breadcrumbLd, pageMetadata, type Crumb } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "A Day at Mirabilia: Daily Rhythm & Mealtimes",
  description: "A predictable yet flexible daily rhythm, chef-prepared family-style meals, and Storypark updates from your child’s day at Mirabilia Early Learning.",
  path: "/a-day-at-mirabilia",
  image: "water-pouring.jpg",
});

const CRUMBS: Crumb[] = [["Curriculum & Programs", "/our-curriculum"], ["A Day at Mirabilia", "/a-day-at-mirabilia"]];

const RHYTHM: [string, [string, string][]][] = [
  ["Morning arrival & warm welcomes", [
    ["Settling in", "Educators greet every child and family by name at the door, connecting with you about your child’s morning, sleep, and home news."],
    ["Self-directed discovery", "Children transition gently into calm, inviting indoor learning zones: building with blocks, exploring sensory trays, sharing books, or continuing yesterday’s emergent inquiry projects."],
  ]],
  ["Morning gathering & Acknowledgement of Country", [
    ["Coming together", "Rooms gather for a joyful, age-appropriate morning yarning circle featuring our daily Acknowledgement of Country, songs, storytelling, and intentional conversations around our monthly CIRCLE character trait."],
    ["Progressive morning tea", "Children wash their hands and enjoy a nutritious, freshly prepared morning tea together, practising self-help skills, social conversation, and healthy eating habits."],
  ]],
  ["Uninterrupted play, outdoor exploration & intentional learning", [
    ["Indoor–outdoor flow", "Weather permitting, children move freely between indoor studios and nature-rich outdoor play spaces: digging, climbing, gardening, balancing, and collaborating with friends."],
    ["Emergent small-group projects", "Guided by children’s real-time interests, educators scaffold hands-on literacy, numeracy, STEM, physical literacy, and creative arts experiences, while Nursery babies follow their own individual sleep, bottle, and sensory play rhythms."],
  ]],
  ["Nourishing lunch & mindful rest", [
    ["Shared family-style lunch", "Educators sit alongside children during wholesome, chef-prepared lunches, modelling gratitude, conversation, and respect for individual appetites and dietary needs."],
    ["Rest, sleep & quiet recharge", "Following lunch, younger children settle into peaceful, monitored sleep rooms with familiar comfort items, while older children enjoy quiet rest, mindfulness, yoga, or calm independent reading."],
  ]],
  ["Afternoon adventures & calm farewells", [
    ["Afternoon tea & re-engagement", "After waking and enjoying a healthy afternoon snack, children dive back into open-ended play, music, construction, or outdoor games."],
    ["Partnering at pick-up", "As families arrive, educators share warm verbal handovers alongside secure daily updates, celebrating the friendships, discoveries, and small acts of kindness that shaped your child’s day."],
  ]],
];

export default function DayPage() {
  return (
    <>
      <PageHero
        crumbs={CRUMBS}
        title="A gentle, responsive rhythm"
        lead="We follow a predictable yet flexible daily rhythm rather than a rigid timetable. A familiar flow helps children feel emotionally secure and confident, while leaving plenty of unhurried space for deep play, individual sleep and feeding cues, and spontaneous curiosity."
        tint="yellow"
        photo={["snack-time.jpg", "A girl enjoying a snack at the table"]}
        photo2={["cooking-toddler.jpg", "A toddler mixing ingredients in a bowl"]}
        shapes={[0, "yellow", "pink"]}
      />

      <Section>
        <Rows items={RHYTHM.map(([title, items]) => [title, <ul className="ticks" key={title}>{items.map(([t, d]) => <li key={t}><strong>{t}:</strong> {d}</li>)}</ul>])} />
        <div className="mt-l">
          <Panel meta="A note for Nursery families" title="Your baby’s routine comes first" color="lime">
            <p>For our youngest learners (0–2 years), your baby’s unique home routine always comes first. Feeds, bottles, cuddles, and sleeps happen whenever your child needs them, supported by dedicated primary educators.</p>
          </Panel>
        </div>
      </Section>

      <Section bg="butter" id="mealtime">
        <InnerSplit photo={["water-pouring.jpg", "Children pouring water into a pot at the outdoor kitchen"]} title="Nourishing growing bodies & minds" mask="mask-blob">
          <p>At Mirabilia, mealtimes are about far more than healthy food. They are joyful moments of connection, independence, and belonging. Guided by our CIRCLE values, we turn every meal into a warm, unhurried social experience that builds positive lifelong relationships with food.</p>
        </InnerSplit>
        <div className="mt-l">
          <Cols>
            <Panel title="Fresh, balanced meals made with care"><p>Our seasonal menus are crafted in alignment with the Australian Dietary Guidelines and Get Up &amp; Grow nutrition standards. Colourful fresh fruit and vegetables, whole grains, lean proteins, and nourishing snacks, without added sugars or unnecessary processed ingredients.</p></Panel>
            <Panel title="Family-style dining & self-help skills"><p>Educators sit alongside children during meals, modelling table manners, gratitude, and relaxed conversation. Children are gently encouraged to serve themselves, pour their own water, and listen to their body’s hunger and fullness cues.</p></Panel>
            <Panel title="Strict allergy & dietary safety"><p>All Mirabilia centres operate as allergy-aware environments with rigorous colour-coded meal protocols, documented medical management plans, and continuous educator training in anaphylaxis and food-safety management. We gladly cater to medical allergies, intolerances, and cultural or religious dietary requirements.</p></Panel>
            <Panel title="Seed-to-plate sustainability"><p>Through our outdoor veggie gardens and sustainability experiences, children help plant, water, and harvest herbs and produce, discovering where real food comes from and developing genuine pride in caring for our environment.</p></Panel>
          </Cols>
        </div>
      </Section>

      {/* Storypark placement is not final (brief §10). It also appears on Inclusive Care. */}
      <Section id="storypark">
        <SectionHead title="Stay connected with Storypark" lead="Your child’s day doesn’t have to be a mystery. Through Storypark, our secure family communication platform, you’ll receive updates, photos and learning stories that capture their discoveries and milestones. It’s a window into their world, and a simple way to share in their learning journey wherever you are." />
        <CtaStrip text="Come and see a day at Mirabilia for yourself." cta={["/book-a-tour", "Book a Tour"]} />
      </Section>
      <JsonLd data={breadcrumbLd(CRUMBS)} />
    </>
  );
}
