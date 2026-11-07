let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let error = document.getElementById('error');
let mood = 'Create';
let tmp;
//  number Inputs
let numberInputs = document.querySelectorAll(
  '#price, #taxes, #ads, #discount'
);
numberInputs.forEach(input => {
  input.addEventListener('input', function() {
    this.value = this.value
      .replace(/[^0-9.]/g, '')
      .replace(/(\..*)\./g, '$1');
  });
});
// get total
function getTotal(){
    if (price.value != '') {
        let result = ( Number(price.value)  + Number(taxes.value) + Number(ads.value)) - Number(discount.value);
        total.innerHTML = result;
        total.style.backgroundColor = 'rgb(139, 245, 139)';
        total.style.color = 'rgba(2, 71, 2, 0.97)';
    }
    else{
        total.innerHTML = '';
        total.style.backgroundColor = 'rgb(255, 173, 173)';
        total.style.color = 'rgb(150, 0, 0)';
    }
}
price.addEventListener('input',getTotal);
taxes.addEventListener('input',getTotal);
ads.addEventListener('input',getTotal);
discount.addEventListener('input',getTotal);
// create product
let dataPro;
// save localstorge
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product);
}
else{
    dataPro = [];
}
submit.addEventListener('click', function(e){
    e.preventDefault();
    let newPro ={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()
    }
    // count
    if(title.value != '' && price.value != '' && category.value != '' && newPro.count <= 100){ 
        if (mood === 'Create') {
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    dataPro.push(newPro);
                }
            }
            else{
                dataPro.push(newPro);
            }
        }
        else{
            dataPro[tmp] = newPro;
            mood = 'Create';
            submit.innerHTML = 'Create';
            count.style.display = 'block';
        }
        clearData();
        error.style.display = 'none'
    }
    else{
        error.style.display = 'block'
    }
    localStorage.setItem('product', JSON.stringify(dataPro));
    // clearData();
    showData();
});
// clear inputs
function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
    total.style.backgroundColor = 'rgb(255, 173, 173)';
    total.style.color = 'rgb(150, 0, 0)';
}
// read
function showData(){
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table += `
            <tr>
                <td> ${i+1} </td>
                <td> ${dataPro[i].title} </td>
                <td> ${dataPro[i].price} </td>
                <td> ${dataPro[i].taxes} </td>
                <td> ${dataPro[i].ads} </td>
                <td> ${dataPro[i].discount} </td>
                <td> ${dataPro[i].total} </td>
                <td> ${dataPro[i].category} </td>
                <td> <button  onclick="updateData(${i})">update</button> </td>
                <td> <button onclick="deleteData(${i})">delete</button> </td>
            </tr> 
        `
    }
    document.getElementById('tbody').innerHTML = table;
    let deleteAll = document.getElementById('delete-all');
    if(dataPro.length > 0){
        deleteAll.innerHTML =` <button onclick='deleteall()'>Delete All (${dataPro.length}) </button>`;
    }
    else{
        deleteAll.innerHTML = '';
    }
}
showData();
// delete
function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product =  JSON.stringify(dataPro);
    showData();
}
function deleteall(){
    localStorage.clear();
    dataPro.splice(0);
    showData();
}
// update
function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = dataPro[i].category;
    submit.innerHTML = 'Update';
    mood = 'Update';
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth"
    })
}
// search
let SearchTitle = document.getElementById('Search-Title');
let SearchCategory = document.getElementById('Search-Category');
let Search = document.getElementById('Search');
let searchMood = 'title';
function getSearchMood(id){
    if (id == 'Search-Title') {
        searchMood = 'title';
    }
    else{
        searchMood = 'Category';
    }
    Search.placeholder = 'Search By ' +searchMood;
    Search.focus();   
    Search.value = '';
    showData();
}
SearchTitle.addEventListener('click',function(){
    getSearchMood(this.id);
});
SearchCategory.addEventListener('click',function(){
    getSearchMood(this.id);
});
function SearchData(value){
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        if(searchMood == 'title'){
            if (dataPro[i].title.includes(value.toLowerCase())) {
                table += `
                <tr>
                    <td> ${i+1} </td>
                    <td> ${dataPro[i].title} </td>
                    <td> ${dataPro[i].price} </td>
                    <td> ${dataPro[i].taxes} </td>
                    <td> ${dataPro[i].ads} </td>
                    <td> ${dataPro[i].discount} </td>
                    <td> ${dataPro[i].total} </td>
                    <td> ${dataPro[i].category} </td>
                    <td> <button  onclick="updateData(${i})">update</button> </td>
                    <td> <button onclick="deleteData(${i})">delete</button> </td>
                </tr> `
            }
        }
        else{
            if (dataPro[i].category.includes(value.toLowerCase())) {
                table += `
                <tr>
                    <td> ${i+1} </td>
                    <td> ${dataPro[i].title} </td>
                    <td> ${dataPro[i].price} </td>
                    <td> ${dataPro[i].taxes} </td>
                    <td> ${dataPro[i].ads} </td>
                    <td> ${dataPro[i].discount} </td>
                    <td> ${dataPro[i].total} </td>
                    <td> ${dataPro[i].category} </td>
                    <td> <button  onclick="updateData(${i})">update</button> </td>
                    <td> <button onclick="deleteData(${i})">delete</button> </td>
                </tr> `
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}
Search.addEventListener('keyup',function(){
    SearchData(this.value);
});



