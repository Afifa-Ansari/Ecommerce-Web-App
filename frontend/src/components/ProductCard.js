import { Text, Box, Link, Image, Flex, Heading } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

import Rating from './Rating';

 //Display Products 

const ProductCard = ({ product }) => {
    return(
        <Link
            as={RouterLink} 
            to={`/product/${product._id}`}
            _hover={{textDecor:'none'}}>
            <Box
                bgColor='whiteAlpha.500'
                borderRadius='md'
                maxW='sm'
                overflow='hidden'
                _hover={{ shadow:'md' }}>

                {/* Display Product Image */}
                <Image
                    src={product.image}
                    alt={product.name}
                    w='100%'
                    h='400px'
                    objectFit='cover'
                />

                {/* Display Product Name */}
                <Flex px='5' py='5' direction='column'
                justifyContent='space-between'>
                    <Heading as='h4' mb='3' fontSize='l'>
                        {product.name}
                    </Heading>

                    {/* Display Product Rating & Price */}
                    <Flex alignItems='center'
                    justifyContent='space-between'>
                        <Rating value={product.rating} />
                        <Text color='blackAlpha.900' fontSize='bold' fontWeight='3xl'>
                            ₹{product.price}
                        </Text>
                    </Flex>   
                </Flex>
            </Box>
        </Link>
    );
};

export default ProductCard;