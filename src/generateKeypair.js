/**
 * This module will generate a public and private
 * key pair and save to current directory
 */
import { generateKeyPairSync } from 'crypto';
import { writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES6 modules not supporting __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function genKeyPair() {
  // Generates an object where the keys are stored in properties `privateKey` and `publicKey`
  const keyPair = generateKeyPairSync('rsa', {
    modulusLength: 4096, // bits - standard for RSA keys
    publicKeyEncoding: {
      type: 'pkcs1', // "Public Key Cryptography Standards 1"
      format: 'pem', // common formatting choice
    },
    privateKeyEncoding: {
      type: 'pkcs1', // "Public Key Cryptography Standards 1"
      format: 'pem', // common formatting choice
    },
  });

  // Create the public key file
  writeFileSync(__dirname + '/id_rsa_pub.pem', keyPair.publicKey);

  // Create the private key file
  writeFileSync(__dirname + '/id_rsa_priv.pem', keyPair.privateKey);
}

// Generate the key pair
genKeyPair();
