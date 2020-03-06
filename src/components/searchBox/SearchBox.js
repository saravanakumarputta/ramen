import React from 'react';
import './SearchBox.css';

export default class SearchBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchText: '',
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleClear = this.handleClear.bind(this);
	}

	handleChange(value) {
		this.setState({ searchText: value });
		this.props.handleChange(value);
	}

	handleClear() {
		this.setState({ searchText: '' });
		this.props.handleChange('');
	}

	render() {
		return (
			<div className="w100">
				<div className="dflex searchContainer alignVertical">
					<span className="icon-search icon-color ml20"></span>
					<input
						type="text"
						placeholder="Search for restaurants by country, name, year and style"
						className="searchInput flexgrow"
						onChange={e => this.handleChange(e.target.value)}
						onFocus={this.props.handleFocus}
						value=""
						value={this.state.searchText}
					/>
					<span className="icon-cancel-circle mr20 icon-color closeIcon" onClick={this.handleClear}></span>
				</div>
			</div>
		);
	}
}
