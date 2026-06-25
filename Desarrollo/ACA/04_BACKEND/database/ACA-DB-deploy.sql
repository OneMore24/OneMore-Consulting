-- =====================================================================
--  ACA - Esquema para BASE DE DATOS YA EXISTENTE (despliegue en la nube)
--  Úsalo en Railway/hosting: se ejecuta sobre la BD que ya provee el
--  proveedor (p. ej. la base "railway"), sin DROP/CREATE DATABASE.
--  Para entorno LOCAL usa en su lugar ACA-DB.sql (crea la BD completa).
-- =====================================================================

-- ---------------------------------------------------------------------
-- 4.1  Módulo de Gestión de Identidades y Acceso
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS paciente (
    id_paciente      INT          NOT NULL AUTO_INCREMENT,
    nombre_completo  VARCHAR(150) NOT NULL,
    correo           VARCHAR(150) NOT NULL,
    password_hash    VARCHAR(255) NOT NULL,
    fecha_nacimiento DATE         NULL,
    genero           VARCHAR(50)  NULL,
    intentos_fallidos INT         NOT NULL DEFAULT 0,
    bloqueado_hasta  DATETIME     NULL,
    fecha_registro   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_paciente),
    UNIQUE KEY uq_paciente_correo (correo)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS token_recuperacion (
    id_token         INT          NOT NULL AUTO_INCREMENT,
    id_paciente      INT          NOT NULL,
    token            VARCHAR(255) NOT NULL,
    fecha_creacion   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_expiracion DATETIME     NOT NULL,
    usado            TINYINT(1)   NOT NULL DEFAULT 0,
    PRIMARY KEY (id_token),
    KEY idx_token (token),
    CONSTRAINT fk_token_paciente FOREIGN KEY (id_paciente)
        REFERENCES paciente (id_paciente) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- 4.2  Módulo de Seguimiento Psicológico
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS registro_emocional (
    id_registro_emocional INT      NOT NULL AUTO_INCREMENT,
    id_paciente      INT           NOT NULL,
    estado_animo     INT           NOT NULL,
    nota_descriptiva TEXT          NULL,
    fecha_hora       DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_registro_emocional),
    KEY idx_re_paciente_fecha (id_paciente, fecha_hora),
    CONSTRAINT fk_re_paciente FOREIGN KEY (id_paciente)
        REFERENCES paciente (id_paciente) ON DELETE CASCADE,
    CONSTRAINT chk_estado_animo CHECK (estado_animo BETWEEN 1 AND 10)
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- 4.3  Módulo de Crisis y Sintomatología
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS sintoma (
    id_sintoma  INT          NOT NULL AUTO_INCREMENT,
    nombre      VARCHAR(100) NOT NULL,
    categoria   VARCHAR(50)  NULL,
    PRIMARY KEY (id_sintoma)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS registro_crisis_fisica (
    id_crisis     INT      NOT NULL AUTO_INCREMENT,
    id_paciente   INT      NOT NULL,
    nota_adicional TEXT    NULL,
    fecha_hora    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_crisis),
    KEY idx_crisis_paciente_fecha (id_paciente, fecha_hora),
    CONSTRAINT fk_crisis_paciente FOREIGN KEY (id_paciente)
        REFERENCES paciente (id_paciente) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS detalle_crisis_sintoma (
    id_crisis   INT NOT NULL,
    id_sintoma  INT NOT NULL,
    intensidad  ENUM('Leve','Moderado','Severo') NOT NULL DEFAULT 'Leve',
    PRIMARY KEY (id_crisis, id_sintoma),
    CONSTRAINT fk_dcs_crisis FOREIGN KEY (id_crisis)
        REFERENCES registro_crisis_fisica (id_crisis) ON DELETE CASCADE,
    CONSTRAINT fk_dcs_sintoma FOREIGN KEY (id_sintoma)
        REFERENCES sintoma (id_sintoma) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS emocional_sintoma (
    id_registro_emocional INT NOT NULL,
    id_sintoma            INT NOT NULL,
    PRIMARY KEY (id_registro_emocional, id_sintoma),
    CONSTRAINT fk_es_registro FOREIGN KEY (id_registro_emocional)
        REFERENCES registro_emocional (id_registro_emocional) ON DELETE CASCADE,
    CONSTRAINT fk_es_sintoma FOREIGN KEY (id_sintoma)
        REFERENCES sintoma (id_sintoma) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- 4.4  Módulo de Intervención y Biblioteca de Apoyo
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS recurso_apoyo (
    id_recurso       INT          NOT NULL AUTO_INCREMENT,
    titulo           VARCHAR(150) NOT NULL,
    descripcion      TEXT         NULL,
    tipo             VARCHAR(50)  NULL,
    duracion_minutos INT          NULL,
    contenido_url    VARCHAR(255) NULL,
    PRIMARY KEY (id_recurso)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS recurso_favorito (
    id_paciente    INT      NOT NULL,
    id_recurso     INT      NOT NULL,
    fecha_agregado DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_paciente, id_recurso),
    CONSTRAINT fk_fav_paciente FOREIGN KEY (id_paciente)
        REFERENCES paciente (id_paciente) ON DELETE CASCADE,
    CONSTRAINT fk_fav_recurso FOREIGN KEY (id_recurso)
        REFERENCES recurso_apoyo (id_recurso) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS recordatorio (
    id_recordatorio INT          NOT NULL AUTO_INCREMENT,
    id_paciente     INT          NOT NULL,
    titulo          VARCHAR(150) NOT NULL,
    fecha           DATETIME     NOT NULL,
    activo          TINYINT(1)   NOT NULL DEFAULT 1,
    PRIMARY KEY (id_recordatorio),
    KEY idx_rec_paciente (id_paciente),
    CONSTRAINT fk_rec_paciente FOREIGN KEY (id_paciente)
        REFERENCES paciente (id_paciente) ON DELETE CASCADE
) ENGINE=InnoDB;

-- =====================================================================
--  DATOS SEMILLA (solo si las tablas están vacías)
-- =====================================================================
INSERT INTO sintoma (nombre, categoria)
SELECT * FROM (
  SELECT 'Palpitaciones' AS n, 'Físico' AS c UNION ALL
  SELECT 'Sudoración', 'Físico' UNION ALL
  SELECT 'Tensión muscular', 'Físico' UNION ALL
  SELECT 'Dificultad para respirar', 'Físico' UNION ALL
  SELECT 'Mareos', 'Físico' UNION ALL
  SELECT 'Pensamientos intrusivos', 'Cognitivo' UNION ALL
  SELECT 'Miedo intenso', 'Emocional' UNION ALL
  SELECT 'Irritabilidad', 'Emocional'
) AS s
WHERE NOT EXISTS (SELECT 1 FROM sintoma);

INSERT INTO recurso_apoyo (titulo, descripcion, tipo, duracion_minutos, contenido_url)
SELECT * FROM (
  SELECT 'Respiración 4-7-8' AS t, 'Ejercicio de respiración guiada para reducir la ansiedad.' AS d, 'Audio' AS tp, 5 AS dm, 'https://ejemplo.com/respiracion-478' AS u UNION ALL
  SELECT 'Yoga restaurativo', 'Secuencia de yoga suave para liberar tensión.', 'Video', 15, 'https://ejemplo.com/yoga-restaurativo' UNION ALL
  SELECT 'Meditación breve', 'Meditación de atención plena para momentos de estrés.', 'Audio', 10, 'https://ejemplo.com/meditacion' UNION ALL
  SELECT 'Guía: Entender la ansiedad', 'Lectura psicoeducativa sobre los mecanismos de la ansiedad.', 'Artículo', 8, 'https://ejemplo.com/guia-ansiedad'
) AS r
WHERE NOT EXISTS (SELECT 1 FROM recurso_apoyo);
