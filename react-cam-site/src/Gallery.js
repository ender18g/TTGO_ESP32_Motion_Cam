import React from 'react';
import { Box, Flex, Heading, Spinner } from '@chakra-ui/react';
import ImageCard from './ImageCard';
import 'firebase/database';
import { ref, query } from 'firebase/database';
import { useDatabaseListData, useDatabase } from 'reactfire';

export default function Gallery() {
	const database = useDatabase();
	const imagesRef = ref(database, 'images');
	const imagesQuery = query(imagesRef);
	const { status, data: imageList } = useDatabaseListData(imagesQuery);

	if (status === 'loading') {
		return <Spinner />;
	}

	console.log(imageList);
	return (
		<Box textAlign="center">
			<Flex justifyContent="space-around" flexWrap="wrap">
				{imageList.reverse().map((imObj, k) => <ImageCard data={imObj} key={k} />)}
			</Flex>
		</Box>
	);
}
