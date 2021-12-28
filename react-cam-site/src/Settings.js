import React from 'react';
import {
	Box,
	Flex,
	Heading,
	Spinner,
	Text,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	InputGroup,
	Button
} from '@chakra-ui/react';
import ImageCard from './ImageCard';
import 'firebase/database';
import { ref, query, child, remove, set } from 'firebase/database';
import { useDatabaseListData, useDatabase, useDatabaseObject, useDatabaseObjectData } from 'reactfire';
import { useState, useEffect } from 'react';

export default function Gallery() {
	const database = useDatabase();
	const settingsRef = ref(database, 'settings/');
	const settingsQuery = query(settingsRef);
	const { status, data } = useDatabaseObjectData(settingsQuery);
	const [ settings, setSettings ] = useState({});

	useEffect(
		() => {
			if (!(status === 'loading')) setSettings(data);
		},
		[ data ]
	);

	const saveSettings = () => {
		set(settingsRef, settings);
		console.log('saved');
	};

	if (status === 'loading') {
		return (
			<Flex h="80vh" justifyContent="center" alignItems="center" m="5">
				<Spinner />
			</Flex>
		);
	}

	return (
		<Box m="5" p="5" borderRadius="md" bg="gray.200" textAlign="center">
			<Heading size="lg" fontWeight="100">
				Settings
			</Heading>
			<Flex m="5" justifyContent="space-around">
				<Box>
					<Text>Image Quality</Text>
					<NumberInput
						onChange={(v) => setSettings({ ...settings, quality: v })}
						name="quality"
						w="100px"
						value={settings.quality}
						min={10}
						max={63}
					>
						<NumberInputField />
						<NumberInputStepper>
							<NumberIncrementStepper />
							<NumberDecrementStepper />
						</NumberInputStepper>
					</NumberInput>
				</Box>

				<Box>
					<Button
						variant="outline"
						colorScheme="red"
						onClick={() => setSettings({ ...settings, armed: !settings.armed })}
					>
						{settings.armed === true ? 'Armed' : 'Disarmed'}
					</Button>
				</Box>

				<Box>
					<Text>Delay</Text>
					<NumberInput
						w="100px"
						name="delay"
						onChange={(v) => setSettings({ ...settings, delay: v })}
						value={settings.delay}
						min={0}
						max={500}
					>
						<NumberInputField />
						<NumberInputStepper>
							<NumberIncrementStepper />
							<NumberDecrementStepper />
						</NumberInputStepper>
					</NumberInput>
				</Box>
			</Flex>
			<Button onClick={saveSettings} m="5" colorScheme="green">
				Save Settings
			</Button>
		</Box>
	);
}
