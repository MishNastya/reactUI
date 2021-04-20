

export function getValue(array, search) {
    let i = array.length;
    while (i--) {
        if (array[i].id === search) {
            return array[i];
        }
    }
}

export function rand() {
    return Math.round(Math.random() * 20) - 10;
}

export function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}