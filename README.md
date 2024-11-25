# 2048 Game

## 📖 Description
The **2048 Game** is a browser-based implementation of the classic tile-merging puzzle game. Built with **JavaScript**, **HTML**, and **CSS**, this project emphasizes clean code structure, dynamic animations, and an intuitive user interface. Players control the movement of tiles using arrow keys, merging tiles of the same value to reach the elusive **2048** tile while managing limited board space. The game automatically updates the score and ends when no valid moves remain.

---

## 🎮 Game Features
- **Dynamic Gameplay**: Real-time tile spawning, movement, and merging.
- **Smooth Animations**: Movement and merging are visually enhanced with smooth transitions and scaling effects.
- **Responsive Layout**: The grid and tiles remain perfectly aligned across different devices and screen sizes.
- **Score Tracking**: Tracks your progress with real-time score updates.
- **Game Over Detection**: Alerts you when no moves are available, with the option to restart.

---

## 🛠️ Code Overview
### Core Technologies
- **HTML**: Provides the structure of the game, including the grid layout and tile containers.
- **CSS**: Handles the visual design, including colors, tile animations, and responsive styles.
- **JavaScript**: Implements the game logic, including tile movements, merging rules, random tile generation, score calculation, and game-over detection.

### Key Functionalities
1. **Game Initialization**:
   - The game starts by generating a 4x4 grid and spawning two tiles randomly.
   - The initial score is set to 0.

2. **Tile Movement and Merging**:
   - Tiles slide in the direction of the arrow key input, merging when two tiles of the same value collide.
   - The merging logic ensures that a tile can only merge once per move.

3. **Random Tile Spawning**:
   - After each move, a new tile (either 2 or 4) is spawned in an empty grid cell.

4. **Score Tracking**:
   - Every merge adds the value of the merged tile to the score, which updates dynamically.

5. **Game Over Detection**:
   - The game checks if there are no empty cells and no possible merges, ending the game if true.
