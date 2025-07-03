document.addEventListener('DOMContentLoaded', () => {
    const loginSection = document.getElementById('login-section');
    const homeSection = document.getElementById('home-section');
    const vehicleDetailsSection = document.getElementById('vehicle-details-section');

    const loginForm = document.getElementById('login-form');
    const loginMessage = document.getElementById('login-message');
    const driverDetailsForm = document.getElementById('driver-details-form');
    const rentMessage = document.getElementById('rent-message');

    const homeLink = document.getElementById('home-link');
    const vehiclesLink = document.getElementById('vehicles-link');
    const vehicleGallery = document.querySelector('.vehicle-gallery');
    const selectedVehicleInfo = document.getElementById('selected-vehicle-info');

    let loggedIn = false;
    let selectedVehicle = null;

    // Dados dos veículos (simulados) - AQUI ESTÁ A ALTERAÇÃO PARA A IMAGEM DO SEU CARRO
    const vehicles = [
        { id: 1, name: 'Volkswagen Gol', dailyRate: 80, image: 'https://via.placeholder.com/300x180/007bff/FFFFFF?text=Volkswagen+Gol' },
        { id: 2, name: 'Fiat Argo', dailyRate: 120, image: 'carro.png' }, // Caminho para a sua imagem
        { id: 3, name: 'Chevrolet Onix', dailyRate: 90, image: 'https://via.placeholder.com/300x180/007bff/FFFFFF?text=Chevrolet+Onix' },
        { id: 4, name: 'Toyota Corolla', dailyRate: 150, image: 'https://via.placeholder.com/300x180/007bff/FFFFFF?text=Toyota+Corolla' }
    ];

    // Função para mostrar uma seção e esconder as outras
    function showSection(sectionToShow) {
        const sections = [loginSection, homeSection, vehicleDetailsSection];
        sections.forEach(section => {
            if (section === sectionToShow) {
                section.classList.remove('hidden');
                section.classList.add('active');
            } else {
                section.classList.add('hidden');
                section.classList.remove('active');
            }
        });
    }

    // Função para carregar os veículos na galeria
    function loadVehicles() {
        vehicleGallery.innerHTML = ''; // Limpa a galeria
        vehicles.forEach(vehicle => {
            const vehicleCard = document.createElement('div');
            vehicleCard.classList.add('vehicle-card');
            vehicleCard.dataset.vehicleId = vehicle.id;
            vehicleCard.innerHTML = `
                <img src="${vehicle.image}" alt="${vehicle.name}">
                <div class="vehicle-card-info">
                    <h3>${vehicle.name}</h3>
                    <p>Diária: R$ ${vehicle.dailyRate.toFixed(2)}</p>
                </div>
            `;
            vehicleCard.addEventListener('click', () => selectVehicle(vehicle));
            vehicleGallery.appendChild(vehicleCard);
        });
    }

    // Função para selecionar um veículo
    function selectVehicle(vehicle) {
        selectedVehicle = vehicle;
        selectedVehicleInfo.innerHTML = `
            <img src="${vehicle.image}" alt="${vehicle.name}">
            <h3>${vehicle.name}</h3>
            <p>Diária: R$ ${vehicle.dailyRate.toFixed(2)}</p>
            <p>Para alugar este veículo, preencha os dados do motorista abaixo.</p>
        `;
        showSection(vehicleDetailsSection);
    }

    // Evento de login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === 'Admin' && password === '123@4') {
            loggedIn = true;
            loginMessage.textContent = '';
            loadVehicles(); // Carrega os veículos após o login
            showSection(homeSection);
        } else {
            loginMessage.textContent = 'Usuário ou senha inválidos.';
        }
    });

    // Evento de finalização do pedido do carro
    driverDetailsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!selectedVehicle) {
            rentMessage.textContent = 'Por favor, selecione um veículo primeiro.';
            rentMessage.classList.remove('success');
            rentMessage.classList.add('error');
            return;
        }

        const driverName = document.getElementById('driver-name').value;
        const driverCnh = document.getElementById('driver-cnh').value;

        if (driverName && driverCnh) {
            rentMessage.textContent = `Aluguel do ${selectedVehicle.name} efetuado com sucesso para ${driverName}! Sua CNH: ${driverCnh}.`;
            rentMessage.classList.remove('error');
            rentMessage.classList.add('success');
            driverDetailsForm.reset(); // Limpa o formulário
            selectedVehicle = null; // Reseta o veículo selecionado
        } else {
            rentMessage.textContent = 'Por favor, preencha todos os dados do motorista.';
            rentMessage.classList.remove('success');
            rentMessage.classList.add('error');
        }
    });

    // Eventos de navegação
    homeLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (loggedIn) {
            showSection(homeSection);
        } else {
            showSection(loginSection);
        }
    });

    vehiclesLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (loggedIn) {
            showSection(homeSection); // A galeria de veículos está na home
        } else {
            alert('Faça login para ver os veículos.');
            showSection(loginSection);
        }
    });

    // Inicializa a página mostrando a seção de login
    showSection(loginSection);
});