var productNameInput =document.getElementById('productNameInput')
var productPriceInput =document.getElementById('productPriceInput')
var productCategoryInput =document.getElementById('productCategoryInput')
var productDescInput =document.getElementById('productDescInput')
var updateInput =document.getElementById('updateInput')
var deleteInput =document.getElementById('deleteInput')


var productsContainer ;
if(localStorage.getItem('Product') != null){
    productsContainer =JSON.parse(localStorage.getItem('Product'))
    displayProduct(productsContainer)
}else{
    productsContainer=[]
}

function addProduct(){
    if(validationName() ==true){
        var product ={
            name:productNameInput.value ,
            price:productPriceInput.value ,
            desc:productDescInput.value ,
            category:productCategoryInput.value ,
        }
        productsContainer.push(product);
        localStorage.setItem('Product',JSON.stringify(productsContainer))
        clearrom()
        displayProduct(productsContainer)
    }else{
        alert("Add Product Informations")
    }
  
}

function displayProduct(List) {
    var productsHTML = '';
    for (let i = 0; i < List.length; i++) {
        productsHTML +=`<tr>
            <td>${i}</td>
            <td>${List[i].name}</td>
            <td>${List[i].price}</td>
            <td>${List[i].category}</td>
            <td>${List[i].desc}</td>
            <td><button onclick="updateProduct(${i})" class="btn btn-outline-warning">Update</button></td>
            <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger">Delete</button></td>
           </tr>`
    }
    document.getElementById('tableBody').innerHTML=productsHTML
}


function clearrom() {
    productNameInput.value =""
    productPriceInput.value =""
    productDescInput.value =""
    productCategoryInput.value =""
}

function search(searchItem){
    let productSearch =[]
    for(var i =0 ;i<productsContainer.length ;i++){

        if(productsContainer[i].name.toLowerCase().includes(searchItem.toLowerCase())){
            productSearch.push(productsContainer[i])
            
        }
    }
    displayProduct(productSearch)
}

function deleteProduct(index) {
    productsContainer.splice(index,1)
    localStorage.setItem('Product',JSON.stringify(productsContainer))
    displayProduct(productsContainer)
}


function updateProduct(index) {
    productNameInput.value =productsContainer[index].name
    productPriceInput.value =productsContainer[index].price
    productDescInput.value =productsContainer[index].desc
    productCategoryInput.value =productsContainer[index].category
    deleteInput.classList.add('d-none')
    updateInput.classList.replace('d-none' ,'d-inline-block')
    updateInput.setAttribute('index',index)
}

function update() {
    var index =updateInput.getAttribute('index')
    
    productsContainer[index].name = productNameInput.value
    productsContainer[index].price = productPriceInput.value
    productsContainer[index].category = productCategoryInput.value
    productsContainer[index].desc = productDescInput.value
    localStorage.setItem('Product',JSON.stringify(productsContainer))
    displayProduct(productsContainer)
    updateInput.classList.add('d-none')
    deleteInput.classList.replace('d-none' ,'d-inline-block')
    clearrom()
}

function validationName() {
    var regax =/^[A-Za-z]{3,8}[0-9]{0,5}/g
    if(regax.test(productNameInput.value) ==true){
        productNameInput.classList.replace('is-invalid' ,'is-valid')
        return true
    }else{
        productNameInput.classList.add('is-invalid')
        return false
    }
}
function validationPrice() {
    var regax =/^[1-9][0-9]{2,8}$/g
    if(regax.test(productPriceInput.value) ==true){
        productPriceInput.classList.replace('is-invalid' ,'is-valid')
        return true
    }else{
        productPriceInput.classList.add('is-invalid')
        return false
    }
}