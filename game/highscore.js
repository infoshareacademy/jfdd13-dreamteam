const getHighScore = () => localStorage.getItem('highscore') || 0
  
  const newScoreReceived = (value) => {
    console.log(value, getHighScore())
      if (value > getHighScore() ){
        console.log('new highScore!');
          localStorage.setItem('highscore', value)
      } else {
        console.log('lower')
      }
  }
  
  const gameStarted = () => {
    displayScore(getHighScore())
  }
  
  const gameCompleted = (score) => {
    newScoreReceived(score);
    displayScore(score);
  }
  
  
  const displayScore = (value) =>
  document.getElementById('highscore').innerText = value;
  
  const startGame = () => {
    gameStarted();
  
  
  setTimeout(() => {
    gameCompleted(Math.random() * 200)
    setTimeout(() => {
      startGame()
    }, 1000)
    }, 5000)
  }
  
  
  startGame();