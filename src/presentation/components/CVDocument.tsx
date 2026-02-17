import { Document, Page, Text, View, StyleSheet, Link, Image, Svg, Path } from '@react-pdf/renderer';
import { ProgrammingSkills } from '@/data/cvData';

const PURPLE = '#310063';
const PURPLE_LIGHT = '#e8d0ff';
const PURPLE_DARK = '#4a0090';
const GRAY_DARK = '#1f2937';
const GRAY_MID = '#4b5563';
const GRAY_LIGHT = '#9ca3af';
const WHITE = '#ffffff';
const PAGE_BG = '#f4f4f6';

const styles = StyleSheet.create({
  page: {
    fontSize: 10,
    fontFamily: 'Helvetica',
    backgroundColor: PAGE_BG,
    position: 'relative',
  },

  // ── Arc background elements (5 circle outlines) ───────
  bgArc1: {
    position: 'absolute',
    top: -180,
    right: -130,
    width: 420,
    height: 420,
    borderRadius: 210,
    borderWidth: 1.2,
    borderColor: '#aaaabc',
    borderStyle: 'solid',
    opacity: 0.35,
  },
  bgArc2: {
    position: 'absolute',
    top: -80,
    right: -220,
    width: 380,
    height: 380,
    borderRadius: 190,
    borderWidth: 1,
    borderColor: '#aaaabc',
    borderStyle: 'solid',
    opacity: 0.25,
  },
  bgArc3: {
    position: 'absolute',
    top: 60,
    right: -280,
    width: 340,
    height: 340,
    borderRadius: 170,
    borderWidth: 1,
    borderColor: '#aaaabc',
    borderStyle: 'solid',
    opacity: 0.2,
  },
  bgArc4: {
    position: 'absolute',
    bottom: -160,
    left: -120,
    width: 380,
    height: 380,
    borderRadius: 190,
    borderWidth: 1.2,
    borderColor: '#aaaabc',
    borderStyle: 'solid',
    opacity: 0.3,
  },
  bgArc5: {
    position: 'absolute',
    bottom: -60,
    left: -200,
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 1,
    borderColor: '#aaaabc',
    borderStyle: 'solid',
    opacity: 0.2,
  },

  // ── Top & side accents ────────────────────────────────
  bgAccentTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 8,
    backgroundColor: PURPLE,
  },
  bgAccentSide: {
    position: 'absolute',
    top: 8,
    left: 0,
    width: 4,
    height: '100%',
    backgroundColor: PURPLE,
  },

  // ── Page wrapper ──────────────────────────────────────
  pageContent: {
    padding: '24 36 32 44',
  },

  // ── Header ────────────────────────────────────────────
  headerRow: {
    flexDirection: 'row',
    marginBottom: 14,
    alignItems: 'center',
  },
  headerInfo: {
    flex: 2,
    paddingRight: 16,
  },
  headerPhoto: {
    flex: 1,
    alignItems: 'center',
  },
  profileImageWrapper: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 3,
    borderColor: PURPLE,
    borderStyle: 'solid',
    overflow: 'hidden',
  },
  profileImage: {
    width: 96,
    height: 96,
    objectFit: 'cover',
  },
  nameText: {
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    color: PURPLE,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 3,
  },
  positionText: {
    fontSize: 11,
    color: GRAY_MID,
    marginBottom: 8,
    fontFamily: 'Helvetica-Oblique',
  },

  // ── Contact rows with icons ───────────────────────────
  contactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 2,
  },
  contactIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 14,
    marginBottom: 4,
    width: '45%',
  },
  contactIconText: {
    fontSize: 8.5,
    color: GRAY_MID,
    marginLeft: 4,
  },
  contactIconLink: {
    fontSize: 8.5,
    color: PURPLE,
    marginLeft: 4,
    textDecoration: 'none',
  },

  // ── Divider ───────────────────────────────────────────
  divider: {
    height: 2,
    backgroundColor: PURPLE,
    marginBottom: 12,
    borderRadius: 1,
  },

  // ── Body layout ───────────────────────────────────────
  bodyRow: {
    flexDirection: 'row',
    gap: 16,
  },
  leftCol: {
    flex: 3,
  },
  rightCol: {
    flex: 2,
  },

  // ── Section title (text + thick underline) ────────────
  sectionTitleWrapper: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    color: PURPLE,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 3,
  },
  sectionTitleLine: {
    height: 3,
    backgroundColor: PURPLE,
    borderRadius: 1,
  },

  // ── Summary ───────────────────────────────────────────
  summaryText: {
    fontSize: 9,
    color: GRAY_MID,
    lineHeight: 1.5,
    marginBottom: 12,
  },

  // ── Experience ────────────────────────────────────────
  expItem: {
    marginBottom: 10,
    paddingBottom: 8,
    borderBottom: `1 solid ${PURPLE_LIGHT}`,
  },
  expItemLast: {
    marginBottom: 10,
  },
  expItemCondensed: {
    marginBottom: 6,
    paddingBottom: 5,
    borderBottom: `1 solid #e5e7eb`,
  },
  jobTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: GRAY_DARK,
    marginBottom: 1,
  },
  jobTitleCondensed: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: GRAY_DARK,
    marginBottom: 1,
  },
  companyDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  company: {
    fontSize: 9,
    color: PURPLE,
    fontFamily: 'Helvetica-Bold',
  },
  companyCondensed: {
    fontSize: 8.5,
    color: PURPLE,
  },
  dateText: {
    fontSize: 8,
    color: GRAY_LIGHT,
  },
  locationText: {
    fontSize: 8,
    color: GRAY_LIGHT,
    marginBottom: 3,
  },
  descText: {
    fontSize: 8.5,
    color: GRAY_MID,
    lineHeight: 1.4,
    marginBottom: 3,
  },
  descCondensed: {
    fontSize: 8,
    color: GRAY_LIGHT,
    lineHeight: 1.3,
  },
  achievement: {
    fontSize: 8.5,
    color: GRAY_MID,
    marginBottom: 2,
    marginLeft: 8,
    lineHeight: 1.3,
  },
  techContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 3,
  },
  techBadge: {
    fontSize: 7.5,
    color: PURPLE_DARK,
    backgroundColor: PURPLE_LIGHT,
    padding: '2 5',
    marginRight: 4,
    marginBottom: 3,
    borderRadius: 3,
  },

  // ── Education ─────────────────────────────────────────
  eduItem: {
    marginBottom: 8,
    paddingLeft: 6,
    borderLeft: `2 solid ${PURPLE}`,
  },
  eduDegree: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: GRAY_DARK,
    marginBottom: 1,
  },
  eduInstitution: {
    fontSize: 8.5,
    color: PURPLE,
    marginBottom: 1,
  },
  eduDetails: {
    fontSize: 8,
    color: GRAY_LIGHT,
  },

  // ── Skills ────────────────────────────────────────────
  skillCategory: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: PURPLE_DARK,
    marginBottom: 3,
    marginTop: 6,
    backgroundColor: PURPLE_LIGHT,
    padding: '2 5',
    borderRadius: 2,
  },
  skillItem: {
    fontSize: 8.5,
    color: GRAY_MID,
    marginBottom: 2,
    marginLeft: 6,
    lineHeight: 1.3,
  },
});

