$(document).ready(() => {

    const url = 'https://restcountries.eu/rest/v2/name/';
    const $searchButton = $('#searchButton');
    const $searchText = $('#searchText');
    let listJSONResponse;
    let countryQuery;
    console.log('done');
    $searchButton.on('click', () => {
        console.log('You clicked on search');
        countryQuery = $searchText.val();
        console.log(` This is your query : ${countryQuery}`);

        let endpoint = `${url}${countryQuery}`;
        launchCountrySearch(endpoint);


    });
    async function launchCountrySearch(url) {
        try {
            const response = await fetch(url);
            if (response.ok) {
                let jsonResponse = await response.json();
                //console.log(jsonResponse);
                listJSONResponse = jsonResponse;
                cleanCards();
                generateCountryCards(jsonResponse);

            } else {
                cleanCards();
            }
        } catch (error) {
            console.log(error);

        }
    }

    const generateCountryCards = (jsonResponse) => {
        let $cardsContainer = $('#container');
        for (let i = 0; i < jsonResponse.length; i++) {
            console.log(jsonResponse[i]);
            let countryIsoCode = jsonResponse[i]['alpha3Code'];
            let countryName = jsonResponse[i]['name'];
            let countryContainer = $(`<div class='country-card'></div>`);
            let isoCodeTitle = $(`<div class='country-isocode' ></div>`).text(countryIsoCode);
            let countryNameTitle = $(`<div class='country-name'></div>`).text(countryName);
            let countryDetails = $(`<div class='country-details'></div>`);
            let countryFlag = $(`<img src='${jsonResponse[i]['flag']}' />`);

            countryDetails.append(`<ul id='detail-list-${i}'></ul>`);
            //let countryDetailList = $(`#detail-list-${i}`);
            let nativeName = `<li><strong>Native Name : </strong>${jsonResponse[i]['nativeName']}</li>`;
            let capital = `<li><strong>Capital : </strong>${jsonResponse[i]['capital']}</li>`;
            let population = `<li><strong>Population : </strong>${jsonResponse[i]['population']}</li>`;
            let langArray = jsonResponse[i]['languages'];
            let langList = [];
            for (let i = 0; i < langArray.length; i++) {
                langList.push(langArray[i]['name']);
            }
            let languages = `<li><strong>Languages : </strong>${langList.join(', ')}</li>`;
            let timeZones = `<li><strong>Time Zones : </strong>${jsonResponse[i]['timezones'].join(', ')}</li>`;
            let currArray = jsonResponse[i]['currencies'];
            let currList = [];
            for (let i = 0; i < currArray.length; i++) {
                currList.push(currArray[i]['name']);
            }
            let currency = `<li><strong>Currencies : </strong>${currList}</li>`;
            let borderCountries = `<li><strong>Border Countries : </strong>${jsonResponse[i]['borders'].join(', ')}</li>`;
            countryDetails.append(countryFlag);
            countryDetails.append(nativeName);
            countryDetails.append(capital);
            countryDetails.append(population);
            countryDetails.append(languages);
            countryDetails.append(timeZones);
            countryDetails.append(currency);
            countryDetails.append(borderCountries);
            //console.log(countryDetailList);


            //countryDetails.append(countryDetailList);
            let countryMini = $(`<div class='country-mini-card'></div>`);
            countryMini.append(isoCodeTitle);
            countryMini.append(countryNameTitle);
            countryContainer.append(countryMini);
            countryContainer.append(countryDetails);

            //console.log(countryDetails);
            $cardsContainer.append(countryContainer);
        }
    }
    const cleanCards = () => {
        let $cardsContainer = $('#container');
        $cardsContainer.empty();
    }

    $('#container').on('click', '.country-card', (event) => {
        //console.log('click on country-card');
        //let isoCode = $(event.currentTarget).find('.country-isocode').attr('data-id');
        //console.log(listJSONResponse[isoCode]);
    });

});