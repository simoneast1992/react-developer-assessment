import { useState } from 'react';
import styled from 'styled-components';

export interface TablePaginationProps {
	currentPage: number;
	onChange: any;
	onClick: any;
	pageSizes: Array<number>
	totalPages: number;
}

const Pagination = styled.div`
	padding: 1rem;
	height: 4rem;
	display: flex;
	align-items: center;
	justify-content: center;
`

const Button = styled.button`
	height: 2rem;
`

const Select = styled.select`
	height: 2rem;
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
			<Button
				disabled={currentPage === 1}
				onClick={() => onClick(-1)}
			>
				Previous page
			</Button>
			<div>Page {currentPage} of {totalPages}</div>
			<Button
				disabled={currentPage === totalPages}
				onClick={() => onClick(1)}
			>
				Next page
			</Button>
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
		</Pagination>
	)
}

export default TablePagination;