class Tiger{
  constructor(){
    this.strength = Math.floor(Math.random() * 100);
  }

  growl(){
    console.log('grrrghhr!')
  }
}

module.exports = Tiger;