type RelationshipType = "Dated" | "Married" | "Engaged" | "Hookup/Fling";

interface Character {
  id: number;
  name: string;
  image: string;
}

interface Relationship {
  source: number; // character id (mapped to array index in the Playground)
  target: number; // character id
  type: RelationshipType;
  color: string;
}

const COLORS: Record<RelationshipType, string> = {
  Married: "#e91e63",
  Engaged: "#2196f3",
  Dated: "#4caf50",
  "Hookup/Fling": "#ff9800",
};

const characters: Character[] = [
  { id: 0, name: "Jim Halpert", image: "jim-halpert.jpg" },
  { id: 1, name: "Pam Beesly", image: "Pam-Beesly.jpg" },
  { id: 2, name: "Dwight Schrute", image: "Dwight-Schrute.jpg" },
  { id: 3, name: "Angela Martin", image: "Angela-Martin.jpg" },
  { id: 4, name: "Michael Scott", image: "Michael-Scott.jpg" },
  { id: 5, name: "Holly Flax", image: "Holly-Flax.jpg" },
  { id: 6, name: "Kelly Kapoor", image: "Kelly-Kapoor.jpg" },
  { id: 7, name: "Ryan Howard", image: "Ryan-Howard.jpg" },
  { id: 8, name: "Andy Bernard", image: "Andy-Bernard.jpg" },
  { id: 9, name: "Jan Levinson", image: "Jan-Levinson.jpg" },
  { id: 10, name: "Helene Beesly", image: "Helene-Beesly.jpg" },
  { id: 11, name: "Erin Hannon", image: "Erin-Hannon.jpg" },
  { id: 12, name: "Darryl Philbin", image: "Darryl-Philbin.jpg" },
  { id: 13, name: "Stanley Hudson", image: "Stanley-Hudson.jpg" },
  { id: 14, name: "Cynthia", image: "Cynthia.jpg" },
  { id: 15, name: "Phyllis Vance", image: "Phyllis-Vance.jpg" },
  { id: 16, name: "Bob Vance", image: "Bob-Vance.jpg" },
  { id: 17, name: "Oscar Martinez", image: "Oscar-Martinez.jpg" },
  { id: 18, name: "Gil", image: "Gil.jpg" },
  { id: 19, name: "Meredith Palmer", image: "Meredith-Palmer.jpg" },
  { id: 20, name: "Creed Bratton", image: "Creed-Bratton.jpg" },
  { id: 21, name: "Senator Robert Lipton", image: "The-Senator.jpg" },
  { id: 22, name: "Jessica", image: "Jessica.jpg" },
  { id: 23, name: "Roy Anderson", image: "Roy-Anderson.jpg" },
  { id: 24, name: "Karen Filippelli", image: "Karen-Filippelli.jpg" },
  { id: 25, name: "Danny Cordray", image: "Danny-Cordray.jpg" },
  { id: 26, name: "Donna Newton", image: "Donna-Newton.jpg" },
  { id: 27, name: "Isabel Poreba", image: "Isabel.jpg" },
  { id: 28, name: "Val Johnson", image: "Val-Johnson.jpg" },
  { id: 29, name: "Pete Miller", image: "Pete-Miller.jpg" },
  { id: 30, name: "Esther Bruegger", image: "Esther.jpg" },
  { id: 31, name: "Gabe Lewis", image: "Gabe-Lewis.jpg" },
];

const rel = (
  source: number,
  target: number,
  type: RelationshipType
): Relationship => ({ source, target, type, color: COLORS[type] });

const relationships: Relationship[] = [
  // Jim & Pam's circle
  rel(0, 1, "Married"), // Jim — Pam
  rel(0, 24, "Dated"), // Jim — Karen (S3)
  rel(23, 1, "Engaged"), // Roy — Pam (S1–S3)
  rel(1, 25, "Dated"), // Pam — Danny Cordray (a couple of dates, revealed in "The Sting")

  // Dwight & Angela's circle
  rel(2, 3, "Married"), // Dwight — Angela (married in the finale)
  rel(2, 27, "Hookup/Fling"), // Dwight — Isabel (Niagara wedding)
  rel(2, 30, "Dated"), // Dwight — Esther (S9)
  rel(8, 3, "Engaged"), // Andy — Angela (S5)
  rel(3, 21, "Married"), // Angela — the Senator
  rel(17, 21, "Hookup/Fling"), // Oscar — the Senator (the S9 affair)

  // Michael's love life
  rel(4, 5, "Married"), // Michael — Holly
  rel(4, 9, "Dated"), // Michael — Jan
  rel(4, 10, "Dated"), // Michael — Helene, Pam's mom ("Double Date")
  rel(4, 26, "Hookup/Fling"), // Michael — Donna (she was married)

  // The annex and the warehouse
  rel(6, 7, "Dated"), // Kelly — Ryan
  rel(7, 11, "Hookup/Fling"), // Ryan — Erin (brief, secret)
  rel(12, 6, "Dated"), // Darryl — Kelly
  rel(12, 28, "Dated"), // Darryl — Val (S8)

  // Erin's suitors
  rel(8, 11, "Dated"), // Andy — Erin (S7–S9)
  rel(31, 11, "Dated"), // Gabe — Erin (S7)
  rel(11, 29, "Dated"), // Erin — Pete (S9)

  // The rest of the office
  rel(13, 14, "Hookup/Fling"), // Stanley — Cynthia (his affair; his wife was Teri)
  rel(15, 16, "Married"), // Phyllis — Bob Vance, Vance Refrigeration
  rel(17, 18, "Dated"), // Oscar — Gil
  rel(19, 20, "Hookup/Fling"), // Meredith — Creed
  rel(8, 22, "Dated"), // Andy — Jessica (S8)
];

export { characters, relationships };
