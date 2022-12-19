/*
# MILESTONE 1
Prepariamo "qualcosa" per tenere il punteggio dell'utente.
Quando l'utente clicca su una cella, incrementiamo il punteggio.
Se riusciamo, facciamo anche in modo da non poter più cliccare la stessa cella.
# MILESTONE 2
Facciamo in modo di generare 16 numeri casuali (tutti diversi) compresi tra 1 e il massimo di caselle disponibili.
Generiamoli e stampiamo in console per essere certi che siano corretti
# MILESTONE 3
Quando l'utente clicca su una cella, 
verifichiamo se ha calpestato una bomba, controllando se il numero di cella è presente nell'array di bombe.
Se si, la cella diventa rossa (raccogliamo il punteggio e e scriviamo in console che la partita termina) 
altrimenti diventa azzurra e dobbiamo incrementare il punteggio.
# MILESTONE 4
Quando l'utente clicca su una cella, e questa non è una bomba, 
dobbiamo controllare se il punteggio incrementato ha raggiunto il punteggio massimo perchè in quel caso la partita termina. 
Raccogliamo quindi il messaggio è scriviamo un messaggio appropriato.
(Ma come stabiliamo quale sia il punteggio massimo?)
# MILESTONE 5
Quando la partita termina dobbiamo capire se è terminata perchè è stata cliccata una bomba o se perchè l'utente ha raggiunto il punteggio massimo. 
Dobbiamo poi stampare in pagina il punteggio raggiunto ed il messaggio adeguato in caso di vittoria o sconfitta.
*/


// *FUNZIONI -------------------------------------------------------------
// creo funzione per generare celle
function createCell(number){
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.append(number);
    return cell;
}
// creo funzione per generare un numero random
function getRandomNumber (min, max, blacklist){
    let randomNumber;
    do{
        randomNumber = Math.floor(Math.random()*(max + 1 - min)) + min;
    } while(blacklist.includes(randomNumber));
    return randomNumber;
}

// * FASE INIZIALE -------------------------------------------------------
// Prendo elementi dal DOM
const button = document.querySelector('.btn');
const container = document.querySelector('.container');
const h2 = document.querySelector('h2');
const select = document.getElementById('difficulty');
const grid = document.getElementById('grid');
const result = document.querySelector ('.message');
const totalScore = document.querySelector('.score');
// * EVENTI --------------------------------------------------------------

// aggiungo event listener al button
button.addEventListener('click', function(){
    // prendo userchoise
    const userChoise = select.value;
    console.log(userChoise);

    grid.className = userChoise;

    let rows = 10;
    let cols = 10;
    if(userChoise === 'medium'){
        rows = 9;
        cols = 9;
    } else if (userChoise === 'hard') {
        rows = 7;
        cols = 7;
    }
    const totalCells = rows * cols; 


    let score = 0;

    const bombs = [];
  
    // rimuovo nodo  
    grid.innerHTML = '';

    // genero 16 numeri casuali e li aggiungo nell'array delle bombe
    for (let i = 1; i <= 16; i++){
        const nRandom = getRandomNumber(1, totalCells, bombs);
        bombs.push(nRandom);
    }
    console.log(bombs);

    // genero griglia al click aggiungendo le celle
    
    for(let i = 1 ; i <= totalCells; i++){
        const cell = createCell(i);
           
        // event listener quando l'utente clicca sulle celle 
        cell.addEventListener('click', function(){ 
            if(cell.className === 'cell'){
               console.log('cella n:' + i);
            
               if (bombs.includes(i)){
                  cell.classList.add('bomb');
                  console.log('Partita terminata');
                  result.innerText = 'Hai cliccato una bomba!'
                  totalScore.innerText = `Score: ${score} punti`;
                  
                } else{
                    cell.classList.add('clicked');
                    
                    // incremento punteggio
                    score += 1;
                    const totalScore = totalCells - 16;
                    console.log('punteggio totale' + totalScore);
                    // controllo se il punteggio è uguale a quello massimo
                    if (totalScore === score){
                      result.innerText = 'Congratulazioni, hai raggiunto il punteggio massimo!'
                    }  
                }
                
                console.log('Punteggio:' + score)
            }    
        });
        grid.appendChild(cell);
        
    }
});