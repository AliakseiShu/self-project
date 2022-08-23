import React, {useState} from 'react';
import {IRepo} from "../models/models";
import {useActions} from "../hooks/action";
import {useAppSelector} from "../hooks/redux";

export const RepoCard = ({repo}: { repo: IRepo }) => {
	const {addFavorite, removeFavorite} = useActions()
	const {favorites} = useAppSelector(state => state.github)

	const [isFavorites, setIsFavorites] = useState(favorites.includes(repo.html_url))

	const addToFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		addFavorite(repo.html_url)
		setIsFavorites(true)
	}
	const removeFromToFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		removeFavorite(repo.html_url)
		setIsFavorites(false)
	}
	return (
		<div className="border py-3 px-5 rounded mb-2 hover: shadow-md hover:bg-gray-100 transition-all">
			<a href={repo.html_url} target="_blank">
				<h2 className="text-lg font-bold">{repo.full_name}</h2>
				<p className="text-sm">
					Forks: <span className="font-bold">{repo.forks}</span>
					Watchers: <span className="font-bold">{repo.watchers}</span>
				</p>
				<p className="text-sm font-thin">{repo.description}</p>
				{!isFavorites && <button className="py-2 px-4 bg-green-400 mr-10 rounded hover:shadow-md transition-all"
								onClick={addToFavorite}
				>Add
				</button>}
				{isFavorites && <button className="py-2 px-4 bg-red-400 rounded hover:shadow-md transition-all"
								onClick={removeFromToFavorite}
				>Remove
				</button>}
			</a>
		</div>
	);
};
