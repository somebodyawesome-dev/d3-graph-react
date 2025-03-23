type RelationshipType = "Dated" | "Married" | "Engaged" | "Hookup/Fling";

interface Character {
  id: number;
  name: string;
}

interface Relationship {
  source: number;
  target: number;
  type: RelationshipType;
}

const characters: Character[] = [
  { id: 1, name: "Jim Halpert" },
  { id: 2, name: "Pam Beesly" },
  { id: 3, name: "Dwight Schrute" },
  { id: 4, name: "Angela Martin" },
  { id: 5, name: "Michael Scott" },
  { id: 6, name: "Holly Flax" },
  { id: 7, name: "Kelly Kapoor" },
  { id: 8, name: "Ryan Howard" },
  { id: 9, name: "Andy Bernard" },
  { id: 10, name: "Jan Levinson" },
  { id: 11, name: "Helene Beesly" },
  { id: 12, name: "Erin Hannon" },
  { id: 13, name: "Darryl Philbin" },
  { id: 14, name: "Stanley Hudson" },
  { id: 15, name: "Cynthia" },
  { id: 16, name: "Phyllis Vance" },
  { id: 17, name: "Bob Vance" },
  { id: 18, name: "Oscar Martinez" },
  { id: 19, name: "Gil" },
  { id: 20, name: "Meredith Palmer" },
  { id: 21, name: "Creed Bratton" },
  { id: 22, name: "The Senator" },
];

const relationships: Relationship[] = [
  { source: 1, target: 2, type: "Married" },
  { source: 3, target: 4, type: "Engaged" },
  { source: 5, target: 6, type: "Married" },
  { source: 7, target: 8, type: "Dated" },
  { source: 9, target: 4, type: "Engaged" },
  { source: 5, target: 10, type: "Dated" },
  { source: 5, target: 11, type: "Dated" },
  { source: 8, target: 12, type: "Hookup/Fling" },
  { source: 13, target: 7, type: "Dated" },
  { source: 14, target: 15, type: "Married" },
  { source: 16, target: 17, type: "Married" },
  { source: 18, target: 19, type: "Dated" },
  { source: 20, target: 21, type: "Hookup/Fling" },
  { source: 4, target: 22, type: "Married" },
];

export { characters, relationships };
