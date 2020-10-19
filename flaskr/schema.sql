DROP TABLE IF EXISTS user;

CREATE TABLE user (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  calorie_total INTEGER,
  fat INTEGER,
  carb INTEGER,
  protein INTEGER,
  water_amount INTEGER,
  vegetables INTEGER,
  waist INTEGER,
  bust INTEGER,
  hips INTEGER,
  bodyweight INTEGER
);
