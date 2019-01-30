# Midwaste

## A top-down zombie survival game.

![mw_splash](https://user-images.githubusercontent.com/30272940/51951553-ae06fb00-23fa-11e9-8a42-947f28a3988a.jpg)

**Note:** this is the Midwaste frontend. You can find the server [here.](https://github.com/SenorEdbot/project3-server)

# Play
Play the game for free [here.](http://midwaste.herokuapp.com/) (sound on!)

# Install
```
git clone https://github.com/SenorEdbot/project3.git
cd project 3
yarn
cd client && yarn

# Start the development sever
yarn dev
```

# Tech
- ### React / Material UI
- ### [Phaser.io](https://phaser.io/)
- ### Auth0

# Game
New players will be shown a short tutorial for moving, shooting and other controls. Once the tutorial has been completed and the game has been triggered, the randomly selected game mode will begin and prompt the player what to do.

Player stats are saved on game completion or player death.

The game is housed in the `Home` tab. Any unsaved game stats will be deleted on navigating away from Home.

# Stats
Players can view all of their saved statistics on the `Stats` tab. Some of these include average shots fired per game, total zombie kills, best time survived, detailed historical data and much more.

Players can also compare their own stats to any other player in the database.

# Contributors
[Eddie Franco](https://github.com/SenorEdbot)

[Alex Young](https://github.com/Bricktown88)

[Justin Kane](https://github.com/jkane88)

[Jason Michael](https://github.com/jason-michael)
