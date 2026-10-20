import type { Section } from "../types";

// Original sample tasks written in the telc B1 format. Replace or extend with
// your own content; keep `solution` and `explanation` server-side.

const sprachbausteine: Section = {
  certSlug: "telc-b1",
  sectionSlug: "sprachbausteine",
  title: "Sprachbausteine",
  level: "B1",
  skill: "reading",
  mode: "interactive",
  description:
    "Grammar and vocabulary in context. Teil 1: choose a, b or c for each gap. Teil 2: fill the gaps from a word bank, using each word once.",
  units: [
    {
      teilNumber: 1,
      instructions:
        "Lesen Sie den Text und entscheiden Sie, welches Wort (a, b oder c) in die Lücken 21–25 passt.",
      estimatedTimeSec: 600,
      contexts: [
        {
          kind: "text",
          content:
            "Lieber Jonas,\n\nvielen Dank für deine Nachricht! Entschuldige, __(21)__ ich erst heute antworte. Seit zwei Wochen wohne ich jetzt in Hamburg, und es gefällt __(22)__ hier sehr gut. Meine neue Wohnung liegt direkt __(23)__ Park, deshalb gehe ich morgens oft joggen. Die Arbeit ist interessant, __(24)__ manchmal auch ziemlich anstrengend.\n\nHast du Lust, mich im Sommer zu besuchen? Dann zeige ich __(25)__ den Hafen und wir essen zusammen Fischbrötchen.\n\nViele Grüße\nAnna",
        },
      ],
      questions: [
        {
          qid: "t1-q21",
          order: 21,
          choices: [
            { label: "a", text: "dass" },
            { label: "b", text: "weil" },
            { label: "c", text: "ob" },
          ],
          solution: "a",
          explanation:
            "\"Entschuldige, dass …\" — the verb entschuldigen is followed by a dass-clause stating what you apologise for. \"weil\" would give a reason, \"ob\" introduces an indirect yes/no question.",
        },
        {
          qid: "t1-q22",
          order: 22,
          choices: [
            { label: "a", text: "mich" },
            { label: "b", text: "mir" },
            { label: "c", text: "ich" },
          ],
          solution: "b",
          explanation: "gefallen takes the dative: \"Es gefällt mir.\"",
        },
        {
          qid: "t1-q23",
          order: 23,
          choices: [
            { label: "a", text: "am" },
            { label: "b", text: "im" },
            { label: "c", text: "zum" },
          ],
          solution: "a",
          explanation:
            "\"direkt am Park\" = right next to the park (an + dem, location → dative). \"im Park\" would mean inside the park, \"zum Park\" is a direction.",
        },
        {
          qid: "t1-q24",
          order: 24,
          choices: [
            { label: "a", text: "aber" },
            { label: "b", text: "denn" },
            { label: "c", text: "oder" },
          ],
          solution: "a",
          explanation: "The two halves contrast (interesting vs. tiring), so the connector is \"aber\".",
        },
        {
          qid: "t1-q25",
          order: 25,
          choices: [
            { label: "a", text: "dich" },
            { label: "b", text: "dir" },
            { label: "c", text: "du" },
          ],
          solution: "b",
          explanation:
            "zeigen has a dative person and an accusative thing: \"Ich zeige dir (Dat.) den Hafen (Akk.).\"",
        },
      ],
    },
    {
      teilNumber: 2,
      instructions:
        "Lesen Sie den Text und entscheiden Sie, welches Wort (a–h) in die Lücken 31–35 passt. Sie können jedes Wort nur einmal verwenden.",
      estimatedTimeSec: 600,
      contexts: [
        {
          kind: "text",
          content:
            "Liebe Mitglieder,\n\nam Samstag, den 14. Juni, feiern wir unser Sommerfest. Wir beginnen __(31)__ 14 Uhr auf dem Sportplatz. Für Kinder gibt es Spiele, und am Abend spielt eine Band. Wer einen Kuchen mitbringen möchte, meldet sich bitte __(32)__ Frau Berger. Wir freuen uns auch, __(33)__ ihr eure Familien und Freunde mitbringt. Falls es regnet, findet das Fest in der Halle __(34)__. Wir hoffen, dass möglichst viele von __(35)__ kommen!\n\nEuer Vorstand",
        },
      ],
      bank: [
        { label: "a", text: "um" },
        { label: "b", text: "bei" },
        { label: "c", text: "wenn" },
        { label: "d", text: "statt" },
        { label: "e", text: "euch" },
        { label: "f", text: "am" },
        { label: "g", text: "mit" },
        { label: "h", text: "ob" },
      ],
      questions: [
        { qid: "t2-q31", order: 31, choices: [], solution: "a", explanation: "Clock times take \"um\": um 14 Uhr." },
        { qid: "t2-q32", order: 32, choices: [], solution: "b", explanation: "sich bei jemandem melden = to contact someone." },
        {
          qid: "t2-q33",
          order: 33,
          choices: [],
          solution: "c",
          explanation: "\"Wir freuen uns, wenn …\" — a condition we would be happy about. \"ob\" needs a real yes/no question.",
        },
        { qid: "t2-q34", order: 34, choices: [], solution: "d", explanation: "Separable verb stattfinden: \"Das Fest findet in der Halle statt.\"" },
        { qid: "t2-q35", order: 35, choices: [], solution: "e", explanation: "von takes the dative; the plural informal \"ihr\" becomes \"euch\"." },
      ],
    },
  ],
};

