import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../index'
import { Container, Heading, HStack, VStack,Image,Text } from '@chakra-ui/react'
import Loader from './Loader'

const Exchanges = () => {

  const [exchanges, setexchanges] = useState([]);
  const [loading, setloading] = useState(true);

 useEffect(() => {
   
 const fetchExchanges = async()=>{
  const {data} = await axios.get(`${server}/exchanges`)
 
  setexchanges(data);
  setloading(false);
 };
 fetchExchanges();
  
 }, [])
 

  return (
    <Container maxW={"container.xl"}>
      {loading ? ( <Loader /> 
      ) :(<> 
       
       <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
       {
         exchanges.map((i) => (
            <ExchangeCard name={i.name} img={i.image} rank={i.trust_score_rank} url={i.url} 
            key={i.id} />
         )

         )}
       </HStack>

      </>
          )}

    </Container>
  )
}

const ExchangeCard = ({name,img,rank,url}) => <a href={url} target={"blank"}>
      
    <VStack w={"52"} shadow={"lg"} p={"8"} borderRadius={"lg"} transition={"all 0.3s"}
      margin={"4"} 
      css={{
        "&:hover":{
          transform:"scale(1.1)"
        }
      }}
     >

      <Image src={img} w={"10"} h={"10"} objectFit={"contain"} alt={"Exchange"} />
      
       <Heading size={"md"} noOfLines={1} >{rank}</Heading>

       <Text noOfLines={1} >{name}</Text>
    </VStack>

  </a>;


export default Exchanges