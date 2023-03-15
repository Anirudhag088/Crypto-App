import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../index'
import { Container, HStack, Button, RadioGroup, Radio } from '@chakra-ui/react'
import Loader from './Loader'
import CoinCard from './CoinCard'

const Coins = () => {

  const [coins, setcoins] = useState([]);
  const [loading, setloading] = useState(true);
  const [page, setpage] = useState(1)
  const [currency, setcurrency] = useState("inr")


  const currencySymbol = currency ==="inr"? "₹" : currency==="eur"? "€" : "$"

  const changePage = (page) =>{
      setpage(page);
      setloading(true);
  }

  const btns = new Array(100).fill(1)

 useEffect(() => {
   
 const fetchCoins = async()=>{
  const {data} = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`)
 
  setcoins(data);
  setloading(false);
 };
 fetchCoins();
  
 }, [currency,page])
 

  return (
    <Container maxW={"container.xl"}>
      {loading ? ( <Loader /> 
      ) :(
      <> 
       
       <RadioGroup value={currency} onChange={setcurrency} p={"8"} >
         <HStack>
           <Radio value={"inr"} >₹ INR</Radio> 
           <Radio value={"usd"} >$ USD</Radio>
           <Radio value={"eur"} >€ EURO</Radio> 
         </HStack>
       </RadioGroup>


       <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
       {
        coins.map((i) => (
            <CoinCard
             id={i.id} symbol={i.symbol} currencySymbol={currencySymbol}
            name={i.name} img={i.image} price={i.current_price}  
            key={i.id} />
         )

         )}
       </HStack>
         
        <HStack w={"full"} overflowX={"auto"} p={"8"}>

          {
            btns.map((item ,index) =>(
              <Button key={index} bgColor={"blackAlpha.900"} color={"white"}
              onClick={()=>{changePage(index + 1)}}>
                {index + 1}
              </Button>
            
            ))
          }

          </HStack> 
      </>
          )}

    </Container>
  )
}





export default Coins