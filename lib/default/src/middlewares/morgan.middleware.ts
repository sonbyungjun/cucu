import { Request, Response } from 'express';
import * as morgan from 'morgan';
import * as chalk from 'chalk';
import * as moment from 'moment-timezone';

morgan.token('date', (req, res, tz) => {
  return moment()
    .tz('Asia/Seoul')
    .format('YYYY-MM-DD, hh:mm a');
});

export function morganCustom(tokens: morgan.TokenIndexer, req: Request, res: Response) {
  return [
    chalk.hex('#d800e0').bold(tokens.method(req, res)),
    chalk.hex('#ffb142').bold(tokens.status(req, res)),
    chalk.hex('#ff5252').bold(tokens.url(req, res)),
    chalk.hex('#2ed573').bold(tokens['response-time'](req, res) + ' ms'),
    chalk.hex('#f78fb3').bold('@ ' + tokens.date(req, res)),
    chalk.yellow(tokens['remote-addr'](req, res)),
    chalk.hex('#fffa65').bold('from ' + tokens.referrer(req, res)),
    chalk.hex('#1e90ff')(tokens['user-agent'](req, res)),
  ].join(' ');
}

export function morganOption() {
  return {
    skip: (req: Request, res: Response) => {
      if (req.url === '/healthCheck') {
        return true;
      }
      if (req.headers['user-agent'] === 'AWS Security Scanner') {
        return true;
      }
      return false;
    },
  };
}
