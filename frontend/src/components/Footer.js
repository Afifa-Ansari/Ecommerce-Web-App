import { Flex , Text } from '@chakra-ui/react';

const Footer = () => {
    return(
        <Flex as='footer'
        justifyContent='center' py='6'>
            <Text>
                Copyright {new Date().getFullYear()}.
                Clothing Center. All Rights Reserved.
            </Text>
        </Flex>
    );
};

export default Footer;