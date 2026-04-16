// Contrato común que deben cumplir todas las notificaciones
interface INotification {
  send(to: string, message: string): Promise<void>;
}


class EmailNotification implements INotification {
  async send(to: string, message: string): Promise<void> {
    console.log(`Email a ${to}: ${message}`);
  }
}

class SMSNotification implements INotification {
  async send(to: string, message: string): Promise<void> {
    console.log(`SMS a ${to}: ${message}`);
  }
}

class PushNotification implements INotification {
  async send(to: string, message: string): Promise<void> {
    console.log(`Push a ${to}: ${message}`);
  }
}


type NotificationType = "email" | "sms" | "push";

class NotificationFactory {
  static create(type: NotificationType): INotification {
    switch (type) {
      case "email": return new EmailNotification();
      case "sms":   return new SMSNotification();
      case "push":  return new PushNotification();
      default:
        throw new Error(`Tipo de notificación desconocido: ${type}`);
    }
  }
}

async function notifyOrderShipped(userId: string, channel: NotificationType) {
  const notifier = NotificationFactory.create(channel);
  await notifier.send(userId, "¡Tu pedido ha sido enviado!");
}


notifyOrderShipped("user_123", "email");
notifyOrderShipped("user_456", "sms");
notifyOrderShipped("user_789", "push");