import balloon from '../templates/balloon.hbs';
import carousellItem from '../templates/carouselItem.hbs';
import reviewList from '../templates/review-list.hbs';

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
const adreses = [
        {
            Metro: 'м.Авиамоторная',
            Address: '2-ая Кабельная, д.2 стр 37',
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

        {
            Metro: 'м.Автозаводская',
            Address: '1-й Кожуховский проезд, д.9',
            Organization: 'ООО "Поликлиника.ру"',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 925–88–78
`,
                    WorkSchedule:`Пн–Пт 09:00–22:00
Сб 09:00–21:00
Вс 09:00–21:00
`},
                DoctorHome:{
                    Title:'Врач на дом',
                    Phones:`8 (495) 925–88–78
`,
                    WorkSchedule:`Пн–Сб 09:00–12:00
`
                }
            }
        },

        {
            Metro: 'м.Академика Янгеля',
            Address: 'Дорожная, д.32 корп.1',
            Organization: 'ООО "ПОЛИКЛИНИКА. РУ"',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 925–88–78
`,
                    WorkSchedule:`Пн–Пт 09:00–21:00
Сб 09:00–21:00
Вс 09:00–18:00
`},
                DoctorHome:{
                    Title:'Врач на дом',
                    Phones:`8 (495) 925–88–78
`,
                    WorkSchedule:`Пн–Сб 09:00–12:00
`
                }
            }
        },

        {
            Metro: 'м.Китай-город',
            Address: 'Б.Черкасский переулок, д.13/14 корп.3',
            Organization: 'ЗАО "КООПВНЕШТОРГ"',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 229–04–98
8 (495) 625–79–60
8 (495) 625–91–78
`,
                    WorkSchedule:`Пн–Пт 08:00–21:00
Сб 09:00–15:00
`},
                DoctorHome:{
                    Title:'Врач на дом',
                    Phones:`8 (495) 627–06–15
8 (499) 229–04–98
`,
                    WorkSchedule:`Пн–Пт 09:00–12:00
`
                }
            }
        },

        {
            Metro: 'м.Красные ворота',
            Address: 'Новая Басманная, д.10, корп.1, под. 6',
            Organization: 'ООО "Дирекция"',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 925–88–78
`,
                    WorkSchedule:`Пн–Пт 09:00–21:00
Сб 09:00–21:00
Вс 09:00–21:00
`},
                DoctorHome:{
                    Title:'Врач на дом',
                    Phones:`8 (495) 925–88–78
`,
                    WorkSchedule:`Пн–Сб 09:04–12:00
`
                }
            }
        },

        {
            Metro: 'м.Ленинский проспект',
            Address: 'Ленинский проспект, д.37',
            Organization: 'Медицинское учреждение "Поликлиника Федерации Независимых Профсоюзов России"',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 952–42–45
8 (495) 958–05–49
`,
                    WorkSchedule:`Пн–Пт 08:00–21:00
Сб 09:00–16:00
`},
                DoctorHome:{
                    Title:'Врач на дом',
                    Phones:`8 (495) 958–00–24
`,
                    WorkSchedule:`Пн–Пт 08:00–12:00
Сб 09:00–11:00
`
                }
            }
        },

        {
            Metro: 'м.Парк Культуры',
            Address: 'Тимура Фрунзе, д.15 корп.1',
            Organization: 'ООО "Лечебный центр"',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 786–45–22
`,
                    WorkSchedule:`Пн–Пт 08:00–20:00
Сб 09:00–15:00
`},
                DoctorHome:{
                    Title:'Врач на дом',
                    Phones:`8 (495) 786–45–21
`,
                    WorkSchedule:`Пн–Пт 08:00–17:00
Сб 08:00–12:00
Вс 08:00–12:00
`
                }
            }
        },

        {
            Metro: 'м.Площадь Ильича',
            Address: 'Международная, д.19',
            Organization: 'АО "Поликлиника "Медросконтракт"',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 678–90–01
8 (495) 671–50–72
8 (495) 671–50–73
`,
                    WorkSchedule:`Пн–Пт 08:00–20:00
Сб 09:00–16:00
`},
                DoctorHome:{
                    Title:'Врач на дом',
                    Phones:`8 (495) 671–16–84
8 (495) 911–47–06
`,
                    WorkSchedule:`Пн–Пт 08:00–16:00
Сб 09:00–14:00
`
                }
            }
        },

        {
            Metro: 'м.Профсоюзная',
            Address: 'Кржижановского, д.24/35',
            Organization: 'ФГБУ "Лечебно-реабилитационный клинический центр" Министерства обороны Российской Федерации',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (499) 723–07–61
`,
                    WorkSchedule:`Пн–Пт 08:00–20:00
Сб 08:00–14:00
`},
                DoctorHome:{
                    Title:'Врач на дом',
                    Phones:`8 (499) 129–23–96
`,
                    WorkSchedule:`Пн–Пт 08:30–12:00
`
                }
            }
        },

        {
            Metro: 'м.Савеловская',
            Address: 'Сущевский вал, д.12',
            Organization: 'ООО "Клиника ЛМС" на Сущевском валу',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 782–88–82
`,
                    WorkSchedule:`ежед. 08:00–21:00
`},
                DoctorHome:{
                    Title:'Врач на дом',
                    Phones:`8 (495) 782–88–82
`,
                    WorkSchedule:`ежед. 08:00–15:00
`
                }
            }
        },

        {
            Metro: 'м.Смоленская',
            Address: '1-й Смоленский переулок, д.17 стр.3',
            Organization: 'ООО "Поликлиника.ру на Смоленской"',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 925–88–78
`,
                    WorkSchedule:`Пн–Пт 09:00–21:00
Сб 09:00–21:00
Вс 09:00–21:00
`},
                DoctorHome:{
                    Title:'Врач на дом',
                    Phones:`8 (495) 925–88–78
`,
                    WorkSchedule:`Пн–Сб 09:00–12:00
`
                }
            }
        },

        {
            Metro: 'м.Сухаревская',
            Address: 'Последний пер., д.28',
            Organization: 'ООО "Клиника ЛМС" в Последнем переулке',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 782–88–82
`,
                    WorkSchedule:`Пн–Пт 08:00–21:00
Сб 08:00–21:00
Вс 08:00–21:00
`},
                DoctorHome:{
                    Title:'Врач на дом',
                    Phones:`8 (495) 782–88–82
`,
                    WorkSchedule:`ежед. 08:00–15:00
`
                }
            }
        },

        {
            Metro: 'м.Таганская',
            Address: 'Таганская, д.32/1 стр.17',
            Organization: 'ООО "Поликлиника.ру на Таганской" "Зуб.ру"',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 925–88–78
`,
                    WorkSchedule:`Пн–Пт 09:00–21:00
Сб 09:00–21:00
Вс 09:00–21:00
`},
                DoctorHome:{
                    Title:'Врач на дом',
                    Phones:`8 (495) 925–88–78
`,
                    WorkSchedule:`Пн–Сб 09:00–12:00
`
                }
            }
        },

        {
            Metro: 'м.Таганская',
            Address: 'Нижегородская, д.28',
            Organization: 'Филиал Федерального бюджетного лечебно-профилактического учреждения "Лечебно-реабилитационный центр "Подмосковье" Федеральной налоговой службы',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 670–60–64
8 (495) 670–35–04
`,
                    WorkSchedule:`Пн–Пт 08:00–20:00
`},
                DoctorHome:{
                    Title:'Врач на дом',
                    Phones:`8 (495) 670–59–20
`,
                    WorkSchedule:`Пн–Пт 08:00–20:00
`
                }
            }
        },

        {
            Metro: 'м.Тургеневская',
            Address: 'Сретенский бульвар, д.6/1 корп.2',
            Organization: 'ФГБУЗ Поликлиника № 1 Российской академии наук',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 137–74–03
`,
                    WorkSchedule:`Пн–Пт 08:00–20:00
Сб 09:00–14:00
`},
                DoctorHome:{
                    Title:'Врач на дом',
                    Phones:`8 (495) 625–85–95
`,
                    WorkSchedule:`Пн–Пт 08:00–14:00
`
                }
            }
        },

        {
            Metro: 'м.Фрунзенская',
            Address: 'Комсомольский пр-т, д.28',
            Organization: 'ООО "Клиника ЛМС"',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 782–88–82
`,
                    WorkSchedule:`ежед. 08:00–21:00
`},
                DoctorHome:{
                    Title:'Врач на дом',
                    Phones:`8 (495) 782–88–82
`,
                    WorkSchedule:`ежед. 08:00–15:00
`
                }
            }
        },

        {
            Metro: 'м.Фрунзенская',
            Address: 'Б. Пироговская, д.15/18, стр.1',
            Organization: 'ФГБУ "9 Лечебно-диагностический центр" Министерства обороны Российской Федерации',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 693–45–72
8 (495) 693–45–89
`,
                    WorkSchedule:`Пн–Пт 08:00–20:00
Сб 09:00–15:00
`},
                DoctorHome:{
                    Title:'Врач на дом',
                    Phones:`8 (495) 693–45–72
`,
                    WorkSchedule:`Пн–Пт 08:00–11:00
`
                }
            }
        },

        {
            Metro: 'м.Фрунзенская, Парк Культуры',
            Address: 'Комсомольский пр-т, д.13А',
            Organization: 'ФГБУ "9 Лечебно-диагностический центр" Министерства обороны Российской Федерации',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 609–54–20
4 (956) 095–41–01
8 (495) 609–54–21
`,
                    WorkSchedule:`Пн–Пт 08:00–20:00
Сб 09:00–15:00
`},
                DoctorHome:{
                    Title:'Врач на дом',
                    Phones:`8 (495) 609–53–10
8 (495) 609–53–11
8 (495) 609–53–12
`,
                    WorkSchedule:`Пн–Пт 08:00–11:00
`
                }
            }
        },

        {
            Metro: 'м.Автозаводская',
            Address: 'Ленинская слобода, д.26',
            Organization: 'Клиника "МЕДСИ" Ленинская слобода',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 780–05–00
`,
                    WorkSchedule:`Пн–Пт 08:00–21:00
Сб,Вс 09:00–18:00
`},
                DoctorHome:{
                    Title:'',
                    Phones:``,
                    WorkSchedule:``
                }
            }
        },

        {
            Metro: 'м.Алтуфьево',
            Address: 'Псковская, д.9 корп.1',
            Organization: 'ООО "Институт медико-социальных технологий и реабилитационной индустрии"',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 617–11–71
`,
                    WorkSchedule:`Пн–Пт 08:00–21:00
Сб 09:00–18:00
Вс 09:00–15:00
`},
                DoctorHome:{
                    Title:'',
                    Phones:``,
                    WorkSchedule:``
                }
            }
        },

        {
            Metro: 'м.Аэропорт',
            Address: '1-я Аэропортовская, д.5',
            Organization: 'ЗАО "Центральная поликлиника "Литфонда"',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 150–60–01
`,
                    WorkSchedule:`Пн–Пт 08:00–20:00
Сб 09:00–19:00
`},
                DoctorHome:{
                    Title:'',
                    Phones:``,
                    WorkSchedule:``
                }
            }
        },

        {
            Metro: 'м.Аэропорт',
            Address: 'Ленинградский проспект, д.52',
            Organization: 'Клиника "МЕДСИ" на Ленинградском проспекте',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 780–05–00
8 (495) 229–18–75
8 (495) 228–08–03
`,
                    WorkSchedule:`Пн–Пт Круглосут.
Сб 09:00–17:00
Вс 09:00–17:00
`},
                DoctorHome:{
                    Title:'',
                    Phones:``,
                    WorkSchedule:``
                }
            }
        },

        {
            Metro: 'м.Бабушкинская',
            Address: 'Летчика Бабушкина, д.42',
            Organization: 'ООО "Доктор рядом"',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 357–80–90
`,
                    WorkSchedule:`Пн–Пт 08:00–20:00
Сб 10:00–17:00
`},
                DoctorHome:{
                    Title:'',
                    Phones:``,
                    WorkSchedule:``
                }
            }
        },

        {
            Metro: 'м.Бабушкинская',
            Address: 'Молодцова, д.25 корп.2',
            Organization: 'ООО "Доктор рядом"',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 357–80–90
`,
                    WorkSchedule:`Пн–Пт 08:00–20:00
Сб 10:00–17:00
`},
                DoctorHome:{
                    Title:'',
                    Phones:``,
                    WorkSchedule:``
                }
            }
        },

        {
            Metro: 'м.Багратионовская',
            Address: 'Барклая, д.13 корп.2',
            Organization: 'ООО "Мед Сити"',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 617–11–71
8 (495) 125–35–88
`,
                    WorkSchedule:`Пн–Пт 08:00–21:00
Сб 09:00–18:00
Вс 09:00–15:00
`},
                DoctorHome:{
                    Title:'',
                    Phones:``,
                    WorkSchedule:``
                }
            }
        },

        {
            Metro: 'м.Беговая',
            Address: 'Хорошевский проезд, д.1, стр.2',
            Organization: 'Поликлиника Медси в Хорошевском проезде',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 780–40–64
`,
                    WorkSchedule:`Пн–Пт 08:00–21:00
Сб 08:00–18:00
Вс 08:00–16:00
`},
                DoctorHome:{
                    Title:'',
                    Phones:``,
                    WorkSchedule:``
                }
            }
        },

        {
            Metro: 'м.Беговая, Динамо',
            Address: '2-й Боткинский проезд, д.5 корп.3',
            Organization: 'Клиника "МЕДСИ" в Боткинском проезде',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 780–05–00
`,
                    WorkSchedule:`Пн–Пт Круглосут.
Сб 08:00–20:00
`},
                DoctorHome:{
                    Title:'',
                    Phones:``,
                    WorkSchedule:``
                }
            }
        },

        {
            Metro: 'м.Беговая, Динамо',
            Address: '2-й Боткинский проезд, д.5 корп.4',
            Organization: 'Клиника "МЕДСИ" в Боткинском проезде',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 780–05–00
`,
                    WorkSchedule:`Пн–Пт Круглосут.
Сб 08:00–20:00
`},
                DoctorHome:{
                    Title:'',
                    Phones:``,
                    WorkSchedule:``
                }
            }
        },

        {
            Metro: 'м.Беговая, Динамо',
            Address: '2-ой Боткинский пр-д, д.8',
            Organization: 'КЛИНИКА "НИАРМЕДИК" (ООО "МРТ АЗБУКА ЗДОРОВЬЯ")',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 125–35–88
8 (495) 617–11–71
`,
                    WorkSchedule:`Пн–Пт 08:00–21:00
Сб 08:00–21:00
Вс 09:00–21:00
`},
                DoctorHome:{
                    Title:'',
                    Phones:``,
                    WorkSchedule:``
                }
            }
        },

        {
            Metro: 'м.Бульвар Дмитрия Донского',
            Address: 'Старокачаловская, д.3 корп. 3',
            Organization: 'Клиника "МЕДСИ" в Бутово',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 780–05–00
8 (495) 713–79–09
8 (495) 228–08–03
8 (495) 711–77–99
8 (495) 712–21–61
`,
                    WorkSchedule:`Пн–Пт 07:00–22:00
Сб 09:00–20:00
Вс 09:00–17:00
`},
                DoctorHome:{
                    Title:'',
                    Phones:``,
                    WorkSchedule:``
                }
            }
        },

        {
            Metro: 'м.Китай-город',
            Address: 'Ильинка, д.9 стр.1',
            Organization: 'ФГБУ "Многофункциональный комплекс Министерства финансов Российской Федерации"',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 987–91–05
`,
                    WorkSchedule:`Пн–Пт 08:00–20:00
Сб 09:00–14:00
`},
                DoctorHome:{
                    Title:'',
                    Phones:``,
                    WorkSchedule:``
                }
            }
        },

        {
            Metro: 'м.Китай-город',
            Address: 'Петроверигский пер., д.10 стр.3',
            Organization: 'ФГБУ "НМИЦ ПМ" Минздрава России',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 790–71–72
8 (495) 628–06–50
8 (495) 628–26–62
`,
                    WorkSchedule:`Пн–Пт 08:00–20:00
Сб 09:00–15:00
`},
                DoctorHome:{
                    Title:'',
                    Phones:``,
                    WorkSchedule:``
                }
            }
        },

        {
            Metro: 'м.Китай-город',
            Address: 'Маросейка, д.6-8 корп.4',
            Organization: 'ООО "КЛИНИКА НА МАРОСЕЙКЕ"',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 617–11–71
8 (495) 125–35–88
`,
                    WorkSchedule:`Пн–Пт 08:00–21:00
Сб 08:00–21:00
Вс 09:00–21:00
`},
                DoctorHome:{
                    Title:'',
                    Phones:``,
                    WorkSchedule:``
                }
            }
        },

        {
            Metro: 'м.Китай-город',
            Address: 'Солянка, д.12 корп.1',
            Organization: 'Клиника "МЕДСИ" на Солянке',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 780–05–00
`,
                    WorkSchedule:`Пн–Пт Круглосут.
Сб 09:00–15:00
`},
                DoctorHome:{
                    Title:'',
                    Phones:``,
                    WorkSchedule:``
                }
            }
        },

        {
            Metro: 'м.Китай-город',
            Address: 'Китайгородский проезд, д.7',
            Organization: 'ФГБУ "НМИЦ ПМ" Минздрава России',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 790–71–72
8 (495) 621–09–25
8 (495) 510–49–10
`,
                    WorkSchedule:`Пн–Пт 08:00–19:30
Сб 09:00–17:00
`},
                DoctorHome:{
                    Title:'',
                    Phones:``,
                    WorkSchedule:``
                }
            }
        },

        {
            Metro: 'м.Кропоткинская',
            Address: 'Большой Власьевский пер., д.9',
            Organization: 'Филиал ООО Медицинский центр "Столица"',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 604–10–10
`,
                    WorkSchedule:`Пн–Пт 08:00–22:00
Сб 08:00–22:00
Вс 08:00–22:00
`},
                DoctorHome:{
                    Title:'',
                    Phones:``,
                    WorkSchedule:``
                }
            }
        },

        {
            Metro: 'м.Кропоткинская, Смоленская',
            Address: 'Гагаринский пер., д.37/8',
            Organization: 'КДЦ "Арбатский" ФГБУ "Национальный медико-хирургический Центр имени Н.И. Пирогова" Министерства здравоохранения Российской Федерации',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (499) 241–12–46
8 (499) 241–40–45
`,
                    WorkSchedule:`Пн–Пт 08:00–21:00
Сб 09:00–18:00
Вс 09:00–18:00
`},
                DoctorHome:{
                    Title:'',
                    Phones:``,
                    WorkSchedule:``
                }
            }
        },

        {
            Metro: 'м.Крылатское, Молодёжная(1,5 км)',
            Address: 'Маршала Тимошенко, д.11 корп.2',
            Organization: 'ФГБУ "Центральная клиническая больница с поликлиникой" УДП РФ',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 530–01–11
`,
                    WorkSchedule:`Пн–Пт 08:00–20:00
Сб 08:00–15:00
`},
                DoctorHome:{
                    Title:'',
                    Phones:``,
                    WorkSchedule:``
                }
            }
        },

        {
            Metro: 'м.Кузьминки',
            Address: 'Юных Ленинцев, д.59 корп.1',
            Organization: 'ООО "Доктор рядом"',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 357–80–90
`,
                    WorkSchedule:`Пн–Пт 08:00–21:00
Сб,Вс 10:00–17:00
`},
                DoctorHome:{
                    Title:'',
                    Phones:``,
                    WorkSchedule:``
                }
            }
        },

        {
            Metro: 'м.Кунцевская',
            Address: 'Веерная, д.1 корп.7',
            Organization: 'ООО "Доктор рядом"',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 357–80–90
`,
                    WorkSchedule:`Пн–Пт 08:00–20:00
Сб 10:00–17:00
`},
                DoctorHome:{
                    Title:'',
                    Phones:``,
                    WorkSchedule:``
                }
            }
        },

        {
            Metro: 'м.Кунцевская',
            Address: 'Озерная, д.10',
            Organization: 'ООО "Доктор рядом"',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 357–80–90
`,
                    WorkSchedule:`Пн–Пт 08:00–20:00
Сб 10:00–17:00
Вс 10:00–16:00
`},
                DoctorHome:{
                    Title:'',
                    Phones:``,
                    WorkSchedule:``
                }
            }
        },

        {
            Metro: 'м.Лубянка',
            Address: 'Лубянский проезд, д.15, стр.2',
            Organization: 'ЗАО "КООПВНЕШТОРГ"',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 621–41–04
`,
                    WorkSchedule:`Пн–Пт 08:00–21:00
Сб 09:00–15:00
`},
                DoctorHome:{
                    Title:'',
                    Phones:``,
                    WorkSchedule:``
                }
            }
        },

        {
            Metro: 'м.Марксистская',
            Address: 'Товарищеский переулок, д.8, стр.1',
            Organization: 'ООО Клиника "Креде Эксперто"',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 232–48–40
`,
                    WorkSchedule:`Пн–Пт 08:00–21:00
`},
                DoctorHome:{
                    Title:'',
                    Phones:``,
                    WorkSchedule:``
                }
            }
        },

        {
            Metro: 'м.Марксистская, Таганская',
            Address: 'Товарищеский переулок, д.10, стр.1',
            Organization: 'ООО Клиника "Креде Эксперто"',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 232–48–40
`,
                    WorkSchedule:`Пн–Пт 08:00–21:00
Сб 08:00–21:00
Вс 08:00–21:00
`},
                DoctorHome:{
                    Title:'',
                    Phones:``,
                    WorkSchedule:``
                }
            }
        },

        {
            Metro: 'м.Марьино',
            Address: 'Маршала Голованова, д.1 корп.2',
            Organization: 'Клиника "МЕДСИ" в Марьино',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 780–05–00
8 (495) 349–97–50
8 (495) 228–08–03
8 (495) 357–39–71
`,
                    WorkSchedule:`Пн–Пт 08:00–21:00
Сб 09:00–17:00
Вс 09:00–17:00
`},
                DoctorHome:{
                    Title:'',
                    Phones:``,
                    WorkSchedule:``
                }
            }
        },

        {
            Metro: 'м.Маяковская',
            Address: 'Благовещенский переулок, д.6 корп. 1',
            Organization: 'Клиника "МЕДСИ" в Благовещенском переулке',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 780–05–00
`,
                    WorkSchedule:`Пн–Пт Круглосут.
Сб 09:00–15:00
`},
                DoctorHome:{
                    Title:'',
                    Phones:``,
                    WorkSchedule:``
                }
            }
        },

        {
            Metro: 'м.Нагатинская',
            Address: 'Варшавское шоссе, д.32',
            Organization: 'ООО "Клиника здоровья"',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 617–11–71
8 (495) 125–35–88
`,
                    WorkSchedule:`Пн–Пт 08:00–21:00
Сб 09:00–18:00
Вс 09:00–15:00
`},
                DoctorHome:{
                    Title:'',
                    Phones:``,
                    WorkSchedule:``
                }
            }
        },

        {
            Metro: 'м.Новослободская',
            Address: '3-й Самотечный пер., д.2',
            Organization: 'ЗАО "КДМЦ "Медстайл Эффект"',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 780–01–10
`,
                    WorkSchedule:`Пн–Пт 08:00–21:00
Сб 09:00–18:00
`},
                DoctorHome:{
                    Title:'',
                    Phones:``,
                    WorkSchedule:``
                }
            }
        },

        {
            Metro: 'м.Октябрьская',
            Address: 'Ленинский проспект, д.66',
            Organization: 'ООО Медицинский центр "Неболит"',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 651–21–45
8 (495) 651–21–46
8 (495) 651–21–47
`,
                    WorkSchedule:`Пн–Пт 08:00–21:00
Сб 10:00–18:00
Вс 10:00–17:00
`},
                DoctorHome:{
                    Title:'',
                    Phones:``,
                    WorkSchedule:``
                }
            }
        },

        {
            Metro: 'м.Павелецкая',
            Address: 'Дубининская, д.57 корп.8',
            Organization: 'Клиника "МЕДСИ" на Дубининской',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 780–05–00
`,
                    WorkSchedule:`Пн–Пт 08:00–21:00
`},
                DoctorHome:{
                    Title:'',
                    Phones:``,
                    WorkSchedule:``
                }
            }
        },

        {
            Metro: 'м.Парк культуры',
            Address: 'Пречистенка, д.39',
            Organization: 'Клиника "Медси" на Пречистенке',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 780–05–00
8 (495) 228–08–03
8 (495) 780–05–00
`,
                    WorkSchedule:`Пн–Пт Круглосут.
Сб 09:00–19:00
Вс 09:00–19:00
`},
                DoctorHome:{
                    Title:'',
                    Phones:``,
                    WorkSchedule:``
                }
            }
        },

        {
            Metro: 'м.Первомайская',
            Address: 'Нижняя Первомайская, д.70 корп.2',
            Organization: 'ФГБУ "Национальный медико-хирургический Центр имени Н.И. Пирогова" Министерства здравоохранения Российской Федерации',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 603–72–12
8 (499) 464–32–63
8 (499) 464–57–63
8 (499) 464–15–54
8 (499) 461–21–25
8 (499) 464–15–63
`,
                    WorkSchedule:`Пн–Пт 08:00–19:40
Сб 09:00–14:00
`},
                DoctorHome:{
                    Title:'',
                    Phones:``,
                    WorkSchedule:``
                }
            }
        },

        {
            Metro: 'м.Первомайская',
            Address: 'Нижняя Первомайская, д.65',
            Organization: 'КДЦ "Измайловский" ФГБУ "Национальный медико-хирургический Центр имени Н.И. Пирогова" Министерства здравоохранения Российской Федерации',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (499) 464–44–63
8 (499) 464–03–03
`,
                    WorkSchedule:`Пн–Пт 08:00–19:40
Сб 09:00–19:00
Вс 09:00–15:00
`},
                DoctorHome:{
                    Title:'',
                    Phones:``,
                    WorkSchedule:``
                }
            }
        },

        {
            Metro: 'м.Планерная',
            Address: 'Героев Панфиловцев, д.18 корп.2',
            Organization: 'ООО "Доктор рядом"',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 357–80–90
`,
                    WorkSchedule:`Пн–Пт 08:00–20:00
Сб 09:00–17:00
`},
                DoctorHome:{
                    Title:'',
                    Phones:``,
                    WorkSchedule:``
                }
            }
        },

        {
            Metro: 'м.Полежаевская',
            Address: 'пр-т Маршала Жукова, д.38 корп.1',
            Organization: 'ЗАО "Национальный Медицинский Сервис"',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 617–11–71
`,
                    WorkSchedule:`Пн–Пт 08:00–21:00
Сб 08:00–21:00
Вс 09:00–21:00
`},
                DoctorHome:{
                    Title:'',
                    Phones:``,
                    WorkSchedule:``
                }
            }
        },

        {
            Metro: 'м.Полежаевская',
            Address: 'Гризодубовой, д.4 корп 3',
            Organization: 'ООО "Гелиос Косметология"',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 617–11–71
`,
                    WorkSchedule:`Пн–Пт 08:00–21:00
Сб 09:00–18:00
Вс 09:00–15:00
`},
                DoctorHome:{
                    Title:'',
                    Phones:``,
                    WorkSchedule:``
                }
            }
        },

        {
            Metro: 'м.Полянка',
            Address: 'Малая Полянка, д.7/7 корп. 1',
            Organization: 'АО "Группа компаний "Медси"',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 228–08–03
8 (495) 780–05–00
`,
                    WorkSchedule:`Пн–Пт 08:00–20:00
Сб 09:00–16:00
Вс 09:00–16:00
`},
                DoctorHome:{
                    Title:'',
                    Phones:``,
                    WorkSchedule:``
                }
            }
        },

        {
            Metro: 'м.Проспект Вернадского',
            Address: 'Ленинский пр., д.90',
            Organization: 'ООО Медицинский центр "Столица"',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 604–10–10
`,
                    WorkSchedule:`Пн–Пт 08:00–22:00
Сб 08:00–22:00
Вс 08:00–22:00
`},
                DoctorHome:{
                    Title:'',
                    Phones:``,
                    WorkSchedule:``
                }
            }
        },

        {
            Metro: 'м.Речной вокзал',
            Address: 'Ангарская, д.45, стр.1',
            Organization: 'ООО "Доктор рядом"',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 357–80–90
`,
                    WorkSchedule:`Пн–Пт 08:00–20:00
Сб 10:00–17:00
`},
                DoctorHome:{
                    Title:'',
                    Phones:``,
                    WorkSchedule:``
                }
            }
        },

        {
            Metro: 'м.Речной вокзал',
            Address: 'Фестивальная, д.32 корп.1',
            Organization: 'ООО "Доктор рядом"',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 357–80–90
`,
                    WorkSchedule:`Пн–Пт 08:00–20:00
Сб 10:00–17:00
`},
                DoctorHome:{
                    Title:'',
                    Phones:``,
                    WorkSchedule:``
                }
            }
        },

        {
            Metro: 'м.Спортивная',
            Address: 'Доватора, д.15, стр.1',
            Organization: 'ФГАОУ ВО Первый МГМУ им. И.М. Сеченова Министерства здравоохранения Российской Федерации (Сеченовский Университет)',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (499) 246–80–43
8 (499) 246–47–42
8 (499) 246–65–43
`,
                    WorkSchedule:`Пн–Пт 08:00–21:00
`},
                DoctorHome:{
                    Title:'',
                    Phones:``,
                    WorkSchedule:``
                }
            }
        },

        {
            Metro: 'м.Строгино (т/п "Орбита")',
            Address: 'Кулакова, д.20 стр.1Л',
            Organization: 'ООО "Доктор рядом"',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 357–80–90
`,
                    WorkSchedule:`Пн–Пт 08:00–20:00
Сб,Вс 09:00–19:00
`},
                DoctorHome:{
                    Title:'',
                    Phones:``,
                    WorkSchedule:``
                }
            }
        },

        {
            Metro: 'м.Сухаревская',
            Address: 'Сретенка, д.9',
            Organization: 'ООО "Столичная Медицинская Клиника"',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 617–11–71
8 (495) 125–35–88
`,
                    WorkSchedule:`Пн–Пт 08:00–21:00
Сб 09:00–18:00
Вс 09:00–18:00
`},
                DoctorHome:{
                    Title:'',
                    Phones:``,
                    WorkSchedule:``
                }
            }
        },

        {
            Metro: 'м.Тушинская',
            Address: 'Пятницкое шоссе, д.37',
            Organization: 'Клиника "МЕДСИ" в Митино',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 780–05–00
8 (495) 228–08–03
8 (495) 751–03–29
8 (495) 794–73–08
`,
                    WorkSchedule:`Пн–Пт 08:00–22:00
Сб 10:00–17:00
Вс 10:00–17:00
`},
                DoctorHome:{
                    Title:'',
                    Phones:``,
                    WorkSchedule:``
                }
            }
        },

        {
            Metro: 'м.Фрунзенская',
            Address: 'Пр-кт Комсомольский, д.22',
            Organization: 'ФГБУ "9 Лечебно-диагностический центр" Министерства обороны Российской Федерации',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 609–54–20
8 (495) 609–54–21
`,
                    WorkSchedule:`Пн–Пт 08:00–20:00
Сб 09:00–15:00
`},
                DoctorHome:{
                    Title:'',
                    Phones:``,
                    WorkSchedule:``
                }
            }
        },

        {
            Metro: 'м.Фрунзенская',
            Address: 'Комсомольский пр-т, д.17 стр.11',
            Organization: 'ООО "Медицина АльфаСтрахования"',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 663–84–00
`,
                    WorkSchedule:`Пн–Пт 08:00–21:00
Сб 09:00–19:00
Вс 09:00–19:00
`},
                DoctorHome:{
                    Title:'',
                    Phones:``,
                    WorkSchedule:``
                }
            }
        },

        {
            Metro: 'м.Фрунзенская',
            Address: 'Комсомольский пр-т, д.24, стр.2',
            Organization: 'ООО "Экстрагорстрой"',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 925–88–78
`,
                    WorkSchedule:`ежед. 08:00–22:00
`},
                DoctorHome:{
                    Title:'',
                    Phones:``,
                    WorkSchedule:``
                }
            }
        },

        {
            Metro: 'м.Чкаловская, Курская',
            Address: 'Воронцово поле, д.14',
            Organization: 'ФГБНУ"Научный центр неврологии"',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 916–21–93
8 (495) 374–77–76
`,
                    WorkSchedule:`Пн–Пт 08:00–20:00
`},
                DoctorHome:{
                    Title:'',
                    Phones:``,
                    WorkSchedule:``
                }
            }
        },

        {
            Metro: 'м.Щукинская',
            Address: 'Гамалеи, д.18',
            Organization: 'ООО "НИАРМЕДИК"',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 617–11–71
`,
                    WorkSchedule:`Пн–Пт 08:00–21:00
Сб 09:00–21:00
Вс 09:00–18:00
`},
                DoctorHome:{
                    Title:'',
                    Phones:``,
                    WorkSchedule:``
                }
            }
        },

        {
            Metro: 'м.Юго-Западная',
            Address: 'Ленинский проспект, д.146',
            Organization: 'Филиал ООО Медицинский центр "Столица"',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 604–10–10
`,
                    WorkSchedule:`Пн–Пт 08:00–17:00
Сб 08:00–17:00
Вс 08:00–17:00
`},
                DoctorHome:{
                    Title:'',
                    Phones:``,
                    WorkSchedule:``
                }
            }
        },

        {
            Metro: '',
            Address: 'Рублевское шоссе, д.10',
            Organization: 'АО "Группа компаний "Медси"',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 780–05–00
`,
                    WorkSchedule:`Пн–Пт 09:00–18:00
`},
                DoctorHome:{
                    Title:'',
                    Phones:``,
                    WorkSchedule:``
                }
            }
        },

        {
            Metro: '',
            Address: 'Ленинский пр-т, д.20, стр.1',
            Organization: 'АО "Группа компаний "Медси"',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 780–05–00
`,
                    WorkSchedule:`Пн–Сб 08:00–21:00
Вс 08:00–18:00
`},
                DoctorHome:{
                    Title:'',
                    Phones:``,
                    WorkSchedule:``
                }
            }
        },

        {
            Metro: '',
            Address: 'г. Зеленоград, стр.1651',
            Organization: 'ООО "КЛИНИКА НА МАРОСЕЙКЕ"',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 617–11–71
8 (495) 933–45–45
`,
                    WorkSchedule:`Пн–Пт 07:00–20:00
Сб 08:00–18:00
Вс 09:00–16:00
`},
                DoctorHome:{
                    Title:'',
                    Phones:``,
                    WorkSchedule:``
                }
            }
        },

        {
            Metro: '',
            Address: 'г. Зеленоград, стр.2013',
            Organization: 'ООО "КЛИНИКА НА МАРОСЕЙКЕ"',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 617–11–71
8 (495) 933–45–45
`,
                    WorkSchedule:`Пн–Пт 07:00–20:00
Сб 08:00–18:00
Вс 09:00–16:00
`},
                DoctorHome:{
                    Title:'',
                    Phones:``,
                    WorkSchedule:``
                }
            }
        },

        {
            Metro: '',
            Address: 'Варшавское шоссе, д.89',
            Organization: 'ООО Медицинский центр "Неболит"',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (499) 323–98–33
8 (499) 323–98–00
`,
                    WorkSchedule:`Пн–Пт 08:00–20:00
Сб 09:00–17:00
Вс 09:00–16:00
`},
                DoctorHome:{
                    Title:'',
                    Phones:``,
                    WorkSchedule:``
                }
            }
        },

        {
            Metro: '',
            Address: 'Александра Солженицына, д.10, стр.1',
            Organization: 'ООО Клиника "Креде Эксперто"',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 232–48–40
`,
                    WorkSchedule:`ежед. 08:00–21:00
`},
                DoctorHome:{
                    Title:'',
                    Phones:``,
                    WorkSchedule:``
                }
            }
        },

        {
            Metro: '',
            Address: 'Проспект Защитников Москвы д.15, Некрасовка.',
            Organization: 'ООО "Доктор рядом"',
            Description:{
                Polyclinic:{
                    Title:'Поликлиника',
                    Phones:`8 (495) 357–80–90
`,
                    WorkSchedule:`Пн–Пт 08:00–20:00
Сб,Вс 10:00–17:00
`},
                DoctorHome:{
                    Title:'',
                    Phones:``,
                    WorkSchedule:``
                }
            }
        }
    ];

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
                </div>
                {% if properties.pointData.data.Description.DoctorHome.Title %}
                    <div class="doctor-home-info">
                        <div class="doctor-home-title">{{properties.pointData.data.Description.DoctorHome.Title}}</div>
                        <div class="doctor-home-phones">
                            {% for phone in properties.pointData.data.Description.DoctorHome.Phones %}
                                {{ phone }}<br>
                            {% endfor %}
                        </div>
                        <div class="doctor-home-title">График:</div>
                        <div class="doctor-home-work-schedule">
                            {% for schedule in properties.pointData.data.Description.DoctorHome.WorkSchedule %}
                                {{ schedule }}<br>
                            {% endfor %}
                        </div>
                    </div>
                {% endif %}`;

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
    const reg = /[\n\r]+/g;
    pointData.Description.Polyclinic.Phones = pointData.Description.Polyclinic.Phones.split(reg);
    pointData.Description.Polyclinic.WorkSchedule = pointData.Description.Polyclinic.WorkSchedule.split(reg);
    pointData.Description.DoctorHome.Phones = pointData.Description.DoctorHome.Phones.split(reg);
    pointData.Description.DoctorHome.WorkSchedule = pointData.Description.DoctorHome.WorkSchedule.split(reg);
}


mapMaker();



