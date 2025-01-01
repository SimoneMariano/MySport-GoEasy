import pandas as pd
import mysql.connector
import tkinter as tk
from tkinter import filedialog

# Funzione per selezionare il file Excel
def select_file():
    root = tk.Tk()
    root.withdraw()  # Nasconde la finestra principale di Tkinter
    file_path = filedialog.askopenfilename(filetypes=[("Excel files", "*.xlsx")])
    return file_path

# Funzione per inserire i dati nel database remoto
def insert_data_to_db(file_path, db_config):
    # Connessione al database remoto
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    
    # Leggi il file Excel
    xls = pd.ExcelFile(file_path)
    
    for sheet_name in xls.sheet_names:
        df = pd.read_excel(xls, sheet_name=sheet_name)
        
        if 'codiceTorneo' in df.columns:
            codice_torneo = df['codiceTorneo'].iloc[0]
            
            # Elimina le righe esistenti con lo stesso codiceTorneo
            cursor.execute(f"DELETE FROM {sheet_name} WHERE codiceTorneo = %s", (codice_torneo,))
            
            # Inserisci i dati dal DataFrame
            for index, row in df.iterrows():
                columns = ', '.join(row.index)
                placeholders = ', '.join(['%s'] * len(row))
                sql = f"INSERT INTO {sheet_name} ({columns}) VALUES ({placeholders})"
                cursor.execute(sql, tuple(row))
    
    # Commit delle modifiche
    conn.commit()
    # Chiusura della connessione
    conn.close()

if __name__ == "__main__":
    file_path = select_file()
    if file_path:
        db_config = {
            'host': 'your_host',
            'user': 'your_username',
            'password': 'your_password',
            'database': 'your_database'
        }
        insert_data_to_db(file_path, db_config)
        print("Dati inseriti nel database con successo.")
    else:
        print("Nessun file selezionato.")
