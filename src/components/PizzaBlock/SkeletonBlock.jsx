import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
	<ContentLoader
		className="pizza-block"
		speed={2}
		width={280}
		height={465}
		viewBox="0 0 280 465"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
		{...props}
	>
		<rect x="0" y="276" rx="15" ry="15" width="280" height="27"/>
		<circle cx="140" cy="130" r="130"/>
		<circle cx="117" cy="189" r="2"/>
		<circle cx="118" cy="193" r="2"/>
		<rect x="0" y="317" rx="16" ry="16" width="280" height="88"/>
		<rect x="0" y="430" rx="15" ry="15" width="106" height="35"/>
		<rect x="130" y="420" rx="20" ry="20" width="150" height="45"/>
	</ContentLoader>
)

export default Skeleton;