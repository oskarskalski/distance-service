var express = require('express');

var app = express();
app.use(express.json()); 
app.post('/', function(req, res) {
	let requestBody = req.body;
    let points = requestBody.pick_up_points;
    let userCoordinates = requestBody.user_coordinates
    let result = []
    for(let i in points){
        let point = points[i]
        let distance = calculateDistance(point, userCoordinates)
        const data = {
            pickUpPointName: point.pointName,
            distance: distance
        }
        result.push(data)
    }

    console.log(result)

	res.send(result);
});

const calculateDistance = (x, y) => {
    let lat1 = x.lat
    let lat2 = y.lat
    let lon1 = x.lon
    let lon2 = y.lon

    let dLat = (lat2 - lat1) * Math.PI / 180.0;
    let dLon = (lon2 - lon1) * Math.PI / 180.0;
       
    lat1 = (lat1) * Math.PI / 180.0;
    lat2 = (lat2) * Math.PI / 180.0;
     
    let a = Math.pow(Math.sin(dLat / 2), 2) +
               Math.pow(Math.sin(dLon / 2), 2) *
               Math.cos(lat1) *
               Math.cos(lat2);
    let rad = 6371;
    let c = 2 * Math.asin(Math.sqrt(a));

    return rad * c
}

app.listen(3000, function() {
	console.log('Distance service is listening on port 3000!');
});
