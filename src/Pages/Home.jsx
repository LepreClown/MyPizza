import React, {useContext, useEffect, useState} from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/SkeletonBlock";
import Pagination from "../components/Pagination";
import {SearchContext} from "../App";


const Home = () => {
	const [items, setItems] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [categoryId, setCategoryId] = useState(0)
	const [sortType, setSortType] = useState({
		name: 'популярности',
		sortProperty: 'rating',
	})
	const [currentPage, setCurrentPage] = useState(1)

	const {searchValue} = useContext(SearchContext)

	useEffect(() => {
		setIsLoading(true)
		const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
		const sortBy = sortType.sortProperty.replace('-', '');
		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const search = searchValue ? `&search=${searchValue}` : '';
		fetch(
			`https://628a7dd25da6ddfd5d6407fd.mockapi.io/items?
			page=${currentPage}
			&limit=4
			&${category}
			&${search}
			&sortBy=${sortBy}
			&order=${order}`
		)
			.then((response) => {
				return response.json()
			}).then((arr) => {
			setItems(arr)
			setIsLoading(false)
		})
		window.scrollTo(0, 0)
	}, [categoryId, sortType, searchValue, currentPage])

	const pizzas = items.filter((obj) => {
		if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
			return true
		}
		return false
	}).map(obj => <PizzaBlock key={obj.id} {...obj}  />)

	const skeletons = [...new Array(6)].map((index) => <Skeleton key={index}/>)
	return (
		<div className="container">
			<div className="content__top">
				<Categories value={categoryId} onChangeCategory={(i) => setCategoryId(i)}/>
				<Sort value={sortType} onChangeSort={(i) => setSortType(i)}/>
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{isLoading ? skeletons : pizzas}
			</div>
			<div>
				<Pagination onChangePage={(number) => {
					setCurrentPage(number)
				}}/>
			</div>
		</div>
	);
};

export default Home;