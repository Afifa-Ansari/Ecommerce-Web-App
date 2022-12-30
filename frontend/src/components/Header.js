import { 
    Heading, 
    Flex, 
    Box, 
    Icon, 
    Link,
    Button,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from '@chakra-ui/react';
import { useState } from 'react';
import { HiUser , HiShoppingCart , HiOutlineMenuAlt3} from 'react-icons/hi';
import { IoChevronDown } from 'react-icons/io5';
import { useDispatch , useSelector } from 'react-redux';
import { Link as RouterLink , useNavigate } from 'react-router-dom';

import { logout } from '../actions/userActions';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const[show , setShow]= useState(false);

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    
    const userDetails = useSelector((state) => state.userDetails);
    const { user } = userDetails;

    const logoutHandler = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <Flex
            as='header'
            align='center'
            justify='space-between'
            w='100%'
            px='5'
            py='6'
            top='0'
            pos='fixed'
            z-index='99'
            bgColor='teal.800'
            wrap='wrap'>

            {/* Display Heading */}
            <Heading 
                as='h1' 
                color='whiteAlpha.900' 
                fontWeight='bold' 
                size='md' 
                letterSpacing='md'>
                <Link 
                    as={RouterLink}
                    to='/'
                    _hover={{ color:'gray.300', textDecoration:'none'}}>
                    Clothing Center
                </Link> 
            </Heading>

            {/* Menu */}
            <Box
                display={{ base:'block' , md:'none' }}
                onClick={() => setShow(!show)}>
                <Icon as={HiOutlineMenuAlt3}
                color='white' w='4' h='4' />
            </Box>

            {/* Cart & Login */}
            <Box
                display={{ base:show ? 'block' : 'none' , md:'flex' }}
                width={{ base: 'full',md:'auto' }}
                mt={{ base: 5 , md: 0 }}   
                lineHeight={{ base: 2 , md: 0}}
                alignItems='center'>
                    
                <Link
                    as={RouterLink}
                    to='/cart'
                    color='whiteAlpha.900'
                    fontWeight='bold'
                    fontSize='sm'
                    letterSpacing='wide'
                    display='flex'
                    mr='6'
                    alignItems='center'
                    _hover={{ color: 'gray.300'}}
                    textTransform='uppercase'>
                    <Icon as={HiShoppingCart}
                    mr ='1' w='3' h='3' />
                    Cart
                </Link>

                {userInfo ? (
                    <Menu>
                        <MenuButton
                            as={Button} 
                            rightIcon={<IoChevronDown />}
                            _hover={{ textDecor:'none', opacity: '0.8'}}>
                                { userInfo.name !== user.name && user.name || userInfo.name }
                        </MenuButton>
                        <MenuList>
                            <MenuItem h='10' as={RouterLink} to='/profile'>
                                Profile
                            </MenuItem>
                            <MenuItem h='10' onClick={logoutHandler}>
                                Logout
                            </MenuItem>
                        </MenuList>
                    </Menu>
                ) : (
                    <Link
                        as={RouterLink}
                        to='/login'
                        color='whiteAlpha.900'
                        fontWeight='bold'
                        fontSize='sm'
                        letterSpacing='wide'
                        display='flex'
                        mr='6'
                        alignItems='center'
                        _hover={{ color: 'gray.300'}}
                        textTransform='uppercase'>
                        <Icon as={HiUser}
                        mr ='1' w='3' h='3' />
                        Login
                    </Link>
                )} 

                {/* Admin Menu*/}
                {userInfo && userInfo.isAdmin && (
					<Menu>
						<MenuButton
							ml='5'
							color='whiteAlpha.900'
							fontSize='sm'
							fontWeight='semibold'
							as={Link}
							textTransform='uppercase'
							_hover={{ textDecoration: 'none', opacity: '0.7' }}>
							Manage <Icon as={IoChevronDown} />
						</MenuButton>
						<MenuList>
							<MenuItem h='10' as={RouterLink} to='/admin/userlist'>
								All Users
							</MenuItem>
							<MenuItem h='10' as={RouterLink} to='/admin/productlist'>
								All Products
							</MenuItem>
							<MenuItem h='10' as={RouterLink} to='/admin/orderlist'>
								All Orders
							</MenuItem>
						</MenuList>
					</Menu>
				)}
            </Box>
        </Flex>
    );
};

export default Header;