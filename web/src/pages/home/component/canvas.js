import React, { useEffect, useRef } from 'react';

export default () => {
    const canvasRef = useRef(null);
    let mouse = {
        x: undefined,
        y: undefined
    };

    const mouseMoved = event => {
        var rect = canvasRef.current.getBoundingClientRect();
        mouse.x = event.clientX - rect.left;
        mouse.y = event.clientY - rect.top;
        //console.log(event);
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const c = canvas.getContext("2d");

        let circleArray = [];
        let colorArray = [
            'red',
            '#385380',
            '#BDD6FF',
            '#70A7FF',
            '#626F85',
            '#5A86CC',
            'orange'
        ];

        for (let index = 0; index <= 40; index++) {
            var x = (Math.random() * (340 - radius * 2)) + radius; //need this for the circle to appear fully inside the window.innerwidth
            var y = (Math.random() * (425 - radius * 2)) + radius;
            var dx = (Math.random() - 0.5) * 9;
            var dy = (Math.random() - 0.5) * 9;//this is the speed the amount of px the circle moves in each iteration
            var radius = Math.floor(Math.random() * 5) + 2;//random number from 2-5    
            var color = colorArray[Math.floor(Math.random() * colorArray.length)];
            circleArray.push({ x: x, y: y, dx: dx, dy: dy, radius: radius, color: color, minRadius: radius });
        }

        const animate = () => {
            requestAnimationFrame(animate);
            c.clearRect(0, 0, innerWidth, innerHeight);
            
            circleArray.map(thisCircle => {
                c.beginPath();
                c.arc(thisCircle.x, thisCircle.y, thisCircle.radius, 0, Math.PI * 2);
                c.strokeStyle = thisCircle.color;
                c.stroke();
                c.fillStyle = thisCircle.color;
                c.fill();

                if (thisCircle.x + thisCircle.radius > 340 || thisCircle.x - thisCircle.radius < 0) {
                    thisCircle.dx = -thisCircle.dx;
                }
                if (thisCircle.y + thisCircle.radius > 425 || thisCircle.y - thisCircle.radius < 0) {
                    thisCircle.dy = -thisCircle.dy;
                }
                thisCircle.x += thisCircle.dx;
                thisCircle.y += thisCircle.dy;
                if (mouse.x != undefined && mouse.y != undefined) {
                    //console.log(`el mouse esta en y: ${mouse.y} y el circulo esta en ${thisCircle.y} por lo que la diferencia es de ${mouse.y - thisCircle.y} cuando debe estar entre -50 y 50`);

                    let mouseRange = 50;
                    if (mouse.x - thisCircle.x > -mouseRange && mouse.x - thisCircle.x < mouseRange && mouse.y - thisCircle.y > -mouseRange && mouse.y - thisCircle.y < mouseRange) {
                        //console.log('entro a la condicional');
                        thisCircle.radius < 20 && (thisCircle.radius += 1);
                    } else if (thisCircle.radius > thisCircle.minRadius) {
                        thisCircle.radius-=1;
                    }
                }
            });
        };
        animate();
    });

    return <div className="width">
        <canvas ref={canvasRef} width={340} height={425} onMouseMove={e => mouseMoved(e)} />
        <style jsx>
            {`
            .width{
                width:  340px;
            }
            `}
        </style>
    </div>
}




/*//  cuadrado
        c.fillStyle = 'green';
        c.fillRect(100, 100, 100, 100);

        //  linea
        c.beginPath();
        c.moveTo(60, 280);
        c.lineTo(60, 350);
        c.lineTo(120, 350);
        c.lineTo(120, 280);
        c.lineTo(60, 280);
        c.strokeStyle = "blue";
        c.stroke();


        c.beginPath();
        c.moveTo(40, 300);
        c.lineTo(90, 250);
        c.lineTo(140, 300)
        c.strokeStyle = "blue";
        c.stroke();*/

/*for (let index = 0; index < 50; index++) {
    let x = Math.random() * window.innerWidth;
    let y = Math.random() * window.innerHeight;

    c.beginPath();
    //c.arc(x,y,radius,start,end);
    //starts at 0 and ends at math.PI*2
    c.arc(x, y, 30, 0, Math.PI * 2);
    c.strokeStyle = "green";
    c.stroke();
}*/