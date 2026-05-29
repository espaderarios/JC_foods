document.addEventListener('DOMContentLoaded',()=>{
  // Sample menu items based on the design plan
  const items = [
    { id: 'biko', title: 'Biko Special', img: 'assets/item1.jpg', desc: 'Sweet sticky rice with coconut.' },
    { id: 'adobo', title: 'Adobo Classic', img: 'assets/item2.jpg', desc: 'Savory pork adobo served hot.' },
    { id: 'halo', title: 'Halo-Halo', img: 'assets/item3.jpg', desc: 'Refreshing shaved ice dessert.' },
    { id: 'sinigang', title: 'Sinigang', img: 'assets/item4.jpg', desc: 'Tamarind-based sour soup.' }
  ];

  const container = document.getElementById('menu-items');
  items.forEach((it, idx)=>{
    const div = document.createElement('div');
    div.className = 'menu-item';

    const img = document.createElement('div');
    img.className = 'image';
    img.style.backgroundImage = `url(${it.img})`;

    const desc = document.createElement('div');
    desc.className = 'desc';
    desc.innerHTML = `<h3>${it.title}</h3><p>${it.desc}</p><button data-id="${it.id}">Order</button>`;

    // Append image then description; CSS will alternate layout
    div.appendChild(img);
    div.appendChild(desc);

    container.appendChild(div);
  });

  // Hook order buttons to backend API
  document.body.addEventListener('click', async (e) => {
    const btn = e.target.closest('button[data-id]');
    if (!btn) return;
    const id = btn.dataset.id;
    btn.disabled = true;
    try {
      const res = await fetch(`/api/order`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ itemId: id, qty: 1 }) });
      const json = await res.json();
      alert('Order placed: ' + (json.message || 'ok'));
    } catch (err) {
      alert('Order failed');
    } finally { btn.disabled = false }
  });

  // Load known locations
  fetch('/api/locations').then(r=>r.json()).then(list=>{
    const el = document.getElementById('locations');
    if (!list || list.length===0) el.textContent = 'No saved locations yet.';
    else el.innerHTML = list.map(l=>`<div>${l.address||l.lat+','+l.lng}</div>`).join('');
  });
});
