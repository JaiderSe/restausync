const axios = require('axios');

const BASE_URL = 'http://localhost:4001/api/v1';

async function createTestData() {
  try {
    console.log('🧪 Creando datos de prueba para mesas...');

    // Login
    const login = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'admin@admin.com',
      password: '12345678',
    });

    const token = login.data.token;
    console.log('✅ Login exitoso');

    // Datos de prueba para mesas
    const testMesas = [
      {
        numero: 1,
        capacidad: 2,
        estado: 'libre',
        ubicacion: 'Ventana',
      },
      {
        numero: 2,
        capacidad: 4,
        estado: 'libre',
        ubicacion: 'Centro',
      },
      {
        numero: 3,
        capacidad: 6,
        estado: 'libre',
        ubicacion: 'Terraza',
      },
      {
        numero: 4,
        capacidad: 8,
        estado: 'libre',
        ubicacion: 'Privado',
      },
      {
        numero: 5,
        capacidad: 10,
        estado: 'libre',
        ubicacion: 'VIP',
      },
    ];

    console.log(`📝 Creando ${testMesas.length} mesas de prueba...`);

    // Crear cada mesa
    for (const mesa of testMesas) {
      try {
        const response = await axios.post(`${BASE_URL}/mesas`, mesa, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log(
          `✅ Creada mesa ${response.data.numero}: Capacidad ${response.data.capacidad} - ${response.data.estado}`,
        );
      } catch (error) {
        console.error(
          `❌ Error creando mesa ${mesa.numero}:`,
          error.response?.data?.message || error.message,
        );
      }
    }

    // Verificar las mesas creadas
    const verifyResponse = await axios.get(`${BASE_URL}/mesas`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log(
      `✅ Verificación: ${verifyResponse.data.length} mesas en total`,
    );
    console.log('📋 Lista de mesas:');
    verifyResponse.data.forEach((mesa) => {
      console.log(
        `   - Mesa ${mesa.numero}: Capacidad ${mesa.capacidad} - ${mesa.estado} (${mesa.ubicacion})`,
      );
    });

    console.log('🎉 Mesas de prueba creadas exitosamente');

    // Probar eliminación de una mesa
    console.log('\n🗑️ Probando eliminación de mesa...');
    try {
      const mesaToDelete = verifyResponse.data.find(
        (m) => m.numero === 5 && m.capacidad === 10,
      );
      if (mesaToDelete) {
        await axios.delete(`${BASE_URL}/mesas/${mesaToDelete.mesa_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(`✅ Mesa ${mesaToDelete.numero} eliminada correctamente`);
      } else {
        console.log('⚠️ No se encontró la mesa para eliminar');
      }
    } catch (error) {
      console.error(
        '❌ Error eliminando mesa:',
        error.response?.data?.message || error.message,
      );
    }

    // Verificar las mesas después de la eliminación
    const finalResponse = await axios.get(`${BASE_URL}/mesas`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log(
      `✅ Verificación final: ${finalResponse.data.length} mesas restantes`,
    );
  } catch (error) {
    console.error(
      '❌ Error durante la creación de datos de prueba:',
      error.response?.data?.message || error.message,
    );
  }
}

createTestData();
