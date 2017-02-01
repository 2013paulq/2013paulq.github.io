let fs = require('fs');

let contributions = require('./contributions.json');
let previousContinent, previousCountry, previousCity, previousLatitude, previousLongitude;

// Remove label row
contributions.shift();

let output = contributions.map((contribution, index) =>{
	if (contribution.text.length) {
		let mappedContribution = {};

		let continent = contribution.continent.length ? contribution.continent : previousContinent;

		mappedContribution.continent = continent;
		mappedContribution.country = contribution.country.length ? contribution.country : (continent !== 'Other' ? previousCountry : null);
		mappedContribution.city = (contribution.city !== '-') ? contribution.city : previousCity;
		mappedContribution.latitude = (contribution.city !== "") ? (contribution.latitude ? contribution.latitude : previousLatitude) : null;
		mappedContribution.longitude = (contribution.city !== "") ? (contribution.longitude ? contribution.longitude : previousLongitude) : null;

		mappedContribution.text = contribution.text;
		mappedContribution.index = index;


		previousContinent = mappedContribution.continent;
		previousCountry = mappedContribution.country;
		previousCity = mappedContribution.city;
		previousLatitude = mappedContribution.latitude;
		previousLongitude = mappedContribution.longitude;

		return mappedContribution;
	}
});

output = output.filter(contribution => contribution);

fs.writeFile('output.json', JSON.stringify(output));