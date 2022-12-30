import { Grid , Heading } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { listProducts } from '../actions/productActions';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import Message from '../components/Message';

function HomeScreen() {
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { loading, products, error } = productList;

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    return (
        <>
            <Heading as='h2' mb='7' fontSize='2xl'>
                Latest Products
            </Heading>

            {loading ? (
                <Loader />
            ) : error ? (
                <Message type='error'>{error}</Message>
            ) : (
                <Grid 
                    templateColumns={{ sm: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr 1fr'}} 
                    gap='10'>
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </Grid>
            )}
        </>
    );
}

export default HomeScreen;