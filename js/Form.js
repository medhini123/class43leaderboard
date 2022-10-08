class Form {
  constructor() {
    this.input=createInput(" ").attribute("placeholder","Enter Your Name")
    this.button=createButton("play")
    this.greeting=createElement("h2")
    this.title=createImg("./assets/title.png")
    
  }






  setPosition(){
    this.title.position(width/4-200,height/2-300)
    this.input.position(width/2-110,height/2-80)
    this.button.position(width/2-95,height/2-10)
    this.greeting.position(width/2-300,height/2-100)






  }


  setStyle(){
    this.title.class("gameTitle")
    this.input.class("customInput")
    this.button.class("customButton")
    this.greeting.class("greeting")





  }

  handleButtonPressed(){
    this.button.mousePressed(()=>{
      this.input.hide()
      this.button.hide()

      var message=`Hello ${this.input.value()}
      <br/> wait for another player to join....`
      this.greeting.html(message)
      myplayerCount+=1
      myPlayer.updateCount(myplayerCount)

      myPlayer.index=myplayerCount
      myPlayer.name=this.input.value()
      myPlayer.addplayers()
      myPlayer.getDistance()
      
    })

  }


  display(){
    this.setPosition()
    this.setStyle()
    this.handleButtonPressed()


  }


  hide(){
    this.input.hide()
    this.greeting.hide()
    this.button.hide()
  }

}
