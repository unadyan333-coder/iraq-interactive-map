let map;
let markers = [];

const locations = [
  { name: "بغداد", coords: [33.3152, 44.3661], deaths: "50,000+", info: "2003 - 2024", category: "affected" },
  { name: "الأنبار", coords: [33.3750, 43.8850], deaths: "20,000+", info: "معارك واسعة", category: "affected" },
  { name: "الموصل", coords: [36.3489, 43.1577], deaths: "11,000", info: "معركة التحرير", category: "affected" },

  { name: "كربلاء", coords: [32.6160, 44.0249], deaths: "-", info: "نهضة دينية", category: "hope" },
  { name: "البصرة", coords: [30.5081, 47.7822], deaths: "-", info: "تعافٍ اقتصادي", category: "hope" },
  { name: "أربيل", coords: [36.1911, 44.0092], deaths: "-", info: "ازدهار عمراني", category: "hope" }
];

window.onload = function () {
  map = L.map('map').setView([33.3152, 44.3661], 6);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap'
  }).addTo(map);

  updateMap('all');
};

function updateMap(category) {
  markers.forEach(m => map.removeLayer(m));
  markers = [];

  const container = document.getElementById('stats-container');
  container.innerHTML = '';

  locations.forEach(loc => {
    if (category === 'all' || loc.category === category) {

      const color = loc.category === "affected" ? "#ef4444" : "#22c55e";

      const marker = L.circleMarker(loc.coords, {
        color: color,
        fillColor: color,
        fillOpacity: 0.7,
        radius: loc.category === "hope" ? 14 : 10,
        weight: 6
      }).addTo(map);

      marker.bindPopup(`
        <b>${loc.name}</b><br>
        ${loc.category === "hope" ? loc.info : loc.deaths}
      `);

      markers.push(marker);

      const card = document.createElement('div');
      card.className = stat-card ${loc.category === 'hope' ? 'hope' : ''};

      card.innerHTML = `
        <h3>${loc.name}</h3>
        <div class="number" style="color:${color}">
          ${loc.category === "hope" ? loc.info : loc.deaths}
        </div>
      `;

      container.appendChild(card);
    }
  });
}

const martyrs = [
  // 🟥 شهداء سبايكر
  {
    locationId: "spiker",
    name: "باسم محمد عليوي فزع الركابي",
    note: ""
  },
  {
    locationId: "spiker",
    name: "حسن ناصر حسين محمد آل أزيرج",
    note: ""
  },
  {
    locationId: "spiker",
    name: "محمد جابر عبيد حميد الحسناوي",
    note: ""
  },
  {
    locationId: "spiker",
    name: "العميد عصام متعب أحمد العزاوي",
    note: "نائب قائد عمليات صلاح الدين"
  },

  // 🟥 شهداء سجن بادوش
  {
    locationId: "badoush",
    name: "وليد خالد هامل",
    note: ""
  },
  {
    locationId: "badoush",
    name: "حيدر قاسم خليل",
    note: ""
  },
  {
    locationId: "badoush",
    name: "خلف مطر محمد",
    note: ""
  },
  {
    locationId: "badoush",
    name: "جبار عبد فليح",
    note: ""
  },
  {
    locationId: "badoush",
    name: "جبار حمزة حسن",
    note: ""
  },

  // 🟥 شهداء تحرير الموصل
  {
    locationId: "mosul_old_city",
    name: "اللواء الركن نجم عبد الله السوداني",
    note: "قائد الفرقة السادسة في الجيش العراقي"
  },
  {
    locationId: "mosul_old_city",
    name: "العميد الركن علي اللامي",
    note: "من قيادات الفرقة الرابعة"
  },
  {
    locationId: "mosul_old_city",
    name: "المقدم مهند التميمي",
    note: "جهاز مكافحة الإرهاب – الفرقة الذهبية"
  },
  {
    locationId: "mosul_old_city",
    name: "الصحفي صفاء غالي",
    note: "استشهد أثناء تغطية المعارك"
  },
  {
    locationId: "mosul_old_city",
    name: "أنور عجمي ضيدان",
    note: "من قوات الحشد الشعبي – لواء الطفوف"
  },

  // 🟥 شهداء الخسفة
  {
    locationId: "khasfa",
    name: "الرائد يونس مرعي الحويزي",
    note: "شرطة نينوى"
  },
  {
    locationId: "khasfa",
    name: "النقيب ثامر ذنون الطائي",
    note: "وزارة الداخلية"
  },
  {
    locationId: "khasfa",
    name: "ياسين محمد الجبوري",
    note: "ناشط مدني"
  },
  {
    locationId: "khasfa",
    name: "بشار جاسم الحمداني",
    note: "منتسب سابق في الأجهزة الأمنية"
  },
  {
    locationId: "khasfa",
    name: "علي ضامن العبيدي",
    note: "من سكان القرى المجاورة"
  },

  // 🟥 مجزرة الإيزيديين – سنجار
  {
    locationId: "sinjar",
    name: "طلال علي قاسم",
    note: "مرتبط بتوثيق الانتهاكات"
  },
  {
    locationId: "sinjar",
    name: "الشيخ ناصر باشا",
    note: "من وجهاء الإيزيديين"
  },
  {
    locationId: "sinjar",
    name: "عوض خضر",
    note: "عُثر على رفاته في المقابر الجماعية"
  },
  {
    locationId: "sinjar",
    name: "خلف حجي",
    note: "مقاتل متطوع دفاعًا عن جبل سنجار"
  },
  {
    locationId: "sinjar",
    name: "جمال خلف",
    note: "تم التعرف على هويته في مقابر كوجو"
  }
];
marker.on('dblclick', () => {
  showMartyrs(loc.id);
});

function showMartyrs(locationId) {
  const list = martyrs.filter(m => m.locationId === locationId);

  let html = "<h3>الشهداء</h3><ul>";

  list.forEach(m => {
    html += <li>${m.name}${m.note ? " – <small>" + m.note + "</small>" : ""}</li>;
  });

  html += "</ul>";

  L.popup()
    .setLatLng(
      locations.find(l => l.id === locationId).coords
    )
    .setContent(html)
    .openOn(map);
}
