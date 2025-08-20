export interface NewSleepSessionProps {
    uid: string;
    startSleep: Date;
    endSleep: Date;
    sessionDate: Date;
    interruptions: Record<string, any>;
    sleepQuality: Record<string, any>;
}

export interface SleepSessionProps extends NewSleepSessionProps {
    id: string;
    createdAt: Date;
}

export class SleepSession {
    public readonly id: string;
    public readonly uid: string;
    public readonly startSleep: Date;
    public readonly endSleep: Date;
    public readonly sessionDate: Date;
    public readonly interruptions: Record<string, any>;
    public readonly sleepQuality: Record<string, any>;
    public readonly createdAt: Date;

    constructor(props: SleepSessionProps){
        this.id = props.id;
        this.uid = props.uid;
        this.startSleep = props.startSleep;
        this.endSleep = props.endSleep;
        this.sessionDate = props.sessionDate;
        this.interruptions = props.interruptions;
        this.sleepQuality = props.sleepQuality;
        this.createdAt = props.createdAt;
    }

    toJSON() {
        return {
            id: this.id,
            uid: this.uid,
            startSleep: this.startSleep.toISOString(),
            endSleep: this.endSleep.toISOString(),
            sessionDate: this.sessionDate.toISOString(),
            interruptions: this.interruptions,
            sleepQuality: this.sleepQuality,
            createdAt: this.createdAt.toISOString(),
        };
    }
}