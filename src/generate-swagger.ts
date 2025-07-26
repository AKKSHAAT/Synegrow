import { writeFileSync } from 'fs';
import { swaggerSpec } from '../src/swagger';

writeFileSync('swagger.json', JSON.stringify(swaggerSpec, null, 2));
console.log('Swagger spec generated at swagger.json');