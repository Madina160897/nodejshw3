const addCarBtn = document.querySelector("#add_car_btn");
const carsListUl = document.querySelector("#cars_list");

const BASE_URL = "http://localhost:8080"
const loadCarsList = async () => {
    const response = await fetch(BASE_URL + "/cars");
    const carsArray = await response.json();

    for(const {model} of carsArray){
        carsListUl.innerHTML +=`<li> ${model}</li>`
    }
}
loadCarsList()

createCarBtn.addEventListener("click", () => {
    const newCarNameInput = document.querySelector("#car_name").value;
    const payload = {
        model: newCarNameInput,
    };
    fetch(BASE_URL + "/cars", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "post",
        body: JSON.stringify(payload)
    })
        .then(() => loadData())
        .catch(() => alert("Car create error"));
})