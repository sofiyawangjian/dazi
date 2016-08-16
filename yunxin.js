window.onload=function(){
   var box=$(".box")[0];
       animate(box,{height:400},1000,Tween.Back.easeInOut);
   var img1=$("#img1")
   var img2=$("#img2");
   var fenshu=$(".fenshu")[0];
  

   function game(scene){
   	  this.scene=scene;
   	  this.arr=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P",
   	  "Q","R","S","T","U","V","W","X","Y","Z"];
   	  this.num=5;
   	  this.letterimg=[];
      this.letterarr=[];
   	  this.level=1;
   	  this.shengming=10;
   	  this.speed=5;
   	  this.score=0;
   	  this.cw=document.documentElement.clientWidth;
   	  this.ch=document.documentElement.clientHeight;
   	  this.get(this.num);
      this.move();
      this.key();
      this.zt();
      this.jj();
      this.t;

   }

  game.prototype={
     get:function(num){
        if(num==0){return;}
        for(var i=0;i<num;i++){
        	var let=this.arr[Math.floor(Math.random()*this.arr.length)]
        	var img=document.createElement('img')
        	img.src='images/A_Z/'+let+".png";
        	img.style.cssText="position:absolute;left:"+(Math.random()*(this.cw-300)+100)+"px"+";top:"+(Math.random()*(-100))+"px";
        	this.scene.appendChild(img)
          this.letterarr.push(let);
        	this.letterimg.push(img);
        }
},   
     move:function(){
     	var that=this;
      var objshengming=$(".shengming")[0];
          objshengming.innerHTML=that.shengming;
     	that.t=setInterval(function(){
          for(var i=0;i<that.letterimg.length;i++){
          var tops=that.letterimg[i].offsetTop;
          that.letterimg[i].style.top=tops+that.speed+"px";
          if(tops>that.ch-200){
          	 that.scene.removeChild(that.letterimg[i])
          	 that.letterimg.splice(i,1)
             that.letterarr.splice(i,1)
             that.shengming--;
             console.log(that.shengming)
             objshengming.innerHTML=that.shengming;
             if(that.shengming<=0){
                  alert("game over")
                  location.reload();
                }
              }
          }
          if(that.letterimg.length<that.num){
          	that.get(that.num-that.letterimg.length)
          }
     	},200)
 },
     key:function(){
     	var that=this;
     	document.onkeydown=function(e){
     		var ev=e||window.event;
     		var k=String.fromCharCode(ev.keyCode);
     	  for(var i=0;i<that.letterarr.length;i++){
          if(that.letterarr[i]==k){
             that.scene.removeChild(that.letterimg[i])
             that.letterarr.splice(i,1)
             that.letterimg.splice(i,1)
             that.score++;
             fenshu.innerHTML=that.score;
           }
        }
     	}
     },
      zt:function(){
           var that=this;
           var zt=$(".zt");
            zt.click(function(){
                clearInterval(that.t)
            })
      },
      jj:function(){
           var that=this;
           var jj=$(".jj");
           jj.click(function(){
               
               setInterval(setInterval(function(){
          for(var i=0;i<that.letterimg.length;i++){
          var tops=that.letterimg[i].offsetTop;
          that.letterimg[i].style.top=tops+that.speed+"px";
          if(tops>that.ch-200){
             that.scene.removeChild(that.letterimg[i])
             that.letterimg.splice(i,1)
             that.letterarr.splice(i,1)
          }
          }
          if(that.letterimg.length<that.num){
            that.get(that.num-that.letterimg.length)
          }
      },200));
           })
          }

  }
  var scene=document.getElementsByClassName("scene")[0]
  img2.click(function(){
        img1.attr("src","images/123.gif");
        img1[0].style.left=195+"px";
        setTimeout(function(){
        animate(box,{height:0},1000,function(){
        
        new game(scene);
       })
    },3000);
   })


      
}