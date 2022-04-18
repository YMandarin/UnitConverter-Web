var unit_from, unit_to, unit_system_from, unit_system_to, value_from, value_to, type_list, type_selection, current_unit_type, current_unit_from, current_unit_to, contentFrame = undefined
var roundTo = 6
var typeWidth = 80

class Unit {
    constructor(short, calculateToSI, calculateFromSI) {
        this.short = short;
        this.toSI = calculateToSI;
        this.fromSI = calculateFromSI;
    }
}

units = {
    Length: {
        SI: {
            "Meter": new Unit("m", x => x, x => x),

            "Femto-Meter": new Unit("fm", x => x * 1e-15, x => x * 1e15),
            "Pico-Meter": new Unit("pm", x => x * 1e-12, x => x * 1e12),
            "Nano-Meter": new Unit("nm", x => x * 1e-9, x => x * 1e9),
            "Micro-Meter": new Unit("µm", x => x * 1e-6, x => x * 1e6),
            "Milli-Meter": new Unit("mm", x => x * 1e-3, x => x * 1e3),
            "Centi-Meter": new Unit("cm", x => x * 1e-2, x => x * 1e2),
            "Deci-Meter": new Unit("dm", x => x * 1e-1, x => x * 1e1),
            "Kilo-Meter": new Unit("km", x => x * 1e3, x => x * 1e-3),
            "Mega-Meter": new Unit("Mm", x => x * 1e6, x => x * 1e-6),
            "Giga-Meter": new Unit("Gm", x => x * 1e9, x => x * 1e-9),
        },
        Imperial: {
            "Inc": new Unit("in", x => x * 0.0254, x => x / 0.0254),
            "Foot": new Unit("ft", x => x * 0.3048, x => x / 0.3048),
            "Yard": new Unit("yd", x => x * 0.9144, x => x / 0.9144),
            "Mile": new Unit("mi", x => x * 1.609344e3, x => x / 1.609344e3),
            "Nautical Mile": new Unit("NM", x => x * 1852, x => x / 1852),

            "League": new Unit("lea", x => x * 4828.032, x => x / 4828.032),
            "Link": new Unit("li", x => x * 0.201168, x => x / 0.201168),
            "Rod": new Unit("rd", x => x * 5.0292, x => x / 5.0292),
            "Chain": new Unit("ch", x => x * 20.1168, x => x / 20.1168),
            "Furlong": new Unit("fur", x => x * 201.168, x => x / 201.168)
        },
        Astronomical: {
            "Light-Year": new Unit("ly", x => x * 9.4607e15, x => x / 9.4607e15),
            "Astronomical Unit": new Unit("AU", x => x * 149597870700, x => x / 149597870700),
            "Lunar Distance": new Unit("LD", x => x * 384399e3, x => x / 384399e3),
            "Parsec": new Unit("pc", x => x * 3.0857e16, x => x / 3.0857e16),
            "Mega-Parsec": new Unit("Mpc", x => x * 3.0857e21, x => x / 3.0857e21),
            "Giga-Parsec": new Unit("Gpc", x => x * 3.0857e24, x => x / 3.0857e24),
        },
        Other:{
            "Stalin": new Unit("st",x=>x*1.65, x=>x/1.65)
        },
    },
    Area:{
        SI:{
            "Square Meter": new Unit("m^2", x=>x, x=>x),
            "Square Nano-Meter": new Unit("nm^2", x=>x, x=>x),
            "Square Micro-Meter": new Unit("µm^2", x=>x, x=>x),
            "Square Milli-Meter": new Unit("mm^2", x=>x, x=>x),
            "Square Centi-Meter": new Unit("cm^2", x=>x, x=>x),
            "Square Deci-Meter": new Unit("dm^2", x=>x, x=>x),
            "Are": new Unit("a", x=>x, x=>x),
            "Hectare": new Unit("ha", x=>x, x=>x),
            "Square Kilo-Meter": new Unit("km^2", x=>x, x=>x),
        },
        Imperial:{
            "Square Inch": new Unit("in^2", x=>x, x=>x),
            "Square Foot": new Unit("ft^2", x=>x, x=>x),
            "Square Yard": new Unit("yd^2", x=>x, x=>x),
            "Square Mile": new Unit("mi^2", x=>x, x=>x),
            "Acre": new Unit("mi^2", x=>x, x=>x),
            "Rood": new Unit("rd", x=>x, x=>x),
            "Acre": new Unit("ac", x=>x, x=>x),
            "Circular Mil": new Unit("cmil", x=>x, x=>x),
            "Circular Inch": new Unit("cinch", x=>x, x=>x),
        }
    },
    Volume:{
        SI:{
            "Litre": new Unit("l", x=>x, x=>x),
            "Micro-Litre": new Unit("µl", x=>x, x=>x),
            "Milli-Litre": new Unit("ml", x=>x, x=>x),
            "Centi-Litre": new Unit("cl", x=>x, x=>x),
            "Kilo-Litre": new Unit("kl", x=>x, x=>x),
            "Mega-Litre": new Unit("Ml", x=>x, x=>x),
            "Cubic Meter": new Unit("m^3", x=>x, x=>x),
            "Cubic Nano-Meter": new Unit("nm^3", x=>x, x=>x),
            "Cubic Micro-Meter": new Unit("µm^3", x=>x, x=>x),
            "Cubic Milli-Meter": new Unit("mm^3", x=>x, x=>x),
            "Cubic Centi-Meter": new Unit("cm^3", x=>x, x=>x),
            "Cubic Deci-Meter": new Unit("dm^3", x=>x, x=>x),
            "Cubic Kilo-Meter": new Unit("km^3", x=>x, x=>x),
            "Cubic Mega-Meter": new Unit("Mm^3", x=>x, x=>x),
        },
        Imperial:{
            "Cubic Inc": new Unit("m^3", x=>x, x=>x),
            "Cubic Foot": new Unit("m^3", x=>x, x=>x),
            "Cubic Yard": new Unit("m^3", x=>x, x=>x),
            "Cubic Mile": new Unit("m^3", x=>x, x=>x),
            "Barrel": new Unit("m^3", x=>x, x=>x),
            "Gallon": new Unit("m^3", x=>x, x=>x),
            "Bucket": new Unit("m^3", x=>x, x=>x),
            "Bushel": new Unit("m^3", x=>x, x=>x),
            "Cup": new Unit("m^3", x=>x, x=>x),
            "Gill": new Unit("m^3", x=>x, x=>x),
            "Minim": new Unit("m^3", x=>x, x=>x),
            "Ounce": new Unit("m^3", x=>x, x=>x),
            "Peck": new Unit("m^3", x=>x, x=>x),
            "Pipe": new Unit("m^3", x=>x, x=>x),
            "Drum": new Unit("m^3", x=>x, x=>x),
        },
        Other:{
            "Teaspoon": new Unit("m^3", x=>x, x=>x),
            "Tablespoon": new Unit("m^3", x=>x, x=>x),
            "Cord": new Unit("m^3", x=>x, x=>x),
            "Shot": new Unit("m^3", x=>x, x=>x),
            "Robie": new Unit("m^3", x=>x, x=>x),
            "Quart": new Unit("m^3", x=>x, x=>x),
        }
    },
    Weight:{
        SI:{
            "Kilo-Gram": new Unit("kg", x=>x, x=>x),
            "Nano-Gram": new Unit("ng", x=>x, x=>x),
            "Micro-Gram": new Unit("µg", x=>x, x=>x),
            "Milli-Gram": new Unit("mg", x=>x, x=>x),
            "Centi-Gram": new Unit("g", x=>x, x=>x),
            "Deci-Gram": new Unit("g", x=>x, x=>x),
            "Gram": new Unit("g", x=>x, x=>x),
            "Tonne": new Unit("T", x=>x, x=>x),
            "Kilo-Tonne": new Unit("kT", x=>x, x=>x),
            "Mega-Tonne": new Unit("MT", x=>x, x=>x),
            "Giga-Tonne": new Unit("GT", x=>x, x=>x),
        },
        Imperial:{  
            "Grain": new Unit("g", x=>x, x=>x),
            "Ounce": new Unit("g", x=>x, x=>x),
            "Pounds": new Unit("g", x=>x, x=>x),
            "Ton": new Unit("g", x=>x, x=>x),
            "Short Ton": new Unit("g", x=>x, x=>x),
            "Long Ton": new Unit("g", x=>x, x=>x),
            "Hundredweight": new Unit("g", x=>x, x=>x),
        },
        Astronomical:{
            "Solar Mass": new Unit("g", x=>x, x=>x),
            "Jupiter Mass": new Unit("g", x=>x, x=>x),
            "Earth Mass": new Unit("g", x=>x, x=>x),
        }
    },
    Density:{
        SI:{
            "Kilo-Gram/Cubicmeter": new Unit("kg", x=>x, x=>x),
        },
        Imperial:{
            "Ounce/Cubic Inch": new Unit("kg", x=>x, x=>x),
            "Ounce/Cubic Inch": new Unit("kg", x=>x, x=>x),
            "Pound/Cubic Foot": new Unit("kg", x=>x, x=>x),
            "Pound/Cubic Yard": new Unit("kg", x=>x, x=>x),
            "Pound/Cubic Mile": new Unit("kg", x=>x, x=>x),
            "Pound/Cubic Foot": new Unit("kg", x=>x, x=>x),
            "Pound/Cubic Foot": new Unit("kg", x=>x, x=>x),
            "Ounce/Gallon": new Unit("kg", x=>x, x=>x),
            "Pound/Gallon": new Unit("kg", x=>x, x=>x),
        },
        Other:{
            "Water": new Unit("kg", x=>x, x=>x),
        }
    },
    Temperature:{
        SI:{
            "Celcius": new Unit("C", x=>x, x=>x),
            "Kelvin": new Unit("K", x=>x, x=>x),
        },
        Imperial:{
            "Farenheit": new Unit("K", x=>x, x=>x),
        },
        Other:{
            "Rankine": new Unit("K", x=>x, x=>x),
        }
    },
    Velocity:{
        SI:{
            "Meter/Second": new Unit("m/s", x=>x, x=>x)
        }   
    },
    Acceleration:{
        SI:{
            "Meter/Second^2": new Unit("m/s^2", x=>x, x=>x)
        }   
    },
    Force:{
        SI:{
            "Newton": new Unit("N", x=>x, x=>x)
        },
        Imperial:{
            "Pound Force": new Unit("lbf", x=>x, x=>x),
            "Poundal": new Unit("pdl", x=>x, x=>x)
        },
        Other:{
            "Kilo-Gram Force": new Unit("kgf", x=>x, x=>x),
            "Dyne": new Unit("dyn", x=>x, x=>x)
        }
    },
    Energy:{
        SI:{
            "Nano-Joule": new Unit("N", x=>x, x=>x),
            "Micro-Joule": new Unit("N", x=>x, x=>x),
            "Milli-Joule": new Unit("N", x=>x, x=>x),
            "Joule": new Unit("N", x=>x, x=>x),
            "Kilo-Joule": new Unit("N", x=>x, x=>x),
            "Mega-Joule": new Unit("N", x=>x, x=>x),
            "Giga-Joule": new Unit("N", x=>x, x=>x),
            "Peta-Joule": new Unit("N", x=>x, x=>x),
        },
        Other:{
            "Calories": new Unit("N", x=>x, x=>x),
            "British Thermal Unit": new Unit("N", x=>x, x=>x),
            "Foot Pounds": new Unit("N", x=>x, x=>x),
        }
    },
    Power:{
        SI:{
            "Watt": new Unit("W", x=>x, x=>x),
            "Nano-Watt": new Unit("W", x=>x, x=>x),
            "Micro-Watt": new Unit("W", x=>x, x=>x),
            "Milli-Watt": new Unit("W", x=>x, x=>x),
            "Kilo-Watt": new Unit("W", x=>x, x=>x),
            "Mega-Watt": new Unit("W", x=>x, x=>x),
            "Giga-Watt": new Unit("W", x=>x, x=>x),
            "Tera-Watt": new Unit("W", x=>x, x=>x),
        },
        Other:{
            "Horsepower": new Unit("W", x=>x, x=>x),
        }
    },
    Radioactivity:{
        SI:{
            "Bequerel": new Unit("kg", x=>x, x=>x)
        }   
    },
}


