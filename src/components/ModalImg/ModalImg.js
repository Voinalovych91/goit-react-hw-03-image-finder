import PropTypes from 'prop-types';
import Modal from 'react-modal';
// import { ImageModal } from './ModalImg.styled';

const customStyles = {
 overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: '1200',
  },
  content: {
    position: 'relative',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    border: 'none',
    transform: 'translate(-50%, -50%)',
    background: 'none',
    overflow: 'hidden',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '0.25rem',
    outline: 'none',
    width: '90%',
    height: '90%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

};

Modal.setAppElement('#root');


export const ModalImg = ({ isOpen, image, alt, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Image modal"
    >
      <div>
        <img src={image} alt={alt}/>
      </div>
    </Modal>
  );
};

ModalImg.propTypes = {
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  isOpen: PropTypes.func.isRequired,
  onClose:PropTypes.func.isRequired,
};