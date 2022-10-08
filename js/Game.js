class Game {
  constructor() {
    this.resetTitle = createElement("h2");
    this.resetButton = createButton("");
    this.leadersboard = createElement("h2");
    this.leader1 = createElement("h2");
    this.leader2 = createElement("h2");
  }

  getState() {
    var gamestateRef = database.ref("gameState");
    gamestateRef.on("value", (data) => {
      mygameState = data.val();
    });
  }

  updateState(statenumber) {
    database.ref("/").update({
      gameState: statenumber,
    });
  }

  start() {
    myForm = new Form();
    myForm.display();

    myPlayer = new Player();
    myPlayer.getCount();

    car1 = createSprite(width / 2 - 100, height - 100);
    car1.addImage("car1", car1Image);
    car1.scale = 0.07;
    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2", car2Image);
    car2.scale = 0.07;

    cars = [car1, car2];
    fuelGroup = new Group();
    powercoinsGroup = new Group();
    this.addSprites(fuelGroup, 25, fuelImg, 0.02);
    this.addSprites(powercoinsGroup, 20, powercoinsImg, 0.1);
  }

  handleElements() {
    myForm.title.position(40, 60);
    myForm.title.class("resetTitle");

    this.resetTitle.html("Reset Game");
    this.resetTitle.class("resetText");
    this.resetTitle.position(width / 2 + 350, 100);

    this.resetButton.class("resetButton");
    this.resetButton.position(width / 2 + 375, 155);

    this.leadersboard.html("leaderboard");
    this.leadersboard.class("resetText");
    this.leadersboard.position(width / 2 - 350, 40);

    this.leader1.html("leader1");
    this.leader1.class("leadersText");
    this.leader1.position(width / 2 - 300, 80);

    this.leader2.html("leader2");
    this.leader2.class("leadersText");
    this.leader2.position(width / 2 - 300, 120);
  }

  play() {
    myForm.hide();

    this.handleElements();
    Player.getPlayersInfo();
    this.handleResetButton();

    if (allPlayers !== undefined) {
      image(trackImage, 0, -height * 5, width, height * 6);

      this.showleader();

      var index = 0;
      for (var i in allPlayers) {
        index = index + 1;
        var x = allPlayers[i].positionX;
        var y = height - allPlayers[i].positionY;

        cars[index - 1].position.x = x;
        cars[index - 1].position.y = y;

        if (index === myPlayer.index) {
          stroke(10);
          strokeWeight("black");
          fill("red");
          ellipse(x, y, 70, 70);
          camera.position.x = cars[index - 1].position.x;
          //camera.position.y = cars[index - 1].position.y;

          this.handlefuel(index);
          this.handlecoins(index);
        }
      }
    }
    this.moveCars();
    drawSprites();
  }

  addSprites(spriteGroup, numberofSprites, spriteImage, scale) {
    for (var i = 0; i < numberofSprites; i += 1) {
      var x, y;
      x = random(width / 2 + 350, width / 2 - 350);
      y = random(-height * 4.5, height - 200);

      var sprite = createSprite(x, y);
      sprite.addImage(spriteImage);
      sprite.scale = scale;
      spriteGroup.add(sprite);
    }
  }

  moveCars() {
    if (keyIsDown(UP_ARROW)) {
      myPlayer.positionY += 10;
      myPlayer.updatePlayers();
    }
    if (keyIsDown(LEFT_ARROW)) {
      myPlayer.positionX -= 10;
      myPlayer.updatePlayers();
    }

    if (keyIsDown(RIGHT_ARROW)) {
      myPlayer.positionX += 10;
      myPlayer.updatePlayers();
    }
  }

  handlefuel(index) {
    cars[index - 1].overlap(fuelGroup, function (collector, collected) {
      collected.remove();
    });
  }

  handlecoins(index) {
    cars[index - 1].overlap(powercoinsGroup, function (collector, collected) {
      collected.remove();
    });
  }

  handleResetButton() {
    this.resetButton.mousePressed(() => {
      database.ref("/").set({
        gameState: 0,
        playerCount: 0,
        players: {},
      });

      window.location.reload();
    });
  }

  showleader() {
    var myleader1;
    var myleader2;

    var players=Object.keys(allPlayers)
    console.log(players);
  }

  end() {}
}
