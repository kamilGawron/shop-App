import React,{Component} from 'react';
import './App.css';
import ProductsList from "./ProductsList"
import Header from './Header'
import CurrencyChange from './CurrencyChange'
import Settings from './Settings'
import Details from './Details'



class App extends React.Component {
    constructor(){
        super();
        this.state={
            productsBaseCounter:0,
            products:[],
            currency:"EUR",
            basket:[],
            productsPerPage:10,
            exchangeRates:{},
            currencyConverter:1,
            searchInputValue:"",
            minPrice:Number.NEGATIVE_INFINITY,
            maxPrice:Number.POSITIVE_INFINITY,
            countriesOfOrigin:[],
            selectedOriginCountry:"",
            details:{
                name:"Name",
                image:"",
                desc:"",
                amount:0,
                price:0,
                countryOfOrigin:"",
                pcsInBasket:0,
            },

        }
        
    }
   componentWillUpdate(){
       if(this.state.products[0]){
           document.getElementById("productsList").style.paddingTop="120px";
       }        
   }
    
    componentDidMount() {
        var self=this;
        fetch("https://gist.githubusercontent.com/kamilGawron/6f2783938e98bae71fff31be0bf6377b/raw/dc0748e17b013394ccc5803babcae01341bb0d14/products.json")
            .then(response => response.json())
            .then(function(data){
                const modData = data.map(function(elem){
                    elem.inBasket = false;
                    elem.addedToBasket = 0;
                    elem.inputValue = 1;
                    elem.info="";
                    return elem;
                })
                self.setState({products:modData});
                return self.state.products
        }).then(response=>{
            let countries = response.map(elem=>{
                return elem.country
            })
            let filteredCountries=[...new Set(countries)];
            this.setState({
                productsBaseCounter:response.length,
                countriesOfOrigin: filteredCountries
            })
        })
        
        fetch("https://api.exchangeratesapi.io/latest")
        .then(response=>response.json())
            .then(data=>this.setState({exchangeRates:data.rates}))
        
        document.getElementById("details").style.display="none";
        document.getElementById("filters").style.display="none";
    }
    
    inputChange=e=>{
        const{id,name,value} = e.target;
        let modData = this.state.products.map(function(prod){
            if((prod.id==id)){
                if(prod.amount>=parseInt(value)){
                    prod.inputValue = parseInt(value);
                }
                else{
                    console.log("out of stock")
                }
            }
            return prod;
        })
        this.setState({products:modData});
    }
    
    decreaseInputVal=id=>{
        let modData = this.state.products.map(function(prod){
            if((prod.id==id)&&(prod.inputValue>1)){
                prod.inputValue = prod.inputValue-1;
            }
            return prod;
        })
        this.setState({products:modData});
    }
    
    increaseInputVal=id=>{
        let modData = this.state.products.map(function(prod){
            if(prod.id==id ){
                prod.inputValue = prod.inputValue<prod.amount? prod.inputValue+1: prod.amount;
            }
            return prod;
        })
        this.setState({products:modData});
    }

    addItemToBasket=props=>{
        const {id,name,price,inputValue,amount} = props;
        
        if(amount>=inputValue){
            let modData = this.state.products.map(function(prod){
                if(prod.id==id){
                    if(inputValue==amount){
                        prod.info="out of stock"
                    }else{
                        prod.info="";
                    }
                    prod.inBasket = true;
                    prod.addedToBasket += inputValue;
                    prod.amount-=inputValue;
                }
                return prod;
            })
            this.setState({products:modData});

            const basketProd={
                name:name,
                price:price,
                id:id,
                amountToBuy:inputValue,
                amount:amount-inputValue,
            }



            if(this.state.basket.some(elem=>elem.id==id)){
                let newBasket = this.state.basket.map(function(elem){
                    if (elem.id==id){
                        elem.amountToBuy+=parseInt(inputValue);
                        elem.amount-=parseInt(inputValue);
                    }
                    return elem;
                })
                this.setState({basket:newBasket})
            }else{
                this.setState(prevState=>{
                    return {
                        basket:[...prevState.basket, basketProd]
                    }
                })
            }

        }
        else{
            let info;
            if(amount>0){
                info = `only ${amount} pcs left`;
            }else{
                info = "out of stock";
            }
            let modData = this.state.products.map(function(prod){
                if(prod.id==id){
                    prod.info= info;
                }
                return prod;
            })
           
            this.setState({products:modData});
        }
        
        
    }
    showMore=()=>{
        this.setState(prevState=>{
            return{
                productsPerPage:prevState. productsPerPage+10
            }
        })
    }
    
    removeItem=id=>{
        let newData=this.state.products.map(function(elem){
            if(elem.id==id){
                elem.amount+=elem.addedToBasket;
                elem.inBasket = false;
                elem.addedToBasket=0;
                elem.info="";
            }
            return elem;
        })
        this.setState({products:newData})
        let newBasket = this.state.basket.filter(function(elem){
            if(elem.id!=id){
                return elem;
            }
        })
        this.setState({basket:newBasket})
    }
    
    changeCurrencyHandler=(currName,exchange)=>{
        this.setState({
            currency:currName,
            currencyConverter:exchange
        },()=>{
            let minPrice = document.getElementById("minPriceInput").value;
            let maxPrice = document.getElementById("maxPriceInput").value;
            this.priceRangeChange({target:{name:"minPrice",value:minPrice}})
            this.priceRangeChange({target:{name:"maxPrice",value:maxPrice}})
        })
    }
    
