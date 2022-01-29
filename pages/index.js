import Head from 'next/head';
import Link from 'next/Link';
import { useUser } from '@auth0/nextjs-auth0';
import Header from '../components/Header';
import LogoutButton from '../components/LogoutButton';

import Sidebar from '../components/Sidebar';

export default function Home() {
	const { user, error, isLoading } = useUser();

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>{error.message}</div>;

	if (user) {
		return (
			<div className="bg-[#F3F2EF] dark:bg-black dark:text-white h-screen overflow-y-scroll md:space-y-6">
				<Head>
					<title>Feed | LinkedIn</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<Header />
				<main className="flex justify-center gap-x-5 px-4 sm:px-12">
					<div className="flex flex-col md:flex-row gap-5">
						<Sidebar />
						{/* <Feed posts={posts} /> */}
					</div>
					{/* <Widgets articles={articles} /> */}
				</main>
				<Link href="/api/auth/login">
					<a>Login</a>
				</Link>
				<div>
					Welcome {user.name}!{' '}
					<Link href="/api/auth/logout">
						<a>Logout</a>
					</Link>
				</div>

				<Link href="/api/auth/logout" passHref>
					<LogoutButton />
				</Link>
			</div>
		);
	}
}
