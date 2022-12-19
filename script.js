// *FUNZIONI -------------------------------------------------------------
// creo funzione per generare celle
function createCell(number){
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.append(number);
    return cell;
}



// * FASE INIZIALE -------------------------------------------------------
// Prendo elementi dal DOM
const button = document.querySelector('.btn');
const container = document.querySelector('.container');
const h2 = document.querySelector('h2');
const select = document.getElementById('difficulty');
const grid = document.querySelector('.grid');
// * EVENTI --------------------------------------------------------------

// aggiungo event listener al button
button.addEventListener('click', function(){
    // prendo userchoise
    const userChoise = select.value;
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
    // rimuovo nodo  
    grid.innerHTML = '';
    // genero griglia al click aggiungendo le celle
    for(let i = 1 ; i <= totalCells; i++){
        const cell = createCell(i);
           
        if(userChoise === 'hard'){
           cell.classList.add('hard');
        } else if (userChoise === 'medium'){
            cell.classList.add('medium');
        }else{
           cell.classList.add('easy')
        }

        cell.addEventListener('click', function(){ 
            cell.classList.toggle('clicked');
            console.log('cella n:' + i);
        });
           
        grid.appendChild(cell);
    }
});