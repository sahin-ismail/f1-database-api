import { OpenApiGeneratorV3, OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';

import { constructorRegistry } from '@modules/constructor/constructorRouter';
import { driverRegistry } from '@modules/driver/driverRouter';
import { healthCheckRegistry } from '@modules/healthCheck/healthCheckRouter';
import { statisticRegistry } from '@modules/statistic/statisticRouter';

export function generateOpenAPIDocument() {
  const registry = new OpenAPIRegistry([healthCheckRegistry, driverRegistry, constructorRegistry, statisticRegistry]);
  const generator = new OpenApiGeneratorV3(registry.definitions);

  let document = generator.generateDocument({
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Swagger API',
    },
    externalDocs: {
      description: 'View the raw OpenAPI Specification in JSON format',
      url: '/swagger.json',
    },
  });

  // Manually add Basic Authentication security scheme to the document
  const basicAuthSecurityScheme: any = {
    type: 'http',
    scheme: 'basic'
  };

  // Ensure the components object exists, and add the security scheme
  document.components = document.components || {};
  document.components.securitySchemes = {
    ...document.components.securitySchemes,
    basicAuth: basicAuthSecurityScheme,
  };

  // Optionally, apply the Basic Authentication to all paths globally
  // This is an example to apply it globally, remove it if you plan to apply it per path
  document.security = [
    {
      basicAuth: [],
    },
  ];

  // If you want to apply Basic Authentication to specific paths only,
  // you would modify the paths object in the document here accordingly.

  return document;
}
