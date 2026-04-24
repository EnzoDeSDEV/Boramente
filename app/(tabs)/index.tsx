import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.bgOrbTop} />
      <View style={styles.bgOrbBottom} />

      <View style={styles.heroCard}>
        <Text style={styles.kicker}>Culture G</Text>
        <Text style={styles.title}>Boramente</Text>
        <Text style={styles.subtitle}>Teste ta culture generale en groupe.</Text>
      </View>

      <Pressable
        onPress={() => router.push("/AddPlayer")}
        style={({ pressed }) => [styles.startButton, pressed && styles.buttonPressed]}
      >
        <Text style={styles.startButtonText}>Commencer une partie</Text>
      </Pressable>

      <Text style={styles.helperText}>Ajoute les joueurs puis lance les questions.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b1020",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 22,
  },
  bgOrbTop: {
    position: "absolute",
    width: 270,
    height: 270,
    borderRadius: 135,
    backgroundColor: "#1e3a8a",
    opacity: 0.24,
    top: -70,
    right: -90,
  },
  bgOrbBottom: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "#0f766e",
    opacity: 0.18,
    bottom: -80,
    left: -70,
  },
  heroCard: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: "#111a33",
    borderWidth: 1,
    borderColor: "#263560",
    borderRadius: 22,
    padding: 22,
    marginBottom: 18,
  },
  kicker: {
    color: "#7dd3fc",
    textTransform: "uppercase",
    letterSpacing: 1,
    fontWeight: "700",
    fontSize: 12,
    marginBottom: 10,
  },
  title: {
    color: "#f8fafc",
    fontSize: 42,
    lineHeight: 46,
    fontWeight: "800",
    marginBottom: 10,
  },
  subtitle: {
    color: "#cbd5e1",
    fontSize: 16,
    lineHeight: 22,
  },
  startButton: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: "#22c55e",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },
  startButtonText: {
    color: "#052e16",
    fontSize: 16,
    fontWeight: "800",
  },
  helperText: {
    color: "#93c5fd",
    marginTop: 12,
    fontSize: 13,
  },
  buttonPressed: {
    opacity: 0.86,
    transform: [{ scale: 0.985 }],
  },
});
