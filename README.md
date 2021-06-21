# Conexa-Challenge-API

## PROBLEMA 

1. Crear un proyecto llamado “API”.
2. El proyecto debe ser creado en Node con Express.
3. Implementar una librería de MicroServicios a elección.
4. Crear 2 módulos en el proyecto:
  - Micro Servicio de Log In → que comprende los siguientes endpoints:
    + End point 1: Registrar usuario con lo siguientes campos (no requiere JWT): 
        Mail
        Password
    + End point 2: Autenticación de usuarios previamente creado en el punto a) i) (No requiere JWT, pero si debe generar uno en el response.)
    + End point 3 : Listar usuarios (Requiere JWT y llama al al modulo de Negocios al endpoint b) i)
  - Micro Servicio de Negocios:
    * End point 4: Listar usuarios (Requiere JWT)
    * Debe permitir visualizar todos los usuarios registrados
    * Debe tener paginación
    * Debe permitir buscar de manera no sensitiva por el mail
5. BBDD: MongoDB

## Condiciones: 
Los endpoints 1, 2 y 3 → deben de poder ser accesibles desde el local host
Endpoint 4: Solo es accesible por medio del endpoint 3, no se debe poder acceder al mismo por el endpoint 3

## Resolucion

### **por que lerna ?**
Ya que es de muestra, opte por user lerna, esto me permite controlar ambos repos como uno solo, compartir las dependencias comunes, etc.

Ya si fuera a pasar a producción, dudo usarlo ya que no controla muy bien las version con ci, si bien se puede, esto involucra cambiar los scripts ya provisto por lerna.

### **por que no docker-compose ?** 
Como docker-compose no tiene soporte en producción, prefieron levantar docker por separados, pero por medio de un scripts asi siempre controlo el alta de estos.