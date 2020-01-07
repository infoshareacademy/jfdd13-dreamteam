export const generateRandomScore = () => Math.floor(Math.random() * 1000);
export const fillScores = num => {
  const nameArr = [
    "Kent Sauro",
    "Donald Mitten",
    "Sherill Mayson",
    "Wilbur Overton",
    "Alison Daughtrey",
    "Coleen Carrington",
    "Mara Royce",
    "Vickey Sarris",
    "Patsy Narducci",
    "Josue Weitzel"
  ];
  for (let i = 0; i < num; i++) {
    addScore(nameArr[i], generateRandomScore());
  }
};