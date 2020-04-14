$(function(){
	var roll=new Rolling("#sliding")
	roll.init();
})

function Rolling(id){
	this.oDiv=$(id+' .content-l');
	this.itemDiv=$(id+' .item');
	this.liDiv0=$(id);
	this.liDiv=$(id+" .left-point li");
	this.unitHeight=Math.floor(this.itemDiv.height());
	this.num=this.liDiv.length-1;
	this.indexOn=0;
	this.candu=true;

}
Rolling.prototype.init=function(){
	var This=this;
	this.liDiv.click(function(){
		This.indexOn=$(this).index();
		This.move();
	})
	//鼠标滚动
	function onMouseWheel(event) {/*当鼠标滚轮事件发生时，执行一些操作*/
		this.move();
	}
	if (navigator.userAgent.indexOf("Firefoox") != -1) {
		$(window).on('DOMMouseScroll',this.onMouseWheel);
	}else{
		$(window).on('mousewheel',function(event){
			This.throttle(function(){
				This.onMouseWheel(event)
			})
		});
	}
}
//滑动
Rolling.prototype.move=function(){
	if(this.indexOn<0){
		this.indexOn=this.num
	}else if(this.indexOn>this.num){
		this.indexOn=0
	}
	this.liDiv.eq(this.indexOn).addClass("active").siblings().removeClass("active");
	var moveH=this.indexOn*this.unitHeight*-1;
	$(window).unbind('scroll');
	this.oDiv.stop().animate({ marginTop:moveH }, 'slow');
}
//判断上下滑动
Rolling.prototype.onMouseWheel=function(event){
	var ev = event || window.event;
	var down=true;
	if(ev.originalEvent.deltaY<0){
		down=false
	}
	this.indexOn=this.liDiv0.find(".left-point li.active").index();
	if(down){
		this.indexOn++;
	}else{
		this.indexOn--;
	}
	this.move()
	// if(ev.preventDefault){/*FF 和 Chrome*/
	//  	ev.preventDefault();// 阻止默认事件
	// }
	return false;
}
//节流 
Rolling.prototype.throttle=function(callback){
	var This=this;
	if(!this.candu){
		return false;
	}
	this.candu=false;
	var timer=setTimeout(function(){
	  callback && callback()
	  clearTimeout(timer)
	  This.candu=true
	}, 300)
}