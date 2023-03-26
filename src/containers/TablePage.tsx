import DataTable from "../components/DataTable";
import Pagination from "../components/Pagination";
import Filter from '../components/Filter';
import styled from 'styled-components';

export interface TablePageProps {
	categories: Array<any>;
	currentPage: number;
	handleCategoryFilter: any;
	handlePageChange: any;
	handlePageSizeChange: any;
	totalPages: number;
	visibleData: Array<any>;
}

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
				margin-inline-end: 0.5rem;

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

const TablePage = ({
	categories,
	currentPage,
	handleCategoryFilter,
	handlePageChange,
	handlePageSizeChange,
	totalPages,
	visibleData
}: TablePageProps) => {
	return (
		<>
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
		</>
	)
}

export default TablePage;