// ── SVG icon helpers ──────────────────────────────────────
const PhoneIcon = () => (
  <Svg width="9" height="9" viewBox="0 0 24 24">
    <Path fill={PURPLE} d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
  </Svg>
);

const EmailIcon = () => (
  <Svg width="9" height="9" viewBox="0 0 24 24">
    <Path fill={PURPLE} d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </Svg>
);

const LocationIcon = () => (
  <Svg width="9" height="9" viewBox="0 0 24 24">
    <Path fill={PURPLE} d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </Svg>
);

const LinkedInIcon = () => (
  <Svg width="9" height="9" viewBox="0 0 24 24">
    <Path fill={PURPLE} d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </Svg>
);

const GlobeIcon = () => (
  <Svg width="9" height="9" viewBox="0 0 24 24">
    <Path fill={PURPLE} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
  </Svg>
);

// ── Section title component ───────────────────────────────
const SectionTitle = ({ children, mt }: { children: string; mt?: number }) => (
  <View style={[styles.sectionTitleWrapper, mt ? { marginTop: mt } : {}]}>
    <Text style={styles.sectionTitle}>{children}</Text>
    <View style={styles.sectionTitleLine} />
  </View>
);

interface ExperienceData {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string | null;
  website?: string;
  description: string;
  technologies: string[];
  achievements: string[];
  category: string;
}

