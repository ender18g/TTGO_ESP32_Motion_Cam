import { Box, Text, Button, Spinner } from '@chakra-ui/react';
import React from 'react';
import { useAuth, useSigninCheck } from 'reactfire';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const signOut = (auth) => auth.signOut().then(() => console.log('signed out'));
const signIn = async (auth) => {
	const provider = new GoogleAuthProvider();
	await signInWithPopup(auth, provider);
};

export const Auth = () => {
	const { status, data: signinResult } = useSigninCheck();
	if (status === 'loading') {
		return <Spinner />;
	}

	const { signedIn, user } = signinResult;
	console.log(user);

	if (signedIn) {
		return <SignOutForm />;
	} else {
		return <SignInForm />;
	}
};

const SignInForm = () => {
	const auth = useAuth();

	return (
		<Box>
			<Button colorScheme="whiteAlpha" onClick={() => signIn(auth)}>
				Sign In
			</Button>
		</Box>
	);
};

const SignOutForm = () => {
	const auth = useAuth();

	return (
		<Box>
			<Button colorScheme="whiteAlpha" onClick={() => signOut(auth)}>
				Sign Out
			</Button>
		</Box>
	);
};
