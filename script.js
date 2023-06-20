const container = document.querySelector('.container');

const add_order = document.querySelector('.add-order');
const items_div = document.querySelector('.items');

let completed = 0;
const completed_num = document.getElementById('completed-num');

let new_inp = '<input placeholder="Item name..." class="item fill-available" type="text" id="item-list">'

function setListeners(){
    document.querySelectorAll('.done-btn').forEach((done) => {
        done.addEventListener('click', function(){
            done.parentElement.parentElement.remove();
            completed++;
            completed_num.innerText = completed;
        })
    })
    
    document.querySelectorAll('.close-btn').forEach((close) => {
        close.addEventListener('click', function(){
            close.parentElement.parentElement.remove();
        })
    })
}
setListeners();
function getItems(){
    let items = [];
    items_div.querySelectorAll('.item').forEach((item) => {
        if(item.value.trim() !== ''){
            items.push(item.value.trim());
        }
    })
    return items;
}
function createOrder(table, items){
    let list = '';
    items.forEach((item) => {
        list += `<li>${item}</li>`;
    })
    let div =  `
    <div class="order">
    <div class="top">
        <span class="done-btn"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg></span>
        <h2>Table #${table}</h2>
        <span class="close-btn"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg></span>
    </div>
    <div class="content">
        <ul>
            ${list}
        </ul>
    </div>
</div>
    `
    container.innerHTML = div + container.innerHTML;
    setListeners();
}

document.getElementById('add-order-form').addEventListener('submit', function(e){
    e.preventDefault();
})

document.querySelector('.add-item-btn').addEventListener('click', function(){
    let inp = document.createElement('input');
    inp.setAttribute('placeholder', 'Item name...');
    inp.classList.add('item');
    inp.classList.add('fill-available')
    inp.setAttribute('type', 'text');
    inp.setAttribute('name', 'item');
    items_div.append(inp)
})

document.getElementById('add-order-btn').addEventListener('click', function(){
    if(add_order.classList.contains('no-display')){
        add_order.classList.remove('no-display');
    }
})

const table = document.getElementById('table-num'); 

const warning = document.querySelector('.order-error');

function closeOrderDiv(){
    if(!add_order.classList.contains('no-display')){
        add_order.classList.add('no-display');
        items_div.innerHTML = new_inp;
        warning.innerText = '';
        table.value = '';
    }
}

document.getElementById('place-btn').addEventListener('click', function(){
    let table_num = table.value;
    let items = getItems();
    if(table_num === '' && items.length === 0){
        warning.innerText = 'Please add a table and one or more items!';
        return false;
    }
    else if(table_num === ''){
        console.log(items);
        warning.innerText = 'Table cannot be blank!';
        return false;
    }
    else if(items.length === 0){
        warning.innerText = 'Add atleast one item!';
        return false;
    }
    createOrder(table_num, items);
    closeOrderDiv();
})

document.getElementById('cancel-btn').addEventListener('click', function(){
    closeOrderDiv();
})

