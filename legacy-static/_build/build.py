"""Static site generator for the Mirabilia redesign.

Run:  python _build/build.py
Writes every page as plain HTML into the project root. Content (copy, photos,
videos) comes from mirabilia.com.au; layout follows meplace.co.
"""
import math
import os
from html import escape

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

PURPLE, ORANGE, LIME, BLUE, PINK = "#812990", "#ed5e26", "#acd03b", "#2484c5", "#c8225c"
INK, DEEP = "#2b1f2d", "#4a1752"


def img(name):
    return f"assets/img/{name}"


# --------------------------------------------------------------------------
# Shapes (flat geometric marks in the reference style)
# --------------------------------------------------------------------------
def svg(view, inner):
    return f'<svg viewBox="{view}" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">{inner}</svg>'


def s_tri(c):
    return svg("0 0 300 112", f'<g fill="{c}"><circle cx="56" cy="56" r="56"/><circle cx="150" cy="56" r="56"/><circle cx="244" cy="56" r="56"/></g>')


def s_scallop(c, n=12, depth=0.16):
    R, cx = 50, 60
    pts = []
    for k in range(n + 1):
        a = 2 * math.pi * k / n
        pts.append((cx + R * math.cos(a), cx + R * math.sin(a)))
    d = f"M{pts[0][0]:.2f} {pts[0][1]:.2f}"
    for k in range(n):
        a = 2 * math.pi * (k + 0.5) / n
        r = R * (1 + depth * 2.2)
        d += f" Q{cx + r * math.cos(a):.2f} {cx + r * math.sin(a):.2f} {pts[k + 1][0]:.2f} {pts[k + 1][1]:.2f}"
    return svg("0 0 120 120", f'<path d="{d}Z" fill="{c}"/>')


def s_half(c, rot=0):
    return svg("0 0 200 200", f'<path transform="rotate({rot} 100 100)" d="M0 100 A100 100 0 0 0 200 100 Z" fill="{c}"/>')


def s_pill(c):
    return svg("0 0 200 76", f'<rect width="200" height="76" rx="38" fill="{c}"/>')


def s_dot(c):
    return svg("0 0 40 40", f'<circle cx="20" cy="20" r="20" fill="{c}"/>')


def s_loop(c=INK, w=3):
    return svg("0 0 130 100", f'<path d="M4 74 C34 76 72 64 84 38 C94 14 70 2 58 18 C44 36 68 70 126 40" stroke="{c}" stroke-width="{w}" stroke-linecap="round"/>')


def s_slash(c=INK, n=3, w=3):
    lines = "".join(f'<path d="M{8 + i * 22} 70 L{40 + i * 22} 8" stroke="{c}" stroke-width="{w}" stroke-linecap="round"/>' for i in range(n))
    return svg(f"0 0 {50 + n * 22} 78", lines)


def s_leaf(c):
    return svg("0 0 120 100", f'<path d="M6 94 C6 40 46 6 114 6 C114 60 74 94 6 94 Z" fill="{c}"/>')


def s_ring(c, w=10):
    return svg("0 0 120 120", f'<circle cx="60" cy="60" r="{55 - w / 2}" stroke="{c}" stroke-width="{w}"/>')


def s_squiggle(c=INK, w=3):
    return svg("0 0 200 40", f'<path d="M4 20 Q 24 2 44 20 T 84 20 T 124 20 T 164 20 T 196 20" stroke="{c}" stroke-width="{w}" stroke-linecap="round"/>')


def shape(markup, cls, anim=""):
    return f'<div class="shape {cls} {anim}">{markup}</div>'


# small flat illustrations, built only from the shapes above
def ill(kind):
    k = kind % 8
    if k == 0:   # message bubble with tick
        inner = (f'<rect x="8" y="26" width="104" height="44" rx="22" fill="{PURPLE}"/>'
                 f'<circle cx="32" cy="48" r="13" fill="{LIME}"/><path d="M26 48l5 5 9-10" stroke="{INK}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>'
                 f'<rect x="54" y="40" width="44" height="6" rx="3" fill="#f6d3df"/><rect x="54" y="52" width="28" height="6" rx="3" fill="#f6d3df"/>')
    elif k == 1:  # three friends
        inner = (f'<circle cx="30" cy="30" r="12" fill="{ORANGE}"/><rect x="14" y="46" width="32" height="44" rx="16" fill="{ORANGE}"/>'
                 f'<circle cx="60" cy="22" r="13" fill="{BLUE}"/><rect x="43" y="39" width="34" height="51" rx="17" fill="{BLUE}"/>'
                 f'<circle cx="90" cy="30" r="12" fill="{PURPLE}"/><rect x="74" y="46" width="32" height="44" rx="16" fill="{PURPLE}"/>')
    elif k == 2:  # screen with person
        inner = (f'<rect x="10" y="18" width="100" height="64" rx="10" fill="{LIME}"/>'
                 f'<circle cx="64" cy="44" r="12" fill="{BLUE}"/><path d="M40 82a24 24 0 0 1 48 0z" fill="{BLUE}"/>'
                 f'<rect x="18" y="28" width="12" height="12" rx="3" fill="#fff"/><rect x="18" y="44" width="12" height="12" rx="3" fill="#fff"/>')
    elif k == 3:  # tablet with blocks
        inner = (f'<rect x="34" y="6" width="52" height="86" rx="8" fill="{DEEP}"/>'
                 f'<rect x="42" y="16" width="20" height="10" rx="3" fill="{PINK}"/><rect x="42" y="32" width="36" height="24" rx="4" fill="{BLUE}"/>'
                 f'<rect x="42" y="62" width="36" height="8" rx="3" fill="{ORANGE}"/><rect x="42" y="74" width="24" height="8" rx="3" fill="{LIME}"/>')
    elif k == 4:  # heart from shapes
        inner = (f'<g transform="translate(60 54) rotate(45)"><rect x="-26" y="-26" width="52" height="52" fill="{PINK}"/>'
                 f'<circle cx="-26" cy="0" r="26" fill="{PINK}"/><circle cx="0" cy="-26" r="26" fill="{PINK}"/></g>'
                 f'<circle cx="94" cy="18" r="8" fill="{LIME}"/>')
    elif k == 5:  # sun / flower
        inner = s_scallop(ORANGE, 10).split(">", 1)[1].rsplit("</svg>", 1)[0].replace('d="M', 'transform="translate(0 -12) scale(.9) translate(7 4)" d="M') + f'<circle cx="60" cy="47" r="16" fill="{LIME}"/>'
    elif k == 6:  # ball and cones
        inner = (f'<circle cx="44" cy="52" r="34" fill="{BLUE}"/><path d="M14 40c20 8 40 8 60 0M14 64c20-8 40-8 60 0" stroke="#fff" stroke-width="3"/>'
                 f'<path d="M92 86l12-40 12 40z" fill="{ORANGE}"/><rect x="88" y="84" width="32" height="6" rx="3" fill="{ORANGE}"/>')
    else:         # music notes
        inner = (f'<circle cx="36" cy="74" r="14" fill="{PURPLE}"/><rect x="46" y="18" width="6" height="58" rx="3" fill="{PURPLE}"/>'
                 f'<circle cx="84" cy="66" r="14" fill="{PINK}"/><rect x="94" y="10" width="6" height="58" rx="3" fill="{PINK}"/>'
                 f'<rect x="46" y="10" width="54" height="12" rx="6" fill="{LIME}"/>')
    return svg("0 0 120 96", inner)


ARROW_R = '<svg viewBox="0 0 36 10" aria-hidden="true"><path d="M0 5h34M30 1l4 4-4 4" stroke="currentColor" fill="none"/></svg>'
ARROW_L = '<svg viewBox="0 0 36 10" aria-hidden="true"><path d="M36 5H2M6 1L2 5l4 4" stroke="currentColor" fill="none"/></svg>'
ARROW_U = '<svg viewBox="0 0 10 36" aria-hidden="true"><path d="M5 36V2M1 6l4-4 4 4" stroke="currentColor" fill="none"/></svg>'
ARROW_D = '<svg viewBox="0 0 10 36" aria-hidden="true"><path d="M5 0v34M1 30l4 4 4-4" stroke="currentColor" fill="none"/></svg>'
CHEV = '<svg class="chev" viewBox="0 0 10 6" aria-hidden="true"><path d="M1 1l4 4 4-4" stroke="currentColor" fill="none" stroke-width="1.5"/></svg>'

# --------------------------------------------------------------------------
# Data
# --------------------------------------------------------------------------
PHONE, PHONE_HREF, EMAIL = "(08) 6115 0123", "tel:+61861150123", "info@mirabilia.com.au"
HOURS = "We are open from 6:30am to 6:30pm"

NAV = [
    ("About Us", "about-us.html", [("About Us", "about-us.html"), ("Our Philosophy", "our-philosophy.html"), ("Our Curriculum", "our-curriculum.html"), ("Our Family", "our-family.html")]),
    ("Centres", "centres.html", [("Mirabilia Caversham", "caversham.html"), ("Mirabilia Byford", "byford.html"), ("Mirabilia Citiplace", "citiplace.html"), ("Mirabilia Champion Lakes", "champion-lakes.html"), ("View All", "centres.html")]),
    ("Our Programs", "squad-programs.html", [("Cooking Class", "cooking-class.html"), ("Happy Feet", "happy-feet.html"), ("Music Class", "music-class.html"), ("Sports Class", "sports-class.html"), ("Elderly Visit", "elderly-visit.html"), ("View all", "squad-programs.html")]),
    ("Info For Families", "ccs-information.html", [("Childcare Subsidy", "childcare-subsidy.html"), ("CCS Information", "ccs-information.html")]),
    ("Careers", "careers.html", None),
]

CENTRES = {
    "caversham": dict(name="Caversham", addr="1 Mavro Street, Caversham WA 6055", cover="66deb6c484ef29e8a4ee68f0.jpg",
                      gallery=["66debac9ab806ea6123cb6d6.jpg", "66deb6c484ef29e8a4ee68f0.jpg", "66debac906b0252f6e13d7b7.jpg", "66debac9f10da4ec0ceed828.jpg", "66debac9ab806e4d963cb6d5.jpg"],
                      map="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3388.431022637997!2d115.980545!3d-31.867694800000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2a32b7139a0d2aff%3A0xbd9c85f490197e7b!2sMirabilia%20Early%20Learning%20Education%20Centre%20and%20Kindergarten%20Caversham!5e0!3m2!1sen!2sau!4v1727752964562!5m2!1sen!2sau",
                      programs=["cooking", "happy", "music", "elderly"], director="jaclyn", bg="var(--lime)", badge=None),
    "byford": dict(name="Byford", addr="2 Walters Road, Byford WA 6122", cover="66deb6475c87e77830272b77.jpg",
                   gallery=["66debac984ef293a48ee6d32.jpg", "66deb6475c87e77830272b77.jpg", "66debac984ef298cf6ee6d31.jpg", "66debac984ef2928e5ee6d33.jpg", "66debac906b02585bc13d7b8.jpg"],
                   map="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3375.687798050063!2d116.0075497772314!3d-32.21264223519782!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2a3293100d09ae33%3A0x627585f7f505c4b7!2sMirabilia%20Early%20Learning%20Education%20Centre%20and%20Kindergarten%20Byford!5e0!3m2!1sen!2sau!4v1727753042227!5m2!1sen!2sau",
                   programs=["cooking", "happy", "sports"], director="naomi", bg="var(--sky)", badge=None),
    "citiplace": dict(name="Citiplace", addr="16/378 Wellington Street, WA 6000", cover="66deb1f1ab806e291e3ca743.jpg",
                      gallery=["66debac984ef2905bfee6d34.jpg", "66deb1f1ab806e291e3ca743.jpg", "66debac906b02540a213d7b9.jpg", "66debac9766f98478a371ff2.jpg", "66debac984ef292014ee6d30.jpg"],
                      map="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d216354.25389442145!2d115.77099551729555!3d-32.08181757678285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2a32bad6e63ad429%3A0x21098788bec3101a!2sMirabilia%20Early%20Learning%20Education%20Centre%20%26%20Kindergarten%20Citiplace!5e0!3m2!1sen!2sau!4v1727753108183!5m2!1sen!2sau",
                      programs=["cooking"], director="abbie", bg="var(--peach)", badge=None),
    "champion-lakes": dict(name="Champion Lakes", addr="4 McNeill Road, Champion Lakes, WA 6111", cover="6940a84696e753419cee702a.jpg",
                           gallery=["6940a84696e753419cee702a.jpg", "6940a845ab2594b8aa28786c.jpg", "6940a84596e3f260bded2627.jpg", "6940a845f4c8e9580865179c.jpg", "6940a84596e3f28e26ed2622.jpg"],
                           map="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3378.7405694590425!2d115.98273979999999!3d-32.1303079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2a32947aaee090b7%3A0x794534e764cc2ad8!2s4%20McNeill%20Rd%2C%20Champion%20Lakes%20WA%206111!5e0!3m2!1sen!2sau!4v1765862259359!5m2!1sen!2sau",
                           programs=["cooking", "happy", "music", "elderly"], director="clarissa", bg="var(--rose)", badge="New Centre"),
}

