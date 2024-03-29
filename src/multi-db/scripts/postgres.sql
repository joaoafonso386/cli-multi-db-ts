DROP TABLE IF EXISTS HEROES;

CREATE TABLE HEROES (
    ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    NAME TEXT NOT NULL,
    POWER TEXT NOT NULL
)

--Create
INSERT INTO HEROES (NAME, POWER) VALUES ('Flash', 'Speed'), ('Aquaman', 'Water'), ('Batman', 'Night')

--Read
SELECT ID, NAME FROM HEROES;
SELECT ID, NAME FROM HEROES WHERE NAME= 'Flash';

--Update
UPDATE HEROES
SET NAME = 'Goku', POWER = 'God'
WHERE ID = 1;

--Delete
DELETE FROM HEROES WHERE ID = 2;