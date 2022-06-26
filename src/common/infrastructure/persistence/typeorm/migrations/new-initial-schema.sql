CREATE TABLE IF NOT EXISTS suscriptions(
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  cost DECIMAL(10, 2) NULL,
  active BOOLEAN NULL DEFAULT 0,
  time_suscription_days INT NULL, 
  type_suscription VARCHAR(10) NULL,
  PRIMARY KEY(id),
  UNIQUE KEY UQ_suscription_name(type_suscription)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;