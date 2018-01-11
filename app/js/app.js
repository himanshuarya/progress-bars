(function(){
    'use strict';
   
    var client = new HttpClient();
    client.get('http://pb-api.herokuapp.com/bars', function(responseText) {
        var response = JSON.parse(responseText);       
        createProgressBars(response.bars, response.limit);       
    });
    
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
    
})();


