function inicializarAcordeon() {
    const acordeon = document.querySelectorAll('.acordeon');

    acordeon.forEach(acordeon => {
        acordeon.addEventListener('click', () => {
            const body = acordeon.querySelector('.acordeon-body');
            body.classList.toggle('open');
        })
    })
}
