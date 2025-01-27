import React from 'react';
var objectAssign = require('object-assign');


export default function HamburgerMenu(props) {
	const width       = `${props.width || 36}px`,
	height            = `${props.height || 30}px`,
	halfHeight        = `${parseInt(height.replace('px', '')) / 2}px`,
	isOpen            = props.isOpen || false,
	strokeWidth       = props.strokeWidth || 2,
    halfStrokeWidth   = `-${strokeWidth / 2}px`,
    animationDuration = props.animationDuration || '0.4';

	const getTransformValue = (isOpen, defaultPos, rotateVal) => (
		`translate3d(0,${isOpen ? halfHeight : defaultPos},0) rotate(${isOpen ? `${rotateVal}deg` : '0'})`
	);

	const styles = {
		container: {
			width,
			height,
			position: 'relative',
			transform: `rotate(${props.rotate || 0}deg)`
		},
		lineBase: {
			display: 'block',
			height: `${strokeWidth}px`,
			width: '100%',
			background: props.color || '#000',
			transitionTimingFunction: 'ease',
			transitionDuration : `${animationDuration}s`,
			borderRadius: `${props.borderRadius || 0}px`,
			transformOrigin: 'center',
			position: 'absolute'
		},
		firstLine: {
			transform: getTransformValue(isOpen, 0, 45),
			marginTop: halfStrokeWidth,
		},
		secondLine: {
      transitionTimingFunction: 'ease-out',
			transitionDuration : `${animationDuration / 4}s`,
			opacity: isOpen ? '0' : '1',
			top: halfHeight,
			marginTop: halfStrokeWidth
		},
		thirdLine: {
			transform: getTransformValue(isOpen, height, -45),
			marginTop: halfStrokeWidth
		}
	};

	return (
		<div style={styles.container} onClick={props.menuClicked}>
		  <span style={objectAssign({}, styles.lineBase, styles.firstLine)}></span>
		  <span style={objectAssign({}, styles.lineBase, styles.secondLine)}></span>
		  <span style={objectAssign({}, styles.lineBase, styles.thirdLine)}></span>
		</div>
	);
};

HamburgerMenu.PropTypes = {
	isOpen: React.PropTypes.bool.isRequired,
	menuClicked: React.PropTypes.func.isRequired,
	width: React.PropTypes.number,
	height: React.PropTypes.number,
	strokeWidth: React.PropTypes.number,
	rotate: React.PropTypes.number,
	color: React.PropTypes.string,
	borderRadius: React.PropTypes.number,
	animationDuration: React.PropTypes.number
};
