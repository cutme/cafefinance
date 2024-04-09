import customSelect from 'custom-select';

document.addEventListener('DOMContentLoaded',function() {
        
    const select = document.getElementsByTagName('select');
    const init = function() {

        const cstSel = customSelect(select);
        
        for (let i = 0; i < select.length; i ++) {
            cstSel[i].container.addEventListener('custom-select:open', (e) => { 
                e.target.parentNode.parentNode.style.position = 'relative';
                e.target.parentNode.parentNode.style.zIndex = '15';
            });
            
            cstSel[i].container.addEventListener('custom-select:close', (e) => { 
                e.target.parentNode.parentNode.removeAttribute('style');
            });
            
            cstSel[i].select.addEventListener('change', (e) => { 
                if (cstSel[i].value === '0') {
                    e.target.parentNode.classList.remove('is-active');
                } else {
                    e.target.parentNode.classList.add('is-active');
                }
            });
        }
    };
            
    select ? init() : false;

}, false);