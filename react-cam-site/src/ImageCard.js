import React from 'react';
import { Link, Box, Image, Text, Flex } from '@chakra-ui/react';
import 'firebase/storage';
import { ref } from 'firebase/storage';
import { useStorage, useStorageDownloadURL } from 'reactfire';
import { DeleteIcon } from '@chakra-ui/icons';
import { useState } from 'react';

export default function ImageCard(props) {
	const { filename, timestamp } = props.data;
	const maxSize = props.maxSize;
	const removeItem = props.removeItem;
	const storage = useStorage();
	const camRef = ref(storage, `stash/${filename}.jpg`);
	const [ showDel, setShowDel ] = useState(false);

	const { status, data: imageURL } = useStorageDownloadURL(camRef);
	if (status === 'loading') {
		return <Box w="300px" h="300px" />;
	}
	return (
		<Box
			className="card"
			borderWidth="1px"
			borderColor="purple.300"
			borderRadius="lg"
			overflow="hidden"
			m="1"
			boxShadow="md"
		>
			<Link href={imageURL} isExternal>
				<Image loading="lazy" maxH={`${maxSize}px`} src={imageURL} />
			</Link>
			<Flex p="2" alignItems="center" justifyContent="center">
				<Text onClick={() => setShowDel(!showDel)} fontWeight="200" fontSize="md">
					{timestamp.slice(11, -7)}
				</Text>
				<DeleteIcon ml="3" display={!showDel && 'none'} w="3" h="3" color="red.600" onClick={removeItem} />
			</Flex>
		</Box>
	);
}
