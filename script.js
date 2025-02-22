let addBtn = document.querySelector('.btn');
let inputValue = document.querySelector('.inputValue');
let inputText = document.querySelector('.text');
let balance = document.querySelector('.balance');
let history = document.querySelector('.history');
let income = document.querySelector('.income h4');
let expense = document.querySelector('.expense h4')
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
refreshBalance();

inputText.addEventListener('input', (e) => {
    text = e.target.value;
})
inputValue.addEventListener('input', (e) => {
    amount = e.target.value; 
})

addBtn.addEventListener('click', () => {
    const newObject = transactionCreator();
    manager.addObject(newObject);
    createHistoryExpense(newObject.getId())
    if(amount > 0) {};
    if(amount < 0) {};
    inputValue.value = 0;
    inputText.value = '';
    refreshBalance()
    removeExpense()
})

function transactionCreator() {
    let id = crypto.randomUUID();
    let value = amount;
    const getId = () => { return id };
    const getValue = () => value;
    return { getId, getValue, id, value}
   
}
function addExpense() {
    let id = crypto.randomUUID();
    let value = amount;
    const getId = () => { return id };
    const getValue = () => value;
    return { getId, getValue, id, value}
}
//Staviti na cijelu listu event listener
//Income na click zelen
//Expense na click crven
function refreshBalance() {
    balance.innerHTML = `$${manager.sumHistory().toFixed(2)}`;
}
function createHistoryExpense(id) {
    const html = `<div class="history-list"><button id="${id}">X</button><div class="history-content">$${inputValue.value} ${inputText.value}</div></div>`
    history = document.querySelector('.history');
    history.insertAdjacentHTML('afterbegin', html)
}
function removeExpense() {
    history.addEventListener('click', (e) => {
        manager.removeObject(e.target.id);
        let div = e.target.closest('div');
        console.log(div)
        history.removeChild(div);
        refreshBalance()
    })
}
