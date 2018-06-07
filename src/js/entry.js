import balloon from '../templates/balloon.hbs';
import carousellItem from '../templates/carouselItem.hbs';
import reviewList from '../templates/review-list.hbs';

const container = 'mapContainer';
const center = [55.75994488110673, 37.61556310502147];
const zoom = 15;

const config = {
    container,
    center,
    zoom
};

let yaMap;
let clusterer;

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
        let adress;
        let firstGeoObject = res.geoObjects.get(0);

        adress = firstGeoObject.getAddressLine();

        return adress;
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

const carouselItemClick = () => {
    document.body.addEventListener('click', e => {
        if (e.target.classList.contains('carousell-item-link')) {
            e.preventDefault();

            const link = e.target;
            const coords = link.dataset.coords.split(',').map(coordItem => {
                return +coordItem;
            });
            const adress = link.dataset.adress;
            const reviews = window.myStorage.get(adress);

            let pointData = {
                coords,
                adress,
                reviews
            };

            openBalloon(pointData);
        }
    })
};

const openBalloon = (pointData) => {
    yaMap.balloon.open(pointData.coords, pointData, {
        layout: createBalloonLayout(),
        contentLayout: createBalloonContentLayout(pointData),
        closeButton: false
    });
};

const addClickHandlerToMap = () => {
    yaMap.events.add('click', (e) => {
        debugger;
        if (!yaMap.balloon.isOpen()) {
            const coords = e.get('coords');
            const adressPromise = getAddressFromCoords(coords);

            adressPromise.then(adress => {
                let pointData = {
                    coords: coords,
                    adress: adress
                };

                openBalloon(pointData);
            });
        } else {
            yaMap.balloon.close();
        }
    })
};

const addPoint = function ( data ) {
    debugger;
    let myPlacemark = createPlacemark(data);

    clusterer.add(myPlacemark);
};

const initMap = (config) => {
    yaMap = new ymaps.Map(config.container, {
        center: config.center,
        zoom: config.zoom
    });

    return yaMap;
};

const createItemContentLayout = () => {
    return  ymaps.templateLayoutFactory.createClass(
        carousellItem({
            adress: '{{properties.pointData.adress}}',
            coords:'{{properties.pointData.coords}}',
            place: '{{properties.pointData.review.place}}',
            text: '{{properties.pointData.review.text}}',
            date: '{{properties.pointData.review.dateString}}',
        })
    );
};

const makeClusterer = () => {
    let clusterer = new ymaps.Clusterer({
        preset: 'islands#invertedVioletClusterIcons',
        clusterBalloonContentLayout: 'cluster#balloonCarousel',
        clusterBalloonItemContentLayout: createItemContentLayout(),
        clusterOpenBalloonOnClick: true,
        clusterDisableClickZoom: true,
        clusterHideIconOnBalloonOpen: false,
        geoObjectHideIconOnBalloonOpen: false
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

const clearFormFields = form => {
    for (const el of form.elements) {
        if (el.type === 'text' || el.type === 'textarea') {
            el.value = null;
        }
    }
};

const addReviewDataToLocalStorage = (pointData) => {
    if (!window.myStorage) {
        window.myStorage = new Map;
    }

    let storageMap = window.myStorage;
    let key = pointData.adress;

    if (!storageMap.has(key)) {
        storageMap.set(key, [pointData.review])
    } else {
        let reviews = storageMap.get(key);

        reviews.push(pointData.review);
        storageMap.set(key, reviews);
    }
};

const updateReviewList = (listContainer, adress) => {
    const listData = {
        reviews: window.myStorage.get(adress)
    };
    const reviewListHTML = reviewList(listData);

    listContainer.innerHTML = reviewListHTML;
};


const addButtonClickHandler = () => {
    document.body.addEventListener('click', e => {
        if (e.target.classList.contains('add-review-btn')) {
            e.preventDefault();

            const addButton = e.target;
            const pointData = yaMap.balloon.getData();
            const form = addButton.closest('form');
            const reviewListContainer = form.previousElementSibling;
            const reviewData = getReviewDataFromForm(form);
            let newPointData = {
                coords: pointData.coords ? pointData.coords : pointData.geometry.getCoordinates(),
                adress: pointData.adress,
                review: reviewData
            };
            const placemark = createPlacemark(newPointData);

            addReviewDataToLocalStorage(newPointData);

            clusterer.add(placemark);

            clearFormFields(form);

            updateReviewList(reviewListContainer, newPointData.adress);
        }
    })
};

const mapMaker = () => {
    ymaps.ready(() => {
        yaMap = initMap(config);
        clusterer = makeClusterer();

        yaMap.geoObjects.add(clusterer);

        addClickHandlerToMap();
        addButtonClickHandler();
        carouselItemClick();
    });
};



mapMaker();



