import { Flex , Spinner } from '@chakra-ui/react';

const Loader = () => {
    return (
        <Flex alignItems='center'
        justifyContent='center'>
            <Spinner
                thickness='5px'
                speed='0.65s'
                emptyColor='gray.300'
                color='teal.800'
                size='xl'
            />
        </Flex>
    );
};

export default Loader;