
/** enumerator for all worker actions */
export enum WorkerAction {
    Init = 'INIT',
    Execute = 'EXECUTE',
    Terminate = 'TERMINATE'
}

export enum WorkerStatusCode {
    Initial,
    OK,
    Error,
    Empty,
    ToBeContinued
}

export class WorkerMessage {
    constructor(
        public data: any,
        public action: WorkerAction
    ) {
    }
    public status?: WorkerStatusCode = WorkerStatusCode.Initial;
}
