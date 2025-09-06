// تخزين الطلبات في LocalStorage
function bookCar() {
  let name = document.getElementById('name').value.trim();
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

  // مسح الحقول
  document.getElementById('name').value = '';
  document.getElementById('date').value = '';
  document.getElementById('time').value = '';

  // العودة للصفحة الرئيسية بعد ثانيتين
  setTimeout(() => { window.location.href = 'index.html'; }, 2000);
}

// متابعة الحجز
function checkStatus(){
  let searchName = document.getElementById('searchName').value.trim();
  let reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
  let results = searchName ? reservations.filter(r => r.name === searchName) : reservations;
  let output = document.getElementById('results');
  if(results.length === 0){
    output.innerHTML = "لا يوجد أي حجز بهذا الاسم";
  } else {
    output.innerHTML = results.map(r => `الاسم: ${r.name} | التاريخ: ${r.date} | الوقت: ${r.time} | الحالة: ${r.status}`).join("<br>");
  }
}

// صفحة المسؤول
function adminCheck(){
  let searchName = document.getElementById('adminSearch').value.trim();
  let reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
  let results = searchName ? reservations.filter(r => r.name === searchName) : reservations;
  
  let output = document.getElementById('adminResults');
  if(results.length === 0){
    output.innerHTML = "لا يوجد أي طلب بهذا الاسم";
  } else {
    output.innerHTML = results.map((r, i) => 
      `الاسم: ${r.name} | التاريخ: ${r.date} | الوقت: ${r.time} | الحالة: ${r.status} 
      <button onclick="approve(${i})">موافقة</button>
      <button onclick="reject(${i})">رفض</button>`
    ).join("<br>");
  }
}

function approve(index){
  let reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
  reservations[index].status = 'تمت الموافقة';
  localStorage.setItem('reservations', JSON.stringify(reservations));
  adminCheck();
}

function reject(index){
  let reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
  reservations[index].status = 'تم الرفض';
  localStorage.setItem('reservations', JSON.stringify(reservations));
  adminCheck();
}
