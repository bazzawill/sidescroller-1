// create Phaser.Game object named "game"
var game = new Phaser.Game(1000, 600, Phaser.AUTO, 'my-game',
    { preload: preload, create: create, update: update });

// declare global variables for game
var player;
var arrowKey;
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
  game.load.image('wall-50', 'assets/images/wall-050h.png');
  game.load.image('wall-150', 'assets/images/wall-150h.png');
  game.load.image('wall-250', 'assets/images/wall-250h.png');
  game.load.spritesheet('coin', 'assets/images/coin.png', 32, 32, 6);
}

// create game world - runs once after "preload" finished
function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.checkCollision.up = false;
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
  //coin.animations.add('spin', [0-5], 10, true);

  // PLATFORMS
  platformGroup = game.add.group();
  platformGroup.enableBody = true;

  // add ground platform
  var ground = platformGroup.create(0, game.world.height - 25, 'platform-500');
  ground.scale.setTo(10, 1); // 10 * 500 = 5000 pixels wide
  // add platforms
  platformGroup.create(200, 500, 'platform-100');
  platformGroup.create(400, 425, 'platform-100');
  platformGroup.create(600, 350, 'platform-100');
  platformGroup.create(50, 100, 'platform-50');
  platformGroup.create(250, 175, 'platform-50');
  platformGroup.create(450, 260, 'platform-50');
  platformGroup.create(900, 275, 'platform-200');
  platformGroup.create(1150, 475, 'platform-50');
  platformGroup.create(1350, 500, 'platform-50');
  platformGroup.setAll('body.immovable', true);
  //wall platforms
  wallGroup = game.add.group();
  wallGroup.enableBody = true;
  wallGroup.create(525, 525, 'wall-50');
  wallGroup.create(1000, 425, 'wall-150');
  wallGroup.create(2000, 525, 'wall-50');
  wallGroup.create(3000, 525, 'wall-50');
  wallGroup.create(4000, 425, 'wall-50');
  wallGroup.setAll('body.immovable', true);
  //coins
  coinGroup = game.add.group();
  coinGroup.enableBody = true;
  var coinData = [
        { x:75, y:0 },
        { x:150, y:0 },
        { x:250, y:250 },
        { x:275, y:0 },
        { x:350, y:0 },
        { x:450, y:300 },
        { x:475, y:0 },
        { x:537, y:0 },
        { x:650, y:0 },
        { x:700, y:400 },
        { x:850, y:0 },
        { x:950, y:0 },
        { x:1050, y:0 },
        { x:1175, y:0 },
        { x:1375, y:0 }
        // no comma after last item in array
  ]; 
  for (var i = 0; i < coinData.length; i++) {
    var coin = coinGroup.create(coinData[i].x, coinData[i].y, 'coin');
    coin.body.gravity.y = 400;
    coin.body.bounce.y = 0.5;
    coin.anchor.set(0.5, 0.5);
    //coin.animations.play('spin');
  }
}

// update gameplay - runs in continuous loop after "create" finished
function update() {
  game.physics.arcade.collide(player, platformGroup);
  game.physics.arcade.collide(player, wallGroup);
  game.physics.arcade.collide(coinGroup, platformGroup);
  game.physics.arcade.collide(coinGroup, wallGroup);
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

  if (arrowKey.up.justDown && player.body.touching.down) {
    player.body.velocity.y = -300;
  }
  // BACKGROUND PARALLAX    
  sky.tilePosition.x = game.camera.x * -0.2;
  mountains.tilePosition.x = game.camera.x * -0.3;
  city.tilePosition.x = game.camera.x * -0.4;
  

}

// add custom functions (for collisions, etc.)
