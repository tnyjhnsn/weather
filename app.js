$(document).ready(function() {
  createWeatherReport();
 });

function createWeatherReport() {

	var url = 'http://ip-api.com/json';

	$.getJSON(url, function(location) {
		var geoData = {
			latitude: location.lat,
			longitude: location.lon,
			city: location.city
		};
	getWeatherData(geoData);
	});
}

function getWeatherData(geoData) {

	var url = "https://api.forecast.io/forecast/b619fe019a34260ef2552946d9862a55/" +
		geoData.latitude + "," + geoData.longitude + "?callback=?";

	$("#city").html(geoData.city);

	$.getJSON(url, function(weather) {
		var currentWeather = weather.currently;

		setIcon(currentWeather.icon);
		setTemperature(currentWeather.temperature);
		$("#summary").html(currentWeather.summary);

		if (weather.hasOwnProperty("minutely")) {
			$("#detail").html(weather.minutely.summary);
		} else {
			$("#detail").html(weather.hourly.summary);
		}

		$("#temperature").click(function() {
		    $(this).attr("unit", function(i, origValue) {
        		return origValue === "f" ? "c" : "f";
   			});
   			setTemperature(currentWeather.temperature);
		});
	});
}

// properties with '-' must be enclosed with quotes
function setIcon(condition) {
	var icons = {
		"clear-day": ["day-sunny", "https://s19.postimg.org/tnu3pf8f7/clear-day.jpg", "#FFFFFF"],
		"clear-night": ["night-clear", "https://s19.postimg.org/70euj9sv7/clear-night.jpg", "#FFFFFF"],
		rain: ["rain", "https://s19.postimg.org/r1j6m86lf/rain.jpg", "#FFFFFF"],
		snow: ["snow", "https://s19.postimg.org/sj01k1lyb/snow.jpg", "#000000"],
		sleet: ["sleet", "https://s19.postimg.org/sj01k1lyb/snow.jpg", "#000000"],
		wind: ["strong-wind", "https://s19.postimg.org/yp1hqsfvn/wind.jpg", "#FFFFFF"],
		fog: ["fog", "https://s19.postimg.org/og90kyrtv/fog.jpg", "#FFFFFF"],
		cloudy: ["cloudy", "https://s19.postimg.org/ith918eoz/cloudy-day.jpg", "#FFFFFF"],
		"partly-cloudy-day": ["day-cloudy", "https://s19.postimg.org/ith918eoz/cloudy-day.jpg", "#FFFFFF"],
		"partly-cloudy-night": ["night-cloudy", "https://s19.postimg.org/svw13ytlv/cloudy-night.jpg", "#FFFFFF"],
		hail: ["hail", "https://s19.postimg.org/izqcqkyg3/hail.jpg", "#FFFFFF"],
		thunderstorm: ["thunderstorm", "https://s19.postimg.org/s2jfbcnkz/thunderstorm.jpg", "#FFFFFF"],
		tornado: ["tornado", "https://s19.postimg.org/r2t4fn8f7/tornado.jpg", "#FFFFFF"]
	}
	$("i").attr('class', "wi wi-" + icons[condition][0]);
  $("#icon").css("background-image", "url(" + icons[condition][1] + ")");
  $("#icon").css("color", icons[condition][2]);
}

function setTemperature(val) {
	var temperature = val;
	var unit = "";
	switch ($("#temperature").attr("unit")) {
		case "f":
			unit = "F";
			break;
		case "c":
			temperature = (val - 32) / 1.8;
			unit = "C";
	}
	$("#temperature").html(Math.round(temperature) +
		"&#176" + "<span style='font-size:0.5em;'>" + unit + "</span>");
}
