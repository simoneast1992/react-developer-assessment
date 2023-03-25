import { useEffect, useState, useMemo } from "react";
import Table from "./Table";

const App: React.FC = () => {
	const [data, setData] = useState([])

	useEffect(() => {
		fetch('https://localhost:3000/api/posts')
		.then((response: { json: () => any }) => response.json())
		.then((data: any) => setData(data.posts))


	}, []);

	const columns = useMemo(() => [
		{
			Header: 'Author',
			columns: [
				{
					Header: 'Avatar',
					accessor: 'author.avatar'
				},
				{
					Header: 'Image',
					accessor: 'author.name'
				}
			]
		},
		{
			Header: 'Title',
			accessor: 'title'
		},
		{
			Header: 'Summary',
			accessor: 'summary'
		},
		{
			Header: 'Categories',
			accessor: 'categories[0].name',
		},
		{
			Header: 'Publish Date',
			accessor: 'publishDate'
		}
	], [])

	return (
		<div>
			<Table
				columns={columns}
				data={data}
			/>
		</div>
	);
};

export default App;
