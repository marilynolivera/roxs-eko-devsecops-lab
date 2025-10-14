import os
import logging
import sqlite3
from sqlite3 import Error


def create_connection(name='notes.db'):
    conn = None

    try:
        conn = sqlite3.connect(name)
    except Error as e:
        logging.error(e)

    return conn


def create_table(conn, create_table_sql):
    try:
        c = conn.cursor()
        c.execute(create_table_sql)
    except Error as e:
        print(e)


def create_note(conn, notes):
    query = "INSERT INTO notes(data) VALUES(?)"

    cur = conn.cursor()
    cur.execute(query, notes)

    return cur.lastrowid


def delete_note(conn, id):
    query = "DELETE FROM notes WHERE id='%s'" % id
    
    cur = conn.cursor()
    cur.execute(query)

    conn.commit()

def delete_note_secure(conn, id):
    query = "DELETE FROM notes WHERE id='%(id)s'"
    
    cur = conn.cursor()
    cur.execute(query, {'id': id})

    conn.commit()

def select_note_by_id(conn, id=None):
    if id:
        query = "SELECT * FROM notes WHERE id = '%(id)s'"
        cur = conn.cursor()  
        cur.execute(query, {'id': id})
    else:
        query = "SELECT * FROM notes"
        cur = conn.cursor()  
        cur.execute(query)

    rows = cur.fetchall()
    return rows
