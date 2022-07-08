/* object */
$(document).ready(function(){

	$(".ad_close").on("click",function(){
		$(this).parent(".ad").remove();
	})
	$("header button.hamberger").on("click",function(){
		$("html,body").addClass("scroll_none");
		$(".lnb").show();
	})

	$(".lnb .close").on("click",function(){
		if ($(document).outerWidth()>1200){
			$(".lnb .lnb_conts").stop().slideUp(300);
		}else{
			$("html,body").removeClass("scroll_none");
			$(".lnb").hide();
		}
	})

	$("nav .hamberger_b .hamberger").on("mouseover",function(){
		$(".lnb .lnb_conts").slideDown(300);
	})
	
	$('nav').on('mouseleave',function(){
		if ($(document).outerWidth() > 1200){
			$(".lnb .lnb_conts").slideUp(300);
		}
	})

	$(".full_close").on("click",function(){
		$(this).parents(".full_pop").hide();
	})

	$(".tab .tab_list > div").on("click",function(){
		var idx = $(this).index()
		$(this).parent().find('div').removeClass('on');
		$(this).addClass('on');

		$(this).parents('.tab').find('.tab_items >div').removeClass('on')
		$(this).parents('.tab').find('.tab_items >div:eq('+idx+')').addClass('on')
	})

	$(".accodian .acc_btn,.accodian .acc_title").on("click",function(){
		if ($(this).hasClass("on")){
			$(this).removeClass("on");
			$(this).parents(".accodian").find(".acc_btn").removeClass("on");
			$(this).parents(".accodian").find(".acc_conts").stop().slideUp(200)
		}else{
			$(this).parents(".accodians").find(".acc_btn").removeClass("on")
			$(this).parents(".accodians").find(".acc_conts").stop().slideUp(200);
			$(this).addClass("on");
			$(this).parents(".accodian").find(".acc_btn").addClass("on");
			$(this).parents(".accodian").find(".acc_conts").slideDown(200);
			
		}
	})

	$(".checkboxs .all_check input[type=checkbox]").on("change",function(){
		var child = $(this).parents(".checkboxs").find(".check_item input[type=checkbox]");
		if ($(this).prop("checked")){
			child.prop("checked",true);
		}else{
			child.prop("checked",false);
		}
	})
	$(".checkboxs .check_item input[type=checkbox]").on("change",function(){
		var parent = $(this).parents(".checkboxs").find(".all_check input[type=checkbox]");
		var child = $(this).parents(".checkboxs").find(".check_item input[type=checkbox]");
		var flag = true;
		child.each(function(i,v){
			if (!$(v).prop("checked")){
				flag=false;
				return false;
			}
		})
		parent.prop("checked",flag)
	})

	$(window).scroll(function(e) {
		scrollEvent()
	});


	$( window ).resize( function() {
		resizeWindow()
	});

	$('.layer_popup .popup .pop_close').on("click",function(){
		$(this).parents(".layer_popup").removeClass("on");
		$("html,body").removeClass("scroll_none");
	})

	popup();

	$(".btn_totop").on("click",function(){
		$("html").animate({ scrollTop: 0 });
	})
})

//스크롤이벤트
function scrollEvent(){
	var window = $(this).scrollTop();
	if ($(".nav_wrap").length > 0 ){
		var nav = $(".nav_wrap").offset().top;
		var header = $("header").offset().top;
		
		if ($(document).outerWidth() > 1200){
			// pc
			if(nav <= window) {
				$("nav").addClass("fixed");
				$("header").removeClass("fixed");
				$(".wrapper").css({"padding-top":"0"})
			} else {
				$("nav").removeClass("fixed");
			}
		}else{
			// mobile
			if(window > 0) {
				$("header").addClass("fixed");
				$(".wrapper").css({"padding-top":"83px"})
			} else {
				$("header").removeClass("fixed");
				$(".wrapper").css({"padding-top":"0"})
			}
		}
	}

	if ($(".btn_totop").length > 0){
		if(window > 0) {
			$(".btn_totop").show();
		}else{
			$(".btn_totop").hide();
		}
	}
	if ($(document).outerWidth() < 1201) {
		if(window > 0) {
			$(".ad.scroll").show();
		} else {
			$(".ad.scroll").hide();
		}
	}


	

}

//리사이즈 이벤트
function resizeWindow(){
	imgResize()
	popup()
}

function popup() {
    $('.layer_popup .popup').each(function() {
		var popW = $(this).outerWidth();
		var popH = $(this)[0].scrollHeight;
		var winH = $(window).height();
		var winW = $(window).outerWidth();
		$("html,body").addClass("scroll_none");

		if (winW > 760){
			if (popH > winH ) {
				$(this).closest('.layer_popup').addClass('h_full');
				$(this).css({'margin-left': -popW / 2, 'margin-top': '0'});
			} else {
				$(this).closest('.layer_popup').removeClass('h_full');
				$(this).css({'margin-left': -popW / 2, 'margin-top': -popH / 2});
			}
		} else {
			$(this).css({'margin-left': 0, 'margin-top': 0});
		}

    });
}

var XSP = {
	makeConfirmPopup(title,txt,btn,callback){
		var html = "<div class='layer_popup confirm on' layer-type='layer03'>"
		html+="<div class='popup'>"
		html+="<h3 class='pop-tit'>"+title+"</h3>"
		html+="<div class='pop-conts'>" 
		html+="<div class='txt'>"+txt+"</div>"
		html+="<div class='pop-bottom-btns'>"
		html+="<button class='type2 popClose'>취소하기</button>"	
		html+="<button class='step'>"+btn+"</button>"
		html+="</div></div></div>"
                
		$(".wrapper").append(html);
		popup();

		$('.layer-popup.confirm .popup .popClose').on("click",function(){
			$(this).parents(".layer-popup").remove();
		})

		$('.layer-popup.confirm .popup .step').on("click",function(){
			callback();
			$(this).parents(".layer-popup").remove();
		})
	}
}

window.onload = function(){
	$(".img").each(function(){
		var elImg = $(this).find("img");
		if (elImg.outerHeight() < $(this).outerHeight()){
			var mg = ($(this).outerHeight() - elImg.outerHeight())/2;
			elImg.css({"top":mg+"px"})
		}
	})
};

function imgResize(){
	$(".main .img").each(function(){
		var elImg = $(this).find("img");
		if (elImg.outerHeight() < $(this).outerHeight()){
			var mg = ($(this).outerHeight() - elImg.outerHeight())/2;
			elImg.css({"top":mg+"px"})
		}
	})
}
