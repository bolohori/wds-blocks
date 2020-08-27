import {
	InnerBlocks,
	InspectorControls,
	PanelColorSettings,
	withColors,
} from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import './editor.scss';

// Set up props for InnerBlocks component.
const innerBlocksProps = {
	allowedBlocks: [ 'core/heading', 'core/paragraph', 'core/buttons' ],
	template: [
		[
			'core/heading',
			{
				content: __( 'Slide Title', 'wdsblocks' ),
				level: '4',
				align: 'center',
			},
		],
		[
			'core/paragraph',
			{
				content: __( 'Slide Content', 'wdsblocks' ),
				align: 'center',
			},
		],
		[
			'core/buttons',
			{ align: 'center' },
			[ [ 'core/button', { text: __( 'Read More', 'wdsblocks' ) } ] ],
		],
	],
};

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @author WebDevStudios
 * @since  2.0.0
 * @see    https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @param  {Object} [props] Properties passed from the editor.
 * @return {WPElement}      Element to render.
 */
function Edit( props ) {
	const {
		attributes,
		className,
		setAttributes,
		fontColor,
		setFontColor,
	} = props;

	// Update field content on change.
	const onChangeAttributes = ( attribute, value ) => {
		setAttributes( { [ attribute ]: value } );
	};

	const classes = [ className ],
		styles = {};

	// Add custom color classes.
	classes.push( fontColor.color ? 'has-text-color' : null );
	classes.push( fontColor.class ? fontColor.class : null );

	// Add custom color styles.
	styles.color = fontColor.color ? fontColor.color : undefined;

	return (
		<>
			<InspectorControls>
				<PanelColorSettings
					title={ __( 'Color settings', 'wdsblocks' ) }
					colorSettings={ [
						{
							value: fontColor.color,
							onChange: setFontColor,
							label: __( 'Text Color', 'wdsblocks' ),
						},
					] }
				/>
			</InspectorControls>
			<div
				className={ classes.filter( Boolean ).join( ' ' ) }
				style={ styles }
			>
				<InnerBlocks { ...innerBlocksProps } />
			</div>
		</>
	);
}

export default compose( [ withColors( { fontColor: 'color' } ) ] )( Edit );
