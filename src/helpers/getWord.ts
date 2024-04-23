let words: string[] = [
    'COMPUTADORA',
    'AGUATE',
    'PAPAYA',
    'VEHICULO',
    'PERICO',
    'PERRO'
]


export function getWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex]
}