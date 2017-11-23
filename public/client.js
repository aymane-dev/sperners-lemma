// client-side js
document.addEventListener('DOMContentLoaded', function(){
  var canvas = document.getElementById('mycanvas');
  if(canvas.getContext){
    var ctx = canvas.getContext('2d');
    var h = canvas.height;
    var w = canvas.width;
    
    function drawBase(){
      ctx.beginPath();
      ctx.moveTo(0,h);
      ctx.lineTo(w/2, h-Math.sqrt(3)*h/2);
      ctx.lineTo(w,h);
      ctx.closePath();
      ctx.stroke();
      ctx.save();
    }
    
    function triangulate(res){
      // Usage: Triangulates the base triangle at a given resolution
      // The resolution determines the number of smaller triangles on each side
      var verts = [];
      ctx.clearRect(0,0,w,h);
      ctx.restore();
      var originY = h;
      var side = w/res;
      for(var row = 0; row < res; row++){
        var originX = 0;
        originX += (side/2)*row;
        for(var col = 0; col < res-row; col++){
          var isCornerBottomLeft = (originX == 0 && originY == h) 
          var isCornerBottomRight = (originX+side == w && originY == h)
          var isCornerTop = (originX+side/2 == w/2 && originY == h-Math.sqrt(3)*h/2)
          ctx.beginPath();
          ctx.moveTo(originX, originY);
          if(!isCornerBottomLeft){
            verts.push([originX, originY]);
          }
          ctx.lineTo(originX+side/2, originY-Math.sqrt(3)*side/2);
          if(!isCornerTop){
            verts.push([originX+side/2, originY-Math.sqrt(3)*side/2]);
          }
          ctx.lineTo(originX+side, originY);
          if(!isCornerBottomRight){
            verts.push([originX+side, originY]);
          }
          ctx.closePath();
          ctx.stroke();
          originX += side;
        }
        originY -= Math.sqrt(3)*side/2;
      }
      console.log(verts);
    }

    drawBase();
    
    var resSelect = document.getElementById('resolution');
    
    function changeRes(){
      if(resSelect.value < 2 || resSelect.value > 12){
        console.log('you done messed up')
        return;
      }
      triangulate(resSelect.value);
    }
    
    resSelect.addEventListener('change', changeRes);
    resSelect.addEventListener('click', changeRes);
  }
  else {
    console.log('Doesn\'t support canvas');
  }
})