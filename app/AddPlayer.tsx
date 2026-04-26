import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function ModalScreen() {
  const [name, setName] = useState("");
  const [player, setPlayer] = useState<string[]>([]);

  const addPlayer = () => {
    const cleaned = name.trim();
    if (!cleaned) return;
    setPlayer((player) => [...player, cleaned]);
    setName("");
  };

  const { category, difficulty } = useLocalSearchParams<{
    category?: string;
    difficulty?: string;
  }>();

  const deletePlayer = (indexToRemove: number) => {
    setPlayer((player) => player.filter((_, index) => index !== indexToRemove));
  };

  return (
    <View style={styles.container}>
      <View style={styles.bgOrbTop} />
      <View style={styles.bgOrbBottom} />

      <Text style={styles.title}>Ajoute des joueurs</Text>
      <Text style={styles.subtitle}>Tape un nom puis clique sur Ajouter.</Text>

      <View style={styles.inputRow}>
        <TextInput
          placeholder="Nom du joueur"
          placeholderTextColor="#94a3b8"
          style={styles.input}
          onChangeText={setName}
          value={name}
          onSubmitEditing={addPlayer}
        />

        <Pressable
          onPress={addPlayer}
          style={({ pressed }) => [styles.addButton, pressed && styles.buttonPressed]}
        >
          <Text style={styles.addButtonText}>Ajouter</Text>
        </Pressable>
      </View>

      <Text style={styles.helperText}>
        Ajoute les joueurs puis lance les questions.
      </Text>

      <View style={styles.list}>
        {player.length === 0 ? (
          <Text style={styles.emptyText}>Aucun joueur pour le moment.</Text>
        ) : null}

        {player.map((p, i) => (
          <View key={`${p}-${i}`} style={styles.playerRow}>
            <Text style={styles.playerName}>{p}</Text>
            <Pressable
              onPress={() => deletePlayer(i)}
              style={({ pressed }) => [styles.deleteButton, pressed && styles.buttonPressed]}
            >
              <Text style={styles.deleteButtonText}>Supprimer</Text>
            </Pressable>
          </View>
        ))}

        <Pressable
          onPress={() =>
            router.push({
              pathname: "/Question",
              params: { 
                category,
                difficulty,
                player: JSON.stringify(player) },
            })
          }
          disabled={player.length === 0}
          style={({ pressed }) => [
            styles.startButton,
            pressed && styles.buttonPressed,
            player.length === 0 && styles.buttonDisabled,
          ]}
        >
          <Text style={styles.startButtonText}>Lancer les questions</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b1020",
    paddingHorizontal: 20,
    paddingTop: 56,
  },
  bgOrbTop: {
    position: "absolute",
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "#1e3a8a",
    opacity: 0.2,
    top: -70,
    right: -80,
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
  title: {
    color: "#dbeafe",
    fontSize: 30,
    fontWeight: "800",
  },
  subtitle: {
    color: "#cbd5e1",
    marginTop: 8,
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "#111a33",
    borderWidth: 1,
    borderColor: "#263560",
    color: "#ffffff",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  addButton: {
    backgroundColor: "#22c55e",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  addButtonText: {
    color: "#052e16",
    fontWeight: "700",
  },
  list: {
    marginTop: 18,
    gap: 10,
  },
  emptyText: {
    color: "#93c5fd",
    fontStyle: "italic",
  },
  playerRow: {
    backgroundColor: "#111a33",
    borderWidth: 1,
    borderColor: "#263560",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  playerName: {
    color: "#f8fafc",
    fontSize: 16,
    fontWeight: "600",
  },
  deleteButton: {
    backgroundColor: "#ef4444",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  deleteButtonText: {
    color: "#ffffff",
    fontWeight: "600",
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.985 }],
  },
  startButton: {
    marginTop: 8,
    backgroundColor: "#dbeafe",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  startButtonText: {
    color: "#1e3a8a",
    fontWeight: "800",
  },
  buttonDisabled: {
    opacity: 0.45,
  },
    helperText: {
    color: "#93c5fd",
    width: "100%",
    maxWidth: 380,
    alignSelf: "center",
    marginTop: 14,
    fontSize: 13,
    textAlign: "center",
    }
});
