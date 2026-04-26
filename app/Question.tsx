import { useEffect, useMemo, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

type QuizQuestion = {
  question: string;
  answer: string;
};

export default function Questions() {
  const { player,category,difficulty } = useLocalSearchParams<{ 
    player?: string 
    category?: string
    difficulty?: string
  }>();

  const playerList: string[] =
    typeof player === "string" ? JSON.parse(player) : [];

  const capitalizeFirstLetter = (Text:string) => {
    return Text.charAt(0).toUpperCase() + Text.slice(1)
  }

  const randomizedPlayers = useMemo(() => {
    return [...playerList]
      .map((name) => ({ name, rand: Math.random() }))
      .sort((a, b) => a.rand - b.rand)
      .map((item) => item.name);
  }, [player]);

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [ShowAnswer, SetShowAnswer] = useState(false);
  const [CurrentQuestion, SetCurrentQuestion] = useState(0);
  const hasQuestions = questions.length > 0;

  const NextQuestion = () => {
    if (CurrentQuestion < questions.length - 1) {
      SetCurrentQuestion(CurrentQuestion + 1);
      SetShowAnswer(false);
    }
  };

  useEffect(() => {
    const LoadQuestion = async () => {
      try {
        const queryParams = new URLSearchParams();
        if (category) queryParams.set("category", category);
        if (difficulty) queryParams.set("difficulty", difficulty);

        const response = await fetch(
          `https://quizzapi.jomoreschi.fr/api/v2/quiz?${queryParams.toString()}`,
        );
        const data = await response.json();
        setQuestions(data.quizzes ?? []);
      } catch (err) {
        setError("Impossible de charger les questions");
      } finally {
        setLoading(false);
      }
    };
    LoadQuestion();
  }, [category, difficulty]);

  return (
    <View style={styles.container}>
      <View style={styles.bgOrbTop} />
      <View style={styles.bgOrbBottom} />

      <Text style={styles.pageTitle}>
        {category ? capitalizeFirstLetter(category) : 'Classique'}
      </Text>
      <Text style={styles.pageTitle}>Question du tour</Text>

      <View style={styles.containerQuestion}>
        {loading ? (
          <Text style={styles.statusText}>Chargement des questions...</Text>
        ) : error ? (
          <Text style={styles.errorText}>Erreur lors de la récupération des questions</Text>
        ) : (
          <Text style={styles.questionText}>
            {questions[CurrentQuestion]?.question ?? "Aucune question"}
          </Text>
        )}
      </View>

      <View style={styles.actionsRow}>
        <Pressable
          onPress={() => SetShowAnswer(true)}
          disabled={!hasQuestions}
          style={({ pressed }) => [
            styles.buttonPrimary,
            pressed && styles.buttonPressed,
            !hasQuestions && styles.buttonDisabled,
          ]}
        >
          <Text style={styles.buttonPrimaryText}>Voir la réponse</Text>
        </Pressable>

        <Pressable
          onPress={NextQuestion}
          disabled={!hasQuestions || CurrentQuestion >= questions.length - 1}
          style={({ pressed }) => [
            styles.buttonSecondary,
            pressed && styles.buttonPressed,
            (!hasQuestions || CurrentQuestion >= questions.length - 1) &&
              styles.buttonDisabled,
          ]}
        >
          <Text style={styles.buttonSecondaryText}>Question suivante</Text>
        </Pressable>
      </View>

      {ShowAnswer && (
        <View style={styles.answerCard}>
          <Text style={styles.answerLabel}>Reponse</Text>
          <Text style={styles.answerText}>{questions[CurrentQuestion]?.answer}</Text>
        </View>
      )}

      <Text style={styles.playersTitle}>Joueurs</Text>
      <View style={styles.circleZone}>
        {randomizedPlayers.map((name, index) => {
          const angle = (2 * Math.PI * index) / randomizedPlayers.length;
          const x =
            CIRCLE_CENTER + Math.cos(angle) * CIRCLE_RADIUS - BUBBLE_SIZE / 2;
          const y =
            CIRCLE_CENTER + Math.sin(angle) * CIRCLE_RADIUS - BUBBLE_SIZE / 2;

          return (
            <View
              key={`${name}-${index}`}
              style={[
                styles.bubble,
                { left: x, top: y, backgroundColor: BUBBLE_COLORS[index % BUBBLE_COLORS.length] },
              ]}
            >
              <Text style={styles.bubbleText}>{name}</Text>
            </View>
          );
        })}

        {randomizedPlayers.length === 0 ? (
          <Text style={styles.emptyText}>Aucun joueur</Text>
        ) : null}
      </View>
    </View>
  );
}

const CIRCLE_SIZE = 320;
const CIRCLE_CENTER = CIRCLE_SIZE / 2;
const CIRCLE_RADIUS = 115;
const BUBBLE_SIZE = 72;
const BUBBLE_COLORS = ["#0f766e", "#1d4ed8", "#475569", "#be185d", "#7c3aed", "#b45309"];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b1020",
    alignItems: "center",
    paddingTop: 64,
    paddingHorizontal: 20,
  },
  bgOrbTop: {
    position: "absolute",
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: "#1e3a8a",
    opacity: 0.25,
    top: -70,
    right: -80,
  },
  bgOrbBottom: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "#0f766e",
    opacity: 0.2,
    bottom: -70,
    left: -60,
  },
  pageTitle: {
    color: "#dbeafe",
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: 0.3,
    marginBottom: 14,
  },
  circleZone: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    position: "relative",
    marginTop: 10,
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: 1,
    borderColor: "#223056",
    backgroundColor: "#0f172a",
  },
  bubble: {
    position: "absolute",
    width: BUBBLE_SIZE,
    height: BUBBLE_SIZE,
    borderRadius: BUBBLE_SIZE / 2,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
  },
  bubbleText: {
    color: "#ffffff",
    fontWeight: "700",
    textAlign: "center",
    fontSize: 12,
  },
  emptyText: {
    color: "#94a3b8",
    textAlign: "center",
    marginTop: CIRCLE_CENTER - 8,
  },
  containerQuestion: {
    width: "100%",
    minHeight: 120,
    backgroundColor: "#111a33",
    justifyContent: "center",
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#263560",
  },
  statusText: {
    color: "#cbd5e1",
    textAlign: "center",
  },
  errorText: {
    color: "#fca5a5",
    textAlign: "center",
    fontWeight: "600",
  },
  questionText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 28,
    textAlign: "center",
  },
  actionsRow: {
    width: "100%",
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },
  buttonPrimary: {
    flex: 1,
    backgroundColor: "#22c55e",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonPrimaryText: {
    color: "#052e16",
    fontWeight: "800",
  },
  buttonSecondary: {
    flex: 1,
    backgroundColor: "#dbeafe",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonSecondaryText: {
    color: "#1e3a8a",
    fontWeight: "800",
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  buttonDisabled: {
    opacity: 0.45,
  },
  answerCard: {
    width: "100%",
    marginTop: 10,
    backgroundColor: "#0f1c3d",
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 14,
    padding: 12,
  },
  answerLabel: {
    color: "#93c5fd",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  answerText: {
    color: "#ffffff",
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "600",
  },
  playersTitle: {
    color: "#cbd5e1",
    fontWeight: "700",
    marginTop: 14,
    marginBottom: 6,
  },
});
