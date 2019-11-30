/**
 * Block dependencies
 */
import classnames from 'classnames';
import icons from './icons';
import './editor.scss';
import attributes from "./attributes";
import './style.scss';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { 
  registerBlockType
} = wp.blocks;
const {
  RichText,
  AlignmentToolbar,
  BlockControls,
  InspectorControls,
  ColorPalette,
  ContrastChecker,
  MediaUpload,
} = wp.editor;
const {
  Toolbar,
  Button,
  Tooltip,
  PanelBody,
  PanelRow,
  FormToggle,
  RangeControl,
  TextControl
} = wp.components;

/**
  * Register block
 */
export default registerBlockType(
    'semblance/teamprofile',
    {
        title: __( 'WP Team Profile', 'wpteamprofile' ),
        description: __( 'WP Block for adding individual team member profiles.', 'wpteamprofile' ),
        category: 'layout',
        icon: {
          background: 'rgb(13, 0, 72, 1)',
          color: 'rgb(249, 201, 197)',
          src: icons.team,
        },       
        keywords: [
            __( 'Staff', 'wpteamprofile' ),
            __( 'Team', 'wpteamprofile' ),
            __( 'Profile', 'wpteamprofile' ),
            __( 'Member', 'wpteamprofile' ),
        ],
        attributes,
        edit: props => {
          const { attributes: { 
            textAlignment, heading, bio, blockBackgroundColor, blockHeadingColor, blockBorderColor, rangeControl, emailAddress, linkedIn, twitter, imgID, imgURL, imgAlt, imageShape }, 
            className, isSelected, setAttributes } = props;
          const classes = classnames(
            className
          );
          const onChangeTextAlignment = textAlignment => { setAttributes( { textAlignment } ) }, 
            onChangeHeading = heading => { setAttributes( { heading } ) },
            onChangeBio = bio => { setAttributes( { bio } ) },
            toggleImageShape = () => setAttributes( { imageShape: ! imageShape } );
          const onSelectImage = img => {
            setAttributes( {
                imgID: img.id,
                imgURL: img.url,
                imgAlt: img.alt,
            } );
          };
          const onRemoveImage = () => {
              setAttributes({
                  imgID: null,
                  imgURL: null,
                  imgAlt: null,
              });
          }
          return [
              <InspectorControls>
                <PanelBody
                      title={ __( 'Profile Visual Settings', 'wpteamprofile' ) }
                  >
                    <h3>{__( 'Heading Color', 'wpteamprofile' ) }</h3>
                    <ColorPalette
                      value={ blockHeadingColor }
                      onChange={ blockHeadingColor => {
                        setAttributes( { blockHeadingColor } );
                      } }
                    />
                    <h3>{__( 'Background Color', 'wpteamprofile' ) }</h3>
                    <ColorPalette
                      value={ blockBackgroundColor }
                      onChange={ blockBackgroundColor => {
                        setAttributes( { blockBackgroundColor } );
                      } }
                    />
                    <h3>{__( 'Border Color', 'wpteamprofile' ) }</h3>
                    <ColorPalette
                      value={ blockBorderColor }
                      onChange={ blockBorderColor => {
                        setAttributes( { blockBorderColor } );
                      } }
                    />
                    <ContrastChecker
                      {...{
                        // Text is considered large if font size is greater or equal to 18pt or 24px,
                        // currently that's not the case for button.
                        isLargeText: false,
                        textColor: blockHeadingColor,
                        backgroundColor: blockBackgroundColor
                      }}
                    />
                    <RangeControl
                      beforeIcon='arrow-left-alt2'
                      afterIcon='arrow-right-alt2'
                      label={__('Border width', 'wpteamprofile')}
                      value={rangeControl}
                      onChange={rangeControl => setAttributes({ rangeControl })}
                      min={1}
                      max={20}
                  />
                </PanelBody>
                <PanelBody
                    title={ __( 'Image Shape', 'wpteamprofile' ) }
                  >
                      <PanelRow>
                          <label
                              htmlFor="image-shape-form-toggle"
                          >
                              { __( 'Switch to round image', 'wpteamprofile' ) }
                          </label>
                          <FormToggle
                              id="image-shape-form-toggle"
                              label={ __( 'Round Image', 'wpteamprofile' ) }
                              checked={ imageShape }
                              onChange={ toggleImageShape }
                          />
                      </PanelRow>
                  </PanelBody>
                <PanelBody
                  title={ __( 'Contact and Social Info', 'wpteamprofile' ) }
                >
                <TextControl
                  label={__('Email addresss', 'wpteamprofile')}
                  help={__('Add contact email address of person', 'wpteamprofile')}
                  value={emailAddress}
                  onChange={emailAddress => setAttributes({ emailAddress })}
                />
                <TextControl
                  label={__('LinkedIn', 'wpteamprofile')}
                  help={__('Add url to LinkedIn profile', 'wpteamprofile')}
                  value={linkedIn}
                  onChange={linkedIn => setAttributes({ linkedIn })}
                />
                <TextControl
                  label={__("Twitter", "wpteamprofile")}
                  help={__("Add url to Twitter profile", "wpteamprofile")}
                  value={twitter}
                  onChange={twitter => setAttributes({ twitter })}
                />
              </PanelBody>
              </InspectorControls>, 
              <BlockControls>
                  <AlignmentToolbar
                      onChange={ onChangeTextAlignment }
                      value={ textAlignment }
                  />
                  
                  <Toolbar>
                    <Tooltip text={ __( 'Bio photo', 'wpteamprofile' )  }>
                      <MediaUpload
                        onSelect={ onSelectImage }
                        type="image"
                        value={ imgID }
                        render={ ( { open } ) => (
                            <Button
                            className={ classnames(
                              'components-icon-button',
                              'components-toolbar__control',
                            ) }
                                onClick={ open }
                            >
                                { icons.photo }
                            </Button>
                        ) }
                      >
                      </MediaUpload>
                    </Tooltip>
                  </Toolbar>
              </BlockControls>,
              <div style={ { backgroundColor: blockBackgroundColor, borderColor: blockBorderColor, borderWidth: rangeControl, textAlign: textAlignment } } 
                  className={ classnames(
                    classes,
                    textAlignment
                  ) }>
                <p className={ classnames(
                        'image-wrapper',
                        { 'round-image': imageShape },
                    ) }>
                    <figure>
                      <img
                          src={ imgURL }
                          alt={ imgAlt }
                      />
                    </figure>
                      { imgID && isSelected ? (

                          <Button
                              className="remove-image"
                              onClick={ onRemoveImage }
                          >
                              { icons.remove }
                          </Button>

                      ) : null }   
                  </p>
                { ! imgID && isSelected ? (
                    <p className="notice">{ icons.photo } { __( '👆 Add bio photo above heading', 'wpteamprofile' ) }</p>
                ) : null }
                
                <RichText
                    tagName="h3"
                    placeholder={ __( 'Add team member full name', 'wpteamprofile' ) }
                    onChange={ onChangeHeading }
                    style={ { color: blockHeadingColor, textAlign: textAlignment } }
                    value={ heading }
                />
                <RichText
                    tagName="div"
                    multiline="p"
                    placeholder={ __( 'Add team member bio...', 'wpteamprofile' ) }
                    onChange={ onChangeBio }
                    style={ { textAlign: textAlignment } }
                    value={ bio }
                />
                { emailAddress || linkedIn || twitter ? (
                    <ul className="profile-social">
                      { emailAddress && (
                        <li className="profile-email"><a href={`mailto:${ emailAddress }`}>{ icons.email }</a></li>
                      ) }
                      { linkedIn && (
                        <li className="profile-linkedin"><a href={ linkedIn }>{ icons.linkedin }</a></li>
                      ) }
                      { twitter && (
                        <li className="profile-twitter"><a href={ twitter }>{ icons.twitter }</a></li>
                      ) }
                    </ul>
                  ) : null }
              </div>
          ];
        },
        save: props => {
            const { attributes: { textAlignment, heading, bio, blockBackgroundColor, blockHeadingColor, blockBorderColor, rangeControl, emailAddress, linkedIn, twitter, imgURL, imgAlt, imageShape } } = props;
            const className = classnames(
              'bio-content'
            );
            return (
                <div className={textAlignment} style={ { borderColor: blockBorderColor, borderWidth: rangeControl, backgroundColor: blockBackgroundColor, textAlign: textAlignment } }>
                    <p className={ classnames(
                        'image-wrapper',
                        { 'round-image': imageShape },
                    ) }>
                      <img
                          src={ imgURL }
                          alt={ imgAlt }
                      />
                    </p>
                    <h3 style={ { color: blockHeadingColor } }>{ heading }</h3>
                    <div class={ className }>
                        { bio }
                    </div>

                  { emailAddress || linkedIn || twitter ? (
                    <ul className="profile-social">
                      { emailAddress && (
                        <li className="profile-email"><a href={`mailto:${ emailAddress }`}>{ icons.email }</a></li>
                      ) }
                      { linkedIn && (
                        <li className="profile-linkedin"><a href={ linkedIn }>{ icons.linkedin }</a></li>
                      ) }
                      { twitter && (
                        <li className="profile-twitter"><a href={ twitter }>{ icons.twitter }</a></li>
                      ) }
                    </ul>
                  ) : null }
                </div>
            );
        },
    },
);
