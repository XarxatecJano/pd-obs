// Interfaz que deben implementar todas las estrategias
interface PaymentStrategy {
  readonly name: string;
  pay(amount: number, currency: string): Promise<{ success: boolean; transactionId: string }>;
}

class StripeStrategy implements PaymentStrategy {
  readonly name = "Stripe";

  constructor(private apiKey: string) {}

  async pay(amount: number, currency: string) {
    console.log(`💳 Stripe: procesando ${amount} ${currency}...`);
    
    return { success: true, transactionId: `stripe_${Date.now()}` };
  }
}

// Estrategia 2: PayPal
class PayPalStrategy implements PaymentStrategy {
  readonly name = "PayPal";

  constructor(private clientId: string, private secret: string) {}

  async pay(amount: number, currency: string) {
    console.log(`🅿️  PayPal: procesando ${amount} ${currency}...`);
    
    return { success: true, transactionId: `paypal_${Date.now()}` };
  }
}

// Estrategia 3: Bizum (mercado español)
class BizumStrategy implements PaymentStrategy {
  readonly name = "Bizum";

  constructor(private phoneNumber: string) {}

  async pay(amount: number, currency: string) {
    console.log(`📲 Bizum: enviando solicitud de ${amount} ${currency}...`);
   
    return { success: true, transactionId: `bizum_${Date.now()}` };
  }
}

class PaymentProcessor {
  private strategy: PaymentStrategy;

  constructor(strategy: PaymentStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: PaymentStrategy): void {
    console.log(`Cambiando método de pago a: ${strategy.name}`);
    this.strategy = strategy;
  }

  async checkout(amount: number, currency = "EUR"): Promise<void> {
    console.log(`\n🛒 Iniciando pago con ${this.strategy.name}`);
    const result = await this.strategy.pay(amount, currency);

    if (result.success) {
      console.log(`✅ Pago completado. ID de transacción: ${result.transactionId}`);
    } else {
      throw new Error("El pago ha fallado");
    }
  }
}

// Uso real en un flujo de checkout
async function runCheckout() {
  const stripe  = new StripeStrategy(process.env.STRIPE_KEY!);
  const paypal  = new PayPalStrategy(process.env.PAYPAL_ID!, process.env.PAYPAL_SECRET!);
  const bizum   = new BizumStrategy("+34612345678");

  const processor = new PaymentProcessor(stripe);

  
  await processor.checkout(49.99);


  processor.setStrategy(paypal);
  await processor.checkout(49.99);

  
  processor.setStrategy(bizum);
  await processor.checkout(49.99);
}

runCheckout();