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
        let circleArray = [];
        const colorArray = [
            '#385380',
            '#BDD6FF',
            '#70A7FF',
            '#626F85',
            '#5A86CC'
        ];
        const linesColor = 'rgba(255, 255, 255, 1)';
        const canvasBackground = "#00000012";
        const lineThickness = 0.2;
        const amountOfCircles = 200;
        const mouseRange = 200;
        const rangePerStar = 110;
        let canvasWidth = window.innerWidth;
        let canvasHeight = window.innerHeight;

        //window.addEventListener('resize', this.updateWindowDimensions);
        const canvas = canvasRef.current;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        const c = canvas.getContext("2d");

        for (let index = 0; index <= amountOfCircles; index++) {
            var x = (Math.random() * (canvasWidth - radius * 2)) + radius; //need this for the circle to appear fully inside the window.innerwidth
            var y = (Math.random() * (canvasHeight - radius * 2)) + radius;
            /*var dx = (Math.random() - 0.5) * 9;
            var dy = (Math.random() - 0.5) * 9;//this is the speed the amount of px the circle moves in each iteration*/
            var dx = 0.1 - (Math.random() * 0.5);
            var dy = 0.1 - (Math.random() * 0.5);
            var radius = Math.floor(Math.random() * 3) + 1;//random number from 1-3    
            var color = colorArray[Math.floor(Math.random() * colorArray.length)];
            circleArray.push({ x: x, y: y, dx: dx, dy: dy, radius: radius, color: color, minRadius: radius });
        }

        const animate = () => {
            requestAnimationFrame(animate);
            c.clearRect(0, 0, innerWidth, innerHeight);
            c.fillStyle = canvasBackground;
            c.fillRect(0, 0, canvas.width, canvas.height);

            let stars = [];

            circleArray.forEach(thisCircle => {
                //  This secction is to draw the circles per each render
                c.beginPath();
                c.arc(thisCircle.x, thisCircle.y, thisCircle.radius, 0, Math.PI * 2);
                /*c.strokeStyle = thisCircle.color;
                c.stroke();*/
                c.fillStyle = thisCircle.color;
                c.fill();

                //this secction is to re-write the circle position within each circle and the conditionals are for keeping the circles inside the window
                if (thisCircle.x + thisCircle.radius > canvasWidth || thisCircle.x - thisCircle.radius < 0) {
                    thisCircle.dx = -thisCircle.dx;
                }
                if (thisCircle.y + thisCircle.radius > canvasHeight || thisCircle.y - thisCircle.radius < 0) {
                    thisCircle.dy = -thisCircle.dy;
                }
                thisCircle.x += thisCircle.dx;
                thisCircle.y += thisCircle.dy;

                //this secction does a change with the mouse movement
                if (mouse.x != undefined && mouse.y != undefined) {
                    //console.log(`el mouse esta en y: ${mouse.y} y el circulo esta en ${thisCircle.y} por lo que la diferencia es de ${mouse.y - thisCircle.y} cuando debe estar entre -50 y 50`);

                    if (mouse.x - thisCircle.x > -mouseRange && mouse.x - thisCircle.x < mouseRange && mouse.y - thisCircle.y > -mouseRange && mouse.y - thisCircle.y < mouseRange) {
                        //thisCircle.radius < 20 && (thisCircle.radius += 1);
                        stars.push(thisCircle);
                    } else if (thisCircle.radius > thisCircle.minRadius) {
                        //thisCircle.radius-=1;
                    }
                }
            });

            stars.forEach(circle => {
                // todo este for se puede cambiar por un .filter?
                for (let index = 0; index < stars.length; index++) {
                    if (stars[index].x - circle.x > -rangePerStar && stars[index].x - circle.x < rangePerStar && stars[index].y - circle.y > -rangePerStar && stars[index].y - circle.y < rangePerStar) {
                        //  these circles are in range
                        //  linea
                        c.beginPath();
                        c.moveTo(circle.x, circle.y);
                        c.lineTo(stars[index].x, stars[index].y);
                        c.lineWidth = lineThickness;
                        c.strokeStyle = linesColor;
                        c.stroke();
                        c.closePath();
                    }
                }
            });
        };
        animate();
    });

    return <div className="size">
        <canvas ref={canvasRef} onMouseMove={e => mouseMoved(e)} />
        <style jsx>
            {`
            .size{
                width:  100%;
                height: 100%;
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
        c.closePath();


        c.beginPath();
        c.moveTo(40, 300);
        c.lineTo(90, 250);
        c.lineTo(140, 300)
        c.strokeStyle = "blue";
        c.stroke();
        c.closePath();*/

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