PROGRAMS = {
    "cooking": dict(name="Cooking Class", href="cooking-class.html", img="66f50bae9fb6e5a00ffe892b.jpg",
                    short=["We understand that early learning goes beyond academics—it's also about fostering creativity, independence, and a love for new experiences. Our Cooking Classes are designed to provide a fun, educational, and hands-on culinary experience for young learners. With a focus on creativity, safety, and skill-building, our classes make cooking an engaging activity that kids will look forward to.",
                           "Our cooking classes are a wonderful opportunity for children to interact with their peers in a collaborative setting. Through group activities, teamwork, and sharing, kids learn important social skills and build friendships while enjoying the cooking process."]),
    "happy": dict(name="Happy Feet", href="happy-feet.html", img="66f50ed5f0f224a4a22bdbd2.jpg",
                  short=["Our class is designed to promote physical activity and improve coordination. Through lively dance routines, rhythmic exercises, and movement games, children enhance their motor skills and balance while having a blast. These activities support their overall physical development and help them become more aware of their bodies in space. Additionally, group activities encourage social interaction, teamwork, and communication, helping children build strong social skills and make new friends."]),
    "music": dict(name="Music Class", href="music-class.html", img="66f50aadb3c24ecef0e32fa9.jpg",
                  short=["Our Music Classes are designed to nurture your child’s love for music while enhancing their cognitive, social, and emotional skills. Through engaging activities, playful learning, and musical exploration, we provide a rich and stimulating environment where young learners can thrive.",
                         "Through group activities and collaborative musical projects, children learn to work together, share, and communicate. Our classes provide a supportive environment where kids can develop social skills, empathy, and emotional intelligence while enjoying the joy of making music with others."]),
    "sports": dict(name="Sports Class", href="sports-class.html", img="66f50df3b3c24e4596e331b9.jpg",
                   short=["At Mirabilia Early Learning Education Byford Centre, our Sports Class is designed to keep young children active and engaged while fostering their physical development. Through fun and age-appropriate activities, we encourage children to build coordination, strength, and teamwork skills.",
                          "Our passionate educators create a supportive environment where children can explore various sports and movement exercises, helping them develop a love for physical activity. By integrating play with structured sports activities, we ensure that each child enjoys the benefits of exercise while learning important life skills like cooperation and perseverance."]),
    "elderly": dict(name="Elderly Visit", href="elderly-visit.html", img="66fa3f94e6ea34e00b9178d0.jpg",
                    short=["Our program provides young children with the opportunity to interact with elderly individuals, gaining valuable life lessons, storytelling experiences, and a greater appreciation for different generations. These interactions help children develop empathy, respect, and social skills.",
                           "We believe in the power of connection. Our visits are designed to be heartwarming and enjoyable for both children and elderly visitors. Through activities like reading stories, sharing crafts, or simply talking, we create joyful moments and lasting memories."]),
}
PROGRAM_ORDER = ["cooking", "music", "sports", "happy", "elderly"]

CLARISSA_QUOTE = ["As an Approved Provider, my focus is supporting the Directors, the services and the team as a community. As an early child hood educator I pride myself on providing quality care. I believe a stimulating and creative environment encourages children to feel safe, express themselves and extend on their current skills/ knowledge.",
                  "I lead by example, helping co-workers to enhance their learning and understanding of child care. I believe it takes a village to raise a child- home, child care, families and friends. Together we can support and nurture a child’s individual needs and ensure they have the best start in life."]

TEAM = {
    "clarissa": dict(name="Clarissa De Fretes", role="Approved Provider", where="Mirabilia Education", img="6a192a5fff82912d658feead.jpg",
                     title="Approved Provider at Mirabilia Education", quote=CLARISSA_QUOTE),
    "jaclyn": dict(name="Jaclyn Pereira", role="Centre Director", where="Mirabilia Caversham", img="66deb29c06b025296313cd84.jpg",
                   title="Centre Director at Mirabilia Caversham",
                   quote=["I believe that as an early childhood educator I am responsible for providing young children with positive learning experiences. I strive to model respect, patience and care for children and adults I come in contact with.",
                          "Children have the right to have their needs met and receive the proper education while in our care."]),
    "abbie": dict(name="Abbie Wray", role="Centre Director", where="Mirabilia Citiplace", img="67bd546a289c5315549674bc.jpg",
                  title="Centre Director at Mirabilia Citiplace",
                  quote=["I have developed an interest in Early Childhood as I come from a large family in Ireland. As the oldest sibling, I have developed a nurturing approach towards children. As the director of Mirabilia Citiplace it is my mission to ensure each and every child in our care has the most positive, happy experience of growth through learning and playing in each of the days they spend here with us.",
                         "I aim to provide a safe, positive and nurturing environment for children to explore, discover, create and imagine. My goal as the centre director is to create ‘A home away from home’ for children, staff and families at Mirabilia. I believe that children are unique individuals, it is important in their younger years for them to have a sense of belonging in their care place.",
                         "I thrive in helping my staff, supporting them and empowering them. “Together we can do so much”."]),
    "naomi": dict(name="Naomi Holly", role="Centre Director", where="Mirabilia Byford", img="66deb29c84ef29ee04ee6036.jpg",
                  title="Centre Director at Mirabilia Byford",
                  quote=["I believe that each child is an individual and as an educator, I will value and facilitate the development of each child's strengths, interests, skills, abilities and knowledge to extend their learning. I believe that children learn through play and I endeavor to provide opportunities for children to explore, create, discover and imagine.",
                         "Children need reassurance of being loved and cared for while they are enjoying an educational environment, so I will commit to provide a home-like environment that promotes this; further developing trusting and reciprocal relationships with them and their families."]),
}
TEAM_ORDER = ["clarissa", "jaclyn", "abbie", "naomi"]

QUOTES = [
    ("The staff here are absolutely amazing! I’ve never felt this way at other centers before. The teachers here genuinely care about and support the children, and it shows. My child has learned so much since being here. It’s truly an outstanding center!", "Gigi, Parent"),
    ("We are super happy with our service at Mirabilia byford Our kids have been attending here now for just over 1 year and they are so content and settled here. Great relationships with educators and so much one on one attention is able to be given with smaller groups 😊 It is smaller numbers than our last service and the difference is noticeable in our kids ❤️ Also, the grounds and premises are as beautiful and new and clean as the day they opened! Fantastic service 👌🏻 Great work and thank you Mirabilia team 🤩", "Claire, Parent"),
    ("I highly recommend this centre. My daughter has developed a lot after joining here. Special thanks to all the staff and educators.", "Sudarmani, Parent"),
    ("We absolutely loved this centre and the staff here. The staff connect and bond so well with the kids and parents. They always took such good care of our boys. Cannot fault the staff here", "Denisa, Parent"),
    ("The Byford Centre is wonderful!! The educators are wonderful with our children, we are never concerned and as our first daycare experience they have made it truly wonderful. Our children have thrived there and come home tired from a fun day of learning through play", "Shasta, Parent"),
    ("My son loves his daycare! The Educators really go above and beyond", "Morwenna, Parent"),
]

PROMO_TICKER = ["Get 25% Off Your First Month", "New Enrolments Only", "Offer Ends 31 December 2026", "Enrol at Any of Our Locations", "New Champion Lakes Centre Included"]

# --------------------------------------------------------------------------
# Layout pieces
# --------------------------------------------------------------------------
def header(active):
    items = []
    for label, href, sub in NAV:
        cur = ' aria-current="page"' if active == href else ""
        if sub:
            links = "".join(f'<li><a href="{h}">{escape(t)}</a></li>' for t, h in sub)
            items.append(f'<li class="nav__item"><a class="nav__link" href="{href}"{cur} aria-haspopup="true">{label}{CHEV}</a><ul class="dropdown">{links}</ul></li>')
        else:
            items.append(f'<li class="nav__item"><a class="nav__link" href="{href}"{cur}>{label}</a></li>')
    mob = []
    for label, href, sub in NAV:
        if sub:
            links = "".join(f'<a href="{h}">{escape(t)}</a>' for t, h in sub)
            mob.append(f'<details><summary>{label}</summary><div>{links}</div></details>')
        else:
            mob.append(f'<a href="{href}">{label}</a>')
    return f'''<a class="skip" href="#main">Skip to content</a>
<header class="header">
  <div class="nav">
    <a class="nav__logo" href="index.html" aria-label="Mirabilia home"><img src="{img('1bb5b70a-8883-458d-af06-8ca290171f9a.png')}" alt="Mirabilia" width="148" height="35"></a>
    <nav aria-label="Main"><ul class="nav__menu">{"".join(items)}</ul></nav>
    <div class="nav__cta">
      <a class="btn btn--fill" href="enquire-now.html">Enquire Now</a>
      <button class="menu-toggle" type="button" data-menu-open aria-controls="mnav" aria-expanded="false">Menu</button>
    </div>
  </div>
</header>
<div class="mnav" id="mnav" aria-hidden="true">
  <div class="mnav__top">
    <a href="index.html"><img src="{img('1bb5b70a-8883-458d-af06-8ca290171f9a.png')}" alt="Mirabilia" width="136" height="32"></a>
    <button class="menu-toggle" style="display:inline-flex" type="button" data-menu-close>Close</button>
  </div>
  <nav aria-label="Mobile">{"".join(mob)}</nav>
  <div class="btns"><a class="btn btn--fill" href="book-a-tour.html">Book a Tour</a><a class="btn" href="enquire-now.html">Enquire Now</a></div>
</div>'''


def ack():
    return f'''<section class="ack section--tight section" aria-labelledby="ack-h">
  <div class="wrap ack__grid">
    <img src="{img('66f23e62c5d54a747a24c5a9.jpg')}" alt="Kangaroo silhouetted against a West Australian sunset" loading="lazy">
    <div>
      <span class="eyebrow" id="ack-h">Acknowledgement of Country</span>
      <p>Mirabilia acknowledges the traditional owners of all lands across Australia. We recognise and celebrate the contributions of Aboriginal and Torres Strait Islander people as the First Australians, including their role in the education and care of children. We acknowledge and pay our respects to the Elders of the past, present and emerging. We thank you for sharing and caring for the land we learn and play on. We endeavour to continue to respect, share and care for this beautiful land.</p>
    </div>
  </div>
</section>'''


def footer():
    locs = "".join(f'<li><a href="{k}.html">Mirabilia {c["name"]}</a><address>{c["addr"]}</address></li>' for k, c in CENTRES.items())
    return f'''<footer class="footer">
  {shape(s_scallop(ORANGE, 12), "s-f1", "spin")}
  <div class="wrap">
    <div class="footer__top">
      <div class="footer__brand">
        <img src="{img('669f32d7fe542b122e558ba9.png')}" alt="Mirabilia Early Learning Education Centre &amp; Kindergarten" width="220" height="96" loading="lazy">
        <p>Early Learning Education Centre and Kindergarten in Perth</p>
        <div class="btns"><a class="btn btn--white" href="book-a-tour.html">Book a Tour</a><a class="btn btn--ghost-light" href="enquire-now.html">Enquire Now</a></div>
      </div>
      <div>
        <h4>Company</h4>
        <ul><li><a href="about-us.html">About Us</a></li><li><a href="our-philosophy.html">Our Philosophy</a></li><li><a href="our-curriculum.html">Our Curriculum</a></li><li><a href="our-family.html">Our Family</a></li><li><a href="careers.html">Careers</a></li></ul>
      </div>
      <div>
        <h4>Programs</h4>
        <ul><li><a href="cooking-class.html">Cooking Class</a></li><li><a href="music-class.html">Music Class</a></li><li><a href="sports-class.html">Sports Class</a></li><li><a href="happy-feet.html">Happy Feet</a></li><li><a href="elderly-visit.html">Elderly Visit</a></li></ul>
        <h4 style="margin-top:32px">Contact us</h4>
        <ul><li><a href="mailto:{EMAIL}">{EMAIL}</a></li><li><a href="{PHONE_HREF}">{PHONE}</a></li></ul>
      </div>
      <div>
        <h4>Locations</h4>
        <ul class="footer__loc">{locs}</ul>
      </div>
    </div>
    <div class="footer__word" aria-hidden="true">mirabilia</div>
    <div class="footer__bottom"><span>© 2025 Cherub and Co | Mirabilia | <a href="#">Privacy Policy</a></span><span>Caversham · Byford · Citiplace · Champion Lakes</span></div>
  </div>
</footer>'''


def page(filename, title, desc, body, active=None):
    html = f'''<!doctype html>
<html lang="en-AU">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{escape(title)}</title>
<meta name="description" content="{escape(desc)}">
<meta name="theme-color" content="#acd03b">
<link rel="icon" href="{img('66b4bd275efd041bfa828e09.png')}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
{header(active or filename)}
<main id="main">
{body}
</main>
{ack()}
{footer()}
<script src="assets/js/main.js" defer></script>
</body>
</html>
'''
    with open(os.path.join(ROOT, filename), "w", encoding="utf-8", newline="\n") as f:
        f.write(html)
    print("wrote", filename)


# --------------------------------------------------------------------------
# Reusable sections
# --------------------------------------------------------------------------
def marquee(items, cls="", href="promotion.html"):
    run = "".join(f"<span>{escape(t)} •</span>" for t in items)
    return f'<a class="marquee {cls}" href="{href}" aria-label="{escape(" • ".join(items))}"><div class="marquee__track" aria-hidden="true">{run * 4}{run * 4}</div></a>'


def promo_strip():
    return '''<div class="promo"><div class="wrap"><p><strong>Struggling to find quality childcare that fits your budget?</strong> Enrol now at Mirabilia, including our new Champion Lakes centre and save 25%!</p><a class="btn btn--white" href="promotion.html">Secure Your Spot Today</a></div></div>'''


PHERO_SHAPES = [
    lambda a, b: shape(s_tri(a), "s-a", "float--slow float") + shape(s_scallop(b), "s-b", "spin") + shape(s_dot(INK), "s-c") + shape(s_loop(), "s-d"),
    lambda a, b: shape(s_scallop(a, 10), "s-a", "spin") + shape(s_half(b, 180), "s-b") + shape(s_slash(), "s-c") + shape(s_pill(b), "s-d", "float"),
    lambda a, b: shape(s_half(a, 90), "s-a") + shape(s_leaf(b), "s-b", "float") + shape(s_dot(INK), "s-c") + shape(s_slash(), "s-d"),
    lambda a, b: shape(s_leaf(a), "s-a", "float--slow float") + shape(s_tri(b), "s-b") + shape(s_loop(), "s-c") + shape(s_dot(INK), "s-d"),
]