interface EducationData {
  id: string;
  institution: string;
  degree: string;
  period: string;
  gpa: string | null;
}

interface CVDocumentProps {
  selectedPosition: 'software-engineer' | 'merchant' | 'business-consultant';
  experiences: ExperienceData[];
  education: EducationData[];
  skills?: ProgrammingSkills | null;
  profileImage?: string;
}

const skillCategoryLabels: Record<keyof ProgrammingSkills, string> = {
  languages:    'Languages',
  backend:      'Backend',
  frontend:     'Frontend',
  databases:    'Databases',
  devops:       'DevOps & Hosting',
  tools:        'Tools',
  architecture: 'Architecture',
  integrations: 'Integrations',
};

export function CVDocument({ selectedPosition, experiences, education, skills, profileImage }: CVDocumentProps) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Present';
    const [year, month] = dateString.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[parseInt(month) - 1]} ${year}`;
  };

  const getPositionTitle = () => {
    switch (selectedPosition) {
      case 'software-engineer':     return 'Software Engineer';
      case 'merchant':              return 'Sales & Business Development';
      case 'business-consultant':   return 'Business Consultant';
    }
  };

  const getSummary = () => {
    switch (selectedPosition) {
      case 'software-engineer':
        return '10+ years of experience in software engineering, specializing in full-stack development with .NET Core, React, and database technologies. Proven track record of building comprehensive web platforms and enterprise solutions.';
      case 'merchant':
        return 'Experienced sales professional and insurance broker with strong focus on B2B and B2C client relationships. Specialized in helping business owners optimize costs and secure financial solutions through strategic insurance planning.';
      case 'business-consultant':
        return 'Business consultant with extensive experience in process optimization, business model creation, and strategic planning. Expert in helping organizations build efficient workflows and sustainable growth strategies.';
    }
  };

  const isMain = (category: string) => category === selectedPosition;
  const profileImageUrl = profileImage ?? '/images/profile/k.mihaylov-logo.png';
  const mainExperiences = experiences.filter(e => isMain(e.category));
  const otherExperiences = experiences.filter(e => !isMain(e.category));

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* ── Arc background (5 circle outlines) ── */}
        <View style={styles.bgArc1} />
        <View style={styles.bgArc2} />
        <View style={styles.bgArc3} />
        <View style={styles.bgArc4} />
        <View style={styles.bgArc5} />

        {/* ── Top & side accents ── */}
        <View style={styles.bgAccentTop} />
        <View style={styles.bgAccentSide} />

        <View style={styles.pageContent}>

          {/* ── HEADER ── */}
          <View style={styles.headerRow}>
            <View style={styles.headerInfo}>
              <Text style={styles.nameText}>Krasimir Mihaylov</Text>
              <Text style={styles.positionText}>{getPositionTitle()}</Text>

              <View style={styles.contactGrid}>
                {/* Phone */}
                <View style={styles.contactIconRow}>
                  <PhoneIcon />
                  <Text style={styles.contactIconText}>0899 076 613</Text>
                </View>
                {/* Email */}
                <View style={styles.contactIconRow}>
                  <EmailIcon />
                  <Text style={styles.contactIconText}>krasiymihailov@gmail.com</Text>
                </View>
                {/* Location */}
                <View style={styles.contactIconRow}>
                  <LocationIcon />
                  <Text style={styles.contactIconText}>Varna, Bulgaria</Text>
                </View>
                {/* LinkedIn */}
                <View style={styles.contactIconRow}>
                  <LinkedInIcon />
                  <Link src="https://www.linkedin.com/in/krasimir-mihailov-301429139/" style={styles.contactIconLink}>
                    LinkedIn
                  </Link>
                </View>
                {/* Portfolio */}
                <View style={styles.contactIconRow}>
                  <GlobeIcon />
                  <Link src="https://krasimir-mihaylov-portfolio.vercel.app/home" style={styles.contactIconLink}>
                    Portfolio
                  </Link>
                </View>
              </View>
            </View>

            <View style={styles.headerPhoto}>
              <View style={styles.profileImageWrapper}>
                <Image src={profileImageUrl} style={styles.profileImage} />
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          {/* ── SUMMARY ── */}
          <Text style={styles.summaryText}>{getSummary()}</Text>

          {/* ── BODY: 60% left | 40% right ── */}
          <View style={styles.bodyRow}>

            {/* ── LEFT: Work Experience ── */}
            <View style={styles.leftCol}>
              <SectionTitle>Work Experience</SectionTitle>

              {mainExperiences.map((exp, idx) => (
                <View key={exp.id} style={idx === mainExperiences.length - 1 ? styles.expItemLast : styles.expItem}>
                  <Text style={styles.jobTitle}>{exp.position}</Text>
                  <View style={styles.companyDate}>
                    <Text style={styles.company}>{exp.company}</Text>
                    <Text style={styles.dateText}>{formatDate(exp.startDate)} – {formatDate(exp.endDate)}</Text>
                  </View>
                  <Text style={styles.locationText}>{exp.location}</Text>
                  <Text style={styles.descText}>{exp.description}</Text>
                  {exp.technologies.length > 0 && (
                    <View style={styles.techContainer}>
                      {exp.technologies.map((tech, i) => (
                        <Text key={i} style={styles.techBadge}>{tech}</Text>
                      ))}
                    </View>
                  )}
                  {exp.achievements.filter(a => a).slice(0, 6).map((a, i) => (
                    <Text key={i} style={styles.achievement}>• {a.replace(/\*\*/g, '').replace(/\*/g, '')}</Text>
                  ))}
                </View>
              ))}

              {otherExperiences.map((exp) => (
                <View key={exp.id} style={styles.expItemCondensed}>
                  <Text style={styles.jobTitleCondensed}>{exp.position}</Text>
                  <View style={styles.companyDate}>
                    <Text style={styles.companyCondensed}>{exp.company}</Text>
                    <Text style={styles.dateText}>{formatDate(exp.startDate)} – {formatDate(exp.endDate)}</Text>
                  </View>
                  <Text style={styles.descCondensed}>
                    {exp.achievements.filter(a => a && !a.startsWith('**') && !a.startsWith('*')).slice(0, 2).join(' • ')}
                  </Text>
                </View>
              ))}
            </View>

            {/* ── RIGHT: Education + Skills ── */}
            <View style={styles.rightCol}>

              <SectionTitle>Education</SectionTitle>
              {education.map((edu) => (
                <View key={edu.id} style={styles.eduItem}>
                  <Text style={styles.eduDegree}>{edu.degree}</Text>
                  <Text style={styles.eduInstitution}>{edu.institution}</Text>
                  <Text style={styles.eduDetails}>
                    {edu.period}{edu.gpa ? ` | GPA: ${edu.gpa}` : ''}
                  </Text>
                </View>
              ))}

              {skills && (
                <>
                  <SectionTitle mt={12}>Technical Skills</SectionTitle>
                  {(Object.keys(skillCategoryLabels) as Array<keyof ProgrammingSkills>).map((key) => {
                    const items = skills[key];
                    if (!items || items.length === 0) return null;
                    return (
                      <View key={key}>
                        <Text style={styles.skillCategory}>{skillCategoryLabels[key]}</Text>
                        <Text style={styles.skillItem}>{items.join(', ')}</Text>
                      </View>
                    );
                  })}
                </>
              )}

              {!skills && selectedPosition !== 'software-engineer' && (
                <>
                  <SectionTitle mt={12}>Key Skills</SectionTitle>
                  {selectedPosition === 'merchant' && (
                    <>
                      <Text style={styles.skillCategory}>Sales</Text>
                      <Text style={styles.skillItem}>B2B & B2C Client Management, Sales Process Development, Deal Closing</Text>
                    </>
                  )}
                  {selectedPosition === 'business-consultant' && (
                    <>
                      <Text style={styles.skillCategory}>Consulting</Text>
                      <Text style={styles.skillItem}>Process Optimization, Business Model Creation, Pricing Systems</Text>
                    </>
                  )}
                </>
              )}
            </View>

          </View>
        </View>
      </Page>
    </Document>
  );
}
