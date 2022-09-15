import React, { useState, useRef, useCallback } from "react";
import "../../styles/homepage.css";
import FeatureImage from "../../assets/background-remover.gif";
import ArrowRight from "../../assets/arrow-right.png";
import ShapesImg from "../../assets/remove-image-background-easily.png";
import WhyImg from "../../assets/free-background-remover-tool.png";
import Manual from "../../assets/image-background-editor.png";
import ProductRemovalImg2 from "../../assets/product-removal-2.jpg";
import PeopleRemovalImg from "../../assets/people-removal.jpg";
import AnimalRemovalImg from "../../assets/animal-removal.jpg";
import { TestimonialSlider } from "../widgets/TestimonialSlider";

import GraphicBefore from "../../assets/creative/graphics_before_removal.jpg";
import GraphicAfter from "../../assets/creative/graphics_after_removal.png";

import PeopleBefore from "../../assets/creative/people_before_removal.jpg";
import PeopleAfter from "../../assets/creative/people_after_removal.png";

import ProductBefore from "../../assets/creative/product_before_removal.jpg";
import ProductAfter from "../../assets/creative/product_after_removal.png";

import AnimalBefore from "../../assets/creative/animals_before_removal.jpg";
import AnimalAfter from "../../assets/creative/animals_after_removal.png";

import CartoonBefore from "../../assets/creative/objects_before_removal.jpg";
import CartoonAfter from "../../assets/creative/objects_after_removal.png";

import CarBefore from "../../assets/creative/vehicule_before_removal.jpg";
import CarAfter from "../../assets/creative/vehicule_after_removal.png";

import {useDropzone} from 'react-dropzone'
import { uploadImageForRemoveBackground } from "../../service/service";
import ReactLoading from 'react-loading';
import { EditModal } from "../widgets/EditModal";

import Modal from "../widgets/Modal";
export const HomePage = ({login,user}) => {
  
  
  const inputFile = useRef(null)
  const [initialPos, setInitialPos] = React.useState(null);
  const [initialSize, setInitialSize] = React.useState(null);
  const [original, setOriginal] = React.useState(true);
  const [pictureView, setPictureView] = useState(PeopleRemovalImg);
  const [tab, setTab] = useState(0);
  const [image,setImage] = useState(null);
  const [responseImg,setResponseImage] = useState(null);
  const [loading,setLoading] = useState(false);
  const [showCard,setShowCard] = useState(false);
  const [showEditModal,setShowModal] = useState(false);



  const initial = (e) => {
    let resizable = document.getElementById("Resizable");

    setInitialPos(e.clientX);
    setInitialSize(resizable.offsetWidth);
  };
  const resize = (e) => {
    let resizable = document.getElementById("Resizable");

    resizable.style.width = `${
      parseInt(initialSize) + parseInt(e.clientX - initialPos)
    }px`;
  };
  

  const handle_image_tab = (i) => {
    setTab(i);
    if (i === 0) {
      setPictureView(PeopleRemovalImg);
    } else if (i === 1) {
      setPictureView(ProductRemovalImg2);
    } else if (i === 2) {
      setPictureView(AnimalRemovalImg);
    }
  };
  

  
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      console.log(file)
      setShowCard(true);
      setLoading(true);
      setImage(URL.createObjectURL(file));
      handleImageBackgroundRemove(file);

    })
    
  }, [])
  const {getRootProps, getInputProps,isDragActive,fileRejections} = useDropzone({onDrop,noClick: true,accept: {
    'image/jpeg': [],
    'image/png': [],
    'image/jpg': [],
    
  },
  maxFiles:1
})

