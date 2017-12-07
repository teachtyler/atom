'use babel'

export default class TranscriptInput {
    constructor(serializedState) {
        // create container
        this.element = document.createElement('div');
        this.element.classList.add('serenade-atom');
        this.element.classList.add('transcript-input-container');

        // create element to hold text message
        this.input = document.createElement('atom-text-editor');
        this.input.setAttribute('mini', 'true');
        this.input.addEventListener('blur', (e) => {
            this.hide();
        });
        this.input.addEventListener('keyup', (e) => {
            if (e.which == 27) {
                this.hide();
            }
            else if (e.which == 13) {
                this.execute();
                this.hide();
            }
        });
        this.element.appendChild(this.input);

        // create native atom panel at top of editor
        this.panel = atom.workspace.addModalPanel({
            item: this.element,
            visible: false
        });
    }

    execute() {
        if (!this.delegate) {
            return;
        }

        this.delegate.onTranscriptInputDone(this.input.getModel().getText());
    }

    hide() {
        this.panel.hide();
        if (this.delegate) {
            this.delegate.onTranscriptInputHide();
        }
    }

    show() {
        this.input.getModel().setText('');
        this.panel.show();
        this.input.focus();
    }
}