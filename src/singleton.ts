import { Pool } from "pg"; // npm i pg @types/pg

class DatabaseConnection {
  private static instance: DatabaseConnection | null = null;
  private pool: Pool;

  private constructor() {
    this.pool = new Pool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      max: 20,        
      idleTimeoutMillis: 30_000,
    });
    console.log("🗄️  Pool de conexiones creado (solo ocurre una vez)");
  }

  static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  async query<T>(sql: string, params?: unknown[]): Promise<T[]> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(sql, params);
      return result.rows as T[];
    } finally {
      client.release(); 
    }
  }

  async close(): Promise<void> {
    await this.pool.end();
    DatabaseConnection.instance = null;
  }
}

class UserService {
  private db = DatabaseConnection.getInstance();

  async findById(id: number) {
    return this.db.query<{ id: number; name: string }>(
      "SELECT * FROM users WHERE id = $1",
      [id]
    );
  }
}

class OrderService {
  private db = DatabaseConnection.getInstance();

  async findByUser(userId: number) {
    return this.db.query<{ id: number; total: number }>(
      "SELECT * FROM orders WHERE user_id = $1",
      [userId]
    );
  }
}