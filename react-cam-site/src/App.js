import React from 'react';
import { ChakraProvider, Box, Grid, theme, Flex, Text } from '@chakra-ui/react';
import Navbar from './Navbar';
import Gallery from './Gallery';
import { useFirebaseApp, StorageProvider, DatabaseProvider, AuthProvider } from 'reactfire';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import Settings from './Settings';
import { useState } from 'react';
import './app.css';
import { Content } from './Content';

function App() {
	const app = useFirebaseApp();
	const storage = getStorage(app);
	const database = getDatabase(app);
	const auth = getAuth(app);
	const [ showSettings, setShowSettings ] = useState(false);

	return (
		<ChakraProvider theme={theme}>
			<AuthProvider sdk={auth}>
				<StorageProvider sdk={storage}>
					<DatabaseProvider sdk={database}>
						<Box h="100vh">
							<Navbar toggleSettings={() => setShowSettings(!showSettings)} />
							<Box>
								{showSettings && <Settings />}
								<Content />
							</Box>
						</Box>
					</DatabaseProvider>
				</StorageProvider>
			</AuthProvider>
		</ChakraProvider>
	);
}

export default App;
