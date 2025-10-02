const axios = require('axios');

const BASE_URL = 'http://localhost:4002/api/v1';

async function cleanReservas() {
  try {
    console.log('🧹 Limpiando reservas existentes...');

    // Login
    const login = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'admin@admin.com',
      password: '12345678',
    });

    const token = login.data.token;
    console.log('✅ Login exitoso');

    // Obtener todas las reservas
    const reservasResponse = await axios.get(`${BASE_URL}/reservas`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const reservas = reservasResponse.data.data;
    console.log(`📋 Encontradas ${reservas.length} reservas para eliminar`);

    // Eliminar cada reserva
    for (const reserva of reservas) {
      try {
        await axios.delete(`${BASE_URL}/reservas/${reserva.reserva_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(
          `✅ Eliminada reserva ${reserva.reserva_id}: ${reserva.cliente_nombre}`,
        );
      } catch (error) {
        console.error(
          `❌ Error eliminando reserva ${reserva.reserva_id}:`,
          error.response?.data?.message || error.message,
        );
      }
    }

    // Verificar que no queden reservas
    const verifyResponse = await axios.get(`${BASE_URL}/reservas`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log(
      `✅ Verificación: ${verifyResponse.data.data.length} reservas restantes`,
    );
    console.log('🎉 Limpieza completada exitosamente');
  } catch (error) {
    console.error(
      '❌ Error durante la limpieza:',
      error.response?.data?.message || error.message,
    );
  }
}

cleanReservas();
