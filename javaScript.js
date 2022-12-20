const info_modal = document.getElementById("info_modal");
let tableBody = document.querySelector("#elements-list");
let dataPro = [];
let moodSit = 'creatMood';
let temp;
let updProdu = document.querySelector('.submit');
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
}
// show data function
const showData = () => {
  console.log(dataPro)
  let table = "";
  if (dataPro.length == 0) table = "";
  else {
    tableBody.innerHTML = "";
    for (let i = 0; i < dataPro.length; i++) {
      table += `<tr id="elements-list">
          <td>${dataPro[i].Nom}</td>
          <td>${dataPro[i].Marque}</td>
          <td>${dataPro[i].Prix}</td>
          <td>${dataPro[i].date}</td>
          <td>${dataPro[i].Type}</td>
          <td>${dataPro[i].promoValue}</td>
          <td><a onclick="update(${i})" href="#" class="btnMod">modifier</a></td>
          <td><a onclick="deleteModel(${i})" href="#" class="btnSup">Supprimer</a></td>
          </tr>`;
    }
  }
  tableBody.innerHTML = table;

};

// Clear allFields
function clearFields() {
  document.querySelector("#Nom").value = "";
  document.querySelector("#Marque").value = "";
  document.querySelector("#Prix").value = "";
  document.querySelector("#Dateproduction").value = "";
  document.querySelector("#Type").value = "";
  document.querySelector('input[nom="M"]:checked').value = "";
}
//  ADD DATA
class Products {
  constructor(name, mark, price, datPro, typ, Pro) {
    this.Nom = name;
    this.Marque = mark;
    this.Prix = price;
    this.date = datPro;
    this.Type = typ;
    this.promoValue = Pro;
  }
  getInfo() {
    let geti = document.createElement("div");
    geti.classList.add("pro_infos");
    geti.innerHTML = `
   <p>Nom : <span>${this.Nom}</span></p> 
   <p>Marque : <span>${this.Marque}</span></p> 
   <p>Prix : <span>${this.Prix}</span></p> 
   <p>Date de production : <span>${this.date}</span></p> 
   <p>Type : <span>${this.Type}</span></p> 
    <p>Promotion : <span>${this.promoValue}</span></p> 
    `;
    info_modal.appendChild(geti);
  }
}
document.querySelector(".forme").addEventListener("submit", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("check-item")) {
    checkItem();
  }
  //GET FORM VALUE
  let nom = document.querySelector("#Nom").value;
  let marque = document.querySelector("#Marque").value;
  let prix = document.querySelector("#Prix").value;
  let date = document.querySelector("#Dateproduction").value;
  let type = document.querySelector("#Type").value;
  let Promo = document.querySelector('input[name="M"]:checked');
  let reg = /^[a-zA-Z]{2,30}$/;

  // create object ( instance ) from products class
  const dataObj = new Products(nom, marque, prix, date, type, Promo);
  dataObj.getInfo();
  // VALIDATE
  if (

    reg.test(nom) === false ||
    reg.test(marque) === false ||
    prix === "" ||
    date === "" ||
    type === ""
  ) {
    let valin = document.getElementById("validno");
    valin.innerText = "Essayez de remplir les éléments invalides ";
  } else {
    if (moodSit === 'creatMood') {

      dataPro.push(dataObj);
      dataPro.sort((a, b) => a.Nom.localeCompare(b.Nom));
      localStorage.setItem("product", JSON.stringify(dataPro));
      showData(dataPro);
      const deleteBtn = document.querySelector('.btnSup');
      deleteBtn.addEventListener("click", (e) => {
        target = e.target;
        showModal()
      })
    } else {
      dataPro[temp] = dataObj;
      let modalIN = document.getElementById("info_modal");
      modalIN.style.color = '#000'
      modalIN.style.display = "block"
      modalIN.innerHTML = `
      <p>Nom:${nom}</p>
      <p>Marque: ${marque}</p>
      <p>Prix: ${prix}</p>
      <p>Type: ${type}</p>
      <p>promotion: ${Promo}</p>
     <button id="info_modalBtn" onclick="modalClick()">ok</button>
      `
      localStorage.setItem("product", JSON.stringify(dataPro));

      showData();
    }
    clearFields()
  }

});
function modalClick() {
  let modalIN = document.getElementById("info_modal");
  modalIN.style.display = "none"
}

//  Edit Data
function update(i) {
  document.querySelector("#Nom").value = dataPro[i].Nom;
  document.querySelector("#Marque").value = dataPro[i].Marque;
  document.querySelector("#Prix").value = dataPro[i].Prix;
  document.querySelector("#Dateproduction").value = dataPro[i].date;
  document.querySelector("#Type").value = dataPro[i].Type;
  document.querySelectorAll('input[name="M"]').value = dataPro[i].promoValue;
  temp = i;
  moodSit = 'update';
  updProdu.innerHTML = 'update';
}

// Show modal
function showModal() {
  if (target.classList.contains("btnSup")) {
    target.parentElement.parentElement.setAttribute("id", "delet");
    let model = document.getElementById("mod");
    model.style.display = "block";
  }
}

let model = document.getElementById("mod");
// Delete Data
function deleteModel(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro)
  model.style.display = "none";
  showData()
}

function cancel() {
  document.getElementById("mod").style.display = "none";
  document.getElementById("delet").removeAttribute("id");
}
showData();


