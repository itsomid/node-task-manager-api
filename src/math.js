const calculateTip = (total, tipPercent = .25) => {
    const tip = total * tipPercent
    return total + tip
}

const celsiusToFahrenheit = (temp) => {
    return (temp * 1.8) + 32
}
const fahrenheitToCelsius = (temp) =>{
    return (temp -32 ) / 1.8
}

module.exports = {
    calculateTip,
    celsiusToFahrenheit,
    fahrenheitToCelsius
}