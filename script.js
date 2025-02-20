let addBtn = document.querySelector('.btn');
let inputValue = document.querySelector('.inputValue');
let inputText = document.querySelector('.text');
let balance = document.querySelector('.balance');
let history = document.querySelector('.history');
let removeBtn = document.querySelector('.history-list button');
let text;
let amount;
// Napravi 2 kreatorske funkcije
//expenseCreator incomeCreator
function manageArray() {
    let array = [];
    const addObject = (object) => {
        array.push(object);
    }
    const removeObject = (id) => {
        array = array.filter(objekt => objekt.id != id);
        return array;
    }
    const sumHistory = () => {
        const sumArray = array.reduce((accumulator, sum) => {
            return accumulator -(- sum.value);
        }, 0)
        return sumArray;
    }
    const getArrayObjects = () => {
        return array;
    }

    return { addObject, getArrayObjects, sumHistory, removeObject }
}
const manager = manageArray();
balance.innerHTML = `$${manager.sumHistory().toFixed(2)}`

inputText.addEventListener('input', (e) => {
    text = e.target.value;
})
inputValue.addEventListener('input', (e) => {
    amount = e.target.value; 
})

addBtn.addEventListener('click', () => {
    const newObject = valueCreator();
    manager.addObject(newObject);
    createHistoryExpense(newObject.getId())
    refreshBalance()
    inputValue.value = 0;
    manager.removeObject();
    console.log(manager.getArrayObjects())
})

function valueCreator() {
    if(text != undefined && amount != 0) {
        let id = text;
        value = amount;
        const getId = () => { return id };
        const getValue = () => value;
        return { getId, getValue, id, value}
    }
}
function refreshBalance() {
    balance = document.querySelector('.balance');
    balance.innerHTML = `$${manager.sumHistory().toFixed(2)}`;
}
function createHistoryExpense(id) {
    const html = `<div class="history-list"><button id="${id}">X</button><div class="history-content">$${inputValue.value} ${inputText.value}</div></div>`
    history = document.querySelector('.history');
    history.insertAdjacentHTML('afterbegin', html)
   
    const getBtnId = () => {
        removeBtn = document.querySelector('.history-list button');
        removeBtn.addEventListener('click', (e) => {
            manager.removeObject(e.target.id);
            let div = e.target.closest('div');
            history.removeChild(div);
            balance.innerHTML = `$${manager.sumHistory().toFixed(2)}`
        })
    }
    console.log(getBtnId())
    return getBtnId;
}

