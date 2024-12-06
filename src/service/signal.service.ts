import {Injectable, signal, WritableSignal} from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class SignalService {
    private data: WritableSignal<boolean> = signal(true);
    private loader: WritableSignal<boolean> = signal(true);

    setData(display: boolean): void {
        this.data.set(display);
    }

    getData(): WritableSignal<boolean> {
        return this.data;
    }

    setLoading(display: boolean): void {
        console.log(display)
        this.loader.set(display);
    }

    getLoading(): WritableSignal<boolean> {
        return this.loader;
    }
}
