(function(){
    'use strict';
    
    function createProgressBars(bars, limit){
        var progressBars = document.getElementById('progressBars');
        
        bars.forEach(function (value, index){
            var percentValue = (value/limit)*100;            
            var progressBar = document.createElement('div');
            progressBar.id = 'progressBar' + (index + 1);
            progressBar.className = 'progress-bar';

            var bar = document.createElement('div');
            bar.className = 'bar';
            bar.style.width = percentValue + '%';

            var label = document.createElement('div');
            label.className = 'progress-bar-label';
            label.innerHTML = value + '/' + limit + ' (' + percentValue.toFixed(0) + '%' + ')';

            progressBar.appendChild(label);
            progressBar.appendChild(bar);            
            progressBars.appendChild(progressBar);            
        });  
    };
    
    function createDropdown(length){
        var controls = document.getElementById('controls');
        var dropdown = document.createElement('select');
        dropdown.className = 'dropdown';
        var container = document.getElementById('container');
        container.appendChild(dropdown);
        for(var i=1; i <= length; i++){
            var item = document.createElement('option');
            item.value = 'progressBar' + i;
            item.innerHTML = 'Progress Bar ' + i; 
            dropdown.appendChild(item);
        }
        controls.appendChild(dropdown);
    };
    
    function createButtons(buttons){
        var controls = document.getElementById('controls');
        buttons.forEach(function (value){
            var button = document.createElement('button');
            button.innerHTML = value > 0 ? ('+' + value) : ('' + value);
            controls.appendChild(button);
        });       
    };
   
    var client = new HttpClient();
    client.get('http://pb-api.herokuapp.com/bars', function(responseText) {
        var response = JSON.parse(responseText);       
        createProgressBars(response.bars, response.limit);
        createDropdown(response.bars.length);
        createButtons(response.buttons);
    });   
    
})();


