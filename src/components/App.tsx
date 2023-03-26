import { useEffect, useState } from "react";
import styled from 'styled-components';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TablePage from "../containers/TablePage";
import DetailsPage from "../containers/DetailsPage";

const Main = styled.main`
	background: #FF7E6B;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
	width: 100vw;
	overflow: hidden;
`

const App: React.FC = () => {
	const [data, setData] = useState<any[]>([]); // Entire api data
	const [visibleData, setVisibleData] = useState<any[]>([])  // Visible data passed to the data table component
	const [currentPage, setCurrentPage] = useState(1);; // Current page for pagination
	const [totalPages, setTotalPages] = useState(0); // Total pages for pagination
	const [pageSize, setPageSize] = useState(6); // Page size for pagination
	const [categories, setCategories] = useState<any[]>([]) // An array of all unique categories
	const [filteredData, setFilteredData] = useState<any[]>([]) // api data filtered by selected category

	useEffect(() => { // Fetch api data on App component load and set data state to data.posts
		fetch('https://localhost:3000/api/posts')
		.then((response: { json: () => any }) => response.json())
		.then((data: any) => setData(data.posts));
	}, []);

	useEffect(() => { // Determines how many and which data objects are currently shown
		let totalItems = 0;

		if (filteredData.length > 0) {
			totalItems = filteredData.length; // Number of items in the filtered array
		} else {
			totalItems = data.length; // Number of items in the api array
		}

		setTotalPages(Math.ceil(totalItems / pageSize)) // Math.ceil needed incase the calculation returns a decimal. Total pages needs to be an integer 

		const startIndex = (pageSize * (currentPage - 1));
		const endIndex = (startIndex + pageSize);

		if (filteredData.length > 1) { // Slice the filteredData or main data array based on pageSize and currentPage
			setVisibleData(filteredData.slice(startIndex, endIndex));
		} else {
			setVisibleData(data.slice(startIndex, endIndex));
		}
	}, [data, pageSize, currentPage, filteredData])

	useEffect(() => { // Find all the unique categories and return an array of strings
		let tempCategories: string | any[] = [];

		for (let i = 0; i < data.length; i++) {
			let categoryLength = data[i].categories.length;

			for (let j = 0; j < categoryLength; j++) {
				if (!tempCategories.includes(data[i].categories[j].name)) {
					tempCategories.push(data[i].categories[j].name);
				}
			}
		}

		setCategories(tempCategories);
	}, [data])

	const handlePageChange = (i: number) => {
		setCurrentPage(currentPage + i)
	}

	const handlePageSizeChange = (i: string) => {
		setPageSize(parseInt(i)) // parseInt is required because the select field in Pagination returns a string and we need a number for the above calculations
	}

	const handleCategoryFilter = (filteredCategory: string) => { // Determines which data objects are shown based on the filteredCatergory that is selected
		let tempFilteredData: Array<any> = [];

		for (let i = 0; i < data.length; i++) {
			let categoryLength = data[i].categories.length;

			for (let j = 0; j < categoryLength; j++) {
				if (data[i].categories[j].name === filteredCategory) {
					if (!tempFilteredData.includes(data[i])) { // Some authors have duplicated categories. This prevents those from being added multiple times
						tempFilteredData.push(data[i]);
					}
				}
			}
		}

		setFilteredData(tempFilteredData);
		setCurrentPage(1); // We need to return the page to page 1 otherwise we stay on the current page even though the number of pages after this function may be less that the value of currentPage
	}

	return (
		<Main>
			<BrowserRouter>
				<Routes>
					<Route
						path='/'
						element={
							<TablePage
								categories={categories}
								currentPage={currentPage}
								totalPages={totalPages}
								visibleData={visibleData}
								handleCategoryFilter={(i: string) => handleCategoryFilter(i)}
								handlePageChange={(i: number) => handlePageChange(i)}
								handlePageSizeChange={(i: string) => handlePageSizeChange(i)}
							/>
						}
					/>
					{data?.map((item, i) => {
						return (
							<Route
								key={i}
								path={`/${item.id}`}
								element={
									<DetailsPage
										author={item.author.name}
										title={item.title}
									/>
								}
							/>
						)
					})}
				</Routes>
			</BrowserRouter>
		</Main>
	);
};

export default App;
