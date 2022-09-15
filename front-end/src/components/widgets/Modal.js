import { useEffect, useRef } from "react";

export default function Modal({imageUrl}) {
  const myCanvas = useRef();

  useEffect(() => {
    const context = myCanvas.current.getContext("2d");
    const image = new Image();
    image.src =imageUrl;
    image.onload = () => {
      context.drawImage(image, 0, 0, 500, 500);
    };
  }, []);

  return <canvas style={{'backgroundColor':'red'}} ref={myCanvas} width={500} height={500} />;
}
