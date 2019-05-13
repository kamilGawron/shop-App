import React from "react"
import chevronDown from "./down-chevron.png"


function Settings(props){
    const {searchInputValue}=props;
    let searchInput = document.getElementById("searchItems");
    function clearInput(){
        let searchInput = document.getElementById("searchItems");
        searchInput.value="";
        props.inputChangeHandler({target:{value:""}});
    }
    let options = props.countriesOfOrigin.map(function(elem,index){
        return(
            <option key={index} value={elem}>{elem}</option>
        )
    })
    function clearMinPrice(){
        let minPriceInput = document.getElementById("minPriceInput");
        minPriceInput.value="";
        props.priceRangeChange({target:{value:"",name:"minPrice"}})
    }
    function clearMaxPrice(){
        let maxPriceInput = document.getElementById("maxPriceInput");
        maxPriceInput.value="";
        props.priceRangeChange({target:{value:"",name:"maxPrice"}})
    }
    function showFilters(){
        let filters = document.getElementById("filters");
        let productsList = document.getElementById("productsList");
       
        
        filters.style.display =filters.style.display =="none"? "flex" : "none";
       
        
        
        document.getElementById("filtersChevron").style.transform += "rotate(180deg)";
        
        if(window.innerWidth>480){
                document.getElementById("productsList").style.paddingTop=document.getElementById("filters").style.display=="none"? "120px" : "200px";
            }
        
    }
    return(
       
        <div className="settings">
            <div className="filters">
                <div className="header">filters &nbsp; <img id="filtersChevron" onClick={showFilters} src={chevronDown} alt=""/>
                    {props.productsCounter!=props.productsBaseCounter?             <div className="matches-phone">matches:{props.productsCounter}</div> :<div></div>
                    }
                    </div>
                <div id="filters" className="filters-content">
                    {/* PHONE ONLY*/}
                    <div className="search-phone">
                        <input id="searchItems" onChange={props.inputChangeHandler}  type="text" placeholder="search items"/>
                        {searchInputValue!=""? <span className="close" onClick={clearInput}>X</span> :""}

                    </div>
                   <div className="sort-phone">
                <select onChange={props.sortListHandler} name="" id="">
                    <option value="default">sort list</option>
                    <option value="nameDesc">Name descending</option>
                    <option value="nameAsc">Name ascending</option>
                    <option value="priceDesc">Price descending</option>
                    <option value="priceAsc">Price ascending</option>
                </select>
            </div>
            
                   
                   
                   
                   
                    <div className="priceRange">
                        <div className="title">Price ({props.currency})</div>
                        
                        <div>
                            <input id="minPriceInput" placeholder="from" onChange={props.priceRangeChange} name="minPrice" type="text"/>
                            {props.minPrice==Number.NEGATIVE_INFINITY? <span>&nbsp;</span>: <span onClick={clearMinPrice} className="close">X</span>}
                            -&nbsp;
                            <input id="maxPriceInput" placeholder="to" onChange={props.priceRangeChange} name="maxPrice" type="text"/>
                            {props.maxPrice==Number.POSITIVE_INFINITY?  <span>&nbsp;</span>: <span onClick={clearMaxPrice} className="close">X</span>}
                        </div>
                       
                    </div> 
                    <div className="origin-countries">
                       <div className="title">
                           Country of origin
                       </div>
                       <div>
                           <select name="selectedOriginCountry" onChange={props.selectOriginCountryHandler}  id="">
                              <option value="">select country</option>
                               {options}
                           </select> 
                       </div>
                        
                    </div>
                </div>
            </div>
          
            
            <div className="sort">
                <select onChange={props.sortListHandler} name="" id="">
                    <option value="default">sort list</option>
                    <option value="nameDesc">Name descending</option>
                    <option value="nameAsc">Name ascending</option>
                    <option value="priceDesc">Price descending</option>
                    <option value="priceAsc">Price ascending</option>
                </select>
            </div>
            <div className="search">
                <input id="searchItems" onChange={props.inputChangeHandler}  type="text" placeholder="search items"/>
                {searchInputValue!=""? <span className="close" onClick={clearInput}>X</span> :""}
                
            </div>
            {props.productsCounter!=props.productsBaseCounter?             <div id="matches" className="matches">matches:{props.productsCounter}</div> :<div></div>
            }
            
           
        </div>
    )
}
export default Settings