// ---------- LANGUAGE ----------
let currentLanguage = "en";

const text = {
  en: {
    title:"Party Games 🎉", charades:"Charades 🎭", spy:"Spy Game 🕵️",
    imposter:"Imposter Drawing 🎨", mrwhiteTitle:"Mr White 🕵️‍♂️",
    qsTitle:"Question Spy ❓", psychTitle:"The Psychologist 🧠",
    newWord:"New word ✨", start:"Start game", tap:"Tap to reveal 👀",
    discuss:"Game ready! Discuss 😈", spyReveal:"You are the SPY 😳",
    impReveal:"You are the IMPOSTER 😈", minPlayers:"At least 3 players babes 💖"
  },
  no: {
    title:"Selskapsspill 🎉", charades:"Charades 🎭", spy:"Spion 🕵️",
    imposter:"Impostor kunstner 🎨", mrwhiteTitle:"Mr White 🕵️‍♂️",
    qsTitle:"Spørsmål Spion ❓", psychTitle:"Psykologen 🧠",
    newWord:"Nytt ord ✨", start:"Start spill", tap:"Trykk for å se 👀",
    discuss:"Spillet er klart! Diskuter 😈", spyReveal:"Du er SPIONEN 😳",
    impReveal:"Du er IMPOSTOREN 😈", minPlayers:"Minst 3 spillere 💕"
  }
};

function setLanguage(lang){
  currentLanguage=lang; 
  localStorage.setItem("lang",lang);
  document.getElementById("title").textContent=text[lang].title;
  document.getElementById("charadesTitle").textContent=text[lang].charades;
  document.getElementById("spyTitle").textContent=text[lang].spy;
  document.getElementById("impTitle").textContent=text[lang].imposter;
  document.getElementById("mrwhiteTitle").textContent=text[lang].mrwhiteTitle;
  document.getElementById("qsTitle").textContent=text[lang].qsTitle;
  document.getElementById("psychTitle").textContent=text[lang].psychTitle;
  document.getElementById("charadesBtn").textContent=text[lang].newWord;
  document.getElementById("spyStartBtn").textContent=text[lang].start;
  document.getElementById("impStartBtn").textContent=text[lang].start;
  document.getElementById("mwStartBtn").textContent=text[lang].start;
  document.getElementById("qsStartBtn").textContent=text[lang].start;
  document.getElementById("psychStartBtn").textContent=text[lang].start;
}
const savedLang=localStorage.getItem("lang");
if(savedLang)setLanguage(savedLang); else setLanguage("en");

function showGame(id){
  document.querySelectorAll(".game").forEach(g=>g.classList.add("hidden")); 
  document.getElementById(id).classList.remove("hidden");
}

// ---------- CHARADES ----------
const charadesWords = {
  en:["Brushing teeth","Dancing","Harry Potter","Swimming","Cat stuck in a tree"],
  no:["Pusse tenner","Danse","Harry Potter","Svømming","Katt i et tre"]
};
function newCharadesWord(){
  const word = charadesWords[currentLanguage][Math.floor(Math.random()*charadesWords[currentLanguage].length)];
  document.getElementById("charadesWord").textContent = word;
}