const leseverstehen: Section = {
  certSlug: "telc-b1",
  sectionSlug: "leseverstehen",
  title: "Leseverstehen",
  level: "B1",
  skill: "reading",
  mode: "interactive",
  description: "Reading comprehension. Teil 2: read a newspaper article and answer the multiple-choice questions.",
  units: [
    {
      teilNumber: 2,
      instructions: "Lesen Sie den Text und die Aufgaben 6–8. Welche Lösung (a, b oder c) ist jeweils richtig?",
      estimatedTimeSec: 900,
      contexts: [
        {
          kind: "text",
          label: "Reparieren statt wegwerfen",
          content:
            "In vielen deutschen Städten gibt es inzwischen sogenannte Repair-Cafés. Dort treffen sich einmal im Monat Menschen, die kaputte Dinge nicht einfach wegwerfen wollen. Ehrenamtliche Helferinnen und Helfer – oft Rentner mit viel Erfahrung – zeigen den Besuchern, wie man Toaster, Fahrräder oder Kleidung selbst repariert. Geld kostet das nicht, aber viele Gäste geben eine kleine Spende für Kaffee und Kuchen.\n\n„Es geht nicht nur ums Sparen“, sagt Martina Kohl, die das Repair-Café in Freiburg organisiert. „Die Leute lernen etwas Neues und kommen miteinander ins Gespräch.“ Nicht jedes Gerät kann gerettet werden: Bei etwa einem Drittel fehlen Ersatzteile. Trotzdem ist Kohl zufrieden. Im letzten Jahr hat ihr Team fast 600 Gegenstände repariert.",
        },
      ],
      questions: [
        {
          qid: "t2-q6",
          order: 6,
          prompt: "In einem Repair-Café …",
          choices: [
            { label: "a", text: "reparieren Profis die Geräte gegen Bezahlung." },
            { label: "b", text: "lernen Besucher, Dinge selbst zu reparieren." },
            { label: "c", text: "kann man gebrauchte Geräte kaufen." },
          ],
          solution: "b",
          explanation:
            "Volunteers \"zeigen den Besuchern, wie man … selbst repariert\". It is free (\"Geld kostet das nicht\"), and nothing is sold.",
        },
        {
          qid: "t2-q7",
          order: 7,
          prompt: "Für Martina Kohl ist besonders wichtig, dass …",
          choices: [
            { label: "a", text: "die Besucher Geld sparen." },
            { label: "b", text: "möglichst viele Geräte gerettet werden." },
            { label: "c", text: "Menschen etwas lernen und sich unterhalten." },
          ],
          solution: "c",
          explanation:
            "\"Es geht nicht nur ums Sparen … Die Leute lernen etwas Neues und kommen miteinander ins Gespräch.\" Option a is the distractor she explicitly plays down.",
        },
        {
          qid: "t2-q8",
          order: 8,
          prompt: "Etwa ein Drittel der Gegenstände …",
          choices: [
            { label: "a", text: "kann man nicht reparieren, weil Teile fehlen." },
            { label: "b", text: "wird an andere Besucher verschenkt." },
            { label: "c", text: "repariert das Team im nächsten Jahr." },
          ],
          solution: "a",
          explanation: "\"Bei etwa einem Drittel fehlen Ersatzteile\" — spare parts are missing, so they can't be saved.",
        },
      ],
    },
  ],
};

