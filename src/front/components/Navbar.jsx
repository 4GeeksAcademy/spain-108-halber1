import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Logo</span>
				</Link>
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Characters</span>
				</Link>
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Planets</span>
				</Link>
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Starships</span>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Contacts</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};