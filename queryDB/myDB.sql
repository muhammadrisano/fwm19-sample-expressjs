CREATE TABLE users(
  id VARCHAR(64) NOT NULL,
  email VARCHAR(64) NOT NULL,
  password VARCHAR(64) NOT NULL,
  role VARCHAR(16),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  PRIMARY KEY(id)
);

CREATE TABLE workers(
  id VARCHAR(64) NOT NULL,
  name VARCHAR(64),
  phone VARCHAR(15),
  photo VARCHAR(128),
  jod_desk VARCHAR(128),
  domicile VARCHAR(64),
  workplace VARCHAR(128),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  user_id VARCHAR(64),
  PRIMARY KEY(id),
  FOREIGN KEY(user_id) REFERENCES users(id)
);

