const nameInput = document.querySelector('#name-input');
const phoneInput = document.querySelector('#phone-input');
const formBtn = document.querySelector('#form-btn');
const form = document.querySelector('#form');
const list = document.querySelector('#list');

const NAME_REGEX = /^[A-ZÑ][a-zñ]{3,10} [A-ZÑ][a-zñ]{3,10}$/
const PHONE_REGEX = /^[0](412|414|416|426|424|212)[0-9]{7}$/;

let nameValidation = false;
let phoneValidation = false;
let editValidation = true;
let editValidationName = true;
const validateInput = (input, regexValidation) => {
    const infoText = input.parentElement.children[1];
    formBtn.disabled = nameValidation && phoneValidation ? false : true;
    if (input.value === '') {
        input.classList.remove('correct');
        input.classList.remove('wrong');

    } else if (regexValidation) {
        input.classList.add('correct');
        input.classList.remove('wrong');

    } else {
        input.classList.remove('correct');
        input.classList.add('wrong');

    }

};

nameInput.addEventListener('input', e => {
    nameValidation = NAME_REGEX.test(nameInput.value);
    validateInput(nameInput, nameValidation);
});

phoneInput.addEventListener('input', e => {
    phoneValidation = PHONE_REGEX.test(phoneInput.value);
    validateInput(phoneInput, phoneValidation);
});



form.addEventListener('submit', e => {
    e.preventDefault();
    const li = document.createElement('li');
    li.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="delete-icon">
    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  
    <input class='edit-agenda' type="text" value="${nameInput.value}" readonly>
    <input class='edit-agenda' type="text" value="${phoneInput.value}" readonly>
    <button type="button" class="edit-icon"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="edit-svg">
    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg></button>

    `;

    list.append(li);

    nameInput.value = '';
    phoneInput.value = '';
    validateInput(nameInput);
    validateInput(phoneInput);
    nameValidation = false;
    phoneValidation = false;
    formBtn.disabled = true;
    
    localStorage.setItem('listaContactos', list.innerHTML);
});

list.addEventListener('click', e => {
    if (e.target.closest('.delete-icon')) {
        e.target.closest('.delete-icon').parentElement.remove();
        localStorage.setItem('listaContactos', list.innerHTML);
    }

    if (e.target.closest('.edit-icon')) {
        const editIcon = e.target.closest('.edit-icon');
        const editInput = editIcon.parentElement.children[2];
        const editInputName = editIcon.parentElement.children[1];
        editInput.addEventListener('input', e => {
            editValidation = PHONE_REGEX.test(editInput.value);
            validateInput(editInput, editValidation);
        });
        editInputName.addEventListener('input', e => {
            editValidationName = NAME_REGEX.test(editInputName.value);
            validateInput(editInputName, editValidationName);
        });
        if (editIcon.classList.contains('editando')&& editValidation && editValidationName) {
            editIcon.classList.remove('editando');
            editInput.setAttribute('value', editInput.value);
            editInput.setAttribute('readonly', 'true');
            editInput.classList.remove('correct');
            editInputName.setAttribute('value', editInputName.value);
            editInputName.setAttribute('readonly', 'true');
            editInputName.classList.remove('correct');
            
            editIcon.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="edit-svg">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            `;

            localStorage.setItem('listaContactos', list.innerHTML);
        
        } else {
            editIcon.classList.add('editando');
            editInput.removeAttribute('readonly');
            editInput.classList.add('editing');
            const end = editInputName.value.length;
            editInputName.setSelectionRange(end, end);
            editInputName.focus();
            editInputName.removeAttribute('readonly');
            editInputName.classList.add('editing');
            editIcon.innerHTML = `
            
            

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="edit-svg">
            
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
            </svg>
            `;
           
        }

    }
});


(() => {
    const localList = localStorage.getItem('listaContactos');
    list.innerHTML = localList;
})()