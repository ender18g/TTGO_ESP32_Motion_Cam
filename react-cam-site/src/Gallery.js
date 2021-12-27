import React from 'react';
import { Box, Flex, Heading, Spinner, Tabs, TabList, TabPanels, TabPanel, Tab } from '@chakra-ui/react';
import ImageCard from './ImageCard';
import 'firebase/database';
import { ref, query } from 'firebase/database';
import { useDatabaseListData, useDatabase } from 'reactfire';
import { useState, useEffect } from 'react';

export default function Gallery() {
	const database = useDatabase();
	const imagesRef = ref(database, 'images');
	const imagesQuery = query(imagesRef);
	const { status, data: imageList } = useDatabaseListData(imagesQuery);
	const [ dates, setDates ] = useState([]);

	useEffect(
		() => {
			if (status === 'loading') return 0;
			let dateArray = [];
			imageList.map((imObj) => {
				dateArray.push(imObj.filename.slice(0, 10));
			});
			setDates([ ...new Set(dateArray) ].reverse().slice(0, 7));
			console.log(dateArray);
		},
		[ imageList ]
	);

	if (status === 'loading') {
		return (
			<Flex h="80vh" justifyContent="center" alignItems="center" m="5">
				<Spinner />
			</Flex>
		);
	}
	console.log(imageList);
	//Get all of the days in an array

	return (
		<Box textAlign="center">
			<Tabs isLazy m="3" variant="soft-rounded" colorScheme="teal">
				<TabList flexWrap="wrap">
					{/* map through each day and make a tab for it */}
					{dates.map((d, i) => {
						const day = new Date(Date.parse(d));
						const dateArr = day.toUTCString().split(' ');
						const dateStr = dateArr.splice(0, 3).join(' ');
						return <Tab key={i}>{dateStr}</Tab>;
					})}
				</TabList>

				<TabPanels>
					{/* now put all of the images into a tab panel (double map) */}
					{dates.map((panelDate, i) => {
						const revImageList = imageList.slice().reverse();
						return (
							<TabPanel key={i}>
								<Flex justifyContent="space-around" flexWrap="wrap">
									{revImageList
										.filter((imObj) => imObj.filename.slice(0, 10) === panelDate)
										.map((imObj, j) => <ImageCard data={imObj} key={imObj.NO_ID_FIELD} />)}
								</Flex>
							</TabPanel>
						);
					})}
				</TabPanels>
			</Tabs>
		</Box>
	);
}
