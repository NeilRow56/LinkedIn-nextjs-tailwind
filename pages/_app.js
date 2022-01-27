// pages/_app.js
import React from 'react';
import '../styles/globals.css';
import { ThemeProvider } from 'next-themes';
import { UserProvider } from '@auth0/nextjs-auth0';

export default function App({ Component, pageProps }) {
	return (
		<ThemeProvider attribute="class">
			<UserProvider>
				<Component {...pageProps} />
			</UserProvider>
		</ThemeProvider>
	);
}
