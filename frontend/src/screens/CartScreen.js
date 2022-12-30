import {
    Box,Button,
    Flex,Grid,
    Heading,Icon,
    Image,Link,
    Select,Text,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { IoTrashBinSharp } from 'react-icons/io5';
import { useDispatch , useSelector } from 'react-redux';
import { 
    useNavigate,
    Link as RouterLink,
    useParams, 
    useSearchParams,
} from 'react-router-dom';

import { addToCart , removeFromCart } from '../actions/cartActions';
import Message from '../components/Message';

const CartScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    
    const { id : productId } = useParams();
    let qty = searchParams.get('qty');

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(qty , productId));
        }
    }, [dispatch, productId, qty]);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        navigate(`/login?redirect=/shipping`);
    };

    console.log(cartItems);

    return (
        <>
            <Grid>
            <Box>
                <Heading mb='7'>Shopping Cart</Heading>
                <Flex>
                    {/* Display this if cart is empty */}
                    {cartItems.length === 0 ? (
                        <Message>
                            Your cart is empty.{''}
                            <Link to='/' as={RouterLink} ml='8' borderColor='black' borderRadius='sm' borderWidth='2px' _hover={{textDecor:'none'}}>
                                Go Back
                            </Link>   
                        </Message>
                    ) : (
                        //Display this if there is an item in cart
                        <Grid  
                        templateColumns={{ sm:'1fr', md: '3fr 2fr', lg: '5fr 2fr'}} gap='10' w='full'>
                            {/* Column 1 */}
                            <Flex direction='column'>
                                {cartItems.map((item) => (
                                    <Grid 
                                        key={item.product} size='100%'
                                        alignItems='center' justifyContent='space-between'
                                        py='3'
                                        px='3'
                                        rounded='lg'
                                        _hover={{ bgColor:'gray50' }}
                                        templateColumns='1fr 4fr 2fr 2fr 2fr'>
                                        
                                        {/* Product Image */}
                                        <Image 
                                            src={item.image}
                                            alt={item.name}
                                            height='14'
                                            width='14'
                                            borderRadius='lg'
                                            objectFit='cover'
                                        />

                                        {/* Product Name */}
                                        <Text fontWeight='semibold'
                                        fontSize='lg' px='2'>
                                            <Link as={RouterLink} to={`/product/${item.product}`}>
                                                {item.name}  
                                            </Link> 
                                        </Text>

                                        {/* Product Price */}
                                        <Text fontWeight='semibold'
                                        fontSize='lg'>
                                            ₹{item.price}
                                        </Text>

                                        {/* Quantity */}
                                        <Select
                                            value={item.qty}
                                            px='2'
                                            onChange={(e)=>
                                                dispatch(addToCart(+e.target.value, item.product))
                                            }
                                            width='20'>
                                            {[...Array(item.countInStock).keys()].map((i) => (
                                                <option value={i+1} key={i+1}>
                                                    {i+1} 
                                                </option>
                                            ))}
                                        </Select>
                                        
                                        {/* Delete Button */}
                                        <Button
                                            type='button' colorScheme='red'
                                            ml='3' 
                                            onClick={() => removeFromCartHandler(item.product)}>
                                            <Icon as={IoTrashBinSharp} />
                                        </Button>
                                    </Grid>
                                ))}
                            </Flex>

                            {/* Column 2 */}
                            <Flex 
                                direction='column'
                                border='1px'
                                borderColor='gray.200'
                                borderWidth='2'
                                padding='5'
                                heigth='48'
                                rounded='md'
                                justifyContent='space-between'>
                                <Flex direction='column'>
                                    <Heading as='h2' fontSize='xl' mb='2'>
                                        Subtotal (
                                        {cartItems.reduce((acc,currVal) => acc + currVal.qty, 0)}{' '}
                                        items)
                                    </Heading>
                                    <Text 
                                        fontWeight='bold' fontSize='2xl' color='blue.600' mb='4'>
                                        ₹{cartItems.reduce(
                                            (acc,currVal) => acc + currVal.qty * currVal.price, 0
                                        )}
                                    </Text>

                                    <Button 
                                        type='button' size='lg' bgColor='teal.800' colorScheme='teal' onClick={checkoutHandler} disabled={cartItems.length === 0}>
                                        Proceed to Pay
                                    </Button>
                                </Flex>
                            </Flex>
                        </Grid>
                    )}
                </Flex>
            </Box>
            </Grid>
        </>
    );
};

export default CartScreen;