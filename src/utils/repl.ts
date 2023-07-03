// Load up the models and start a REPL session
import * as repl from 'repl';

import Producers from '../models/producers';
import Streams from '../models/streams';

const replServer = repl.start('solpanel:> ');

replServer.context.Streams = Streams;
replServer.context.Producers = Producers;
