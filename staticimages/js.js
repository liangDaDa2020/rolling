$(function(){
	sliding("#sliding");
	function sliding(obj){
		var oDiv = $(obj+' .content-l');
		var itemDiv=$(obj+' .item');
		var unitHeight=Math.floor(itemDiv.height());
		var liDiv=$(obj+" .left-point li")
		var num=liDiv.length;
		num=num-1;
	
		function move(indexOn){
			if(indexOn<0){
				indexOn=num
			}else if(indexOn>num){
				indexOn=0
			}
			liDiv.eq(indexOn).addClass("active").siblings().removeClass("active");
			var moveH=indexOn*unitHeight*-1;
			$(window).unbind('scroll');
			oDiv.stop().animate({ marginTop:moveH }, 'slow');
		}
		liDiv.click(function(){
			console.log("adfdfh")
			var index=$(this).index();
			move(index);
		})
		//鼠标滚动
		function onMouseWheel(event) {/*当鼠标滚轮事件发生时，执行一些操作*/
			var ev = event || window.event;
			var down=true
			if(event.originalEvent.deltaY<0){
				down=false
			}
			var indexOn=$(obj+" .left-point li.active").index();
			if(down){
				indexOn++;
			}else{
				indexOn--;
			}
			move(indexOn)
			// if(ev.preventDefault){/*FF 和 Chrome*/
			//  	ev.preventDefault();// 阻止默认事件
			// }
			return false;
		}
		//节流
		var candu=true;
		function throttle (callback, time) {
		  if(!candu){
			return false;
		  }
		  candu=false;
		  timer=setTimeout(function(){
			  callback && callback()
			  clearTimeout(timer)
			  candu=true
		  }, time || 300)
		}
		if (navigator.userAgent.indexOf("Firefoox") != -1) {
			$(window).on('DOMMouseScroll',onMouseWheel);
		}else{
			$(window).on('mousewheel',function(event){
				throttle(function(){
					onMouseWheel(event)
				},500)
			});
		}
	
	}
})
