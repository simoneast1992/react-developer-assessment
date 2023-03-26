import { useState } from 'react';
import styled from 'styled-components';
import chevron from '../svgs/chevron.svg'

export interface FilterProps {
	categories: Array<string>
	onClick: any;
}

const FilterButton = styled.button`
	height: 2rem;
	width: auto;
	border: none;
	cursor: pointer;
	background: #FF7E6B;
	color: #202020;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
	font-weight: 600;
	padding: 0 1rem;

	&.dropdown-visible {
		background: #202020;
		color: #FFF;

		&:hover {
			filter: brightness(1.5);
		}

		img {
			filter: unset;
		}
	}

	&:hover {
		filter: brightness(0.9);
	}

	&:focus {
		box-shadow: 0 0 0.25rem #202020;
	}

	img {
		width: 1rem;
		height: 1rem;
		filter: invert();

		&.up {
			transform: rotate(-90deg);
		}

		&.down {
			transform: rotate(90deg);
		}
	}
`

const FilterDropdown = styled.aside`
	width: auto;
	max-width: 288px;
	height: auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	transition: opacity 0.2s;
	background: #202020;
	position: absolute;
	padding: 1rem;
    gap: 0.25rem;
	top: 2rem;
	z-index: 1;

	&.visible {
		opacity: 1;
		pointer-events: all;
	}

	&.hidden {
		opacity: 0;
		pointer-events: none;
	}

	button {
		width: 100%;
		background: #202020;
		color: #FFF;

		&.active {
			background: #FF7E6B;
			color: #202020;

			&:hover {
				filter: brightness(0.9);
			}
		}
	}
`

const Filter = ({
	categories,
	onClick
}: FilterProps) => {
	const [dropdownVisible, setDropdownVisible] = useState(false);
	const [activeFilter, setActiveFilter] = useState('')

	const handleFilterButton = (category: string) => { // Handles both active styling and provides the filteredCategory to be used in handleCategoryFilter inside App.tsx
		if (activeFilter === category) {
			setActiveFilter('');
			onClick('');

		} else {
			setActiveFilter(category);
			onClick(category);
		}
	}

	return (
		<div className='filter'>
			<div className='filter-inner'>
				{/* Shows currently filtered category so that you can see it without clicking into the filter dropdown */}
				<div>{activeFilter.length > 0 && <><span>Active Filter</span> - {activeFilter}</>}</div>
				<FilterButton
					onClick={() => setDropdownVisible(!dropdownVisible)}
					className={dropdownVisible ? 'dropdown-visible' : ''}
				>
					Filter
					<img
						src={chevron}
						alt={dropdownVisible ? 'arrow up' : 'arrow down'}
						className={dropdownVisible ? 'up' : 'down'}
					/>
				</FilterButton>
				<FilterDropdown className={dropdownVisible ? 'visible' : 'hidden'}>
					{categories.map((category, i) => {
						return (
							<FilterButton
								key={i}
								onClick={() => handleFilterButton(category)}
								className={dropdownVisible && activeFilter === category ? 'active' :
									dropdownVisible ? 'dropdown-visible' : ''}
							>
								{category}
							</FilterButton>
						)
					})}
				</FilterDropdown>
			</div>

		</div>
	)
}

export default Filter;