import { useSigninCheck } from 'reactfire';
import { Spinner } from '@chakra-ui/react';

import Welcome from './Welcome';
import Gallery from './Gallery';

export const Content = () => {
	const { status, data: signInCheckResult } = useSigninCheck();

	if (status === 'loading') {
		return <Spinner />;
	}

	const { signedIn, user } = signInCheckResult;

	if (signedIn === true && user.email.match(/.*@usna[.]edu$/)) {
		return <Gallery />;
	} else {
		return <Welcome />;
	}
};
