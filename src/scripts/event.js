import * as ApiService from './api';

function fetchData() {
    console.log('fetch Data');
    ApiService.getUserList().then(res=>{
        console.log('result~~~', res);
        if(res) {
            res.data.forEach(element => {
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
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.gender}</td>
                <td>${user.status}</td>
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

function page1Init() {
    console.log('page 1 controller')
}

function page2Init() {
    console.log('page 2 controller')
}

export { fetchData, page1Init, page2Init };