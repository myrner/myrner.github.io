const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

// create element and render cafe
function renderCafe(doc){
	let li = document.createElement('li');
	let name = document.createElement('span');
	let city = document.createElement('span');
	let cross = document.createElement('div');

	li.setAttribute('data-id', doc.id);
	name.textContent = doc.data().name;
	city.textContent = doc.data().city;
	cross.textContent = 'x';

	li.appendChild(name);
	li.appendChild(city);
	li.appendChild(cross);

	cafeList.appendChild(li);

	//deleting data
	cross.addEventListener('click', (e) => {
		e.stopPropagation();
		let id = e.target.parentElement.getAttribute('data-id');
		db.collection('cafes').doc(id).delete();
	})
}

//saving data
form.addEventListener('submit', (e) => {
	e.preventDefault();
	db.collection('cafes').add({
		name: form.name.value,
		city: form.city.value
	});
	form.name.value = '';
	form.city.value = '';
});

//real-time data change listener
db.collection('cafes').orderBy('city').onSnapshot(snapshot => {
	let changes = snapshot.docChanges();
	changes.forEach(change => {
		if(change.type == 'added'){
			renderCafe(change.doc);
		} else if (change.type == 'removed'){
			// let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
			let li = cafeList.querySelector(`[data-id="${change.doc.id}" ]`);
			cafeList.removeChild(li);
		}
	})
});

/*
//updating data
db.collection('cafes').doc('*****ID OF LI ITEM GOES HERE*****').update({
	name: 'New Name'
});
*/

/*
//setting data - completely overrides document with new properties 
db.collection('cafes').doc('******ID OF LI ITEM GOES HERE*****').set({
	name: 'Overide Name';
	city: 'Override City';
});
*/

/*
//getting data - basic all
db.collection('cafes').get().then((snapshot) => {
	snapshot.docs.forEach(doc => {
		renderCafe(doc);
	})
});
*/

/*
//getting data - ordered by name alphabetical, only in San Francisco
db.collection('cafes').where('city', '==', 'San Francisco').orderBy('name').get().then((snapshot) => {
	snapshot.docs.forEach(doc => {
		renderCafe(doc);
	})
});
*/

/*
//getting data - order by name alphabetical - lower case will come at end
db.collection('cafes').orderBy('name').get().then((snapshot) => {
	snapshot.docs.forEach(doc => {
		renderCafe(doc);
	})
});
*/

/*
//getting data with specific query - case sensitive
db.collection('cafes').where('city', '==', 'San Francisco').get().then((snapshot) => {
	snapshot.docs.forEach(doc => {
		renderCafe(doc);
	})
});

//getting data with specific query - case sensitive - later/earlier in alphabet
db.collection('cafes').where('city', '>', 'g').get().then((snapshot) => {
	snapshot.docs.forEach(doc => {
		renderCafe(doc);
	})
});

*/