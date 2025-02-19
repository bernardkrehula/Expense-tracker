let addBtn = document.querySelector('.btn');
let inputValue = document.querySelector('.inputValue');
let inputText = document.querySelector('.text');
let text;
let amount;

function manageArray() {
    let toDoArray = [];
    const addObject = (object) => {
        toDoArray.push(object);
    }
    const getArrayObjects = () => {
        return toDoArray;
    }
    return { addObject, getArrayObjects}
}
const manager = manageArray();

inputText.addEventListener('input', (e) => {
    text = e.target.value;
})
inputValue.addEventListener('input', (e) => {
    amount = e.target.value; 
})

addBtn.addEventListener('click', () => {
    const newObject = objectCreator();
    manager.addObject(newObject);
    console.log(manager.getArrayObjects())
})

function objectCreator() {
    let id = text;
    value = amount;
    const getId = () => { return id };
    const getValue = () => value;
    return { getId, getValue, id, value}
}
