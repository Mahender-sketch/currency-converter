const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

window.addEventListener("load", ()=>{
    updexchrate();
})
for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newoption = document.createElement("option");
    newoption.innerText = currCode;
    newoption.value = currCode;
   
    if (select.name==="from"&& currCode==="USD"){
        newoption.selected="selected";
    }
    else if (select.name==="To"&& currCode==="INR"){
        newoption.selected="selected";
    }
     select.append(newoption);
  }
  select.addEventListener("change",(evt)=>{
    updateflag(evt.target);
  });
}
const updateflag=(element) =>{
    let currCode= element.value;
    let countryCode= countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src= newSrc;
};
btn.addEventListener("click",(evt)=>{
  evt.preventDefault();
  updexchrate();
});
const updexchrate= async ()=>{
  let amount = document.querySelector(".amount input");
  let amtval = amount.value;
  // console.log(amtval);
  if (amtval===""|| amtval<1){
    amtval=1;
    amount.value="1";
  }
  // console.log(amtval);
  // console.log(fromCurr.value);
  const url= `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(url);
  let data = await response.json;
  let rate = data[toCurr.value.toLowerCase()];
  // rate=50;
  let finalAmount = amtval * rate;
  console.log(rate); 
  msg.innerText=  `${amtval} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
//   console.log(url);
}


