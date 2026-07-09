-- =====================================================================
--  ACA - App para el Control de la Ansiedad
--  Esquema de Base de Datos (Producción)  ·  ACA-DB.sql
--  Cliente: Clínica Anxiety          Motor: MySQL / InnoDB / utf8mb4
--  Basado en: ACA-DER.pdf (Modelo Relacional v1.0)
-- =====================================================================
--  Entregable de cronograma: "Configuración de Base de Datos Producción"
--  Las tablas siguen el Diccionario de Datos del DER. La tabla
--  `recordatorio` se añade como extensión para soportar el requisito
--  "CRUD recordatorios" (Sprint 3) que no estaba modelado en el DER v1.0.
-- =====================================================================

DROP DATABASE IF EXISTS apoyo_emocional;
CREATE DATABASE apoyo_emocional
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
USE apoyo_emocional;

-- ---------------------------------------------------------------------
-- 4.1  Módulo de Gestión de Identidades y Acceso
-- ---------------------------------------------------------------------
CREATE TABLE paciente (
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

CREATE TABLE token_recuperacion (
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
CREATE TABLE registro_emocional (
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
CREATE TABLE sintoma (
    id_sintoma  INT          NOT NULL AUTO_INCREMENT,
    nombre      VARCHAR(100) NOT NULL,
    categoria   VARCHAR(50)  NULL,
    PRIMARY KEY (id_sintoma)
) ENGINE=InnoDB;

CREATE TABLE registro_crisis_fisica (
    id_crisis     INT      NOT NULL AUTO_INCREMENT,
    id_paciente   INT      NOT NULL,
    nota_adicional TEXT    NULL,
    fecha_hora    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_crisis),
    KEY idx_crisis_paciente_fecha (id_paciente, fecha_hora),
    CONSTRAINT fk_crisis_paciente FOREIGN KEY (id_paciente)
        REFERENCES paciente (id_paciente) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE detalle_crisis_sintoma (
    id_crisis   INT NOT NULL,
    id_sintoma  INT NOT NULL,
    intensidad  ENUM('Leve','Moderado','Severo') NOT NULL DEFAULT 'Leve',
    PRIMARY KEY (id_crisis, id_sintoma),
    CONSTRAINT fk_dcs_crisis FOREIGN KEY (id_crisis)
        REFERENCES registro_crisis_fisica (id_crisis) ON DELETE CASCADE,
    CONSTRAINT fk_dcs_sintoma FOREIGN KEY (id_sintoma)
        REFERENCES sintoma (id_sintoma) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Relación N:M entre registro_emocional y sintoma (según diagrama DER)
CREATE TABLE emocional_sintoma (
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
CREATE TABLE recurso_apoyo (
    id_recurso       INT          NOT NULL AUTO_INCREMENT,
    titulo           VARCHAR(150) NOT NULL,
    descripcion      TEXT         NULL,
    tipo             VARCHAR(50)  NULL,
    duracion_minutos INT          NULL,
    contenido_url    VARCHAR(255) NULL,
    PRIMARY KEY (id_recurso)
) ENGINE=InnoDB;

CREATE TABLE recurso_favorito (
    id_paciente    INT      NOT NULL,
    id_recurso     INT      NOT NULL,
    fecha_agregado DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_paciente, id_recurso),
    CONSTRAINT fk_fav_paciente FOREIGN KEY (id_paciente)
        REFERENCES paciente (id_paciente) ON DELETE CASCADE,
    CONSTRAINT fk_fav_recurso FOREIGN KEY (id_recurso)
        REFERENCES recurso_apoyo (id_recurso) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- Extensión: Recordatorios (Sprint 3 - CRUD recordatorios)
-- No modelado en DER v1.0; añadido para persistir el módulo.
-- ---------------------------------------------------------------------
CREATE TABLE recordatorio (
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
--  DATOS SEMILLA
-- =====================================================================

-- Catálogo de síntomas (4.3 - entidad inmutable)
INSERT INTO sintoma (nombre, categoria) VALUES
  ('Palpitaciones',      'Físico'),
  ('Sudoración',         'Físico'),
  ('Tensión muscular',   'Físico'),
  ('Dificultad para respirar', 'Físico'),
  ('Mareos',             'Físico'),
  ('Pensamientos intrusivos',  'Cognitivo'),
  ('Miedo intenso',      'Emocional'),
  ('Irritabilidad',      'Emocional');

-- Biblioteca de recursos de apoyo
INSERT INTO recurso_apoyo (titulo, descripcion, tipo, duracion_minutos, contenido_url) VALUES
  ('Respiración 4-7-8',     'Ejercicio de respiración guiada para reducir la ansiedad.', 'Audio', 5,  'https://ejemplo.com/respiracion-478'),
  ('Yoga restaurativo',     'Secuencia de yoga suave para liberar tensión.',            'Video', 15, 'https://ejemplo.com/yoga-restaurativo'),
  ('Meditación breve',      'Meditación de atención plena para momentos de estrés.',     'Audio', 10, 'https://ejemplo.com/meditacion'),
  ('Guía: Entender la ansiedad', 'Lectura psicoeducativa sobre los mecanismos de la ansiedad.', 'Artículo', 8, 'https://ejemplo.com/guia-ansiedad');
