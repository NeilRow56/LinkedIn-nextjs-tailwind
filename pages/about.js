import React from 'react';
import Link from 'next/link';

function about() {
	return (
		<div>
			<Link href="/api/auth/login" passHref>
				<a>Login</a>
			</Link>
		</div>
	);
}

export default about;