def phero(title, sub=None, text=None, media=None, bg="var(--lime)", variant=0, colors=(PURPLE, ORANGE), dark=False, eyebrow=None, extra=""):
    shapes = PHERO_SHAPES[variant % 4](*colors)
    cls = "phero" + (" phero--dark" if dark else "") + ("" if media else " phero--plain")
    eb = f'<span class="eyebrow">{eyebrow}</span>' if eyebrow else ""
    sub_h = f'<p class="phero__sub">{sub}</p>' if sub else ""
    text_h = f'<div class="phero__text">{text}</div>' if text else ""
    media_h = f'<div class="phero__media"><img src="{img(media)}" alt="" fetchpriority="high"></div>' if media else ""
    if media:
        inner = f'<div class="phero__grid"><div>{eb}<h1 class="display phero__title">{title}</h1>{sub_h}{text_h}{extra}</div>{media_h}</div>'
    else:
        inner = f'{eb}<h1 class="display phero__title">{title}</h1>{sub_h}{text_h}{extra}'
    return f'<section class="{cls}" style="--bg:{bg}">{shapes}<div class="wrap">{inner}</div></section>'


def paras(ps):
    return "".join(f"<p>{p}</p>" for p in ps)


def split(heading, body, image, rev=False, mask="", eyebrow=None, deco="", alt="", level="h2", btns=""):
    eb = f'<span class="eyebrow">{eyebrow}</span>' if eyebrow else ""
    h = f'<{level} class="h2">{heading}</{level}>' if heading else ""
    return f'''<div class="split{' split--rev' if rev else ''} reveal">
  <div class="split__media {mask}">{deco}<img src="{img(image)}" alt="{escape(alt)}" loading="lazy"></div>
  <div>{eb}{h}{body}{btns}</div>
</div>'''


def cta(title, text, btn_label, btn_href, bg="var(--lime)", fg="var(--ink)", btn_cls="btn--fill", second=""):
    return f'''<section class="section--tight section"><div class="wrap">
<div class="cta reveal" style="--c:{bg};--fg:{fg}">
  {shape(s_scallop(PURPLE if bg != "var(--purple)" else LIME), "s1", "spin")}{shape(s_half(BLUE if bg != "var(--blue)" else LIME, 200), "s2")}{shape(s_dot(INK if fg == "var(--ink)" else "#fff"), "s3")}{shape(s_slash(fg if fg.startswith("#") else INK), "s4")}
  <div class="z"><h2>{title}</h2><p>{text}</p><div class="btns center"><a class="btn {btn_cls}" href="{btn_href}">{btn_label}</a>{second}</div></div>
</div></div></section>'''


def testimonials(title="Hear from Our Family", sub="Hear from other happy parents about their experiences with us!"):
    slides = "".join(f'<div class="qslide{" is-active" if i == 0 else ""}"><blockquote>“{escape(q)}”</blockquote><cite>– {escape(a)}</cite></div>' for i, (q, a) in enumerate(QUOTES))
    return f'''<section class="section" aria-labelledby="q-h"><div class="wrap">
<div class="shead shead--center"><span class="eyebrow">What our Mirabilia families are saying</span><h2 class="h2" id="q-h">{title}</h2><p class="muted">{sub}</p></div>
<div class="quotes reveal" data-quotes>
  <div class="quotes__ctrl"><button class="arrow" type="button" data-q="-1" aria-label="Previous testimonial">{ARROW_U}</button><button class="arrow" type="button" data-q="1" aria-label="Next testimonial">{ARROW_D}</button></div>
  <div class="qcard" aria-live="polite"><span class="qcard__count">01/{len(QUOTES):02d}</span><div>{slides}</div></div>
</div></div></section>'''


def team_cards(keys=TEAM_ORDER):
    colors = [("var(--purple)", "#fff"), ("var(--lime)", "var(--ink)"), ("var(--orange)", "#fff"), ("var(--blue)", "#fff")]
    out = []
    for i, k in enumerate(keys):
        t = TEAM[k]
        c, fg = colors[i % 4]
        out.append(f'<article class="tcard reveal" style="--c:{c};--fg:{fg}"><div class="tcard__img"><img src="{img(t["img"])}" alt="{t["name"]}" loading="lazy"></div><div class="tcard__body"><h3>{t["name"]}</h3><p>{t["role"]}</p><p>{t["where"]}</p></div></article>')
    return f'<div class="team">{"".join(out)}</div>'


def director(key, bg=""):
    t = TEAM[key]
    q = "".join(f"<p>{p}</p>" for p in t["quote"])
    return f'''<section class="section {bg}"><div class="wrap director reveal">
  <div class="director__img">{shape(s_scallop(ORANGE, 10), "", "spin")}<img src="{img(t["img"])}" alt="{t["name"]}" loading="lazy"></div>
  <div><span class="eyebrow">Meet the team</span><blockquote>“{q[3:]}</blockquote><cite><b>{t["name"]}</b>{t["title"]}</cite></div>
</div></section>'''.replace('class="shape  spin"', 'class="shape spin" style="width:110px;right:-24px;top:-20px;z-index:2"')


def centre_cards(slider=True, title="Discover Our Centres", sub="Explore our nurturing kindergarten environment, designed to spark curiosity and foster joyful learning experiences for your child."):
    cards = []
    for k, c in CENTRES.items():
        badge = f'<span class="badge">{c["badge"]}</span>' if c["badge"] else ""
        cards.append(f'''<article class="ccard">
  <div class="ccard__img">{badge}<img src="{img(c["cover"])}" alt="Mirabilia {c["name"]}" loading="lazy"></div>
  <h3>{c["name"]}</h3>
  <p>{c["addr"]}</p><p class="muted">{HOURS}</p>
  <div class="btns"><a class="btn" href="{k}.html">Learn More</a><a class="btn" href="book-a-tour.html">Book a Tour</a></div>
</article>''')
    return f'''<section class="section" aria-labelledby="loc-h"><div class="wrap" data-slider>
<div class="shead shead--center"><span class="eyebrow">Our locations</span><h2 class="h2 measure" id="loc-h">{title}</h2><p class="muted">{sub}</p>
<div class="arrows" style="margin-top:28px"><button class="arrow" type="button" data-dir="-1" aria-label="Previous centre">{ARROW_L}</button><button class="arrow" type="button" data-dir="1" aria-label="Next centre">{ARROW_R}</button></div></div>
<div class="track reveal">{"".join(cards)}</div>
<div class="btns center"><a class="btn" href="centres.html">View All Centres</a></div>
</div></section>'''


def video_section(title="Mirabilia Video Tour", both=True):
    v1 = f'<div class="vcard reveal"><video controls preload="none" playsinline poster="{img("f88a61fbf1755622.jpg")}"><source src="assets/video/video-tour.mp4" type="video/mp4"></video><h3>Mirabilia Video Tour</h3></div>'
    v2 = f'<div class="vcard reveal"><video controls preload="none" playsinline poster="{img("6940a84696e753419cee702a.jpg")}"><source src="assets/video/champion-lakes-tour.mp4" type="video/mp4"></video><h3>Mirabilia Champion Lakes Video Tour</h3></div>'
    vids = (v1 + v2) if both is True else (v2 if both == "cl" else v1)
    grid = "videos" if both is True else ""
    return f'''<section class="section band--sand band"><div class="wrap">
<div class="shead"><div><span class="eyebrow">Video tour</span><h2 class="h2">{title}</h2></div><a class="btn" href="centres.html">View All Centres</a></div>
<div class="{grid}" style="{'' if both is True else 'max-width:980px'}">{vids}</div>
</div></section>'''


SELECT_CENTRE = '<option value="" selected disabled>Choose a centre</option><option>Caversham</option><option>Byford</option><option>Citiplace</option><option>Champion Lakes</option>'


def chips(name, options, kind="radio"):
    return '<div class="chips">' + "".join(f'<label class="chip"><input type="{kind}" name="{name}" value="{escape(o)}"><span>{escape(o)}</span></label>' for o in options) + "</div>"


def enquiry_form(fid="enquiry", heading=None, promo=False):
    # NOTE: the live site posts to a GoHighLevel form. Point `action` at that
    # endpoint (or swap this block for the GHL embed) before going live.
    days_field = (f'<div class="field"><label for="{fid}-days">Total Days of Care Per Week <span class="req">*</span></label><select id="{fid}-days" name="days" required><option value="" selected disabled>Select one</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option></select></div>'
                  if promo else
                  f'<div class="field"><label for="{fid}-days">Total Days of Care Per Week <span class="req">*</span></label><input id="{fid}-days" name="days" type="number" min="1" max="5" placeholder="Enter total days of care per week" required></div>')
    referral = "" if promo else f'<div class="field"><label for="{fid}-ref">Centre Referral Source <span class="req">*</span></label><input id="{fid}-ref" name="referral" placeholder="Where did you hear about us?" required></div>'
    head = f'<div class="form__head"><h2 class="h3">{heading}</h2></div>' if heading else ""
    consent = ("I consent to receive SMS notifications, alerts &amp; occasional marketing communication from Mirabilia. Message frequency varies. Message &amp; data rates may apply." if promo else
               "I Consent to Receive SMS Notifications, Alerts &amp; Occasional Marketing Communication from Mirabilia. Message frequency varies. Message &amp; data rates may apply.")
    return f'''<form class="form" id="{fid}" action="#" method="post">
  {head}
  <div class="field"><label for="{fid}-fn">First Name <span class="req">*</span></label><input id="{fid}-fn" name="first_name" autocomplete="given-name" required></div>
  <div class="field"><label for="{fid}-ln">Last Name <span class="req">*</span></label><input id="{fid}-ln" name="last_name" autocomplete="family-name" required></div>
  <div class="field"><label for="{fid}-em">Email <span class="req">*</span></label><input id="{fid}-em" name="email" type="email" autocomplete="email" required></div>
  <div class="field"><label for="{fid}-ph">Phone <span class="req">*</span></label><input id="{fid}-ph" name="phone" type="tel" autocomplete="tel" required></div>
  <div class="field"><label for="{fid}-dob">Date of Birth of Your Child <span class="req">*</span></label><input id="{fid}-dob" name="child_dob" type="date" required></div>
  <div class="field"><label for="{fid}-centre">Select Your Centre <span class="req">*</span></label><select id="{fid}-centre" name="centre" required>{SELECT_CENTRE}</select></div>
  <fieldset class="field field--full"><legend>{"Child's Age Range" if promo else "Age Ranges:"} <span class="req">*</span></legend>{chips("age", ["0-1 years", "1-2 years", "2-3 years", "3-5 years"])}</fieldset>
  <div class="field"><label for="{fid}-date">Required Care Date <span class="req">*</span></label><input id="{fid}-date" name="care_date" type="date" required></div>
  {days_field}
  <fieldset class="field field--full"><legend>Required Care Days <span class="req">*</span> <span class="muted" style="font-weight:400">You can select more than one</span></legend>{chips("care_days", ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], "checkbox")}</fieldset>
  {referral}
  <div class="field field--full"><label for="{fid}-msg">Message</label><textarea id="{fid}-msg" name="message"></textarea></div>
  <label class="check field--full"><input type="checkbox" name="sms_consent">{consent}</label>
  <button class="btn btn--fill" type="submit">Submit</button>
</form>'''


def enquiry_section(title="Have a question? Feel free to reach out!", text="Contact us here and our team will get back to you!", bg="band--sand"):
    return f'''<section class="section band {bg}" id="enquire"><div class="wrap form-wrap">
<div class="rel"><span class="eyebrow">Enquire now</span><h2 class="h2">{title}</h2><p class="lead" style="margin-top:20px">{text}</p>
<p style="margin-top:28px"><a class="link-u" href="{PHONE_HREF}">{PHONE}</a><br><a class="link-u" href="mailto:{EMAIL}">{EMAIL}</a></p>
<div style="width:180px;margin-top:40px">{ill(1)}</div></div>
{enquiry_form()}
</div></section>'''


def features(items, title=None, eyebrow=None, start=0, bg=""):
    cards = "".join(f'<div class="feature reveal"><div class="feature__ill">{ill(start + i)}</div><h3>{t}</h3><p>{d}</p></div>' for i, (t, d) in enumerate(items))
    head = f'<div class="shead shead--center"><span class="eyebrow">{eyebrow or ""}</span><h2 class="h2 measure">{title}</h2></div>' if title else ""
    return f'<section class="section band {bg}"><div class="wrap">{head}<div class="features">{cards}</div></div></section>'


