type RelationshipType = "Dated" | "Married" | "Engaged" | "Hookup/Fling" | "Other";

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
  { id: 21, name: "The Senator", image: "The-Senator.jpg" },
  { id: 22, name: "Robert California", image: "Robert-California.jpg" },
  { id: 23, name: "Nellie Bertram", image: "Nellie-Bertram.jpg" },
  { id: 24, name: "Jessica", image: "Jessica.jpg" },
  { id: 25, name: "Roy Anderson", image: "Roy-Anderson.jpg" },
  { id: 26, name: "Karen Filippelli", image: "Karen-Filippelli.jpg" },
  { id: 27, name: "Danny Cordray", image: "Danny-Cordray.jpg" },
  { id: 28, name: "Charles Miner", image: "Charles-Miner.jpg" },
  { id: 29, name: "Donna Newton", image: "Donna-Newton.jpg" },
  { id: 30, name: "Jo Bennett", image: "Jo-Bennett.jpg" },
  { id: 31, name: "Deangelo Vickers", image: "Deangelo-Vickers.jpg" },
  { id: 32, name: "Isabel", image: "Isabel.jpg" },
  { id: 33, name: "Val Johnson", image: "Val-Johnson.jpg" },
  { id: 34, name: "Pete Miller", image: "Pete-Miller.jpg" },
  { id: 35, name: "Clark Green", image: "Clark-Green.jpg" },
  { id: 36, name: "Esther", image: "Esther.jpg" },
  { id: 37, name: "Gabe Lewis", image: "Gabe-Lewis.jpg" },
  { id: 38, name: "Cathy Simms", image: "Cathy-Simms.jpg" },
  { id: 39, name: "Sasha Flenderson", image: "Sasha-Flenderson.jpg" },
];

const relationships: Relationship[] = [
  { source: 0, target: 1, type: "Married", color: "#e91e63" },
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
  { source: 0, target: 26, type: "Dated", color: "#4caf50" },
  { source: 0, target: 27, type: "Dated", color: "#4caf50" },
  { source: 0, target: 38, type: "Hookup/Fling", color: "#ff9800" },
  { source: 2, target: 36, type: "Dated", color: "#4caf50" },
  { source: 2, target: 32, type: "Dated", color: "#4caf50" },
  { source: 7, target: 28, type: "Dated", color: "#4caf50" },
  { source: 4, target: 29, type: "Hookup/Fling", color: "#ff9800" },
  { source: 4, target: 30, type: "Dated", color: "#4caf50" },
  { source: 4, target: 31, type: "Hookup/Fling", color: "#ff9800" },
  { source: 6, target: 33, type: "Dated", color: "#4caf50" },
  { source: 11, target: 34, type: "Dated", color: "#4caf50" },
  { source: 11, target: 35, type: "Hookup/Fling", color: "#ff9800" },
  { source: 37, target: 6, type: "Dated", color: "#4caf50" },
  { source: 25, target: 1, type: "Engaged", color: "#2196f3" },       
  { source: 23, target: 2, type: "Hookup/Fling", color: "#ff9800" }, 
  { source: 24, target: 8, type: "Dated", color: "#4caf50" },         
  { source: 39, target: 22, type: "Other", color: "#4caf50" },           
];

export { characters, relationships };
