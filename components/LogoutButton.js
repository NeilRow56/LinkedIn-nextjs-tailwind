import React from 'react';

// `onClick`, `href`, and `ref` need to be passed to the DOM element
// for proper handling
const LogoutButton = React.forwardRef(({ onClick, href }, ref) => {
	return (
		<a href={href} onClick={onClick} ref={ref}>
			Logout
		</a>
	);
});
export default LogoutButton;
