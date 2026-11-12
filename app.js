/* EventHub - Event Registration Management System
   Educational frontend-only project. Data is stored in browser localStorage.
   Do not use this demo for real authentication or sensitive personal data. */
const STORAGE = { events: "eventhub_events_v1", registrations: "eventhub_registrations_v1" };
const $ = (id) => document.getElementById(id);
const today = new Date().toISOString().slice(0, 10);
let isAdmin = false;
let toastTimer;

const starterEvents = [
  {id:"ev101",title:"Future of Artificial Intelligence",category:"Technology",date:futureDate(12),time:"10:00",venue:"Innovation Auditorium",capacity:120,fee:0,description:"Explore practical AI trends, responsible innovation and real-world applications."},
  {id:"ev102",title:"Creative Design Workshop",category:"Workshop",date:futureDate(18),time:"11:30",venue:"Design Studio, Block B",capacity:45,fee:199,description:"A hands-on session covering visual storytelling, layouts and creative thinking."},
  {id:"ev103",title:"Campus Cultural Fest",category:"Cultural",date:futureDate(25),time:"16:00",venue:"College Open Ground",capacity:300,fee:99,description:"Celebrate music, dance, art and the diverse talents of our campus community."},
  {id:"ev104",title:"Career Readiness Seminar",category:"Education",date:futureDate(30),time:"09:30",venue:"Seminar Hall 1",capacity:100,fee:0,description:"Learn about resumes, interviews, communication and preparing for your career."},
  {id:"ev105",title:"Inter-Department Sports Meet",category:"Sports",date:futureDate(38),time:"08:00",venue:"College Sports Complex",capacity:180,fee:50,description:"Join a friendly competition featuring team games and individual events."},
  {id:"ev106",title:"Young Entrepreneurs Forum",category:"Business",date:futureDate(45),time:"14:00",venue:"Conference Room",capacity:75,fee:149,description:"Connect with peers and discuss startup ideas, business models and innovation."}
];
function futureDate(days){const d=new Date();d.setDate(d.getDate()+days);return d.toISOString().slice(0,10);}
function read(key,fallback){try{const value=JSON.parse(localStorage.getItem(key));return Array.isArray(value)?value:fallback;}catch{return fallback;}}
function save(){localStorage.setItem(STORAGE.events,JSON.stringify(events));localStorage.setItem(STORAGE.registrations,JSON.stringify(registrations));}
let events=read(STORAGE.events,starterEvents);
let registrations=read(STORAGE.registrations,[]);
if(!localStorage.getItem(STORAGE.events)){events=starterEvents;save();}
function escapeHTML(value){return String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function formatDate(date){return new Date(date+"T00:00:00").toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"});}
function money(value){return Number(value)===0?"Free":"₹"+Number(value).toLocaleString("en-IN");}
function seatsLeft(event){return Math.max(0,Number(event.capacity)-registrations.filter(r=>r.eventId===event.id).length);}
function showToast(message){const t=$("toast");t.textContent=message;t.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove("show"),2600);}
function openModal(id){$(id).classList.remove("hidden");}
function closeModal(id){$(id).classList.add("hidden");}
function eventIcon(category){return ({Technology:"⌘",Education:"✎",Workshop:"✦",Cultural:"♫",Sports:"⚑",Business:"◇"})[category]||"✧";}
function render(){
  const query=$("searchInput").value.trim().toLowerCase(),cat=$("categoryFilter").value;
  const categories=[...new Set(events.map(e=>e.category))].sort();
  $("categoryFilter").innerHTML='<option value="all">All categories</option>'+categories.map(c=>`<option value="${escapeHTML(c)}">${escapeHTML(c)}</option>`).join("");
  $("categoryFilter").value=categories.includes(cat)?cat:"all";
  const shown=events.filter(e=>(cat==="all"||e.category===cat)&&(`${e.title} ${e.description} ${e.venue}`.toLowerCase().includes(query)));
  $("eventGrid").innerHTML=shown.map(e=>`<article class="event-card">
    <div class="event-banner ${escapeHTML(e.category.toLowerCase())}"><small>${escapeHTML(e.category.toUpperCase())}</small><span class="event-symbol">${eventIcon(e.category)}</span></div>
    <div class="event-content"><h3>${escapeHTML(e.title)}</h3><div class="event-meta"><span>▦ ${formatDate(e.date)}</span><span>◷ ${escapeHTML(e.time)}</span></div>
    <p>${escapeHTML(e.description)}</p><div class="seats">${seatsLeft(e)} seats remaining · ${escapeHTML(e.venue)}</div>
    <div class="event-bottom"><strong>${money(e.fee)}</strong><button class="button primary" data-register="${escapeHTML(e.id)}" ${seatsLeft(e)===0?"disabled":""}>${seatsLeft(e)===0?"Full":"Register"}</button></div></div></article>`).join("");
  $("emptyEvents").classList.toggle("hidden",shown.length!==0);
  $("statEvents").textContent=events.length;$("statRegistrations").textContent=registrations.length;$("statCategories").textContent=categories.length;
  renderMyRegistrations();
  if(isAdmin)renderAdmin();
}
function renderMyRegistrations(){
  const list=$("myRegistrationList");
  if(!registrations.length){list.innerHTML='<p class="muted">You have not registered for any events yet. Explore the events above to get started.</p>';return;}
  list.innerHTML=registrations.slice().reverse().map(r=>{const e=events.find(x=>x.id===r.eventId);return `<div class="registration-item"><div><strong>${escapeHTML(r.name)}</strong><small>${escapeHTML(e?.title||"Event removed")} · ${formatDate(r.createdAt.slice(0,10))}</small><small>${escapeHTML(r.email)} · ${escapeHTML(r.status||"Confirmed")}</small></div><button data-cancel="${escapeHTML(r.id)}">Cancel registration</button></div>`;}).join("");
}
function registerFor(id){
  const e=events.find(x=>x.id===id);if(!e)return;
  if(seatsLeft(e)<=0){showToast("Sorry, this event is full.");return;}
  $("registrationForm").reset();$("registrationEventId").value=id;$("selectedEventName").textContent=e.title+" • "+formatDate(e.date);$("registrationMessage").textContent="";
  openModal("registrationModal");
}
function renderAdmin(){
  $("adminEventCount").textContent=events.length;$("adminRegCount").textContent=registrations.length;$("adminSeats").textContent=events.reduce((n,e)=>n+seatsLeft(e),0);
  $("adminEventTable").innerHTML=events.map(e=>`<tr><td>${escapeHTML(e.title)}</td><td>${formatDate(e.date)}</td><td>${seatsLeft(e)}/${e.capacity}</td><td><button class="table-action" data-edit="${escapeHTML(e.id)}">Edit</button><button class="table-action danger" data-delete-event="${escapeHTML(e.id)}">Delete</button></td></tr>`).join("")||'<tr><td colspan="4">No events created.</td></tr>';
  $("participantsTable").innerHTML=registrations.map(r=>{const e=events.find(x=>x.id===r.eventId);return `<tr><td>${escapeHTML(r.name)}</td><td>${escapeHTML(r.email)}</td><td>${escapeHTML(e?.title||"Removed event")}</td><td>${escapeHTML(r.phone)}</td><td><button class="table-action danger" data-remove-registration="${escapeHTML(r.id)}">Remove</button></td></tr>`;}).join("")||'<tr><td colspan="5">No registrations yet.</td></tr>';
  $("participantCount").textContent=registrations.length+" records";
}
function resetEventForm(){$("eventForm").reset();$("editEventId").value="";$("eventFormHeading").textContent="Add a new event";$("saveEventBtn").textContent="Save event";$("cancelEditBtn").classList.add("hidden");$("eventFormMessage").textContent="";}
function editEvent(id){const e=events.find(x=>x.id===id);if(!e)return;$("editEventId").value=e.id;$("eventTitle").value=e.title;$("eventCategory").value=e.category;$("eventDate").value=e.date;$("eventTime").value=e.time;$("eventVenue").value=e.venue;$("eventCapacity").value=e.capacity;$("eventFee").value=e.fee;$("eventDescription").value=e.description;$("eventFormHeading").textContent="Edit event";$("saveEventBtn").textContent="Update event";$("cancelEditBtn").classList.remove("hidden");$("eventFormHeading").scrollIntoView({behavior:"smooth",block:"center"});}
function exportCSV(){
  const rows=[["Name","Email","Phone","Department","Year","Event","Registration Date"],...registrations.map(r=>[r.name,r.email,r.phone,r.department,r.year,events.find(e=>e.id===r.eventId)?.title||"Removed event",r.createdAt])];
  const csv=rows.map(row=>row.map(v=>'"'+String(v??"").replace(/"/g,'""')+'"').join(",")).join("\r\n");
  const url=URL.createObjectURL(new Blob(["\uFEFF"+csv],{type:"text/csv;charset=utf-8;"}));const a=document.createElement("a");a.href=url;a.download="eventhub_registrations.csv";a.click();URL.revokeObjectURL(url);
}
$("eventGrid").addEventListener("click",e=>{const b=e.target.closest("[data-register]");if(b)registerFor(b.dataset.register);});
$("registrationForm").addEventListener("submit",e=>{
  e.preventDefault();const eventId=$("registrationEventId").value,event=events.find(x=>x.id===eventId);
  const name=$("fullName").value.trim(),email=$("email").value.trim().toLowerCase(),phone=$("phone").value.trim();
  if(!event){$("registrationMessage").textContent="Please select a valid event.";return;}
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ $("registrationMessage").textContent="Enter a valid email address.";return;}
  if(!/^[0-9]{10}$/.test(phone)){$("registrationMessage").textContent="Enter a valid 10-digit phone number.";return;}
  if(registrations.some(r=>r.eventId===eventId&&r.email===email)){$("registrationMessage").textContent="This email is already registered for this event.";return;}
  if(seatsLeft(event)<=0){$("registrationMessage").textContent="This event is full.";return;}
  registrations.push({id:"reg"+Date.now(),eventId,name,email,phone,department:$("department").value.trim(),year:$("yearLevel").value,createdAt:new Date().toISOString(),status:"Confirmed"});
  save();render();closeModal("registrationModal");showToast("Registration confirmed successfully!");
});
$("myRegistrationList").addEventListener("click",e=>{const b=e.target.closest("[data-cancel]");if(!b)return;if(confirm("Cancel this registration?")){registrations=registrations.filter(r=>r.id!==b.dataset.cancel);save();render();showToast("Registration cancelled.");}});
$("searchInput").addEventListener("input",render);$("categoryFilter").addEventListener("change",render);
$("adminLoginBtn").addEventListener("click",()=>{if(isAdmin){$("adminPanel").scrollIntoView({behavior:"smooth"});return;}$("adminLoginForm").reset();$("adminLoginMessage").textContent="";openModal("adminLoginModal");});
$("adminLoginForm").addEventListener("submit",e=>{e.preventDefault();if($("adminUsername").value==="admin"&&$("adminPassword").value==="admin123"){isAdmin=true;closeModal("adminLoginModal");$("adminPanel").classList.remove("hidden");renderAdmin();$("adminPanel").scrollIntoView({behavior:"smooth"});showToast("Demo admin login successful.");}else{$("adminLoginMessage").textContent="Incorrect demo username or password."; }});
$("adminLogoutBtn").addEventListener("click",()=>{isAdmin=false;$("adminPanel").classList.add("hidden");showToast("Logged out.");});
$("eventForm").addEventListener("submit",e=>{
  e.preventDefault();const id=$("editEventId").value,capacity=Number($("eventCapacity").value),fee=Number($("eventFee").value);
  const old=events.find(x=>x.id===id),registered=registrations.filter(r=>r.eventId===id).length;
  if(capacity<registered){$("eventFormMessage").textContent=`Capacity cannot be lower than existing registrations (${registered}).`;return;}
  const data={id:id||"ev"+Date.now(),title:$("eventTitle").value.trim(),category:$("eventCategory").value,date:$("eventDate").value,time:$("eventTime").value,venue:$("eventVenue").value.trim(),capacity,fee,description:$("eventDescription").value.trim()};
  if(data.date<today){$("eventFormMessage").textContent="Choose today or a future date.";return;}
  if(old)events=events.map(x=>x.id===id?data:x);else events.push(data);
  save();resetEventForm();render();showToast(old?"Event updated.":"New event added.");
});
$("cancelEditBtn").addEventListener("click",resetEventForm);
$("adminEventTable").addEventListener("click",e=>{
  const edit=e.target.closest("[data-edit]"),del=e.target.closest("[data-delete-event]");
  if(edit)editEvent(edit.dataset.edit);
  if(del){const id=del.dataset.deleteEvent;if(confirm("Delete this event and its registrations?")){events=events.filter(x=>x.id!==id);registrations=registrations.filter(r=>r.eventId!==id);save();render();showToast("Event deleted.");}}
});
$("participantsTable").addEventListener("click",e=>{const b=e.target.closest("[data-remove-registration]");if(b&&confirm("Remove this participant registration?")){registrations=registrations.filter(r=>r.id!==b.dataset.removeRegistration);save();render();showToast("Participant removed.");}});
$("exportCsvBtn").addEventListener("click",exportCSV);
$("menuToggle").addEventListener("click",()=>$("mainNav").classList.toggle("open"));
$("mainNav").addEventListener("click",e=>{if(e.target.tagName==="A")$("mainNav").classList.remove("open");});
document.querySelectorAll("[data-close]").forEach(b=>b.addEventListener("click",()=>closeModal(b.dataset.close)));
document.querySelectorAll(".modal").forEach(m=>m.addEventListener("click",e=>{if(e.target===m)closeModal(m.id);}));
document.addEventListener("keydown",e=>{if(e.key==="Escape")document.querySelectorAll(".modal").forEach(m=>m.classList.add("hidden"));});
$("year").textContent=new Date().getFullYear();
$("eventDate").min=today;
render();
