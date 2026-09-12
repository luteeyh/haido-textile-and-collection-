const products=[
{name:'Black Leather Sandals',category:'shoes',label:'Shoes',price:17000,priceText:'₦17,000',image:'black-sandals.jpeg'},
{name:'Brown Leather Sandals',category:'shoes',label:'Shoes',price:10000,priceText:'₦10,000',image:'brown-sandals.jpeg'},
{name:'Black Traditional Kaftan',category:'clothes',label:'Clothes',price:null,priceText:'Price on request',image:'black-kaftan.jpeg'},
{name:'Premium Fabric Selection',category:'fabric',label:'Fabrics',price:null,priceText:'Price on request',image:'premium-fabric-set.jpeg'},
{name:'Noble Thinker Collection',category:'fabric',label:'Fabrics',price:null,priceText:'Price on request',image:'noble-thinker-fabric.jpeg'},
{name:'Sandals Collection',category:'shoes',label:'Shoes',price:null,priceText:'Various prices',image:'sandals-display.jpeg'},
{name:'Watches',category:'accessories',label:'Accessories',price:null,priceText:'Price on request',image:'watches.jpeg'},
{name:'Glasses',category:'accessories',label:'Accessories',price:null,priceText:'Price on request',image:'glasses.jpeg'},
{name:'Patterned Caps',category:'accessories',label:'Accessories',price:null,priceText:'Price on request',image:'caps-collection.jpeg'}];
let currentFilter='all',cart=[];
const money=n=>'₦'+n.toLocaleString('en-NG');
function renderProducts(){const q=document.getElementById('searchInput').value.toLowerCase().trim();const box=document.getElementById('products');const list=products.filter(p=>(currentFilter==='all'||p.category===currentFilter)&&p.name.toLowerCase().includes(q));box.innerHTML=list.length?list.map(p=>`<article class="product"><img class="product-photo" src="${p.image}" alt="${p.name}"><div class="product-info"><span>${p.label}</span><h3>${p.name}</h3><p class="price">${p.priceText}</p><div class="product-actions"><button onclick="addToCart('${p.name}')">Add to cart</button><a class="buy" target="_blank" href="${wa(p)}">WhatsApp</a></div></div></article>`).join(''):'<p class="empty">No products found. Try another search or category.</p>'}
function wa(p){const text=`Hello HAIDO TEXTILE AND COLLECTION, I am interested in the ${p.name}${p.price?' for '+p.priceText:''}. Please confirm availability.`;return 'https://wa.me/2348108087018?text='+encodeURIComponent(text)}
function setFilter(cat){currentFilter=cat;document.querySelectorAll('.filter').forEach(b=>b.classList.toggle('active',b.dataset.filter===cat));renderProducts();document.getElementById('shop').scrollIntoView({behavior:'smooth'})}
function addToCart(name){const p=products.find(x=>x.name===name);const found=cart.find(x=>x.name===name);if(found)found.qty++;else cart.push({...p,qty:1});updateCart();openCart()}
function updateCart(){document.getElementById('cartCount').textContent=cart.reduce((s,x)=>s+x.qty,0);const box=document.getElementById('cartItems');box.innerHTML=cart.length?cart.map((p,i)=>`<div class="cart-item"><img src="${p.image}" alt=""><div><h4>${p.name}</h4><p>${p.priceText}</p><div class="qty"><button onclick="changeQty(${i},-1)">−</button><span>${p.qty}</span><button onclick="changeQty(${i},1)">+</button></div></div><button class="remove" onclick="removeItem(${i})">Remove</button></div>`).join(''):'<div class="empty">Your cart is empty.<br>Add something you like.</div>';const total=cart.reduce((s,x)=>s+(x.price||0)*x.qty,0);document.getElementById('cartTotal').textContent=money(total)}
function changeQty(i,d){cart[i].qty+=d;if(cart[i].qty<1)cart.splice(i,1);updateCart()}
function removeItem(i){cart.splice(i,1);updateCart()}
function openCart(){document.getElementById('cartOverlay').classList.add('open');document.body.style.overflow='hidden'}
function closeCart(e){if(!e||e.target.id==='cartOverlay'){document.getElementById('cartOverlay').classList.remove('open');document.body.style.overflow=''}}
function checkout(){if(!cart.length){openCart();return}let lines=cart.map(x=>`• ${x.name} × ${x.qty} — ${x.priceText}`).join('\n');let known=cart.reduce((s,x)=>s+(x.price||0)*x.qty,0);let text=`Hello HAIDO TEXTILE AND COLLECTION, I would like to place an order:\n\n${lines}\n\nKnown total: ${money(known)}\nPlease confirm availability, final price and delivery details.`;window.open('https://wa.me/2348108087018?text='+encodeURIComponent(text),'_blank')}
function toggleMenu(){document.getElementById('navMenu').classList.toggle('show')}
renderProducts();updateCart();
