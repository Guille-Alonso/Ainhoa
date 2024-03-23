import React from 'react';
import { Media } from 'reactstrap';
import { useImageSize } from '../../../utils/useImageSize';

const ImageZoom = (props) => {
    const { image } = props;
    const imageSize = useImageSize();

    return (
        <Media src={`${image.main}`} alt={image.alt} className="img-fluid image_zoom_cls-0" />
    );
}

export default ImageZoom;
