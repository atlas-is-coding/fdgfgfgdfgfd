from cryptography.hazmat.primitives.ciphers.aead import AESGCM, ChaCha20Poly1305
import base64

# Данные
key_b64 = "RGqPhKJJJiZbn2zRZdjvWYIZwLe1oFtc0XofWTpAfKQ="
encrypted = "OEtAy484+cLt3Ob5:p62NeKhhX1DrLju7PteW8dKjbuVBanSdzmVXHUVuFl97dsTlT4A9aZpKM0WXa70ub5s7qQBI+n1rPT03q5bkDcmVl19DucET6FaiGdcJHTY="

key = base64.b64decode(key_b64)

# Разделение строки на IV и зашифрованный текст
iv_b64, ct_b64 = encrypted.split(':')
iv = base64.b64decode(iv_b64)
ct_tag = base64.b64decode(ct_b64)

# Тег — последние 16 байт
tag = ct_tag[-16:]
ct = ct_tag[:-16]

# Функция для попытки расшифровки
def try_decrypt(algorithm, key, iv, ct, tag):
    try:
        if algorithm == "AES-GCM":
            cipher = AESGCM(key)
        elif algorithm == "ChaCha20-Poly1305":
            cipher = ChaCha20Poly1305(key)
        plaintext = cipher.decrypt(iv, ct, tag)
        return plaintext.decode('utf-8')
    except Exception as e:
        return f"Ошибка: {str(e)}"

# Проверка с AES-GCM
print("AES-GCM:", try_decrypt("AES-GCM", key, iv, ct, tag))

# Проверка с ChaCha20-Poly1305
print("ChaCha20-Poly1305:", try_decrypt("ChaCha20-Poly1305", key, iv, ct, tag))