import { connect } from 'react-redux';
import FlashMessage from '../components/shared/FlashMessage';

function mapStatesToProps(state) {
  return {
    flash: state.flash
  };
}

export default connect(mapStatesToProps, null)(FlashMessage);