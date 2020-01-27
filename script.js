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
                            arrFuelTons.push(element[key][firstItem] * 1000);
                            //console.log(element[key][firstItem])
                        }
                    }

                } else if (key === 'second_stage') {
                    for (let secondItem in element[key]) {
                        if (secondItem === 'fuel_amount_tons') {
                            arrFuelTons.push(element[key][secondItem] * 1000)
                            // console.log(element[key][secondItem])
                        }
                    }
                }
            }
        });

        let [rocket1, rocket11, rocket2, rocket22, rocket3, rocket33, rocket4, rocket44] = arrFuelTons;


        const delayRocket1 = ms => new Promise(resolve => setTimeout(resolve, ms));
        const removeRocket1 = ms => new Promise(resolve => setTimeout(resolve, ms));
        
        async function rocketOne(first_stage, second_stage) {
            setTimeout(() => {
                console.log('first stage rocket 1')
                document.querySelector('.rocket1').classList.add('top1');
            }, first_stage)
            await delayRocket1(first_stage + second_stage);
            console.log('second stage rocket 1')
            await removeRocket1(10)
            document.querySelector('.rocket1').remove();
            document.querySelector('.fire1').remove();
            console.log('remove rocket')
            console.log('text for congrats')
        }


        const delayRocket2 = ms => new Promise(resolve => setTimeout(resolve, ms));
        const removeRocket2 = ms => new Promise(resolve => setTimeout(resolve, ms));

        async function rocketTwo(first_stage, second_stage) {
            setTimeout(() => {
                console.log('first stage rocket 2')
            }, first_stage)
            await delayRocket2(first_stage + second_stage);
            console.log('second stage rocket 2')
            await removeRocket2(10)
            console.log('remove rocket')
            console.log('text for congrats')
        }


        const delayRocket3 = ms => new Promise(resolve => setTimeout(resolve, ms));
        const removeRocket3 = ms => new Promise(resolve => setTimeout(resolve, ms));

        async function rocketThree(first_stage, second_stage) {
            setTimeout(() => {
                console.log('first stage rocket 3')
            }, first_stage)
            await delayRocket3(first_stage + second_stage);
            console.log('second stage rocket 3')
            await removeRocket3(10)
            console.log('remove rocket')
            console.log('text for congrats')
        }

        const delayRocket4 = ms => new Promise(resolve => setTimeout(resolve, ms));
        const removeRocket4 = ms => new Promise(resolve => setTimeout(resolve, ms));

        async function rocketFour(first_stage, second_stage) {
            setTimeout(() => {
                console.log('first stage rocket 4')
            }, first_stage)
            await delayRocket4(first_stage + second_stage);
            console.log('second stage rocket 4')
            await removeRocket4(10)
            console.log('remove rocket')
            console.log('text for congrats')
        }

        const launchRocket1 = anime({
            targets: '.first',
            translateY: -650,
            duration: rocket1 + rocket11,
            easing: 'linear',
            update: function (anim) {
                document.querySelector('.infoFirst').innerHTML = Math.round(anim.progress) + '%';
            }
            
        })

        console.log(rocketOne(rocket1, rocket11))
      //  console.log(rocketTwo(rocket2, rocket22))
       // console.log(rocketThree(rocket3, rocket33))
       // console.log(rocketFour(rocket4, rocket44))

console.log(arrFuelTons)
    })
    .catch((error) => {
        console.error('Error:', error);
    });