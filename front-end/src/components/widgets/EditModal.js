import React,{ useEffect, useRef, useState} from 'react'
import UploadImg from '../../assets/upload.png'
import $ from 'jquery'
import { getBackgroundImage } from '../../service/service'
import { successToast, warningToast} from '../../constants/toasts'
import ReactLoading from 'react-loading'
import { BASE_URL } from '../../constants/Endpoints'
import { SketchPicker  } from "react-color";

export const EditModal = ({imageUrl,setShowModal,dimen}) => {
    const fileInput = useRef();
    const selectFile = () => {
        fileInput.current.click();
    }
    // const width = 20;
    const [width,setWidth] = useState(10)
    const widthHalf = width ? width / 2 : 0;
    const cursor = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="%23000000" opacity="0.3" height="${width}" viewBox="0 0 ${width} ${width}" width="${width}"><circle cx="${widthHalf}" cy="${widthHalf}" r="${widthHalf}" fill="%23000000" /></svg>') ${widthHalf} ${widthHalf}, auto`;
    const preview = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="%23000000" opacity="0.3" height="${width}" viewBox="0 0 ${width} ${width}" width="${width}"><circle cx="${widthHalf}" cy="${widthHalf}" r="${widthHalf}" fill="%23000000" /></svg>`;
    const stateRef = useRef();
    stateRef.current = width;

    const myCanvas = useRef();
    let context = null;
    const [toolTab,setToolTab] = useState(false);
    const [zoom,setZoom] = useState(100);
    const [backgroundImages,setBackgroundImages] = useState([]);
    const [backgroundLoading,setBackgroundLoading] = useState(false);
    const [background,setBackground] = useState('');
    const [backgroundColor,setBackgroundColor] = useState('');
    const [backgroundTab,setBackgroundTab] = useState(false)
    const [pickColor,setPickColor] = useState(false)
    const colorList = ['#000','#fff','#C200F2','#C5C5C5','#FA8B5F','#0075D9','#FF9812','#7AEEB2','#F74C32','#2F333A','#C3073F','#11263E','#8862E0','#FF00AA','#07F90E','#224F70']
    var lastX;
var lastY;
var strokeColor="red";
var strokeWidth=width;
var mouseX;
var mouseY;
var canvasOffset=null;
var offsetX=0;
var offsetY=0;
var isMouseDown=false;
var mode="eraser";
const loading = ()=>{
            myCanvas.current.width = 500;
            myCanvas.current.height = 500;
            myCanvas.current.style.width = dimen.width
            myCanvas.current.style.height = dimen.height;
             context = myCanvas.current.getContext("2d");
            var scale_w = dimen.width / 500; // get the scale that matches display size : ;
        context.setTransform(scale_w,0,0,scale_w,0,0);
        const imageObj = new Image();
        imageObj.src =imageUrl;
        
       
    
    
    
        imageObj.onload = () => {
            var imgWidth = imageObj.naturalWidth;
            var screenWidth  = myCanvas.current.width;
            var scaleX = 1;
            if (imgWidth > screenWidth)
                scaleX = screenWidth/imgWidth;
            var imgHeight = imageObj.naturalHeight;
            var screenHeight = myCanvas.current.height;
            var scaleY = 1;
            if (imgHeight > screenHeight)
                scaleY = screenHeight/imgHeight;
            var scale = scaleY;
            if(scaleX < scaleY)
                scale = scaleX;
            if(scale < 1){
                imgHeight = imgHeight*scale;
                imgWidth = imgWidth*scale;          
            }
        
            myCanvas.current.height = imgHeight;
            myCanvas.current.width = imgWidth;
        
            context.drawImage(imageObj, 0, 0, imageObj.naturalWidth, imageObj.naturalHeight, 0,0, imgWidth, imgHeight);
            canvasOffset = $("#canvas").offset();
        offsetX = canvasOffset.left;
        offsetY = canvasOffset.top;
            }
            
        }

    useEffect(() => {
        
        loading()
        
        $("#canvas").on("click",function(e){
            if(isTouchDevice === false){
                console.log("touck")
                handleMouseDown(e);
                handleMouseMove(e,width);
                handleMouseUp(e);
                handleMouseOut(e)
        
            }
        });
        $("#canvas").mousedown(function(e){
            if(isTouchDevice === false){
                handleMouseDown(e);
            }
        });
        $("#canvas").mousemove(function(e){
            if(isTouchDevice === false){
            handleMouseMove(e,width);
            }
        });
        $("#canvas").mouseup(function(e){
            if(isTouchDevice === false){
            handleMouseUp(e);}
            });
        $("#canvas").mouseout(function(e){
            if(isTouchDevice === false){
            handleMouseOut(e);}});
        $("#canvas").bind('touchstart',function(e){
                if (isTouchDevice)  { 
                handleTouchDown(e);
                console.log("first")
            }
            });
        $("#canvas").bind('touchmove',function(e){
                if (isTouchDevice)  { 
                    handleTouchMove(e);
                    console.log("2")
            }
            });
        $("#eraser").click(function(){ mode="eraser"; });

        getBackgrounds();


    }, []);

   async function getBackgrounds(){
    setBackgroundLoading(true);
    const response = await getBackgroundImage();
    console.log(response)
    if(response.response){
        warningToast('Something went wrong! In Loading Background Images')
    }else{
        setBackgroundImages(response.backgroundImages);
    }
    setBackgroundLoading(false);
    }
    var isTouchDevice = 'ontouchstart' in document.documentElement;


    function handleMouseDown(e){
        mouseX=parseInt(e.clientX-offsetX);
        mouseY=parseInt(e.clientY-offsetY);
      
        // Put your mousedown stuff here
        lastX=mouseX;
        lastY=mouseY;
        isMouseDown=true;
      }
      
      
      function handleMouseUp(e){
        mouseX=parseInt(e.clientX-offsetX);
        mouseY=parseInt(e.clientY-offsetY);
      
        // Put your mouseup stuff here
        isMouseDown=false;
      }
      
      
      function handleMouseOut(e){
        mouseX=parseInt(e.clientX-offsetX);
        mouseY=parseInt(e.clientY-offsetY);
      
        // Put your mouseOut stuff here
        isMouseDown=false;
      }
      
      function handleMouseMove(e,cursorWidth){
        
        mouseX=parseInt(e.clientX-offsetX);
        mouseY=parseInt(e.clientY-offsetY);
      
        // Put your mousemove stuff here
        if(isMouseDown){
          context.beginPath();
          if(mode==="pen"){
            context.globalCompositeOperation="source-over";
            context.moveTo(lastX,lastY);
            context.lineTo(mouseX,mouseY);
            context.stroke();     
          }else if(mode ==="eraser"){
            console.log(stateRef.current)
            context.globalCompositeOperation="destination-out";
            context.arc(lastX,lastY,stateRef.current/2,0,Math.PI*2,false);
            context.fill();
          }else{
            
          }
          lastX=mouseX;
          lastY=mouseY;
        }
      }
   

    function zoom_in(){
        
            $("#canvas").css("zoom",`${zoom+20}%`)
            $("#zoom-meter").html(`${zoom+20}%`)
            setZoom(zoom+20); 
            // loading();
            canvasOffset = $("#canvas").offset();
        offsetX = canvasOffset.left;
        offsetY = canvasOffset.top;
        mouseX = 0;
        mouseY = 0;
        lastX = 0;
        lastY = 0;
    }
    function zoom_out(){
        
        $("#canvas").css("zoom",`${zoom-20}%`)
        $("#zoom-meter").html(`${zoom-20}%`)
        setZoom(zoom-20)
        
        canvasOffset = $("#canvas").offset();
        offsetX = canvasOffset.left;
        offsetY = canvasOffset.top;
        mouseX = 0;
        mouseY = 0;
        lastX = 0;
        lastY = 0;
    }

    function handleTouchDown(e){
        console.log(e)
        const touch = e.targetTouches[0];
        mouseX=parseInt(touch.pageX-offsetX);
        mouseY=parseInt(touch.pageY-offsetY);
        console.log(mouseX)
      
        // Put your mousedown stuff here
        lastX=mouseX;
        lastY=mouseY;
        isMouseDown=true;
      }

    function handleTouchMove(e,cursorWidth){
        const touch = e.targetTouches[0];
        mouseX=parseInt(touch.clientX-offsetX);
        mouseY=parseInt(touch.clientY-offsetY);
      
        // Put your mousemove stuff here
        if(isMouseDown){
          context.beginPath();
          if(mode==="pen"){
            context.globalCompositeOperation="source-over";
            context.moveTo(lastX,lastY);
            context.lineTo(mouseX,mouseY);
            context.stroke();     
          }else if(mode === "eraser"){
            console.log(cursorWidth)
            context.globalCompositeOperation="destination-out";
            context.arc(lastX,lastY,stateRef.current/2,0,Math.PI*2,false);
            context.fill();
          }else{

          }
          lastX=mouseX;
          lastY=mouseY;
        }
      }
    
    function change_background(url){
        setBackground(BASE_URL+url);
        setBackgroundColor('');
    }
    function removeBackgrounds(){
        setBackground('');
        setBackgroundColor('');
    }
    
    const onBackgroundImageUpload = (event) => {
        if (event.target.files && event.target.files[0]) {
          setBackground(URL.createObjectURL(event.target.files[0]));
          setBackgroundColor('');
        }
       }

       function change_backgroud_color(e){
        console.log(e)
        setBackgroundColor(e);
        setBackground('');
       }

    function increaseWidth(){
        if(width<100){
            setWidth(width+10);
            console.log(stateRef.current)
        }
    }
    function decreaseWidth(){
        if(width>10){
            setWidth(width-10);
            console.log(stateRef.current)
        }
    }

  return (
    <div className='edit-modal'>
        {/* <img id="preview-img" ref={img_ref} src={imageUrl} height={300} width={300}  alt="" /> */}
        <div className="under-edit-modal container-fluid p-2">
            <div className="row justify-content-between gx-0">
                <div className="col-lg-7 col-md-7 col-sm-12 col-12 px-2 ">
                    {/* Header */}
                    <div className="d-flex justify-content-between mb-3">
                        <button className='btn bg-dark text-light  '  onClick={(e)=>setShowModal(false)}><i className="fa-solid fa-xmark"></i></button>

                        <div className="d-flex justify-content-center">
                            <button className='btn btn-light shadow mx-1'  onClick={zoom_out}><i className="fa-solid fa-minus"></i></button>
                            <button className='btn btn-light shadow mx-1' id='zoom-meter' disabled>100%</button>
                            <button className='btn btn-light shadow mx-1' onClick={zoom_in}><i className="fa-solid fa-plus"></i></button>
                        </div>

                        <div className="d-flex justify-content-center">
                            <button className='btn btn-light shadow mx-1'><i className="fa-solid fa-rotate-left"></i></button>
                            <button className='btn btn-light shadow mx-1'><i className="fa-sharp fa-solid fa-rotate-right"></i></button>
                        </div>
                        
                    </div>

                    

                    <div className='m-auto' id="canvas-parent" >


                        {
                            background === '' && backgroundColor === ''?<canvas style={{cursor}}  id='canvas' ref={myCanvas} width={dimen.width} height={dimen.height} 
                            onMouseDown={(e)=>{if(isTouchDevice === false){
                               handleMouseDown(e);
                               console.log("ondown")
                           }}}
                           onTouchStart={(e)=>{
                               if (isTouchDevice)  { 
                               handleTouchDown(e);
                               console.log("first")
                           }}}
                            >
                           </canvas> :
                           <>
                           {
                            background !== ''?
                            <canvas style={{cursor,'backgroundImage':`url(${background})`,'backgroundSize':'cover'}}  id='canvas' ref={myCanvas} width={dimen.width} height={dimen.height} 
                            onMouseDown={(e)=>{if(isTouchDevice === false){
                                handleMouseDown(e);
                                console.log("ondown")
                            }}}
                            onTouchStart={(e)=>{
                                if (isTouchDevice)  { 
                                handleTouchDown(e);
                                console.log("first")
                            }}}
                            >
                            </canvas> :
                            <>
                            {backgroundColor !== ''? 
                            
                            <canvas style={{cursor,'background':backgroundColor}}   id='canvas' ref={myCanvas} width={dimen.width} height={dimen.height} 
                            onMouseDown={(e)=>{if(isTouchDevice === false){
                                handleMouseDown(e);
                                console.log("ondown")
                            }}}
                            onTouchStart={(e)=>{
                                if (isTouchDevice)  { 
                                handleTouchDown(e);
                                console.log("first")
                            }}}
                            >
                            </canvas>:
                            <></>
                        
                        }
                            
                            </>


                           }
                           </>
                        }
                     
                    </div>
                    
                </div>
                <div className="col-lg-5 col-md-5 col-sm-12 col-12 text-center">
                    <div className="d-flex">
                        <h4 className={!toolTab?`p-3 w-100 text-secondary text-center tool-tab-active tool-tab`:`p-3 w-100 text-secondary text-center tool-tab`} onClick={()=>setToolTab(false)}><i className="fa-solid fa-image"></i> Background</h4>
                        <h4 className={toolTab?`p-3 w-100 text-secondary text-center tool-tab-active tool-tab`:`p-3 w-100 text-secondary text-center tool-tab`} onClick={()=>setToolTab(true)}><i className="fa-solid fa-paintbrush"></i> Erase Tool</h4>
                        
                    </div>
                    {!toolTab?
                        <div className="tool-tab-content text-center" >
                            <div className="d-flex bg-white  p-3 justify-content-center">
                                <button className={!backgroundTab?'btn btn-secondary mx-1 shadow':'btn btn-light mx-1 shadow'} onClick={()=>setBackgroundTab(false)}><i className="far fa-images"></i> Photo</button>
                                <button className={backgroundTab?'btn btn-secondary mx-1 shadow':'btn btn-light mx-1 shadow'} onClick={()=>setBackgroundTab(true)}><i className="fas fa-palette"></i> Color</button>
                            </div>
                            {
                                !backgroundTab?
                                <>
                            <input type="file" style={{ "display": "none" }} ref={fileInput} onChange={(e)=>onBackgroundImageUpload(e)}/>
                            <div className="col-md-12  p-1  text-center py-2">
                                        <div className='bg-secondary p-2 rounded mb-2 btn w-100' onClick={selectFile}>
                                            <img src={UploadImg} className="mx-auto" alt="" /><br />
                                            <small className='text-white'>Choose Background Image</small>
                                        </div>
                                    {
                                        background !== ''?
                                        <button className='w-100 btn btn-secondary ' onClick={removeBackgrounds}> Remove Background</button>:<></>
                                    }
                                    </div>
                                <div className="row gx-0  p-5 justify-content-center" >
                                    

                                    {backgroundLoading?<div className="col-12 text-center"><ReactLoading className='mx-auto' type={"spin"} color={"#f95615"} height={40} width={40} /></div>:<>{
                                        backgroundImages.length > 0 ?backgroundImages.map((e)=><div key={e.id} className="col-md-4 p-1  text-center btn py-2" onClick={() => change_background(e.image)}>
                                        <div className=' p-2 rounded'>
                                        <img src={BASE_URL+e.image} className="w-100 img-fuild" alt="" /><br />
                                        </div>
                                    </div>):<></>
                                    }</>}

                                    
                                    
                            </div>
                            </>:
                            <>
                            <div className="col-md-12  p-1  text-center py-2">
                                        <div className='bg-secondary p-2 rounded mb-2 btn w-100' onClick={()=>setPickColor(true)}>
                                    
                                            <small className='text-white'>Pick Color</small>
                                        </div>
                                    {
                                        background !== ''?
                                        <button className='w-100 btn btn-secondary ' onClick={removeBackgrounds}> Remove Background</button>:<></>
                                    }
                                    {pickColor? <SketchPicker 
          color={backgroundColor}
          onChange={(color) => {
            change_backgroud_color(color.hex);
            
          }}
          onChangeComplete={
                ()=>{
                    setPickColor(false)
                }
          }
        />:<></>}
                                    </div>
                                <div className="row gx-0  p-5 justify-content-center" >
                                    

                                    
                                {colorList.map((e)=>
                                <div key={e} className="col-md-4 p-1  text-center btn py-2" onClick={()=>change_backgroud_color(e)}>
                                        <div className=' p-2 rounded w-100' style={{'backgroundColor':e,'height':'100px'}}  >

                                        </div>
                                    </div>)}
                                   

                                    
                                    
                            </div>
                            </>
                            }

                            
                        </div>:
                        <div className="tool-tab-content p-5">
                            <h6>Adjust Eraser Size</h6>
                            {/* <button id="pen" className='btn btn-secondary' onClick={()=>{mode="pen"; console.log(mode)}}>Pen</button> */}

                            <button className='btn btn-light shadow mx-1'  onClick={decreaseWidth}><i className="fa-solid fa-minus"></i></button>
                            <button className='btn btn-light shadow mx-1'  disabled>{width}%</button>
                            <button className='btn btn-light shadow mx-1'  onClick={increaseWidth}><i className="fa-solid fa-plus"></i></button>
                            <h6 className='mt-3'>Preview</h6>

                            <div className="col-5 p-5 mx-auto mt-1 bg-white  text-center border" style={{'display':'flex','justifyContent':'center','alignItems':'center'}}>
                                    <img src={preview} alt="" />
                            </div>
                        </div>}
                </div>
            </div>
        </div>


    </div>
  )
}
