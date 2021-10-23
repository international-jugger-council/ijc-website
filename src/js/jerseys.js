// spreadsheet location from url
var SPREADSHEET_KEY = '1Zln1U0aAe0mtd5SxfXATBioMezG4Lg6qcoJzePDksXs';
// API key from the developer console
var API_KEY = 'AIzaSyB3vQlyGRJewsVWhQPisU8rcbfjZ7GTm7E';
// this is an extremely aggressive range. :D
var RANGE = "'processed'!A1:ZZ10000"
var spreadsheet_url =  `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_KEY}/values/${RANGE}?key=${API_KEY}`
var spreadsheet_data = [];

/**
 * Get all the data from the spreadsheet!
 * https://docs.google.com/spreadsheets/d/1Zln1U0aAe0mtd5SxfXATBioMezG4Lg6qcoJzePDksXs/edit?resourcekey#gid=1374521399
 * We are looking for a few columns (in order):
 * Timestamp (we throw this away but have to count it)
 * Jersey front picture link
 * Jersey back picture link
 * Team
 * Country
 * Year
 * Designer
 * (etc.) -- not used right now
 * manufacturer
 * style
 * submitter name for photo credit
 */
function getJerseyInfo() {
  fetch(spreadsheet_url).then(function(response) {
      return response.json();
    }).then(function(result) {
      spreadsheet_data = result.values.slice(1); // we slice off the first part, because that is the header column
      displayJerseys();
    });
}

function colNameToNumber(name) {
  return name.charCodeAt(0) - 65;
}

var timestamp_col = colNameToNumber('A');
var front_image_col = colNameToNumber('B');
var rear_image_col = colNameToNumber('C');
var team_col = colNameToNumber('D');
var country_col = colNameToNumber('E');
var year_col = colNameToNumber('F');
var tournament_col = colNameToNumber('G');
var designer_col = colNameToNumber('H');
var etc_col = colNameToNumber('I');
var credit_col = colNameToNumber('J');
var manufacturer_col = colNameToNumber('K');
var cut_col = colNameToNumber('L');
var checked_col = colNameToNumber('M');

var display_controls = document.forms.display_control;

function sort_by_chosen() {
  var sort = display_controls.sort.value;
  if (sort.startsWith('alph')) {
    spreadsheet_data.sort((a,b)=>b[team_col].localeCompare(a[team_col]));
  }
  if (sort.startsWith('country')) {
    spreadsheet_data.sort((a,b)=>b[country_col].localeCompare(a[country_col]));
  }
  if (sort.startsWith('designer')) {
    spreadsheet_data.sort((a,b)=>b[designer_col].localeCompare(a[designer_col]));
  }
  if (sort.startsWith('time')) {
    spreadsheet_data.sort((a,b)=>b[year_col]-a[year_col]);
  }
  if (sort.endsWith('desc')) {
    spreadsheet_data.reverse();
  }
}

function displayJerseys() {
  // sort ze jerseys appropriately
  sort_by_chosen();

  // Add ze jerseys to ze gallery.
  var jersey_gallery_html = spreadsheet_data.slice(1).map(function(jersey_data, i) {

    if (jersey_data[checked_col] == '') {
      // only display jerseys that someone has validated
      return;
    }

    if (jersey_data[front_image_col].endsWith("?usp=sharing")) { // this kind of URL needs to be reformatted to work
      var id_finder = new RegExp('.*/d/(.*?)/view.*');
      var id_front = id_finder.exec(jersey_data[front_image_col])[1];
      var id_rear = id_finder.exec(jersey_data[rear_image_col])[1];
      jersey_data[front_image_col] = "https://drive.google.com/thumbnail?id=" + id_front;
      jersey_data[rear_image_col] = "https://drive.google.com/thumbnail?id=" + id_rear;
    }

    // put it together
    var jersey_html = `<article class="jersey-article">
      <header class="jersey-header">`
    if (display_controls.show.value == 'show_fronts') {
      jersey_html += `
        <div class="jersey-thumbnail" style="background-image:url(${jersey_data[front_image_col]})"></div>`
    } else {
      jersey_html += `
        <div class="jersey-thumbnail" style="background-image:url(${jersey_data[rear_image_col]})"></div>`
    }
    
    jersey_html +=`
        <h2 class="jersey-name">${jersey_data[team_col]}, ${jersey_data[country_col]} (${jersey_data[year_col]})</h2>`
    if (jersey_data[designer_col] != '') {
      jersey_html += `
        <h2 class="jersey-name">designed by ${jersey_data[designer_col]}</h2>`
    } else {
      jersey_html += `<br/>`
    }
    if (jersey_data[credit_col] != '') {
      jersey_html += `
        <h2 class="jersey-name">photo by ${jersey_data[credit_col]}</h2>`
    } else {
      jersey_html += `<br/>`
    }
    jersey_html += `
      </header>
    </article>`;

    return jersey_html;
  });
  document.querySelector('#gallery').innerHTML = jersey_gallery_html.join(' ');
}

getJerseyInfo();