import React from 'react'
import ProductRemovalImg2 from "../../assets/product-removal-2.jpg";
import ProductRemovalImg1 from "../../assets/background-remover.jpg";
import PeopleRemovalImg from "../../assets/people-removal.jpg";
import AnimalRemovalImg from "../../assets/animal-removal.jpg";
export const ImageGallery = () => {
  return (
    <div className='row justify-content-center mt-5'>
        <div className="col-md-6 mx-2 col-sm-8 col-8">
            <img src={ProductRemovalImg1} className="img-fluid gallery-img shadow-sm" alt=""  />
        </div>
        <div className="col-md-6 col-sm-6 col-6">
            <img src={PeopleRemovalImg} className="img-fluid gallery-img" alt=""  />
        </div>
        <div className="col-md-6 col-sm-6 col-6">
            <img src={AnimalRemovalImg} className="img-fluid gallery-img" alt=""  />
        </div>
        <div className="col-md-6 col-sm-6 col-8">
            <img src={ProductRemovalImg2} className="img-fluid gallery-img" alt=""  />
        </div>
    </div>
  )
}
