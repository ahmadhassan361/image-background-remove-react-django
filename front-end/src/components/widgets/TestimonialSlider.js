import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import client1 from '../../assets/client1.jpg'
import client2 from '../../assets/client2.jpg'
import client3 from '../../assets/client3.jpg'
import client4 from '../../assets/client4.jpg'
export const TestimonialSlider = (...props) => {
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
          slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        }
      };
  return (
    <Carousel
  swipeable={true}
  draggable={true}
  showDots={true}
  responsive={responsive}
  ssr={false} // means to render carousel on server-side.
  infinite={true}
  autoPlay={true}
  autoPlaySpeed={3000}
  keyBoardControl={true}
  customTransition="all .5"
  transitionDuration={500}
  containerClass="carousel-container"
  removeArrowOnDeviceType={["tablet", "mobile"]}
  deviceType={'mobile'}
  dotListClass="custom-dot-list-style "
  itemClass="carousel-item-padding-40-px"
>
  <div className='testimonial-box shadow rounded-4 text-center p-3 m-3' >
    <div className='br-rating'>
      <i className='fa fa-star'></i>
      <i className='fa fa-star'></i>
      <i className='fa fa-star'></i>
      <i className='fa fa-star'></i>
      <i className='fa fa-star'></i>
    </div>
    <img src={client1} className="avatar-img rounded-circle" width={60} height={60} alt=""  />
    <h6 className='mt-2'><strong>Olivia</strong></h6>
    <p className=' mt-2'> I am not a graphic designer but this online tools website has saved me hours and hours of repetitive tasks and I really don't know what I would do if such as smart AI wasn't there. Thank You for always making things easy for me.</p>
  </div>
  <div className='testimonial-box shadow rounded-4 text-center p-3 m-3' >
    <div className='br-rating'>
      <i className='fa fa-star'></i>
      <i className='fa fa-star'></i>
      <i className='fa fa-star'></i>
      <i className='fa fa-star'></i>
      <i className='fa fa-star'></i>
    </div>
    <img src={client2} className="avatar-img rounded-circle" width={60} height={60} alt="" />
    <h6 className='mt-2'><strong>Scott</strong></h6>
    <p className=' mt-2'>I have been using  the Background Remover CC pretty frequently and I can confidently say that's it's one of the best AI online tools websites on the market. It has helped me a lot to accomplish my graphic design work and have more time.</p>
  </div>
  <div className='testimonial-box shadow rounded-4 text-center p-3 m-3' >
    <div className='br-rating'>
      <i className='fa fa-star'></i>
      <i className='fa fa-star'></i>
      <i className='fa fa-star'></i>
      <i className='fa fa-star'></i>
      <i className='fa fa-star'></i>
      </div>
    <img src={client3} className="avatar-img rounded-circle" width={60} height={60} alt="" />
    <h6 className='mt-2'><strong>Sophia</strong></h6>
    <p className=' mt-2'>After all the websites I have seen, I bookmarked this one simply because I think it's the best choice when it comes to the effeciency and the stunning quality offered in each time besides, being completely free. The Greatest Ever!</p>
  </div>
  <div className='testimonial-box shadow rounded-4 text-center p-3 m-3' >
    <div className='br-rating'>
      <i className='fa fa-star'></i>
      <i className='fa fa-star'></i>
      <i className='fa fa-star'></i>
      <i className='fa fa-star'></i>
      <i className='fa fa-star'></i>
    </div>
    <img src={client4} className="avatar-img rounded-circle" width={60} height={60} alt=""  />
    <h6 className='mt-2'><strong>William</strong></h6>
    <p className=' mt-2'> I thought automated tools aren't perfect enough to do tasks and actually come up with a good result but for Background Remover CC things are totally different and I am very impressed with the quality provided. Highly Recommended!</p>
  </div>
  
</Carousel>
  )
}
