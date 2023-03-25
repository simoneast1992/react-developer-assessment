import { useEffect, useState } from "react";
import DataTable from "./DataTable";
import Pagination from "./Pagination";
import styled from 'styled-components';

const Main = styled.main`
  background: #EEE;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`

const App: React.FC = () => {
	const [data, setData] = useState([]); // Entire api data
	const [visibleData, setVisibleData] = useState([])  // Visible data passed to the data table component
	const [currentPage, setCurrentPage] = useState(1);; // Current page for pagination
	const [totalPages, setTotalPages] = useState(0); // Total pages for pagination
	const [pageSize, setPageSize] = useState(5); // Page size for pagination

	useEffect(() => { // Fetch api data on App component load
		fetch('https://localhost:3000/api/posts')
		.then((response: { json: () => any }) => response.json())
		.then((data: any) => setData(data.posts));
	}, []);

	useEffect(() => {
		const totalItems = data.length; // Number of items in the api array
		setTotalPages(Math.floor(totalItems / pageSize)) // Math.floor needed incase the calculation returns a decimal. Total pages needs to be an integer

		const startIndex = (pageSize * (currentPage - 1));
		const endIndex = (startIndex + pageSize);

		setVisibleData(data.slice(startIndex, endIndex)); // Slice the data array based on pageSize and currentPage
	}, [data, pageSize, currentPage])

	const handlePageChange = (i: number) => {
		setCurrentPage(currentPage + i)
	}

	const handlePageSizeChange = (i: string) => {
		setPageSize(parseInt(i)) // parseInt is required because the select field in Pagination returns a string and we need a number for the above calculations
	}

	return (
		<Main>
			<DataTable
				data={visibleData}
			/>
			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				pageSizes={[5, 10, 20, 40]}
				onClick={(i: number) => handlePageChange(i)}
				onChange={(i: string) => handlePageSizeChange(i)}
			/>
		</Main>
	);
};

export default App;
