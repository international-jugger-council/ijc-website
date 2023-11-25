
const SPREADSHEET_KEY = '1YA6h52-0mp1_pn_Jrm9J580Um7aDbfZ6LnKqGfQitY0';
// API key from the developer console
const API_KEY = 'AIzaSyBzSWqQlZi8lmL-UqZ3BT-VHxriRxA1R1c';
const RANGE = "A:G"
const spreadsheet_url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_KEY}/values/${RANGE}?key=${API_KEY}`
let spreadsheet_data = [];

function getCoaches() {
  fetch(spreadsheet_url).then(function(response) {
      return response.json();
    }).then(function(result) {
      spreadsheet_data = result.values.slice(1); // we slice off the first part, because that is the header column
      displayCoaches();
    });
}

function displayCoaches() {
  const coachingContainer = document.getElementById('our_coaches')
  if(!coachingContainer) {
    console.error('No coaching container found \n Add a div with id="coaches" to the page')
    return
  }
  coachingContainer.classList.add('loading')

  for (coach of spreadsheet_data) {
    // first element is the timestamp, which we don't need
    const coachObject = createCoachObject(...coach.splice(1))
    const coachCard = `
    <div class="column p-3 is-half-tablet is-one-third-desktop is-one-quarter-widescreen">
      <div class="card">
        <div class="card-image">
            <figure class="image is-4by3 m-2 ">
                <img loading="lazy" src="${coachObject.photo}" alt="${coachObject.name} photo">
            </figure>
        </div>
        <div class="card-content">
            <div class="media">
                <div class="media-content">
                    <p class="title is-4">${coachObject.name}</p>
                    <p class="subtitle is-6 mb-2">Languages: ${coachObject.languages}</p>
                </div>
            </div>
            <div class="content">
                <p class="mb-2">Specializes in:</p>
                ${createSpecializationTags(coachObject.specialities)}
            </div>
        </div>
            <div class="card-footer is-justify-content-flex-end">
            <a class="column is-flex button is-text is-full" onclick="Calendly.initPopupWidget({url: ${coach.schedule}});return false;">Schedule time with me</a>
        </div>
      </div>
    </div>`
    coachingContainer.innerHTML += sanitizeInput(coachCard, true)
  }
  coachingContainer.classList.remove('loading')
}

function createCoachObject(photo, name, specialities, languages, _, schedule) {
  return {
    photo: sanitizeInput(`https://drive.google.com/uc?export=view&id=${photo.split('id=')[1]}`),
    name: sanitizeInput(`${name}`),
    languages: languages,
    specialities: specialities.split(', '),
    schedule: sanitizeInput(schedule)
  }
}

function createSpecializationTags (specialities) {
  return specialities.map(speciality => `<span class="tag is-primary mr-1 mb-1">${speciality}</span>`).join('')
}

function sanitizeInput (input, allowTags = false) {
  if(allowTags) {
    return DOMPurify.sanitize(input)
  }
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTRIBUTES: []
  })
}

getCoaches()