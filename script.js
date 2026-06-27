let map;
let markers = [];

const locations = [
    {
        id: "spiker",
        name: "قاعدة سبايكر – تكريت",
        coords: [34.5969, 43.6786],
        category: "affected",
        image: "images/spiker.jpg",
        info: "موقع جريمة سبايكر الأليمة (2014)، حيث استشهد قرابة 1700 من طلاب القوة الجوية."
    },
    {
        id: "badoush",
        name: "سجن بادوش – نينوى",
        coords: [36.4253, 42.9231],
        category: "affected",
        image: "images/badosh.jpg",
        info: "موقع مجزرة سجن بادوش التي راح ضحيتها المئات من السجناء العزل."
    },
    {
        id: "khasfa",
        name: "حفرة الخسفة",
        coords: [36.1458, 43.1206],
        category: "affected",
        image: "images/khasfa.jpg",
        info: "أكبر مقبرة جماعية طبيعية في العراق، استخدمها التنظيم لإخفاء جرائمه."
    },
    {
        id: "sinjar",
        name: "سنجار – جبل سنجار",
        coords: [36.3195, 41.8596],
        category: "affected",
        image: "images/ezidien.jpg",
        info: "رمز مأساة الإيزيديين، حيث حدثت عمليات الإبادة والتهجير القسري."
    },
    {
        id: "mosul_old_city",
        name: "المدينة القديمة – الموصل",
        coords: [36.34, 43.13],
        category: "affected",
        image: "images/mosul.jpg",
        info: "شهدت أشرس المعارك، دُمرت معالمها التاريخية لكنها تحررت بصمود أسطوري."
    },
    {
        id: "anbar",
        name: "الأنبار",
        coords: [33.3750, 43.8850],
        category: "affected",
        image: "images/anbar(1).jpg",
        info: "ساحة معارك واسعة ضد الإرهاب، من الفلوجة إلى القائم."
    },
    {
        id: "baghdad",
        name: "بغداد – شارع المتنبي",
        coords: [33.3152, 44.3661],
        category: "hope",
        image: "images/baghdad.jpg",
        info: "شارع المتنبي، رئة بغداد الثقافية ورمز الحياة الذي ينبض بالفن والأدب."
    },
    {
        id: "karbala",
        name: "كربلاء المقدسة",
        coords: [32.6160, 44.0249],
        category: "hope",
        image: "images/karbala.jpg",
        info: "مركز ديني عالمي ونهضة عمرانية وتوسع في البنى التحتية لخدمة الملايين."
    },
    {
        id: "basra",
        name: "البصرة",
        coords: [30.5081, 47.7822],
        category: "hope",
        image: "images/basra.jpg",
        info: "ثغر العراق الباسم، استضافت خليجي 25 وعكست كرم وضيافة العراقيين."
    },
    {
        id: "erbil",
        name: "أربيل",
        coords: [36.1911, 44.0092],
        category: "hope",
        image: "images/erbil.jpg",
        info: "عاصمة السياحة الصيفية، تتميز بقلعتها التاريخية والتطور العمراني السريع."
    },
    {
        id: "nasiriyah",
        name: "الناصرية",
        coords: [31.0477, 46.2573],
        category: "hope",
        image: "images/nasiriyah.jpg",
        info: "مدينة جميلة في جنوب العراق، ويمكن استخدامها كموقع أمل وتطور حضري."
    }
];

function initMap() {
    map = L.map('map').setView([33.3152, 44.3661], 6);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(map);

    updateMap('all');
}

function updateMap(filter) {
    markers.forEach(m => map.removeLayer(m));
    markers = [];

    document.getElementById('side-image-container').style.display = 'none';
    document.getElementById('default-msg').style.display = 'block';

    locations.forEach(loc => {
        if (filter === 'all' || loc.category === filter) {
            const color = loc.category === "affected" ? "#ef4444" : "#22c55e";

            const marker = L.circleMarker(loc.coords, {
                color: color,
                fillColor: color,
                fillOpacity: 0.8,
                radius: 12,
                weight: 2
            }).addTo(map);

            marker.on('click', () => showInSidePanel(loc));
            marker.bindTooltip(loc.name);
            markers.push(marker);
        }
    });
}

function showInSidePanel(location) {
    document.getElementById('default-msg').style.display = 'none';

    const container = document.getElementById('side-image-container');
    const imgEl = document.getElementById('location-image');
    const placeholder = document.getElementById('no-image-placeholder');

    container.style.display = 'block';

    document.getElementById('location-title').innerText = location.name;
    document.getElementById('location-desc').innerText = location.info;

    const hasImage = typeof location.image === "string" && location.image.trim() !== "";

    if (!hasImage) {
        imgEl.style.display = "none";
        placeholder.style.display = "flex";
        placeholder.textContent = "لا توجد صورة لهذا الموقع";
        imgEl.removeAttribute("src");
        return;
    }

    imgEl.style.display = "block";
    placeholder.style.display = "none";

    imgEl.onload = function () {
        imgEl.style.display = "block";
        placeholder.style.display = "none";
    };

    imgEl.onerror = function () {
        imgEl.style.display = "none";
        placeholder.style.display = "flex";
        placeholder.textContent = "تعذّر تحميل الصورة";
    };

    imgEl.src = location.image + "?v=" + Date.now();
}

document.addEventListener("DOMContentLoaded", initMap);
