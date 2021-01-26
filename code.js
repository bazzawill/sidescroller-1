// create Phaser.Game object named "game"
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'my-game',
    { preload: preload, create: create, update: update });

// declare global variables for game
var player;
var arrowKey;
let canjump = true;

// preload game assets - runs once at start
function preload() {
  game.load.spritesheet('dude', 'dude.png', 32, 48);

}

// create game world - runs once after "preload" finished
function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.stage.backgroundColor = '#6699ff';
  player = game.add.sprite(25, 300, 'dude');
  game.physics.arcade.enable(player);
  player.anchor.set(0.5, 0.5);
  player.body.gravity.y = 450;
  player.body.collideWorldBounds = true;
  player.body.bounce.y = 0.1;
  arrowKey = game.input.keyboard.createCursorKeys();

  //animations
  player.animations.add('left', [0, 1, 2, 3], 10, true);
  player.animations.add('right', [5, 6, 7, 8], 10, true);

}

// update gameplay - runs in continuous loop after "create" finished
function update() {
  if (arrowKey.left.isDown) {
    player.body.velocity.x = -200;
    player.animations.play('left');
  }
  else if (arrowKey.right.isDown){
    player.body.velocity.x = 200;
    player.animations.play('right');
  }
  else {
    player.body.velocity.x = 0;
    player.frame = 4;
  }

  if (arrowKey.up.isDown && canjump) {
    player.body.velocity.y = -300;
    canjump = false;
  }
  if (player.body.velocity.y == 0){
    canjump = true;
  }

}

// add custom functions (for collisions, etc.)