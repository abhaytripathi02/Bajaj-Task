const isPrime = (num) => {
    num = parseInt(num);
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
};

const getBase64FileInfo = (base64String) => {
    try {
        const base64Data = base64String.split(',')[1] || base64String;
        const buffer = Buffer.from(base64Data, 'base64');
        const fileSizeKB = Math.round(buffer.length / 1024);
        const mimeMatch = base64String.match(/^data:([^;]+);/);
        const mimeType = mimeMatch ? mimeMatch[1] : 'application/octet-stream';
        
        return {
            isValid: true,
            mimeType,
            sizeKB: fileSizeKB
        };
    } catch (error) {
        return {
            isValid: false,
            mimeType: null,
            sizeKB: 0
        };
    }
};

module.exports = {
    isPrime,
    getBase64FileInfo
};