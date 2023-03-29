var apiUrl = "https://api.sunrise-sunset.org/json";
var date = new Date();
var lat = 37.7749;
var lng = -122.4194;
var url = "".concat(apiUrl, "?lat=").concat(lat, "&lng=").concat(lng, "&date=").concat(date.toISOString().slice(0, 10));
fetch(url)
    .then(function (response) { return response.json(); })
    .then(function (data) {
    var _a = data.results, sunrise = _a.sunrise, sunset = _a.sunset;
    console.log("Sunrise at ".concat(sunrise, ", Sunset at ").concat(sunset));
})["catch"](function (error) { return console.error(error); });
