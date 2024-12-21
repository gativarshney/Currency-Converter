console.log("Js is working...");

const populate = async(value, currency) =>{
    let myStr = "";

    url = `https://api.currencyapi.com/v3/latest?apikey=cur_live_qTR4114wGPR9a5NpqmrZ0IsbCndCwAkEnsqYnzwg&base_currency=${currency}`;
    
    let response = await fetch(url);
    // Check if the response is ok
    if(!response.ok){
        console.log("API request failed : ",response.statusText);
        return; // Exit the function if the request failed
    }
    let rJson = await response.json();
    console.log(rJson);
    if (!rJson["data"]) {
        console.error("No data found in response");
        return; // Exit if there's no data
    }
    document.querySelector(".output").style.display = "block";
    for(let key of Object.keys(rJson["data"])){
        myStr += `<tr>
                    <td>${key}</td>
                    <td>${rJson["data"][key]["code"]}</td>
                    <td>${rJson["data"][key]["value"] * value}</td>
                </tr>
                `
    }
    const tableBody = document.querySelector("tbody");
    tableBody.innerHTML = myStr;
}
const button = document.getElementById("button");
button.addEventListener("click", (e)=>{
    e.preventDefault();
    console.log("Button is Clicked");
    const value = parseInt(document.querySelector("input[name = 'quantity']").value);
    const currency = document.querySelector("select[name = 'currency']").value;
    
    document.querySelector(".output").style.display = "block";
    document.querySelector(".card").style.display = "flex";
    populate(value, currency);
})

