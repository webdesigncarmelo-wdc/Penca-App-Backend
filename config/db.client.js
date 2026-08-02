import 'dotenv/config';
import mongoose from 'mongoose';

class dbClient {
    constructor() {
        this.conectarBaseDatos();
    }

    async conectarBaseDatos() {
        const queryString = `mongodb+srv://wdc:${process.env.PASS_DB}@cluster0.hijh1jp.mongodb.net/?appName=Cluster0`;
        await mongoose.connect(queryString, { dbName: 'penca' });
        console.log('Conectado a la base de datos');
    }

    //mongodb+srv://wdc:<db_password>@cluster0.hijh1jp.mongodb.net/?appName=Cluster0

    // Método para cerrar la conexión
    async cerrarConexion() {
        try {
            await mongoose.disconnect();
            console.log("Conexión a la base de datos cerrada");
        } catch (e) {
            console.error("Error al cerrar la conexión:", e);
        }
    }
}

// Nota: No llamamos cerrarConexion() aquí porque la API está en funcionamiento permanente.
// Este método se puede utilizar cuando sea necesario cerrar la conexión, por ejemplo,
// cuando la aplicación se esté cerrando o en situaciones específicas de mantenimiento.

export default new dbClient();