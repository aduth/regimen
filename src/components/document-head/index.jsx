/**
 * External dependencies
 */

import { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */

import { getFormattedTitle } from 'state/document-head/selectors';

class DocumentHead extends Component {
	static propTypes = {
		title: PropTypes.string
	};

	componentWillMount() {
		document.title = this.props.title;
	}

	componentWillReceiveProps( { title } ) {
		if ( title !== this.props.title ) {
			document.title = title;
		}
	}

	render() {
		return null;
	}
}

export default connect( ( state ) => ( {
	title: getFormattedTitle( state )
} ) )( DocumentHead );
