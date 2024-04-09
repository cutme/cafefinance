document.addEventListener('DOMContentLoaded',function() {

    const download = document.getElementById('download');


	const downloadInit = function() {    	

    	let status = false,
    	    form = download.getElementsByClassName('js-form')[0],
    	    info = download.getElementsByClassName('js-info')[0];
  
    	const action = function(e) {
	    	
	    	let ww = window.innerWidth;

	    	if (ww <= 768) {
		    	
		    	if (status === false) {

					cutme.Helpers.detach(form, download);
		        	status = true;
		        }
	        	
	        } else {
		        if (status === true) {

					cutme.Helpers.detach(form, info);
		        	status = false;
			    }
	        }
	    };
	    
        action();
        
        window.addEventListener('resize', cutme.Helpers.debounce(() => action(), 100, false));
    };
	
	download ? downloadInit() : false;
    
    

}, false);
