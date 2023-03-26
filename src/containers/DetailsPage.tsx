import styled from 'styled-components';

export interface DetailsPageProps {
	author: string;
	title: string;
}

const PageContainer = styled.section`
	padding: 2rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 1rem;

	h1 {
		font-size: 3rem;
		text-align: center;
		color: #202020;
	}

	h2 {
		font-size: 1.5rem;
		text-align: center;
		color: #FFF;
	}
`

const BackLink = styled.a`
	display: inline-block;
	padding: 0.5rem;
	background: #202020;
	color: #FFF;
	text-transform: uppercase;
	text-decoration: none;
	font-size: 0.75rem;
	letter-spacing: 1px;
`

const DetailsPage = ({
	author,
	title
}: DetailsPageProps) => {
	return (
		<PageContainer>
			<h1>{author}</h1>
			<h2>{title}</h2>
			<BackLink href="/">
				Go back
			</BackLink>
		</PageContainer>
	)
}

export default DetailsPage;
