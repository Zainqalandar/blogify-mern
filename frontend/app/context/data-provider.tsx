'use client';
import React from 'react';

interface User {
	_id: string;
	name: string;
}

type AllUsers = User[];

const DataContext = React.createContext<{
	user: User | null;
	token: string | null;
	hanleChangeToken: (tkn: string | null) => void;
	handleChangeUser: (newUser: User | null) => void;
	allUsers: AllUsers;
}>({
	user: null,
	token: '',
	hanleChangeToken: () => {},
	handleChangeUser: () => {},
	allUsers: [],
});

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const DataProvider = ({ children }: { children: React.ReactNode }) => {
	const [allUsers, setAllUsers] = React.useState<AllUsers>([]);
	const [user, setUser] = React.useState<User | null>(null);
	const [token, setToken] = React.useState<string | null>(null);

	React.useEffect(() => {
		if (typeof window !== 'undefined') {
			const storedUser = window.localStorage.getItem('blogify-user');
			const token =
				typeof window !== 'undefined'
					? window.localStorage.getItem('blogify-token')
					: null;
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setToken(token);
			setUser(storedUser ? JSON.parse(storedUser) : null);
		}
	}, []);

	React.useEffect(() => {
		const getUsers = async (tkn: string) => {
			try {
				const res = await fetch(`${API_URL}/auth`, {
					headers: {
						...(tkn ? { Authorization: `Bearer ${tkn}` } : {}),
					},
				});

				const data = await res.json();
				setAllUsers(data.data as AllUsers);
			} catch (error: Error | unknown) {
				console.error('Error fetching users:', error);
				setAllUsers([]);
			}
		};
		if (token) {
			getUsers(token);
		}
	}, [token]);

	const handleChangeUser = (newUser: User | null) => {
		setUser(newUser);
	};
	const hanleChangeToken = (tkn: string | null) => {
		setToken(tkn);
	};
	return (
		<DataContext.Provider
			value={{
				user,
				handleChangeUser,
				allUsers,
				token,
				hanleChangeToken,
			}}
		>
			{children}
		</DataContext.Provider>
	);
};

const useData = () => React.useContext(DataContext);

export { useData };

export default DataProvider;
