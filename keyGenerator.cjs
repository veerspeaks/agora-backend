const key = 'c2e61aca0925471ca8345ded530c5505';
const secret = 'd489badc4dfa4414a0c17fe62eed0721';
const base64Encoded = Buffer.from(`${key}:${secret}`).toString('base64');
console.log(base64Encoded);