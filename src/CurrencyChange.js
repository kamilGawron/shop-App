import React from "react"

function CurrencyChange(props){
    
    let keys=Object.keys(props.exchangeRates);
    let options=keys.map(function(elem){
        return(
            <option name={elem} value={props.exchangeRates[elem]}>{elem}</option>
        )
    })
    
    function changeCurrency(){
        let select = document.getElementById("changeCurrency");
        let currName = select.options[select.selectedIndex].text;
        let exchange = select.options[select.selectedIndex].value;
        props.changeCurrencyHandler(currName,exchange);
    }
    
    return(
        <div>
            {/*<label for="changeCurrency">change your currency:</label>*/}
            <select onChange={changeCurrency} name="" id="changeCurrency">
                <option value="1">EUR</option>
                {options}
            </select>
        </div>
    )
}
export default CurrencyChange