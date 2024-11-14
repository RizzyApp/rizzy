import { forwardRef } from 'react';
import { swipeCardImageAspectRatioClassName } from '../../../constants.js';

const SwipeCardImage = forwardRef(({ cardData }, ref) => {
    
  const images = cardData.photos.length === 0 ? ['./image/blank-profile-picture.webp'] : cardData.photos;
  return (
    <div ref={ref} className={`relative flex bg-gray-200 h-card-big ${swipeCardImageAspectRatioClassName}`}>
      <img className="object-cover rounded-xl pointer-events-none" src={images[0]} alt="" />
      <div className="absolute bottom-5 left-1 mb-4 pl-4">
        <div>
          <h3 className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)] text-white text-5xl font-poppins font-semibold inline-block">{cardData.name}</h3>
          <span className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)] font-poppins text-white pl-4 text-3xl">{cardData.age}</span>
        </div>
        <div className='mt-2'>
          <img src="./image/locatin-icon-white.png" alt="" width='30px' className='inline'/>
          <span className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)] font-poppins text-white text-1xl">{cardData.distance} kilometers away</span>
        </div>
      </div>
    </div>
  );
});

SwipeCardImage.displayName = 'SwipeCardImage';

export default SwipeCardImage;
