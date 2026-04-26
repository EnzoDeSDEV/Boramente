import { router } from "expo-router";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Fragment, useState } from "react";

type Category = {
  label: string;
  value?: string;
  description: string;
};

const difficulties = [
  { label: "Facile", value: "facile" },
  { label: "Moyen", value: "normal" },
  { label: "Difficile", value: "difficile" },
];

const categoryGroups = [
  {
    title: "Mode general",
    categories: [
      {
        label: "Classique",
        value: undefined,
        description: "Tous les themes",
      },
    ],
  },
  {
    title: "Mode Annexe",
    categories: [
      {
        label: "Culture generale",
        value: "culture_general",
        description: "Questions variees",
      },
      {
        label: "Jeux video",
        value: "jeux_videos",
        description: "Consoles et licences",
      },
      {
        label: "Cinema",
        value: "tv_cinema",
        description: "Films et acteurs",
      },
      {
        label: "Musique",
        value: "musique",
        description: "Artistes et hits",
      },
      {
        label: "Science",
        value: "science",
        description: "Decouvertes et formules",
      },
      {
        label: "Geographie",
        value: "geographie",
        description: "Pays et capitales",
      },
      {
        label: "Art / Litterature",
        value: "art_litterature",
        description: "Oeuvres et auteurs",
      },
      {
        label: "Sport",
        value: "sport",
        description: "Clubs et competitions",
      },
      {
        label: "Politique",
        value: "actu_politique",
        description: "Actu et institutions",
      },
    ],
  },
];

export default function SelectMode() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bgOrbTop} />
      <View style={styles.bgOrbBottom} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.kicker}>Mode de jeu</Text>
          <Text style={styles.title}>Choisis une categorie</Text>
          <Text style={styles.subtitle}>
            Selectionne un theme, puis ajoute les joueurs.
          </Text>
        </View>

        <View style={styles.groupList}>
          {categoryGroups.map((group) => (
            <View key={group.title} style={styles.group}>
              <Text style={styles.groupTitle}>{group.title}</Text>

              <View style={styles.modeGrid}>
                {group.categories.map((category) => (
                  <Fragment key={category.label}>
                    <Pressable
                      onPress={() => setSelectedCategory(category)}
                      style={({ pressed }) => [
                        styles.modeButton,
                        category.label === "Classique" && styles.btonPrinciapl,
                        selectedCategory?.label === category.label &&
                          styles.modeButtonSelected,
                        pressed && styles.buttonPressed,
                      ]}
                    >
                      <Text style={styles.modeTitle}>{category.label}</Text>
                      <Text style={styles.modeDescription}>
                        {category.description}
                      </Text>
                    </Pressable>

                    {selectedCategory?.label === category.label ? (
                      <View style={styles.difficultyPanel}>
                        <Text style={styles.difficultyTitle}>
                          Difficulte pour {selectedCategory.label}
                        </Text>

                        <View style={styles.difficultyRow}>
                          {difficulties.map((difficulty) => (
                            <Pressable
                              key={difficulty.value}
                              onPress={() =>
                                router.push({
                                  pathname: "/AddPlayer",
                                  params: {
                                    ...(selectedCategory.value
                                      ? { category: selectedCategory.value }
                                      : {}),
                                    difficulty: difficulty.value,
                                  },
                                })
                              }
                              style={({ pressed }) => [
                                styles.difficultyButton,
                                pressed && styles.buttonPressed,
                              ]}
                            >
                              <Text style={styles.difficultyText}>
                                {difficulty.label}
                              </Text>
                            </Pressable>
                          ))}
                        </View>
                      </View>
                    ) : null}
                  </Fragment>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b1020",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 18,
    paddingTop: 24,
    paddingBottom: 28,
  },
  bgOrbTop: {
    position: "absolute",
    width: 230,
    height: 230,
    borderRadius: 115,
    backgroundColor: "#1e3a8a",
    opacity: 0.24,
    top: -70,
    right: -90,
  },
  bgOrbBottom: {
    position: "absolute",
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: "#0f766e",
    opacity: 0.18,
    bottom: -70,
    left: -70,
  },
  header: {
    width: "100%",
    maxWidth: 390,
    alignSelf: "center",
    marginBottom: 18,
  },
  kicker: {
    color: "#7dd3fc",
    textTransform: "uppercase",
    letterSpacing: 1,
    fontWeight: "700",
    fontSize: 11,
    marginBottom: 8,
  },
  title: {
    color: "#f8fafc",
    fontSize: 29,
    lineHeight: 33,
    fontWeight: "800",
    marginBottom: 8,
  },
  subtitle: {
    color: "#cbd5e1",
    fontSize: 14,
    lineHeight: 20,
  },
  groupList: {
    width: "100%",
    maxWidth: 390,
    alignSelf: "center",
    gap: 18,
  },
  group: {
    gap: 9,
  },
  groupTitle: {
    color: "#93c5fd",
    fontSize: 13,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  modeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  modeButton: {
    width: "48.5%",
    minHeight: 76,
    backgroundColor: "#111a33",
    borderWidth: 1,
    borderColor: "#263560",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 11,
    justifyContent: "center",
  },
  modeButtonSelected: {
    backgroundColor: "#122f3a",
    borderColor: "#5eead4",
  },
  modeTitle: {
    color: "#f8fafc",
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 4,
  },
  modeDescription: {
    color: "#cbd5e1",
    fontSize: 11,
    lineHeight: 15,
  },
  buttonPressed: {
    opacity: 0.86,
    transform: [{ scale: 0.985 }],
  },
  btonPrinciapl: {
    width: "100%",
    minHeight: 80,
    alignItems: "center",
    backgroundColor: "#16a34a",
    borderColor: "#86efac",
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  difficultyPanel: {
    width: "100%",
    backgroundColor: "#111a33",
    borderWidth: 1,
    borderColor: "#263560",
    borderRadius: 14,
    padding: 14,
  },
  difficultyTitle: {
    color: "#f8fafc",
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 10,
  },
  difficultyRow: {
    flexDirection: "row",
    gap: 8,
  },
  difficultyButton: {
    flex: 1,
    backgroundColor: "#0f766e",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  difficultyText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "800",
  },
});
