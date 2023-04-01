const input1 = document.getElementById('input');
const meaningbox = document.getElementById('meaning-box');
const givenword = document.getElementById('word');
const definition = document.getElementById('definition');
const auidosrc = document.getElementById('audio');
const info1 = document.getElementById('info');

async function getresponse(word){
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
     
    try {
        info1.innerText=`Searching the meaning of ${word}....`;
    //let r = responce in below statement
    let result = await fetch(url).then((r) => r.json());
    
    info1.innerText=`The word (${word}) searched`;

    let meaning = result[0].meanings[0].definitions[0].definition;
    //console.log(meaning);
    meaningbox.classList.remove('hide');
    givenword.innerText = word;
    definition.innerText = meaning;
  
    let sound = result[0].phonetics;
    let i = sound.findIndex((e1) => {
      return e1.audio!='';
    })
    let audio1 = result[0].phonetics[i].audio;
    auidosrc.setAttribute('src',audio1);
  
  
    } catch (error) {
        meaningbox.classList.add('hide');
        info1.innerText=`Sorry we can't find the meaning for ${word}`;
    }

}
input1.addEventListener('keyup', (e) => {
    let word = input1.value
            if(word!='' && e.key==='Enter'){
            //console.log(word);
            getresponse(word);
            }
    })