(function(window, document){
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
            bar.value = value;
            bar.style.width = percentValue + '%';

            var label = document.createElement('div');
            label.className = 'progress-bar-label';
            label.innerHTML = value + '/' + limit + ' (' + percentValue.toFixed(0) + '%' + ')';

            progressBar.appendChild(label);
            progressBar.appendChild(bar);            
            progressBars.appendChild(progressBar);            
        });  
    }
    
    function createDropdown(length){
        var controls = document.getElementById('controls');
        var dropdown = document.createElement('select');
        dropdown.id = 'dropdown';
        var container = document.getElementById('container');
        container.appendChild(dropdown);
        for(var i=1; i <= length; i++){
            var item = document.createElement('option');
            item.value = 'progressBar' + i;
            item.innerHTML = 'Progress Bar ' + i; 
            dropdown.appendChild(item);
        }
        controls.appendChild(dropdown);
    }

    var changeWidthOfSelectedBar = function(value, limit){
        var dropdown = document.getElementById('dropdown');
        var selectedProgressBar = document.getElementById(dropdown.options[dropdown.selectedIndex].value);
        var selectedBar = selectedProgressBar.childNodes[1];
        
        selectedBar.value += value;
        if(selectedBar.value < 0){
           selectedBar.value = 0;
        } 
        
        var percentValue = (selectedBar.value/limit)*100;             
        if(selectedBar.value > limit){
           selectedBar.style.width = '100%';
           selectedBar.style.backgroundColor = 'red';
        }       
        else{
           selectedBar.style.width = percentValue + '%';
           selectedBar.style.backgroundColor = 'rgb(180, 216, 229)'; 
        }
        
        var label = selectedProgressBar.childNodes[0];
        label.innerHTML = selectedBar.value + '/' + limit + ' (' + percentValue.toFixed(0) + '%' + ')';
    };
    
    function createButtonControls(buttons, limit){
        var controls = document.getElementById('controls');
        buttons.forEach(function (value){
            var button = document.createElement('button');
            button.innerHTML = value > 0 ? ('+' + value) : ('' + value);
            button.type = 'button';
            button.addEventListener('click', function(){changeWidthOfSelectedBar(value, limit);});
            controls.appendChild(button);
        });       
    }
    
    var ProgressBars = function(){};
   
    ProgressBars.prototype.init = function(data){
        createProgressBars(data.bars, data.limit);
        createDropdown(data.bars.length);
        createButtonControls(data.buttons, data.limit);
    };
  
    var progressBars = new ProgressBars();
    window.progressBars = progressBars;
    
})(window, document);

var HttpClient = function() {
    this.get = function(url, callback) {
        var httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function() { 
            if (httpRequest.readyState === 4 && httpRequest.status === 200){
                callback(httpRequest.responseText);
            }
        };
        httpRequest.open( "GET", url, true );            
        httpRequest.send( null );
    };
};
    
var client = new HttpClient();
client.get('http://pb-api.herokuapp.com/bars', function(responseText) {
   var response = JSON.parse(responseText);       
   window.progressBars.init(response);
});


