import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 20,
    borderBottom: '2 solid #2563eb',
    paddingBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 5,
  },
  tagline: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 5,
  },
  contactInfo: {
    fontSize: 10,
    color: '#4b5563',
    marginTop: 5,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 10,
    borderBottom: '1 solid #e5e7eb',
    paddingBottom: 5,
  },
  experienceItem: {
    marginBottom: 15,
  },
  experienceItemCondensed: {
    marginBottom: 8,
  },
  jobTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 3,
  },
  jobTitleCondensed: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 2,
  },
  company: {
    fontSize: 11,
    color: '#2563eb',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  companyCondensed: {
    fontSize: 10,
    color: '#2563eb',
    marginBottom: 2,
  },
  location: {
    fontSize: 9,
    color: '#6b7280',
    marginBottom: 2,
  },
  date: {
    fontSize: 9,
    color: '#6b7280',
    marginBottom: 5,
  },
  description: {
    fontSize: 10,
    color: '#4b5563',
    marginBottom: 5,
    lineHeight: 1.5,
  },
  descriptionCondensed: {
    fontSize: 9,
    color: '#6b7280',
    lineHeight: 1.4,
  },
  achievementsList: {
    marginTop: 5,
  },
  achievement: {
    fontSize: 9,
    color: '#4b5563',
    marginBottom: 3,
    marginLeft: 10,
    lineHeight: 1.4,
  },
  achievementCondensed: {
    fontSize: 8,
    color: '#6b7280',
    marginBottom: 2,
    marginLeft: 10,
  },
  techBadge: {
    fontSize: 8,
    color: '#2563eb',
    backgroundColor: '#dbeafe',
    padding: '3 6',
    marginRight: 5,
    marginBottom: 3,
    borderRadius: 3,
  },
  techContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
    marginBottom: 5,
  },
  educationItem: {
    marginBottom: 12,
  },
  educationDegree: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 2,
  },
  educationInstitution: {
    fontSize: 10,
    color: '#2563eb',
    marginBottom: 2,
  },
  educationDetails: {
    fontSize: 9,
    color: '#6b7280',
  },
  skillsContainer: {
    marginTop: 10,
  },
  skillCategory: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 5,
    marginTop: 8,
  },
  skillItem: {
    fontSize: 9,
    color: '#4b5563',
    marginBottom: 3,
    marginLeft: 10,
  },
  link: {
    color: '#2563eb',
    textDecoration: 'none',
  },
});

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
}

