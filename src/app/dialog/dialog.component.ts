import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'app-dialog',
    standalone: true,
    imports: [],
    template: `
        <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div class="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div class="sm:flex sm:items-start">
                                <div class="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:size-10">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="size-6 text-blue-600" fill="none"
                                         viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"
                                         data-slot="icon">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                              d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"/>
                                    </svg>
                                </div>
                                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <h3 class="text-base font-semibold text-gray-900" id="modal-title">{{ title }}</h3>
                                    <div class="mt-2">
                                        <p class="text-sm text-gray-500">{{ citation }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button (click)="onContinue()" type="button"
                                    class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto">
                                Continuer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: ``
})
export class DialogComponent {
    @Input() citation: string = "";

    @Input() title: string = "";

    @Output() continued = new EventEmitter<void>();

    onContinue() {
        this.continued.emit();
    }
}
