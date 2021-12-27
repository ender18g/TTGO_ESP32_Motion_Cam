import React from 'react';
import { theme, Box, Flex, Text, Heading, Image } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import camera from './camera.svg';

function Navbar() {
	return (
		<Flex background="blue.700" boxShadow="lg" justifyContent="space-between" alignContent="center" p="1">
			<Flex alignItems="center">
				<Image ml="3" maxH="50px" stroke="5px dashed red" src={camera} />
				<Heading
					whiteSpace="nowrap"
					textColor="gray.200"
					textShadow="md"
					mx="4"
					fontWeight="300"
					letterSpacing="4px"
					fontSize="3xl"
				>
					FIDOH Cam
				</Heading>
			</Flex>
			<ColorModeSwitcher />
		</Flex>
	);
}

export default Navbar;
