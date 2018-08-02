
/**
 * Get a template DOM object from the DOM and return a usable DOM object
 * from the main node within it. Assumes that there is only one main parent
 * node in the template.
 * 
 * @param {string} id the id of the template element
 * @returns {Object} a deep clone of the templated element
 */
function getElementFromTemplate(id) {
    let domNode = document.importNode(document.getElementById(id).content, true).firstElementChild;

    return domNode;
}

document.addEventListener('DOMContentLoaded', () => {

    //When window loads the GetQuestion button is hidden
    window.addEventListener('load', (event) => {
        console.log('game loaded');
        document.querySelector('button#new-question').classList.add('hidden');
    });

    //when teh start game buttn is clicked 
    // a new question appears, the answer button appears, and start game button is hidden
    document.querySelector('button#start-game').addEventListener('click', (event) => {
        console.log('game started');
        getQuestion();
        document.querySelector('span#answer').classList.add('hidden');
        document.querySelector('button#start-game').classList.add('hidden');
    });
    
    //When the answer button is clicked the answer appears
    // the answer button becomes hidden
    document.querySelector('button#new-question').addEventListener('click', (event) => {
        console.log('clicked');
        getQuestion();

        document.querySelector('span#answer').classList.add('hidden');
    });

    //submits answer for question
    document.querySelector('button#submit').addEventListener('click', (event)=>{
        console.log('working');
        submitAnswer();
    });
});

let quest;

/**
 * Pulls a new question from jservice
 */
function getQuestion() 
{
    const url = `http://jservice.io/api/random`;
    const settings = {
        method: 'GET'
    };

    //send the request
    fetch(url, settings)
        .then(response => response.json())
        .then(json => {
            const span = document.querySelector('span#question');
            span.innerText = json[0].question;
            quest = json[0];
            console.log(quest);
            document.querySelector('button#new-question').classList.add('hidden');
    });
            
};


function submitAnswer(){
    const input = document.querySelector('input#input');
    const answer = document.querySelector('span#answer');
    if(input.value != quest.answer)
    {
        console.log('wrong')
        answer.innerText = `Wrong the right answer is: ` + quest.answer;

        document.querySelector('span#answer').classList.remove('hidden');
        document.querySelector('button#new-question').classList.remove('hidden');
    }
    else
    {
        console.log(quest.answer)
        answer.innerText = 'correct';
        document.querySelector('span#answer').classList.remove('hidden');
        increaseScore()
        getQuestion();
    }
}


function increaseScore(){
    let score = document.querySelector('span#score')
    var x = score.innerText;
    var y = quest.value
    score.innerText = +x + + y;
    console.log(quest.value)
}




