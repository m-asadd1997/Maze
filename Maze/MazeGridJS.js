var cols, rows;
var cellWidth = 80;
var gridder = [];

window.onload = mazeDisplay();

function mazeDisplay(){
    var canvas = document.getElementById("mycanvas");
    var context = canvas.getContext("2d");

    context.fillStyle = "#3b3a38";
    context.fillRect(0,0,1570,770);

    cols = Math.floor(canvas.clientWidth / 43)
    rows = Math.floor(canvas.clientHeight / 43)

    for(let i = 0; i < rows; i++){
        for(let  j = 0; j < cols; j++){
            let cells = new cellInfo(i,j,context);
            gridder.push(cells);
        }
    }

    strokeCells();
}

function strokeCells(){
    for(let i = 0; i < gridder.length; i++){
        gridder[i].display();
    }
}

 function cellInfo(i,j,ctx){
    
     this.i = i;
     this.j = j;
     //-----------  top  right  bottom  left
     this.walls = [ true , true , true , true] 

     this.display = function(){
         var x = this.i * 43;
         var y = this.j * 43;

         ctx.strokeStyle = "white";
         ctx.stroke();
        //top
         if(this.walls[0]){
         ctx.moveTo(x, y);
		 ctx.lineTo(x+43,y);        
         }
         //right
         if(this.walls[1]){
         ctx.moveTo(x+43, y);
		 ctx.lineTo(x+43,y+43);
         }
         //bottom
         if(this.walls[2]){
        ctx.moveTo(x+43, y+43);
		ctx.lineTo(x,y+43);
         }
         //left
        if(this.walls[3]){
         ctx.moveTo(x, y+43);
         ctx.lineTo(x, y);
        }
         
         
     }
 }