document.addEventListener('DOMContentLoaded', function() {
	
	const el = document.getElementById('scrollbar');
    
    const init = function() {
	    
		let winScroll = document.body.scrollTop || document.documentElement.scrollTop,
			height = document.documentElement.scrollHeight - document.documentElement.clientHeight,
			scrolled = (winScroll / height) * 100;
		
		document.getElementById("scrollbar").style.width = scrolled + "%";
    };
    
    
    init();
    
    el ? window.addEventListener('scroll', init) : false;


}, false);
