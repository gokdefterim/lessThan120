var countries = [];

var information = ['population', 'area'];

var classes = {
    containerDiv: 'container-div',
    countryCard: 'countr-card',
    cardImage: 'card-image',
    cardText: 'card-text',
    countryName: 'country-name',
    infoTitle: 'info-title'
};

var selectors = {};

Object.keys(classes).forEach(function (key) {
    selectors[key] = '.' + classes[key];
});

function setStyle () {
    $(selectors.myCustomStyleClass).remove();
    
    var font = '<link rel="preconnect" href="https://fonts.googleapis.com">' +
        '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' +
        '<link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;600;800&display=swap" rel="stylesheet">'

    $('head').html(font);

    var css =
    'body' + '{' +
        'background-color: hsl(0, 0%, 98%);' +
        'font-family: "Nunito Sans", sans-serif;' +
    '}' +
    selectors.containerDiv + '{'+
        'display: flex;' +
        'justify-content: space-between;' +
        'width: 1440px;' +
        'margin: 20px auto;' +
        'flex-wrap: wrap;' +
        'gap: 50px;' +
        '}' +
    selectors.countryCard + '{'+
        'width: 320px;' +
        'overflow: hidden;' +
        'border-radius: 5px;' +
        'background-color: hsl(0, 0%, 100%);' +
        'box-shadow: 0px 5px 18px -11px rgba(0,0,0,0.75);' +
        '}' +    
    selectors.cardImage + '{'+
        'width: 320px;' +
        'height: 210px;' +
        'background-size: cover;' +
        'background-position: center;' +
        '}' +   
    selectors.cardText + '{'+
        'width: 320px;' +
        'padding: 25px;' +
        '}'+
    selectors.countryName + '{'+
        'margin-bottom: 30px;' +
        '}' +   
    selectors.infoTitle + '{'+
        'font-weight: 800;' +
        'text-transform: capitalize;' +
        '}';        
    
        $('<style/>').html(css).addClass(classes.myCustomStyleClass).appendTo('head');
}

function setHtml () {
    $(selectors.containerDiv).remove();

    var countriesHtml = '';
    countries.forEach((country) => {
        if((country.population/country.area)<120){

            var infoHtml = '';
            information.forEach((info) => {
                infoHtml+= '<p><span class="'+ classes.infoTitle +'">'+info+': </span>'+ country.population +'</p>'
            })

            countriesHtml+=
            '<div class="'+classes.countryCard+'">'+
                '<div class="'+ classes.cardImage +'" style="background-image: url('+ country.flags.svg +')"></div>'+
                '<div class="'+ classes.cardText +'">'+
                    '<h1 class="'+ classes.countryName+'">'+ country.name.common +'</h1>'+
                    infoHtml +
                    '<p><span class="'+ classes.infoTitle +'">Density: </span>'+ (country.population/country.area).toFixed(2) +'</p>' +
                '</div>'+
            '</div>';
        }
    })

    var myHtml = '<div class="'+ classes.containerDiv +'">' + countriesHtml + '</div>';
    $('<div/>').html(myHtml).appendTo('body');
}

function initialize(){
    setStyle();
    setHtml();
}

fetch('https://restcountries.com/v3.1/all')
  .then((response) => response.json())
  .then((data) => {
    countries = (data)
    initialize()
  });