export function CVDocument({ selectedPosition, experiences, education }: CVDocumentProps) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Present';
    const [year, month] = dateString.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[parseInt(month) - 1]} ${year}`;
  };

  const getCondensedDescription = (experience: ExperienceData): string => {
    // Take first 2-3 achievements or description
    if (experience.achievements.length > 0) {
      return experience.achievements.slice(0, 2).join('. ') + '.';
    }
    return experience.description.substring(0, 150) + '...';
  };

  const isMainPosition = (category: string) => {
    return category === selectedPosition;
  };

  const getPositionTitle = () => {
    switch (selectedPosition) {
      case 'software-engineer':
        return 'Software Engineer';
      case 'merchant':
        return 'Sales & Business Development';
      case 'business-consultant':
        return 'Business Consultant';
      default:
        return 'Professional';
    }
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>Krasimir Mihaylov</Text>
          <Text style={styles.tagline}>{getPositionTitle()}</Text>
          <Text style={styles.contactInfo}>
            Email: krasiymihailov@gmail.com | LinkedIn: linkedin.com/in/krasimir-mihailov-301429139
          </Text>
        </View>

        {/* Professional Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.description}>
            {selectedPosition === 'software-engineer'
              ? '10+ years of experience in software engineering, specializing in full-stack development with .NET Core, React, and database technologies. Proven track record of building comprehensive web platforms and enterprise solutions.'
              : selectedPosition === 'merchant'
              ? 'Experienced sales professional and insurance broker with strong focus on B2B and B2C client relationships. Specialized in helping business owners optimize costs and secure financial solutions through strategic insurance planning.'
              : 'Business consultant with extensive experience in process optimization, business model creation, and strategic planning. Expert in helping organizations build efficient workflows and sustainable growth strategies.'}
          </Text>
        </View>

        {/* Work Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Work Experience</Text>

          {experiences.map((exp) => {
            const isMain = isMainPosition(exp.category);

            return (
              <View key={exp.id} style={isMain ? styles.experienceItem : styles.experienceItemCondensed}>
                <Text style={isMain ? styles.jobTitle : styles.jobTitleCondensed}>{exp.position}</Text>
                <Text style={isMain ? styles.company : styles.companyCondensed}>{exp.company}</Text>
                <Text style={styles.location}>{exp.location}</Text>
                <Text style={styles.date}>
                  {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                </Text>

                {isMain ? (
                  <>
                    <Text style={styles.description}>{exp.description}</Text>

                    {exp.website && (
                      <Link src={exp.website} style={styles.link}>
                        <Text style={styles.description}>Website: {exp.website}</Text>
                      </Link>
                    )}

                    {exp.technologies.length > 0 && (
                      <View style={styles.techContainer}>
                        {exp.technologies.map((tech, i) => (
                          <Text key={i} style={styles.techBadge}>{tech}</Text>
                        ))}
                      </View>
                    )}

                    {exp.achievements.length > 0 && (
                      <View style={styles.achievementsList}>
                        {exp.achievements.slice(0, 8).map((achievement, i) => (
                          <Text key={i} style={styles.achievement}>• {achievement}</Text>
                        ))}
                      </View>
                    )}
                  </>
                ) : (
                  <Text style={styles.descriptionCondensed}>
                    {getCondensedDescription(exp)}
                  </Text>
                )}
              </View>
            );
          })}
        </View>

        {/* Education */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {education.map((edu) => (
            <View key={edu.id} style={styles.educationItem}>
              <Text style={styles.educationDegree}>{edu.degree}</Text>
              <Text style={styles.educationInstitution}>{edu.institution}</Text>
              <Text style={styles.educationDetails}>
                {edu.period}{edu.gpa ? ` | GPA: ${edu.gpa}` : ''}
              </Text>
            </View>
          ))}
        </View>

        {/* Programming Skills - Only for Software Engineer */}
        {selectedPosition === 'software-engineer' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Technical Skills</Text>
            <View style={styles.skillsContainer}>
              <Text style={styles.skillCategory}>Main Knowledge</Text>
              <Text style={styles.skillItem}>• C#, Object Oriented Programming, ASP.NET</Text>
              <Text style={styles.skillItem}>• Transact-SQL, MySQL, Entity Framework Core</Text>
              <Text style={styles.skillItem}>• WPF, ReactJS</Text>

              <Text style={styles.skillCategory}>Additional Skills</Text>
              <Text style={styles.skillItem}>• JavaScript, HTML, CSS, Python</Text>
            </View>
          </View>
        )}

        {/* Business Skills - For Merchant and Business Consultant */}
        {(selectedPosition === 'merchant' || selectedPosition === 'business-consultant') && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Key Skills</Text>
            <View style={styles.skillsContainer}>
              {selectedPosition === 'merchant' && (
                <>
                  <Text style={styles.skillCategory}>Sales Skills</Text>
                  <Text style={styles.skillItem}>• B2B and B2C Client Management</Text>
                  <Text style={styles.skillItem}>• Sales Process Development</Text>
                  <Text style={styles.skillItem}>• Client Readiness Assessment</Text>
                  <Text style={styles.skillItem}>• Deal Closing Templates & Strategies</Text>
                </>
              )}

              {selectedPosition === 'business-consultant' && (
                <>
                  <Text style={styles.skillCategory}>Business Consulting</Text>
                  <Text style={styles.skillItem}>• Business Process Optimization</Text>
                  <Text style={styles.skillItem}>• Task Priority Assessment Systems</Text>
                  <Text style={styles.skillItem}>• Product Portfolio Development</Text>
                  <Text style={styles.skillItem}>• Pricing System Creation</Text>
                  <Text style={styles.skillItem}>• Target Audience Analysis & Sales Channels</Text>
                </>
              )}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
}
