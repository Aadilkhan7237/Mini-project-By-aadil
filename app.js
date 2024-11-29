const BASE_URL="https://2024-03-06.currency-api.pages.dev/v1/currencies/";


let dropdowns=document.querySelectorAll(".dropdown select");
let btn=document.querySelector("form button");
let fromCurr=document.querySelector(".from select");
let toCurr=document.querySelector(".to select");
let msg=document.querySelector(".msg");
let result =document.querySelector(".msg p");
// console.log(fetch(BASE_URL));

for(let select of dropdowns){
    
for(code in countryList){
    let newoption=document.createElement("option");
    newoption.innerText=code;
    newoption.value=code;
    if(select.name==="from" && code==="USD"){
        newoption.selected="selected";
    }
    else if(select.name==="to"&&code==="INR"){
        newoption.selected="selected";
    }
    select.append(newoption);
    //console.log(code,countryList[code]);
}
select.addEventListener("change",(event)=>{
    updateFLag(event.target);
});
}

const updateFLag=(element)=>{
      // console.log(element);
      let currCode=element.value;
     // console.log(currCode);
      let countryCode=countryList[currCode];
     let newsrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
     let img=element.parentElement.querySelector("img");
     img.src=newsrc;
};


let updateExchangeRate=async()=>{
    let amount=document.querySelector(".amount input");
    let amt=amount.value;
    if(amount.value==""||amt<1){
     amt=1;
     amount.value="1";
    }
   //console.log(amt);
   //console.log(fromCurr.value);
   let URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
   let res=await fetch(URL);
   let data=await res.json();
  // console.log(data);
   let exchangeRate= data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
  console.log(exchangeRate);
 
  let finalAmt=amt*exchangeRate;
 // console.log(finalAmt);
  msg.innerHTML=`1${fromCurr.value} = ${exchangeRate}${toCurr.value}<br>${amt}${fromCurr.value} = ${finalAmt}${toCurr.value}`;
  console.dir(result);
};

window.addEventListener("load",()=>{
     updateExchangeRate();
});
btn.addEventListener("click", (event)=>{
   event.preventDefault();
   updateExchangeRate();
//result.innerText=`${amt}${fromCurr.value}=${finalAmt}${toCurr.value}`;
});

