//JAVASCRIPT

const Car = {
    brand: "HONDA",
    model: "CIVIC",
    year: 2024,
    start: function (sound) {
        console.log(`Starting...${sound}`)
    }
}

console.log(Car.brand);

Car.colour = "Grey"
console.log(Car.colour);

Car.start("vroom");
