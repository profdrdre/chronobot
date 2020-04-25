const modalS = document.getElementById("myModal2");
const options =
    {   "t1": [1,2,3],
        "t2":[4,5,6,7,8,9,10],
        "t3":[4,5,6,7,8,9,10],
        "t4":[4,5,6,7,8,9,10],
        "t5":[4,5,6,7,8,9,10,11],
        "t6":[12,13],
        "rn":[0,1,2,3,4,5],
        "ru":[0,1,2,3,4,5],
        "rg":[0,1,2,3,4,5],
        "rt":[0,1,2,3,4,5],
        "wg":[0,1,2,3,4,5],
        "wa":[0,1,2,3,4,5],
        "we":[0,1,2,3,4,5],
        "ws":[0,1,2,3,4,5],
        "bp":[0,1,2,3],
        "bf":[0,1,2,3],
        "bh":[0,1,2,3],
        "bl":[0,1,2,3],
        "ba":[0,1,2,3],
        "bs":[0,1,2],
        "exo":[0,1,2,3,4,5,6],
        "xt":[0,1,2,3,4,5,6],
        "xs":[0,1,2,3],
        "hc":[0,1,2,3,4,5,6,7],
        "hs":[0,1,2,3,4,5,6,7],
        "ht":[0,1,2,3,4,5,6,7]
    };

const stateNames =
    {   1: "Construct Powerplant",
        2: "Advance on Time Travel Track",
        3: "Remove Anomaly",
        4: "Supply Action",
        5: "Construct Lab",
        6: "Research",
        7: "Mine",
        8: "Construct Factory",
        9: "Recruit",
        10: "Construct Habitat",
        11: "Start 5 (2 Water)",
        12: "Start 6 (2 Water)",
        13: "Construct Superproject"};



function keySelected(){
    const selector1 = document.getElementById("Key");
    const selector2 = document.getElementById("Value");
    selector1.disabled = true;
    const selected = selector1.value;
    if (selected==="points" || selected==="water")
        for (let j=0; j<=50; j++) {
            const opt = document.createElement('option');
            opt.value = j.toString();
            opt.innerHTML = j.toString();
            selector2.appendChild(opt);
        }
    else options[selected].forEach(element => { const opt = document.createElement('option');
        opt.value = element;
        if (selected.charAt(0) === "t") opt.innerHTML = stateNames[parseInt(element)];
        else opt.innerHTML = element;
        selector2.appendChild(opt);
        } );
    selector2.disabled = false;
}

function valueSelected(){
    const selector1 = document.getElementById("Key");
    const selector2 = document.getElementById("Value");
    switch(selector1.value) {
        case "points":
            points.set(parseInt(selector2.value));
            break;
        case "water":
            water.set(parseInt(selector2.value));
            break;
        case "rn":
            neutroniumToken.set(parseInt(selector2.value));
            break;
        case "ru":
            uraniumToken.set(parseInt(selector2.value));
            break;
        case "rg":
            goldToken.set(parseInt(selector2.value));
            break;
        case "rt":
            titaniumToken.set(parseInt(selector2.value));
            break;
        case "wg":
            geniusToken.set(parseInt(selector2.value));
            break;
        case "wa":
            adminToken.set(parseInt(selector2.value));
            break;
        case "we":
            engineerToken.set(parseInt(selector2.value));
            break;
        case "ws":
            scientistToken.set(parseInt(selector2.value));
            break;
        case "hc":
            btCircleCounter.set(parseInt(selector2.value));
            break;
        case "ht":
            btTriangleCounter.set(parseInt(selector2.value));
            break;
        case "hs":
            btSquareCounter.set(parseInt(selector2.value));
            break;
        case "bp":
            powerPlantBack.set(parseInt(selector2.value));
            break;
        case "bf":
            factoryBack.set(parseInt(selector2.value));
            break;
        case "bl":
            labBack.set(parseInt(selector2.value));
            break;
        case "bh":
            habitatBack.set(parseInt(selector2.value));
            break;
        case "ba":
            anomalyBack.set(parseInt(selector2.value));
            break;
        case "bs":
            superProjectBack.set(parseInt(selector2.value));
            break;
        case "exo":
            exoSuitBack.set(parseInt(selector2.value));
            break;
        case "xt":
            timetravelToken.set(parseInt(selector2.value));
            break;
        case "xs":
            supplyToken.set(parseInt(selector2.value));
            break;
        default:  // numbertoken
            const tokenNumber =  parseInt(selector1.value.charAt(1))-1;
            while (parseInt(selector2.value)!==tokens[tokenNumber].state.name)
            tokens[tokenNumber].advance();
    }
    modalS.style.display = 'none'
}

function editRequested(){
    const selector1 = document.getElementById("Key");
    const selector2 = document.getElementById("Value");
    selector1.disabled = false;
    selector2.disabled = true;
    while (selector2.options.length > 0) {
        selector2.options.remove(0);
    }
    selector1.value='none';
    modalS.style.display = "block";
}