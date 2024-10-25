import { Logger } from '../extra/Logger';
import { Agent } from './Agent';
import { ChainStatus } from '../types/types';

// Node monitoring and status reporting agent
export abstract class ReportingAgent extends Agent {
  private static authorizedAgent: Agent | null = null;
  private status: ChainStatus.Type[] = [];
  constructor() {
    super();
    if (!(ReportingAgent.authorizedAgent instanceof Agent)) {
      throw new Error(
        'Node Reporter needs to be instantiated by an authorized Agent',
      );
    }
    ReportingAgent.authorizedAgent = null;
  }

  static authorize(agent: Agent): void {
    ReportingAgent.authorizedAgent = agent;
  }

  notify(status: ChainStatus.Type): void {
    Logger.info(`Status ${status} from ${0}`);
    this.status.push(status);
    this.emit('signal', status);
  }

  getSignals(): ChainStatus.Type[] {
    return this.status;
  }
}
