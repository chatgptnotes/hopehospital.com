import re
import os

os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

with open('index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

def get(start, end):
    return ''.join(lines[start-1:end])

# Common parts
head_raw = get(1, 481)
nav = get(483, 660)
footer = get(3950, 4066)

# Sections
hero = get(666, 1031)
stats_banner = get(1033, 1068)
awards = get(1070, 1130)
surgeon = get(1132, 1200)
raftaar = get(1202, 1280)
ai_innovation = get(1282, 1479)
about = get(1481, 1547)
stats2 = get(1549, 1584)
departments = get(1586, 1710)
diseases = get(1712, 1772)
checkup = get(1774, 1981)
facilities = get(1983, 2138)
consultants = get(2140, 3088)
ayushman = get(3090, 3137)
opd = get(3139, 3189)
hospitals = get(3191, 3296)
empanelments = get(3298, 3392)
gallery = get(3394, 3672)
reviews = get(3674, 3860)
contact = get(3862, 3946)

def make_head(title, desc, canonical_path):
    h = head_raw
    h = re.sub(r'<title>.*?</title>', '<title>' + title + '</title>', h)
    h = re.sub(r'<meta name="description" content=".*?">', '<meta name="description" content="' + desc + '">', h)
    h = re.sub(r'<link rel="canonical" href=".*?"', '<link rel="canonical" href="https://www.hopehospital.com/' + canonical_path + '"', h)
    h = re.sub(r'<meta property="og:title" content=".*?">', '<meta property="og:title" content="' + title + '">', h)
    h = re.sub(r'<meta property="og:description" content=".*?">', '<meta property="og:description" content="' + desc + '">', h)
    h = re.sub(r'<meta property="og:url" content=".*?">', '<meta property="og:url" content="https://www.hopehospital.com/' + canonical_path + '">', h)
    return h

def make_nav(active_page):
    n = nav
    n = n.replace('href="#about"', 'href="about.html"')
    n = n.replace('href="#departments"', 'href="departments.html"')
    n = n.replace('href="#hospitals"', 'href="hospitals.html"')
    n = n.replace('href="#empanelments"', 'href="empanelments.html"')
    n = n.replace('href="#gallery"', 'href="gallery.html"')
    n = n.replace('href="#contact"', 'href="contact.html"')
    n = n.replace('class="active"', '')
    active_map = {
        'home': ('href="#home">Home', 'href="index.html" class="active">Home'),
        'about': ('href="about.html">About Us', 'href="about.html" class="active">About Us'),
        'departments': ('href="departments.html">Departments', 'href="departments.html" class="active">Departments'),
        'hospitals': ('href="hospitals.html">Hospitals', 'href="hospitals.html" class="active">Hospitals'),
        'empanelments': ('href="empanelments.html">Empanelments', 'href="empanelments.html" class="active">Empanelments'),
        'gallery': ('href="gallery.html">Gallery', 'href="gallery.html" class="active">Gallery'),
        'contact': ('href="contact.html">Contact', 'href="contact.html" class="active">Contact'),
    }
    if active_page in active_map:
        old, new = active_map[active_page]
        n = n.replace(old, new)
    return n

def make_footer():
    f = footer
    f = f.replace('href="#about"', 'href="about.html"')
    f = f.replace('href="#departments"', 'href="departments.html"')
    f = f.replace('href="#hospitals"', 'href="hospitals.html"')
    f = f.replace('href="#empanelments"', 'href="empanelments.html"')
    f = f.replace('href="#contact"', 'href="contact.html"')
    return f

SCRIPTS_BASIC = """
    <script>
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) { navbar.classList.add('scrolled'); }
            else { navbar.classList.remove('scrolled'); }
        });
        function toggleMenu() { document.getElementById('navLinks').classList.toggle('active'); }
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => { document.getElementById('navLinks').classList.remove('active'); });
        });
    </script>
"""

PAGE_TOP = "<body>\n"
MAIN_OPEN = "\n    <main id=\"main-content\">\n"
MAIN_CLOSE = "\n    </main>\n\n"
PAGE_END = "\n</body>\n</html>"

# ========== 1. ABOUT PAGE ==========
h = make_head(
    'About Hope Hospital | NABH Accredited Super Specialty Center in Nagpur',
    'Learn about Hope Hospital Nagpur - Central India first NABH-accredited super specialty center with awards, AI innovation, world-class facilities and expert doctors.',
    'about.html'
)
page = h + PAGE_TOP + make_nav('about') + MAIN_OPEN
page += about + "\n" + stats2 + "\n" + awards + "\n" + surgeon + "\n" + ai_innovation + "\n" + facilities + "\n" + consultants
page += MAIN_CLOSE + make_footer() + SCRIPTS_BASIC + PAGE_END
with open('about.html', 'w', encoding='utf-8') as f:
    f.write(page)
print('Created: about.html')

# ========== 2. DEPARTMENTS PAGE ==========
h = make_head(
    'Medical Departments & Services | Hope Hospital Nagpur',
    'Comprehensive medical departments at Hope Hospital - Orthopedics, Cardiology, Neurosurgery, Oncology and more. Health checkup packages available.',
    'departments.html'
)
page = h + PAGE_TOP + make_nav('departments') + MAIN_OPEN
page += departments + "\n" + diseases + "\n" + checkup + "\n" + opd
page += MAIN_CLOSE + make_footer() + SCRIPTS_BASIC + PAGE_END
with open('departments.html', 'w', encoding='utf-8') as f:
    f.write(page)
print('Created: departments.html')

# ========== 3. HOSPITALS PAGE ==========
h = make_head(
    'Our Hospital Locations | Hope Hospital Nagpur',
    'Visit Hope Hospital at Teka Naka, Ayushman Nagpur Hospital at Ramdaspeth, or Ayushman Polyclinic Pandurna. 24/7 emergency with Raftaar Ambulance.',
    'hospitals.html'
)
page = h + PAGE_TOP + make_nav('hospitals') + MAIN_OPEN
page += hospitals + "\n" + raftaar
page += MAIN_CLOSE + make_footer() + SCRIPTS_BASIC + PAGE_END
with open('hospitals.html', 'w', encoding='utf-8') as f:
    f.write(page)
print('Created: hospitals.html')

# ========== 4. EMPANELMENTS PAGE ==========
h = make_head(
    'Insurance & Government Schemes | Hope Hospital Nagpur',
    'Hope Hospital empaneled under Ayushman Bharat, MJPJAY, CGHS, ECHS and 20+ government schemes. Cashless treatment with major insurance companies.',
    'empanelments.html'
)
page = h + PAGE_TOP + make_nav('empanelments') + MAIN_OPEN
page += ayushman + "\n" + empanelments
page += MAIN_CLOSE + make_footer() + SCRIPTS_BASIC + PAGE_END
with open('empanelments.html', 'w', encoding='utf-8') as f:
    f.write(page)
print('Created: empanelments.html')

# ========== 5. GALLERY PAGE ==========
h = make_head(
    'Photo Gallery | Hope Hospital Nagpur',
    'View photos of Hope Hospital facilities, medical equipment, operation theaters, patient care, and our expert doctors team.',
    'gallery.html'
)
page = h + PAGE_TOP + make_nav('gallery') + MAIN_OPEN
page += gallery
page += MAIN_CLOSE + make_footer() + SCRIPTS_BASIC + PAGE_END
with open('gallery.html', 'w', encoding='utf-8') as f:
    f.write(page)
print('Created: gallery.html')

# ========== 6. CONTACT PAGE ==========
h = make_head(
    'Contact Us | Hope Hospital Nagpur',
    'Contact Hope Hospital Nagpur for appointments, emergencies or enquiries. Call 1800-233-0000 (24/7). Teka Naka, Kamptee Road, Nagpur.',
    'contact.html'
)
page = h + PAGE_TOP + make_nav('contact') + MAIN_OPEN
page += contact
page += MAIN_CLOSE + make_footer() + SCRIPTS_BASIC + PAGE_END
with open('contact.html', 'w', encoding='utf-8') as f:
    f.write(page)
print('Created: contact.html')

# ========== 7. TRIM HOMEPAGE ==========
# Homepage keeps: Hero, Stats Banner, About (brief), Departments (overview), Reviews, Contact (compact)
home_nav = make_nav('home')
# For homepage, keep #contact as anchor since contact section is still on page
home_nav = home_nav.replace('href="contact.html"', 'href="contact.html"')

h = head_raw  # Keep original head for homepage
page = h + PAGE_TOP + home_nav + MAIN_OPEN
page += hero + "\n"
page += stats_banner + "\n"
page += about + "\n"
page += departments + "\n"
page += reviews + "\n"
page += MAIN_CLOSE + make_footer() + get(4068, 4094) + """
        // Mobile menu toggle
        function toggleMenu() {
            const navLinks = document.getElementById('navLinks');
            navLinks.classList.toggle('active');
        }
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                document.getElementById('navLinks').classList.remove('active');
            });
        });
    </script>
""" + PAGE_END

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(page)
print('Created: index.html (trimmed homepage)')

print('\n=== DONE ===')
print('Pages created: about.html, departments.html, hospitals.html, empanelments.html, gallery.html, contact.html')
print('index.html trimmed to: Hero + Stats + About + Departments + Reviews')
