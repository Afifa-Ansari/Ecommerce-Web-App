import {
	Button,
	Checkbox,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Link,
	Spacer,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';

import { getUserById, updateUser } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { USER_UPDATE_RESET, USER_BY_ID_RESET } from '../constants/userConstants';

const UserEditScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id: userId } = useParams();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [isAdmin, setIsAdmin] = useState(false);

	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	const userById = useSelector((state) => state.userById);
	const {
		loading: loadingById,
		error: errorById,
	} = userById;

	const userUpdate = useSelector((state) => state.userUpdate);
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = userUpdate;

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: USER_UPDATE_RESET });
			dispatch({ type: USER_BY_ID_RESET });
			navigate('/admin/userlist');
		} else {
			if (!user.name || user._id !== userId) {
				dispatch(getUserById(userId));
			} else {
				setName(user.name);
				setEmail(user.email);
				setIsAdmin(user.isAdmin);
			}
		}
	}, [user, dispatch, userId, successUpdate, navigate]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(updateUser({ _id: userId, name, email, isAdmin }));
	};

	return (
		<>
			<Flex mb='5'>
                <Button as={RouterLink} 
                to='/admin/userlist' bgColor='teal.800' colorScheme='teal'>
                    Go Back
                </Button>
            </Flex>

			<Flex w='full' alignItems='center' justifyContent='center' py='5'>
				<FormContainer>
					<Heading as='h1' mb='8' fontSize='3xl'>
						Edit User
					</Heading>

					{loadingById && <Loader />}
					{errorById && <Message type='error'>{errorById}</Message>}

					{loadingUpdate && <Loader />}
					{errorUpdate && <Message type='error'>{errorUpdate}</Message>}

					{loading ? (
						<Loader />
					) : error ? (
						<Message type='error'>{error}</Message>
					) : (
						<form onSubmit={submitHandler}>
							<FormControl id='name' isRequired>
								<FormLabel>Name</FormLabel>
								<Input
									type='text'
									placeholder='Enter full name'
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</FormControl>
							<Spacer h='3' />

							<FormControl id='email' isRequired>
								<FormLabel>Email Address</FormLabel>
								<Input
									type='text'
									placeholder='Enter email address'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</FormControl>
							<Spacer h='3' />

							<FormControl id='isAdmin'>
								<FormLabel>Is Admin?</FormLabel>
								<Checkbox
									size='lg'
									colorScheme='teal' 
									checked={isAdmin}
									onChange={(e) => setIsAdmin(e.target.checked)}>
									Is Admin?
								</Checkbox>
							</FormControl>
							<Spacer h='3' />

							<Button
								type='submit'
								isLoading={loading}
								colorScheme='teal' 
                                bgColor='teal.800'
								mt='4'>
								Update
							</Button>
						</form>
					)}
				</FormContainer>
			</Flex>
		</>
	);
};

export default UserEditScreen;
