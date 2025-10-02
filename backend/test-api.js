const axios = require('axios');

async function testAPI() {
  try {
    console.log('🧪 Probando API de reservas...');

    // 1. Login para obtener token
    const loginResponse = await axios.post(
      'http://localhost:4002/api/v1/auth/login',
      {
        email: 'admin@admin.com',
        password: '12345678',
      },
    );

    const token = loginResponse.data.token;
    console.log('✅ Login exitoso, token obtenido');

    // 2. Verificar token
    const checkTokenResponse = await axios.post(
      'http://localhost:4002/api/v1/auth/check-token',
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    console.log('✅ Token válido, usuario:', checkTokenResponse.data.email);

    // 3. Obtener reservas
    const reservasResponse = await axios.get(
      'http://localhost:4002/api/v1/reservas',
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    const reservas = Array.isArray(reservasResponse.data)
      ? reservasResponse.data
      : reservasResponse.data.data || [];
    console.log('✅ Reservas obtenidas:', reservas.length);
    console.log('📋 Datos de reservas:');
    reservas.forEach((reserva, index) => {
      console.log(
        `   ${index + 1}. ID: ${reserva.reserva_id}, Cliente: ${reserva.cliente_nombre}, Mesa: ${reserva.mesa?.numero || 'N/A'}`,
      );
    });

    // 4. Obtener mesas
    const mesasResponse = await axios.get(
      'http://localhost:4002/api/v1/mesas',
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    console.log('✅ Mesas obtenidas:', mesasResponse.data.length);
    console.log('📋 Datos de mesas:');
    mesasResponse.data.forEach((mesa, index) => {
      console.log(
        `   ${index + 1}. ID: ${mesa.mesa_id}, Número: ${mesa.numero}, Estado: ${mesa.estado}`,
      );
    });
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

testAPI();
