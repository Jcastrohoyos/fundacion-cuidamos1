# Guía completa de Git y GitHub

Esta guía explica los comandos esenciales y los flujos de trabajo más habituales para usar Git y GitHub desde Windows, PowerShell o una terminal integrada de VS Code.

## 1. Instalación y configuración inicial

### Instalar Git

Descarga Git desde [git-scm.com](https://git-scm.com/) y ejecuta el instalador. También puedes instalarlo con Windows Package Manager:

```powershell
winget install --id Git.Git -e
```

Comprueba la instalación:

```bash
git --version
```

### Configurar identidad

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu-correo@example.com"
```

Usa el mismo correo asociado a tu cuenta de GitHub.

### Consultar configuración

```bash
git config --global --list
git config --show-origin --list
```

### Cambiar el editor predeterminado

```bash
git config --global core.editor "code --wait"
```

### Configurar el nombre principal de rama

```bash
git config --global init.defaultBranch main
```

## 2. Crear una cuenta y conectar GitHub

Puedes acceder a GitHub desde:

- [https://github.com](https://github.com)
- Crear repositorio: **New repository**
- Clonar repositorio: botón **Code**

### Conectar con HTTPS

No es necesario configurar una contraseña de Git. GitHub puede solicitar autenticación mediante el administrador de credenciales o un token personal.

```bash
git clone https://github.com/USUARIO/REPOSITORIO.git
```

### Conectar con SSH

Genera una clave:

```bash
ssh-keygen -t ed25519 -C "tu-correo@example.com"
```

Inicia el agente SSH:

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

En PowerShell, si `eval` no está disponible, puedes iniciar el agente con:

```powershell
Start-Service ssh-agent
ssh-add $env:USERPROFILE\.ssh\id_ed25519
```

Muestra la clave pública:

```bash
cat ~/.ssh/id_ed25519.pub
```

Copia el contenido y agrégalo en GitHub:

**Settings → SSH and GPG keys → New SSH key**

Después verifica la conexión:

```bash
ssh -T git@github.com
```

Clonar por SSH:

```bash
git clone git@github.com:USUARIO/REPOSITORIO.git
```

## 3. Comandos básicos

| Comando | Función |
|---|---|
| `git init` | Inicia un repositorio local |
| `git status` | Muestra archivos modificados y pendientes |
| `git add` | Prepara cambios para el siguiente commit |
| `git commit` | Guarda una versión en el historial |
| `git log` | Muestra el historial de commits |
| `git diff` | Muestra diferencias sin confirmar |
| `git restore` | Descarta cambios locales |
| `git reset` | Modifica el índice o mueve una rama |

### Crear un repositorio local

```bash
mkdir mi-proyecto
cd mi-proyecto
git init
```

### Agregar archivos

Agregar un archivo específico:

```bash
git add index.html
```

Agregar todos los cambios:

```bash
git add .
```

### Crear un commit

```bash
git commit -m "Describe brevemente el cambio"
```

Ejemplos:

```bash
git commit -m "Agrega sección de contacto"
git commit -m "Corrige navegación móvil"
git commit -m "Actualiza dependencias"
```

### Agregar y confirmar en un solo paso

Solo funciona para archivos ya rastreados:

```bash
git commit -am "Actualiza estilos"
```

## 4. Consultar el estado del proyecto

### Estado resumido

```bash
git status

git status --short
```

### Revisar diferencias

Cambios sin preparar:

```bash
git diff
```

Cambios preparados:

```bash
git diff --staged
```

### Consultar historial

```bash
git log

git log --oneline
git log --oneline --graph --decorate --all
git log -5
```

### Buscar un texto en los commits

```bash
git log --oneline --grep="contacto"
```

## 5. Repositorios remotos

### Ver remotos

```bash
git remote -v
```

### Conectar un repositorio local con GitHub

```bash
git remote add origin git@github.com:USUARIO/REPOSITORIO.git
```

### Cambiar la URL del remoto

```bash
git remote set-url origin git@github.com:USUARIO/REPOSITORIO.git
```

### Eliminar un remoto

```bash
git remote remove origin
```

### Subir cambios

```bash
git push origin main
```

Configurar una rama para subir sin especificar el remoto:

```bash
git push -u origin main
```

Después podrás usar simplemente:

```bash
git push
git pull
```

### Descargar cambios

```bash
git pull origin main
```

Descargar sin combinar automáticamente:

```bash
git fetch origin
```

## 6. Clonar proyectos

Clonar por HTTPS:

```bash
git clone https://github.com/USUARIO/REPOSITORIO.git
```

Clonar por SSH:

```bash
git clone git@github.com:USUARIO/REPOSITORIO.git
```

Clonar en una carpeta diferente:

```bash
git clone https://github.com/USUARIO/REPOSITORIO.git mi-carpeta
```

Clonar una rama específica:

```bash
git clone --branch main --single-branch https://github.com/USUARIO/REPOSITORIO.git
```

## 7. Ramas

Las ramas permiten desarrollar funcionalidades sin afectar la rama principal.

### Crear una rama

```bash
git branch nombre-rama
```

Crear y cambiar de rama:

```bash
git switch -c nombre-rama
```

Ejemplo:

```bash
git switch -c feature/formulario-contacto
```

### Cambiar de rama

```bash
git switch main
git switch nombre-rama
```

### Listar ramas

Ramas locales:

```bash
git branch
```

Ramas locales y remotas:

```bash
git branch -a
```

Ramas remotas:

```bash
git branch -r
```

### Cambiar el nombre de una rama

```bash
git branch -m nuevo-nombre
```

### Eliminar una rama local

```bash
git branch -d nombre-rama
```

Eliminar aunque no esté fusionada:

```bash
git branch -D nombre-rama
```

### Eliminar una rama remota

```bash
git push origin --delete nombre-rama
```

### Descargar una rama remota

```bash
git fetch origin
git switch -c nombre-rama origin/nombre-rama
```

## 8. Subir una rama nueva

```bash
git switch -c feature/donaciones
git add .
git commit -m "Agrega mejoras al módulo de donaciones"
git push -u origin feature/donaciones
```

## 9. Fusionar cambios

### Fusionar una rama en la rama actual

Ejemplo para llevar una rama hacia `main`:

```bash
git switch main
git pull origin main
git merge feature/donaciones
git push origin main
```

### Fusionar sin crear commit automático

```bash
git merge --no-commit --no-ff nombre-rama
```

### Abortar una fusión

```bash
git merge --abort
```

## 10. Pull Requests

Un Pull Request permite solicitar que los cambios de una rama sean revisados y fusionados.

### Flujo recomendado

1. Actualiza `main`.
2. Crea una rama nueva.
3. Realiza cambios y commits.
4. Sube la rama a GitHub.
5. Abre un Pull Request.
6. Solicita revisión.
7. Corrige observaciones si existen.
8. Fusiona el Pull Request.
9. Actualiza y elimina ramas antiguas.

```bash
git switch main
git pull origin main
git switch -c feature/nueva-seccion

# Realiza cambios
git add .
git commit -m "Agrega nueva sección"
git push -u origin feature/nueva-seccion
```

En GitHub, abre:

**Pull requests → New pull request**

Selecciona:

- Base: `main`
- Compare: `feature/nueva-seccion`

Escribe una descripción que incluya:

- Qué cambió
- Por qué cambió
- Cómo probarlo
- Capturas o enlaces, si son necesarios

## 11. Actualizar una rama antes de fusionarla

### Mediante merge

```bash
git switch feature/nueva-seccion
git pull origin main
git push origin feature/nueva-seccion
```

### Mediante rebase

```bash
git switch feature/nueva-seccion
git fetch origin
git rebase origin/main
```

Si aparecen conflictos:

1. Resuelve los archivos marcados.
2. Prepara los archivos resueltos:

```bash
git add archivo-resuelto.txt
```

3. Continúa:

```bash
git rebase --continue
```

Cancelar el rebase:

```bash
git rebase --abort
```

Después de un rebase, la rama puede requerir actualización forzada:

```bash
git push --force-with-lease origin feature/nueva-seccion
```

> Evita `git push --force` en ramas compartidas. Usa `--force-with-lease`.

## 12. Resolver conflictos

Git marca los conflictos dentro de los archivos:

```text
<<<<<<< HEAD
Contenido de la rama actual
=======
Contenido de la rama que se intenta fusionar
>>>>>>> feature/nueva-seccion
```

Pasos:

1. Decide qué contenido conservar.
2. Elimina los marcadores `<<<<<<<`, `=======` y `>>>>>>>`.
3. Guarda el archivo.
4. Ejecuta:

```bash
git add archivo-resuelto.txt
git commit
```

Para un merge:

```bash
git status
git add .
git commit -m "Resuelve conflicto de combinación"
```

Para un rebase:

```bash
git add .
git rebase --continue
```

## 13. Guardar cambios temporalmente con stash

### Guardar cambios

```bash
git stash
```

Guardar con una descripción:

```bash
git stash push -m "Cambio temporal del formulario"
```

### Listar stashes

```bash
git stash list
```

### Recuperar el último stash

Conservarlo en la lista:

```bash
git stash apply stash@{0}
```

Recuperarlo y eliminarlo:

```bash
git stash pop
```

### Eliminar un stash

```bash
git stash drop stash@{0}
```

Eliminar todos los stashes:

```bash
git stash clear
```

## 14. Deshacer cambios

### Deshacer cambios de un archivo

Antes de `git add`:

```bash
git restore archivo.txt
```

Retirar un archivo del área de preparación:

```bash
git restore --staged archivo.txt
```

También puedes restaurar todo:

```bash
git restore --source=HEAD --staged --worktree .
```

### Deshacer el último commit sin borrar cambios

```bash
git reset --soft HEAD~1
```

Mantener cambios sin prepararlos:

```bash
git reset HEAD~1
```

Eliminar cambios y commit:

```bash
git reset --hard HEAD~1
```

> `--hard` elimina cambios locales. Úsalo solo si estás seguro.

### Crear un commit que deshace otro commit

```bash
git revert abc1234
```

Es más seguro para historial compartido que `reset`.

## 15. Tags y versiones

### Crear tag ligero

```bash
git tag v1.0.0
```

### Crear tag anotado

```bash
git tag -a v1.0.0 -m "Versión 1.0.0"
```

### Listar tags

```bash
git tag
git tag --sort=-creatordate
```

### Subir todos los tags

```bash
git push origin --tags
```

### Subir un tag específico

```bash
git push origin v1.0.0
```

### Eliminar un tag

Local:

```bash
git tag -d v1.0.0
```

Remoto:

```bash
git push origin --delete v1.0.0
```

## 16. Ignorar archivos

Crea un archivo `.gitignore` en la raíz:

```gitignore
node_modules/
.next/
out/
dist/
build/
.env
.env.local
*.log
.DS_Store
Thumbs.db
.vscode/
```

Ver qué archivos están siendo ignorados:

```bash
git check-ignore -v archivo.log
```

Si un archivo ya fue agregado y quieres ignorarlo:

```bash
git rm --cached archivo.log
git commit -m "Deja de rastrear archivo.log"
```

## 17. GitHub CLI

### Instalar GitHub CLI

```powershell
winget install --id GitHub.cli
```

Verificar:

```bash
gh --version
```

### Autenticarse

```bash
gh auth login
```

Selecciona GitHub.com, HTTPS o SSH y sigue las instrucciones.

### Comandos frecuentes

Ver repositorios:

```bash
gh repo list
```

Crear un repositorio:

```bash
gh repo create mi-proyecto --public --source=. --remote=origin --push
```

Clonar:

```bash
gh repo clone USUARIO/REPOSITORIO
```

Crear un Pull Request:

```bash
gh pr create --title "Agrega nueva funcionalidad" --body "Describe los cambios"
```

Ver Pull Requests:

```bash
gh pr list
```

Revisar un Pull Request:

```bash
gh pr view 123
gh pr checkout 123
```

Fusionar un Pull Request:

```bash
gh pr merge 123 --squash --delete-branch
```

Crear una incidencia:

```bash
gh issue create --title "Error en formulario" --body "Describe el problema"
```

## 18. Flujo completo desde cero

Ejemplo de proyecto nuevo:

```bash
mkdir proyecto-web
cd proyecto-web
git init
git config user.name "Tu Nombre"
git config user.email "tu-correo@example.com"
```

Crea los archivos del proyecto y luego:

```bash
git add .
git commit -m "Crea estructura inicial"
git branch -M main
git remote add origin git@github.com:USUARIO/proyecto-web.git
git push -u origin main
```

## 19. Flujo diario para colaborar

```bash
git switch main
git pull origin main
git switch -c feature/nueva-funcionalidad

# Editar archivos
git add .
git commit -m "Implementa nueva funcionalidad"
git push -u origin feature/nueva-funcionalidad
```

Después, crea el Pull Request en GitHub.

Luego de que sea aprobado:

```bash
git switch main
git pull origin main
git branch -d feature/nueva-funcionalidad
git remote prune origin
```

## 20. Convenciones recomendadas para commits

Puedes adoptar Conventional Commits:

```text
feat: agrega una nueva funcionalidad
fix: corrige un error
docs: modifica documentación
style: cambia formato o estilos
refactor: reorganiza código sin cambiar comportamiento
test: agrega o modifica pruebas
chore: modifica tareas de mantenimiento
perf: mejora el rendimiento
build: modifica el sistema de compilación
ci: modifica automatización o integración continua
```

Ejemplos:

```bash
git commit -m "feat: agrega modal de donaciones"
git commit -m "fix: corrige navegación en móviles"
git commit -m "docs: agrega guía de instalación"
git commit -m "chore: actualiza dependencias"
```

## 21. Buenas prácticas

- Haz commits pequeños y con objetivos claros.
- Descarga cambios antes de comenzar a trabajar.
- Usa ramas para cada funcionalidad o corrección.
- No subas contraseñas, claves o archivos `.env`.
- Agrega reglas específicas en `.gitignore`.
- Usa Pull Requests y revisiones en equipos.
- Protege la rama `main` desde **Settings → Rules / Branches**.
- No uses `git push --force` sobre ramas compartidas.
- Conserva el historial limpio y comprensible.
- Configura pruebas y despliegue con GitHub Actions.
- Evita commitear `node_modules`, archivos de compilación o secretos.

## 22. Acciones rápidas en VS Code

Desde la paleta de comandos:

- `Ctrl + Shift + P`
- Ejecuta `Git: Clone`
- Ejecuta `Git: Create Branch`
- Ejecuta `Git: Commit`
- Ejecuta `Git: Pull`
- Ejecuta `Git: Push`

También puedes usar la pestaña **Source Control** (`Ctrl + Shift + G`).

## 23. Solución de problemas

### Rechazo al subir cambios

Si GitHub indica que el remoto contiene trabajo que no tienes localmente:

```bash
git pull --rebase origin main
git push origin main
```

### Conflictos al hacer pull

```bash
git status
git diff
```

Resuelve los archivos, prepara y crea el commit:

```bash
git add .
git commit -m "Resuelve conflictos"
git push origin main
```

### Cambiar una rama remota mal configurada

```bash
git remote set-url origin git@github.com:USUARIO/REPOSITORIO.git
git remote -v
```

### Recuperar archivos borrados

```bash
git restore archivo.txt
```

Si se borró en un commit anterior:

```bash
git log -- archivo.txt
git restore --source=<COMMIT> archivo.txt
```

### Recuperar un commit eliminado

```bash
git reflog
git switch -c recuperacion <HASH>
```

### Error de identidad

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu-correo@example.com"
```

### Limpiar archivos no rastreados

Previsualizar:

```bash
git clean -n
```

Eliminar:

```bash
git clean -fd
```

> `git clean -fd` elimina archivos no rastreados. Úsalo con cuidado.

## 24. Comandos útiles al inicio de cada tarea

```bash
git status
git branch --show-current
git remote -v
git log --oneline -5
git fetch origin
git pull origin main
```

## 25. Referencia rápida

```bash
# Estado e historial
git status
git log --oneline --graph --decorate --all

# Preparar y confirmar
git add .
git commit -m "mensaje"

# Rama
git switch -c nombre-rama
git switch main
git branch -a

# Sincronizar
git fetch origin
git pull origin main
git push origin main

# Combinar
git merge nombre-rama
git rebase main

# Temporal
git stash
git stash pop

# Deshacer
git restore archivo.txt
git restore --staged archivo.txt
git revert <hash>

# Remoto
git remote -v
git remote add origin <url>
git push -u origin main

# Etiquetas
git tag -a v1.0.0 -m "Versión 1.0.0"
git push origin --tags
```
