import { StyleSheet, Font } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: "#FFFFFF",
    fontFamily: "Helvetica",
    fontSize: 11,
    lineHeight: 1.5,
    color: "#222222",
  },
  
  // Header
  headerContainer: {
    marginBottom: 20,
    alignItems: "center", // Centered header like the source
    borderBottomWidth: 1, // Optional: Adds a clean separation like many modern resumes
    borderBottomColor: "#EEEEEE",
    paddingBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold", // Helvetica-Bold
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  contactInfo: {
    fontSize: 9,
    color: "#555555",
    marginTop: 2,
  },

  // Section General
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    paddingBottom: 2,
    letterSpacing: 0.5,
  },

  // Content Text
  paragraph: {
    fontSize: 10,
    textAlign: "justify",
    lineHeight: 1.6,
  },

  // Experience / Education Items
  itemContainer: {
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 1,
  },
  role: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#000000",
  },
  company: {
    fontSize: 10,
    fontStyle: "italic", // Helvetica-Oblique
    color: "#444444",
    marginBottom: 4,
  },
  date: {
    fontSize: 10,
    color: "#444444",
    textAlign: "right",
  },
  location: {
    fontSize: 10,
    color: "#666666",
    fontStyle: "italic",
  },

  // Bullet Points
  bulletContainer: {
    marginLeft: 8,
  },
  bulletRow: {
    flexDirection: "row",
    marginBottom: 2,
  },
  bulletPoint: {
    width: 10,
    fontSize: 10,
    marginTop: 1, // Align with text
  },
  bulletText: {
    fontSize: 10,
    flex: 1,
    lineHeight: 1.4,
  },
});