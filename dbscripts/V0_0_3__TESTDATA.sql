INSERT INTO
 `CARDS` (`FRONT`, `BACK`)
VALUES
	('home', 'das Zuhause'),
	('dog', 'der Hund'),
	('cat', 'die Katze'),
	('car', 'das Auto'),
	('bottle', 'die Flasche'),
	('bread', 'das Brot')
;

INSERT INTO
 `BOXES` (`NAME`)
VALUES
	('Entry Box'),
	('Daily Box'),
	('Weekly Box'),
	('Monthly Box')
;

INSERT INTO
 `COLLECTIONS` (`NAME`)
VALUES
	('English - Deutsch')
;

INSERT INTO 
  `TRAINING`(`COLLECTION`, `BOX`, `CARD`)
VALUES
  (1, 3, 1),
  (1, 1, 2),
  (1, 1, 3),
  (1, 2, 4),
  (1, 4, 5),
  (1, 4, 6)
;