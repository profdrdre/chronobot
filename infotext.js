
const research_text = "When using the Research Action, only roll\n" +
    "the shape die and take any Breakthrough\n" +
    "of the rolled shape"

const mine_text = "When taking the Mining action, the\n" +
    "Chronobot always takes Resources it\n" +
    "does not have yet, following the priority\n" +
    "order below. If this Resource is not\n" +
    "available, it takes an available Resource,\n" +
    "following the priority order.\n\n"+
    "Neutronium > Uranium > Gold > Titanium \n\n"+
    "Once it has at least one of all 4 Resource types, it discards\n" +
    "one of each and gains 5 Victory Points."

const recruit_text = "When taking the Recruit action, the\n" +
    "Chronobot takes a Worker type it does\n" +
    "not have yet, following the priority order\n" +
    "below. It does not receive its respective\n" +
    "Recruit bonus. If this worker type is\n" +
    "unavailable, it takes an available type,\n" +
    "following the priority order.\n\n" +
    " Genius > Admin > Engineer >  Scientist\n\n"+
    "Once it has at least one of all 4 Worker types, it discards\n" +
    "one of each and gains 5 Victory Points"

const construct_text = "Each of the Chronobot's Construct Actions is for a specific\n" +
    "building type (or Superproject). When using the Construct\n" +
    "Action, the Chronobot always picks the building with the\n" +
    "higher Victory Point value. If tied, it takes the one in the\n" +
    "secondary stack. If it already has 3 buildings of the rolled\n" +
    "type, it takes nothing (but it still places an Exosuit to block\n" +
    "a Construct space, and takes the 2 Water and 1 Victory\n" +
    "Point as usual)"

const timetravel_text = "Each time Time Travel is rolled by the\n" +
    "Chronobot, remove any one Warp tile\n" +
    "from the past Timeline tile where the\n" +
    "Chronobot has the most Warp tiles\n" +
    "(oldest if tied), and advance one step on\n" +
    "the Time Travel track. The Chronobot\n" +
    "does not place any Exosuits on a Time\n" +
    "Travel roll."

const removeAnomaly_text = "If Remove Anomaly is rolled, no Exosuit\n" +
    "is placed, and the Chronobot discards\n" +
    "2 Water and 2 cubes of the one Resource\n" +
    "it has most of; if tied, the order of\n" +
    "priority is Titanium > Gold > Uranium >\n" +
    "Neutronium. A Neutronium cube counts\n" +
    "as 2 cubes when calculating priority and\n" +
    "discarding. Then it removes 1 Anomaly. If it doesn’t have\n" +
    "an Anomaly or enough Water and/or Resources, it takes\n" +
    "2 Water and 1 Victory Point instead."

const supplyRecruit_text =
    "If “Supply/Recruit” is rolled, the\n" +
    "Chronobot pays Water according to\n" +
    "its position on the Morale track, then\n" +
    "advances on the Morale track. If it\n" +
    "doesn’t have enough Water, it takes a\n" +
    "Recruit Action instead."

const superProject_text = "After Impact:\n When Constructing a Superproject, the Chronobot takes\n" +
    "the one with the highest Victory Point value (oldest if tied).\n" +
    "If Construct Superproject is rolled before the Impact, it\n" +
    "receives 1 Victory Point instead, and places no Exosuit.\n" +
    "If Construct Superproject is rolled and the Chronobot\n" +
    "already has 2 Superprojects, it does nothing (but it still\n" +
    "places an Exosuit to block a Construct space, and takes\n" +
    "the 2 Water and 1 Victory Point as usual)."

const infotext = {
    0: "No Help available",
    1: construct_text,
    2: timetravel_text,
    3: removeAnomaly_text,
    4: supplyRecruit_text,
    5: construct_text,
    6: research_text,
    7: mine_text,
    8: construct_text,
    9: recruit_text,
    10: construct_text,
    11: "Nothing to do. Water is already taken.",
    12: "Nothing to do. Water is already taken.",
    13: superProject_text
}

const modalI = document.getElementById("myModal");

function helpAsked(){
    //window.alert(infotext[action]);
    const infoP = document.getElementById("infotext");
    infoP.innerText = infotext[action];
    modalI.style.display = "block";
}
