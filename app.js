const Base_URL = "https://2024-03-06.currency-api.pages.dev/v1/currencies";
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
const countryList = {
    "USD": "US",
    "PKR": "PK",
    "EUR": "EU",
    "GBP": "GB",
    "JPY": "JP",
    "AUD": "AU",
    "CAD": "CA",
    "CHF": "CH",
    "CNY": "CN",
    "INR": "IN",
    "SAR": "SA",
    "AED": "AE",
    "TRY": "TR",
    "RUB": "RU",
    "ZAR": "ZA",
    "NZD": "NZ",
    "HKD": "HK",
    "SGD": "SG",
    "SEK": "SE",
    "NOK": "NO",
    "DKK": "DK",
    "MXN": "MX",
    "BRL": "BR",
    "KRW": "KR",
    "EGP": "EG",
    "THB": "TH",
    "MYR": "MY",
    "IDR": "ID",
    "VND": "VN",
    "BDT": "BD"
};
//function to show defaultccountry USD TO PAK
 function defaultCountry (){
    fromCurr.value = "USD";
    toCurr.value = "PKR";
    updateFlag(fromCurr);
    updateFlag(toCurr);
  }

const btn = document.querySelector("form button");
//arrow fn to updateExchangeRate to 1 when page loaded
     const updateExchangeRate = async()=>{
    let amount = document.querySelector(".amount input");
  
    let amountVal = amount.value;

    if (amountVal === "" || amountVal < 1) {
        amountVal = 1;
        amount.value = "1";
    }

    const URL = `${Base_URL}/${fromCurr.value.toLowerCase()}.json`;

    try {
        let response = await fetch(URL);
        let data = await response.json();

        let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
        console.log("Rate:", rate);

        let finalAmount = amountVal * rate;
          let msgBox = document.querySelector(".msgBox");
        msgBox.value = `${amountVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
    } catch (err) {
        console.error("Error fetching rate:", err);
    }
  };
  if (btn) {
   btn.addEventListener("click",  (evt) => {
    updateExchangeRate();
    evt.preventDefault();
   });
}
const dropdownSelects = document.querySelectorAll(".dropdown select");


for (let select of dropdownSelects) {
    for (let currencyCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = `${currencyCode} – ${countryList[currencyCode]}`;
        newOption.value = currencyCode;

        if (select.name === "from" && currencyCode === "USD") {
            newOption.selected = true;
        } else if (select.name === "to" && currencyCode === "INR") {
            newOption.selected = true;
        }

        select.append(newOption);
    }

    //event to update flag
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currencyCode = element.value;
    let countryCode = countryList[currencyCode];

    if (!countryCode) return;

    let img = element.parentElement.querySelector("img");
    if (img) {
        let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
        img.src = newSrc;
    }
};
//when reload page it will load default country and updateExchangeRate to 1
window.addEventListener("load", () => {
  defaultCountry();
updateExchangeRate();
});


 
