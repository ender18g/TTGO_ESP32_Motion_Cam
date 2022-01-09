import React from 'react';
import {
	Box,
	Flex,
	Heading,
	useSlider,
	Spinner,
	Tabs,
	TabList,
	TabPanels,
	TabPanel,
	Tab,
	Slider,
	SliderTrack,
	SliderFilledTrack,
	SliderThumb,
	SliderMark,
	Text
} from '@chakra-ui/react';
import ImageCard from './ImageCard';
import 'firebase/database';
import { ref, query, child, remove } from 'firebase/database';
import { useDatabaseListData, useDatabase, useSigninCheck } from 'reactfire';
import { useState, useEffect } from 'react';

export default function Gallery() {
	const database = useDatabase();
	const imagesRef = ref(database, 'images');
	const imagesQuery = query(imagesRef);
	const { status, data: imageList } = useDatabaseListData(imagesQuery);
	const [ dates, setDates ] = useState([]);
	const [ sliderVal, setSliderVal ] = useState(250);

	useEffect(
		() => {
			if (status === 'loading') return 0;
			let dateArray = [];
			imageList.map((imObj) => {
				dateArray.push(imObj.filename.slice(0, 10));
			});
			setDates([ ...new Set(dateArray) ].reverse().slice(0, 7));
		},
		[ imageList ]
	);

	const removeItem = (id) => {
		remove(child(imagesRef, id));
	};

	if (status === 'loading') {
		return (
			<Flex h="80vh" justifyContent="center" alignItems="center" m="5">
				<Spinner />
			</Flex>
		);
	}
	//Get all of the days in an array

	return (
		<Box textAlign="center">
			<Tabs isLazy mt="3" mx="3" size="sm" variant="soft-rounded" colorScheme="purple">
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
								{/* This is all of our slider for changing the size */}
								<Flex justifyContent="center" mb="4">
									<Slider
										maxW="400px"
										colorScheme="blue"
										min={80}
										max={800}
										value={sliderVal}
										onChange={(val) => setSliderVal(val)}
									>
										<SliderTrack>
											<SliderFilledTrack />
										</SliderTrack>
										<SliderThumb boxSize={4} bg="blue.500" />
									</Slider>
								</Flex>
								<Flex justifyContent="space-around" flexWrap="wrap">
									{revImageList
										.filter((imObj) => imObj.filename.slice(0, 10) === panelDate)
										.map((imObj, j) => (
											<ImageCard
												maxSize={sliderVal}
												data={imObj}
												key={imObj.NO_ID_FIELD}
												removeItem={() => removeItem(imObj.NO_ID_FIELD)}
											/>
										))}
								</Flex>
							</TabPanel>
						);
					})}
				</TabPanels>
			</Tabs>
		</Box>
	);
}
