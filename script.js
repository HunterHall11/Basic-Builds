document.addEventListener("DOMContentLoaded", function () {
    fetch("components.json")
        .then(response => response.json())
        .then(data => {
            loadComponents(data, "cpu");
            loadComponents(data, "gpu");
            loadComponents(data, "ram");
            loadComponents(data, "psu");
        });
});

function loadComponents(data, category) {
    let select = document.getElementById(category);
    data[category].forEach(component => {
        let option = document.createElement("option");
        option.value = component.power;
        option.textContent = `${component.name} - ${component.price}`;
        select.appendChild(option);
    });
}

function calculatePower() {
    let totalPower = 
        parseInt(document.getElementById("cpu").value) + 
        parseInt(document.getElementById("gpu").value) + 
        parseInt(document.getElementById("ram").value) + 
        parseInt(document.getElementById("psu").value);

    let psuPower = parseInt(document.getElementById("psu").value);

    let result = document.getElementById("result");
    if (totalPower > psuPower) {
        result.textContent = "⚠️ Your power supply is not sufficient!";
        result.style.color = "red";
    } else {
        result.textContent = "✅ Your build is compatible!";
        result.style.color = "green";
    }
}