# --------------------------------------------------------------------------
# HOME
# --------------------------------------------------------------------------
def home():
    ethos_cards = [
        ("01", "About Us", "Our vision, mission, and philosophy focus on nurturing creativity, confidence, and independence in every child.", "about-us.html", "392dd682-0655-495c-afa3-3d8187a4c971.jpg", "var(--purple)", "#fff"),
        ("02", "Our Philosophy", "Discover our approach to nurturing each child's growth through play-based learning and holistic development.", "our-philosophy.html", "fc8abdd1-92e1-4a3b-a671-fd5ebe651610.jpg", "var(--orange)", "#fff"),
        ("03", "Our Programs", "From cooking to music and sports, our engaging programs spark curiosity and growth. Find out more below!", "squad-programs.html", "66f50bae9fb6e5a00ffe892b.jpg", "var(--lime)", "var(--ink)"),
        ("04", "Parents Info", "Find all the information you need about CCS Subsidy, enrolments, programs, and how we support your child’s journey.", "ccs-information.html", "66bc08f63fbc1b2fce4fbf42.jpg", "var(--blue)", "#fff"),
    ]
    ethos = "".join(f'''<a class="ecard reveal" href="{h}" style="--c:{c};--fg:{fg}"><div class="ecard__img"><img src="{img(im)}" alt="" loading="lazy"></div>
<div class="ecard__body"><span class="ecard__num">{n}</span><span class="ecard__title">{t}<span aria-hidden="true">↗</span></span><span class="ecard__desc">{d}</span></div></a>''' for n, t, d, h, im, c, fg in ethos_cards)

    ptiles = "".join(f'<a class="ptile reveal" href="{PROGRAMS[k]["href"]}"><div class="ptile__img"><img src="{img(PROGRAMS[k]["img"])}" alt="" loading="lazy"></div><span class="ptile__name">{PROGRAMS[k]["name"]}<span aria-hidden="true">↗</span></span></a>' for k in PROGRAM_ORDER)

    gal = [("66bc08f63fbc1b2fce4fbf42.jpg", "g-big"), ("babypicture2.jpg", "g-circle"), ("66ed214d850c6e4da1abc43f.jpg", "g-tall g-arch"), ("66c4602ee714248f383a2e0b.jpg", ""),
           ("e4ed8682-2a12-4f1a-bbc4-b3df6db8476d.jpg", "g-wide g-pill"), ("669f152253a60326c6f58b86.jpg", "g-wide"), ("66ed214d8a6ce1a886356a38.jpg", ""), ("66f50df3b3c24e1daee331ba.jpg", "g-tall"),
           ("66f50aadb3c24e38afe32fa8.jpg", "g-circle"), ("66f50bae8fdba121efde44d8.jpg", ""), ("669f15225f2569632b33fee9.jpg", "")]
    gallery = "".join(f'<figure class="{c} reveal"><img src="{img(i)}" alt="" loading="lazy"></figure>' for i, c in gal)

    body = f'''
<section class="hero" aria-labelledby="hero-h">
  <div class="hero__inner">
    {shape(s_tri(PURPLE), "s-tri", "float--slow float")}
    {shape(s_scallop(BLUE), "s-flower", "spin")}
    {shape(s_pill(PINK), "s-pill")}
    {shape(s_half(ORANGE, 25), "s-half")}
    {shape(s_dot(INK), "s-dot")}
    {shape(s_loop(), "s-loop")}
    {shape(s_slash(), "s-slash1")}
    {shape(s_slash(INK, 3, 2.5), "s-slash2")}
    <span class="word display w1" aria-hidden="true">learn,</span>
    <span class="word display w2" aria-hidden="true">grow</span>
    <span class="word display w3" aria-hidden="true">&amp; play!</span>
    <div class="hero__ph p1"><img src="{img('668ec01d8e395dddb9dba0ee.jpg')}" alt="Two smiling boys at Mirabilia" fetchpriority="high"></div>
    <div class="hero__ph p2"><img src="{img('668ec01d22549fe2bddb0456.jpg')}" alt=""></div>
    <div class="hero__ph p3"><img src="{img('66ed214df4e006c85b87b09f.jpg')}" alt=""></div>
    <div class="hero__ph p4"><img src="{img('668ec01d22549f290cdb0455.jpg')}" alt=""></div>
    <div class="hero__intro">
      <h1 id="hero-h">Early Learning Education Centre and Kindergarten in Perth</h1>
      <div class="btns"><a class="btn btn--fill" href="book-a-tour.html">Book a Tour Now <span class="arr" aria-hidden="true">→</span></a></div>
    </div>
  </div>
</section>
{marquee(PROMO_TICKER)}

<section class="section" aria-labelledby="who-h">
  <div class="wrap who">
    <div class="who__media reveal">{shape(s_loop(INK, 2.5), "s-loop")}{shape(s_dot(ORANGE), "s-dot")}<img src="{img('669f15225f25695cc133feea.jpg')}" alt="Mirabilia educators" loading="lazy"></div>
    <div class="reveal">
      <span class="eyebrow">Welcome to Mirabilia!</span>
      <h2 id="who-h">Get in touch and book a tour with one of Perth’s most trusted childcare centres, where innovative education meets a caring, homelike environment.</h2>
      <div class="btns"><a class="btn btn--fill" href="book-a-tour.html">Book a Tour Now</a><a class="btn btn--white" href="centres.html">Choose your nearest Mirabilia centre</a></div>
    </div>
  </div>
</section>

<section class="section--tight section" aria-labelledby="offer-h" style="padding-top:0">
  <div class="wrap">
    <div class="offer reveal">
      <div class="z">
        <span class="eyebrow">Offer Ends December 31st!</span>
        <h2 id="offer-h">Struggling to find quality childcare that fits your budget?</h2>
        <div class="offer__stats">
          <div class="offer__stat"><b>4</b>Get up to 4 free playdates for babies (0-2 years old)</div>
          <div class="offer__stat"><b>25%</b>discount on the first month for new enrolments</div>
        </div>
        <div class="btns"><a class="btn btn--white" href="promotion.html">Secure Your Child's Spot Today</a></div>
      </div>
      <div class="offer__photos">
        <img class="o1" src="{img('babypicture1.jpg')}" alt="" loading="lazy">
        <img class="o2" src="{img('babypicture2.jpg')}" alt="" loading="lazy">
        <img class="o3" src="{img('babypicture3.jpg')}" alt="" loading="lazy">
      </div>
    </div>
  </div>
</section>

{centre_cards()}

<section class="section" aria-labelledby="eth-h" style="padding-top:0">
  <div class="wrap rel">
    {shape(s_tri(LIME), "", "")}
    <div class="shead"><div><span class="eyebrow">Welcome to Mirabilia!</span><h2 class="h2 measure" id="eth-h">Discover what drives us and how we nurture your child's growth. Click below to learn more about who we are and what we do!</h2></div></div>
    <div class="ethos">{ethos}</div>
  </div>
</section>

<section class="section band band--blue" aria-labelledby="sq-h">
  {shape(s_scallop(LIME, 10), "", "spin")}
  <div class="wrap z">
    <span class="eyebrow">Squad Programs</span>
    <h2 class="h2 measure" id="sq-h" style="max-width:860px">Mirabilia’s Squad Programs offer a diverse range of enriching activities designed to inspire, educate, and engage children.</h2>
    <p class="lead measure" style="margin-top:24px;max-width:640px">From cooking and music to sports and community involvement, each program nurtures essential skills, creativity, and social development in a fun, supportive environment.</p>
    <div class="ptiles">{ptiles}</div>
    <div class="btns"><a class="btn btn--white" href="squad-programs.html">Explore</a></div>
  </div>
</section>

{video_section()}

<section class="section" aria-labelledby="gal-h">
  <div class="wrap">
    <div class="shead shead--center"><span class="eyebrow">Gallery</span><h2 class="h2 measure" id="gal-h">Discover moments of joy, learning, and play at Mirabilia.</h2><p class="muted">Explore our vibrant centres and happy faces</p></div>
    <div class="gallery">{gallery}</div>
  </div>
</section>

<section class="section band band--deep" aria-labelledby="fam-h">
  {shape(s_half(ORANGE, 180), "", "")}
  <div class="wrap z">
    <div class="split" style="align-items:start;margin-bottom:clamp(40px,5vw,72px)">
      <div><span class="eyebrow">Our Family</span><h2 class="h2" id="fam-h">At Mirabilia Childcare, our passionate team across Caversham, Byford, and Citiplace locations is dedicated to providing a safe, nurturing, and enriching environment for every child.</h2></div>
      <div><p class="lead">We are excited to announce new Mirabilia centres opening soon, further expanding our commitment to quality care and early education.</p><p>Our educators are united by a shared love for learning, creativity, and community spirit. Interested in joining our growing family? Explore exciting career opportunities with Mirabilia and make a difference in children's lives.</p>
      <div class="btns"><a class="btn btn--white" href="careers.html">Careers</a><a class="btn btn--ghost-light" href="our-family.html">Meet Our Team</a></div></div>
    </div>
    {team_cards()}
  </div>
</section>

{testimonials()}

{cta("Don't Miss Out!", "Give your child the best start and save 25% on childcare at Mirabilia.", "Secure Your Child's Spot Today!", "promotion.html")}
'''
    # place decorative shapes in sections that used an empty class
    body = body.replace('<div class="shape  ">' + s_tri(LIME), '<div class="shape" style="right:2%;top:-60px;width:150px">' + s_tri(LIME), 1)
    body = body.replace('<div class="shape  spin">' + s_scallop(LIME, 10), '<div class="shape spin deco-corner" style="right:-60px;top:-60px;width:260px;opacity:.95">' + s_scallop(LIME, 10), 1)
    body = body.replace('<div class="shape  ">' + s_half(ORANGE, 180), '<div class="shape deco-corner" style="left:-80px;top:-40px;width:240px;opacity:.95">' + s_half(ORANGE, 180), 1)
    page("index.html", "Mirabilia | Early Learning Education Centre and Kindergarten",
         "Get in touch and book a tour with one of Perth’s most trusted childcare centres, where innovative education meets a caring, homelike environment.", body, "index.html")


# --------------------------------------------------------------------------
# ABOUT
# --------------------------------------------------------------------------
def about():
    rows = [
        ("Empowering Children through Play and Learning", "We believe that every child is unique, capable, and brimming with potential. At Mirabilia, we celebrate these qualities by offering opportunities for children to explore, investigate, and discover the world around them through play-based experiences. We prioritise creating a safe and supportive space where children feel valued, have a voice, and are encouraged to express themselves freely. Every learning moment is designed to be enjoyable, fostering a sense of wonder and growth that extends beyond the classroom.", "66ed214d850c6e4da1abc43f.jpg"),
        ("Building Partnerships with Families and Community", "We believe that every child is unique, capable, and brimming with potential. At Mirabilia, we celebrate these qualities by offering opportunities for children to explore, investigate, and discover the world around them through play-based experiences. We prioritise creating a safe and supportive space where children feel valued, have a voice, and are encouraged to express themselves freely. Every learning moment is designed to be enjoyable, fostering a sense of wonder and growth that extends beyond the classroom.", "fc8abdd1-92e1-4a3b-a671-fd5ebe651610.jpg"),
        ("Our Team: Dedicated Educators, Lifelong Learners", "The educators at Mirabilia play an integral role in shaping the environment and experiences we provide. We are proud to have a team of professionals who are passionate, reflective, and dedicated to lifelong learning. They are not just teachers but mentors who work alongside families to guide each child’s development with care, expertise, and an open heart. Our educators are committed to continual growth, staying up-to-date with the best practices in early childhood education to ensure that every child is nurtured to succeed.", "669f15225f25695cc133feea.jpg"),
        ("A Safe and Stimulating Environment", "Mirabilia centres are designed to feel like a second home—a place where children feel safe, secure, and ready to explore. Our play spaces are carefully crafted to stimulate curiosity and creativity while fostering each child’s individual needs and interests. We uphold the highest standards in health, hygiene, nutrition, and safety, ensuring that children can play, learn, and grow in a nurturing environment.", "66debac906b0252f6e13d7b7.jpg"),
        ("Committed to a Sustainable Future", "As part of our commitment to fostering growth not just for our children, but for the community and the environment, we actively encourage sustainability practices. Our aim is to build a better quality of life for current and future generations by teaching children the importance of caring for their surroundings and being responsible members of their community. We believe that by working together, families, educators, and the local community can create a supportive, inclusive environment that values wellness, respect, and positive life experiences.", "66bc08f63fbc1b2fce4fbf42.jpg"),
    ]
    rows_h = "".join(f'<div class="row reveal"><span class="row__num">{i + 1:02d}</span><h3>{t}</h3><p>{d}</p><div class="row__img"><img src="{img(im)}" alt="" loading="lazy"></div></div>' for i, (t, d, im) in enumerate(rows))
    body = f'''{phero("about us", "Our vision, mission, and philosophy focus on nurturing creativity, confidence, and independence in every child.", media="392dd682-0655-495c-afa3-3d8187a4c971.jpg", bg="var(--lilac)", variant=0, colors=(PURPLE, ORANGE))}
<section class="section"><div class="wrap">
  <div class="vm">
    <div class="vm__card reveal" style="--c:var(--lime)"><span class="eyebrow">01</span><h2 class="h2">Our Vision</h2><p>At Mirabilia, our vision is to create a place where every child feels at home—a space where they are encouraged to become resilient future leaders. We partner with families and communities to provide quality early learning experiences, empowering children to thrive and enhance their quality of life.</p>{shape(s_scallop(PURPLE), "", "spin")}</div>
    <div class="vm__card reveal" style="--c:var(--blue);--fg:#fff"><span class="eyebrow">02</span><h2 class="h2">Our Mission</h2><p>Mirabilia’s mission is to create nurturing environments that inspire learning through play, exploration, and collaboration. We are committed to helping children grow with confidence and joy within a homelike setting. Our aim is to build the foundation for each child to develop a love for learning, self-expression, and meaningful relationships while growing into compassionate, capable leaders of tomorrow.</p>{shape(s_half(ORANGE, 220), "", "")}</div>
  </div>
</div></section>
<section class="section" style="padding-top:0"><div class="wrap">
  <div class="shead"><div><span class="eyebrow">What we believe</span><h2 class="h2">How we nurture every child</h2></div><a class="btn" href="our-philosophy.html">Our Philosophy</a></div>
  <div class="rows">{rows_h}</div>
</div></section>
{testimonials()}
{enquiry_section()}'''
    page("about-us.html", "About Us | Mirabilia", "Our vision, mission, and philosophy focus on nurturing creativity, confidence, and independence in every child.", body, "about-us.html")


