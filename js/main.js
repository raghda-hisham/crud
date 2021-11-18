var productName=document.getElementById("productName");
var productPrice=document.getElementById("productPrice");
var productCategory=document.getElementById("productCategory");
var productDesc=document.getElementById("productDesc");

var productContainer;
if(localStorage.getItem("productList")==null){
  productContainer=[];
}
else{
  productContainer=JSON.parse(localStorage.getItem("productList"));
  displayProduct();
}

function checkInput(){
  if($("#productName").val() != "" && $("#productPrice").val() != "" 
    && $("#productCategory").val() != "" && $("#productDesc").val() != "" ){
     return true;
  }
  else{
    return false;
  }
}
$("#productBtn").click(function(){
  if(checkInput()== true){
   var product={
          name:productName.value,
          price:productPrice.value,
          category:productCategory.value,
          desc:productDesc.value,
   }
    productContainer.push(product);//h5od a5r update ll array w a7ooto fe el local storage 
    localStorage.setItem("productList",JSON.stringify(productContainer));
    clearForm();
    displayProduct();
  }
  else{
    alert("all the inputs are required");
  }
})
function clearForm(){
  var product={
    name:$("#productName").val(""),
    price:$("#productPrice").val(""),
    category:$("#productCategory").val(""),
    desc:$("#productDesc").val(""),
}}

function displayProduct(){
  var cartona=``;
  for(var i=0;i<productContainer.length;i++){
    cartona+=`<tr>
              <td>${i}</td>
              <td>${productContainer[i].name}</td>
              <td>${productContainer[i].price}</td>
              <td>${productContainer[i].category}</td>
              <td>${productContainer[i].desc}</td>
              <td><button onclick="formUpdate(`+i+`)" class="btn btn-outline-warning">update</button></td>
              <td><button onclick="deleteProduct(`+i+`)" class="btn btn-outline-danger" id="delete">delete</button></td>
             </tr>`;
  }
   document.getElementById("tablebody").innerHTML=cartona;

}
function deleteProduct(productIndex){
    productContainer.splice(productIndex,1);
    localStorage.setItem("productList",JSON.stringify(productContainer));
    displayProduct();
}

function search(searchTerm){
  var cartona=``;
  for(var i=0;i<productContainer.length;i++){
    if(productContainer[i].name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     productContainer[i].category.toLowerCase().includes(searchTerm.toLowerCase())  ){
      cartona+=`<tr>
      <td>${i}</td>
      <td>${productContainer[i].name}</td>
      <td>${productContainer[i].price}</td>
      <td>${productContainer[i].category}</td>
      <td>${productContainer[i].desc}</td>
      <td><button class="btn btn-outline-warning">update</button></td>
      <td><button onclick="deleteProduct(`+i+`)" class="btn btn-outline-danger" id="delete">delete</button></td>
     </tr>`;
    }
    document.getElementById("tablebody").innerHTML=cartona;
  }
}

function formUpdate(productIndex){
  document.getElementById("productName").value  = productContainer[productIndex].name;
  document.getElementById("productPrice").value  = productContainer[productIndex].price;
  document.getElementById("productCategory").value  = productContainer[productIndex].category;
  document.getElementById("productDesc").value = productContainer[productIndex].desc;
  deleteProduct(productIndex);
}