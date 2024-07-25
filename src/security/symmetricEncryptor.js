export async function encrypt(plaintext, keyBase64) {
  let keyBuffer = Buffer.from(keyBase64, 'base64');
  let key = await window.crypto.subtle.importKey(
    'raw',
    keyBuffer,
    { name: 'AES-CBC' },
    false,
    ['encrypt']
  );

  let iv = window.crypto.getRandomValues(new Uint8Array(16));
  let encrypted = await window.crypto.subtle.encrypt(
    { name: 'AES-CBC', iv: iv },
    key,
    new TextEncoder().encode(plaintext)
  );

  let combined = new Uint8Array(iv.length + new Uint8Array(encrypted).length);
  combined.set(iv);
  combined.set(new Uint8Array(encrypted), iv.length);

  return Buffer.from(combined).toString('base64');
}

export async function decrypt(ciphertextBase64, keyBase64) {
  let combined = Buffer.from(ciphertextBase64, 'base64');
  let iv = combined.slice(0, 16);
  let encrypted = combined.slice(16);

  let keyBuffer = Buffer.from(keyBase64, 'base64');
  let key = await window.crypto.subtle.importKey(
    'raw',
    keyBuffer,
    { name: 'AES-CBC' },
    false,
    ['decrypt']
  );

  let decrypted = await window.crypto.subtle.decrypt(
    { name: 'AES-CBC', iv: iv },
    key,
    encrypted
  );

  return new TextDecoder().decode(decrypted);
}

// Example usage
let plaintext = 'Hello, World!';
let keyBase64 = '5+9HDu5zd7sF2Ywq/Nh9uw=='; // Example 128-bit key in Base64

encrypt(plaintext, keyBase64)
  .then(encrypted => {
    console.log('Encrypted: ' + encrypted);
    return decrypt(encrypted, keyBase64);
  })
  .then(decrypted => {
    console.log('Decrypted: ' + decrypted);
  })
  .catch(err => {
    console.error('Error:', err);
  });
