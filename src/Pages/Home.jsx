import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import qs from 'qs'
import {useNavigate} from "react-router-dom";

import {useDispatch, useSelector} from "react-redux";
import {setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlice";

import Categories from "../components/Categories";
import Sort, {typesSort} from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/SkeletonBlock";
import Pagination from "../components/Pagination";
import {SearchContext} from "../App";


const Home = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const isSearch = React.useRef(false)
	const isMounted = React.useRef(false)
	const {categoryId, sort, currentPage} = useSelector((state) => state.filter)

	const {searchValue} = useContext(SearchContext)
	const [items, setItems] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const fetchPizza = () => {
		setIsLoading(true)

		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
		const sortBy = sort.sortProperty.replace('-', '');
		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const search = searchValue ? `&search=${searchValue}` : '';
		axios
			.get(`https://628a7dd25da6ddfd5d6407fd.mockapi.io/items?
			page=${currentPage}
			&limit=4
			&${category}
			&${search}
			&sortBy=${sortBy}
			&order=${order}`)
			.then((response) => {
				setItems(response.data)
				setIsLoading(false)
			})
			.catch((err) => {
				return 'sorry, error'
			})
	}

	React.useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1))
			const sort = typesSort.find(obj => obj.sortProperty === params.sortProperty)
			dispatch(setFilters({
				...params,
				sort,
			}))
		}
		isSearch.current = true
	}, [])

	React.useEffect(() => {
		window.scrollTo(0, 0)

		if (!isSearch.current) {
			fetchPizza()
		}
		isSearch.current = false
	}, [categoryId, sort.sortProperty, currentPage, searchValue])

	React.useEffect(() => {
		if (isMounted.current) {
			const querySting = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage,
			});

			navigate(`?${querySting}`)
		}
		isMounted.current = true

	}, [categoryId, sort.sortProperty, currentPage])

	const onChangeCategory = (id) => {
		dispatch(setCategoryId(id))
	}
	const onPageChange = (number) => {
		dispatch(setCurrentPage(number))
	}

	const pizzas = items.map(obj => <PizzaBlock {...obj} value={obj.id} key={obj.id}/>)
	const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>)

	return (
		<div className="container">
			<div className="content__top">
				<Categories value={categoryId} onChangeCategory={onChangeCategory}/>
				<Sort/>
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">{isLoading ? skeletons : pizzas}</div>
			<Pagination currentPage={currentPage} onChangePage={onPageChange}/>
		</div>
	);
};

export default Home;