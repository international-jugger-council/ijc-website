// spreadsheet location from url
var SPREADSHEET_KEY = '1Zln1U0aAe0mtd5SxfXATBioMezG4Lg6qcoJzePDksXs';
// API key from the developer console
var API_KEY = 'AIzaSyB3vQlyGRJewsVWhQPisU8rcbfjZ7GTm7E';
// this is an extremely aggressive range. :D
var RANGE = 'A1:ZZ10000'
var spreadsheet_url =  `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_KEY}/values/${RANGE}?key=${API_KEY}`
var spreadsheet_data = [];

/**
 * Get all the data from the spreadsheet!
 * https://docs.google.com/spreadsheets/d/1Zln1U0aAe0mtd5SxfXATBioMezG4Lg6qcoJzePDksXs/edit#gid=0
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
      spreadsheet_data = result.values;
      console.log("collating jersey data...")
      console.log(spreadsheet_data);
      displayJerseys();
    });
}

function colNameToNumber(name) {
  return name.charCodeAt(0) - 65;
}

function displayJerseys() {
  console.log("displaying jerseys...");
  console.log(spreadsheet_data);

  // Add ze markers to ze map.
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
  var jersey_gallery_html = spreadsheet_data.slice(1).map(function(jersey_data, i) {
    // images for things that are or are not to be shown
    var IMAGE_ROOT = '../../img/jersey'

    if (jersey_data[checked_col] == '') {
      // only display jerseys that someone has validated
      return;
    }

    // put it together
    var jersey_html = `<article class="jersey-article">
      <header class="jersey-header">
        <div class="jersey-thumbnail" style="background-image:url(${jersey_data[front_image_col]})"></div>
        <h2 class="jersey-name">${jersey_data[team_col]}, ${jersey_data[country_col]} (${jersey_data[year_col]})</h2>
        <h2 class="jersey-name">designed by ${jersey_data[designer_col]}</h2>
      </header>
    </article>`;
    console.log(jersey_html);

    return jersey_html;
  });

  document.querySelector('#gallery').innerHTML = jersey_gallery_html;
}

getJerseyInfo();