const hoerverstehen: Section = {
  certSlug: "telc-b1",
  sectionSlug: "hoerverstehen",
  title: "Hörverstehen",
  level: "B1",
  skill: "listening",
  mode: "interactive",
  description: "Listening comprehension. Teil 1: listen to five short statements and decide whether each sentence is true or false.",
  units: [
    {
      teilNumber: 1,
      instructions:
        "Sie hören fünf kurze Texte. Entscheiden Sie beim Hören, ob die Aussagen 41–45 richtig (+) oder falsch (–) sind.",
      estimatedTimeSec: 480,
      contexts: [
        {
          kind: "audio",
          label: "Audio",
          // No recording yet: the player falls back to the browser's German speech synthesis.
          transcript:
            "Nummer 41. Ich fahre jeden Morgen mit dem Fahrrad zur Arbeit, auch im Winter. Nur wenn es richtig stark schneit, nehme ich den Bus.\n\nNummer 42. Am Wochenende koche ich gern für meine Freunde. Meistens probiere ich neue Rezepte aus, obwohl das nicht immer klappt.\n\nNummer 43. Ich lese abends lieber ein Buch, als fernzusehen. Leider bin ich oft so müde, dass ich schon nach zwei Seiten einschlafe.\n\nNummer 44. Seit einem Jahr lerne ich Spanisch in einem Kurs an der Volkshochschule. Der Kurs ist günstig, aber die Gruppe ist ziemlich groß.\n\nNummer 45. Mein Sohn möchte unbedingt einen Hund haben. Wir wohnen aber in einer kleinen Wohnung im vierten Stock, deshalb haben wir uns noch nicht entschieden.",
        },
      ],
      questions: [
        { qid: "t1-q41", order: 41, prompt: "Die Person fährt bei jedem Wetter mit dem Fahrrad zur Arbeit.", solution: "-", explanation: "When it snows heavily, the speaker takes the bus." },
        { qid: "t1-q42", order: 42, prompt: "Die Person probiert am Wochenende oft neue Rezepte aus.", solution: "+", explanation: "\"Meistens probiere ich neue Rezepte aus.\"" },
        { qid: "t1-q43", order: 43, prompt: "Die Person liest abends viele Seiten.", solution: "-", explanation: "The speaker falls asleep after two pages." },
        { qid: "t1-q44", order: 44, prompt: "Die Person findet den Spanischkurs preiswert.", solution: "+", explanation: "\"Der Kurs ist günstig\" — günstig = preiswert." },
        { qid: "t1-q45", order: 45, prompt: "Die Familie hat schon einen Hund.", solution: "-", explanation: "They haven't decided yet (\"noch nicht entschieden\")." },
      ].map((q) => ({
        ...q,
        choices: [
          { label: "+", text: "Richtig" },
          { label: "-", text: "Falsch" },
        ],
      })),
    },
  ],
};

const schreiben: Section = {
  certSlug: "telc-b1",
  sectionSlug: "schreiben",
  title: "Schriftlicher Ausdruck",
  level: "B1",
  skill: "writing",
  mode: "prompt",
  description: "Writing. Answer a personal email and cover all four guiding points (Leitpunkte).",
  units: [
    {
      teilNumber: 1,
      instructions: "Sie haben diese E-Mail von Ihrem Freund Paul bekommen.",
      estimatedTimeSec: 1800,
      contexts: [
        {
          kind: "text",
          label: "E-Mail",
          content:
            "Hallo,\n\nich habe endlich eine neue Wohnung gefunden! Sie ist größer als meine alte und hat sogar einen Balkon. Am nächsten Samstag ziehe ich um, und ich brauche noch Hilfe beim Tragen. Hast du Zeit? Wir fangen um 9 Uhr an, mittags gibt es Pizza für alle.\n\nIch bin ein bisschen nervös, weil ich noch nie selbst umgezogen bin. Hast du einen Tipp für mich?\n\nBis bald\nPaul",
        },
      ],
      questions: [],
      task: {
        instructions: "Schreiben Sie eine Antwort an Paul (circa 80–100 Wörter). Berücksichtigen Sie alle vier Leitpunkte.",
        bulletPoints: [
          "Ob Sie beim Umzug helfen können",
          "Glückwunsch zur neuen Wohnung",
          "Ein Tipp für den Umzug",
          "Ihre eigenen Erfahrungen mit Umzügen",
        ],
        minWords: 80,
      },
    },
  ],
};

export const telcB1Sections: Section[] = [leseverstehen, sprachbausteine, hoerverstehen, schreiben];
