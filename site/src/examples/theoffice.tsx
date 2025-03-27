
type RelationshipType = "Dated" | "Married" | "Engaged" | "Hookup/Fling";

interface Character {
  id: number;
  name: string;
 
  image: string;
}

interface Relationship {
  source: number;
  target: number;
  type: RelationshipType;
  color: string;
}

const characters: Character[] = [
  { id: 0, name: "Jim Halpert", image: "jim-halpert.jpg" },
  { id: 1, name: "Pam Beesly", image: "Pam-Beesly.jpg" },
  { id: 2, name: "Dwight Schrute", image: "Dwight-Schrute.jpg" },
  { id: 3, name: "Angela Martin", image: "Angela-Martin.jpg" },
  { id: 4, name: "Michael Scott", image: "Michael-Scott.jpg" },
  { id: 5, name: "Holly Flax", image: "Holly-Flax.jpg" },
  { id: 6, name: "Kelly Kapoor", image: "Kelly-Kapoor.jpg"},
  { id: 7, name: "Ryan Howard",  image: "Ryan-Howard.jpg" },
  { id: 8, name: "Andy Bernard", image: "Andy-Bernard.jpg" },
  { id: 9, name: "Jan Levinson",image: "Jan-Levinson.jpg" },
  { id: 10, name: "Helene Beesly", image: "Helene-Beesly.jpg"},
  { id: 11, name: "Erin Hannon",  image: "Erin-Hannon.jpg"},
  { id: 12, name: "Darryl Philbin",  image: "Darryl-Philbin.jpg" },
  { id: 13, name: "Stanley Hudson", image: "Stanley-Hudson.jpg"},
  { id: 14, name: "Cynthia",image: "Cynthia.jpg"},
  { id: 15, name: "Phyllis Vance",image: "Phyllis-Vance.jpg" },
  { id: 16, name: "Bob Vance",  image: "Bob-Vance.jpg" },
  { id: 17, name: "Oscar Martinez", image: "Oscar-Martinez.jpg" },
  { id: 18, name: "Gil", image: "Gil.jpg" },
  { id: 19, name: "Meredith Palmer", image: "Meredith-Palmer.jpg" },
  { id: 20, name: "Creed Bratton", image: "Creed-Bratton.jpg" },
  { id: 21, name: "The Senator", image: "The-Senator.jpg" },
];

const relationships: Relationship[] = [
  { source: 0, target: 1, type: "Married", color: "#ffffff" },
  { source: 2, target: 3, type: "Engaged", color: "#2196f3" },
  { source: 4, target: 5, type: "Married", color: "#e91e63" },
  { source: 6, target: 7, type: "Dated", color: "#4caf50" },
  { source: 8, target: 3, type: "Engaged", color: "#2196f3" },
  { source: 4, target: 9, type: "Dated", color: "#4caf50" },
  { source: 4, target: 10, type: "Dated", color: "#4caf50" },
  { source: 7, target: 11, type: "Hookup/Fling", color: "#ff9800" },
  { source: 12, target: 6, type: "Dated", color: "#4caf50" },
  { source: 13, target: 14, type: "Married", color: "#e91e63" },
  { source: 15, target: 16, type: "Married", color: "#e91e63" },
  { source: 17, target: 18, type: "Dated", color: "#4caf50" },
  { source: 19, target: 20, type: "Hookup/Fling", color: "#ff9800" },
  { source: 3, target: 21, type: "Married", color: "#e91e63" },
];

export { characters, relationships };
