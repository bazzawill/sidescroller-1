// create Phaser.Game object named "game"
var game = new Phaser.Game(1000, 600, Phaser.AUTO, 'my-game',
    { preload: preload, create: create, update: update });

// declare global variables for game
var player;
var arrowKey;
let canjump = true;
var sky, mountains, city;

// preload game assets - runs once at start
function preload() {
  game.load.spritesheet('dude', 'assets/images/dude.png', 32, 48); 
  game.load.image ('city', 'assets/images/city-skyline.png');
  game.load.image ('mountains', 'assets/images/mountain-skyline.png'); 
  game.load.image('sky', 'assets/images/sky-clouds.jpg');
  game.load.image('platform-50', 'assets/images/platform-050w.png');
  game.load.image('platform-100', 'assets/images/platform-100w.png');
  game.load.image('platform-200', 'assets/images/platform-200w.png');
  game.load.image('platform-300', 'assets/images/platform-300w.png');
  game.load.image('platform-400', 'assets/images/platform-400w.png');
  game.load.image('platform-500', 'assets/images/platform-500w.png');
  


}

// create game world - runs once after "preload" finished
function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  sky = game.add.tileSprite(0, 0, 1000, 600, 'sky');
  mountains = game.add.tileSprite(0, 0, 1000, 600, 'mountains');
  city = game.add.tileSprite(0, 0, 1000, 600, 'city');
  sky.fixedToCamera = true;
  mountains.fixedToCamera = true;
  city.fixedToCamera = true;
  game.world.setBounds(0, 0, 5000, 600);
  game.stage.backgroundColor = '#6699ff';
  player = game.add.sprite(25, 300, 'dude');
  game.camera.follow(player);
  game.physics.arcade.enable(player);
  player.anchor.set(0.5, 0.5);
  player.body.gravity.y = 450;
  player.body.collideWorldBounds = true;
  player.body.bounce.y = 0.1;
  arrowKey = game.input.keyboard.createCursorKeys();

  //animations
  player.animations.add('left', [0, 1, 2, 3], 10, true);
  player.animations.add('right', [5, 6, 7, 8], 10, true);

  // PLATFORMS
  platformGroup = game.add.group();
  platformGroup.enableBody = true;

  // add ground platform
  var ground = platformGroup.create(0, game.world.height - 25, 'platform-500');
  ground.scale.setTo(10, 1); // 10 * 500 = 5000 pixels wide
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
  // BACKGROUND PARALLAX    
  sky.tilePosition.x = game.camera.x * -0.2;
  mountains.tilePosition.x = game.camera.x * -0.3;
  city.tilePosition.x = game.camera.x * -0.4;
  

}

// add custom functions (for collisions, etc.)