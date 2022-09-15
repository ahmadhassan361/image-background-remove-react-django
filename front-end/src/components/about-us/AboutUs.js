import React from "react";
import "../../styles/static-page.css";
import { Link } from 'react-router-dom'
export const AboutUs = () => {
  return (
    <div className="pb-5">
      <div className="br-title-section">
        <h1>
          About <span>Us</span>
        </h1>
       
      </div>
      <div className="container my-5">
          <div className="row justify-content-center">
            <div className="col-md-7 shadow rounded p-3 p-lg-5 text-start">
              <h3 className="fw-bold">Who we are?</h3>
              <p
                className="lead p-0"
                style={{ fontSize: "16px", textAlign: "justify" }}
              >
                The Background Remover CC is an online image background remover
                and photo editor software. We help businesses and individuals
                improve images using innovative technology. We used
                knowledge-based techniques and advanced image editing and
                processing methods to create amazing outputs. We have years of
                experience in photo editing, retouching, and artificial
                intelligence technology. Our main goal is to simplify clients’
                workflows to boost productivity and creativity. The background
                remover CC is one of the amazing tools created by{" "}
                <a href="https://optimosweb.com/">Optimos Web</a>
              </p>
              <h3 className="fw-bold mt-2">About The Tool?</h3>
              <p
                className="lead p-0"
                style={{ fontSize: "16px", textAlign: "justify" }}
              >
                The Background Remover CC is a tool based on AI that helps you
                remove the background of any image and replace it with another
                one in a matter of seconds.
                <br />
                Some examples of images it can process:
              </p>
              <ul>
                <li>Product images with white backgrounds</li>
                <li>Images that contain an object</li>
                <li>Images of animals</li>
                <li>Images of people</li>
                <li>Graphic and logo images</li>
              </ul>
              <p
                className="lead p-0"
                style={{ fontSize: "16px", textAlign: "justify" }}
              >
                The list goes on and on, you can process pretty much any image that has a background and the AI will process and get rid of the background right away.
                <br />
If you already a designer or have faced a situation where you need to get a bunch of images done very quickly, you know how frustrating and tough such task can be.
<br />
This tool mainly resolves this problem and it can be used in things like:
              </p>
              <ul>
                <li>Product images to use them for your e-commerce store</li>
                <li>Transparent Images to use them in your YouTube thumbnails</li>
                <li>Create amazing banner ads for your ad campaigns </li>
                <li>Assets to use as a freelancer web or graphic designer</li>
                <li>Other personal & Business stuff</li>
              </ul>
              <p
                className="lead p-0"
                style={{ fontSize: "16px", textAlign: "justify" }}
              >
               The list goes on and on and the really the sky is the limit!
               <br />
              For any questions, suggestions or business corporation feel free to <Link to="/contact">contact us</Link>.
              </p>
            </div>
          </div>
        </div>
    </div>
  );
};
