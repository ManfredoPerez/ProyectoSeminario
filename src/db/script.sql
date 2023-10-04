CREATE TABLE Rol (
    Id_rol INT AUTO_INCREMENT PRIMARY KEY,
    Tipo_rol VARCHAR(255) NOT NULL
);
-- Crear tabla Cargo
CREATE TABLE Cargo (
    Id_cargo INT AUTO_INCREMENT PRIMARY KEY,
    Nombre_cargo VARCHAR(255) NOT NULL
);

-- Crear tabla Dependencia
CREATE TABLE Dependencia (
    Id_dependencia INT AUTO_INCREMENT PRIMARY KEY,
    Nombre_dependencia VARCHAR(255) NOT NULL
);

-- Crear tabla Usuario
CREATE TABLE Usuario (
    Id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre_usuario VARCHAR(255) NOT NULL UNIQUE,
    Nombre VARCHAR(255) NOT NULL,
    Apellido VARCHAR(255) NOT NULL,
    Contraseña VARCHAR(255) NOT NULL, 
    Codigo VARCHAR(255),  -- permitiendo texto o numérico, y no obligatorio
    Id_rol INT,
    Id_cargo INT,
    Id_dependencia INT,
    FOREIGN KEY (Id_rol) REFERENCES Rol(Id_rol),
    FOREIGN KEY (Id_cargo) REFERENCES Cargo(Id_cargo),
    FOREIGN KEY (Id_dependencia) REFERENCES Dependencia(Id_dependencia)
);

-- Crear tabla articulo
CREATE TABLE Articulos(
Id_articulo INT AUTO_INCREMENT PRIMARY KEY,
Id_usuario INT NOT NULL,
Codigo VARCHAR(255) NOT NULL,
Nombre_articulo VARCHAR(255) NOT NULL,
No_serie VARCHAR(255) NOT NULL,
Valor_unitario DECIMAL NOT NULL,
Valor_total DECIMAL NOT NULL,
Valor_Baja DECIMAL NOT NULL,
Observaciones VARCHAR(255) NOT NULL,
Qr VARCHAR(255) NOT NULL,
Cantidad INT(255) NOT NULL,
FOREIGN KEY (Id_usuario) REFERENCES Usuario(Id_usuario)
);

-- Crear tabla historial 
CREATE TABLE Historial(
Id_historial INT AUTO_INCREMENT PRIMARY KEY,
Id_articulo INT,
FOREIGN KEY (Id_articulo) REFERENCES Articulos(Id_articulo)
);