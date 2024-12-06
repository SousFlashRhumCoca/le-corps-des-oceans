import {Injectable, signal, WritableSignal} from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class SignalService {
    private data: WritableSignal<boolean> = signal(true);

    setData(display: boolean): void {
        this.data.set(display);
    }

    getData(): WritableSignal<boolean> {
        return this.data;
    }
}
