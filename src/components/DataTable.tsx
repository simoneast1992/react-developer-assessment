import styled from 'styled-components';

export interface DataTableProps {
	data?: any;
}

const Table = styled.div`
	background: #F4F4F4;
	border-radius: 1rem;
	box-shadow: 0 0 1rem rgba(0,0,0,0.2);
	padding: 1rem;
	height: calc(100vh - 4rem);
	overflow-y: auto;
`

const DataTable = ({
	data
}: DataTableProps) => {
	return (
		<>
			<h1>Table</h1>
			<Table className="table">
				<div className="table-item">
					{data.map((item: any, i: number) => {
						return (
							<div key={i}>
								<img src={item.author.avatar} alt='' />
								<h2>{item.author.name}</h2>
								<h3>{item.title}</h3>
								<p>{item.summary}</p>
								<p>{item.publishDate}</p>
								<ul>
									{item.categories.map((category: any, i: number) => (
										<li key={i}>{category.name}</li>
									))}
								</ul>
							</div>
						)
					})}
				</div>
			</Table>
		</>
	);
};

export default DataTable;