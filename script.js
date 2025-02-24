let addBtn = document.querySelector('.btn');
let inputValue = document.querySelector('.inputValue');
let inputText = document.querySelector('.text');
let balance = document.querySelector('.balance');
let history = document.querySelector('.history');
let income = document.querySelector('.income h4');
let expense = document.querySelector('.expense h4')
let text;
let amount;

function manageArray() {
    let array = [];
    const addObject = (object) => {
        array.push(object);
    }
    const removeObject = (id) => {
        array = array.filter(objekt => objekt.getId() != id);
        return array;
    }
    const sumHistory = () => {
        const sumArray = array.reduce((accumulator, sum) => {
            return accumulator + Number(sum.getValue());
        }, 0)
        return sumArray;
    }
    const sumIncome = () => {
        const sumArray = array.reduce((accumulator, sum) => {
            if(sum.getValue() > 0) {
                return accumulator + Number(sum.getValue());
            }
            return accumulator;
        }, 0)
        return sumArray;
    }
    const sumExpense = () => {
        const sumArray = array.reduce((accumulator, sum) => {
            if(sum.getValue() < 0) {
                return accumulator + Number(sum.getValue());
            }
            return accumulator;
        }, 0)
        return sumArray;
    }
    const getArrayObjects = () => {
        return array;
    }

    return { addObject, getArrayObjects, sumHistory, removeObject, sumIncome, sumExpense }
}
const manager = manageArray();
refreshBalance();
refreshIncomeExpenseContent();
function transactionCreator() {
    let id = crypto.randomUUID();
    let value = amount;
    const getId = () => { return id };
    const getValue = () => value;
    return { getId, getValue }
   
}
function refreshIncomeExpenseContent() {
    income.innerHTML = manager.sumIncome().toFixed(2);
    expense.innerHTML = manager.sumExpense().toFixed(2);
}

//Stavi event listener na parentElement income-expense 
//Nazvati imena funckija logicnim imenima da se zna radnja funkcije

function refreshBalance() {
    balance.innerHTML = `$${manager.sumHistory().toFixed(2)}`;
}
function createHistoryExpense(id) {
    const html = `<div class="history-list"><button id="${id}">X</button><div class="history-content">$${inputValue.value} ${inputText.value}</div></div>`
    history = document.querySelector('.history');
    history.insertAdjacentHTML('afterbegin', html)
}

inputText.addEventListener('input', (e) => {
    text = e.target.value;
})
inputValue.addEventListener('input', (e) => {
    amount = e.target.value; 
})
addBtn.addEventListener('click', () => {
    if(inputValue.value != 0 && inputText.value != '') {
        const newObject = transactionCreator();
        createHistoryExpense(newObject.getId())
        manager.addObject(newObject);
        refreshBalance()
        refreshIncomeExpenseContent()
    }
    inputValue.value = 0;
    inputText.value = '';
})
history.addEventListener('click', (e) => {
    manager.removeObject(e.target.id);
    let div = e.target.closest('div');
    history.removeChild(div);
    manager.removeObject();
    refreshBalance();
    refreshIncomeExpenseContent();
})

income.addEventListener('click', () => {
    income.style.color = 'green';
})

expense.addEventListener('click', () => {
    expense.style.color = 'red';
})
