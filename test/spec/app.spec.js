describe('app js', function(){
    
    var mockApiData = {"buttons":[40,6,-7,-49],"bars":[6,81,15,62],"limit":120};
    
    beforeEach(function() {
        var fixture = '<div id="container">' +
                        '<h1 class="title">Progress Bars</h1>' +
                        '<div id="progressBars"></div>' +
                        '<div id="controls">' +
                      '</div>';

        document.body.insertAdjacentHTML(
            'afterbegin', 
            fixture);
    });

    afterEach(function() {
        document.body.removeChild(document.getElementById('container'));
    });

    beforeEach(function() {
        window.progressBars.init(mockApiData);
    });    
      
    it('Number of progress bars should be equal to the length of bars in the api data', function(){  
        var progressBars = document.getElementById('progressBars');
        expect(progressBars.childNodes.length).toEqual(mockApiData.bars.length);
    });
    
    it('Value in each progress bar should be equal to the value of bars in the api data', function(){
        var valuesArr = [];
        var progressBars = document.getElementById('progressBars');
         for(var i=0; i< progressBars.childNodes.length; i++){
            var bar = progressBars.childNodes[i].getElementsByClassName('bar')[0];
            valuesArr.push(bar.value);
        };
        
        expect(valuesArr).toEqual(mockApiData.bars);
    });
    
    it('Percentage width of each progress bar should be equal to the percentage values of bars in the api data', function(){
        var percentWidthArr = [], percentArr = [];
        var progressBars = document.getElementById('progressBars');
        for(var i=0; i< progressBars.childNodes.length; i++){
            var bar = progressBars.childNodes[i].getElementsByClassName('bar')[0];
            percentWidthArr.push(bar.style.width);
        };
        
        var limit = mockApiData.limit;
        mockApiData.bars.forEach(function(value){
            percentArr.push((value/limit)*100 + '%');
        });
        
        expect(percentWidthArr).toEqual(percentArr);
    });
    
    it('Number of options in dropdown should be equal to the length of bars in the api data', function(){  
        var dropdown = document.getElementById('dropdown');
        expect(dropdown.options.length).toEqual(mockApiData.bars.length);
    });
    
    it('Number of control buttons should be equal to the length of buttons in the api data', function(){  
        var buttons = document.getElementById('controls').getElementsByTagName('button');
        expect(buttons.length).toEqual(mockApiData.buttons.length);
    });
    
    it('Label of each control button should be equal to the value of buttons in the api data', function(){
        var valuesArr= [];
        var buttons = document.getElementById('controls').getElementsByTagName('button');
        for(var i=0; i< buttons.length; i++){
           valuesArr.push(parseInt(buttons[i].textContent)); 
        }
        expect(valuesArr).toEqual(mockApiData.buttons);
    });
     
    it('Selected progress bar should increment or decrement according to the label of the clicked button limiting the width of the progress bar to 100% and changing its color to red', function(){
        var buttons = document.getElementById('controls').getElementsByTagName('button');
        var dropdown = document.getElementById('dropdown');        
        for(var i=0; i< dropdown.options.length; i++){
            dropdown.selectedIndex = i;
            var selectedProgressBar = document.getElementById(dropdown.options[dropdown.selectedIndex].value);
            var selectedBar = selectedProgressBar.childNodes[1];            
            var oldValue = selectedBar.value;
            for(var j=0; j< buttons.length; j++){
                buttons[j].click();
                var newValue = oldValue + parseInt(buttons[j].textContent);
                if(newValue < 0){
                    newValue = 0;
                }
                expect(selectedBar.value).toEqual(newValue);
                if(selectedBar.value > mockApiData.limit){
                    expect(selectedBar.style.width).toBe('100%');
                    expect(selectedBar.style.backgroundColor).toBe('red');
                }
                oldValue = newValue;
            }
        }
    });
    
});