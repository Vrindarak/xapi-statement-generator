import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { generateInitialStatement } from '@libs/apiGateway';

import { middyfy } from '@libs/lambda';

import schema from './schema';

const activated: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  return generateInitialStatement({
    data: event.body
  });
}

export const main = middyfy(activated);
