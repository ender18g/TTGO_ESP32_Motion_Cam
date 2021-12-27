import React from 'react';
import { ChakraProvider, Box, Grid, theme, Flex, Text } from '@chakra-ui/react';
import Navbar from './Navbar';
import Gallery from './Gallery';
import { useFirebaseApp, StorageProvider, DatabaseProvider } from 'reactfire';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

function App() {
	const app = useFirebaseApp();
	const storage = getStorage(app);
	const database = getDatabase(app);

	return (
		<ChakraProvider theme={theme}>
			<StorageProvider sdk={storage}>
				<DatabaseProvider sdk={database}>
					<Box h="100vh">
						<Navbar />
						<Flex>
							<Box>
								<Gallery />
							</Box>
						</Flex>
					</Box>
				</DatabaseProvider>
			</StorageProvider>
		</ChakraProvider>
	);
}

export default App;
