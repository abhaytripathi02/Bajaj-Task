const path = require('path');
const fs = require('fs');
const { isPrime, getBase64FileInfo } = require('../utils/helper');

const databasePath = path.join(__dirname, '../database.json');
const database = JSON.parse(fs.readFileSync(databasePath, 'utf8'));

    exports.getOperationCode = async(req, res) => {
        try {
            return res.status(200).json({
                operation_code: 1
            });
        } catch (error) {
            console.error('Error in getOperationCode:', error);
            return res.status(500).json({
                is_success: false,
                error: "Internal server error"
            });
        }
    }

    exports.processData = async(req, res) =>  {
        try {
            const { data, file_b64 } = req.body;
            
            if (!Array.isArray(data)) {
                return res.status(400).json({
                    is_success: false,
                    error: "Invalid data format. Expected array."
                });
            }

            // Process arrays
            const numbers = data.filter(item => !isNaN(item) && item.trim() !== '');
            const alphabets = data.filter(item => /^[A-Za-z]$/.test(item));
            
            // Find highest lowercase alphabet
            const lowercaseAlphabets = alphabets.filter(char => /^[a-z]$/.test(char));
            const highestLowercase = lowercaseAlphabets.length > 0 
                ? [lowercaseAlphabets.reduce((a, b) => a > b ? a : b)]
                : [];

            // Check for prime numbers
            const isPrimeFound = numbers.some(num => isPrime(num));

            // Process file if provided
            const fileInfo = file_b64 ? getBase64FileInfo(file_b64) : {
                isValid: false,
                mimeType: null,
                sizeKB: 0
            };

            // Get user data from database
            const userData = database.users.john_doe;

            // Construct response
            const response = {
                is_success: true,
                user_id: userData.user_id,
                email: userData.email,
                roll_number: userData.roll_number,
                numbers,
                alphabets,
                highest_lowercase_alphabet: highestLowercase,
                is_prime_found: isPrimeFound,
                file_valid: fileInfo.isValid,
                file_mime_type: fileInfo.mimeType,
                file_size_kb: String(fileInfo.sizeKB)
            };

            return res.json(response);
        } catch (error) {
            console.error('Error in processData:', error);
            return res.status(500).json({
                is_success: false,
                error: "Internal server error"
            });
        }
    }


