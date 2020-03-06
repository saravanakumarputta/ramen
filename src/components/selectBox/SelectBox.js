import React from 'react';
import './SelectBox.css';

export default class SelectBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedValue: this.props.items[0],
			isOpenClicked: false,
		};
		this.handleSelectBoxOpen = this.handleSelectBoxOpen.bind(this);
	}
	handleSelectBoxOpen() {
		this.setState({ isOpenClicked: !this.state.isOpenClicked });
	}
	handeleSelect(value) {
		this.setState({ selectedValue: value, isOpenClicked: !this.state.isOpenClicked });
		this.props.handleChange(value);
	}

	render() {
		let { isOpenClicked, selectedValue } = this.state;
		return (
			<div className="dflex flexcolumn selectContainer">
				<div className="selectBox dflex alignVertical plr20" onClick={this.handleSelectBoxOpen}>
					{selectedValue}
				</div>
				<div className={`selectOptions ${isOpenClicked ? 'show' : 'hide'}`}>
					<div className="dflex flexcolumn">
						{this.props.items.map((item, index) => {
							return (
								<span
									key={index}
									className={` dflex alignVertical selectBoxOption plr20 ${
										selectedValue === item ? 'selectedOption' : ''
									}`}
									onClick={e => this.handeleSelect(item)}>
									{item}
								</span>
							);
						})}
					</div>
				</div>
			</div>
		);
	}
}
