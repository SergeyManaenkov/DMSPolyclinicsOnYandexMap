import balloon from '../templates/balloon.hbs';
import carousellItem from '../templates/carouselItem.hbs';
import reviewList from '../templates/review-list.hbs';
import adreses from './adreses.js';

const container = 'mapContainer';
const center = [55.710574, 37.616943];
const zoom = 13;

const config = {
    container,
    center,
    zoom
};

let yaMap;
let clusterer;
/*
Пример элемента массива адреса

    {
        Metro: 'м.Авиамоторная',
        Address: 'г. Москва 2-ая Кабельная, д.2 стр 37',
        Organization: 'ООО "Скандинавский центр здоровья"',
        Description:{
            Polyclinic:{
                Title:'Поликлиника',
                Phones:`8 (495) 788–18–17
8 (495) 645–00–54
`,
                WorkSchedule:`Пн–Пт 08:00–20:00
Сб 09:00–20:00
`},
            DoctorHome:{
                Title:'Врач на дом',
                Phones:`8 (495) 788–18–17
`,
                WorkSchedule:`Пн–Пт 08:00–11:00
`
            }
        }
    },
*/
//const adreses = adreses;

const formatDate = date => {

    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let sec = date.getSeconds();

    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    if (hours < 10) {
        hours = '0' + hours;
    }

    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    if (sec < 10) {
        sec = '0' + sec;
    }

    return `${yyyy}.${mm}.${dd} ${hours}:${minutes}:${sec}`;
};

// Определяем адрес по координатам (обратное геокодирование).
const getAddressFromCoords = (coords) => {
    return ymaps.geocode(coords).then((res) => {

        let firstGeoObject = res.geoObjects.get(0);

        return firstGeoObject.getAddressLine();

    });
};

// Определяем координаты по адресу
const getCoordsFromAddress = (adress) => {
    return ymaps.geocode(adress).then((res) => {
        // Выбираем первый результат геокодирования.
        debugger;
        let firstGeoObject = res.geoObjects.get(0);
        
        // Координаты геообъекта.
        return firstGeoObject.geometry.getCoordinates();
    });
};

const createBalloonContentLayout = (pointData) => {
    let baloonHTML = balloon(pointData);
    let balloonContentLayout = ymaps.templateLayoutFactory.createClass(baloonHTML);

    return balloonContentLayout;
};

const createPlacemark = (pointData) => {
    let coords = pointData.coords ? pointData.coords : pointData.geometry.getCoordinates();
    let myPlacemark = new ymaps.Placemark(coords, {
        pointData: pointData
    },{
        balloonShadow: false,
        balloonLayout: createBalloonLayout(),
        balloonContentLayout: createBalloonContentLayout(pointData),
        balloonPanelMaxMapArea: 0,
        hideIconOnBalloonOpen: true,
        preset: 'islands#violetIcon',
    });

    return myPlacemark
};

const createBalloonLayout = () => {
    const balloonLayout = ymaps.templateLayoutFactory.createClass(
        '$[[options.contentLayout]]',
        {
            build: function () {
                this.constructor.superclass.build.call(this);

                const baloonEl = this.getParentElement().querySelector('.review-balloon');
                const closeBtn = baloonEl.querySelector('.close');
                const self = this;

                closeBtn.addEventListener('click', (e) => {
                    self.onCloseClick(e);
                });
            },
            onCloseClick: function (e) {
                e.preventDefault();

                this.events.fire('userclose');
            }
        }
    );

    return balloonLayout;
};


const addClickHandlerToMap = () => {
    yaMap.events.add('click', (e) => {
        if (!yaMap.balloon.isOpen()) {
            /*const coords = e.get('coords');
            const adressPromise = getAddressFromCoords(coords);

            adressPromise.then(adress => {
                let pointData = {
                    coords: coords,
                    adress: adress
                };

                openBalloon(pointData);
            });*/
        } else {
            yaMap.balloon.close();
        }
    })
};


const initMap = (config) => {
    yaMap = new ymaps.Map(config.container, {
        center: config.center,
        zoom: config.zoom
    });

    return yaMap;
};


const createItemContentLayout = () => {

    let template = `<h6>{{properties.pointData.data.Organization}}</h6>
                <div class="polyclinic-info">
                    <div class="polyclinic-title">{{properties.pointData.data.Description.Polyclinic.Title}}</div>
                    <div class="polyclinic-phones">
                        {% for phone in properties.pointData.data.Description.Polyclinic.Phones %}
                            {{ phone }}<br>
                        {% endfor %}
                    </div>
                    <div class="polyclinic-title">График:</div>
                    <div class="polyclinic-work-schedule">
                        {% for schedule in properties.pointData.data.Description.Polyclinic.WorkSchedule %}
                            {{ schedule }}<br>
                        {% endfor %}
                    </div>
                </div>`;

    return  ymaps.templateLayoutFactory.createClass(template);
};

const makeClusterer = () => {
    let clusterer = new ymaps.Clusterer({
        preset: 'islands#invertedVioletClusterIcons',
        clusterBalloonContentLayout: 'cluster#balloonCarousel',
        clusterBalloonItemContentLayout: createItemContentLayout(),
        clusterOpenBalloonOnClick: true,
        clusterDisableClickZoom: true,
        clusterHideIconOnBalloonOpen: false,
        geoObjectHideIconOnBalloonOpen: false,
        // Устанавливаем размеры макета контента балуна (в пикселях).
        clusterBalloonContentLayoutWidth: 350,
        clusterBalloonContentLayoutHeight: 200,
    });

    return clusterer
};

const getReviewDataFromForm = (form) => {
    const author = form['author'].value;
    const place = form['place'].value;
    const text = form['text'].value;
    const date = new Date();

    const reviewData = {
        author: author,
        place: place,
        text: text,
        date: date,
        dateString: formatDate(date)
    };

    return reviewData;
};

const mapMaker = () => {
    ymaps.ready(() => {
        yaMap = initMap(config);
        clusterer = makeClusterer();

        addClickHandlerToMap();

        /*const placemarks = [];*/
        adreses.map(function ( pointData ) {
            const coords = getCoordsFromAddress(pointData.Address);
            coords.then(function ( res ) {
            debugger;
                modifyPointData( pointData );
                let newPointData = {
                    coords: res,
                    adress: pointData.Address,
                    data: pointData
                    /*organization: pointData.Organization,
                    description: pointData.Description*/
                };
                const placemark = createPlacemark(newPointData);

                /*addReviewDataToLocalStorage(newPointData);*/
                /*createBalloonContentLayout(newPointData);*/
                /*placemarks.push(placemark);*/
                clusterer.add(placemark);
            })

        });

        /*clusterer.add(placemarks);*/
        yaMap.geoObjects.add(clusterer);
    });
};

function modifyPointData( pointData ) {
    const reg = /[;\n\r]+/g;
    pointData.Description.Polyclinic.Phones = pointData.Description.Polyclinic.Phones.split(reg);
    pointData.Description.Polyclinic.WorkSchedule = pointData.Description.Polyclinic.WorkSchedule.split(reg);
    //pointData.Description.DoctorHome.Phones = pointData.Description.DoctorHome.Phones.split(reg);
    //pointData.Description.DoctorHome.WorkSchedule = pointData.Description.DoctorHome.WorkSchedule.split(reg);
}


mapMaker();