window.onload = function () {
    unit_from = document.getElementById("unit-from")
    unit_to = document.getElementById("unit-to")
    unit_system_from = document.getElementById("unit-system-from")
    unit_system_to = document.getElementById("unit-system-to")

    value_from = document.getElementById("input-from")
    value_to = document.getElementById("input-to")

    type_list = document.getElementById("type-list")
    type_selection = document.getElementById("type-select")

    contentFrame = document.getElementById("content")

    window.onresize = updateTypeList

    activateUnitType(units.Length)
    current_unit_type = "Length"
    updateTypeList()

    value_from.oninput = calculate
    unit_from.onchange = updateUnit
    unit_to.onchange = updateUnit
    unit_system_from.onchange = updateUnitSystemFrom
    unit_system_to.onchange = updateUnitSystemTo

    type_selection.onchange = ()=>type_click(type_selection.value)

}


function configureSelection(selection, options, def = undefined) {
    let inner = ""
    if (def != undefined) {
        inner += `<option value="${def}">${def}</option>`
    }
    options.forEach(element => {
        inner += `<option value="${element}">${element}</option>`
    })
    selection.innerHTML = inner
}

function updateTypeList(){
    let size = Math.floor(contentFrame.clientWidth/typeWidth-1.25)
    let i = 0
    let typeString = ""
    let typeIsActive = false
    let types = Object.keys(units)
    for (i = 0; i < size; i++) {
        if (i >= types.length)
            break
        if(types[i] === current_unit_type & !typeIsActive){
            typeIsActive = true
            typeString += `<div class="selector-type hover selector-active" onclick="type_click('${types[i]}')">${types[i]}</div>`
        }
        else
            typeString += `<div class="selector-type hover" onclick="type_click('${types[i]}')">${types[i]}</div>`
    }

    type_list.innerHTML = typeString
    
    if(i >= types.length){
        type_selection.parentElement.hidden = true
        type_selection.parentElement.className = ""
        return
    }
    type_selection.parentElement.hidden = false
    type_selection.parentElement.className = "hover"
    
    configureSelection(type_selection,types.slice(i))

    if(!typeIsActive){
        type_selection.parentElement.className = "selector-active hover"
        type_selection.value = current_unit_type
    }
    else{
        type_selection.parentElement.className = "hover"
    }
}

