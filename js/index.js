var siteNameInput = document.getElementById("siteNameInput");
var siteUrlInput = document.getElementById("siteUrlInput");

var tableBody = document.getElementById("tableBody");
var siteCount = [];

// var nameRegex = /^\w{3,}$/;
// var urlRegex = /^https:\/\/(WWW|www)\.[a-zA-Z0-9-]+\.com$/;

siteCount= JSON.parse(localStorage.getItem('allsite'))||[]
display();

function submit(){
if(validateAllinput()){
    var site = {
        siteName:siteNameInput.value,
        siteUrl:siteUrlInput.value
    };
    siteCount.push(site);
    display();
    clear();
    localStorage.setItem('allsite',JSON.stringify(siteCount));

}else{
    Swal.fire({
        title: "",
        html: `
            <div class=" text-start mb-4">
                <i class="fa-solid fa-circle" style="color: #F15F5D;"></i>
                <i class="fa-solid fa-circle" style="color: #FEBE2E;"></i>
                <i class="fa-solid fa-circle" style="color: #4DB748;"></i>
            </div>
            <p class="text-start">Site Name or URL is not valid,Please follow the rules below:</p>
            <ul style="text-align: left; list-style: none;">
                <li><i class="fa-regular fa-circle-right" style="color: #BB4120;"></i> Site name must contain at least 3 characters</li>
                <li><i class="fa-regular fa-circle-right" style="color: #BB4120;"></i> Site URL must be a valid one</li>
            </ul>
            `,
        width: 500,
        confirmButtonText: "OK",
        confirmButtonColor: "#FEBE2E"
    });
};  
};


function display(){
    var cartoona='';
    for(var i=0; i<siteCount.length; i++){
        cartoona +=`
    <tr>
        <td>${i+1}</td>
        <td>${siteCount[i].siteName}</td>
        <td>
          <a href="${siteCount[i].siteUrl}" target="_blank"><i class="fa-solid fa-eye pe-2"></i>Visit</a>
        </td>
        <td>
            <button class="btn btn-delete" onclick="deleteData(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button>
        </td>
    </tr>`
    }
    tableBody.innerHTML = cartoona;
};

function clear(){
    siteNameInput.value= "";
    siteUrlInput.value= "";
};

function deleteData(index){
    siteCount.splice(index,1);
    display();
    localStorage.setItem('allsite',JSON.stringify(siteCount));
};


//! name ex: 3 to endless
//! url ex: https://www.google.com
function validate(regex,inputValue,input){
    if(regex.test(inputValue) == true){
        input.classList.replace('is-invalid','is-valid');
        return true;
    }else{
        input.classList.add('is-invalid');
        return false;
    };
};


function validateAllinput(){
    if(
        validate(/^\w{3,}$/,siteNameInput.value,siteNameInput) &&
        validate(/^(https:\/\/)?(WWW|www)?\.?[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+(\/)?$/,siteUrlInput.value,siteUrlInput)
    ){
        return true;
        
    }else{
        return false;
    }
}


    //com

//<button class="btn btn2"><a href="${siteCount[i].siteUrl}" target="_blank"><i class="fa-solid fa-eye pe-2"></i>visit</a></button>
