import React from 'react';
import { Box, Heading, Text, Flex } from '@chakra-ui/react';

export default function Welcome() {
	return (
		<Flex w="100vw" h="98vh" className="welcome-box" justifyContent="center" alignItems="center">
			<Box>
				<Heading letterSpacing={3} textAlign="center" size="3xl" color="white" fontWeight="200">
					Please Login
				</Heading>

				<Heading mt="4" textAlign="center" size="lg" color="white" fontWeight="200">
					USNA Credentials Required
				</Heading>
			</Box>
		</Flex>
	);
}
