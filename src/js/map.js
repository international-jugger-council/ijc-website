// spreadsheet location from url
var SPREADSHEET_KEY = '1KHNrKrpunvWNaGVStFhj7Ra2EC_kgK8sZQsxa2yiJuk';
// API key from the developer console
var API_KEY = 'AIzaSyAtjfgtWoGNkp5Uc2XQ7kh3Po3wfXY-R4U';
// this is an extremely aggressive range. :D
var RANGE = 'A1:ZZ10000'
var spreadsheet_url =  `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_KEY}/values/${RANGE}?key=${API_KEY}`
var spreadsheet_data = [];
var num_markers = 0;

/**
 * Get all the data from the spreadsheet!
 * https://docs.google.com/spreadsheets/d/1KHNrKrpunvWNaGVStFhj7Ra2EC_kgK8sZQsxa2yiJuk/edit#gid=0
 * We are looking for a few columns (case-sensitive):
 * Name
 * Latitude
 * Longitude
 * ... whatever else we want to display (nothing for now) ...
 */
function listCentres() {
  fetch(spreadsheet_url).then(function(response) {
      return response.json();
    }).then(function(result) {
      spreadsheet_data = result.values;
      initMap();
    });
}

function initMap() {
  num_markers = 0;

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 3,
    center: {lat: 43.6754782, lng: -79.3481673}
  });

  // Add ze markers to ze map.
  var name_col = spreadsheet_data[0].indexOf('Name');
  var city_col = spreadsheet_data[0].indexOf('City');
  var country_col = spreadsheet_data[0].indexOf('Country');
  var lat_col = spreadsheet_data[0].indexOf('Latitude');
  var lon_col = spreadsheet_data[0].indexOf('Longitude');
  var url_col = spreadsheet_data[0].indexOf('Website');
  var contact_person_col = spreadsheet_data[0].indexOf('Contact Person');
  var contact_method_col = spreadsheet_data[0].indexOf('Contact Method');
  var active_col = spreadsheet_data[0].indexOf('Active?');
  var armored_col = spreadsheet_data[0].indexOf('Armored?');
  var description_col = spreadsheet_data[0].indexOf('Description');
  var markers = spreadsheet_data.slice(1).map(function(club_data, i) {
    console.log(club_data[active_col], club_data[armored_col], club_data[name_col]);
    // images for things that are or are not to be shown
    var IMAGE_ROOT = '../../img/map'

    var image = IMAGE_ROOT + '/skull.png';

    if (club_data[armored_col] == 'TRUE') {
      if (! showArmored) {
        return;
      }
      image = IMAGE_ROOT + '/skull_red.png'
    }

    if (club_data[active_col] != 'TRUE') {
      if (! showInactive) {
        return;
      }
      image = IMAGE_ROOT + '/skull_gray.png'
    }

    // otherwise, make a marker for it
    var info_window_string = `<div id="content">
      <div id="siteNotice"></div>
      <h1 id="firstHeading" class="firstHeading">
        ${club_data[name_col]} : ${club_data[city_col]}, ${club_data[country_col]}
      </h1>
      <div id="bodyContent">`
    if (club_data[url_col] != '') {
      info_window_string += `<p>
            <a href="${club_data[url_col]}">Website</a>
          </p>`;
    }
    if (club_data[armored_col] == 'TRUE') {
      info_window_string += '<p>Armored jugger club</p>'
    }
    if (club_data[contact_person_col] != '' || club_data[contact_method_col] != '') {
      info_window_string += `<p>
            Contact ${club_data[contact_person_col]}`
      if(club_data[contact_method_col] != '') {
        info_window_string += ` via ${club_data[contact_method_col]}
          </p>`
      }
    } else if (club_data[active_col] != 'TRUE') {
      info_window_string += '<p>Inactive</p>'
    } else {
      info_window_string += `<p>
            Contact info unknown
            </p>`
    }
    info_window_string += `<p>
        ${club_data[description_col]}
        </p>
      </div>
      </div>`;

    var infowindow = new google.maps.InfoWindow({
      content: info_window_string
    });

    var marker = new google.maps.Marker({
      position: {lat: parseFloat(club_data[lat_col]), lng: parseFloat(club_data[lon_col])},
      title: club_data[name_col],
      animation: google.maps.Animation.DROP,
      icon: image
    });
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
    num_markers = num_markers + 1;
    document.getElementById("numMarkers").innerHTML = num_markers;

    return marker;
  });

  // strip out null markers before sending it on to avoid pissing off the clusterer
  markers = markers.filter(function(marker) {
    return marker != undefined;
  });

  // Add a marker clusterer to manage the markers.
  var markerCluster = new MarkerClusterer(map, markers,
      {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
}

var showInactive = false;
var showArmored = false;

function setShowInactive() {
  showInactive = document.getElementById("showInactive").checked;
  initMap();
}
function setShowArmored() {
  showArmored = document.getElementById("showArmored").checked;
  initMap();
}