// ---------- SPY ----------
const spyLocations = {
  en:["Beach 🏖️","School 🏫","Airport ✈️","Hospital 🏥","Restaurant 🍝"],
  no:["Strand 🏖️","Skole 🏫","Flyplass ✈️","Sykehus 🏥","Restaurant 🍝"]
};
let spyPlayer=0, spyImposter=0, spyWord="";
document.getElementById("spyStartBtn").addEventListener("click", startSpy);
document.getElementById("spyNextBtn").addEventListener("click", nextSpyPlayer);
function startSpy(){
  const players=Number(document.getElementById("spyPlayers").value);
  if(!players||players<3){alert(text[currentLanguage].minPlayers);return;}
  spyPlayer=0; spyImposter=Math.floor(Math.random()*players);
  spyWord=spyLocations[currentLanguage][Math.floor(Math.random()*spyLocations[currentLanguage].length)];
  document.getElementById("spyInfo").textContent=`Player 1`;
  document.getElementById("spyWord").textContent=text[currentLanguage].tap;
}
function nextSpyPlayer(){
  const players=Number(document.getElementById("spyPlayers").value);
  document.getElementById("spyWord").textContent=text[currentLanguage].tap;
  if(spyPlayer>=players){document.getElementById("spyInfo").textContent=text[currentLanguage].discuss; document.getElementById("spyWord").textContent=""; return;}
  document.getElementById("spyInfo").textContent=`Player ${spyPlayer+1}`;
  const el=document.getElementById("spyWord");
  el.onclick=()=>{el.textContent=spyPlayer===spyImposter?text[currentLanguage].spyReveal:spyWord};
  spyPlayer++;
}

// ---------- IMPOSTER ----------
const drawingPrompts = {
  en:["Cat 🐱","House 🏠","Flower 🌸","Tree 🌳","Sunglasses 😎"],
  no:["Katt 🐱","Hus 🏠","Blomst 🌸","Tre 🌳","Solbriller 😎"]
};
let impPlayer=0, impImposter=0, impWord="";
document.getElementById("impStartBtn").addEventListener("click", startImposter);
document.getElementById("impNextBtn").addEventListener("click", nextImpPlayer);
function startImposter(){
  const players=Number(document.getElementById("impPlayers").value);
  if(!players||players<3){alert(text[currentLanguage].minPlayers);return;}
  impPlayer=0; impImposter=Math.floor(Math.random()*players);
  impWord=drawingPrompts[currentLanguage][Math.floor(Math.random()*drawingPrompts[currentLanguage].length)];
  document.getElementById("impInfo").textContent=`Player 1`;
  document.getElementById("impWord").textContent=text[currentLanguage].tap;
}
function nextImpPlayer(){
  const players=Number(document.getElementById("impPlayers").value);
  document.getElementById("impWord").textContent=text[currentLanguage].tap;
  if(impPlayer>=players){document.getElementById("impInfo").textContent=text[currentLanguage].discuss; document.getElementById("impWord").textContent=""; return;}
  document.getElementById("impInfo").textContent=`Player ${impPlayer+1}`;
  const el=document.getElementById("impWord");
  el.onclick=()=>{el.textContent=impPlayer===impImposter?text[currentLanguage].impReveal:`Draw: ${impWord}`};
  impPlayer++;
}

// ---------- MR WHITE ----------
const mwWords = {
  en:[["Cat 🐱","Cats 🐈"],["House 🏠","Hut 🛖"]],
  no:[["Katt 🐱","Katter 🐈"],["Hus 🏠","Hytte 🛖"]]
};
let mwPlayer=0, mwOddPlayer=0, mwWord="", mwOddWord="";
document.getElementById("mwStartBtn").addEventListener("click", startMrWhite);
document.getElementById("mwNextBtn").addEventListener("click", nextMwPlayer);
function startMrWhite(){
  const players=Number(document.getElementById("mwPlayers").value);
  if(!players||players<3){alert(text[currentLanguage].minPlayers);return;}
  mwPlayer=0; mwOddPlayer=Math.floor(Math.random()*players);
  const pair=mwWords[currentLanguage][Math.floor(Math.random()*mwWords[currentLanguage].length)];
  mwWord=pair[0]; mwOddWord=pair[1];
  document.getElementById("mwInfo").textContent=`Player 1`;
  document.getElementById("mwWord").textContent=text[currentLanguage].tap;
}
function nextMwPlayer(){
  const players=Number(document.getElementById("mwPlayers").value);
  document.getElementById("mwWord").textContent=text[currentLanguage].tap;
  if(mwPlayer>=players){document.getElementById("mwInfo").textContent=text[currentLanguage].discuss; document.getElementById("mwWord").textContent=""; return;}
  document.getElementById("mwInfo").textContent=`Player ${mwPlayer+1}`;
  const el=document.getElementById("mwWord");
  el.onclick=()=>{el.textContent=mwPlayer===mwOddPlayer?mwOddWord:mwWord};
  mwPlayer++;
}

