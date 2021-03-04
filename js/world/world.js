function buildMapDataApi()
{
	const $country_name = $('#country_name');
    const $country_flag = $('#country_flag');
    const $country_cases = $('#country_cases');
    const $country_active = $('#country_active');
    const $country_critical = $('#country_critical');
    const $country_deaths = $('#country_deaths');
    const $country_recovered = $('#country_recovered');
    const $country_todayCases = $('#country_todayCases');
    const $country_todayDeaths = $('#country_todayDeaths');
    const $country_casesPerOneMillion = $('#country_casesPerOneMillion');
    const $country_deathsPerOneMillion = $('#country_deathsPerOneMillion');


    $.ajax({
        type: 'GET',
        url: 'https://corona.lmao.ninja/v2/countries',
        dataType: "json",
        success: function (data) {

            $.each(data, function (i, m) {

                vgg = m.countryInfo.iso2;
                if (vgg == 'US') {
                    $country_name.html(m.country)
                    $country_flag.html('<img src="' + m.countryInfo.flag + '" class="img-fluid mr-3" width="70" />')
                    $country_cases.html(m.cases)
                    $country_active.html(m.active)
                    $country_critical.html(m.critical)
                    $country_deaths.html(m.deaths)
                    $country_recovered.html(m.recovered)
                    $country_todayCases.html(m.todayCases)
                    $country_todayDeaths.html(m.todayDeaths)
                    $country_casesPerOneMillion.html(m.casesPerOneMillion)
                    $country_deathsPerOneMillion.html(m.deathsPerOneMillion)
                }
            })

            sample_data = {};

            $.each(data, function (i, bbb) {
                var objName = bbb.countryInfo.iso2;
                var objValue = bbb.cases;
                sample_data[objName] = objValue;

            });

            const countryData = {};

            for (const [key, value] of Object.entries(sample_data)) {
                countryData[key.toLowerCase()] = value;
            }

            WorldMap(countryData , data);

        }
    });
}


function WorldMap(countryData , data){
	
	$('#continent-map').vectorMap({
		map: 'world_en',
		backgroundColor: null,
		selectedRegions: "us",
		color: '#ddd',
		hoverOpacity: 0.7,
		selectedColor: '#7B6FFF',
		values: countryData,
		scaleColors: ['#f00000', '#000000'],
		normalizeFunction: 'polynomial',



		onRegionClick: function (event, code, region) {

			console.log(code);
			
			vfv = code.toUpperCase();
			$.each(data, function (i, m) {
				vgg = m.countryInfo.iso2;


				if (vfv == vgg) {
					$country_name.html(m.country)
					$country_flag.html('<img src="' + m.countryInfo.flag + '" class="img-fluid mr-3" width="70" />')
					$country_cases.html(m.cases)
					$country_active.html(m.active)
					$country_critical.html(m.critical)
					$country_deaths.html(m.deaths)
					$country_recovered.html(m.recovered)
					$country_todayCases.html(m.todayCases)
					$country_todayDeaths.html(m.todayDeaths)
					$country_casesPerOneMillion.html(m.casesPerOneMillion)
					$country_deathsPerOneMillion.html(m.deathsPerOneMillion)
				}
			})
		},

		onLabelShow: function (event, label, geography) {
			vfv = geography.toUpperCase();
			$.each(data, function (i, m) {
				vgg = m.countryInfo.iso2;

				if (vfv == vgg) {
					label.html('<img src="' + m.countryInfo.flag + '" width="25" class="mr-2 mb-1 " />' + m.country + '<br/> Cases: ' + m.cases + '<br/> Death: ' + m.deaths + '<br/> Active: ' + m.active + '<br/> Recovered ' + m.recovered);
				}
			})
		},

	});
	
}

$(function(){
	
	jQuery('#continentTab').on('click', function(){
		buildMapDataApi();
	});
	
})



