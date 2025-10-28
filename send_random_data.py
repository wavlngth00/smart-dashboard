import mysql.connector
import random
import time

# Koneksi ke MySQL (pastikan sesuai dengan config.php)
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",  # default kosong di XAMPP
    database="sensor_data"
)

cursor = conn.cursor()

try:
    print("🚀 Mulai kirim data ke database (CTRL+C untuk berhenti)...\n")

    while True:
        temperature = round(random.uniform(20, 35), 2)
        humidity = round(random.uniform(40, 70), 2)

        query = "INSERT INTO sensor (temperature, humidity) VALUES (%s, %s)"
        cursor.execute(query, (temperature, humidity))
        conn.commit()

        print(f"Data terkirim ✅ Temp: {temperature}°C | Hum: {humidity}%")

        time.sleep(5)  # jeda 5 detik antar data

except KeyboardInterrupt:
    print("\n❌ Pengiriman dihentikan oleh user.")
finally:
    cursor.close()
    conn.close()
