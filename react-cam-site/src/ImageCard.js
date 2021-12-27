import React from 'react';
import { Link, Box, Image, Text, Spinner } from '@chakra-ui/react';
import 'firebase/storage';
import { ref } from 'firebase/storage';
import { useStorage, useStorageDownloadURL } from 'reactfire';

export default function ImageCard(props) {
	const { filename, timestamp } = props.data;
	const storage = useStorage();
	const camRef = ref(storage, `stash/${filename}.jpg`);

	const { status, data: imageURL } = useStorageDownloadURL(camRef);
	if (status === 'loading') {
		return <Spinner />;
	}
	return (
		<Box borderWidth="2px" borderColor="grey.100" borderRadius="lg" overflow="hidden" m="2" boxShadow="lg">
			<Link href={imageURL} isExternal>
				<Image loading="lazy" maxH="300px" src={imageURL} />
			</Link>
			<Text p="2">{timestamp}</Text>
		</Box>
	);
}
