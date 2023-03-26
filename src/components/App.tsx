import { useEffect, useState } from "react";
import DataTable from "./DataTable";
import Pagination from "./Pagination";
import Filter from './Filter';
import styled from 'styled-components';

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

const Header = styled.nav`
	width: 100%;
	margin: 0 auto;
	height: 10rem;
	min-height: 10rem;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 3rem 2rem 0;
	background: #FFF;

	h1 {
		width: 100%;
		max-width: 1024px;
		color: #202020;
		font-size: 1.5rem;
		font-weight: 600;
		line-height: 1.5;

		@media only screen and (min-width: 512px) {
			font-size: 2rem;
		}

		span {
			color: #767676;
			white-space: nowrap;
		}
	}

	+ .filter {
		width: 100%;
		min-height: 2rem;
		background: #FFF;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-end;
		padding: 0 2rem;
		border-bottom: 0.25rem solid #FF7E6B;

		.filter-inner {
			width: 100%;
			max-width: 1024px;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			position: relative;

			> div:first-child {
				color: #202020;
				font-size: 0.75rem;
				font-weight: 600;
				display: none;

				@media only screen and (min-width: 375px) {
					display: block;
				}

				span {
					color: #767676;
				}
			}
		}
	}
`

const App: React.FC = () => {
	const [data, setData] = useState<any[]>([]); // Entire api data
	const [visibleData, setVisibleData] = useState<any[]>([])  // Visible data passed to the data table component
	const [currentPage, setCurrentPage] = useState(1);; // Current page for pagination
	const [totalPages, setTotalPages] = useState(0); // Total pages for pagination
	const [pageSize, setPageSize] = useState(6); // Page size for pagination
	const [categories, setCategories] = useState<any[]>([]) // An array of all unique categories
	const [filteredData, setFilteredData] = useState<any[]>([]) // api data filtered by selected category

	useEffect(() => { // Fetch api data on App component load
		fetch('https://localhost:3000/api/posts')
		.then((response: { json: () => any }) => response.json())
		.then((data: any) => setData(data.posts));
	}, []);

	useEffect(() => {
		let totalItems = 0;

		if (filteredData.length > 1) {
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

	const handleCategoryFilter = (filteredCategory: string) => {
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
		setCurrentPage(1);
	}

	return (
		<Main>
			<Header>
				<h1>
					NetConstruct <span>- Data Table</span>
				</h1>
			</Header>
			<Filter
				categories={categories}
				onClick={(i: string) => handleCategoryFilter(i)}
			/>
			<DataTable
				data={visibleData}
			/>
			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				pageSizes={[6, 12, 24, 48]}
				onClick={(i: number) => handlePageChange(i)}
				onChange={(i: string) => handlePageSizeChange(i)}
			/>
		</Main>
	);
};

export default App;
