import Head from 'next/head';
import Link from 'next/Link';
import { AnimatePresence } from 'framer-motion';
import { useUser } from '@auth0/nextjs-auth0';
import Header from '../components/Header';
import Modal from '../components/Modal';
import LogoutButton from '../components/LogoutButton';
import { useRecoilState } from 'recoil';
import { modalState, modalTypeState } from '../atoms/modalAtom';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';

import { connectToDatabase } from '../util/mongodb';

export default function Home({ posts, articles }) {
	console.log(posts);
	const [modalOpen, setModalOpen] = useRecoilState(modalState);
	const [modalType, setModalType] = useRecoilState(modalTypeState);

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
						<Feed posts={posts} />
					</div>
					{/* <Widgets articles={articles} /> */}
					<AnimatePresence>
						{modalOpen && (
							<Modal
								handleClose={() => setModalOpen(false)}
								type={modalType}
							/>
						)}
					</AnimatePresence>
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
export async function getServerSideProps(context) {
	// Get posts on SSR
	const { db } = await connectToDatabase();
	const posts = await db
		.collection('posts')
		.find()
		.sort({ timestamp: -1 })
		.toArray();

	// Get Google News API
	const results = await fetch(
		`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`
	).then((res) => res.json());

	return {
		props: {
			// articles: results.articles,
			posts: posts.map((post) => ({
				_id: post._id.toString(),
				input: post.input,
				photoUrl: post.photoUrl,
				email: post.email,
				createdAt: post.createdAt,
			})),
		},
	};
}
