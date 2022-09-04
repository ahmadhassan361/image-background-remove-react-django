import React, { useState } from "react";
import "../../styles/homepage.css";
import FeatureImage from "../../assets/background-remover.jpg";
import ArrowRight from "../../assets/arrow-right.png";
import ShapesImg from "../../assets/shapes.svg";
import ToolImg from "../../assets/tools.svg";
import WhyImg from "../../assets/why-choose.svg";
import Manual from "../../assets/manual.svg";
import ProductRemovalImg2 from "../../assets/product-removal-2.jpg";
import PeopleRemovalImg from "../../assets/people-removal.jpg";
import AnimalRemovalImg from "../../assets/animal-removal.jpg";
import { ImageGallery } from "../widgets/ImageGallery";
import { TestimonialSlider } from "../widgets/TestimonialSlider";
export const HomePage = () => {
  const [pictureView, setPictureView] = useState(PeopleRemovalImg);
  const [tab, setTab] = useState(0);

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

  return (
    <>
      <div className="container mt-5 px-lg-2 " style={{ minheight: "80vh" }}>
        <div className="row px-lg-2">
          <div className="col-md-6 ">
            <h1 className="title">Remove Image Background</h1>
            <p className="lead slogan" >
              100% Automatically and{" "}
              <span className="position-relative d-inline-block">
                Free <span className="w-100 free-underline"></span>
              </span>
            </p>
            <img src={FeatureImage} className="img-fluid border mt-3" alt="" />
          </div>
          <div className="col-md-1 d-none d-md-flex  align-items-center">
            <img src={ArrowRight} className="img-fluid mt-lg-5 arrow-img" alt="" />
          </div>
          <div className="col-md-5  align-items-center px-lg-5 mt-lg-5 pt-lg-5">
            <div className="shadow d-none d-md-block rounded-4 pt-3  pt-lg-5 card-upload  text-center">
              <div className="mt-md-5 mb-md-3 ">
                <svg
                  className="d-inline "
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 22 16"
                  height="16mm"
                  width="22mm"
                  data-v-233d445a=""
                >
                  <path
                    d="M.787 6.411l10.012 5.222a.437.437 0 0 0 .402 0l10.01-5.222a.434.434 0 0 0 .186-.585.45.45 0 0 0-.186-.187L11.2.417a.441.441 0 0 0-.404 0L.787 5.639a.439.439 0 0 0-.184.588.453.453 0 0 0 .184.184z"
                    fill="#DDDFE1"
                    data-v-233d445a=""
                  ></path>
                  <path
                    d="M21.21 9.589l-1.655-.864-7.953 4.148a1.31 1.31 0 0 1-1.202 0L2.444 8.725l-1.657.864a.437.437 0 0 0-.184.583.427.427 0 0 0 .184.187l10.012 5.224a.437.437 0 0 0 .402 0l10.01-5.224a.434.434 0 0 0 .186-.586.444.444 0 0 0-.186-.184z"
                    fill="#EDEFF0"
                    data-v-233d445a=""
                  ></path>
                </svg>
              </div>
              <button className="rounded-5  mt-2 btn mx-auto  btn-primary  d-lg-block btn-lg">
                <i className="fas fa-upload" data-v-233d445a=""></i>{" "}
                <strong>Upload Image</strong>
              </button>
              <p className="lead mt-2">or drop a file</p>
              <div className="mt-3 bg-light w-100 p-2">
                <small className="text-secondary">
                  Paste image or{" "}
                  <span>
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
                <img src={ArrowRight} className="img-fluid arrow-img mx-1" alt="" />
              <button className="rounded-5  mt-2 btn mx-auto  btn-primary px-4 d-lg-block btn-lg">
                <i className="fas fa-upload" data-v-233d445a=""></i>{" "}
                <strong>Upload Image</strong>
              </button>
             
            </div>
            <div className="mt-4 small-note-text card-upload text-center">
              By uploading an image or URL you agree to our{" "}
              <a
                target="_blank"
                className="text-dark font-weight-bold"
                href="/tos"
              >
                Terms of Service
              </a>{" "}
              This site is protected by hCaptcha and its{" "}
              <a
                target="_blank"
                className="text-dark font-weight-bold"
                href="/tos"
              >
                Privacy Policy
              </a>{" "}
              and{" "}
              <a
                target="_blank"
                className="text-dark font-weight-bold"
                href="/tos"
              >
                Terms of Service
              </a>{" "}
              apply
            </div>
          </div>
        </div>
      </div>
      <hr className="mt-5 text-secondary" />

      {/* Just Picture it Section */}
      <div className=" my-5">
        <h1 className="fw-bolder text-center small-title">Just Picture It!</h1>
        <div className="mt-2">
          <ul className="nav justify-content-center">
            <li className="nav-item">
              <h6
                className={
                  tab === 0
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
      </div>
      {/* other Detail Section */}
      <hr className="my-5 bg-secondary" />
      <div
        className="container px-lg-5 pt-lg-5 my-5"
        style={{ minHeight: "60vh" }}
      >
        <div className="row px-lg-5 pt-lg-5">
          <div className="col-lg-5">
            <img src={ShapesImg} alt="" />
          </div>
          <div className="col-lg-7">
            <h1 className="small-title">Online Background Remover</h1>
            <p className="lead">
              We know not everyone has enough knowledge about graphic design or
              knows how to deal with big complicated image editing software like
              Photoshop. Even people who does don't often like to spend hours
              and hours trying to make images transparent.Therefore, we're here
              to help!
            </p>
          </div>
        </div>
      </div>
      <div
        className="container px-lg-5 pt-lg-5 mt-5 mb-5"
        style={{ minHeight: "60vh" }}
      >
        <div className="row px-lg-5 pt-lg-5">
          <div className="col-lg-7">
            <h1 className="small-title">Tool Overview</h1>
            <p className="lead">
              Background Remover CC introduces the new AI web application that
              will help you remove the background and make images transparent no
              knowledge required whatsoever. Everything is automatic, it takes a
              few seconds and one click to get things done
            </p>
          </div>
          <div className="col-lg-5">
            <img src={ToolImg} className="img-fluid" alt="" />
          </div>
        </div>
      </div>
      <div className="container mt-5" style={{ minHeight: "60vh" }}>
        <h1 className="fw-bolder text-center small-title">
          How does this tool work?
        </h1>
        <p className="lead text-center px-lg-5 " >
          The process of getting rid of an image background using our free
          background removal tool is quite simple, You can simply follow the
          steps outlined below:
        </p>
        <div className="d-flex justify-content-center mt-5">
          <ul className="bullet-width">
            <li >
              Upload the image for which you want you want to remove background
              by clicking anywhere inside the upload area or simply by dragging
              and dropping the file to it.
            </li>
            <li >
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
            <h1 className="small-title">
              How does the manual background remover editor work?
            </h1>
            <p className="lead">
              You uploaded an image and for some reason the AI didn't do a good
              job, don't worry you still have our image editor that you can
              access by clicking the <b>"Edit image"</b> button. In this editor
              you can
            </p>
            <ul>
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
      <div
        className="container mt-5 mb-5 py-5"
        
      >
        <div className="row mt-5">
          <div className="col-lg-7">
            <h1 className="small-title">
              Why use this background remover tool?
            </h1>
            <p className="lead">
              We have done so much work to improve this tool and we strongly
              think it deserves to be bookmarked for later use and here's why
              you should be using this tool
            </p>
            <ul>
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
          <p className="lead mt-2">
            We proudly think we can provide the best background removing service out there. Our AI is built by professional web developers with a huge experience in the industry. 
To see a live of how far the tool can go drag the vertical divider left and right on the image below and see the background being removed
            </p>
        </div>
      </div>
      <h1 className="fw-bolder text-center small-title bg-primary py-4 text-light">
        Getting Creative!
        </h1>
      <div className="container mt-5" style={{ minHeight: "60vh" }}>
        
        <p className="lead text-center px-lg-5">
        After reading the above section about the tool, it's time to be creative and have fun!. There are many ways in which you can benefit from this background eraser tool and here are some examples of what you can do.
        </p>
        <ImageGallery/>
        <p className="lead text-center mt-3 px-lg-5">
        The examples you see above is just to illustrate some ideas of what you can do using this free image background remover tool. You can try any picture you want and see the great outcome.        </p>

        
      </div>
      <hr className="my-5 bg-secondary" />
        <div className="container mt-5 pt-5 mb-5">
            <h1 className="small-title text-center mb-5">
            What They Say About Us!
            </h1>
            <TestimonialSlider/>
        </div>
        <hr className="my-5 text-light" />
    </>
  );
};