// ---------- QUESTION SPY ----------
const qsPairs = {
  en:[["What's something totally overrated?","What's something totally underrated?"],["Least favorite food?","Most favorite food?"]],
  no:[["Hva er helt overvurdert?","Hva er helt undervurdert?"],["Mest mislikte mat?","Favorittmat?"]]
};
let qsPlayer=0, qsOddPlayer=0, qsWord="", qsOddWord="";
document.getElementById("qsStartBtn").addEventListener("click", startQuestionSpy);
document.getElementById("qsNextBtn").addEventListener("click", nextQsPlayer);
function startQuestionSpy(){
  const players=Number(document.getElementById("qsPlayers").value);
  if(!players||players<3){alert(text[currentLanguage].minPlayers);return;}
  qsPlayer=0; qsOddPlayer=Math.floor(Math.random()*players);
  const pair=qsPairs[currentLanguage][Math.floor(Math.random()*qsPairs[currentLanguage].length)];
  qsWord=pair[0]; qsOddWord=pair[1];
  document.getElementById("qsInfo").textContent=`Player 1`;
  document.getElementById("qsWord").textContent=text[currentLanguage].tap;
}
function nextQsPlayer(){
  const players=Number(document.getElementById("qsPlayers").value);
  document.getElementById("qsWord").textContent=text[currentLanguage].tap;
  if(qsPlayer>=players){document.getElementById("qsInfo").textContent=text[currentLanguage].discuss; document.getElementById("qsWord").textContent=""; return;}
  document.getElementById("qsInfo").textContent=`Player ${qsPlayer+1}`;
  const el=document.getElementById("qsWord");
  el.onclick=()=>{el.textContent=qsPlayer===qsOddPlayer?qsOddWord:qsWord};
  qsPlayer++;
}

// ---------- THE PSYCHOLOGIST ----------
const psychRules = {
  en:[
    "You all cross your legs when you tell a lie - and uncross them when you are telling the truth",
    "Each answer begins with the next letter in the alphabet",
    "Everyone thinks they are the person to their right"
  ],
  no:[
    "Dere krysser beina når dere lyver - og retter dem når dere snakker sant",
    "Hvert svar begynner med neste bokstav i alfabetet",
    "Alle tror de er personen til høyre for seg"
  ]
};
let psychPlayer=0, psychOddPlayer=0, psychRule="";
document.getElementById("psychStartBtn").addEventListener("click", startPsychologist);
document.getElementById("psychNextBtn").addEventListener("click", nextPsychPlayer);
function startPsychologist(){
  const players=Number(document.getElementById("psychPlayers").value);
  if(!players||players<3){alert(text[currentLanguage].minPlayers);return;}
  psychPlayer=0; psychOddPlayer=Math.floor(Math.random()*players);
  psychRule=psychRules[currentLanguage][Math.floor(Math.random()*psychRules[currentLanguage].length)];
  document.getElementById("psychInfo").textContent=`Player 1`;
  document.getElementById("psychRule").textContent=text[currentLanguage].tap;
}
function nextPsychPlayer(){
  const players=Number(document.getElementById("psychPlayers").value);
  document.getElementById("psychRule").textContent=text[currentLanguage].tap;
  if(psychPlayer>=players){document.getElementById("psychInfo").textContent=text[currentLanguage].discuss; document.getElementById("psychRule").textContent=""; return;}
  document.getElementById("psychInfo").textContent=`Player ${psychPlayer+1}`;
  const el=document.getElementById("psychRule");
  el.onclick=()=>{el.textContent=psychPlayer===psychOddPlayer?currentLanguage==="en"?"You are the Psychologist! 🧠":"Du er psykologen! 🧠":psychRule};
  psychPlayer++;
}