function type_click(name) {
    current_unit_type = name
    activateUnitType(units[name])
    updateTypeList()

}

function calculate(){
    let input_value = 0
    
    if(current_unit_from == undefined || current_unit_to == undefined){
        throw Error("undefined unit")
    }
    if(value_from.value.trim() == ""){
        console.log("value empty")
        value_to.value = ""
        return
    }
    input_value = Number(value_from.value.replace(",","."))
    if(isNaN(input_value)){
        console.log("not a number")
        value_to.value = ""
        return
    }

    let valueSI = current_unit_from.toSI(input_value)
    valueTo = current_unit_to.fromSI(valueSI)

    // round output value
    let valString = valueTo.toString()
    if(valString.includes('e')){
        let indexE = valString.indexOf('e')
        valueTo = Number(Number(valString.substring(0,indexE)).toFixed(roundTo)).toString() + valString.slice(indexE,valString.length)
    }else{
        valueTo = Number(valueTo.toFixed(roundTo))
    }

    value_to.value = valueTo
}

function activateUnitType(typeData) {
    let unit_types = Object.keys(typeData)
    configureSelection(unit_system_from,unit_types)
    configureSelection(unit_system_to,unit_types)

    let units = Object.keys(typeData[unit_types[0]])
    configureSelection(unit_from,units)
    configureSelection(unit_to,units)
    current_unit_to = typeData[unit_types[0]][units[0]]
    current_unit_from = typeData[unit_types[0]][units[0]]
}

function updateUnit(){
    current_unit_from = units[current_unit_type][unit_system_from.value][unit_from.value]
    current_unit_to = units[current_unit_type][unit_system_to.value][unit_to.value]
    calculate()
}

function updateUnitSystemFrom(){
    unitKeys = Object.keys(units[current_unit_type][unit_system_from.value])
    configureSelection(unit_from,unitKeys)
    current_unit_from = units[current_unit_type][unit_system_from.value][unitKeys[0]]
    calculate()
}

function updateUnitSystemTo(){
    unitKeys = Object.keys(units[current_unit_type][unit_system_to.value])
    configureSelection(unit_to,unitKeys)
    current_unit_to = units[current_unit_type][unit_system_to.value][unitKeys[0]]
    calculate()
}


"https://www.convertfreedom.com"
"https://en.wikipedia.org/wiki/Ancient_Greek_units_of_measurement"
"https://de.wikipedia.org/wiki/Angloamerikanisches_Ma%C3%9Fsystem"
"https://en.wikipedia.org/wiki/Astronomical_system_of_units"
"https://en.wikipedia.org/wiki/Obsolete_German_units_of_measurement"
