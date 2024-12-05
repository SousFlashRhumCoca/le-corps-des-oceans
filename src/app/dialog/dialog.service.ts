import {
    Injectable,
    ComponentFactoryResolver,
    Injector,
    ApplicationRef,
    EmbeddedViewRef,
    createComponent, ComponentRef
} from '@angular/core';
import {DialogComponent} from './dialog.component';
import {Observable, Subject} from "rxjs"; // Assurez-vous que le chemin est correct

@Injectable({
    providedIn: 'root'
})
export class DialogService {
    private dialogRef: ComponentRef<DialogComponent> | null = null;

    constructor(private appRef: ApplicationRef, private injector: Injector) {
    }

    openDialog(title: string, citation: string): Observable<'continued'> {
        // Create a Subject to emit events
        const dialogResult$ = new Subject<'continued'>();

        // Dynamically create the DialogComponent
        this.dialogRef = createComponent(DialogComponent, {
            environmentInjector: this.appRef.injector,
        });

        // Set inputs
        this.dialogRef.instance.title = title;
        this.dialogRef.instance.citation = citation;

        this.dialogRef.instance.continued.subscribe(() => {
            dialogResult$.next('continued');
            dialogResult$.complete();
            this.closeDialog();
        });

        // Attach the component to the application view
        this.appRef.attachView(this.dialogRef.hostView);
        document.body.appendChild(this.dialogRef.location.nativeElement);

        return dialogResult$.asObservable();
    }

    closeDialog() {
        if (this.dialogRef) {
            this.appRef.detachView(this.dialogRef.hostView);
            this.dialogRef.destroy();
            this.dialogRef = null;
        }
    }
}
