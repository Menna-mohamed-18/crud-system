
var bookmarkNameInput = document.getElementById("bookmarkName");
var bookmarkUrlInput = document.getElementById("bookmarkUrl");

var btnAdd = document.getElementById("submitBtn");
var btnUpdate = document.getElementById("btnUpdate");


var message = document.getElementById("box")
var currentIndex = 0;
var bookmarkList = [];



if(localStorage.getItem("productContainer") !== null ){
    bookmarkList= JSON.parse(localStorage.getItem("productContainer"));

    displayData();
}









function addSite(){

  if(validateInput()==true){


    var product ={
      name: bookmarkNameInput.value.trim() ,
      url:bookmarkUrlInput.value.trim()
      }
    

      message.classList.add('d-none');
      message.classList.remove('d-block');
      
      
      bookmarkList.push(product);
      
      localStorage.setItem("productContainer" , JSON.stringify(bookmarkList))
      displayData();
      

    
     
      console.log(bookmarkList);
      
      
      clearForm();
  }else{
message.classList.remove('d-none');
message.classList.add('d-block');
  }
 





  }



function validateInput(){
  var nameRegex = /^[A-Za-z]{3,}$/;
  var urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;


  var isNameValid = nameRegex.test(bookmarkNameInput.value);
  var isUrlValid = urlRegex.test(bookmarkUrlInput.value);


  if (isNameValid && !includesName(bookmarkNameInput.value)){
    bookmarkNameInput.classList.add('is-valid');
    bookmarkNameInput.classList.remove('is-invalid');
  } else {
    bookmarkNameInput.classList.add('is-invalid');
    bookmarkNameInput.classList.remove('is-valid');
    isNameValid = false;
  }

  if (isUrlValid){
    bookmarkUrlInput.classList.add('is-valid');
    bookmarkUrlInput.classList.remove('is-invalid');
  } else {
    bookmarkUrlInput.classList.add('is-invalid');
    bookmarkUrlInput.classList.remove('is-valid');
  }

  return isNameValid && isUrlValid;
}

  



function clearForm(){
    bookmarkNameInput.value = null;
    bookmarkUrlInput.value = null;
}



function displayData(){

    var cartona = "";
    for ( var i=0 ; i<bookmarkList.length ; i++ ){

        cartona += `
        
            <tr>
                      <td>${i+1}</td>
                      <td> ${bookmarkList[i].name}</td>              
                      <td>
                        <button onclick="visitSite('${bookmarkList[i].url}')" class="btn btn-visit" data-index="0">
                          <i class="fas fa-eye icon pe-2"></i>Visit
                        </button>
                      </td>
                      <td>
                        <button onclick="deleteItem(${ i })" class="btn btn-delete pe-2" data-index="0">
                          <i class="fas fa-trash-alt icon"></i>
                          Delete
                        </button>
                      </td>

                       <td>
                        <button onclick="setUpdateInfo(${ i })" class="btn btn-update" data-index="0">
                          <i class="fas fa-edit pe-2"></i>Edit
                        </button>
                      </td>
                  </tr>
        
        `
    }

    document.getElementById("tableContent").innerHTML = cartona;
}







function visitSite(url) {
  window.open(url, '_blank');
  
}








function deleteItem(index){
bookmarkList.splice(index , 1);
localStorage.setItem("productContainer" , JSON.stringify(bookmarkList))
displayData();
}



function setUpdateInfo(index){
  
  currentIndex = index;
  bookmarkNameInput.value = bookmarkList[index].name
  bookmarkUrlInput.value = bookmarkList[index].url

  btnAdd.classList.add("d-none");
  btnUpdate.classList.remove("d-none")

}


function updateData(){
  var product ={
    name:  bookmarkNameInput.value ,
    url:bookmarkUrlInput.value
   }

   bookmarkList.splice(currentIndex,1,product)
   localStorage.setItem("productContainer" , JSON.stringify(bookmarkList))
   validateInput();
   displayData();
   btnAdd.classList.remove("d-none");
   btnUpdate.classList.add("d-none");

  
   bookmarkNameInput.classList.remove('is-invalid');
  bookmarkUrlInput.classList.remove('is-invalid');
  bookmarkUrlInput.classList.remove('is-valid');
  clearForm();
}





document.getElementById("btnClose").addEventListener("click", function() {
  message.classList.add('d-none');
  bookmarkNameInput.classList.remove('is-invalid');
  bookmarkUrlInput.classList.remove('is-invalid');


});




function includesName(name) {
  return bookmarkList.some(item => item.name.toLowerCase() === name.toLowerCase());
}









//    var name = bookmarkNameInput.value.trim();
//     var url = bookmarkUrlInput.value.trim();
//     var errorMessage = document.getElementById("box").innerHTML;



//    if (name.length < 3 || !isValidName(name)   ) {
//     errorMessage += document.getElementById("line1").innerHTML;
   
// }

// if (!isValidUrl(url)) {
//   errorMessage += document.getElementById("box").innerHTML;
   
// }


// if (errorMessage !== "Site Name or Url is not valid. Please follow the rules below:\n\n") {
//   alert(errorMessage);
//   return;
// }