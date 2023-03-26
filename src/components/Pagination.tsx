import styled from 'styled-components';
import chevron from '../svgs/chevron.svg'

export interface TablePaginationProps {
	currentPage: number;
	onChange: any;
	onClick: any;
	pageSizes: Array<number>
	totalPages: number;
}

const Pagination = styled.div`
	padding: 1rem;
	height: 5rem;
	width: 100vw;
	display: flex;
	align-items: center;
	justify-content: center;
	background: #EA6A57;

	.pagination-inner {
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.pagination-buttons {
			display: flex;
			gap: 0.5rem;
		}

		.pagination-select {
			position: relative;

			> span {
				color: #202020;
				font-weight: 600;
				margin-inline-end: 0.5rem;
				user-select: none;
				display: none;

				@media only screen and (min-width: 400px) {
					display: inline;
				}
			}

			img {
				position: absolute;
				width: 1rem;
				height: 1rem;
				right: 1rem;
				top: 0.5rem;
				pointer-events: none;
				transform: rotate(90deg);
			}
		}
	}
`

const Button = styled.button`
	height: 2rem;
	width: 2rem;
	border: none;
	cursor: pointer;
	background: #202020;
	display: flex;
	align-items: center;
	justify-content: center;

	img {
		height: 1rem;
		width: 1rem;
		user-select: none;
	}

	&.previous-button {
		img {
			transform: rotate(180deg);
			margin-inline-start: -1px;
		}
	}

	&.next-button {
		img {
			margin-inline-end: -1px;
		}
	}

	&:disabled {
		cursor: default;
		opacity: 0.5;
		pointer-events: none;
	}

	&:hover {
		background: #101010;
	}

	&:focus {
		outline: 2px solid #FF7E6B;
		box-shadow: 0 0 0.25rem #202020;
	}
`

const PaginationIndicator = styled.div`
	height: 2rem;
	width: auto;
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: 600;
	user-select: none;
	color: #202020;

	span {
		margin-inline-start: 0.25rem;
		color: #FFF;
	}
`

const Select = styled.select`
	height: 2rem;
	width: 5rem;
	cursor: pointer;
	background: #202020;
	padding: 0 0.75rem;
	font-weight: 600;
	color: #FFF;
	border: none;
	outline: none;
	appearance: none;
	transition: transform 0.2s;

	&:hover {
		background: #101010;
	}

	&:focus {
		outline: 2px solid #FF7E6B;
		box-shadow: 0 0 0.25rem #202020;
	}
`

const TablePagination = ({
	currentPage,
	onChange,
	onClick,
	pageSizes,
	totalPages
}: TablePaginationProps) => {
	const handleSelectChange = (e: any) => {
		onChange(e.target.value)
	}

	return (
		<Pagination>
			<div className='pagination-inner'>
				<div className='pagination-buttons'>
					<Button
						className='previous-button'
						disabled={currentPage === 1}
						onClick={() => onClick(-1)}
					>
						<img src={chevron} alt="chevron" />
					</Button>
					<Button
						className='next-button'
						disabled={currentPage === totalPages}
						onClick={() => onClick(1)}
					>
						<img src={chevron} alt="chevron" />
					</Button>
				</div>
				<PaginationIndicator>
					Page <span> {currentPage} of {totalPages}</span>
				</PaginationIndicator>
				<div className='pagination-select'>
					<span>Showing</span>
					<Select onChange={(e) => handleSelectChange(e)}>
						{pageSizes.map((value, i) => {
							return (
								<option
									key={i}
									value={value}
								>
									{value}
								</option>
							)
						})}
					</Select>
					<img src={chevron} alt="chevron" />
				</div>

			</div>
		</Pagination>
	)
}

export default TablePagination;