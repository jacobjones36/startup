(async () => {
    const userName = localStorage.getItem('userName');
    if (userName) {
        document.querySelector('#daName').textContent = userName;
        setDisplay('loginControls', 'none');
        setDisplay('adminControls', 'block');
    } else {
        setDisplay('loginControls', 'block');
        setDisplay('adminControls', 'none');
    }
})();


async function loginUser() {
    loginOrCreate(`/api/auth/login`);
}


async function createUser() {
    loginOrCreate(`/api/auth/create`);
}


async function loginOrCreate(endpoint) {
    const userName = document.querySelector('#userName')?.value;
    const password = document.querySelector('#userPassword')?.value;
    const response = await fetch(endpoint, {
        method: 'post',
        body: JSON.stringify({ email: userName, password: password }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });

    if (response.ok) {
        localStorage.setItem('userName', userName);
        window.location.href = 'adminpage.html';
    } else {
        const body = await response.json();
        const modalEl = document.querySelector('#msgModal');
        modalEl.querySelector('.modal-body').textContent = `Error: ${body.msg}`;
        const msgModal = new bootstrap.Modal(modalEl, {});
        msgModal.show();
    }
}

function editSchedule() {
    window.location.href = 'schedule.html';
}

function editWaag() {
    window.location.href = 'weekataglance.html'
}

function logout() {
    localStorage.removeItem('userName');
    fetch(`/api/auth/logout`, {
        method: 'delete',
    }).then(() => (window.location.href = '/'));
}

async function getUser(email) {
    const response = await fetch(`/api/user/${email}`);
    if (response.status === 200) {
        return response.json();
    }

    return null;
}

function setDisplay(controlId, display) {
    const adminControlEl = document.querySelector(`#${controlId}`);
    if (adminControlEl) {
        adminControlEl.style.display = display;
    }
}
