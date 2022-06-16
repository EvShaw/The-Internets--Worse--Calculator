//required abilities: 
// accept user inputs
// store inputs
// recongize inputs and perform calucations
// display those results. 

//optional features/ extras: 

// accept longer arithmetic operations with additional inputs available. 
// display inputs as they are entered. 
// have ability for one button to have multiple inputs
// should prevent invalid inputs (operators next to eachother, double decimals, fix starting with negative, double zero's)
// have numbers and operators move with the button click (animate)
//use switch case to practice with. 
// clear display/ turn on/off
//Check ip address, time, date, location. Depending on time, calcuator doens't work as its "solar powered."" 

const dateCheck = new Date
const timeCheck = String(dateCheck).split(' ')

// extracting the time, breajing it down, and converting it as needed here. 
const timeArray = timeCheck[4].split('')
const trimTime = timeArray.splice(-3, 3)

//final time, in string format
const theTimeIs = timeArray.join('')

//recheck month...how it it broken down? Always three letters?
//month breakdown, convert to number (still in string) to be passed into api
let month = ''
const monthConvert = timeCheck[1].toLowerCase()
switch (monthConvert) {
    case 'jan': {
        month = '01'
        break;
    }
    case 'feb': {
        month = '02'
        break;
    }
    case 'mar': {
        month = '03'
        break;
    }
    case 'apr': {
        month = '04'
        break;
    }
    case 'may': {
        month = '05'
        break;
    }
    case 'jun': {
        month = '06'
        break;
    }
    case 'jul': {
        month = '07'
        break;
    }
    case 'aug': {
        month = '08'
        break;
    }
    case 'sep': {
        month = '09'
        break;
    }
    case 'oct': {
        month = '10'
        break;
    }
    case 'nov': {
        month = '11'
        break;
    }
    case 'dec': {
        month = '12'
        break;
    }
    default:
        'it has to be one of these, right?'
}
//todays date it: YYYY-MM-DD
const theDateIs = `${timeCheck[3]}-${month}-${timeCheck[2]}`

//clear button on calculator
const onClear = document.querySelector('#onClear')

//EventListener - getting user location in lat and long with on/clear button and running sunrise/set api to get times for the day based on location
onClear.addEventListener("click", function () {
    navigator.geolocation.getCurrentPosition(function (position) {
        lat = position.coords.latitude;
        long = position.coords.longitude;
        //sunrise api
        checkSunRise()
    });
});

//capturing sunrise/set api
const capture = []

let lat
let long

async function checkSunRise() {
    // const url = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${long}&date=${theDateIs}`

    const res = await fetch(url)
    const data = await res.json()
    capture.push(data)

    //when does the sun come up and when does it go down?
    sunUpandSunDown()
}

//pulling from my capture array, what time is the sunrise and sunset for the day?

//convert to military time... check am / pm

function sunUpandSunDown() {
    const sunriseIsAt = capture[0].results.sunrise
    const sunsetIsAt = capture[0].results.sunset
    sunriseArray = sunriseIsAt.split('')
    sunsetArray = sunsetIsAt.split('')
    sunriseTrim = sunriseArray.splice(-6, 6)
    sunsetTrim = sunsetArray.splice(-6, 6)
    sunWillRiseAt = sunriseArray.join('')
    sunWillSetAt = sunsetArray.join('')
    convertSunSetTime()
}

//here I have broken down the times to be just hours and minutes. I have abondoned am and pm as the sun will always rise in the am and set in the pm.

let sunWillRiseAt = ''
let sunWillSetAt = ''

//the api runs UTC wihich is +7 hours to MST... I would need to adjust based on time zones, for now, its going to be in MST as thats my time zone... 
//How do I roll the clock back... convert to military time? 

// rises = 12:14(pm) - 7 = 5:14(am) <---easy, simple math (ignore pm/am)

// sets = 2:39(am) - 7 = 7:39(pm) <--best way forward? (ignore pm/am)
// 2 - 7 = -5 