def philosophy():
    blocks = [
        ("That children…", ["Are successful competent and capable learners and should be given time to learn, grow, play, investigate, explore their world, and experience fun through play-based learning.", "Have the rights to voice, be heard and feel safe to self-express.", "Should be guided, supported and encouraged to grow and become future leaders."], "66ed214d850c6e4da1abc43f.jpg", "mask-arch"),
        ("That the educator…", ["Understands that the contribution of families, communities and educators are paramount in the development of the children and work collaboratively to ensure that children are given every opportunity to succeed.", "Are viewed as professionals who are dedicated and committed to the life-long learning skills and adopt a growth mindset.", "Are being reflective of current practices and contributes to continuous improvement to ensure quality outcomes underpin practice.", "Contributes to the ongoing wellness and wellbeing of our team and are active participants to promoting quality of life, acceptance and resilience."], "66ed214d8a6ce1a886356a38.jpg", "mask-blob"),
        ("That the families and the community…", ["Embrace the holistic societies that entail the diverse, cultural backgrounds, practices, values and beliefs. Australia’s Aboriginal and Torres Straight Islander’s culture are acknowledged, respected and valued.", "Contribute by showing their support, cooperation and active involvement in all aspects of the centre to create positive, supportive and collaborative partnerships.", "Participate in the sustainability of our community and strive for a better quality of life for current and future generations."], "fc8abdd1-92e1-4a3b-a671-fd5ebe651610.jpg", ""),
        ("That the environment…", ["Is a safe, secure and nurturing environment, that promotes a sense of warmth and security; fostering each child’s individual needs and their transition into their educational journey.", "Reflects high standards in health, hygiene, nutrition and safety for all children and adults.", "Offers a well-planned curriculum based on the child’s individual needs, that provide stimulation, age-appropriate challenges and encourages the children to develop a range of skill sets; in alignment with the Early Years Learning Framework, Principles of ECE, Practices of ECE and the National Quality Framework."], "66ed214df4e006c85b87b09f.jpg", "mask-leaf"),
    ]
    decos = [shape(s_dot(ORANGE), "", "") , shape(s_scallop(BLUE), "", "spin"), shape(s_tri(LIME), "", ""), shape(s_pill(PINK), "", "")]
    deco_pos = ["width:46px;right:6%;top:-12px", "width:96px;left:-28px;bottom:-20px", "width:160px;right:-20px;bottom:-30px", "width:120px;left:-20px;top:10%"]
    splits = ""
    for i, (t, items, im, mask) in enumerate(blocks):
        d = decos[i].replace('class="shape  ', f'style="{deco_pos[i]}" class="shape ', 1)
        lis = "".join(f"<li>{x}</li>" for x in items)
        splits += split(t, f'<ul class="ticks">{lis}</ul>', im, rev=i % 2 == 1, mask=mask, eyebrow=f"We believe · {i + 1:02d}", deco=d)
    body = f'''{phero("our philosophy", "We Believe...", text="<p>Discover our approach to nurturing each child's growth through play-based learning and holistic development.</p>", bg="var(--mint)", variant=1, colors=(ORANGE, PURPLE))}
<section class="section"><div class="wrap">{splits}</div></section>
{cta("Book a Tour Now", "Get in touch and book a tour with one of Perth’s most trusted childcare centres, where innovative education meets a caring, homelike environment.", "Book a Tour Now", "book-a-tour.html", bg="var(--purple)", fg="#fff", btn_cls="btn--white")}'''
    page("our-philosophy.html", "Our Philosophy | Mirabilia", "Discover our approach to nurturing each child's growth through play-based learning and holistic development.", body, "our-philosophy.html")


def curriculum():
    learn = [
        ("Early literacy &amp; numeracy", "Early literacy &amp; numeracy learning: alphabets, comprehension skills, numbers, shapes, colours, and simple addition."),
        ("Phonics awareness", "Phonics awareness, hence not only children will recognise the letters of the alphabets but are also familiar with their sounds and place in words, accelerating their reading and word recognition."),
        ("Social skills", "Social skills through games and technologies that encourage children to discuss projects, work together in a team, take turns and understand on how to become good citizens."),
    ]
    lc = "".join(f'<div class="icard reveal" style="--c:{c}"><span class="icard__num">{i + 1:02d}</span><div style="width:84px;margin-bottom:22px">{ill(k)}</div><h3>{t}</h3><p>{d}</p></div>' for i, ((t, d), c, k) in enumerate(zip(learn, ["#fff", "#fff", "#fff"], [3, 7, 1])))
    oosh = [
        ("During Before School Hours", "Children are offered breakfast in a relaxed flexible environment whilst preparing their bodies and mind for a school day. Free play and various learning experiences are provided for them to choose from and participate in.", "var(--lime)", "var(--ink)"),
        ("During After School Hours", "Children are offered afternoon tea. Homework club will be conducted together with experienced educators, various learning experiences that are planned and spontaneous are also provided.", "var(--orange)", "#fff"),
        ("During Vacation Care Program", "There will be planned experiences where children would go for excursions and incursions to attend to. They will be encouraged to be active whilst having fun and entertained during the school holidays.", "var(--purple)", "#fff"),
    ]
    oc = "".join(f'<div class="icard reveal" style="--c:{c};--fg:{fg}"><span class="icard__num">{i + 1:02d}</span><h3>{t}</h3><p>{d}</p></div>' for i, (t, d, c, fg) in enumerate(oosh))
    body = f'''{phero("our curriculum", "What is Mirabilia's Curriculum?", media="66bc2a293fbc1b37b251126f.jpg", bg="var(--sky)", variant=2, colors=(BLUE, LIME))}
<section class="section"><div class="wrap">
{split("Built on national frameworks", "<p>Mirabilia’s curriculum is based on the Early Childhood Education and Care National Quality Framework, the National Early Years Learning Framework (birth to 5 years) and the My Time Our Place Framework (school aged).</p><p>Mirabilia also practices emergent curriculum and approaches with nature pedagogies, which means that all intentional teaching and extension of learning experiences are focused on being responsive to children’s interests to create meaningful learning experiences that uses the nature and current environment as part of the teaching practices.</p>", "66f51a01b3c24e3193e337c3.jpg", mask="mask-arch", eyebrow="What is Mirabilia's Curriculum?")}
{split("Our Educators", "<p>Mirabilia’s educators serve a vital role within the curriculum specifically when being facilitators and extenders of the children’s play. We will observe children through their play, gather all the information we need in order to offer and facilitate children’s learning with such intentional teaching within play. As part of the emergent curriculum, we also believe that children learn from being in small groups, planned and spontaneous. Other than the daily engagement small groups play, we also offer ‘Squad’ times during school terms.</p><p>Children learn best in active, engaged, constructive and interactive environments, when the material they are learning is meaningful to them, and when they receive consequential feedback and probing questions, by putting their interests and needs at the forefront of the learning process, by giving some feedback and direction toward the relevant dimensions, and by allowing children to be active partners, guided play is able to keep children engaged</p>", "66ed214df4e006e3bb87b09e.jpg", rev=True, eyebrow="Guided play", btns='<div class="btns"><a class="btn" href="squad-programs.html">Our Squad Programs</a></div>')}
</div></section>
<section class="section band band--sand"><div class="wrap">
  <div class="split" style="margin-bottom:clamp(40px,5vw,64px)">
    <div><span class="eyebrow">Our Routine</span><h2 class="h1" style="font-size:clamp(40px,5vw,72px)">Big Prep for the Big School!</h2></div>
    <div><p class="lead">Mirabilia runs school readiness throughout the year and transition to school program from July to January. We recognise that when children are engaged in play, children learn through touching, moving, listening, seeing and hearing.</p><p>During the transition to school program, children will investigate further through the hands-on experiences that are in the integrated learning, individual work and as well as project work that will explicitly learn and experience:</p></div>
  </div>
  <div class="cards">{lc}</div>
</div></section>
<section class="section"><div class="wrap">
  <div class="shead"><div><span class="eyebrow">School aged</span><h2 class="h2 measure">OOSH (Out of School Hours) Care &amp; Vacation Care Program</h2></div></div>
  <div class="cards">{oc}</div>
  <div class="split mt-l">
    <div class="split__media mask-blob"><img src="{img('669f152253a60326c6f58b86.jpg')}" alt="" loading="lazy"></div>
    <div><span class="eyebrow">Framework</span><h3 class="h2" style="margin-bottom:22px">My Time Our Place Framework</h3><p>will be used as a guide for school aged children attending Mirabilia during before and after school hours as well as vacation care program. This framework assists educators and management to provide children with opportunities to maximise children’s potential and develop a foundation for future success in life.</p><p>Educators will collaborate with children to provide play and leisure opportunities that are meaningful to children and support their wellbeing, learning and development. School age children have choices and control over their learning at Mirabilia.</p></div>
  </div>
</div></section>
{cta("Book a Tour Now", "Get in touch and book a tour with one of Perth’s most trusted childcare centres, where innovative education meets a caring, homelike environment.", "Book a Tour Now", "book-a-tour.html")}'''
    page("our-curriculum.html", "Our Curriculum | Mirabilia", "Mirabilia’s curriculum is based on the National Quality Framework, the Early Years Learning Framework and the My Time Our Place Framework.", body, "our-curriculum.html")


def family():
    body = f'''{phero("our family", "At Mirabilia, our team is our greatest strength.", text="<p>With over 50 dedicated educators, support staff, and leaders, we work together to create a nurturing and vibrant environment where every child can thrive.</p>", media="669f15225f25695cc133feea.jpg", bg="var(--peach)", variant=3, colors=(ORANGE, PURPLE))}
<section class="section"><div class="wrap">
  <div class="split" style="align-items:start">
    <h2 class="h2">Each team member brings their own unique passion, expertise, and energy to our centres.</h2>
    <div><p class="lead">Each team member brings their own unique passion, expertise, and energy to our centres, united by a shared commitment to providing exceptional care and enriching learning experiences.</p><p>Together, we are proud to be part of the Mirabilia family, fostering growth, joy, and a lifelong love of learning for the children and families we serve.</p></div>
  </div>
</div></section>
<section class="section" style="padding-top:0"><div class="wrap">
  <div class="shead"><div><span class="eyebrow">Our people</span><h2 class="h2">Meet Our Team</h2></div></div>
  {team_cards()}
</div></section>
{cta("Interested in joining the Mirabilia Family?", "Our educators are united by a shared love for learning, creativity, and community spirit.", "Apply Now", "careers.html", bg="var(--blue)", fg="#fff", btn_cls="btn--white")}'''
    page("our-family.html", "Our Family | Mirabilia", "With over 50 dedicated educators, support staff, and leaders, we work together to create a nurturing and vibrant environment.", body, "our-family.html")


# --------------------------------------------------------------------------
# CENTRES
# --------------------------------------------------------------------------
def survey_form():
    rating = lambda n, opts: chips(n, opts)
    return f'''<form class="form" action="#" method="post">
  <div class="form__head"><h2 class="h3">We'd Love To Hear From You!</h2></div>
  <div class="field"><label for="sv-fn">First Name <span class="req">*</span></label><input id="sv-fn" name="first_name" required></div>
  <div class="field"><label for="sv-ln">Last Name <span class="req">*</span></label><input id="sv-ln" name="last_name" required></div>
  <div class="field"><label for="sv-em">Email <span class="req">*</span></label><input id="sv-em" type="email" name="email" required></div>
  <div class="field"><label for="sv-c">Centre Location <span class="req">*</span></label><select id="sv-c" name="centre" required>{SELECT_CENTRE}</select></div>
  <fieldset class="field field--full"><legend>How satisfied were you with the tour experience?</legend>{rating("tour", ["1 (Not Satisfied)", "2 (Need Improvement)", "3 (Meets Expectation)", "4 (Exceeds Expectation)", "5 (Excellent)"])}</fieldset>
  <fieldset class="field field--full"><legend>How well did we communicate the centre details and experience?</legend>{rating("comms", ["1", "2", "3", "4", "5"])}</fieldset>
  <fieldset class="field field--full"><legend>Did you receive all the information needed for children to commence care at Mirabilia?</legend>{rating("info", ["Yes", "No"])}</fieldset>
  <fieldset class="field field--full"><legend>How likely are you to recommend this centre to a friend?</legend>{rating("recommend", ["1", "2", "3", "4", "5"])}</fieldset>
  <div class="field field--full"><label for="sv-like">What area of the experience do you like the most?</label><textarea id="sv-like" name="liked"></textarea></div>
  <div class="field field--full"><label for="sv-imp">What area of the experience do you think we can improve?</label><textarea id="sv-imp" name="improve"></textarea></div>
  <button class="btn btn--fill" type="submit">Submit</button>
</form>'''


