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

        let [rocket1, rocket11, rocket2, rocket22, rocket3, rocket33, rocket4, rocket44] = arrFuelTons;



        const delayRocket1 = ms => new Promise(resolve => setTimeout(resolve, ms));
        const removeRocket1 = ms => new Promise(resolve => setTimeout(resolve, ms));

        async function rocketOne(first_stage, second_stage) {
            setTimeout(() => {
                document.querySelector('.rocket1').classList.add('top1');
            }, first_stage)
            await delayRocket1(first_stage + second_stage);
            await removeRocket1(10)
            document.querySelector('.rocket1').remove();
            document.querySelector('.fire1').remove();
        }


        const delayRocket2 = ms => new Promise(resolve => setTimeout(resolve, ms));
        const removeRocket2 = ms => new Promise(resolve => setTimeout(resolve, ms));

        async function rocketTwo(first_stage, second_stage) {
            setTimeout(() => {
                document.querySelector('.rocket2').classList.add('top2');
            }, first_stage)
            await delayRocket2(first_stage + second_stage);
            await removeRocket2(10)
            document.querySelector('.rocket2').remove();
            document.querySelector('.fire2').remove();
        }


        const delayRocket3 = ms => new Promise(resolve => setTimeout(resolve, ms));
        const removeRocket3 = ms => new Promise(resolve => setTimeout(resolve, ms));

        async function rocketThree(first_stage, second_stage) {
            setTimeout(() => {
                document.querySelector('.rocket3').classList.add('top3');
            }, first_stage)
            await delayRocket3(first_stage + second_stage);
            await removeRocket3(10)
            document.querySelector('.rocket3').remove();
            document.querySelector('.fire3').remove();
        }

        const delayRocket4 = ms => new Promise(resolve => setTimeout(resolve, ms));
        const removeRocket4 = ms => new Promise(resolve => setTimeout(resolve, ms));

        async function rocketFour(first_stage, second_stage) {
            setTimeout(() => {
                document.querySelector('.rocket4').classList.add('top4');
            }, first_stage)
            await delayRocket4(first_stage + second_stage);
            await removeRocket4(10)
            document.querySelector('.rocket4').remove();
            document.querySelector('.fire4').remove();
        }

        anime({
            targets: '.first',
            translateY: -650,
            duration: rocket1 + rocket11,
            easing: 'linear',
            update: function (anim) {
                document.querySelector('.infoFirst').innerHTML = Math.round(anim.progress) + '%';
            }
        })
        anime({
            targets: '.second',
            translateY: -650,
            duration: rocket2 + rocket22,
            easing: 'linear',
            update: function (anim) {
                document.querySelector('.infoSecond').innerHTML = Math.round(anim.progress) + '%';
            }

        })
        anime({
            targets: '.third',
            translateY: -650,
            duration: rocket3 + rocket33,
            easing: 'linear',
            update: function (anim) {
                document.querySelector('.infoThird').innerHTML = Math.round(anim.progress) + '%';
            }

        })
        anime({
            targets: '.fourth',
            translateY: -650,
            duration: rocket4 + rocket44,
            easing: 'linear',
            update: function (anim) {
                document.querySelector('.infoFourth').innerHTML = Math.round(anim.progress) + '%';
            }
        })

        anime({
            targets: '.fire',
            translateY: 20,
            duration: 100,
            loop: true
        })

        rocketOne(rocket1, rocket11)
        rocketTwo(rocket2, rocket22)
        rocketThree(rocket3, rocket33)
        rocketFour(rocket4, rocket44)

        //find the timing to text Success ! 
        let biggest = [];
        for (let i = 1; i < arrFuelTons.length; i += 2) {
            biggest.push(arrFuelTons[i - 1] + arrFuelTons[i])
        }
        
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