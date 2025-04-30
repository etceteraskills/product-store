import React, { use } from 'react'
import { Container, VStack, Text, SimpleGrid, } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useProductStore } from '../store/product'
import ProductCard  from '../components/productCard.jsx'
import { useColorModeValue } from '@chakra-ui/react'
import { px } from 'framer-motion'


const HomePage = () => {

  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }
    , [fetchProducts]);

  console.log(products);


  return (
    <div>
      <Container maxH='container.xl' py={12}>
        <VStack spacing={8}>
          <Text
            fontSize={{ base: 22, sm: 28 }}
            fontWeight="bold"
            textTransform="uppercase"
            textAlign="center"
            bgGradient="linear(to-r, cyan.400, blue.500)"
            bgClip="text"
          >
            Current Products
          </Text>

          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={10}
            w={1003}
            // bg={useColorModeValue("white", "gray.700")}
            >
            

           {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </SimpleGrid>

          {products.length === 0 && (
            <Text fontSize='x1' textAlign={"center"} fontWeight='bold' color='gray.500'>
            No Products Found {" "}
            <Link to='/create'>
              <Text as='span' color='blue.500' _hover={{ textDecoration: 'underline' }}>
                Create a product
              </Text>
            </Link>
          </Text>
          )}
        </VStack>

      </Container>





    </div>
  )
}

export default HomePage
