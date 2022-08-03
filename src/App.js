//Componente padre de toda la aplicacion
export const App = () => {
	const $btnConsultar = document.getElementById('btnConsultar'),
		$btnEnviar = document.getElementById('btnEnviar'),
		$btnModificar = document.getElementById('btnModificar'),
		$btnEliminar = document.getElementById('btnEliminar');

	const $div = document.getElementById('contenedor'),
		$ol = document.getElementById('lista');

	let $fragment = document.createDocumentFragment();

	$btnConsultar.addEventListener('click', () => {
		getFetch();
	});

	$btnEnviar.addEventListener('click', (e) => {
		postFetch();
		console.log(update);
	});

	//Metodo Get con Fetch
	const getFetch = async () => {
		const optionsGet = {
			method: 'GET',
			headers: {
				'Content-type': 'aplication/json',
			},
		};
		await fetch('http://localhost:3000/peliculas', optionsGet)
			.then((res) => {
				if (res.ok) {
					return res.json();
				} else {
					throw new Error(`${res.status} ${res.statusText}`);
				}
			})
			.then((res) => {
				$ol.innerHTML = '';
				res.forEach((peli) => {
					const $li = document.createElement('li');
					$li.textContent = `Pelicula: ${peli.nombre}. 
                    Director: ${peli.director}.
                    Clasificacion: ${peli.clasificacion}.`;
					$fragment.appendChild($li);
				});
				$ol.appendChild($fragment);
			})
			.catch((err) => {
				console.error(`${err.name}: ${err.message}`);
			});
	};

	//Metodo Post con Fetch
	const postFetch = () => {
		const update = {
			nombre: document.getElementById('input-nombre').value,
			director: document.getElementById('input-director').value,
			clasificacion: document.getElementById('input-clasificacion').value,
		};
		fetch('http://localhost:3000/peliculas', {
			method: 'POST',
			headers: {
				'Content-type': 'aplication/json',
			},
			body: JSON.stringify(update),
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				} else {
					throw new Error(`${res.status} ${res.statusText}`);
				}
			})
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.error(`Error: ${err.message}`);
			});
	};
};