def centres_page():
    blocks = ""
    for k, c in CENTRES.items():
        g = "".join(f'<img src="{img(x)}" alt="" loading="lazy">' for x in c["gallery"][:5][:3])
        badge = f' <span class="badge" style="position:static;display:inline-block;vertical-align:middle;margin-left:8px">{c["badge"]}</span>' if c["badge"] else ""
        blocks += f'''<div class="cblock reveal">
  <div><h2>Mirabilia {c["name"]}{badge}</h2>
    <dl class="cinfo"><div><dt>Address:</dt><dd>{c["addr"]}</dd></div><div><dt>Phone:</dt><dd><a href="{PHONE_HREF}">{PHONE}</a></dd></div><div><dt>Operating Hours:</dt><dd>{HOURS}</dd></div></dl>
    <div class="btns"><a class="btn btn--fill" href="{k}.html">Learn More</a><a class="btn" href="book-a-tour.html">Book a Tour</a></div></div>
  <div class="cgal">{g}</div>
</div>'''
    directors = team_cards(["jaclyn", "abbie", "naomi"]).replace('grid-template-columns', '')
    body = f'''{phero("our centres", None, text="<p class='lead'>Explore our Mirabilia Childcare Centres, each offering a safe, nurturing environment for your child's growth. With unique programs and dedicated staff, every location provides exceptional care and learning opportunities.</p>", bg="var(--lime)", variant=0, colors=(PURPLE, BLUE))}
{promo_strip()}
<section class="section"><div class="wrap">{blocks}</div></section>
{video_section()}
{director("clarissa")}
<section class="section band band--sand"><div class="wrap">
  <div class="shead"><div><span class="eyebrow">Leadership</span><h2 class="h2">Meet our Centre Directors</h2></div><a class="btn" href="enquire-now.html">Contact Us</a></div>
  <div class="team" style="grid-template-columns:repeat(auto-fit,minmax(220px,1fr))">{team_cards(["jaclyn", "abbie", "naomi"])[18:-6]}</div>
</div></section>
{enquiry_section("Have a question? Feel free to contact us", "Contact us here and our team will get back to you!", "band--white")}
<section class="section"><div class="wrap form-wrap">
  <div><span class="eyebrow">Toured with us?</span><h2 class="h2">We'd Love To Hear From You!</h2><p class="lead" style="margin-top:20px">Tell us how your tour of Caversham, Byford, Citiplace or Champion Lakes went.</p><div style="width:170px;margin-top:40px">{ill(4)}</div></div>
  {survey_form()}
</div></section>'''
    page("centres.html", "Our Centres | Mirabilia", "Explore our Mirabilia Childcare Centres in Caversham, Byford, Citiplace and Champion Lakes.", body, "centres.html")


def centre_page(key):
    c = CENTRES[key]
    gal = "".join(f'<img src="{img(x)}" alt="Mirabilia {c["name"]}" loading="lazy">' for x in c["gallery"][:5])
    bring_items = ["Breast milk or formula", "Steriled bottle from home", "A bucket hat", "A bag of spare clothes"]
    bring_ills = [s_dot(PINK), s_pill(BLUE), s_half(ORANGE, 180), s_scallop(LIME)]
    bring = "".join(f'<div class="bring__item reveal">{ic}<span>{t}</span></div>' for t, ic in zip(bring_items, bring_ills))
    progs = ""
    for i, pk in enumerate(c["programs"]):
        p = PROGRAMS[pk]
        progs += split(p["name"], paras(p["short"]), p["img"], rev=i % 2 == 1, mask=["", "mask-arch", "", "mask-blob"][i % 4], level="h3",
                       btns=f'<div class="btns"><a class="btn" href="{p["href"]}">Learn More</a></div>')
    video = video_section("Mirabilia Champion Lakes Video Tour", both="cl") if key == "champion-lakes" else ""
    info = f'''<dl class="cinfo" style="margin-top:28px"><div><dt>Address:</dt><dd>{c["addr"]}</dd></div><div><dt>Phone:</dt><dd><a href="{PHONE_HREF}">{PHONE}</a></dd></div><div><dt>Operating Hours:</dt><dd>{HOURS}</dd></div></dl>
<div class="btns"><a class="btn btn--fill" href="book-a-tour.html">Book a Tour</a><a class="btn" href="enquire-now.html">Enquire Now</a></div>'''
    eyebrow = "Our centres" + (f' · {c["badge"]}' if c["badge"] else "")
    body = f'''{phero("mirabilia " + c["name"].lower(), None, extra=info, bg=c["bg"], variant=list(CENTRES).index(key), colors=(PURPLE, ORANGE), eyebrow=eyebrow, media=c["cover"])}
{promo_strip()}
<section class="section--tight section"><div class="wrap"><div class="cgal reveal">{gal}</div></div></section>
<section class="section"><div class="wrap">
  {split("Our Educators", "<p class='lead'>Our team of educators are committed and passionate about ensuring your child will be safe, nurtured and cared for every day.</p><p>At Mirabilia, children are encouraged to engage in interest-led play that creates learning and meaningful experiences.</p><p>Our educators seek to optimise diverse learning opportunities and implement the Curriculum as framed by the Early Years Learning Framework.</p>", c["gallery"][2], mask="mask-arch")}
  {split("You and Your Child", "<p class='lead'>Mirabilia Early Learning Education Centres provide a Centre-to-Family communication platform so families can maintain contact with their children’s experiences through photos, stories and learning outcomes.</p><p>Our Centres use Storypark and each family is provided with a secure login to access on their computers, mobiles or apps.</p>", c["gallery"][3], rev=True)}
</div></section>
<section class="section band band--sand"><div class="wrap">
  <div class="shead"><div><span class="eyebrow">Getting ready</span><h2 class="h2">What to Bring</h2></div><a class="btn btn--fill" href="enquire-now.html">Enquire Now</a></div>
  <div class="bring">{bring}</div>
</div></section>
<section class="section--tight section"><div class="wrap"><iframe class="map" src="{c["map"]}" title="Map to Mirabilia {c["name"]}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe></div></section>
{video}
<section class="section"><div class="wrap">
  <div class="shead"><div><span class="eyebrow">Squad Programs</span><h2 class="h2">Our Squad Programs</h2></div><a class="btn" href="squad-programs.html">View all</a></div>
  {progs}
</div></section>
{cta(f"Book a tour at Mirabilia {c['name']}", f"Discover the nurturing environment at Mirabilia {c['name']}. Book a tour today to explore our facilities, meet our educators, and see how we inspire your child's growth and development.", "Book a Tour", "book-a-tour.html", bg="var(--purple)", fg="#fff", btn_cls="btn--white")}
{director(c["director"])}
{enquiry_section("Have a question? Feel free to reach out!", "Contact us here and our team will get back to you!")}'''
    page(f"{key}.html", f"Mirabilia {c['name']} | Early Learning Centre", f"Mirabilia {c['name']} — {c['addr']}. {HOURS}.", body, "centres.html")


# --------------------------------------------------------------------------
# PROGRAMS
# --------------------------------------------------------------------------
def squad():
    out = ""
    for i, k in enumerate(PROGRAM_ORDER):
        p = PROGRAMS[k]
        out += split(p["name"], paras(p["short"]), p["img"], rev=i % 2 == 1, mask=["mask-arch", "", "mask-blob", "", "mask-leaf"][i], eyebrow=f"{i + 1:02d}",
                     btns=f'<div class="btns"><a class="btn" href="{p["href"]}">Learn More</a></div>')
    body = f'''{phero("squad programs", None, text="<p class='lead'>Mirabilia’s Squad Programs offer a diverse range of enriching activities designed to inspire, educate, and engage children. From cooking and music to sports and community involvement, each program nurtures essential skills, creativity, and social development in a fun, supportive environment.</p>", bg="var(--blue)", dark=True, variant=1, colors=(LIME, ORANGE))}
<section class="section"><div class="wrap">
  {split("What is a Squad Program?", "<p class='lead'>Our class is designed to promote physical activity and improve coordination.</p><p>Through lively dance routines, rhythmic exercises, and movement games, children enhance their motor skills and balance while having a blast. These activities support their overall physical development and help them become more aware of their bodies in space. Additionally, group activities encourage social interaction, teamwork, and communication, helping children build strong social skills and make new friends.</p>", "669f152253a6036cc0f58b85.jpg", eyebrow="Squad Programs")}
</div></section>
<section class="section band band--sand"><div class="wrap">{out}</div></section>
{cta("Join us!", "Enrol your child in a Mirabilia Squad Program.", "Enquire Now", "enquire-now.html")}'''
    page("squad-programs.html", "Squad Programs | Mirabilia", "Cooking, music, sports, dance and elderly visits — Mirabilia’s Squad Programs nurture skills, creativity and social development.", body, "squad-programs.html")


