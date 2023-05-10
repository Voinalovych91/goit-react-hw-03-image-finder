import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import { ImageList } from './ImageGallery.styled';

export const ImageGallery = ({ items }) => {
  return (
    <>
      <ImageList>
        {items.map(item => (
          <ImageGalleryItem item={item} key={item.id} />
        ))}
      </ImageList>
    </>
  );
};

ImageGallery.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
};
