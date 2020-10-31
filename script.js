var body,canvas,context;
var size,scale=10,padding,liquid=[];
window.onload=function(){
  body=document.body;
  canvas=document.createElement("canvas");
  canvas.width=body.clientWidth;
  canvas.height=body.clientHeight;
  body.appendChild(canvas);
  context=canvas.getContext("2d");
  scale=scale+((scale+1)%2);
  size=canvas.height/scale;
  padding=size;
  liquidate();
};
window.onresize=function(){
  canvas.width=body.clientWidth;
  canvas.height=body.clientHeight;
  scale=scale+((scale+1)%2);
  size=canvas.height/scale;
  padding=size;
  liquidate();
};
function r(min=0,max=1)
{
  return min+(Math.random()*max);
}
function generatePoint(x)
{
  var m=canvas.width/2;
  var u=size+padding;
  var p=r(u,m-(u*2));
  if(x=="left")
  {
    return p;
  }
  else if(x=="right")
  {
    return m+p;
  }
  return m;//mid point
}
function liquidate()
{
  var layer=size,start=generatePoint();//middle as start
  var bg=context.createLinearGradient(canvas.width/4,canvas.height/4,3*canvas.width/4,3*canvas.height/4);
  bg.addColorStop(0,"#FFC107");
  bg.addColorStop(1,"#f44336");
  context.beginPath();
  context.lineWidth=2;
  context.strokeStyle="#000000";
  context.shadowColor="#000000";
  context.shadowBlur=10;
  context.fillStyle=bg;
  context.moveTo(start,size);
  var x1,y1,x2,y2,x3,y3,x,cy=0;
  for(let i=0;i<scale-2;i++)
  {
    if(i%2==0)
    {
      x1=generatePoint("right");
      x1=(x1<x3)?x3:x1;
      y1=size+cy;
      liquid.push(new Array(x1,y1));
      context.lineTo(x1,y1);
      x1+=size;
      x2=x1;
      y2=y1+size;
      x3=x2-size;
      y3=y2;
      context.bezierCurveTo(x1,y1,x2,y2,x3,y3);
      cy=y1;
    }
    else
    {
      x1=generatePoint("right");
      x1=(x1<x3)?x1:x3;
      y1=y3;
      liquid.push(new Array(x1,y1));
      context.lineTo(x1,y1);
      x1-=size;
      x2=x1;
      y2=y1+size;
      x3=x2+size;
      y3=y2;
      context.bezierCurveTo(x1,y1,x2,y2,x3,y3);
      cy=y1;
    }
  }
  // context.lineTo(generatePoint("left"),cy+size);
  //done till here
  for(let i=0;i<scale-2;i++)
  {
    if(i%2==0)
    {
      x1=generatePoint("left");
      x1=(x1<x3)?x1:x3;
      y1=y3;
      liquid.push(new Array(x1,y1));
      context.lineTo(x1,y1);
      x1-=size;
      x2=x1;
      y2=y1-size;
      x3=x2+size;
      y3=y2;
      context.bezierCurveTo(x1,y1,x2,y2,x3,y3);
      cy=y1;
    }
    else
    {
      x1=generatePoint("left");
      x1=(x1<x3)?x3:x1;
      y1=cy-size;
      liquid.push(new Array(x1,y1));
      context.lineTo(x1,y1);
      x1+=size;
      x2=x1;
      y2=y1-size;
      x3=x2-size;
      y3=y2;
      context.bezierCurveTo(x1,y1,x2,y2,x3,y3);
      cy=y1;
    }
  }
  context.closePath();
  context.fill();
  context.stroke();
  for(l of liquid)
  {
    console.log(l);
    // mark(l[0],l[1]);
  }
}
function mark(x,y)
{
  context.beginPath();
  context.fillStyle="#FFFFFF";
  context.arc(x,y,5,0,Math.PI*2);
  context.fill();
}
