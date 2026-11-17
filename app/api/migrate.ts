import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";
import { env } from "./lib/env";
import { log } from "./lib/logger";

// Corre las migraciones SQL de db/migrations contra DATABASE_URL y termina.
// Se usa en el arranque del contenedor (docker-compose) para que el esquema
// exista antes de levantar el API. drizzle-kit no está disponible en la
// imagen de producción, por eso el migrator de drizzle-orm corre aquí.
const db = drizzle(env.databaseUrl);

await migrate(db, { migrationsFolder: "./db/migrations" });
log.info("Migraciones aplicadas correctamente");
process.exit(0);
