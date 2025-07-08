🎩 **Find Your Hat - Terminal Adventure Game**
A challenging and fun terminal-based maze game built with Node.js, where the player must navigate through a randomly generated field to find their lost hat – without falling into deadly holes!

![WhatsApp Image 2025-07-08 at 14 01 11_3e78d9f9](https://github.com/user-attachments/assets/218823dc-092e-48c1-bd61-44086da150f0)


🕹️ **Gameplay**
Navigate through the field using W (up), A (left), S (down), D (right) keys.

Avoid holes (O) or you'll lose!

Reach the hat (^) to win the game.

Every 5 turns, a new hole appears (Hard Mode)!

The field is always solvable, thanks to a built-in maze solver.


💡 **Features**
✅ Randomized, solvable field every game
✅ Player starts at a random safe location
✅ Hard Mode: Field becomes more dangerous as you move
✅ Clear, colored terminal UI using chalk
✅ Option to play again after finishing
✅ Built-in pathfinding algorithm to validate solvability


📦 **Technologies Used**
Node.js

prompt-sync – for terminal input

chalk – for colorful terminal output

JavaScript ES6 (Classes, static methods, destructuring, etc.)


🚀 **Getting Started**
Prerequisites
Node.js (v14+ recommended)

Git (optional, for cloning)

1. Clone the Repository
    git clone https://github.com/your-username/find-your-hat.git
    cd find-your-hat

2. Install Dependencies
    npm install

3. Run the Game
    node main.js
    (Replace main.js with your actual file name if different)

📷 Example
    Enter field height (e.g. 10): 10
    Enter field width (e.g. 20): 20
    Enter hole difficulty (0.1 = easy, 0.3 = hard): 0.2
    Which direction? (W = up, S = down, A = left, D = right):
    

🧪 **Testing Ideas**
You can test:

High difficulty (0.3 or more)

Small grids (5x5)

Edge cases like placing the hat near start

Solvability by examining map on loss


📁 **File Structure**
├── main.js           # Main game file
├── package.json
└── README.md


🛠️ **Future Improvements**
Add score tracking and high score

Add different terrain types (mud, ice, teleporters)

Add multiplayer turns or leaderboard

Convert to GUI using Electron or web-based React version

Turn into a Progressive Web App


🙌 **Acknowledgements**
This project was inspired by the "Find Your Hat" Codecademy challenge, extended with extra features, polish, and user experience improvements.
