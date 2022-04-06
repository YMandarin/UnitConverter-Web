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
            "Micro-Meter": new Unit("um", x => x * 1e-6, x => x * 1e6),
            "Milli-Meter": new Unit("mm", x => x * 1e-3, x => x * 1e3),
            "Centi-Meter": new Unit("cm", x => x * 1e-2, x => x * 1e2),

            "Kilo-Meter": new Unit("km", x => x * 1e3, x => x * 1e-3),
            "Mega-Meter": new Unit("Mm", x => x * 1e6, x => x * 1e-6),
            "Giga-Meter": new Unit("Gm", x => x * 1e9, x => x * 1e-9),
        },
        Imperial: {
            "Inc": new Unit("in", x => x * 0.0254, x => x / 0.0254),
            "Foot": new Unit("ft", x => x * 0.3048, x => x / 0.3048),
            "Yard": new Unit("in", x => x * 0.9144, x => x / 0.9144),
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
    }
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

window.onload = function () {
    var unit_from = document.getElementById("unit-from")
    var unit_to = document.getElementById("unit-to")
    var unit_system_from = document.getElementById("unit-system-from")
    var unit_system_to = document.getElementById("unit-system-to")

    var value_from = document.getElementById("input-from")
    var value_to = document.getElementById("input-to")

    var current_unit_type = undefined
    var current_unit_from = undefined
    var current_unit_to = undefined

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
        input_value = Number(value_from.value)
        if(isNaN(input_value)){
            console.log("not a number")
            value_to.value = ""
            return
        }
        let val = 10
        val.toString().includes()
        let valueSI = current_unit_from.toSI(input_value)
        valueSI
        value_to.value = current_unit_to.fromSI(valueSI)
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

    activateUnitType(units.Length)
    current_unit_type = "Length"

    value_from.oninput = calculate
    unit_from.onchange = updateUnit
    unit_to.onchange = updateUnit
    unit_system_from.onchange = updateUnitSystemFrom
    unit_system_to.onchange = updateUnitSystemTo

}


"https://www.convertfreedom.com"
"https://en.wikipedia.org/wiki/Ancient_Greek_units_of_measurement"
"https://de.wikipedia.org/wiki/Angloamerikanisches_Ma%C3%9Fsystem"
"https://en.wikipedia.org/wiki/Astronomical_system_of_units"
"https://en.wikipedia.org/wiki/Obsolete_German_units_of_measurement"
