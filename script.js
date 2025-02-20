let addBtn = document.querySelector('.btn');
let inputValue = document.querySelector('.inputValue');
let inputText = document.querySelector('.text');
let balance = document.querySelector('.balance');
let text;
let amount;
// Napravi 2 kreatorske funkcije
//expenseCreator incomeCreator
function manageArray() {
    let array = [];
    const addObject = (object) => {
        array.push(object);
    }
    const removeObject = () => {
        
    }
    const sumHistory = () => {
        const sumArray = array.reduce((accumulator, sum) => {
            return accumulator =+ sum.value;
        }, 0)
        return sumArray;
    }
    const getArrayObjects = () => {
        return array;
    }

    return { addObject, getArrayObjects, sumHistory }
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
    refreshBalance()
})

function valueCreator() {
    let id = text;
    value = amount;
    const getId = () => { return id };
    const getValue = () => value;
    return { getId, getValue, id, value}

}
function refreshBalance() {
    console.log('radi')
    balance = document.querySelector('.balance');
    balance.innerHTML = `$${manager.sumHistory().toFixed(2)}`
}
