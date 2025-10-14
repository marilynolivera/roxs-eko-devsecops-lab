import hashlib

# Poor implementation using MD5 (weak hash function)
def hash_password(password):
    # MD5 is weak and not secure for password hashing
    return hashlib.md5(password.encode('utf-8')).hexdigest()

def verify_password(stored_hash, password_input):
    # Compare the input password hash with the stored hash
    return stored_hash == hash_password(password_input)

# Sample usage
stored_password_hash = hash_password('supersecretpassword')
print("Stored Hash:", stored_password_hash)

# Verifying the password
if verify_password(stored_password_hash, 'supersecretpassword'):
    print("Password is correct")
else:
    print("Password is incorrect")