PROGRAM_PAGES = {
    "cooking-class": dict(title="Cooking Class", tagline="Inspiring Little Chefs to Explore, Create, and Taste!", bg="var(--peach)", colors=(ORANGE, PURPLE), hero="66f50bae8fdba121efde44d8.jpg", ill0=5,
        sections=[("Introduction", ["At Mirabilia Childcare Centre, our Cooking Class is more than just a fun activity — it’s a hands-on learning experience that introduces children to the joys of cooking and the importance of healthy eating.", "In our Cooking Class, little chefs don aprons and step into a world of creativity, flavour, and adventure. From mixing ingredients to tasting their own creations, every session is designed to be a delightful and educational journey."], "66f50baef0f224f07e2bda5c.jpg"),
                  ("What We Offer", ["Our Cooking Class provides a structured yet flexible program that encourages children to engage with food in a positive way. Under the guidance of experienced instructors, children learn about different ingredients, basic kitchen skills, and essential safety practices. Each class is thoughtfully planned to suit different age groups and skill levels, ensuring every child feels included and empowered."], "66f50baeb3c24e27d2e3304e.jpg"),
                  ("Learning Through Play", ["We believe in the power of learning through play, and our Cooking Class is designed with this philosophy in mind. Children are encouraged to explore textures, smells, and tastes while learning important life skills such as measuring, mixing, and following instructions. Our fun and interactive sessions help foster creativity, enhance motor skills, and boost confidence as children create their own snacks, meals, and treats."], "66f50baea0a6fb832453180b.jpg"),
                  ("Health and Nutrition Focus", ["Our Cooking Class goes beyond cooking techniques. We incorporate lessons about healthy eating habits, understanding food groups, and the benefits of a balanced diet. Children learn the importance of making nutritious choices while having fun with fruits, vegetables, grains, and proteins. We also introduce them to a variety of cuisines, celebrating cultural diversity and encouraging a love for different types of food."], "66f50bae9fb6e5a00ffe892b.jpg")],
        why_title="Why Choose Mirabilia's Cooking Class?",
        why=[("Hands-on Experience", "Children actively participate in all aspects of cooking, from prepping ingredients to plating dishes"), ("Qualified Instructors", "Our educators are trained in both childcare and culinary arts, ensuring a safe and engaging environment"), ("Emphasis on Safety", "Safety is our priority; children learn to handle kitchen tools and equipment with care"), ("Creative and Fun Activities", "Each session includes games, storytelling, and crafts related to the dishes they prepare")],
        join=["Enroll your child in our Cooking Class today and watch them develop a passion for cooking while learning valuable skills.", "At Mirabilia, we believe every child is a little chef in the making, ready to explore a world of taste and creativity!"]),
    "music-class": dict(title="Music Class", tagline="Discover the Joy of Music and Sound!", bg="var(--lilac)", colors=(PURPLE, PINK), hero="66f50aad9fb6e55089fe8872.jpg", ill0=7,
        sections=[(None, ["Our Music Class at Mirabilia Childcare Centre is an enchanting journey into the world of rhythm, melody, and sound. Designed for children of all ages, this program introduces the basics of music in a playful and engaging manner.", "We believe music is a universal language that inspires creativity, fosters emotional expression, and brings joy to every child's heart."], "66f50aadf0f22400972bd95c.jpg"),
                  ("What Makes Our Music Class Unique?", ["Music is more than just entertainment — it’s a tool for holistic development. Our Music Class nurtures a child’s innate sense of rhythm and musicality, providing opportunities to sing, dance, play instruments, and explore the wonderful world of sound. Each session is tailored to different age groups and developmental stages, ensuring an inclusive environment where every child can participate and thrive."], "music.jpg"),
                  ("Benefits of Music Education", ["Research shows that music education has numerous benefits for children, including enhanced cognitive development, improved memory, and increased social and emotional skills. In our Music Class, children learn to appreciate different genres of music, experiment with various instruments, and understand fundamental musical concepts such as beat, tempo, and pitch. This fun and interactive program also promotes teamwork, cooperation, and social interaction."], "66f50aadb3c24e38afe32fa8.jpg"),
                  ("Interactive and Fun Sessions", ["Our Music Class is designed to be lively, interactive, and above all, fun! We incorporate singing, dancing, and instrument play to keep children engaged and excited. From playing the tambourine to creating rhythms with maracas, every session is a new adventure in sound. We also introduce children to simple music theory through games and activities, making learning enjoyable and easy to grasp."], "66f50aadb3c24ecef0e32fa9.jpg")],
        why_title="Why Enroll in Mirabilia’s Music Class?",
        why=[("Inclusive Environment", "Our classes are open to all children, regardless of their musical background or abilities"), ("Expert Educators", "Our instructors are experienced music teachers who are passionate about nurturing young talent"), ("Comprehensive Learning", "Children are exposed to various aspects of music, from singing and playing instruments to understanding rhythm and melody"), ("Encourages Emotional Expression", "Music is a wonderful way for children to express their feelings and emotions in a safe and creative space")],
        join=["Let your child explore the magical world of music with Mirabilia Childcare Centre’s Music Class. Enrol now and watch as they discover new sounds, make new friends, and develop a lifelong love for music!"]),
    "sports-class": dict(title="Sports Class", tagline="Active Kids, Healthy Futures!", bg="var(--sky)", colors=(BLUE, ORANGE), hero="66f50df3b3c24e1daee331ba.jpg", ill0=6,
        sections=[("Introduction", ["Mirabilia Sports Class is designed to promote physical activity, teamwork, and a love for sports in a fun and encouraging environment. Our program is tailored to children of all ages, focusing on developing motor skills, coordination, and a positive attitude towards fitness. Through various sports and physical activities, children learn the value of exercise, healthy competition, and teamwork."], "66f50df3f0f22413612bdba9.jpg"),
                  ("About the Program", ["Our Sports Class offers a range of activities, from team sports like soccer and basketball to individual pursuits like running and gymnastics. Each session is carefully crafted to cater to different age groups and skill levels, ensuring that every child feels comfortable and motivated. With a mix of structured lessons and free play, our Sports Class fosters both skill development and a love for staying active."], "66f50df38fdba14ccfde4603.jpg"),
                  ("Benefits of Physical Activity", ["Regular physical activity is essential for a child's growth and development. Our Sports Class aims to build strength, coordination, balance, and agility while encouraging children to enjoy being active. We introduce basic sports skills and rules, promote fair play, and focus on building confidence and self-esteem through positive reinforcement and encouragement."], "66f50df38fdba126dbde4604.jpg"),
                  ("Social Skills and Teamwork", ["Participating in sports is an excellent way for children to develop social skills, learn to work as part of a team, and make new friends. Our Sports Class promotes cooperation, communication, and good sportsmanship, teaching children to respect others, take turns, and handle both winning and losing with grace. These lessons help children develop a positive attitude towards physical activity and build lifelong social skills."], "66f50df3b3c24e4596e331b9.jpg")],
        why_title="Why Choose the Sports Class?",
        why=[("Diverse Range of Activities", "From ball games to obstacle courses, there is something for every child to enjoy"), ("Professional Coaches", "Our instructors are qualified professionals who are passionate about promoting physical activity and sport"), ("Inclusive Approach", "All children are encouraged to participate, regardless of their ability or experience."), ("Focus on Fun and Learning", "We create a supportive and fun environment where children can learn new skills and enjoy themselves")],
        join=["Enrol your child in Mirabilia’s Sports Class and give them the opportunity to stay active, healthy, and happy. Our program is the perfect way for children to develop a love for physical activity and build friendships through sport!"]),
    "happy-feet": dict(title="Happy Feet", tagline="Dance, Movement, and Joy for Every Little One!", bg="var(--rose)", colors=(PINK, LIME), hero="66f50ed5b3c24e9d65e331f7.jpg", ill0=1,
        sections=[("Introduction", ["At Mirabilia, our Happy Feet program is all about getting children moving and grooving to the rhythm of fun! Designed to promote physical fitness and creative expression, this dance and movement class combines music, rhythm, and play to create a lively and energetic experience for all ages. Happy Feet is perfect for children who love to dance, jump, and wiggle, or simply enjoy moving to the beat!"], "66f50ed5a0a6fb3d7853193d.jpg"),
                  ("About the Program", ["Happy Feet is a dynamic dance and movement program tailored to different age groups, fostering a love for music, movement, and rhythm. The program includes a mix of basic dance steps, movement games, and creative expression exercises. Our sessions are designed to be inclusive, catering to various skill levels, and encourage children to explore movement in their own unique way."], "66f50ed5b3c24e102ae331f6.jpg"),
                  ("Physical Development", ["The Happy Feet program is more than just fun — it’s a great way for children to develop their gross motor skills, coordination, balance, and flexibility. Through structured activities, children build strength, agility, and stamina. Each session is carefully planned to include exercises that support muscle development, posture, and physical health, making fitness a fun and integral part of their daily routine."], "mirabilia-our-philosophy-photo-2.jpg"),
                  ("Creativity and Confidence Building", ["Happy Feet encourages children to express themselves through dance and movement, enhancing their creativity and building self-confidence. By exploring different dance styles and music genres, children learn to interpret rhythm and movement in their own unique ways. Our supportive and friendly environment allows children to build self-esteem and social skills, promoting a sense of achievement and joy in every step they take."], "66f50ed5f0f224a4a22bdbd2.jpg")],
        why_title="Why Choose the Happy Feet Program?",
        why=[("Engaging Curriculum", "We incorporate a variety of dance styles, including ballet, jazz, hip-hop, and contemporary, to keep the program diverse and exciting"), ("Experienced Instructors", "Our team includes qualified dance educators who are passionate about teaching children"), ("Fun and Safe Environment", "Classes are designed to be both safe and fun, with appropriate safety measures in place to prevent injuries"), ("Holistic Development", "The program supports not just physical growth but also emotional, social, and cognitive development")],
        join=["Come and join our Happy Feet program at Mirabilia Childcare Centre. Watch your child’s love for dance and movement flourish as they make friends, build confidence, and stay active!"]),
    "elderly-visit": dict(title="Elderly Visit", tagline="Connecting Generations with Love and Care", bg="var(--mint)", colors=(BLUE, PINK), hero="66f50c8ab3c24e21e7e330d4.jpg", ill0=4,
        sections=[("Introduction", ["At Mirabilia, we believe in fostering empathy, kindness, and community spirit from a young age. Our Elderly Visit Squad Program is a unique initiative designed to bridge the generational gap by bringing children and seniors together. Through regular visits to local aged care homes, our children have the opportunity to connect with the elderly, learning valuable life lessons and spreading joy and companionship."], "66f50c8af0f22416302bdb33.jpg"),
                  ("About the Program", ["Our Elderly Visit Program is carefully structured to ensure meaningful and positive interactions between children and seniors. The visits typically include activities such as reading stories, playing games, singing songs, and simply spending time together. These experiences offer both children and the elderly an opportunity to form friendships, share stories, and create lasting memories"], "66f50c8a9fb6e556bbfe89fd.jpg"),
                  ("Benefits for Children", ["Participating in the Elderly Visit Program helps children develop empathy, compassion, and a sense of community. By interacting with seniors, children learn about different life experiences, history, and the importance of kindness and respect. These visits also provide children with an understanding of ageing and the valuable role seniors play in society."], "66f50c8af0f224ec692bdb32.jpg"),
                  ("Benefits for the Elderly", ["For the elderly, the presence of children brings a sense of joy, vitality, and companionship. Many seniors look forward to these visits as they provide an opportunity for social interaction, emotional support, and a break from the routine. The laughter, energy, and curiosity of children often brighten the days of the elderly, creating a mutually beneficial relationship between the two generations."], "66fa3f94e6ea34e00b9178d0.jpg")],
        why_title="Why Participate in the Elderly Visit Program?",
        why=[("Building Empathy", "Children learn the importance of kindness, respect, and understanding by spending time with the elderly"), ("Creating Connections", "The program helps foster meaningful relationships and builds a sense of community between the young and old"), ("Emotional and Social Growth", "Through interaction with the elderly, children develop emotional intelligence and enhance their social skills"), ("Fun and Engaging Activities", "Each visit is filled with enjoyable activities that both the children and the elderly can participate in together")],
        join=["Help your child become a part of something special by enrolling them in our Elderly Visit Program at Mirabilia Centre. Together, we can build a compassionate and connected community, one visit at a time."]),
}


def program_page(slug):
    p = PROGRAM_PAGES[slug]
    masks = ["mask-arch", "", "mask-blob", ""]
    sects = "".join(split(h, paras(ps), im, rev=i % 2 == 1, mask=masks[i], eyebrow=(f"{i + 1:02d}" if h else "Squad Programs")) for i, (h, ps, im) in enumerate(p["sections"]))
    others = "".join(f'<a href="{PROGRAMS[k]["href"]}">{PROGRAMS[k]["name"]}</a>' for k in PROGRAM_ORDER if PROGRAMS[k]["href"] != f"{slug}.html")
    body = f'''{phero(p["title"].lower(), p["tagline"], media=p["hero"], bg=p["bg"], variant=PROGRAM_ORDER.index([k for k in PROGRAMS if PROGRAMS[k]["href"] == slug + ".html"][0]), colors=p["colors"], eyebrow="Squad Programs", extra='<div class="btns"><a class="btn btn--fill" href="enquire-now.html">Enquire Now</a></div>')}
<section class="section"><div class="wrap">{sects}</div></section>
{features(p["why"], p["why_title"], "Why Mirabilia", p["ill0"], "band--sand")}
{cta("Join us!", " ".join(p["join"]), "Enquire Now", "enquire-now.html", bg="var(--lime)")}
<section class="section--tight section" style="padding-top:0"><div class="wrap center"><span class="eyebrow">More Squad Programs</span><div class="pill-list" style="justify-content:center">{others}</div></div></section>'''
    page(f"{slug}.html", f"{p['title']} | Squad Programs | Mirabilia", p["tagline"], body, "squad-programs.html")


# --------------------------------------------------------------------------
# FAMILIES INFO
# --------------------------------------------------------------------------
def subsidy():
    acts = ["paid work, including being self-employed or on leave (including paid or unpaid parental leave).", "doing unpaid work in the family business.", "training courses for the purpose of improving the individual’s work skills or employment prospects.", "an approved course of education or study.", "volunteering.", "unpaid work experience or internships", "actively setting up a business", "actively looking for work."]
    caps = [("$11.55^", "Centre-based care", "per hour", "var(--purple)", "#fff"), ("$10.70^", "Family day care", "per hour", "var(--orange)", "#fff"), ("$10.10^", "Outside school hours care", "per hour", "var(--blue)", "#fff")]
    capc = "".join(f'<div class="icard reveal" style="--c:{c};--fg:{fg}"><span class="big">{v}</span><h3>{t}</h3><p>{u}</p></div>' for v, t, u, c, fg in caps)
    body = f'''{phero("child care subsidy", "Child Care Subsidy Calculator", text='<p class="notice" style="color:var(--ink)">If you are experiencing any problems with your transition to the new Child Care Subsidy, please phone the Department of Human Services (Centrelink) on <a class="link-u" href="tel:136150">136 150</a>.</p>', bg="var(--mint)", variant=2, colors=(PURPLE, BLUE))}
<section class="section--tight section"><div class="wrap">
  <iframe class="calc" src="https://www.startingblocks.gov.au/child-care-subsidy-calculator" title="Child Care Subsidy Calculator (Starting Blocks)" loading="lazy"></iframe>
  <p class="muted" style="margin-top:12px;font-size:14px">Calculator not loading? <a class="link-u" href="https://www.startingblocks.gov.au/child-care-subsidy-calculator" target="_blank" rel="noopener">Open it on startingblocks.gov.au</a>.</p>
</div></section>
<section class="section"><div class="wrap">
  <div class="split" style="align-items:start">
    <div><span class="eyebrow">Child Care Package</span><h2 class="h2">The Australian Government provides a number of subsidies and programs to help with the cost of child care.</h2></div>
    <div><p class="lead">The Child Care Subsidy being the main type of assistance that most families will use.</p>
      <h3 class="h4" style="margin:32px 0 16px">What are the eligibility requirements?</h3>
      <ul class="ticks">
        <li>The child must - be a ‘Family Tax Benefit child’ or ‘regular care child’ and be 13 or under and not attending secondary school and meet immunisation requirements</li>
        <li>the person claiming the Child Care Subsidy, or their partner, must - meet residency requirements</li>
        <li>liable to pay for care provided under a Complying Written Arrangement (their written agreement) with their child care provider</li>
        <li>child care must be provided by an approved provider in Australia and not be part of a compulsory education program, for example school.</li>
      </ul></div>
  </div>
</div></section>
<section class="section band band--sand"><div class="wrap">
  <div class="shead"><div><span class="eyebrow">How much can a family receive?</span><h2 class="h2 measure">Three things shape your subsidy</h2></div></div>
  <div class="cards">
    <div class="icard reveal"><span class="icard__num">01</span><h3>Income</h3><p>a family’s (both partners) combined income</p></div>
    <div class="icard reveal"><span class="icard__num">02</span><h3>Activity test</h3><p>what activities the individual and their partner undertake or exemptions that might apply and</p></div>
    <div class="icard reveal"><span class="icard__num">03</span><h3>Service type</h3><p>the type of approved childcare service used, for example Centre Based Day Care</p></div>
  </div>
</div></section>
<section class="section"><div class="wrap faq">
  <details open><summary>1. Combined Family Income</summary><div class="faq__a"><p>The table below outlines combined family income and relevant rate of Child Care Subsidy to which families will be entitled. Combined family income Subsidy per cent of the actual fee charged (up to relevant percentage of the hourly rate cap). These amounts are correct for 2018-19 and will be subject to adjustment through indexation in subsequent years. *Subsidy gradually decreases by 1 per cent for each $3000 increase in family income</p></div></details>
  <details><summary>2. Activity level of parents</summary><div class="faq__a"><p>The number of hours of subsidised care families can access will be determined by an activity test. The higher the level of activity, the more hours of subsidised care families can access, up to a maximum of 100 hours per fortnight.</p><p>In families with two parents, the parent with the lowest hours of activity will determine the hours of subsidised care.</p><p>A broad range of activities meet the activity test requirements, including:</p><ul class="ticks" style="margin-bottom:1em">{"".join(f"<li>{a}</li>" for a in acts)}</ul><p>Recognised activities can be combined to determine the maximum number of hours of subsidy. Time taken to travel between the child care service and the parents/carers place of work, training, study, or other recognised activity can also be included.</p><p>There is a three-step activity test to calculate how many hours to which a family will be entitled.</p></div></details>
  <details><summary>3. Type of childcare services</summary><div class="faq__a"><p>The new Child Care Subsidy is also based on the type of child care your family accesses subject to an hourly rate cap:</p></div></details>
  <div class="cards mt-l">{capc}</div>
</div></section>
{cta("CCS Information", "Any question regarding your CCS, please contact our Team on (08) 6115 0123.", "Read CCS Information", "ccs-information.html", bg="var(--blue)", fg="#fff", btn_cls="btn--white")}'''
    page("childcare-subsidy.html", "Childcare Subsidy | Mirabilia", "Child Care Subsidy calculator and eligibility information for Mirabilia families.", body, "ccs-information.html")


