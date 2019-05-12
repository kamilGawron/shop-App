import React from "react"
import basketIcon from "./shopping-cart.png"
import chevronDown from "./down-chevron.png"
import CurrencyChange from './CurrencyChange'



function Basket(props){
    const {id,name,price,amountToBuy} = props.basket;
    let total=0;
    const basketList=props.basket.map(function(prod){
        total+=prod.amountToBuy*prod.price*props.currencyConverter;
        return(
            <div className="item">
                <div>{prod.name}</div>
                <div>{(prod.price*prod.amountToBuy*props.currencyConverter).toFixed(2)}{" "}{props.currency}</div>
                
                <div className="buttons">
                    <span onClick={changePcsInBasket.bind(this,prod,"-")}>-</span>
                    <span>{prod.amountToBuy}</span>
                    <span onClick={changePcsInBasket.bind(this,prod,"+")}>+</span>
                </div>
                <div onClick={props.removeItem.bind(this,prod.id)} className="removeItem">X</div>
            </div>
        )
    })
    function changePcsInBasket(prod,sign){
        if((sign=="-")&&(prod.amountToBuy==1)){}else{
            let tmpProd={
                id:prod.id,
                name:prod.name,
                price:prod.price*props.currencyConverter,
                amount:prod.amount,
            }
            tmpProd.inputValue = sign=="-"? -1:1
            props.addItemToBasket(tmpProd);
        }
        if(prod.amountToBuy>1){
           
        }
      

    }
    function rmPcsInBasket(prod){
        if(prod.amountToBuy>1){
            props.removeItem(prod.id)
        }else{
            let tmpProd={
                id:prod.id,
                name:prod.name,
                price:prod.price*props.currencyConverter,
                amount:prod.amount,
                inputValue:-1,
            }
            console.log(tmpProd);
            props.addItemToBasket(tmpProd);
        }
      
    }
    function addPcsInBasket(prod){
        let tmpProd={
            id:prod.id,
            name:prod.name,
            price:prod.price*props.currencyConverter,
            amount:prod.amount,
            inputValue:1,
        }
        console.log(tmpProd);
        props.addItemToBasket(tmpProd);

    }
    function showBasketList(){
        let basketList=document.getElementById("basketList");
        basketList.style.display = basketList.style.display=="block"? "none" : "block";
    }
    function closeBasketList(){
        document.getElementById("basketList").style.display = "none";
    }
    return(
        <div id="basket">
            <div className="basket-header">
                <div onClick={showBasketList}>
                    <img height="30px" width="30px" src={basketIcon} alt=""/>&nbsp;
                    <img height="15px" width="15px" src={chevronDown} alt=""/>
                </div>
                <div>
                    {total.toFixed(2)}
                    <CurrencyChange 
                        exchangeRates={props.exchangeRates} 
                        changeCurrencyHandler={props.changeCurrencyHandler} 
                    />
                </div>
            </div>
            <div id="basketList" className="basketList">
                <span onClick={closeBasketList} className="close">X</span>
                {basketList[0]? <h4>Your basket:</h4> :""}

                <div className="list">
                    {basketList[0]?  basketList:<h4>Your basket is empty</h4>}
                </div>
                <div className="total">{basketList[0]? `Total:${total.toFixed(2)}${props.currency}`:""}</div>
            </div>
        </div>
    ) 
}

export default Basket