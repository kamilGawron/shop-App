import React, {Component} from "react"
import Product from "./Product"

function ProductsList(props) {
   
    var prodList = props.products.map(prod=>{
        return(
            <Product
                 {...prod}
                addItemToBasket ={props.addItemToBasket}
                currency={props.currency}
                increaseInputVal = {props.increaseInputVal}
                decreaseInputVal = {props.decreaseInputVal}
                inputChange={props.inputChange}
                currencyConverter = {props.currencyConverter}
                detailsToggle = {props.detailsToggle}
                key={prod.id}

            />
        )
    })
    return(
        <div id="productsList" className="productsList">
            {prodList.slice(0,props.productsPerPage)}
        </div>
    )
   
}

export default ProductsList