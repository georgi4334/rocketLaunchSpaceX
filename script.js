const url = 'https://api.spacexdata.com/v2/rockets';

let arrFuelTons = [];

fetch(url)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        
        data.forEach((element, index) => {
            for (let [key, value] of Object.entries(element)) {
                if (key === 'first_stage') {
                    for (let firstItem in element[key]) {
                        if (firstItem === 'fuel_amount_tons') {
                            arrFuelTons.push(element[key][firstItem]);
                            console.log(element[key][firstItem])
                        }
                    }

                } else if (key === 'second_stage') {
                    for (let secondItem in element[key]) {
                        if (secondItem === 'fuel_amount_tons') {
                            arrFuelTons.push(element[key][secondItem])
                            console.log(element[key][secondItem])
                        }
                    }
                }
            }
        });
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    console.log(arrFuelTons)