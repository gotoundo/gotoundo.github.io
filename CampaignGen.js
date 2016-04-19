"use strict"




//add a method to remove multiple elements from an array
if (!Array.prototype.remove) {
    Array.prototype.remove = function (vals, all) {
        var i, removedItems = [];
        if (!Array.isArray(vals)) vals = [vals];
        for (var j = 0; j < vals.length; j++) {
            if (all) {
                for (i = this.length; i--;) {
                    if (this[i] === vals[j]) removedItems.push(this.splice(i, 1));
                }
            }
            else {
                i = this.indexOf(vals[j]);
                if (i > -1) removedItems.push(this.splice(i, 1));
            }
        }
        return removedItems;
    };
}

function randomObject(objects) {
    return objects[Math.floor(Math.random() * objects.length)];
}

function containsAllElements(arrayToCheck, keys) {
    var containsAll = true;

    for (var i = 0; i < keys.length; i++) {
        if (!arrayToCheck.includes(keys[i]))
            containsAll = false;
    }


    return containsAll;
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function OxfordComma(namedObjects) {
    var totalReport = "";
    for (var itemNum = 0; itemNum < namedObjects.length; itemNum++) {
        totalReport += (namedObjects[itemNum].name);
        if (namedObjects.length == 2) {
            if (itemNum == 0)
                totalReport += " and ";
            else
                totalReport += ", ";
        }
        else
            totalReport += ", ";
        if (namedObjects.length > 2 && itemNum == namedObjects.length - 2)
            totalReport += "and ";
    }
    totalReport = totalReport.substr(0, totalReport.length - 2);
    return totalReport;
}

var AllQuestDefs = [];
var AllItemDefs = [];
var CastOfCharacters = [];
var maleCharacterNames = ["Aelianus", "Aelius", "Aemilianus", "Aemilius", "Aetius", "Agrippa", "Ahenobarbus", "Albanus", "Albinus", "Albus", "Antoninus", "Antonius", "Appius", "Aquila", "Aquilinus", "Atilius", "Augustinus", "Augustus", "Aulus", "Aurelianus", "Aurelius", "Avilius", "Avitus", "Balbinus", "Balbus", "Blandinus", "Blandus", "Blasius", "Brutus", "Caecilius", "Caelinus", "Caelius", "Caesar", "Caius", "Camillus", "Cassian", "Cassianus", "Cassius", "Celsus", "Cicero", "Claudius", "Cloelius", "Cnaeus", "Cornelius", "Crispinus", "Crispus", "Cyprianus", "Decimus", "Diocletianus", "Domitianus", "Domitius", "Drusus", "Duilius", "Egnatius", "Ennius", "Fabianus", "Fabius", "Fabricius", "Faustinus", "Faustus", "Felix", "Festus", "Flavianus", "Flavius", "Florianus", "Florus", "Fulvius", "Gaius", "Gallus", "Germanus", "Glaucia", "Gnaeus", "Gordianus", "Gratianus", "Hadrianus", "Herminius", "Hilarius", "Horatius", "Hortensius", "Ianuarius", "Iovianus", "Iovita", "Iulianus", "Iulius", "Iunius", "Iuvenalis", "Januarius", "Jovian", "Julius", "Junius", "Laelius", "Laurentinus", "Laurentius", "Livianus", "Livius", "Longinus", "Lucanus", "Lucianus", "Lucilius", "Lucius", "Lucretius", "Manlius", "Marcellinus", "Marcellus", "Marcius", "Marcus", "Marianus", "Marinus", "Marius", "Martialis", "Martinus", "Maxentius", "Maximianus", "Maximilianus", "Maximinus", "Maximus", "Naevius", "Nerva", "Nonus", "Octavianus", "Octavius", "Otho", "Ovidius", "Paulinus", "Paulus", "Petronius", "Plinius", "Pompeius", "Pompilius", "Pomponius", "Pontius", "Porcius", "Priscus", "Publius", "Quintilianus", "Quintillus", "Quintinus", "Quintus", "Regulus", "Rufinus", "Rufus", "Sabinus", "Saturninus", "Scaevola", "Secundinus", "Secundus", "Seneca", "Septimius", "Septimus", "Sergius", "Servius", "Severianus", "Severinus", "Severus", "Sextilius", "Sextus", "Silvanus", "Spurius", "Tacitus", "Tarquinius", "Tatianus", "Tatius", "Terentius", "Tertius", "Thracius", "Tiberius", "Tiburtius", "Titianus", "Titus", "Traianus", "Tullius", "Valens", "Valentinianus", "Valentinus", "Valerianus", "Valerius", "Varinius", "Varius", "Vergilius", "Verginius", "Vespasianus", "Vibianus", "Vibius", "Vinicius", "Vitus"];
var femaleCharacterNames = ["Aelia", "Antonina", "Augustina", "Caecilia", "Caelina", "Decima", "Domitia", "Fabricia", "Faustina", "Flaviana", "Floriana", "Fulvia", "Gratiana", "Hilaria", "Iulia", "Julia", "Junia", "Liviana", "Longina", "Lucia", "Lucilia", "Paula", "Pomponia", "Porcia", "Priscilla", "Rufina", "Sabina", "Tacita", "Tatiana", "Tullia", "Valentina", "Valeria", "Virginia", "Aeliana", "Aemilia", "Agrippina", "Aurelia", "Balbina", "Blandina", "Cassia", "Cloelia", "Cornelia", "Drusa", "Fabia", "Fabiola", "Germana", "Herminia", "Hortensia", "Iuliana", "Iunia", "Juliana", "Laurentia", "Luciana", "Lucretia", "Marcella", "Marina", "Maximiliana", "Octavia", "Paulina", "Petronia", "Valeriana", "Varinia", "Vita", "Aemiliana", "Albina", "Antonia", "Aquilina", "Augusta", "Aureliana", "Caelia", "Camilla", "Claudia", "Domitilla", "Drusilla", "Fabiana", "Fausta", "Flavia", "Hadriana", "Horatia", "Laelia", "Laurentina", "Lucilla", "Marcellina", "Marcia", "Mariana", "Martina", "Maxima", "Prisca", "Quintina", "Saturnina", "Septima", "Severina", "Titiana", "Verginia", "Vibiana"];

var siteNames = []

var siteThemes = ["Urban", "Forest", "Hill", "Jungle", "Marshland", "Swampland", "Misty", "Mysterious", "Haunted", "Holy", "Volcanic", "Wooded", "Hidden", "Imperial", "Royal", "Island", "Coastal", "Arctic", "Underwater", "Tropical", "Elven", "Dwarven", "Ancient"]
var siteNouns = ["City", "Battlefield", "Necropolis", "Arch", "Castle", "Citadel", "College", "Coliseum", "Arena", "Colossus", "Fortress", "Gardens", "Labyrinth", "Library", "Lighthouse", "Monument", "Observatory", "Palace", "Shrine", "Statue", "Temple", "Tower", "Wall", "Ruins", "Dungeon", "Hideout"]


function GenerateSiteNames() {
    siteNames = [];
    for (var theme = 0; theme < siteThemes.length; theme++) {
        for (var noun = 0; noun < siteNouns.length; noun++) {
            siteNames.push("the " + siteThemes[theme] + " " + siteNouns[noun]);
        }
    }
}


var lastMadeQuest = [];
class Campaign {
    constructor(chapters) {
        this.majorQuestItems = [];
        this.questsByChapter = new Array(chapters); //contains generated tasks
        for (var i = 0; i < chapters; i++) {
            // console.log("creating chapter group "+i);
            this.questsByChapter[i] = [];
        }

        this.rootQuest = null;
        this.firstQuest = null;
        this.chapterCount = chapters;
        this.GeneratePlot(chapters);


    }

    GeneratePlot(chapters) {
        this.rootQuest = randomObject(QG_BossFights).CreateQuest(); //create final main quest
        this.rootQuest.mainQuest = true;
        this.GenerateTasks(this.rootQuest, chapters);
    }

    GenerateTasks(parentQuest, chapter) { //takes a quest instance and makes tasks for all its required items. If this is a main quest, it generates additional tasks and another link in the main quest.
        if (chapter > 0 || parentQuest.mainQuest) {


            //var mainQuestItemNum =  0; //the first required item of a main quest spawns another main quest
            var mainQuestItemNum = Math.floor(Math.random() * parentQuest.definition.requiredItemDefs.length) // if this is a main quest, pick a random required item to spawn another main quest

            var requiredItemDefs = parentQuest.definition.requiredItemDefs.slice();

            while (parentQuest.definition.maxItemsRequired != -1 && requiredItemDefs.length > parentQuest.definition.maxItemsRequired)
                requiredItemDefs.splice(Math.floor(Math.random() * requiredItemDefs.length, 1)) //remove items until at max items required;


            //var mainQuestItemNum = Math.floor(Math.random() * requiredItemDefs.length) // if this is a main quest, pick a random required item to spawn another main quest

            for (var taskItemDefNum = 0; taskItemDefNum < requiredItemDefs.length; taskItemDefNum++) //for each item required by the task, create a quest to get that item
            {
                var currentTaskItemDef = requiredItemDefs[taskItemDefNum];
                var taskIsMainQuest = chapter > 1 && parentQuest.mainQuest && taskItemDefNum == mainQuestItemNum;
                var createdTask = this.GenerateTaskFromItemDefinition(parentQuest, currentTaskItemDef, taskIsMainQuest); //create task for the parent
                lastMadeQuest.push(createdTask);

                if (taskIsMainQuest)
                    this.questsByChapter[chapter - 2].push(createdTask);
                else
                    this.questsByChapter[chapter - 1].push(createdTask);

                var subQuestChapter = chapter;
                if (taskIsMainQuest) {
                    this.firstQuest = createdTask;
                    subQuestChapter--;
                }
                this.GenerateTasks(createdTask, subQuestChapter); //create sub tasks for the task (recursion) 
            }
        }
    }

    GenerateTaskFromItemDefinition(parentQuest, itemDefinition, mainQuest) {

        AllQuestDefs = shuffle(AllQuestDefs);

        var suitableQuestDefs = AllQuestDefs.slice();

        if (mainQuest)
            suitableQuestDefs = [randomObject(QG_BossFights)];
        else {
            suitableQuestDefs.remove(QG_BossFights);



            //shorten potentially long quest chains
            var generationsFromMain = 0;
            var testQuest = null;

            while (!testQuest || !testQuest.mainQuest) {
                generationsFromMain++;
                if (!testQuest)
                    testQuest = parentQuest;
                else
                    testQuest = testQuest.parentQuest;
            }

            if (generationsFromMain > maxQuestDepth)
                suitableQuestDefs.sort(compareRequiredItems);



        }




        //MaxItemCount



        for (var i = 0; i < suitableQuestDefs.length; i++) { //check all quests definitions for quests that give the required item 

            var tempq = suitableQuestDefs[i];
            if (tempq.awardedItemDefs.includes == null)
                write("big fucking issue");

            if (suitableQuestDefs[i].awardedItemDefs.includes(itemDefinition)) {
                var taskQuest = suitableQuestDefs[i].CreateQuest(); //create the task quest
                var newItem = itemDefinition.CreateItem(parentQuest); //create the item. make it required by parent, and given by child.

                parentQuest.AddRequiredItem(newItem);
                taskQuest.AddAwardedItem(newItem);

                if (parentQuest.mainQuest)
                    this.majorQuestItems.push(newItem);

                this.LinkParentAndTask(parentQuest, taskQuest);

                taskQuest.mainQuest = mainQuest;

                return taskQuest;
            }
        }
    }


    LinkParentAndTask(parentQuest, taskQuest) {
        parentQuest.taskQuests.push(taskQuest);
        taskQuest.parentQuest = parentQuest;
    }

}

class CampaignPlayer {
    constructor() {
        this.campaign = null;
        this.invisibileQuests = [];
        this.questLog = [];
        this.completedQuests = [];
        this.inventory = [];
        this.turn = 0;
        this.currentChapter = 1;
        this.currentSession = 1;
        this.currentTask = 1;
        this.aboutToPrintSession = true;
        this.aboutToPrintChapter = true;
        this.npcs = [];

    }

    PlayCampaign(campaign) {
        this.campaign = campaign;
        this.turn = 1;

        for (var i = 0; i < 4; i++)
            this.GainRandomAlly();


        /* write("<h3>Campaign Overview</h3>");
         writeln("The party's ultimate goal is to " + this.campaign.rootQuest.headline + ".");
 
         writeln("Starting allies include: ")
         for (var i = 0; i < this.npcs.length; i++)
             writebullet(this.npcs[i].name);
 
 */

        this.GainQuest(this.campaign.firstQuest)
        this.PlayQuest();
    }

    PlayQuest() {
        this.turn++;
        var playedQuest = false;
        var chosenQuest = null;
        for (var i = 0; i < this.questLog.length; i++) {

            if (!this.questLog[i].complete && containsAllElements(this.inventory, this.questLog[i].requiredItems)) { //chose this quest

                chosenQuest = this.questLog[i];
                chosenQuest.complete = true;
                playedQuest = true;


                //Announce New Chapter
                if (this.aboutToPrintChapter) {
                    writeln("");
                    write("<h3>Chapter " + this.currentChapter + "</h3>");


                    var chapterDescription = "In which the party attempts to "

                    //Explain main goal
                    var rootOfChosenQuest = chosenQuest;
                    var lootOfRoot = chosenQuest.awardedItems[0];
                    while (!rootOfChosenQuest.mainQuest) {
                        lootOfRoot = rootOfChosenQuest.awardedItems[0];
                        rootOfChosenQuest = rootOfChosenQuest.parentQuest;
                    }
                    if (rootOfChosenQuest)
                        chapterDescription += rootOfChosenQuest.headline + ". "

                    //main goal's requirements
                    chapterDescription += "In order to do this, the party must gain "+OxfordComma(rootOfChosenQuest.requiredItems)+". ";
                 



                    //List out characters
                    var chapterQuests = this.campaign.questsByChapter[this.currentChapter - 1];
                    var chapterCharacters = [];

                    for (var chapterTask = 0; chapterTask < chapterQuests.length; chapterTask++) {
                        var currentQ = chapterQuests[chapterTask];
                        if (currentQ.featuresCharacter && !chapterCharacters.includes(currentQ.targetCharacter)) {
                            chapterCharacters.push(currentQ.targetCharacter);
                        }
                    }
                    if (chapterCharacters.length > 0)
                        chapterDescription += "Important characters include " + OxfordComma(chapterCharacters) + ". ";

                    //output.substr(0, output.length - 2) + ". ";

                    //List out Locations
                    var chapterQuests = this.campaign.questsByChapter[this.currentChapter - 1];
                    var chapterSites = [];
                    for (var chapterTask = 0; chapterTask < chapterQuests.length; chapterTask++) {
                        var currentQ = chapterQuests[chapterTask];
                        if (currentQ.featuresSite && !chapterSites.includes(currentQ.targetSite)) {
                            chapterSites.push(currentQ.targetSite);
                        }
                    }
                    if (chapterSites.length > 0)
                        chapterDescription += "Relevant locations include "+OxfordComma(chapterSites) + ". ";


                    writeln("<i> " + chapterDescription + "</i>");

                    this.currentChapter++;
                }

                //Announce New Quest
                if (this.aboutToPrintSession) {
                    write("<h4>Quest " + this.currentSession + "</h4>");
                    this.currentTask = 0;
                    this.currentSession++;

                    if (chosenQuest.mainQuest) {
                        writeln("<i>In which the party makes a desperate gamble!</i>");
                    }
                    else {
                        var rootOfChosenQuest = chosenQuest;
                        var lootOfRoot = chosenQuest.awardedItems[0];
                        while (!rootOfChosenQuest.mainQuest) {
                            lootOfRoot = rootOfChosenQuest.awardedItems[0];
                            rootOfChosenQuest = rootOfChosenQuest.parentQuest;
                        }
                        if (lootOfRoot)
                            writeln("<i>In which the party aims to acquire " + lootOfRoot.name + "</i>");
                    }

                }


                //Generate and Announce Task
                this.currentTask++;

                this.NPCInteractions(chosenQuest);



                var totalReport = "";
                var stringStart = "The party ";


                if (chosenQuest.requiredItems.length > 0 && (chosenQuest.requiredItems.length != 1 || Math.random() < .25)) {
                    totalReport += "With ";
                    totalReport += OxfordComma(chosenQuest.requiredItems);
                    totalReport += ", "
                    stringStart = stringStart.toLowerCase();
                }
                else if (chosenQuest.requiredItems.length == 1 && this.currentTask > 1) {
                    stringStart = randomObject(["With this, our band of heroes ", "With this, the party ", "Having accomplished this, the party ", "Having achieved that, the party ", "The party ", "The party ", "The party "]);
                }

                if (chosenQuest.requiredItems.length == 0 && this.currentTask > 1) {
                    stringStart = "Then, the group ";
                }

                totalReport += (stringStart + chosenQuest.name + "");


                var lastQuestOfSession = false;

                if (chosenQuest.awardedItems.length > 0) {

                    if (chosenQuest.mainQuest) {
                        totalReport += ". In the aftermath, the party inadvertantly gains something curious: "
                    }
                    else
                        totalReport += randomObject([" and gains ", " and gains ", " and gains ", ", gaining ", " and obtains ", ", obtaining ", " and acquires ", ", acquiring "]);
                    for (var itemNum = 0; itemNum < chosenQuest.awardedItems.length; itemNum++) {
                        totalReport += (chosenQuest.awardedItems[itemNum].name + " ");
                        this.inventory.push(chosenQuest.awardedItems[itemNum]);
                        if (this.campaign.majorQuestItems.includes(chosenQuest.awardedItems[itemNum]))
                            lastQuestOfSession = true;
                    }
                }
                if (chosenQuest == this.campaign.rootQuest)
                    totalReport += " ";//otherwise final quest would get concatenated too much
                write(totalReport.substr(0, totalReport.length - 1) + ". ");





                this.aboutToPrintChapter = chosenQuest.mainQuest && this.currentChapter <= this.campaign.chapterCount;
                this.aboutToPrintSession = lastQuestOfSession;

                if (chosenQuest.parentQuest != null)
                    this.GainQuest(chosenQuest.parentQuest);
                break;
            }
        }

        if (chosenQuest == this.campaign.rootQuest)
            writeln("<h2>Campaign Over!</h2>");
        else if (playedQuest)
            this.PlayQuest();
        else {
            writeln("<h2>No more quests! Campaign Failed!</h2>");
        }
    }

    NPCInteractions(chosenQuest) {
        if (chosenQuest.targetCharacter.flag != -1) {
            this.npcs.push(chosenQuest.targetCharacter);
            // write("The party befriends " + chosenQuest.targetCharacter.name + ": ");
        }

        if (chosenQuest.definition.NPCsDestroyed != -1) {
            var npcToDestroy = null;
            for (var k = 0; k < this.npcs.length; k++) {
                if (this.npcs[k].flag == chosenQuest.definition.NPCsDestroyed && this.npcs[k].alive) {
                    write("Suddenly, the party discoveres that their friend " + this.npcs[k].name + " has been brutally murdered by the villain! ");
                    this.npcs[k].alive = false;
                    console.log("Found npcs to kill: " + this.npcs[k].name)
                    chosenQuest.targetCharacter = this.npcs[k];
                    break;
                }
            }

        }
    }

    GainRandomAlly() {
        var newAlly = new Character(NPCflag.ALLY);
        this.npcs.push(newAlly);
    }

    GainQuest(quest) {

        if (this.questLog.includes(quest))
            return;

        this.questLog.push(quest);

        /*var report = "New " + (quest.mainQuest ? "main " : "") + "quest gained: " + quest.name;

        if (quest.requiredItems.length > 0) {
            report += ". Requires: ";
            for (var i = 0; i < quest.requiredItems.length; i++)
                report += quest.requiredItems[i].name + ", ";
        }
        else
            report += ". Requires no items";

        if (quest.awardedItems.length > 0) {
            report += ". Grants ";
            for (var i = 0; i < quest.awardedItems.length; i++)
                report += quest.awardedItems[i].name + ", ";
        }
        else
            report += ". Grants no items";

        writeln(report);
*/
        for (var i = 0; i < quest.taskQuests.length; i++) {
            var newTask = quest.taskQuests[i];
            if (!this.questLog.includes(newTask)) {
                this.GainQuest(newTask);
            }
        }
    }
}




var NPCflag = {
    ALLY: 0, //created by helping people, and will help in future, and/or betray
    PET: 1, //rarely harmed
    ENEMY: 2, //
    CONTACT: 3
};

class QuestDefinition {
    constructor(name, requiredItemDefs, awardedItemDefs) {
        this.name = name;
        this.headline = name;
        this.requiredItemDefs = requiredItemDefs;
        this.awardedItemDefs = awardedItemDefs;
        this.maxItemsRequired = -1;

        this.NPCsCreated = -1; //creates a persistant random npc if non-negative
        this.NPCsDestroyed = -1; //destroys a persistant random npc if non-negative

        AllQuestDefs.push(this);
    }

    CreateQuest() {
        var newQuest = new Quest(this);

        //var randomName = ;
        //names.splice(names.indexOf(randomName), 1); //permanently removes name from array;
        newQuest.targetCharacter = new Character(newQuest.definition.NPCsCreated); //FIX

        // siteNames.splice(siteNames.indexOf(randomSiteName), 1); //permanently removes name from array;
        newQuest.targetSite = new Site(randomObject(siteNames)); //FIX

        if (newQuest.targetCharacter != null) {
            newQuest.name = newQuest.name.replace("[C]", newQuest.targetCharacter.name)
            newQuest.headline = newQuest.headline.replace("[C]", newQuest.targetCharacter.name)
        }

        if (newQuest.targetSite != null)
            newQuest.name = newQuest.name.replace("[S]", newQuest.targetSite.name)

        return newQuest;
    }

    MaxItemCount() {
        if (this.maxItemsRequired == -1)
            return this.requiredItemDefs.length;
        else
            return this.maxItemsRequired;
    }
}


//compare quest definitions by required items
function compareRequiredItems(a, b) {
    if (a.MaxItemCount() > b.MaxItemCount())
        return 1;
    else if (a.MaxItemCount() < b.MaxItemCount())
        return -1;
    else
        return 0;
}


class Quest {
    constructor(definition) {
        this.name = definition.name;
        this.definition = definition;
        this.headline = definition.headline;
        this.featuresCharacter = definition.name.includes("[C]");
        this.featuresSite = definition.name.includes("[S]");
        this.complete = false;

        this.mainQuest = false;
        this.targetCharacter = null;
        this.targetSite = null;

        this.parentQuest = null;
        this.taskQuests = [];

        this.requiredItems = []
        this.awardedItems = []
    }

    AddRequiredItem(newItem) {
        this.requiredItems.push(newItem);
        if (newItem.definition.name.includes("[C]"))
            this.featuresCharacter = true;
        if (newItem.definition.name.includes("[S]"))
            this.featuresSite = true;
    }

    AddAwardedItem(newItem) {
        this.awardedItems.push(newItem);
        // if (newItem.definition.name.includes("[C]"))
        //     this.featuresCharacter = true;
        //  if (newItem.definition.name.includes("[S]"))
        //     this.featuresSite = true;
    }
}



class ItemDefinition {
    constructor(name) {
        this.name = name;
        AllItemDefs.push(this);
    }

    CreateItem(sourceQuest) { //this should accept the relevant quest it is required for, to fill out name and descriptions
        var newItem = new Item(this, this.name, sourceQuest);
        if (!newItem)
            print("item failed");
        return newItem;
    }
}

class Item {
    constructor(definition, name, sourceQuest) {
        this.definition = definition;
        this.name = name;
        this.sourceQuest = sourceQuest;

        if (this.name.constructor === Array)
            this.name = randomObject(this.name);

        if (sourceQuest.targetCharacter != null) {
            this.name = this.name.replace("[C]", sourceQuest.targetCharacter.name)

        }
        if (sourceQuest.targetSite != null)
            this.name = this.name.replace("[S]", sourceQuest.targetSite.name)
    }
}

class Character {
    constructor(flag) { //run as the quest is being generated from a definition
        this.female = Math.random() < 0.5;
        this.alive = true;
        this.flag = flag;

        if (this.female)
            this.name = randomObject(femaleCharacterNames)
        else
            this.name = randomObject(maleCharacterNames)

        CastOfCharacters.push(this);
    }

    FullName() {
        return this.name;
    }
}

class Site { //run as the quest is being generated from a definition
    constructor(name) {
        this.name = name;
    }
}

//Item Definitions
var IDef_UnderworldFavor = new ItemDefinition(["a favor from the underworld", "a rogue's debt"]);
var IDef_NobleFavor = new ItemDefinition(["a noble's favor", "the service of a noble"]);
var IDef_CommonFavor = new ItemDefinition("the goodwill of the common folk");
var IDef_DivineFavor = new ItemDefinition(["the favor of a god", "the favor of a priest", "the service of a priest"]);
var IDef_UnholyFavor = new ItemDefinition(["the favor of a demon", "the service of a devil"]);
var IDef_WizardFavor = new ItemDefinition(["the favor of a wizard", "the service of a wizard"]);

var IDef_TrueName = new ItemDefinition("true name of [C]"); //can be used to bind demons and elementals (maybe even to make airship), ressurect
var IDef_Prophecy = new ItemDefinition("prophecy"); //can be interpreted

var IDef_PowerfulAlly = new ItemDefinition("a powerful ally");
var IDef_Lore = new ItemDefinition(["magical lore", "secret lore", "exotic lore", "mystic lore", "arcane instructions"]);
var IDef_AccessToSite = new ItemDefinition("access to [S]");
var IDef_ProofOfMurder = new ItemDefinition("proof of the kill");
var IDef_CapturedFugitive = new ItemDefinition("the captured fugitive");
var IDef_ProofOfDevotion = new ItemDefinition("proof of devotion");// not used yet
var IDef_Fame = new ItemDefinition(["fame", "a reputation", "the attention of the poets", "infamy", "unexpected attentions"]);
var IDef_BountyNotice = new ItemDefinition("a bounty notice");
var IDef_Drugs = new ItemDefinition(["some potent drugs", "exotic narcotics", "an illegal liquor", "hallucinogenic incense"]);
var IDef_Intimidation = new ItemDefinition("intimidation");

var IDef_SecretDocuments = new ItemDefinition("secret documents");
var IDef_TreasureMap = new ItemDefinition("a treasure map");
var IDef_IncriminatingEvidence = new ItemDefinition("incriminating evidence");

var IDef_WoundVillain = new ItemDefinition("the wounding of the villain");

var IDef_LocationOfCharacter = new ItemDefinition("awareness of [C]'s location");
var IDef_WeaknessOfCharacter = new ItemDefinition("the key to [C]'s weakness");
var IDef_IdentityOfCharacter = new ItemDefinition("the secret of [C]'s true identity");

var IDef_MagicPotion = new ItemDefinition(["a magic potion", "a blessed salve", "a special oil", "a rare tincture"]); //can be used to cure plague
var IDef_RareIngredients = new ItemDefinition("some rare ingredients"); //can be used to make potion, drugs
var IDef_MagicGem = new ItemDefinition("a magic gem");
var IDef_EnchantedSword = new ItemDefinition(["an enchanted sword", "a mythical axe", "the lance of destiny"]);
var IDef_AncientRelic = new ItemDefinition(["an ancient relic", "the staff of power", "the wand of eternity", "the mysterious amulet"]);
var IDef_MagicMirror = new ItemDefinition("a magic mirror");
var IDef_Egg = new ItemDefinition("a curious egg");

var IDef_GuardsOvercome = new ItemDefinition("the defeat of the guards");
var IDef_EvilSource = new ItemDefinition("knowledge of the source of the evil");

var IDef_Costumes = new ItemDefinition("costumes");

var IDef_Freedom = new ItemDefinition("freedom from imprisonment");

var IDef_PeaceSpirits = new ItemDefinition("harmony amongst the spirits");
var IDef_PeaceNaturalDisaster = new ItemDefinition("the end of the natural disaster");


var IG_Info = [IDef_LocationOfCharacter, IDef_WeaknessOfCharacter, IDef_IdentityOfCharacter, IDef_Lore, IDef_EvilSource]; //IDef_Lore
var IG_CommonKnowledge = [IDef_BountyNotice]; //like rumors
var IG_MagicLoot = [IDef_MagicPotion, IDef_MagicMirror, IDef_MagicGem, IDef_EnchantedSword, IDef_AncientRelic, IDef_Egg];

var IG_UnderworldGoods = [IDef_TreasureMap, IDef_SecretDocuments, IDef_Drugs, IDef_IncriminatingEvidence, IDef_AccessToSite, IDef_LocationOfCharacter, IDef_WeaknessOfCharacter, IDef_IdentityOfCharacter]
var IG_NobleRewards = [IDef_PowerfulAlly, IDef_TreasureMap, IDef_SecretDocuments, IDef_IncriminatingEvidence, IDef_AccessToSite, IDef_LocationOfCharacter, IDef_IdentityOfCharacter]
var IG_WizardRewards = [IDef_RareIngredients, IDef_TrueName, IDef_Prophecy, IDef_PowerfulAlly, IDef_AccessToSite, IDef_LocationOfCharacter, IDef_WeaknessOfCharacter, IDef_IdentityOfCharacter, IDef_WoundVillain]
var IG_Documents = [IDef_TreasureMap, IDef_SecretDocuments, IDef_IncriminatingEvidence]



var IG_RareAndValuable = IG_Info.concat(IG_MagicLoot).concat([IDef_AccessToSite, IDef_PowerfulAlly]);



//Quest Definitions
//Boss Fights
var QDef_BossFightPlanning = new QuestDefinition("defeats Usurper [C] using knowledge and planning", [IDef_IdentityOfCharacter, IDef_LocationOfCharacter, IDef_WeaknessOfCharacter], AllItemDefs);
QDef_BossFightPlanning.headline = "defeat the Usurper [C] with knowledge and planning, having seen the peasantry suffer under their rule";
var QDef_BossFightRelics = new QuestDefinition("defeats Cult Leader [C] using legendary items", [IDef_IdentityOfCharacter, IDef_MagicGem, IDef_EnchantedSword, IDef_AncientRelic], AllItemDefs);
QDef_BossFightRelics.headline = "thwart [C], leader of a doomsday cult, using the three relics of prophecy"
var QDef_BossFightAlliance = new QuestDefinition("defeats the scourge [C] with an alliance", [IDef_PowerfulAlly, IDef_PowerfulAlly, IDef_PowerfulAlly], AllItemDefs);
QDef_BossFightAlliance.headline = "overcome the realm-threatening scourge [C] by assembling an alliance"
var QDef_BossFightUnmask = new QuestDefinition("defeats Vizier [C] by unmasking them", [IDef_Freedom, IDef_PowerfulAlly, IDef_IncriminatingEvidence, IDef_GuardsOvercome], AllItemDefs);
QDef_BossFightUnmask.headline = "reveal the corrupt advisor [C] by proving their guilt"
var QDef_BossFightAssassinate = new QuestDefinition("assassinates the tyrant [C], restoring justice to the realm", [IDef_LocationOfCharacter, IDef_AccessToSite, IDef_GuardsOvercome], AllItemDefs);
QDef_BossFightAssassinate.headline = "assassinate the tyrant [C], whose cruelty and perversity knows no bounds"
var QDef_BossFightEscape = new QuestDefinition("defeats the mastermind [C]", [IDef_IdentityOfCharacter, IDef_Freedom, IDef_AccessToSite, IDef_GuardsOvercome], AllItemDefs);
QDef_BossFightEscape.headline = "thwart mastermind [C] by escaping imprisonment and ultimately confronting them in their sanctuary"
var QDef_BossFightPlague = new QuestDefinition("cures the terrible plague being spread by [C]", [IDef_EvilSource, IDef_MagicPotion, IDef_Lore], AllItemDefs);
QDef_BossFightPlague.headline = "cure a virulent plague that is sweeping across the land"

var QDef_BossFightBandit = new QuestDefinition("defeats the bandit leader [C] and liberates the countryside", [IDef_IdentityOfCharacter, IDef_AccessToSite, IDef_GuardsOvercome], AllItemDefs);
QDef_BossFightBandit.headline = "defeat a band of outlaws ravaging the countryside, lead by the disgraced knight [C]";

var QDef_BossFightDruid = new QuestDefinition("defeats the archdruid [C]", [IDef_IdentityOfCharacter, IDef_PeaceSpirits, IDef_PeaceNaturalDisaster, IDef_AccessToSite], AllItemDefs);
QDef_BossFightDruid.headline = "defeat the archdruid [C]"


var QG_BossFights = [QDef_BossFightPlanning, QDef_BossFightRelics, QDef_BossFightAlliance, QDef_BossFightUnmask, QDef_BossFightAssassinate,
    QDef_BossFightEscape, QDef_BossFightPlague, QDef_BossFightBandit, QDef_BossFightDruid];


//Basic Quests
//var QDef_DeusExMachina = new QuestDefinition("deus ex machina", AllItemDefs, AllItemDefs);

var QDef_DeusExGainAlly = new QuestDefinition("rescues the highborn [C] from the clutches of the villain", [], [IDef_NobleFavor]);
QDef_DeusExGainAlly.NPCsCreated = NPCflag.ALLY;
var QDef_DeusExGainAlly = new QuestDefinition("rescues the commoner [C] from the clutches of the villain", [], [IDef_CommonFavor]);
QDef_DeusExGainAlly.NPCsCreated = NPCflag.ALLY;
var QDef_DeusExGainAlly = new QuestDefinition("rescues the priest [C] from the clutches of the villain", [], [IDef_DivineFavor]);
QDef_DeusExGainAlly.NPCsCreated = NPCflag.ALLY;
var QDef_DeusExGainAlly = new QuestDefinition("rescues the mage [C] from the clutches of the villain", [], [IDef_WizardFavor]);
QDef_DeusExGainAlly.NPCsCreated = NPCflag.ALLY;
var QDef_DeusExGainAlly = new QuestDefinition("bargains with the demon [C]", [], [IDef_UnholyFavor]);
QDef_DeusExGainAlly.NPCsCreated = NPCflag.ALLY;

var QDef_DeusExLoseALly = new QuestDefinition("is distraught by the assassination of a friend, but finds a vital clue at the scene of the crime", [], IG_MagicLoot.concat(IG_Documents));
QDef_DeusExLoseALly.NPCsDestroyed = NPCflag.ALLY;

var QDef_GenericKill = new QuestDefinition("kills [C]", [], [IDef_ProofOfMurder]);
var QDef_BrazenKill = new QuestDefinition("brazenly attacks [C]", [], [IDef_ProofOfMurder]);
var QDef_AmbushKill = new QuestDefinition("ambushes [C]", [], [IDef_ProofOfMurder]);
var QDef_AmbushWound = new QuestDefinition("ambushes the villain", [], [IDef_WoundVillain]);
var QDef_CaptureFugitive = new QuestDefinition("apprehends [C], a wanted scofflaw", [IDef_LocationOfCharacter], [IDef_CapturedFugitive]);
var QDef_SneakPastGuards = new QuestDefinition("sneaks past the sentinels", [], [IDef_GuardsOvercome]);
var QDef_GenericKill = new QuestDefinition("confronts Captain [C]", [], [IDef_GuardsOvercome]);
var QDef_GenericAssassinate = new QuestDefinition("assassinates [C]", [IDef_LocationOfCharacter, IDef_AccessToSite], [IDef_ProofOfMurder, IDef_Intimidation]);

var QDef_SootheSpirits = new QuestDefinition("soothes the rioting spirits", [IDef_AccessToSite], [IDef_PeaceSpirits]);
var QDef_DruidicRite = new QuestDefinition("performs an ancient druidic rite", [IDef_Lore, IDef_AccessToSite], [IDef_PeaceNaturalDisaster]);

var QDef_MedusaFight = new QuestDefinition("battles the medusa", [IDef_MagicMirror], [IDef_ProofOfMurder]);

var QDef_FreedomLabyrinth = new QuestDefinition("escapes the labyrinth after being thrown inside", [], [IDef_Freedom]);
var QDef_FreedomLocation = new QuestDefinition("escapes from [S]", [], [IDef_Freedom]);
var QDef_FreedomGuards = new QuestDefinition("escapes from [S]", [IDef_GuardsOvercome], [IDef_Freedom]);
var QDef_FreedomJailer = new QuestDefinition("is captured, but fools the jailer", [], [IDef_Freedom]);
var QDef_FreedomTorturer = new QuestDefinition("is betrayed, but overpowers their torturer", [], [IDef_Freedom]);
var QDef_FreedomColliseum = new QuestDefinition("is enslaved, and must battle through the colliseum of [S]", [], [IDef_Freedom]);
var QDef_FreedomDungeon = new QuestDefinition("is thrown into a prison below [S], but is able to navigate this dungeon", [], [IDef_Freedom]);
var QDef_FreedomIllusion = new QuestDefinition("realizes it has been trapped within an idyllic illusion", [], [IDef_Freedom]);

var QDef_GenericBeastFight = new QuestDefinition("kills a mythical beast", [], IG_MagicLoot.concat(IDef_Fame));
var QDef_DragonFight = new QuestDefinition("defeats the dragon there", [IDef_AccessToSite], IG_MagicLoot.concat(IDef_Fame));
var QDef_FollowTreasureMap = new QuestDefinition("uncovers a hoard", [IDef_TreasureMap, IDef_AccessToSite], IG_MagicLoot);
var QDef_HatchDragon = new QuestDefinition("hatches the egg", [IDef_Egg], [IDef_PowerfulAlly]);

var QDef_MagicItemTrade = new QuestDefinition("trades with a collector", IG_MagicLoot, IG_MagicLoot);
QDef_MagicItemTrade.maxItemsRequired = 1;


var QDef_Heroics = new QuestDefinition("wins great prestige", [IDef_WoundVillain], [IDef_Fame]);

var QDef_InterrogateCharacter = new QuestDefinition("interrogates [C]", [IDef_LocationOfCharacter], IG_Info);
var QDef_TrackCharacter = new QuestDefinition("tracks [C]", [IDef_IdentityOfCharacter], [IDef_LocationOfCharacter]);

var QDef_GainPowerfulAlly = new QuestDefinition("makes a great sacrifice at the altar of the gods", [], [IDef_PowerfulAlly]);
var QDef_AllySeduce = new QuestDefinition("seduces a disaffected follower", [], [IDef_PowerfulAlly]);
var QDef_AllyBetray = new QuestDefinition("persuades [C], an ambitious lieutenant, to betray their master", [], [IDef_PowerfulAlly]);
var QDef_AllyHeir = new QuestDefinition("locates and rescues the true heir [C]", [IDef_SecretDocuments], [IDef_PowerfulAlly]);
var QDef_AbandonedMine = new QuestDefinition("delves into the treacherous depths an abandoned mine", [], [IDef_MagicGem]);
var QDef_FabledHorde = new QuestDefinition("steals from a fabled hoard of treasure", [], IG_MagicLoot);
var QDef_MasterSmith = new QuestDefinition("plunders the armory of a master smith", [], [IDef_EnchantedSword]);

//Accessing Sites
var QDef_BribeGuard = new QuestDefinition("bribes a guard at [S]", [], [IDef_AccessToSite]);
var QDef_InfiltrateSite = new QuestDefinition("infiltrates [S]", [], [IDef_AccessToSite]);
var QDef_LongTravel = new QuestDefinition("travels a great distance, past [S]", [], [IDef_AccessToSite]);
var QDef_TravelSailing = new QuestDefinition("sails past [S]", [], [IDef_AccessToSite]);
var QDef_TravelAirship = new QuestDefinition("takes an airship over [S]", [], [IDef_AccessToSite]);
var QDef_TravelTeleportation = new QuestDefinition("uses a teleportation circle in [S]", [], [IDef_AccessToSite]);


var QDef_StealFromSite = new QuestDefinition("steals from [S]", [IDef_AccessToSite], IG_MagicLoot.concat(IG_Documents));
var QDef_StealFromCharacter = new QuestDefinition("steals from [C]", [IDef_LocationOfCharacter], IG_MagicLoot.concat(IG_Documents));


var QDef_ActivateArtifct = new QuestDefinition("activates the artifact", [IDef_AncientRelic, IDef_Lore], IG_MagicLoot.concat([IDef_IdentityOfCharacter, IDef_LocationOfCharacter, IDef_AccessToSite, IDef_PowerfulAlly]));
var QDef_ActivateArtifct = new QuestDefinition("looks deeply within", [IDef_MagicMirror], IG_Info);

var QDef_LocateCharacterByQuestioning = new QuestDefinition("locates their target by questioning their associate [C]", [], [IDef_LocationOfCharacter]);
var QDef_ResearchCharacter = new QuestDefinition("performs thorough research", [], IG_Info);
var QDef_AskAroundAboutCharacter = new QuestDefinition("asks informed individuals", [], [IDef_LocationOfCharacter, IDef_IdentityOfCharacter]);


var QDef_BountyNotice = new QuestDefinition("hears about a bounty", [], [IDef_BountyNotice]);
var QDef_BountyKill = new QuestDefinition("cashes in the bounty", [IDef_BountyNotice, IDef_ProofOfMurder], IG_MagicLoot);
var QDef_BountyKill = new QuestDefinition("cashes in the bounty", [IDef_BountyNotice, IDef_CapturedFugitive], IG_MagicLoot);

var QDef_KillRampagingMonster = new QuestDefinition("kills a rampaging monster", [], [IDef_Fame, IDef_NobleFavor, IDef_CommonFavor]);



var QDef_AudienceWithRoyalty = new QuestDefinition("is granted an audience at court", [IDef_Fame], IG_RareAndValuable)

//Learning things for free
var QDef_HearTownCrier = new QuestDefinition("overhears town crier", [], IG_CommonKnowledge)
var QDef_HearFromInformant = new QuestDefinition("consults with their informant [C]", [], IG_CommonKnowledge) //IDef_UncommonKnowledge
var QDef_Happenstance = new QuestDefinition("stumbles into a random happenstance", [], IG_CommonKnowledge)
var QDef_LocalPostings = new QuestDefinition("reads local postings", [], IG_CommonKnowledge) //IDef_UncommonKnowledge
var QDef_HearRumor = new QuestDefinition("hears rumors", [], IG_CommonKnowledge)

//Favors
var QDef_RallyTheCommonFolk = new QuestDefinition("rallies the peasants", [IDef_CommonFavor], [IDef_PowerfulAlly, IDef_WoundVillain]);

var QDef_CashInUnderworldFavor = new QuestDefinition("uses their illicit connection", [IDef_UnderworldFavor], IG_UnderworldGoods)
var QDef_FavorForUnderworldContact = new QuestDefinition("does a job for an underworld contact known as [C]", [], [IDef_UnderworldFavor])

var QDef_ApproachedBySecretSociety = new QuestDefinition("is approached by a secret society", [IDef_Fame], IG_UnderworldGoods)

var QDef_CashInNobleFavor = new QuestDefinition("uses their aristocratic connection", [IDef_NobleFavor], IG_NobleRewards)
var QDef_NobleDiscredit = new QuestDefinition("discredits them on behalf of their rival", [IDef_IncriminatingEvidence], [IDef_NobleFavor])
QDef_NobleDiscredit.NPCsCreated = NPCflag.ALLY
var QDef_FavorForNobleContact = new QuestDefinition("does a job for the noble [C]", [], [IDef_NobleFavor])
QDef_FavorForNobleContact.NPCsCreated = NPCflag.ALLY
var QDef_DeliverLoveLetter = new QuestDefinition("delivers a message from [C], a star-crossed lover", [IDef_AccessToSite], [IDef_NobleFavor])
QDef_DeliverLoveLetter.NPCsCreated = NPCflag.ALLY
var QDef_DrugDelivery = new QuestDefinition("delivers drugs to the decadent noble [C]", [IDef_Drugs], [IDef_NobleFavor, IDef_IncriminatingEvidence])
var QDef_CureAilingNoble = new QuestDefinition("cures an ailing noble", [IDef_MagicPotion], [IDef_NobleFavor])
QDef_CureAilingNoble.NPCsCreated = NPCflag.ALLY

var QDef_CashInWizardFavor = new QuestDefinition("requests the casting of a spell", [IDef_WizardFavor], IG_WizardRewards)
var QDef_WizardTask = new QuestDefinition("performs a dangerous task for a reclusive spellcaster", [], [IDef_WizardFavor])
QDef_WizardTask.NPCsCreated = NPCflag.ALLY
var QDef_WizardTaskCouncil = new QuestDefinition("performs a quest for Archmage [C] and the council of mages", [], [IDef_WizardFavor])
var QDef_WizardTaskExperiment = new QuestDefinition("captures a runaway experiment for the wizard [C]", [], [IDef_WizardFavor])
QDef_WizardTaskExperiment.NPCsCreated = NPCflag.ALLY
var QDef_WizardTaskConfinement = new QuestDefinition("frees the mage [C] from confinement", [], [IDef_WizardFavor])
QDef_WizardTaskConfinement.NPCsCreated = NPCflag.ALLY
var QDef_WizardTaskMeteor = new QuestDefinition("recovers fragments of a fallen star for the mage [C]", [], [IDef_WizardFavor])
QDef_WizardTaskMeteor.NPCsCreated = NPCflag.ALLY

var QDef_StealGuardCostumes = new QuestDefinition("steals guard uniforms", [IDef_GuardsOvercome], [IDef_Costumes]);
var QDef_SneakByInCostume = new QuestDefinition("sneaks inside [S] with a disguise", [IDef_Costumes], [IDef_AccessToSite])
var QDef_AttendMasqueradeUninvited = new QuestDefinition("attends the masquerade", [IDef_Costumes], [IDef_IdentityOfCharacter, IDef_LocationOfCharacter])
var QDef_AttendMasqueradeInvited = new QuestDefinition("attends the masquerade", [IDef_NobleFavor], [IDef_IdentityOfCharacter, IDef_LocationOfCharacter])

//Skulduggery
var QDef_ForgeEvidence = new QuestDefinition("creates a forgery", [], [IDef_IncriminatingEvidence]);
var QDef_ConvertEvidenceToBlackmail = new QuestDefinition("blackmails [C]", [IDef_IncriminatingEvidence], IG_Info.concat(IDef_UnderworldFavor, IDef_NobleFavor))
var QDef_Extort = new QuestDefinition("extorts the aristocrat [C]", [IDef_Intimidation], [IDef_NobleFavor])
var QDef_ReadSecretDocuments = new QuestDefinition("desiphers their meaning", [IDef_SecretDocuments], IG_Info)

//Magical Endevours
var QDef_ResearchLore = new QuestDefinition("researches forgotten texts", [], [IDef_Lore, IDef_EvilSource]);
var QDef_Brew = new QuestDefinition("brews the recipe", [IDef_RareIngredients, IDef_Lore], [IDef_MagicPotion, IDef_Drugs])




/*
new item: the identity of the mastermind behind it all
new item: details of the plot

recovers a stolen item/document for an organizaiton [document]
releases a bound, misunderstood monster from slavery and torture [gain powerful ally]

A necromancer unleashes an undead army upon the populace
A corrupt baron taxes the peasantry to starvation
A dragon claims a province of its own

A sinister advisor misleads the king into ruin
A cult is abducting and murdering people in order to resurrect a dead God 

chase sequence
opera
enchanting music
curse of sleep upon kingdom
psychadelic

Arrange marriages
Time travel
Parallel universe
Cure amnesia
Enter dreams
Solve mystery
Unravel conspiracy
Sabotage
Lead war
Change sides
Encounter society that causes reevaluation of moral system
Ressurect figure
Overcome loss of powers
Escape ambush
Body swap
Escape false utopia
Cult
Stop ritual
Choose lesser of evils
Bind elementals or demons
Invoke gods
Give players Corrupting power
Raise morale, sysiphean task
Fight in the collisuem
Escape slavery, capture
Multi piece chain quest
Deal with devil
- free devil
- get revenge
Combine all powerful being to intervene
Tame celestial beast
Entreat the witch

Bosses
Defeat the necromancer
Cure the Plague
Ancient evil ressurect in
Dragon King

Medusa req magic mirror
Cure vampirism
Vampire court/cabal

vampire-major-quest-item

Silence rabel rouser
Wild Golem 
Learn true name
Learn secret identity

Defeat illusion - perfect world
Discover inside illusion
Notice inconsistentcy

Joker anarchist
Break enchantment on king

Switching between universes
Crisis of confidence, purpose

Show error of ways
Face off against copies/mirror of party

Gather ingredients for potion
Water from eternal well for potion
Use potion to cure malady

Noble-Favor
Underworld-Favor
Unholy-Favor
Divine-Favor

Prophecy
Prophetic vision (cleric, grants rare knowledge - where something is)
Interpret prophecy

Lift curse of silence
Lead the people, grants powerful ally

Certain backgrounds have access to certain quests
Use family connection
Underground contacts
Research at wizard library

Choose villain scheme and PC backgrou
*/


var currentCampaign;
var currentCampaignPlayer;
var generateOutput = "";

var chapterCount = 5;
var maxQuestDepth = 3;

function GenerateCampaign() {
    generateOutput = "";
    GenerateSiteNames();

    chapterCount = parseInt(document.getElementById("chapterCount").value, 10);
    maxQuestDepth = Math.max(0, parseInt(document.getElementById("questDepth").value - 1, 10));

    //writeln("Generating Campaign!");

    currentCampaign = new Campaign(Math.max(chapterCount, 2));

    //writeln("Playing Campaign!");
    currentCampaignPlayer = new CampaignPlayer();
    currentCampaignPlayer.PlayCampaign(currentCampaign);

    //writeln("Campaign Complete!");
    document.getElementById('SummaryOutput').innerHTML = generateOutput;
}


//Output Methods
function write(text) {
    generateOutput += text;
}
function writeln(text) {
    generateOutput += text + "<br>";
}

function writebullet(text) {
    generateOutput += "<li>" + text + "</li>";
}