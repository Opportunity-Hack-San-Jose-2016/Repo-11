

$(document).ready(function() {

    var listView = true;

    /* Set a timeout for the result banner's display */
    setTimeout(function() {
        $("#result-banner").slideUp();
        $("#helpBtn").fadeIn();
    }, 700);

    var mapDisplayStatus = {};

    function initMap() {
        var map;
        var bounds = new google.maps.LatLngBounds();
        var mapOptions = {
            mapTypeId: 'roadmap'
        };
        var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
        // var uluru = {lat: 36.398, lng: -122.03};
        var map = new google.maps.Map(document.getElementById('map'), mapOptions);

        var markers = [
            {
                "City": "Newport Beach",
                "Loan Advice": "0",
                "Vietnamese": "0",
                "Legal": "1",
                "Mandarin": "1",
                "State": "CA",
                "Latitude": "33.630611",
                "Organization Name": "Academies for Social Entrepreneurship",
                "Credit Health": "1",
                "Cost": "Traded",
                "Website": "www.academies-se.org",
                "Finance": "0",
                "Marketing": "1",
                "Zip Code": "92660",
                "Phone": "(949) 500-2381",
                "Full Address": "848 Amigos Way, Suite C Newport Beach CA 92660 ",
                "Business Planning": "0",
                "Services": "1",
                "Open Entry": "1",
                "Food and Beverage": "1",
                "Online Tools": "1",
                "Region": "Los Angeles Basin Area",
                "Social Media and Website": "0",
                "Longitude": "-117.877535",
                "Communications": "0",
                "Products": "1",
                "Taxes": "0",
                "Healthcare": "0",
                "Workshops / Training": "1",
                "Operations": "0",
                "Leadership": "1",
                "Bookkeeping and accounting": "0",
                "Computer Skills": "0",
                "Sales": "1",
                "Coaching & Advising": "1",
                "Street": "848 Amigos Way, Suite C",
                "Spanish": "0",
                "Agriculture": "0"
            },
            {
                "City": "Oakland",
                "Loan Advice": "1",
                "Vietnamese": "1",
                "Legal": "0",
                "Mandarin": "0",
                "State": "CA",
                "Latitude": "37.7784791",
                "Organization Name": "AnewAmerica Community Corporation - Oakland",
                "Credit Health": "0",
                "Cost": "Traded",
                "Website": "www.anewamerica.org",
                "Finance": "1",
                "Marketing": "0",
                "Zip Code": "94601",
                "Phone": "(510) 532-5240",
                "Full Address": "1470 Fruitvale Avenue, Suite 5 Oakland CA 94601 ",
                "Business Planning": "1",
                "Services": "1",
                "Open Entry": "0",
                "Food and Beverage": "1",
                "Online Tools": "1",
                "Region": "San Francisco Bay Area",
                "Social Media and Website": "0",
                "Longitude": "-122.2250837",
                "Communications": "0",
                "Products": "1",
                "Taxes": "1",
                "Healthcare": "0",
                "Workshops / Training": "0",
                "Operations": "0",
                "Leadership": "1",
                "Bookkeeping and accounting": "1",
                "Computer Skills": "1",
                "Sales": "1",
                "Coaching & Advising": "1",
                "Street": "1470 Fruitvale Avenue, Suite 5",
                "Spanish": "1",
                "Agriculture": "0"
            },
            {
                "City": "San Jose",
                "Loan Advice": "0",
                "Vietnamese": "1",
                "Legal": "1",
                "Mandarin": "1",
                "State": "CA",
                "Latitude": "37.3411251",
                "Organization Name": "AnewAmerica Community Corporation - San Jose",
                "Credit Health": "1",
                "Cost": "Paid",
                "Website": "www.anewamerica.org",
                "Finance": "0",
                "Marketing": "1",
                "Zip Code": "95112",
                "Phone": "(408) 326-2669",
                "Full Address": "210 North 4th Street, Suite 205 San Jose CA 95112 ",
                "Business Planning": "1",
                "Services": "1",
                "Open Entry": "1",
                "Food and Beverage": "0",
                "Online Tools": "0",
                "Region": "San Francisco Bay Area",
                "Social Media and Website": "0",
                "Longitude": "-121.8895682",
                "Communications": "1",
                "Products": "0",
                "Taxes": "1",
                "Healthcare": "0",
                "Workshops / Training": "0",
                "Operations": "0",
                "Leadership": "1",
                "Bookkeeping and accounting": "1",
                "Computer Skills": "0",
                "Sales": "0",
                "Coaching & Advising": "1",
                "Street": "210 North 4th Street, Suite 205",
                "Spanish": "1",
                "Agriculture": "0"
            },
            {
                "City": "Walnut Creek",
                "Loan Advice": "0",
                "Vietnamese": "1",
                "Legal": "0",
                "Mandarin": "1",
                "State": "CA",
                "Latitude": "37.9309108",
                "Organization Name": "Apoyo Financiero",
                "Credit Health": "1",
                "Cost": "Traded",
                "Website": "www.apoyo-financiero.com",
                "Finance": "0",
                "Marketing": "1",
                "Zip Code": "94597",
                "Phone": "(800) 891-2778",
                "Full Address": "3100 Oak Road, Suite 210 Walnut Creek CA 94597 ",
                "Business Planning": "0",
                "Services": "0",
                "Open Entry": "1",
                "Food and Beverage": "0",
                "Online Tools": "0",
                "Region": "San Francisco Bay Area",
                "Social Media and Website": "0",
                "Longitude": "-122.0583307",
                "Communications": "1",
                "Products": "1",
                "Taxes": "1",
                "Healthcare": "0",
                "Workshops / Training": "0",
                "Operations": "1",
                "Leadership": "0",
                "Bookkeeping and accounting": "0",
                "Computer Skills": "1",
                "Sales": "1",
                "Coaching & Advising": "1",
                "Street": "3100 Oak Road, Suite 210",
                "Spanish": "0",
                "Agriculture": "1"
            }
        ];

        var infoWindow = new google.maps.InfoWindow(), marker, i;

        var infoWindowContent = [];

        for( i = 0; i < markers.length; i++ ) {
            var companyInfo = markers[i];
            infoWindowContent.push(formatContent(companyInfo["Organization Name"], ""));
            var position = new google.maps.LatLng(companyInfo['Latitude'], companyInfo['Longitude']);
            bounds.extend(position);
            marker = new google.maps.Marker({
                position: position,
                map: map,
                title: companyInfo['Organization Name'],
                animation: google.maps.Animation.DROP,
                icon: image
            });

            // Allow each marker to have an info window
            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                    infoWindow.setContent(infoWindowContent[i]);
                    infoWindow.open(map, marker);
                }
            })(marker, i));

            // Automatically center the map fitting all markers on the screen
            map.fitBounds(bounds);
        }

        // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
        var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
            this.setZoom(5);
            google.maps.event.removeListener(boundsListener);
        });
      }

    initMap();

    var offset = 220;
    var duration = 500;
    $(window).scroll(function() {
        if ($(this).scrollTop() > offset) {
            $('.back-to-top').fadeIn(duration);
        } else {
            $('.back-to-top').fadeOut(duration);
        }
    });

    $('.back-to-top').click(function(event) {
        event.preventDefault();

        // Scroll to the top
        $('html, body').animate({scrollTop: 0}, duration);
        return false;
    });
});


function formatContent(companyInfo, content) {
    content = content || '<b>' + companyInfo["Organization Name"] + '</b> is one of the largest corporation in the United States that serves in the ' +
        'technology industry.';

    var contentString = '<div id="content">' +
            '<h3><b>Website: </b>' + companyInfo["Website"] + '</h3>' +
            '<h3><b>Phone: </b>' + companyInfo["Phone"] + '</h3>' +
            '<h3><b>Address: </b>' + companyInfo["Full Address"] + '</h3>' + content

    return contentString;
}