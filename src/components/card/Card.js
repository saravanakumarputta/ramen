import React from 'react';
import './Card.css';

export default function SearchBox(props) {
	let star = props.restaurant.Stars;
	star = star.toString().toLowerCase();

	return (
		<div className="dflex flexcolumn cardContainer">
			<div className="cardTitle">
				{props.restaurant.Brand}
				{star !== 'nan' ? (
					<span className="starIcon">
						<span className="icon-star-full" style={{ color: '#ff9529' }}></span>&nbsp;{star}
					</span>
				) : null}
			</div>
			<div className="restContent">
				<div className="dflex flexcolumn mtb10">
					<div className="cardInfoText dflex alignVertical">
						<span className="icon-spoon-knife icColor"></span>
						<span className="plr10">{props.restaurant.Variety}</span>
					</div>
					<div className="cardInfoText dflex alignVertical">
						<span className="icon-trophy icColor"></span>
						<span className="plr10">{props.restaurant['Top Ten']}</span>
					</div>
					<div className="cardInfoText dflex alignVertical">
						<span className="icon-truck icColor"></span>
						<span className="plr10">{props.restaurant.Style}</span>
					</div>
					<div className="cardInfoText dflex alignVertical">
						<span className="icon-location icColor"></span>
						<span className="plr10">{props.restaurant.Country}</span>
					</div>
				</div>
			</div>
		</div>
	);
}
