import React, {useEffect, useState} from 'react';
import {useLazyGetUserReposQuery, useSearchUsersQuery} from '../store/github/github.api';
import {useDebounce} from "../hooks/debounce";
import {RepoCard} from "../components/RepoCard";

export const HomePage = () => {
	const [search, setSearch] = useState('')
	const [dropdown, setDropdown] = useState(false)

	const debounce = useDebounce(search)
	const {isLoading, isError, data} = useSearchUsersQuery(debounce, {
		skip: debounce.length < 3,
		refetchOnFocus: true
	})

	const [fetchRepos, {isLoading: areReposLoading, data: repos}] = useLazyGetUserReposQuery()

	useEffect(() => {
		setDropdown(debounce.length > 3 && data?.length! > 0)
	}, [debounce, data])

	const onClickHandler = (userName: string) => {
		fetchRepos(userName)
		setDropdown(false)
	}

	return (
		<div className="flex justify-center pt-10 mx-auto h-screen w-screen">
			{isError && <p className="text-center text-red-600">Something went wrong...</p>}

			<div className="relative w-[560px]">
				<input
					type="text"
					className="border py-2 px-4 w-full h-[42px] mb-2"
					placeholder="Search for Github username..."
					value={search}
					onChange={e => setSearch(e.currentTarget.value)}
				/>

				{dropdown &&
				<ul className="list-none absolute top-[42px] left-0 right-0 max-h-[200px] overflow-y-scroll shadow-md bg-white">
					{isError && <p className="text-center">Loading...</p>}
					{data?.map(user => (
						<li key={user.id}
								onClick={() => onClickHandler(user.login)}
								className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
						>{user.login}
						</li>
					))}
				</ul>}
				<div className="container">
					{areReposLoading && <p className="text-center">Repos are loading...</p>}
					{repos?.map(repo => <RepoCard repo={repo} key={repo.id}/>)}
				</div>
			</div>
		</div>
	);
};
