// تخزين الطلبات في LocalStorage
function bookCar() {
  let name = document.getElementById('name').value;
  let date = document.getElementById('date').value;
  let time = document.getElementById('time').value;
  if(!name || !date || !time){
    alert("رجاءً املأ جميع الحقول");
    return;
  }

  let reservations = JSON.parse(localStorage.getItem('reservations') || '[]');

  reservations.push({
    name: name,
    date: date,
    time: time,
    status: 'قيد المراجعة'
  });

  localStorage.setItem('reservations', JSON.stringify(reservations));
  document.getElementById('message').innerText = 'تم إضافة الطلب! حالته الآن: قيد المراجعة.';
  document.getElementById('name').value = '';
  document.getElementById('date').value = '';
  document.getElementById('time').value = '';
}

// متابعة الحجز
function checkStatus(){
  let searchName = document.getElementById('searchName').value;
  let reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
  let results = reservations.filter(r => r.name === searchName);
  let output = document.getElementById('results');
  if(results.length === 0){
    output.innerHTML = "لا يوجد أي حجز بهذا الاسم";
  } else {
    output.innerHTML = results.map(r => `الاسم: ${r.name} | التاريخ: ${r.date} | الوقت: ${r.time} | الحالة: ${r.status}`).join("<br>");
  }
}

// صفحة المسؤول
function adminCheck(){
  let searchName = document.getElementById('adminSearch').value;
  let reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
  let results = reservations.filter(r => r.name === searchName);
  let output = document.getElementById('adminResults');
  if(results.length === 0){
    output.innerHTML = "لا يوجد أي طلب بهذا الاسم";
  } else {
    output.innerHTML = results.map(r => `الاسم: ${r.name} | التاريخ: ${r.date} | الوقت: ${r.time} | الحالة: ${r.status}`).join("<br>");
  }
}