// const showModal = () => {
//   setShowModal(true);
//   console.log("first")
//   console.log(showEditModal)
// }

  const onButtonClick = () => {
    // `current` points to the mounted file input element
   inputFile.current.click();
  };


  async function  handleImageBackgroundRemove(file) {
    const response =await uploadImageForRemoveBackground(file,login,user);
    console.log(response);
    setResponseImage(response);
    setOriginal(false);
    setLoading(false)
    
    
  }

  const download = e => {
    fetch(responseImg.image, {
      method: "GET",
      headers: {}
    })
      .then(response => {
        response.arrayBuffer().then(function(buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", responseImg.name); //or any other extension
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    
    <div  {...getRootProps()}>
      
      {showEditModal?<EditModal imageUrl={responseImg.image} dimen={responseImg.dimensions} setShowModal={setShowModal}/>:<></>}
      {/* {showEditModal?<Modal imageUrl={responseImg.image}/>:<></>} */}
      <input {...getInputProps()} ref={inputFile} />
      <div id="highlight-div" className={isDragActive?"drop-div p-5":"drop-div p-5 d-none"}>
        <div className="under-drop-div">
          Drop image anywhere
        </div>
      </div>
      {
        showCard?
        <div className="container p-2 p-lg-5" >
        {loading? 
        <div className="shadow w-100 text-center p-5 bg-light rounded" >
          
          
          <h5 className="shimmer">Please Wait! We Are Working On It</h5>
          <div className="d-flex justify-content-center text-center" >
          <ReactLoading type={"spin"} color={"#f95615"} height={40} width={40} />
          </div>
        </div>:
         
         <div className="shadow   px-3 py-3 bg-light rounded">
           {/* Header */}
           <div className="d-flex col-12 justify-content-between">
             <ul className="nav justify-content-start">
               <li className="nav-item">
                 <h6
                   className={
                     original
                       ? "nav-link second-nav active-second-nav"
                       : "nav-link second-nav"
                   }
                   aria-current="page"
                   onClick={(event) => setOriginal(true)}
                 >
                   Original
                 </h6>
               </li>
               <li className="nav-item">
                 <h6
                   className={
                     !original
                       ? "nav-link second-nav active-second-nav"
                       : "nav-link second-nav"
                   }
                   onClick={(event) => setOriginal(false)}
                 >
                   Removed Background
                 </h6>
               </li>
             </ul>
             <h3 style={{'cursor':'pointer','background':'transparent'}} onClick={(e)=>setShowCard(false)}><i className="fa-solid fa-xmark"></i></h3>
           </div>
           <div className="row mt-3 ">
             {
               original?<div className="col-md-8 text-center ">
               <img  src={image} className="img-fluid preview-img " alt="" />
               </div>:
               <div className="col-md-8  text-center ">
                
                 <img id="preview-img" src={responseImg.image} className="img-fluid removed-background-div preview-img" alt="" />

               </div>
             }
             {responseImg !== null ?
             <div className="col-md-4 col-12 pt-5  text-center px-3 px-lg-5">
              
             <button   onClick={e => download(e)}  className="rounded-5 w-100  mt-4 btn mx-auto  btn-primary px-4  btn-lg">
              <i className="fas fa-download" data-v-233d445a=""></i>{" "}
              <strong>Download Image </strong>
            </button>
            <small>Image Resolution {responseImg.dimensions.width} X {responseImg.dimensions.height}</small>
          <button onClick={(e)=>setShowModal(true)} className="rounded-5 w-100 mt-5 btn mx-auto  btn-outline-primary px-4  btn-lg">
              <i className="fas fa-edit" data-v-233d445a=""></i>{" "}
              <strong>Edit Image</strong>
            </button>
          </div>:<></>

             }
           </div>
           
         </div>
       }
       </div>:
        <>
      
      <div className="br-title-section">
        <h1>
          Online Background <span>Remover</span>
        </h1>
      </div>
      <div className="container mt-5 px-lg-2 " style={{ minheight: "80vh" }}>
        <div className="row px-lg-2 justify-content-center">
          <div className="col-md-5 text-center">
            <img
              src={FeatureImage}
              className="main-img img-fluid border mt-3 "
              alt="remove background animation"
            />
          </div>
          <div className="col-md-1 d-none d-md-flex  align-items-center">
            <img
              src={ArrowRight}
              className="img-fluid mt-lg-5 arrow-img"
              alt=""
            />
          </div>
          <div className="col-md-5   align-items-center px-lg-5 mt-lg-5 pt-lg-5">
            <div className="br-border d-none d-md-block pt-3  pt-lg-5 card-upload rounded text-center">
              <div className="mt-md-5 mb-md-3 "></div>
              <button onClick={onButtonClick} className="br-color mt-2 btn mx-auto  btn-primary  d-lg-block btn-lg">
                <i className="fas fa-upload" data-v-233d445a=""></i>{" "}
                <strong>Upload Image</strong>
              </button>
              <p className="lead mt-2">or drop a file</p>
              <div className="mt-3 bg-light w-100 p-2">
                <small className="text-secondary">
                  Paste image or{" "}
                  <span  style={{cursor:'pointer'}}>
                    <u>URL</u>
                  </span>
                  <span
                    className="d-inline-block border bg-white px-1 rounded mx-2"
                    data-v-233d445a=""
                  >
                    ctrl
                  </span>{" "}
                  +{" "}
                  <span
                    className="d-inline-block border bg-white px-1 rounded"
                    data-v-233d445a=""
                  >
                    v
                  </span>
                </small>
              </div>
            </div>
            <div className="d-block d-md-none  rounded-4 pt-3  pt-lg-5 card-upload  text-center">
              <img
                src={ArrowRight}
                className="img-fluid arrow-img mx-1"
                alt=""
              />
              <button onClick={onButtonClick} className="rounded-5  mt-2 btn mx-auto  btn-primary px-4 d-lg-block btn-lg">
                <i className="fas fa-upload" data-v-233d445a=""></i>{" "}
                <strong>Upload Image</strong>
              </button>
            </div>
            <div className="mt-4 small-note-text card-upload text-center">
              By uploading an image or URL you agree to our{" "}
              <a
                target="_blank"
                className="text-dark font-weight-bold"
                href="/terms-of-service"
              >
                Terms of Service
              </a>{" "}
              This site is protected by hCaptcha and its{" "}
              <a
                target="_blank"
                className="text-dark font-weight-bold"
                href="/privacy-policy"
              >
                Privacy Policy
              </a>{" "}
              and{" "}
              <a
                target="_blank"
                className="text-dark font-weight-bold"
                href="/terms-of-service"
              >
                Terms of Service
              </a>{" "}
              apply
            </div>
          </div>
        </div>
      </div>
      <hr className="mt-5 text-secondary" />

      {/* The Decent Results Ever Section */}
      <div className="container my-5">
        <h2 className="fw-bolder text-center small-title">
          The Decent Results Ever!
        </h2>
        <p className="br-short br-intro br-txt-spacing">
          We proudly think we can provide the best background removing service
          out there. Our AI is built by professional web developers with a huge
          experience in the industry. To see a live of how far the tool can go
          drag the vertical divider left and right on the image below and see
          the background being removed.
        </p>

        <div className="mt-2">
          <ul className="nav justify-content-center">
            
            <li className="nav-item">
              <h6
                className={
                  tab === 0
                    ? "nav-link second-nav active-second-nav"
                    : "nav-link second-nav"
                }
                onClick={(event) => handle_image_tab(0)}
              >
                People
              </h6>
            </li>
            <li className="nav-item">
              <h6
                className={
                  tab === 1
                    ? "nav-link second-nav active-second-nav"
                    : "nav-link second-nav"
                }
                aria-current="page"
                onClick={(event) => handle_image_tab(1)}
              >
                Graphics
              </h6>
            </li>
            <li className="nav-item">
              <h6
                className={
                  tab === 2
                    ? "nav-link second-nav active-second-nav"
                    : "nav-link second-nav"
                }
                onClick={(event) => handle_image_tab(2)}
              >
                Products
              </h6>
            </li>
            <li className="nav-item">
              <h6
                className={
                  tab === 3
                    ? "nav-link second-nav active-second-nav"
                    : "nav-link second-nav"
                }
                onClick={(event) => handle_image_tab(3)}
              >
                Animals
              </h6>
            </li>
            <li className="nav-item">
              <h6
                className={
                  tab === 4
                    ? "nav-link second-nav active-second-nav"
                    : "nav-link second-nav"
                }
                onClick={(event) => handle_image_tab(4)}
              >
                Cartoons
              </h6>
            </li>
            <li className="nav-item">
              <h6
                className={
                  tab === 5
                    ? "nav-link second-nav active-second-nav"
                    : "nav-link second-nav"
                }
                onClick={(event) => handle_image_tab(5)}
              >
                Cars
              </h6>
            </li>
          </ul>
        </div>
        <div className="container d-flex justify-content-center my-5">
          {tab === 1 ? (
            <div className="main-block">
              <div
                className="Block  "
                style={{ backgroundImage: `url(${GraphicAfter})` }}
              >
                <div
                  id="Resizable"
                  className="bg-danger"
                  style={{ backgroundImage: `url(${GraphicBefore})` }}
                />
                <div
                  id="Draggable"
                  draggable="true"
                  onDragStart={initial}
                  onDrag={resize}
                  onTouchStart={initial}
                  onTouchMove={resize}
                  onTouchEnd={resize}
                  onTouchCancel={resize}
                  // onTouchMoveCapture = {resize}
                >
                  <i className="fa-solid fa-arrows-left-right fs-3 mx-auto text-secondary"></i>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
          {tab === 0 ? (
            <div className="main-block">
              <div
                className="Block  "
                style={{ backgroundImage: `url(${PeopleAfter})` }}
              >
                <div
                  id="Resizable"
                  className="bg-danger"
                  style={{ backgroundImage: `url(${PeopleBefore})` }}
                />
                <div
                  id="Draggable"
                  draggable="true"
                  onDragStart={initial}
                  onDrag={resize}
                  onTouchStart={initial}
                  onTouchMove={resize}
                  onTouchEnd={resize}
                  onTouchCancel={resize}
                  // onTouchMoveCapture = {resize}
                >
                  <i className="fa-solid fa-arrows-left-right fs-3 mx-auto text-secondary"></i>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
          {tab === 2 ? (
            <div className="main-block">
              <div
                className="Block  "
                style={{ backgroundImage: `url(${ProductAfter})` }}
              >
                <div
                  id="Resizable"
                  className="bg-danger"
                  style={{ backgroundImage: `url(${ProductBefore})` }}
                />
                <div
                  id="Draggable"
                  draggable="true"
                  onDragStart={initial}
                  onDrag={resize}
                  onTouchStart={initial}
                  onTouchMove={resize}
                  onTouchEnd={resize}
                  onTouchCancel={resize}
                  // onTouchMoveCapture = {resize}
                >
                  <i className="fa-solid fa-arrows-left-right fs-3 mx-auto text-secondary"></i>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
          {tab === 3 ? (
            <div className="main-block">
              <div
                className="Block  "
                style={{ backgroundImage: `url(${AnimalAfter})` }}
              >
                <div
                  id="Resizable"
                  className="bg-danger"
                  style={{ backgroundImage: `url(${AnimalBefore})` }}
                />
                <div
                  id="Draggable"
                  draggable="true"
                  onDragStart={initial}
                  onDrag={resize}
                  onTouchStart={initial}
                  onTouchMove={resize}
                  onTouchEnd={resize}
                  onTouchCancel={resize}
                  // onTouchMoveCapture = {resize}
                >
                  <i className="fa-solid fa-arrows-left-right fs-3 mx-auto text-secondary"></i>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
          {tab === 4 ? (
            <div className="main-block">
              <div
                className="Block  "
                style={{ backgroundImage: `url(${CartoonAfter})` }}
              >
                <div
                  id="Resizable"
                  className="bg-danger"
                  style={{ backgroundImage: `url(${CartoonBefore})` }}
                />
                <div
                  id="Draggable"
                  draggable="true"
                  onDragStart={initial}
                  onDrag={resize}
                  onTouchStart={initial}
                  onTouchMove={resize}
                  onTouchEnd={resize}
                  onTouchCancel={resize}
                  // onTouchMoveCapture = {resize}
                >
                  <i className="fa-solid fa-arrows-left-right fs-3 mx-auto text-secondary"></i>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
          {tab === 5 ? (
            <div className="main-block">
              <div
                className="Block  "
                style={{ backgroundImage: `url(${CarAfter})` }}
              >
                <div
                  id="Resizable"
                  className="bg-danger"
                  style={{ backgroundImage: `url(${CarBefore})` }}
                />
                <div
                  id="Draggable"
                  draggable="true"
                  onDragStart={initial}
                  onDrag={resize}
                  onTouchStart={initial}
                  onTouchMove={resize}
                  onTouchEnd={resize}
                  onTouchCancel={resize}
                  // onTouchMoveCapture = {resize}
                >
                  <i className="fa-solid fa-arrows-left-right fs-3 mx-auto text-secondary"></i>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>




       
      </div>
      {/* other Detail Section */}
      <hr className="my-5 bg-secondary" />
      <div className="container px-lg-5 my-5" style={{ minHeight: "60vh" }}>
        <div className="row pt-lg-5">
          <div className="col-lg-5">
            <img
              className="br-image-shrink"
              src={ShapesImg}
              alt="remove  background easily"
            />
          </div>
          <div className="col-lg-7">
            <h2 className="bottom-space small-title">
              Remove Backgrounds Easily!
            </h2>
            <p className="br-txt-gap br-txt-spacing">
              We know not everyone has enough knowledge about graphic design or
              knows how to deal with big complicated image editing software like
              Photoshop. Even people who does don't often like to spend hours
              and hours trying to make images transparent.Therefore, we're here
              to help!
            </p>
            <p className="br-txt-gap br-txt-spacing">
              Background Remover CC introduces the new AI web application that
              will help you remove the background and make images transparent no
              knowledge required whatsoever. Everything is automatic, it takes a
              few seconds and one click to get things done.
            </p>
          </div>
        </div>
      </div>
      <div
        className="br-container container mt-5"
        style={{ minHeight: "60vh" }}
      >
        <h2 className="bottom-space fw-bolder text-center small-title">
          How does This Tool Works?
        </h2>
        <p className="lead text-center px-lg-5 ">
          The process of getting rid of an image background using our free
          background removal tool is quite simple, You can simply follow the
          steps outlined below:
        </p>
        <div className="d-flex justify-content-center mt-5">
          <ul className="br-txt-gap bullet-width">
            <li>
              Upload the image for which you want you want to remove background
              by clicking anywhere inside the upload area or simply by dragging
              and dropping the file to it.
            </li>
            <li>
              The AI will begin to do its job, all you have to do is to wait a
              few seconds and you'll get your transparent image that you can go
              ahead and download by clicking the <b>"download"</b> button
            </li>
          </ul>
        </div>
      </div>

      <div className="container mt-5 mb-5" style={{ minHeight: "60vh" }}>
        <div className="row">
          <div className="col-lg-5">
            <img src={Manual} className="img-fluid" alt="" />
          </div>
          <div className="col-lg-7">
            <h2 className="title-spacing bottom-space small-title">
              How does the manual background remover editor work?
            </h2>
            <p className="lead">
              You uploaded an image and for some reason the AI didn't do a good
              job, don't worry you still have our image editor that you can
              access by clicking the <b>"Edit image"</b> button. In this editor
              you can
            </p>
            <ul className="br-txt-gap">
              <li>
                Use the brush in different sizes (that you can control) to erase
                or restore specific parts of the image.
              </li>
              <li>
                Change the background to a solid color background or a landscape
                right away from inside the editor
              </li>
              <li>Return to the initial transparent image if you want to</li>
              <li>
                Finally, when you're satisfied with the result you can go ahead
                and download it by clicking the <b>"download" button.</b>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr className="my-5 bg-secondary" />
      <div className="container mt-5 mb-5 py-5">
        <div className="row mt-5">
          <div className="col-lg-7">
            <h2 className="title-spacing small-title">
              Why use this background remover tool?
            </h2>
            <p className="lead">
              We have done so much work to improve this tool and we strongly
              think it deserves to be bookmarked for later use and here's why
              you should be using this tool
            </p>
            <ul className="br-txt-gap mt-4">
              <li>
                <b>Totally FREE:</b> using this tool won't cost you a penny.
              </li>
              <li>
                <b>Unlimited Use:</b> you are free to use the tool as much as
                you want to.
              </li>
              <li>
                <b>Time Saving:</b> you get to save countless hours of your time
                that you can take advantage of and work on other more important
                things.
              </li>
              <li>
                <b>Simple &amp; Easy:</b> The tool doesn't need any efforts from
                your side, it's the simplest to use ever!
              </li>
              <li>
                <b>Fast &amp; Efficient:</b> We tried to make this useful tool
                as fast and efficient as possible so it performs your tasks in a
                glance of an eye.
              </li>
            </ul>
          </div>
          <div className="col-lg-5">
            <img src={WhyImg} className="img-fluid" alt="" />
          </div>
          <p className="lead ">
            We proudly think we can provide the best background removing service
            out there. Our AI is built by professional web developers with a
            huge experience in the industry. To see a live of how far the tool
            can go drag the vertical divider left and right on the image below
            and see the background being removed.
          </p>
        </div>
      </div>
      {/* The Getting Creative section */}
      <div className="container my-5">
        <h2 className="fw-bolder text-center small-title">Getting Creative</h2>
        <p className="br-short br-intro br-txt-spacing">
          Convert any image to transparent background immediately and turn them
          into art masterpieces, product catalogs, stunning ad banners, awesome
          visual presentations, graphics and much more. Totally customizable to
          fit your needs. After reading the above section about the tool, it's
          time to be creative and have fun!. There are many other ways in which
          you can benefit from this background eraser tool and here are a few
          some examples of what you can do.
        </p>
        <div className="mt-2">
          <ul className="nav justify-content-center">
            <li className="nav-item">
              <h6
                className={
                  tab === 0 || tab === 3 || tab === 4 || tab === 5
                    ? "nav-link second-nav active-second-nav"
                    : "nav-link second-nav"
                }
                aria-current="page"
                onClick={(event) => handle_image_tab(0)}
              >
                People
              </h6>
            </li>
            <li className="nav-item">
              <h6
                className={
                  tab === 1
                    ? "nav-link second-nav active-second-nav"
                    : "nav-link second-nav"
                }
                onClick={(event) => handle_image_tab(1)}
              >
                Products
              </h6>
            </li>
            <li className="nav-item">
              <h6
                className={
                  tab === 2
                    ? "nav-link second-nav active-second-nav"
                    : "nav-link second-nav"
                }
                onClick={(event) => handle_image_tab(2)}
              >
                Animals
              </h6>
            </li>
          </ul>
        </div>
        <div className="container d-flex justify-content-center mt-5">
          <img src={pictureView} className="img-fluid" alt="" />
        </div>
        <p className="br-short br-intro">
          The examples you see above is just to illustrate some ideas of what
          you can do using this free image background remover tool. You can try
          any picture you want and see the great outcome.
        </p>
      </div>

      <hr className="my-5 bg-secondary" />
      <div className="container mt-5 pt-5 mb-5">
        <h2 className="small-title text-center mb-5">
          What They Say About Us!
        </h2>
        <TestimonialSlider />
      </div>
      <hr className="my-5 text-light" />
      </>
      }

      
    </div>
    
  );
};
