let talk = function () {
    console.log(this.sound)
}

let marge = {
    talk
}

let dog = {
    sound: 'wwwwoof'
}


//Object.setPrototypeOf(dog, marge)
dog.talk();