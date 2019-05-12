import React from "react"

function Details(props){
    function detailsToggle(){
        props.detailsToggle();
    }
    const{name,image,desc,amount,pcsInBasket,price,countryOfOrigin} = props.details;
    return(
        <div onClick={detailsToggle} id="details" className="details">
           
            <div onClick={(e)=>e.stopPropagation()} className="wrapper">
                <div className="close" onClick={detailsToggle}>X</div>
                <h2>{name}</h2>
                <div className="content">
                    <div className="image">
                        <img src={image} alt=""/>
                    </div>
                    <div className="text-desc">
                       <div>
                            <div className="title">
                                Description:
                            </div>
                            <div className="desc">{desc}</div>
                        </div>
                        <div>
                            <span className="title">
                                Country of origin:
                            </span>
                            <span className="desc">{countryOfOrigin}</span>
                        </div>
                        <div>
                            <span className="title">
                                Availability:
                            </span>
                            {
                                pcsInBasket>0?
                                    <span className="desc">
                                        {amount} (+{pcsInBasket} in basket)</span>
                                    :
                                    <span className="desc">
                                    {amount}</span>   
                            }
                            
                        </div>
                        <div>
                            <span className="title">
                                Price:
                            </span>
                            <span className="desc">{(price*props.currencyConverter).toFixed(2)}&nbsp;{props.currency}</span>
                        </div>
                    </div>
                </div>
                
                
            </div>
            
        </div>
    )
}

export default Details