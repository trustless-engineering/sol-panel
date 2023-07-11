// Load up the models and start a REPL session
import * as repl from 'repl';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const replServer = repl.start('solpanel:> ');

replServer.context.streams = prisma.stream;
replServer.context.producers = prisma.producer;
