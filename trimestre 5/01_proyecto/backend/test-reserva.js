const axios = require('axios');

const BASE_URL = 'http://localhost:4001/api/v1';

async function testReservas() {
  try {
    console.log('🧪 Iniciando pruebas del sistema de reservas...\n');

    // 1. Login para obtener token
    console.log('1️⃣ Probando login...');
    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'admin@admin.com',
      password: '12345678',
    });

    const token = loginResponse.data.token;
    console.log('✅ Login exitoso');
    console.log(`🔑 Token: ${token.substring(0, 50)}...\n`);

    // 2. Obtener mesas disponibles
    console.log('2️⃣ Obteniendo mesas disponibles...');
    const mesasResponse = await axios.get(`${BASE_URL}/mesas`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log('✅ Mesas obtenidas:');
    mesasResponse.data.forEach((mesa) => {
      console.log(
        `   - Mesa ${mesa.mesa_id}: Capacidad ${mesa.capacidad}, Estado: ${mesa.estado}`,
      );
    });
    console.log('');

    // 3. Crear reserva con datos completos
    console.log('3️⃣ Creando reserva con datos completos...');
    const reservaData = {
      mesa_id: 1,
      cliente_nombre: 'Juan Pérez',
      fecha_hora: '2025-09-29T20:00:00.000Z',
      numero_personas: 2,
      notas: 'Reserva para cena romántica',
    };

    const reservaResponse = await axios.post(
      `${BASE_URL}/reservas`,
      reservaData,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    console.log('✅ Reserva creada exitosamente:');
    console.log(`   - ID: ${reservaResponse.data.data.reserva_id}`);
    console.log(`   - Mesa: ${reservaResponse.data.data.mesa_id}`);
    console.log(`   - Cliente: ${reservaResponse.data.data.cliente_nombre}`);
    console.log(`   - Estado: ${reservaResponse.data.data.estado}`);
    console.log(`   - Fecha: ${reservaResponse.data.data.fecha_hora}\n`);

    // 4. Crear reserva con datos mínimos
    console.log('4️⃣ Creando reserva con datos mínimos...');
    const reservaMinimaData = {
      mesa_id: 2,
      cliente_nombre: 'María García',
      fecha_hora: '2025-09-30T19:30:00.000Z',
      numero_personas: 4,
    };

    const reservaMinimaResponse = await axios.post(
      `${BASE_URL}/reservas`,
      reservaMinimaData,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    console.log('✅ Reserva mínima creada exitosamente:');
    console.log(`   - ID: ${reservaMinimaResponse.data.data.reserva_id}`);
    console.log(`   - Mesa: ${reservaMinimaResponse.data.data.mesa_id}`);
    console.log(
      `   - Cliente: ${reservaMinimaResponse.data.data.cliente_nombre}`,
    );
    console.log(`   - Estado: ${reservaMinimaResponse.data.data.estado}\n`);

    // 5. Obtener todas las reservas
    console.log('5️⃣ Obteniendo todas las reservas...');
    const reservasResponse = await axios.get(`${BASE_URL}/reservas`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log('✅ Reservas obtenidas:');
    reservasResponse.data.data.forEach((reserva) => {
      console.log(
        `   - Reserva ${reserva.reserva_id}: ${reserva.cliente_nombre} - ${reserva.estado}`,
      );
    });
    console.log('');

    console.log('🎉 ¡Todas las pruebas pasaron exitosamente!');
  } catch (error) {
    console.error('❌ Error durante las pruebas:');
    if (error.response) {
      console.error(`   Status: ${error.response.status}`);
      console.error(`   Message: ${error.response.data.message}`);
      if (error.response.data.errors) {
        console.error('   Validation Errors:');
        error.response.data.errors.forEach((err) => {
          console.error(
            `     - ${err.property}: ${Object.values(err.constraints).join(', ')}`,
          );
        });
      }
    } else {
      console.error(`   Error: ${error.message}`);
    }
  }
}

// Ejecutar las pruebas
testReservas();
