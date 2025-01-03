import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Fox Shop API')
    .setDescription(
      `
      API for managing Fox Shop products.
      
      Features:
      - Product management (CRUD operations)
      - Price history tracking
      - Stock management
      - Product search and filtering
      
      ## Query Parameters
      - Use 'name' for case-insensitive product search
      - Use 'minStock' and 'maxStock' to filter by inventory levels
      - Use 'includeInactive=true' to show deactivated products
      
      ## Price History
      Price changes are automatically tracked and can be retrieved per product
    `,
    )
    .setVersion('1.0')
    .addTag('Products', 'Product management endpoints')
    .addServer('http://localhost:3000', 'Local development')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
