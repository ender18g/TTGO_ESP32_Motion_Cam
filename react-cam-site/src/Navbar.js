import React from 'react';
import { theme, Box, Flex, Text, Heading, Image } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import camera from './camera.svg';
import { Auth } from './Auth';

function Navbar(props) {
	const toggleSettings = props.toggleSettings;
	return (
		<Flex
			bgGradient="linear(to-r, purple.700, purple.800 )"
			boxShadow="lg"
			justifyContent="space-between"
			alignContent="center"
			p="1"
		>
			<Flex alignItems="center">
				<Image ml="3" maxH="30px" stroke="5px dashed red" src={camera} />
				<Heading
					onClick={toggleSettings}
					whiteSpace="nowrap"
					textColor="gray.200"
					mx="4"
					fontWeight="300"
					letterSpacing="3px"
					fontSize="xl"
				>
					Hopper Cam
				</Heading>
			</Flex>
			<Flex>
				<Auth />

				<ColorModeSwitcher />
			</Flex>
		</Flex>
	);
}

export default Navbar;
