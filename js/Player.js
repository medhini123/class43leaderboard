class Player {
  constructor() {

    this.index=null
    this.name=null
    this.positionX=0
    this.positionY=0
  }

  getCount() {
    var playercountRef = database.ref("playerCount");
    playercountRef.on("value", (data) => {
      myplayerCount = data.val();
    });
  }

  updateCount(countNumber) {
    database.ref("/").update({
      playerCount: countNumber,

      
    });
  }


  getDistance(){
    var playerDistanceRef = database.ref("players/player" + this.index)
    playerDistanceRef.on("value",(data) => {
      var distance=data.val()
      this.positionX=distance.positionX
      this.positionY=distance.positionY
    })
  }

  updatePlayers(){
    var playerRef= "players/player" + this.index
    database.ref(playerRef).update({
      name:this.name,
      positionX:this.positionX,
      positionY:this.positionY,
      index:this.index
    })
  }

  static getPlayersInfo(){
    var playerRef=database.ref("players")
    playerRef.on("value",(data) => {
      allPlayers=data.val()
    })
  }


  addplayers(){
    var playerindex="player/player"+this.index

    if(this.index==1){
      this.positionXwidth/2-100

    }
    else{
      this.positionX=width/2+100
    }

    database.ref(playerindex).set({
      name:this.name,
      index:this.index,
      positionX:this.positionX,
      positionY:this.positionY
    })
      
  }
}



