export default class NotificationMessage {
    element; // HTMLElement;

    constructor({
        status = 'success',
        headerText = 'Notification',
        bodyText = '',
        duration = 0
    } = {}) {

        this.status = status;
        this.headerText = headerText;
        this.bodyText = bodyText;
        this.duration = duration;
        
        this.render();
    }

    get template () {
        return `
            <div class="notification ${this.status}" style="--value:${this.duration / 1000}s">
                <div class="timer"></div>
                <div class="inner-wrapper">
                    <div class="notification-header">${this.headerText}</div>
                    <div class="notification-body">
                        ${this.bodyText}
                    </div>
                </div>
            </div>
        `;
    }

    render() {
        const element = document.createElement('div');
        element.className = 'notification-block';

        element.innerHTML = this.template;
        this.element = element.firstElementChild;

        this.show();
    }

    show() {
        setTimeout(() => {
            this.destroy();
        }, this.duration);
    }

    remove() {
        this.element.remove();
    }

    destroy() {
        this.remove();
    }
}