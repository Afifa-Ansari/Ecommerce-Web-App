import {
	Box,
	Button,
	Flex,
	Heading,
	Icon,
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import {
	IoCheckmarkCircleSharp,
	IoCloseCircleSharp,
	IoPencilSharp,
	IoTrashBinSharp,
} from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { listUsers, deleteUser } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const UserListScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userList = useSelector((state) => state.userList);
    const { loading, error, users } = userList;

    const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userDelete = useSelector((state) => state.userDelete);
	const { success: successDelete } = userDelete;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers());
        } else {
            navigate('/login');
        } 
    }, [dispatch, navigate, userInfo, successDelete]);

    const deleteHandler = (id) => {
		if (id === userInfo._id && userInfo.isAdmin === true) {
			alert('Admin cannot be deleted');
		} else {
			if (window.confirm('Are You Sure?You want to Delete')) 
			{ 
				dispatch(deleteUser(id));
			}
		}		
	};  

    return (
        <>
			<Heading as='h1' fontSize='3xl' mb='5'>
				Users
			</Heading>
			{loading ? (
				<Loader />
			) : error ? (
				<Message type='error'>{error}</Message>
			) : (
				<Box bgColor='white' rounded='lg' shadow='lg' px='5' py='5'>
					<Table variant='striped' colorScheme='gray' size='sm'>
						<Thead>
							<Tr>
								<Th>ID</Th>
								<Th>NAME</Th>
								<Th>EMAIL</Th>
								<Th>ADMIN</Th>
								<Th></Th>
							</Tr>
						</Thead>
						<Tbody>
							{users.map((user) => (
								<Tr key={user._id}>
									<Td>{user._id}</Td>
									<Td>{user.name}</Td>
									<Td>
										<a href={`mailto:${user.email}`}>{user.email}</a>
									</Td>
									<Td>
										{user.isAdmin ? (
											<Icon
												as={IoCheckmarkCircleSharp}
												color='green.600'
												w='8'
												h='8'
											/>
										) : (
											<Icon
												as={IoCloseCircleSharp}
												color='red.600'
												w='8'
												h='8'
											/>
										)}
									</Td>
									<Td>
										<Flex justifyContent='flex-end' alignItems='center'>
											<Button
												mr='4'
												as={RouterLink}
												to={`/admin/user/${user._id}/edit`}
												colorScheme='teal' bgColor='teal.800'>
												<Icon as={IoPencilSharp} color='white' size='10' />
											</Button>
											<Button
												mr='4'
												colorScheme='red'
												onClick={() => deleteHandler(user._id)}>
												<Icon as={IoTrashBinSharp} color='white' size='10' />
											</Button>
										</Flex>
									</Td>
								</Tr>
							))}
						</Tbody>
					</Table>
				</Box>
			)}
		</>
    );
};

export default UserListScreen;