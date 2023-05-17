import React from 'react';
import 'bulma/css/bulma.min.css';

const Header = () => {
	return (
		<section className="hero is-black is-bold">
			<div className="hero-body">
				<div className="container">
					<figure className="image is-flex is-justify-content-center is-align-items-center">
						<img
							src="../images/MovieNightFight.png"
							alt="Movie Fight"
							style={{ width: '500px' }}
						/>
					</figure>
				</div>
			</div>
		</section>
	);
};

export default Header;
