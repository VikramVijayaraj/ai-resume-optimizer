import { StyleSheet, Font } from "@react-pdf/renderer";

// Register the font
Font.register({
  family: "Lato",
  fonts: [
    {
      src: "/fonts/Lato/Lato-Regular.ttf",
      fontWeight: "normal",
      fontStyle: "normal",
    },
    {
      src: "/fonts/Lato/Lato-Bold.ttf",
      fontWeight: "bold",
      fontStyle: "normal",
    },
    {
      src: "/fonts/Lato/Lato-Italic.ttf",
      fontWeight: "normal",
      fontStyle: "italic",
    },
    {
      src: "/fonts/Lato/Lato-BoldItalic.ttf",
      fontWeight: "bold",
      fontStyle: "italic",
    },
  ],
});

export const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: "#FFFFFF",
    fontFamily: "Lato",
    fontSize: 11,
    lineHeight: 1.5,
    color: "#222222",
  },

  divider: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#CCCCCC",
    marginVertical: 12,
  },

  // Header
  headerContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginBottom: 20,
    alignItems: "center",
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
    // marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 8,
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
