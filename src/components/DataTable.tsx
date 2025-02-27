import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

export interface DataTableProps {
	data?: any;
}

const loadingSpinner = keyframes`
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
`

const pulseBackground = keyframes`
	0% {
		background: rgba(255, 255, 255, 0.4);
	}

	50% {
		background: rgba(255, 255, 255, 0.2);
	}

	100% {
		background: rgba(255, 255, 255, 0.4);
	}
`

const Table = styled.div`
	height: calc(100vh - 5rem);
	overflow-y: auto;
	width: 100%;
	padding: 2rem 1rem;
	transition: padding 0.2s;

	@media only screen and (min-width: 512px) {
		padding: 4rem 2rem;
	}

	.table-inner {
		width: 100%;
		max-width: 1024px;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(256px, 1fr));
		row-gap: 4rem;
		column-gap: 2rem;
		margin: 0 auto;
	}
`

const LoadingTableItem = styled.div`
	display: block;
	padding: 0.5rem;
	height: 700px;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	animation: ${pulseBackground} 1.2s linear infinite;
`

const Loading = styled.div`
	width: 4rem;
	height: 4rem;
	border-radius: 50%;

	&::after {
		content: "";
		display: block;
		width: 4rem;
		height: 4rem;
		border-radius: 50%;
		border: 6px solid #FFF;
		border-color: #FFF transparent #FFF transparent;
		animation: ${loadingSpinner} 1.2s linear infinite;
	}
`

const TableItem = styled.div`
	background: #FFF;
	display: flex;
	flex-direction: column;
	border: 2px solid #F2F2F2;
	box-shadow: 0 0 2.5rem rgba(0, 0, 0, 0.1);
	position: relative;

	.table-item_section {
		padding: 2rem 2rem 0;

		h3 {
			font-size: 0.875rem;
			font-weight: 600;
			color: #FF7E6B;
			margin-block-end: 1rem;
			line-height: 1.5;
		}

		p {
			font-size: 0.875rem;
			color: #767676;
			line-height: 1.5;
		}
	}

	.table-item_header {
		overflow: hidden;

		img {
			width: 100px;
			height: 100px;
			border-radius: 50%;
			margin-block-end: 2rem;
			box-shadow: 0 0 1.25rem 2.5rem #F2F2F2;
		}

		h2 {
			font-size: 1.25rem;
			color: #202020;
			line-height: 1.5;
		}
	}

	.table-item_text {
		padding-block-end: 2rem;
	}

	.table-item_categories {
		flex-grow: 1;
		padding: 2rem;
		background: #F2F2F2;

		ul {
			font-size: 0.875rem;
			color: #545454;
			line-height: 1.5;
			padding: 0;
			list-style-position: inside;
		}
	}

	.table-item_date {
		padding: 2rem;

		p {
			font-size: 0.75rem;
			color: #202020;
			font-weight: 600;
		}
	}
`

const DetailsLink = styled.a`
	display: block;
	padding: 0.5rem;
	background: #202020;
	color: #FFF;
	text-transform: uppercase;
	text-decoration: none;
	font-size: 0.75rem;
	letter-spacing: 1px;
	position: absolute;
	top: 1rem;
	right: -0.125rem;
`

const DataTable = ({
	data
}: DataTableProps) => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);

		if (data.length > 0) { // Only stop loading once there is some data supplied
			setTimeout(() => {
				setLoading(false);
			}, 1000);
		}
	}, [data]); // If data changes, useEffect runs. E.g. going from no data iniitally or when a filter is applied

	return (
		<>
			<Table className="table">
				<div className="table-inner">
					{loading ?
						<>
							{Array.from(Array(6), (i) => {
								return ( // Whilst loading render dummy elements
									<LoadingTableItem key={i}>
										<Loading />
									</LoadingTableItem>
								)
							})}
						</>
					:
						<>
							{data.map((item: any, i: number) => {
								return (
									<TableItem key={i}>
										<DetailsLink
											href={`/${item.id}`}
										>
											Details
										</DetailsLink>
										<div className='table-item_section table-item_header'>
											<img src={item.author.avatar} alt='Author avatar' />
											<h2>{item.author.name}</h2>
										</div>
										<div className='table-item_section table-item_text'>
											<h3>{item.title}</h3>
											<p>{item.summary}</p>
										</div>
										<div className='table-item_section table-item_categories'>
											<h3>Categories</h3>
											<ul>
												{item.categories.map((category: any, i: number) => (
													<li key={i}>{category.name}</li>
												))}
											</ul>
											</div>
										<div className='table-item_section table-item_date'>
											<p>{item.publishDate}</p>
										</div>
									</TableItem>
								)
							})}
						</>
					}
				</div>
			</Table>
		</>
	);
};

export default DataTable;