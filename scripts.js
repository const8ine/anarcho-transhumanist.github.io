document.addEventListener('DOMContentLoaded', () => {
    const EMAIL_RECIPIENT = "a29uLnJhZmlrb3ZAZ21haWwuY29t";

    function showAlert(message, duration = 120000) {
        const alertElement = document.createElement('div');
        alertElement.classList.add('alert');
        alertElement.setAttribute('aria-live', 'polite');

        const alertMessageElement = document.createElement('span');
        alertMessageElement.classList.add('alert__message');
        alertMessageElement.textContent = message;
        alertElement.appendChild(alertMessageElement);

        const closeButton = document.createElement('button');
        closeButton.classList.add('alert__close-button');
        closeButton.textContent = '×';
        closeButton.setAttribute('aria-label', 'Close alert');
        closeButton.addEventListener('click', (event) => {
            console.log('Close button clicked');
            event.stopPropagation();
            closeAlert(alertElement);
        });
        alertElement.appendChild(closeButton);

        document.body.appendChild(alertElement);

        console.log('Alert created, setting timeout');
        setTimeout(() => {
            console.log('Timeout reached, closing alert');
            closeAlert(alertElement);
        }, duration);
    }

    function closeAlert(alertElement) {
        console.log('Alert removed');
        if (alertElement) alertElement.remove();
    }

    function sendEmail(event) {
        event.preventDefault(); // Prevent default form submission

        const link = document.getElementById('send-email');
        const nameInput = document.getElementById('full-name');
        const subjectInput = document.getElementById('subject');
        const commentInput = document.getElementById('comment');

        if (link && nameInput && subjectInput) {
            const name = nameInput.value.trim();
            const subject = subjectInput.value.trim();
            const message = `Hello, my name is ${name}, I want to join. \n${commentInput ? commentInput.value.trim() : ''}`;
            const href = `mailto:${atob(EMAIL_RECIPIENT)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;

            link.setAttribute("href", href);
            link.click();
            showAlert("Your message has been prepared. Please confirm via your email client.");
        } else {
            console.error("Some required elements are missing from the DOM.");
            showAlert("Unable to prepare your message. Please check the form.", 5000);
        }
    }

    document.querySelector('.contact-form').addEventListener('submit', sendEmail);

    document.getElementById('email-input').addEventListener('input', function () {
        const subjectContainer = document.getElementById('subject-container');
        const subjectInput = document.getElementById('subject');

        if (subjectContainer && subjectInput) {
            if (this.value.trim() !== '') {
                subjectContainer.classList.remove('hidden');
                subjectInput.value = 'I want to join';
            } else {
                subjectContainer.classList.add('hidden');
                subjectInput.value = '';
            }
        } else {
            console.error("Subject-related elements not found");
        }
    });

    document.querySelector('.alert-close-button').addEventListener('click', closeAlert);
});
