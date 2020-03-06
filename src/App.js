import React from 'react';
import ReactDom from 'react-dom';
import './App.css';

import data from './data';

import SearchBox from './components/searchBox/SearchBox';
import SelectBox from './components/selectBox/SelectBox';
import Card from './components/card/Card';

function normalizeDataForStore(data) {
	let countries = [],
		years = [];
	let restaurants = data.map(data => {
		let topTenData = data['Top Ten'];
		if (topTenData != 'NaN') {
			let rankingInfo = topTenData.split(' ');
			data.Year = rankingInfo[0];
			data.Rank = rankingInfo[1].substring(1, rankingInfo[1].length);
			if (years.indexOf(data.Year) == -1) {
				years.push(data.Year);
			}
		}
		if (countries.indexOf(data.Country) == -1) {
			countries.push(data.Country);
		}
		return data;
	});
	return {
		countries,
		years,
		restaurants,
	};
}

function debounce(func, delay) {
	let inDebounce;
	return function() {
		const context = this;
		const args = arguments;
		clearTimeout(inDebounce);
		inDebounce = setTimeout(() => func.apply(context, args), delay);
	};
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			restaurants: [],
			searchStr: '',
			selectedCountry: '',
			selectedYear: '',
			countries: [],
			years: [],
		};
		this.handleSearch = debounce(this.handleSearch.bind(this), 200);
		this.handleCountryChange = this.handleCountryChange.bind(this);
		this.handleYearChange = this.handleYearChange.bind(this);
		this.handleSearchFocus = this.handleSearchFocus.bind(this);
	}

	componentDidMount() {
		let normalizedRestaurantsInfo = normalizeDataForStore(data);
		this.setState({
			...normalizedRestaurantsInfo,
		});
	}

	handleSearch(value) {
		this.setState({ searchStr: value.toLowerCase() });
	}

	handleYearChange(value) {
		this.setState({ selectedYear: value == 'Year' ? '' : value });
	}

	handleCountryChange(value) {
		this.setState({ selectedCountry: value == 'Country' ? '' : value });
	}

	handleSearchFocus() {
		let { selectedCountry, selectedYear } = this.state;
		if (selectedCountry || selectedYear) {
			this.setState({ selectedCountry: '', selectedYear: '' });
		}
	}

	getResult(restaurantObj) {
		let { restaurants, selectedCountry, selectedYear, searchStr } = restaurantObj;
		return restaurants.reduce((result, restaurant) => {
			if (selectedCountry === restaurant.Country && selectedYear === restaurant.Year) {
				result.push(restaurant);
			} else if (selectedCountry) {
				if (selectedCountry === restaurant.Country) {
					result.push(restaurant);
				}
			} else if (selectedYear) {
				if (selectedYear === restaurant.Year) {
					result.push(restaurant);
				}
			} else {
				if (searchStr) {
					if (
						restaurant.Brand.toLowerCase().indexOf(searchStr) !== -1 ||
						restaurant.Variety.toLowerCase().indexOf(searchStr) !== -1 ||
						restaurant.Style.toLowerCase().indexOf(searchStr) !== -1 ||
						restaurant.Country.toLowerCase().indexOf(searchStr) !== -1
					) {
						result.push(restaurant);
					}
				} else {
					result.push(restaurant);
				}
			}
			return result;
		}, []);
	}
	render() {
		let { restaurants, years, countries, selectedCountry, selectedYear, searchStr } = this.state;
		let result = this.getResult({
			restaurants,
			selectedCountry,
			selectedYear,
			searchStr,
		});

		result.sort((a, b) => {
			return parseInt(a.Rank) > parseInt(b.Rank) ? 1 : -1;
		});

		return (
			<div className="container dflex flexcolumn">
				<SearchBox handleChange={this.handleSearch} handleFocus={this.handleSearchFocus} />
				<div className="mtb10">
					<div className="dflex alignVertical">
						<div className="filterText">Filter By:</div>
						<div className="flexgrow mlr5">
							<SelectBox items={['Year', ...years]} handleChange={this.handleYearChange} />
						</div>
						<div className="flexgrow mlr5">
							<SelectBox items={['Country', ...countries]} handleChange={this.handleCountryChange} />
						</div>
					</div>
				</div>
				<div className="flexgrow overflow-y-auto">
					<div className="dflex flexwrap mt30">
						{result.map((restaurant, index) => {
							return <Card key={index} restaurant={restaurant} />;
						})}
					</div>
				</div>
			</div>
		);
	}
}

ReactDom.render(<App />, document.getElementById('root'));
