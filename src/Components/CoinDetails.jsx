import { Badge, Box, Container, HStack, Image, Progress, Radio, RadioGroup, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Text, VStack } from '@chakra-ui/react'
import { server } from '../index'
import axios from 'axios'
import {useParams} from "react-router-dom"
import React, { useEffect, useState } from 'react'
import Loader from './Loader';

const CoinDetails = () => {

  const [coin, setcoin] = useState({});
  const [loading, setloading] = useState(true);
  const [currency, setcurrency] = useState("inr")
  
  
  const currencySymbol = currency ==="inr"? "₹" : currency==="eur"? "€" : "$"

  const param = useParams();


  useEffect(() => {
   
    const fetchCoin = async()=>{
     const {data} = await axios.get
     (`${server}/coins/${param.id}`)
    
   
     setcoin(data);
     setloading(false);
    };
    fetchCoin();
     
    }, [param.id])
    

  return (
    <Container maxW={"container.xl"}>
   
   {
    loading ? <Loader /> : (
      <>


      <Box width={"full"}>
   
      </Box>



      <RadioGroup value={currency} onChange={setcurrency} p={"8"} >
         <HStack>
           <Radio value={"inr"} >₹ INR</Radio> 
           <Radio value={"usd"} >$ USD</Radio>
           <Radio value={"eur"} >€ EURO</Radio> 
         </HStack>
       </RadioGroup>

       
       <VStack spacing={"4"} p="16" alignItems={"flex-start"} >

       <Text fontSize={"small"} alignSelf="center" opacity={0.7}>
         Last Update On {Date(coin.market_data.last_updated).split("G")[0]}
       </Text>
       
       <Image src={coin.image.large} w={"16"} h={"16"} objectFit={"contain"} ></Image>

       <Stat>

       <StatLabel>{coin.name}</StatLabel>
       <StatNumber>{currencySymbol}{coin.market_data.current_price[currency]}</StatNumber>
       <StatHelpText>
         
        <StatArrow type={coin.market_data.price_change_percentage_24h > 0 ? "increase" : "decrease"} />
         {coin.market_data.price_change_percentage_24h}%

        </StatHelpText> 

       </Stat>
       
       <Badge fontSize={"2xl"} bgColor={"blackAlpha.800"} color={"white"}>
         {`#${coin.market_cap_rank}`}
       </Badge>

       <CustomBar high={`${coin.market_data.high_24h[currency]}`}
       low={`${coin.market_data.low_24h[currency]}`} />

       <Box w={"full"} p={"4"}>
     
       <Item title={"Max Supply"} value={coin.market_data.max_supply}/>
       <Item title={"Circulating Supply"} value={coin.market_data.circulating_supply}/>
       <Item title={"Market Cap"} value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}/> 
       <Item title={"All Time Low"} value={`${currencySymbol}${coin.market_data.atl[currency]}`}/> 
       <Item title={"All Time High"} value={`${currencySymbol}${coin.market_data.ath[currency]}`}/> 

       </Box>

       </VStack>

      </>
    )
   }

    </Container>
  )
}


const Item = ({title,value}) =>(
  <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
    <Text textColor={"black"} letterSpacing={"widest"} >{title}</Text>
    <Text  >{value}</Text>
    
  </HStack>
)

const CustomBar = ({high , low})=>(
  <VStack w={"full"}>
    <Progress value={50} colorScheme={"teal"} w={"full"} />
    <HStack justifyContent={"space-between"} w={"full"}>
      <Badge children={low} colorScheme={"red"} />
      <Text fontSize={"sm"}>24H Range</Text>
      <Badge children={high} colorScheme={"green"} />
    </HStack>

  </VStack>
)

export default CoinDetails