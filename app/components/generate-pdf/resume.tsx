import { Page, Text, View, Document } from "@react-pdf/renderer";
import { styles } from "./style";

const BulletPoint = ({ text }: { text: string }) => (
  <View style={styles.bulletRow}>
    <Text style={styles.bulletPoint}>•</Text>
    <Text style={styles.bulletText}>{text}</Text>
  </View>
);

export default function Resume({ data }: { data: any }) {
  if (!data) return null;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* HEADER */}
        <View style={styles.headerContainer}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.contactInfo}>
            {data.email} | {data.phone}
          </Text>
          {data.website && (
            <Text style={styles.contactInfo}>{data.website}</Text>
          )}
        </View>

        {/* SUMMARY */}
        {data.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.paragraph}>{data.summary}</Text>
          </View>
        )}

        {/* SKILLS */}
        {data.skills && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <Text style={styles.paragraph}>
              {Array.isArray(data.skills)
                ? data.skills.join(", ")
                : data.skills}
            </Text>
          </View>
        )}

        {/* WORK EXPERIENCE */}
        {data.experience && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {data.experience.map((job: any, index: number) => (
              <View key={index} style={styles.itemContainer}>
                {/* Row 1: Role & Date */}
                <View style={styles.row}>
                  <Text style={styles.role}>{job.role}</Text>
                  <Text style={styles.date}>{job.date}</Text>
                </View>

                {/* Row 2: Company */}
                <View style={styles.row}>
                  <Text style={styles.company}>{job.company}</Text>
                </View>

                {/* Bullets */}
                <View style={styles.bulletContainer}>
                  {job.points?.map((point: string, i: number) => (
                    <BulletPoint key={i} text={point} />
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* EDUCATION */}
        {data.education && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu: any, index: number) => (
              <View key={index} style={styles.itemContainer}>
                <View style={styles.row}>
                  <Text style={styles.role}>{edu.degree}</Text>
                  <Text style={styles.date}>{edu.date}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.company}>{edu.school}</Text>
                  {edu.location && (
                    <Text style={styles.location}>{edu.location}</Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
