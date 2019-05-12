import React from "react"
import Basket from "./Basket"

function Header (props){
    return(
        <header>
            <h1>SHOP APP</h1>
            <Basket 
                {...props}
                />
        </header>
    )

}
export default Header