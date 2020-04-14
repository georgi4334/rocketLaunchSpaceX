let spaceContainer = document.querySelector('.space');

const url = 'https://api.spacexdata.com/v2/rockets';

let arrFuelTons = [];
let sortedFuelArr = [];
let biggest = [];

fetch(url)
    .then((response) => {
        return response.json();
    })
    .then((data) => {

        data.forEach((element) => {
            for (let [key] of Object.entries(element)) {
                if (key === 'first_stage') {
                    for (let firstItem in element[key]) {
                        if (firstItem === 'fuel_amount_tons') {
                            arrFuelTons.push(element[key][firstItem] * 1000);
                        }
                    }

                } else if (key === 'second_stage') {
                    for (let secondItem in element[key]) {
                        if (secondItem === 'fuel_amount_tons') {
                            arrFuelTons.push(element[key][secondItem] * 1000)
                        }
                    }
                }
            }
        });

        // multidimensional array - each rocket fuel in separate array
        for (let b = 1; b < arrFuelTons.length; b += 2) {
            biggest.push(arrFuelTons[b - 1] + arrFuelTons[b])
            sortedFuelArr.push([arrFuelTons[b - 1], arrFuelTons[b]])
        }

        //Sum the two stages
        let newArr = []
        for (let k = 0; k < arrFuelTons.length; k += 2) {
            newArr.push(arrFuelTons[k] + arrFuelTons[k + 1])
        }

        //create html elements (rockets)
        for (let i = 0; i < newArr.length; i++) {
            var newDiv = document.createElement('div');
            newDiv.classList.add(`wrapper`);
            newDiv.classList.add(`wrapper${i}`)
            newDiv.innerHTML = `<div class="info info${i}"></div>
                        <div class="rocket r${i}"></div>
                        <div class="fire fire${i}"></div>`;
            spaceContainer.append(newDiv)
        }

        //function for two stages
        const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

        async function rocketOne(first_stage, second_stage, idx) {
            setTimeout(() => {
                document.querySelector(`.r${idx}`).classList.add('top');
            }, first_stage)
            await delay(first_stage + second_stage);
            await delay(10)
            document.querySelector(`.r${idx}`).remove();
            document.querySelector(`.fire${idx}`).remove();
        }

        const promises2 = sortedFuelArr.map((number, index) => {
            return new Promise(resolve => {
                rocketOne(number[0], number[1], index)
                resolve(number)
            });
        })

        //Movement of the rockets
        const promises = newArr.map((number, index) => {
            return new Promise(resolve => {
                anime({
                    targets: `.wrapper${index}`,
                    translateY: -740,
                    duration: number,
                    easing: 'linear',
                    update: function (anim) {
                        document.querySelector(`.info${index}`).innerHTML = Math.round(anim.progress) + '%';
                    }
                })
                anime({
                    targets: '.fire',
                    translateY: 20,
                    duration: 100,
                    loop: true
                })
                resolve(number)
            });
        })
        // //find the timing to text Success ! 
        setTimeout(() => {
            alert('Success!');
            let answer = confirm("Try another launch ?");
            if (answer === true) {
                window.location.reload();
            }
        }, Math.max(...biggest) + 50);
    })

    .catch((error) => {
        console.error('Error:', error);
    });
