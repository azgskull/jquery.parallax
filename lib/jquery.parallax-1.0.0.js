function Parallax() {
	$('[data-speedy]').each(function() {
		var smothScrolling = false;
		var LastY = 0;
		var Obj = $(this);
			Obj.speedY = Obj.data("speedy");
			Obj.Pos = {
				'x' : 0,
				'y' : 0
			};

			Obj.setPos = function(x,y) {
				Obj.css({
					'transform' : 'translate('+x+'px ,'+y+'px)',
				})
			};
			Obj.onScreen = function() {
				
				var ObjHeight = Obj.innerHeight();
				var ScrollTop = $(window).scrollTop();
				var WindowHeight = $(window).height();
				
				//checking if visible
				if(Obj.offset().top - ScrollTop < WindowHeight && (Obj.offset().top - ScrollTop + ObjHeight > 0))
					return true;
				else
					return false;
			}

		$(window).on('scroll', function() {
			if(!Obj.onScreen()){
				LastY = $(this).scrollTop();
				return false;
			}

			var direction = 1;
			var step = $(this).scrollTop() - LastY;
			
			if($(this).scrollTop() > LastY)
				direction = -1;
			
			Obj.Pos.y -= Obj.speedY * step;
			Obj.setPos(Obj.Pos.x,Obj.Pos.y);
			//saving last
			LastY = $(this).scrollTop();
		});
	})
}