    inputChangeHandler=(e)=>{
        const {value}=e.target;
        this.setState({searchInputValue:value});
    }
    
    sortListHandler = (e)=>{
        const {value}=e.target;
        let modProd;
        let sort=false;
        if(value=="nameDesc"){
            sort=!sort;
            modProd = this.state.products.sort((a,b)=>a.name<b.name? 1:-1);
        }else if(value=="nameAsc"){
            sort=!sort;
            modProd=this.state.products.sort((a,b)=>a.name>b.name? 1:-1)
        }else if(value=="priceDesc"){
            sort=!sort;
            modProd = this.state.products.sort((a,b)=>a.price<b.price? 1:-1);
        }else if(value=="priceAsc"){
            sort=!sort;
            modProd = this.state.products.sort((a,b)=>a.price<b.price? -1:1);
        }
        sort && this.setState({products:modProd});
    }
    priceRangeChange=(e)=>{
        const{name} = e.target;
        let value;
        if((e.target.value=="")&&(e.target.name=="minPrice")){
            value=Number.NEGATIVE_INFINITY;
        }else if((e.target.value=="")&&(e.target.name=="maxPrice")){
            value=Number.POSITIVE_INFINITY;
        }else{
            value=e.target.value;
        }
     this.setState({[name]:value})
     
    }
    selectOriginCountryHandler =(e)=>{
       this.setState({[e.target.name]:e.target.value})
    }

    detailsToggle=(name,image,desc,amount,addedToBasket,price,country,)=>{
        name = name || '';
        image = image || '';
        desc = desc || '';
        amount = amount || 0;
        country = country || "";
        price = price || 0;
        addedToBasket = addedToBasket || 0;

        this.setState({details:{
            name:name,
            image:image,
            desc:desc,
            amount:amount,
            pcsInBasket:addedToBasket,
            countryOfOrigin:country,
            price:price,
        }})
        let details = document.getElementById("details");
        details.style.display= details.style.display=="none"? "block" : "none";
    }
    

    render(){
        let resultProd;
        let productsCounter=0;
        resultProd= this.state.products[0]?  this.state.products.filter((elem)=>{

            if(
                (elem.name.toLowerCase().includes(this.state.searchInputValue.toLowerCase()))&&
                ((elem.price*this.state.currencyConverter)>this.state.minPrice)&&
                ((elem.price*this.state.currencyConverter)<this.state.maxPrice)&&
                (elem.country.includes(this.state.selectedOriginCountry))
            ){
                productsCounter++;
                return elem;
            }
        }) : "";
        
        return (
            <div >
                <Header 
                    basket={this.state.basket}
                    currency={this.state.currency}
                    removeItem={this.removeItem}
                    addItemToBasket={this.addItemToBasket}
                    currencyConverter={this.state.currencyConverter}
                    exchangeRates={this.state.exchangeRates} 
                    changeCurrencyHandler={this.changeCurrencyHandler} 
                />
                
                <Settings
                    inputChangeHandler = {this.inputChangeHandler} 
                    searchInputValue = {this.state.searchInputValue}
                    sortListHandler=
                    {this.sortListHandler}
                    priceRangeChange={this.priceRangeChange}
                    productsCounter={productsCounter}
                    productsBaseCounter={this.state.productsBaseCounter}
                    maxAvaiablePrice = {this.state.maxAvaiablePrice}
                    currencyConverter={this.state.currencyConverter}
                    countriesOfOrigin = {this.state.countriesOfOrigin}
                    selectOriginCountryHandler = {this.selectOriginCountryHandler}
                    minPrice ={this.state.minPrice}
                    maxPrice={this.state.maxPrice}
                    currency={this.state.currency}
                />
                
                {
                    this.state.products[1]? 
                        <div>
                           
                            <ProductsList 
                                api="https://gist.githubusercontent.com/kamilGawron/6f2783938e98bae71fff31be0bf6377b/raw/dc0748e17b013394ccc5803babcae01341bb0d14/products.json"
                                currency={this.state.currency}
                                products={resultProd}
                                productsCounter = {productsCounter}
                                addItemToBasket={this.addItemToBasket}
                                productsPerPage={this.state.productsPerPage}
                                increaseInputVal = {this.increaseInputVal}
                                decreaseInputVal = {this.decreaseInputVal}
                                inputChange={this.inputChange}
                                currencyConverter={this.state.currencyConverter}
                                detailsToggle = {this.detailsToggle}
                            />
                                
                            {
                                productsCounter==0?  
                                    <span className="no-founds">No Founds</span> 
                                    : 
                                    productsCounter-this.state.productsPerPage>0? 
                                        <span className="showMoreBtn" onClick={this.showMore}>Show more products (+ {productsCounter-this.state.productsPerPage})</span> 
                                        : 
                                        <span className="products-displayed" >All products are displayed</span>
                            }
                           
                        </div> 
                        :
                        <div className="loading">
                           Loading...
                            <div className="loader">
                            </div>
                        </div>
                }
                
                <Details 
                    details={this.state.details} 
                    detailsToggle = {this.detailsToggle} 
                    currency={this.state.currency}
                    currencyConverter={this.state.currencyConverter}
                />
            </div>
        );
    }
  
}

export default App;