let todaysSunset = ''
let todaysSunrise = ''

function convertSunSetTime() {
    //Sunset =
    const sunsetHour = Number(sunWillSetAt.slice(0, 1))
    //currently in military time
    let sunsetHourNum = ((12 - (7 - sunsetHour)) + 12)
    let sunsetMinutes = sunWillSetAt.slice(-3)
    todaysSunset = `${sunsetHourNum}${sunsetMinutes}`

    // sunrise = 
    const riseHour = Number(sunWillRiseAt.slice(0, 1))
    let sunriseHourNum = (12 - (7 - riseHour))
    let sunriseMinutes = sunWillRiseAt.slice(-3)
    todaysSunrise = `0${sunriseHourNum}${sunriseMinutes}`
    compareTime()
}

function compareTime() {

    // console.log('hi')
    // if (theTimeIs > todaysSunrise && theTimeIs < todaysSunset) {
    //     // console.log('The sun is already up')
    // } else {
    //     console.log('no sun, no power')
    //     document.querySelector('.displayText').textContent = 'error'
    // }
}

// add other time zones... 
//Central = -6
//PST - 8
//MST - 7
//add weather effects? no sun with clouds...

const keys = document.querySelector('.allButtons').addEventListener('click', (e) => {
    console.log(e.target.id)
    // calculator.captureInput(e.target.id)
    //object destructuring method below... advantages this way vs my original way (above)?
    const { target } = e;
    const { id } = target;
    if (!target.matches('button')) {
        return;
    } else {
        calculator.captureInput(id)
    }
})
const calculator = {
    displayText: '0',
    prevTotal: null,
    currTotal: '0',
    captureInput(btnClicked) {

        switch (btnClicked) {
            case 'plusMinus':
                // if (this.displayText > 0) {
                //     this.addText((this.displayText)*-1)
                // }
                this.showError()
                break;
            case 'sqRoot':
                //    this.squareRoot(this.displayText)
                this.showError()
                break;
            case 'percentage':
                this.showError()
                break;
            case 'mrc':
                this.showError()
                break;
            case 'm-':
                this.showError()
                break;
            case 'm+':
                this.showError()
                break;
            case 'division':
                this.addText('/')
                break;
            case 'multiplication':
                this.addText('*')
                break;
            case 'subtraction':
                this.addText('-')
                break;
            case 'addition':
                this.addText('+')
                break;
            case 'equals':
                this.calcAnswer(this.displayText)
                break;
            case 'onClear':
                this.clearAll()
                break;
            case 'period':
                if (this.displayText == 0) {
                    this.addText('0.')
                } else {
                    this.addText('.')
                }
                break;
            default:
                if (btnClicked >= 0 && btnClicked <= 9) {
                    this.addText(btnClicked)
                }
        }
    },
    showError() {
        this.addText('error')
        setTimeout(() => {
            this.clearAll()
        }, '500')
    },
    squareRoot(number) {
        // const sqRoot = Math.sqrt(number)
        // console.log(sqRoot)
        // this.addText(sqRoot)
        //functionality not fully implemented
        this.showError()
    },

    clearAll() {
        this.displayText = '0',
            this.prevTotal = null,
            this.outputText(this.displayText)
    },
    addText(value) {
        if (this.displayText === '0') {
            this.displayText = ''
        } else if (this.prevTotal !== null) {
            this.displayText = this.prevTotal
            this.prevTotal = null
        }
        // if (isNaN(+(value)) && isNaN(+(this.displayText))) {
        //     if (isNaN(this.displayText.slice(-1))) {
        //         return;
        //     }
        // }
        this.displayText += value
        this.outputText(this.displayText)
    },
    outputText(text) {
        document.querySelector('.displayText').textContent = text
    },
    calcAnswer(equation) {
        let result = Function('return ' + equation)()
        this.outputText(result)
        this.prevTotal = result
        // this.softClear()
    }
}