def ccs():
    body = f'''{phero("ccs information", "What is Child Care Subsidy (CCS)?", media="66c4602ee714248f383a2e0b.jpg", bg="var(--sky)", variant=3, colors=(BLUE, ORANGE))}
<section class="section"><div class="wrap">
  <div class="split" style="align-items:start">
    <h2 class="h2">The Commonwealth Government Child Care Subsidy (CCS) makes accessing high-quality childcare easy and more affordable for families.</h2>
    <div><p class="lead">Knowing how to get the most out of the subsidy means maximising the amount of time your child can spend in care, which supports vital learning and development. But understanding the system and accessing your entitlements shouldn’t feel like you need a degree in accounting. We’re here to help.</p>
    <p>The childcare subsidy is a financial assistance to cover the cost of child care.</p>
    <p>How much you receive depends on a number of factors, including your family’s income, the age of your child, and the paid and unpaid activities, like your job or volunteer work, your family is involved in.</p>
    <p>Extra support is available for some families, such as grandparents and great grandparents, and families experiencing temporary financial hardship.</p>
    <p>The CSS is paid directly to providers to reduce the fees you pay.</p></div>
  </div>
</div></section>
<section class="section band band--sand"><div class="wrap">
  <div class="cards cards--2">
    <div class="icard reveal" style="--c:#fff"><div style="width:90px;margin-bottom:24px">{ill(1)}</div><h3>Who can get the child care subsidy?</h3><p>To get the CCS you must:</p>
      <ul class="ticks"><li>Care for a child 13 or younger who’s not attending secondary school, unless an exemption applies.</li><li>Use an approved child care service.</li><li>Be responsible for paying the child care fees.</li><li>Meet residency and immunisation requirements.</li></ul></div>
    <div class="icard reveal" style="--c:#fff"><div style="width:90px;margin-bottom:24px">{ill(3)}</div><h3>How Do I Claim CCS?</h3>
      <p>You apply for the CCS online using your Services Australia or MyGov account.</p><p>You can use the Services Australia eligibility tool to guide you through the process.</p>
      <p>To find out more, go to: <a class="link-u" href="https://www.servicesaustralia.gov.au/child-care-subsidy" target="_blank" rel="noopener">servicesaustralia.gov.au/child-care-subsidy</a>.</p>
      <p>Any question regarding your CCS, please contact our Team on <a class="link-u" href="{PHONE_HREF}">{PHONE}</a>.</p></div>
  </div>
</div></section>
<section class="section"><div class="wrap">
  <div class="shead shead--center"><span class="eyebrow">How much can I claim?</span><h2 class="h2">Your CCS is calculated using three components:</h2></div>
  <div class="cards">
    <div class="icard reveal" style="--c:var(--purple);--fg:#fff"><span class="icard__num">01</span><h3>Your combined family income</h3></div>
    <div class="icard reveal" style="--c:var(--lime)"><span class="icard__num">02</span><h3>Your level of activity, such as work, education, or volunteering</h3></div>
    <div class="icard reveal" style="--c:var(--orange);--fg:#fff"><span class="icard__num">03</span><h3>Your childcare provider’s hourly rate</h3></div>
  </div>
</div></section>
{cta("It can be a little complicated …", "So, we made it easy for you to understand how much you might be eligible for with our simple Child Care Subsidy Calculator.", "Try the Child Care Subsidy Calculator", "childcare-subsidy.html")}'''
    page("ccs-information.html", "CCS Information | Mirabilia", "What is the Child Care Subsidy (CCS), who can get it and how to claim — explained by Mirabilia.", body, "ccs-information.html")


# --------------------------------------------------------------------------
# CAREERS / CONTACT / TOUR / PROMO
# --------------------------------------------------------------------------
def careers():
    strip = "".join(f'<figure class="{c} reveal"><img src="{img(i)}" alt="" loading="lazy"></figure>' for i, c in [("66f51a01b3c24e3193e337c3.jpg", "g-wide"), ("669f15225f2569adfb33feeb.jpg", "g-circle"), ("669f15225f25695cc133feea.jpg", "g-wide g-pill"), ("66e0f1b5e0b515509fbc7cbf.jpg", "")])
    body = f'''{phero("careers", "Want to be part of the Mirabilia Family?", media="392dd682-0655-495c-afa3-3d8187a4c971.jpg", bg="var(--purple)", dark=True, variant=0, colors=(LIME, ORANGE), extra='<div class="btns"><a class="btn btn--white" href="https://www.getredy.work/" target="_blank" rel="noopener">Apply Now</a></div>')}
<section class="section"><div class="wrap">
  <div class="split" style="align-items:start">
    <h2 class="h2">At Mirabilia, we’re more than just a childcare centre – we’re a vibrant community dedicated to making a positive impact on children's lives.</h2>
    <div><p class="lead">Our team is passionate, caring, and driven by a shared vision of fostering creativity, confidence, and lifelong learning in every child.</p>
    <p>As a member of the Mirabilia family, you’ll work in a supportive, collaborative environment that values professional growth and personal fulfilment. We believe in empowering our team with ongoing training, opportunities for career advancement, and a workplace culture that celebrates diversity, inclusivity, and innovation.</p>
    <p>If you're committed to making a difference, eager to grow, and excited about shaping the future of early childhood education, we’d love to hear from you. Join us in creating a nurturing environment where children thrive, and you can too!</p>
    <div class="btns"><a class="btn btn--fill" href="https://www.getredy.work/" target="_blank" rel="noopener">Apply Now</a></div></div>
  </div>
  <div class="gallery mt-l" style="grid-template-columns:repeat(6,1fr)">{strip}</div>
</div></section>
{centre_cards(title="Find a Centre")}
{video_section()}
{testimonials("What other parents have to say")}'''
    page("careers.html", "Careers | Mirabilia", "Want to be part of the Mirabilia Family? Join our team of passionate early childhood educators in Perth.", body, "careers.html")


def enquire():
    body = f'''{phero("enquire now", "Have any questions?", text="<p class='lead'>Contact us here and our team will get back to you!</p>", bg="var(--lime)", variant=1, colors=(PURPLE, BLUE))}
<section class="section"><div class="wrap form-wrap">
  <div><span class="eyebrow">Contact us</span><h2 class="h2">We’re here to help.</h2>
    <dl class="cinfo" style="margin-top:28px"><div><dt>Phone</dt><dd><a href="{PHONE_HREF}">{PHONE}</a></dd></div><div><dt>Email</dt><dd><a href="mailto:{EMAIL}">{EMAIL}</a></dd></div><div><dt>Operating Hours</dt><dd>{HOURS}</dd></div></dl>
    <div style="width:180px;margin-top:40px">{ill(0)}</div></div>
  {enquiry_form("enq")}
</div></section>'''
    page("enquire-now.html", "Enquire Now | Mirabilia", "Have any questions? Contact Mirabilia and our team will get back to you.", body, "enquire-now.html")


def tour():
    picks = "".join(f'<a class="ccard reveal" href="{k}.html"><div class="ccard__img">{f"<span class=badge>{c["badge"]}</span>" if c["badge"] else ""}<img src="{img(c["cover"])}" alt="Mirabilia {c["name"]}" loading="lazy"></div><h3>{c["name"]}</h3><p>{c["addr"]}</p></a>' for k, c in CENTRES.items())
    body = f'''{phero("book a tour!", "Book a tour at one of our Mirabilia Centres in Perth!", bg="var(--peach)", variant=2, colors=(ORANGE, PURPLE), text="<p>Get in touch and book a tour with one of Perth’s most trusted childcare centres, where innovative education meets a caring, homelike environment.</p>")}
<section class="section"><div class="wrap">
  <div class="shead"><div><span class="eyebrow">Step 1</span><h2 class="h2">Choose your nearest Mirabilia centre</h2></div></div>
  <div class="cards cards--4">{picks}</div>
</div></section>
<section class="section band band--sand" id="form"><div class="wrap form-wrap">
  <div><span class="eyebrow">Step 2</span><h2 class="h2">Tell us about your family</h2><p class="lead" style="margin-top:20px">Our team will get back to you to confirm a tour time.</p><div style="width:170px;margin-top:40px">{ill(2)}</div></div>
  {enquiry_form("tour")}
</div></section>'''
    page("book-a-tour.html", "Book a Tour | Mirabilia", "Book a tour at one of our Mirabilia Centres in Perth!", body, "book-a-tour.html")


def promotion():
    faq = [
        ("What Is The Promotion?", "<p>We’re offering 25% off childcare fees for all new enrolments at our Mirabilia Childcare Centres:</p><ul class='ticks' style='margin-bottom:1em'><li>At our <a class='link-u' href='citiplace.html'>Citiplace</a> location in Perth CBD, receive 25% off for 25 weeks.</li><li><a class='link-u' href='caversham.html'>Caversham</a>, <a class='link-u' href='byford.html'>Byford</a> &amp; Champion Lakes locations, enjoy 25% off for 1 month.</li></ul><p>This limited-time offer is perfect for parents looking for high-quality childcare with experienced educators in a safe, nurturing environment.</p><p>Secure your child’s place today!</p>"),
        ("Who Is Eligible for This Offer?", "<p>This limited 25% discount is available to new families who enrol their child at any Mirabilia Childcare Centre.</p><p>It’s perfect for parents looking for a reliable, nurturing, and high-quality childcare centre that supports children from 6 weeks to 5 years old—helping them thrive before starting preschool.</p>"),
        ("How Do I Claim This Offer?", "<p>Claiming your 25% discount at Mirabilia Childcare Centre is simple!</p><p>Fill out the form above – Our friendly team will contact you to guide you through the enrolment process and apply your discount.</p><p>Alternatively you can book a tour directly on our <a class='link-u' href='book-a-tour.html'>Booking Page</a> and schedule a tour at any of our child care locations; Caversham, Byford, Citiplace or Champion Lakes. Mention the 25% offer, and we’ll handle the rest while you explore our nurturing environment.</p><p>Whether you're ready to enrol or want to see our facilities firsthand, we're here to make the process easy and stress-free for you and your child. Don’t miss out, spaces are limited.</p>"),
        ("Why Are We Offering This?", "<p>At Mirabilia Childcare Centre, we believe that every child deserves the best start in life.</p><p>This limited-time offer is our way of making it easier for families to experience the high-quality care and education we provide.</p><p>We understand that finding the right childcare can be overwhelming—as a parent you want a safe, nurturing environment for your child to learn, grow, and thrive.</p><p>That’s exactly what we offer across our childcare locations!</p><p>This offer allows you to experience the Mirabilia difference; a place where your child is supported by experienced educators, engaging learning programs, and a family-friendly atmosphere, while making childcare more accessible and affordable.</p><p>Take advantage of this offer and give your child the best possible start!</p>"),
    ]
    faq_h = "".join(f'<details{" open" if i == 0 else ""}><summary>{q}</summary><div class="faq__a">{a}</div></details>' for i, (q, a) in enumerate(faq))
    why = [("Tailored Learning", "Personalised programs that nurture your child’s curiosity and growth."), ("Qualified Educators", "Caring and professional staff dedicated to your child's development."), ("Safe &amp; Stimulating", "Purpose-built environments designed to inspire learning through play and real-world education."), ("Community-Focused", "We partner with families to ensure every child feels supported and valued.")]
    dirs = "".join(director(k) for k in ["jaclyn", "naomi", "abbie"])
    body = f'''{phero("25% off", "Limited Time Only! Secure Your Child’s Spot Today!", text="<p class='lead'>Fill out the form below to claim your exclusive 25% discount.</p>", bg="var(--pink)", dark=True, variant=0, colors=(LIME, ORANGE), extra='<div class="btns"><a class="btn btn--white" href="#claim">Claim your 25% discount</a></div>')}
<section class="section" id="claim"><div class="wrap form-wrap">
  <div><span class="eyebrow">Limited Time Only!</span><h2 class="h2">Secure Your Child’s Spot Today!</h2><p class="lead" style="margin-top:20px">Fill out the form below to claim your exclusive 25% discount.</p><div style="width:170px;margin-top:40px">{ill(4)}</div></div>
  {enquiry_form("promo", promo=True)}
</div></section>
{marquee(["Get 25% Off", "Secure Your Child's Future", "Enrol to Any of Our Locations", "New Champion Lakes Centre Included"], "marquee--lime", "#claim")}
<section class="section"><div class="wrap">
  <div class="shead"><div><span class="eyebrow">FAQ</span><h2 class="h2">About The Promotion</h2></div></div>
  <div class="faq">{faq_h}</div>
</div></section>
{features(why, "Why Is Mirabilia The Right Choice For Your Child?", "The Mirabilia difference", 0, "band--sand")}
{cta("Ready to Join the Mirabilia Family?", "Give your child the best start and save 25% on childcare at Mirabilia.", "Secure Your Child's Spot Today", "#claim", bg="var(--purple)", fg="#fff", btn_cls="btn--white")}
{testimonials("What Our Mirabilia Families Are Saying About Us!", "Hear from other happy parents about their experiences with us!")}
<section class="section band band--sand" style="padding-bottom:0"><div class="wrap"><div class="shead shead--center"><span class="eyebrow">Meet The Team</span><h2 class="h2 measure">Our passionate educators are the heart of Mirabilia.</h2><p class="muted">With years of experience and a genuine love for children, they create a safe, inspiring space where every child thrives.</p></div></div></section>
<div class="band band--sand">{dirs}</div>
{cta("Don't Miss Out!", "Give your child the best start and save 25% on childcare at Mirabilia.", "Secure Your Child's Spot Today!", "#claim")}'''
    page("promotion.html", "25% Off Your First Month | Mirabilia", "Get 25% off for new enrolments at Mirabilia Caversham, Byford, Citiplace and Champion Lakes.", body, "promotion.html")


if __name__ == "__main__":
    home(); about(); philosophy(); curriculum(); family()
    centres_page()
    for k in CENTRES:
        centre_page(k)
    squad()
    for s in PROGRAM_PAGES:
        program_page(s)
    subsidy(); ccs(); careers(); enquire(); tour(); promotion()
