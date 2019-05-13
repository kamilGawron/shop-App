import React from "react"

function Product(props){
    const {
        info,
        id,
        amount,
        image,
        name,
        price,
        country,
        desc,
        currency,
        inBasket,
        addedToBasket,
        inputValue,
        decreaseInputVal,
        increaseInputVal,
        inputChange,
    } = props;
    
    function handleClick(){
        props.addItemToBasket(props);
    }
    function handleOver(e){
        if(e.target.className=="after-add"){
            if(amount>0){
                document.getElementById(e.target.id).innerHTML=`Add next  (${inputValue})`
            }else{
                document.getElementById(e.target.id).innerHTML=`Cannot add next item`
            }
            
        }
    }
    function handleOut(e){
        if(e.target.className=="after-add"){
            document.getElementById(e.target.id).innerHTML=`Added (${addedToBasket})`
        }
    }
    
    return(
        <div className="product" key={id}>
           
            <img src={image} alt=""/>
            <div>
                <h3>{name}</h3>
                <div onClick={props.detailsToggle.bind(this,name,image,desc,amount,addedToBasket,price,country)} className="details-title">view details</div>
            </div>
            <div className="buy">
                <div className="price">
                    <h4>{(price*props.currencyConverter).toFixed(2)}</h4>
                    <span>{currency}</span>
                </div>
                <div className="add-to-basket">
                    <div>
                       
                        <span onClick={decreaseInputVal.bind(this,props.id)}>-</span>
                        <input 
                          
                           id={id}
                            onChange={inputChange}
                           value={inputValue}
                            name="inputValue"
                        />
                        <span onClick={increaseInputVal.bind(this,props.id)}>+</span>

                    </div>
                    <span id={"btn"+id} onMouseOver={handleOver} onMouseOut={handleOut} className={inBasket? "after-add" : ""} onClick={handleClick}>
                        {!inBasket?  "Add to basket" :("Added ("+ addedToBasket +")")}
                    </span>
                    {info==""? <div className="info">&nbsp;</div>:<div className="info">{info}</div> }
                </div>
            </div>
        </div>
    )  
}
export default Product