import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

		return (
		<div className="text-center mt-5">
			<h1>Proyecto Contact List</h1>
		
		</div>
	);
};

