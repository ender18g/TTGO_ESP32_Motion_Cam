import React from 'react';
import { Box, Heading, Text, Flex } from '@chakra-ui/react';
import Hopper from './images/Hopper2.png';

export default function Welcome() {
	return (
		<Flex w="100vw" h="100vh" className="welcome-box" justifyContent="center" alignItems="center">
			<Box borderRadius="md" p="5" background="rgba(17,32,51,.5)">
				<Heading letterSpacing={3} textAlign="center" size="3xl" color="gray.100" fontWeight="200">
					Please Login
				</Heading>

				<Heading mt="4" textAlign="center" size="lg" color="gray.100" fontWeight="200">
					USNA Credentials Required
				</Heading>
			</Box>
		</Flex>
	);
}
