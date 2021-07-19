import * as ApiService from './api';

function fetchData() {
    console.log('fetch Data');
    ApiService.getUserList().then(res=>{
        console.log('result~~~', res);
        if(res) {
            res.forEach(element => {
                insertUser(element);
            });
        }
    })
}

function insertUser (user) {
    try{
        var table = document.getElementById('userlist').getElementsByTagName('tbody')[0];
        var row = table.insertRow();
        var template = `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
            </tr>
        `;
        row.classList.add('bg-b25');
        row.classList.add('cursor');
        row.onclick = function() { 
            userClick(user); 
        }
        row.innerHTML = template;
    }catch{
       console.log('error rendering user row');
    }
}

function userClick(user) {
    console.log('click--', user)
}

function createInit() {
    console.log('page 1 controller');
    var form = document.querySelector('form');
    form.addEventListener('submit', function(e) {
        // return false;
        e.preventDefault();
        console.log('form submit---');
        onCreateUser(form);
        form.reset();
    });
}

function onCreateUser(form) {
    // event.preventDefault()
    const formData = new FormData(form)
    var user = {};
    for (var pair of formData.entries()) {
        user[pair[0]] = pair[1];
    }
    console.log('user create--', user)
    ApiService.createUser(user).then(res=>{
        console.log('result~~~', res);
    })
}

function updateInit() {
    console.log('page 2 controller')
}

export { fetchData, createInit, updateInit };